'use client';

import { useEffect, useRef } from 'react';

import { cn } from '@/lib/utils';

interface FluidInkProps {
  className?: string;
  /** Paper colour the ink is drawn on, as 0-1 RGB. */
  paper?: [number, number, number];
}

/* ------------------------------------------------------------------------ */
/* Shaders. A stable-fluids solver: advect, add curl, project, then draw    */
/* the dye subtractively so it reads as ink soaking into paper.             */
/* ------------------------------------------------------------------------ */

const VERT = `#version 300 es
precision highp float;
layout(location = 0) in vec2 aPosition;
out vec2 vUv; out vec2 vL; out vec2 vR; out vec2 vT; out vec2 vB;
uniform vec2 texelSize;
void main() {
  vUv = aPosition * 0.5 + 0.5;
  vL = vUv - vec2(texelSize.x, 0.0);
  vR = vUv + vec2(texelSize.x, 0.0);
  vT = vUv + vec2(0.0, texelSize.y);
  vB = vUv - vec2(0.0, texelSize.y);
  gl_Position = vec4(aPosition, 0.0, 1.0);
}`;

const HEAD = `#version 300 es
precision highp float;
precision highp sampler2D;
in vec2 vUv; in vec2 vL; in vec2 vR; in vec2 vT; in vec2 vB;
out vec4 fragColor;
`;

const CLEAR = `${HEAD}
uniform sampler2D uTexture; uniform float value;
void main() { fragColor = value * texture(uTexture, vUv); }`;

const SPLAT = `${HEAD}
uniform sampler2D uTarget; uniform float aspectRatio; uniform vec3 color; uniform vec2 point; uniform float radius;
void main() {
  vec2 p = vUv - point;
  p.x *= aspectRatio;
  vec3 splat = exp(-dot(p, p) / radius) * color;
  vec3 base = texture(uTarget, vUv).xyz;
  fragColor = vec4(base + splat, 1.0);
}`;

const ADVECT = `${HEAD}
uniform sampler2D uVelocity; uniform sampler2D uSource; uniform vec2 texelSize; uniform float dt; uniform float dissipation;
void main() {
  vec2 coord = vUv - dt * texture(uVelocity, vUv).xy * texelSize;
  vec4 result = texture(uSource, coord);
  float decay = 1.0 + dissipation * dt;
  fragColor = result / decay;
}`;

const DIVERGENCE = `${HEAD}
uniform sampler2D uVelocity;
void main() {
  float L = texture(uVelocity, vL).x; float R = texture(uVelocity, vR).x;
  float T = texture(uVelocity, vT).y; float B = texture(uVelocity, vB).y;
  vec2 C = texture(uVelocity, vUv).xy;
  if (vL.x < 0.0) { L = -C.x; } if (vR.x > 1.0) { R = -C.x; }
  if (vT.y > 1.0) { T = -C.y; } if (vB.y < 0.0) { B = -C.y; }
  fragColor = vec4(0.5 * (R - L + T - B), 0.0, 0.0, 1.0);
}`;

const CURL = `${HEAD}
uniform sampler2D uVelocity;
void main() {
  float L = texture(uVelocity, vL).y; float R = texture(uVelocity, vR).y;
  float T = texture(uVelocity, vT).x; float B = texture(uVelocity, vB).x;
  fragColor = vec4(0.5 * (R - L - T + B), 0.0, 0.0, 1.0);
}`;

const VORTICITY = `${HEAD}
uniform sampler2D uVelocity; uniform sampler2D uCurl; uniform float curl; uniform float dt;
void main() {
  float L = texture(uCurl, vL).x; float R = texture(uCurl, vR).x;
  float T = texture(uCurl, vT).x; float B = texture(uCurl, vB).x;
  float C = texture(uCurl, vUv).x;
  vec2 force = 0.5 * vec2(abs(T) - abs(B), abs(R) - abs(L));
  force /= length(force) + 0.0001;
  force *= curl * C;
  force.y *= -1.0;
  vec2 velocity = texture(uVelocity, vUv).xy + force * dt;
  fragColor = vec4(clamp(velocity, -1000.0, 1000.0), 0.0, 1.0);
}`;

const PRESSURE = `${HEAD}
uniform sampler2D uPressure; uniform sampler2D uDivergence;
void main() {
  float L = texture(uPressure, vL).x; float R = texture(uPressure, vR).x;
  float T = texture(uPressure, vT).x; float B = texture(uPressure, vB).x;
  float divergence = texture(uDivergence, vUv).x;
  fragColor = vec4((L + R + B + T - divergence) * 0.25, 0.0, 0.0, 1.0);
}`;

const GRADIENT = `${HEAD}
uniform sampler2D uPressure; uniform sampler2D uVelocity;
void main() {
  float L = texture(uPressure, vL).x; float R = texture(uPressure, vR).x;
  float T = texture(uPressure, vT).x; float B = texture(uPressure, vB).x;
  vec2 velocity = texture(uVelocity, vUv).xy - vec2(R - L, T - B);
  fragColor = vec4(velocity, 0.0, 1.0);
}`;

const DISPLAY = `${HEAD}
uniform sampler2D uTexture; uniform vec3 paper;
float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
void main() {
  vec3 ink = texture(uTexture, vUv).rgb;
  vec3 c = paper * clamp(vec3(1.0) - ink, 0.0, 1.0);
  c += (hash(gl_FragCoord.xy) - 0.5) * 0.012;
  fragColor = vec4(c, 1.0);
}`;

/* Absorption colours (1 - rgb): emerald, teal, mint and a little ink. */
const PALETTE: [number, number, number][] = [
  [0.937, 0.275, 0.494],
  [0.949, 0.42, 0.467],
  [0.569, 0.094, 0.282],
  [0.937, 0.275, 0.494],
  [0.7, 0.7, 0.7],
];

const SIM_RESOLUTION = 144;
const DYE_RESOLUTION = 900;
const DENSITY_DISSIPATION = 0.9;
const VELOCITY_DISSIPATION = 0.35;
const PRESSURE_DECAY = 0.8;
const PRESSURE_ITERATIONS = 18;
const CURL_STRENGTH = 24;
const SPLAT_RADIUS = 0.0022;
const SPLAT_FORCE = 5200;
const POINTER_INK = 0.34;
const AUTO_INK = 0.5;
const FIRST_BURST_MS = 1900;
const AUTO_EVERY_MS = 2600;

interface Fbo {
  texture: WebGLTexture;
  fbo: WebGLFramebuffer;
  width: number;
  height: number;
  texelX: number;
  texelY: number;
}

interface DoubleFbo {
  read: Fbo;
  write: Fbo;
  texelX: number;
  texelY: number;
  swap: () => void;
}

interface Program {
  program: WebGLProgram;
  uniforms: Record<string, WebGLUniformLocation | null>;
}

/**
 * Ink-on-paper fluid simulation behind the hero. The pointer stirs the
 * fluid and leaves emerald ink; when nobody is moving, the field stirs
 * itself so the page is never still. Needs WebGL2 with float render
 * targets; otherwise it renders nothing and the paper shows through.
 */
export function FluidInk({
  className,
  paper = [0.961, 0.961, 0.953],
}: FluidInkProps) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const gl = canvas.getContext('webgl2', {
      alpha: false,
      depth: false,
      stencil: false,
      antialias: false,
      preserveDrawingBuffer: false,
      powerPreference: 'high-performance',
    });
    if (!gl) return;
    if (
      !gl.getExtension('EXT_color_buffer_float') &&
      !gl.getExtension('EXT_color_buffer_half_float')
    ) {
      return;
    }

    /* ---- Programs ---------------------------------------------------- */
    const compile = (type: number, source: string) => {
      const shader = gl.createShader(type)!;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      return shader;
    };
    const vertex = compile(gl.VERTEX_SHADER, VERT);
    const makeProgram = (fragment: string): Program => {
      const program = gl.createProgram()!;
      gl.attachShader(program, vertex);
      gl.attachShader(program, compile(gl.FRAGMENT_SHADER, fragment));
      gl.linkProgram(program);
      const uniforms: Program['uniforms'] = {};
      const count = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
      for (let i = 0; i < count; i++) {
        const info = gl.getActiveUniform(program, i);
        if (info) uniforms[info.name] = gl.getUniformLocation(program, info.name);
      }
      return { program, uniforms };
    };

    const clearP = makeProgram(CLEAR);
    const splatP = makeProgram(SPLAT);
    const advectP = makeProgram(ADVECT);
    const divergenceP = makeProgram(DIVERGENCE);
    const curlP = makeProgram(CURL);
    const vorticityP = makeProgram(VORTICITY);
    const pressureP = makeProgram(PRESSURE);
    const gradientP = makeProgram(GRADIENT);
    const displayP = makeProgram(DISPLAY);

    /* ---- Quad -------------------------------------------------------- */
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW,
    );
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
    gl.disable(gl.BLEND);

    const blit = (target: Fbo | null) => {
      if (target) {
        gl.viewport(0, 0, target.width, target.height);
        gl.bindFramebuffer(gl.FRAMEBUFFER, target.fbo);
      } else {
        gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      }
      gl.drawArrays(gl.TRIANGLES, 0, 6);
    };

    /* ---- Framebuffers ------------------------------------------------ */
    const createFbo = (
      width: number,
      height: number,
      internalFormat: number,
      format: number,
      filter: number,
    ): Fbo => {
      gl.activeTexture(gl.TEXTURE0);
      const texture = gl.createTexture()!;
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, filter);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, filter);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        internalFormat,
        width,
        height,
        0,
        format,
        gl.HALF_FLOAT,
        null,
      );
      const fbo = gl.createFramebuffer()!;
      gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
      gl.framebufferTexture2D(
        gl.FRAMEBUFFER,
        gl.COLOR_ATTACHMENT0,
        gl.TEXTURE_2D,
        texture,
        0,
      );
      gl.viewport(0, 0, width, height);
      gl.clearColor(0, 0, 0, 1);
      gl.clear(gl.COLOR_BUFFER_BIT);
      return {
        texture,
        fbo,
        width,
        height,
        texelX: 1 / width,
        texelY: 1 / height,
      };
    };

    const createDouble = (
      width: number,
      height: number,
      internalFormat: number,
      format: number,
      filter: number,
    ): DoubleFbo => {
      let read = createFbo(width, height, internalFormat, format, filter);
      let write = createFbo(width, height, internalFormat, format, filter);
      const pair: DoubleFbo = {
        get read() {
          return read;
        },
        get write() {
          return write;
        },
        texelX: 1 / width,
        texelY: 1 / height,
        swap() {
          const tmp = read;
          read = write;
          write = tmp;
        },
      };
      return pair;
    };

    const bind = (target: Fbo, unit: number) => {
      gl.activeTexture(gl.TEXTURE0 + unit);
      gl.bindTexture(gl.TEXTURE_2D, target.texture);
      return unit;
    };

    const resolution = (base: number) => {
      let aspect = gl.drawingBufferWidth / gl.drawingBufferHeight;
      if (aspect < 1) aspect = 1 / aspect;
      const min = Math.round(base);
      const max = Math.round(base * aspect);
      return gl.drawingBufferWidth > gl.drawingBufferHeight
        ? { width: max, height: min }
        : { width: min, height: max };
    };

    let dye: DoubleFbo;
    let velocity: DoubleFbo;
    let divergence: Fbo;
    let curl: Fbo;
    let pressure: DoubleFbo;

    const supportsFloatRender = () => {
      const probe = createFbo(4, 4, gl.RGBA16F, gl.RGBA, gl.LINEAR);
      const ok =
        gl.checkFramebufferStatus(gl.FRAMEBUFFER) === gl.FRAMEBUFFER_COMPLETE;
      gl.deleteFramebuffer(probe.fbo);
      gl.deleteTexture(probe.texture);
      return ok;
    };
    if (!supportsFloatRender()) return;

    const initFramebuffers = () => {
      const sim = resolution(SIM_RESOLUTION);
      const dyeRes = resolution(DYE_RESOLUTION);
      dye = createDouble(dyeRes.width, dyeRes.height, gl.RGBA16F, gl.RGBA, gl.LINEAR);
      velocity = createDouble(sim.width, sim.height, gl.RG16F, gl.RG, gl.LINEAR);
      divergence = createFbo(sim.width, sim.height, gl.R16F, gl.RED, gl.NEAREST);
      curl = createFbo(sim.width, sim.height, gl.R16F, gl.RED, gl.NEAREST);
      pressure = createDouble(sim.width, sim.height, gl.R16F, gl.RED, gl.NEAREST);
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const width = Math.max(1, Math.floor(canvas.clientWidth * dpr));
      const height = Math.max(1, Math.floor(canvas.clientHeight * dpr));
      if (canvas.width === width && canvas.height === height) return false;
      canvas.width = width;
      canvas.height = height;
      return true;
    };
    resize();
    initFramebuffers();

    /* ---- Input ------------------------------------------------------- */
    const aspect = () => canvas.width / canvas.height;
    const pointer = {
      x: 0.5,
      y: 0.5,
      dx: 0,
      dy: 0,
      inside: false,
      moved: false,
      lastMove: 0,
      colorIndex: 0,
      colorAt: 0,
    };

    const splat = (
      x: number,
      y: number,
      dx: number,
      dy: number,
      color: [number, number, number],
      radiusScale = 1,
    ) => {
      const a = aspect();
      let radius = SPLAT_RADIUS * radiusScale;
      if (a > 1) radius *= a;

      gl.useProgram(splatP.program);
      gl.uniform2f(splatP.uniforms.texelSize, velocity.texelX, velocity.texelY);
      gl.uniform1i(splatP.uniforms.uTarget, bind(velocity.read, 0));
      gl.uniform1f(splatP.uniforms.aspectRatio, a);
      gl.uniform2f(splatP.uniforms.point, x, y);
      gl.uniform3f(splatP.uniforms.color, dx, dy, 0);
      gl.uniform1f(splatP.uniforms.radius, radius);
      blit(velocity.write);
      velocity.swap();

      gl.uniform2f(splatP.uniforms.texelSize, dye.texelX, dye.texelY);
      gl.uniform1i(splatP.uniforms.uTarget, bind(dye.read, 0));
      gl.uniform3f(splatP.uniforms.color, color[0], color[1], color[2]);
      blit(dye.write);
      dye.swap();
    };

    const tint = (
      base: [number, number, number],
      strength: number,
    ): [number, number, number] => [
      base[0] * strength,
      base[1] * strength,
      base[2] * strength,
    ];

    const onPointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width;
      const py = 1 - (event.clientY - rect.top) / rect.height;
      if (px < 0 || px > 1 || py < 0 || py > 1) {
        pointer.inside = false;
        return;
      }
      if (!pointer.inside) {
        pointer.inside = true;
        pointer.x = px;
        pointer.y = py;
        return;
      }
      const a = aspect();
      let dx = px - pointer.x;
      let dy = py - pointer.y;
      if (a < 1) dx *= a;
      if (a > 1) dy /= a;
      pointer.dx = dx * SPLAT_FORCE;
      pointer.dy = dy * SPLAT_FORCE;
      pointer.x = px;
      pointer.y = py;
      pointer.moved = Math.abs(dx) > 0 || Math.abs(dy) > 0;
      pointer.lastMove = performance.now();
    };

    const onPointerLeave = () => {
      pointer.inside = false;
    };

    const autoSplat = (now: number, count: number, strength: number) => {
      for (let i = 0; i < count; i++) {
        const x = 0.12 + Math.random() * 0.76;
        const y = 0.18 + Math.random() * 0.64;
        const angle = Math.random() * Math.PI * 2;
        const force = 500 + Math.random() * 700;
        const color = PALETTE[Math.floor(Math.random() * PALETTE.length)];
        splat(
          x,
          y,
          Math.cos(angle) * force,
          Math.sin(angle) * force,
          tint(color, AUTO_INK * strength),
          2.4,
        );
      }
      pointer.colorAt = now;
    };

    /* ---- Simulation step --------------------------------------------- */
    const step = (dt: number) => {
      gl.useProgram(curlP.program);
      gl.uniform2f(curlP.uniforms.texelSize, velocity.texelX, velocity.texelY);
      gl.uniform1i(curlP.uniforms.uVelocity, bind(velocity.read, 0));
      blit(curl);

      gl.useProgram(vorticityP.program);
      gl.uniform2f(vorticityP.uniforms.texelSize, velocity.texelX, velocity.texelY);
      gl.uniform1i(vorticityP.uniforms.uVelocity, bind(velocity.read, 0));
      gl.uniform1i(vorticityP.uniforms.uCurl, bind(curl, 1));
      gl.uniform1f(vorticityP.uniforms.curl, CURL_STRENGTH);
      gl.uniform1f(vorticityP.uniforms.dt, dt);
      blit(velocity.write);
      velocity.swap();

      gl.useProgram(divergenceP.program);
      gl.uniform2f(divergenceP.uniforms.texelSize, velocity.texelX, velocity.texelY);
      gl.uniform1i(divergenceP.uniforms.uVelocity, bind(velocity.read, 0));
      blit(divergence);

      gl.useProgram(clearP.program);
      gl.uniform2f(clearP.uniforms.texelSize, velocity.texelX, velocity.texelY);
      gl.uniform1i(clearP.uniforms.uTexture, bind(pressure.read, 0));
      gl.uniform1f(clearP.uniforms.value, PRESSURE_DECAY);
      blit(pressure.write);
      pressure.swap();

      gl.useProgram(pressureP.program);
      gl.uniform2f(pressureP.uniforms.texelSize, velocity.texelX, velocity.texelY);
      gl.uniform1i(pressureP.uniforms.uDivergence, bind(divergence, 0));
      for (let i = 0; i < PRESSURE_ITERATIONS; i++) {
        gl.uniform1i(pressureP.uniforms.uPressure, bind(pressure.read, 1));
        blit(pressure.write);
        pressure.swap();
      }

      gl.useProgram(gradientP.program);
      gl.uniform2f(gradientP.uniforms.texelSize, velocity.texelX, velocity.texelY);
      gl.uniform1i(gradientP.uniforms.uPressure, bind(pressure.read, 0));
      gl.uniform1i(gradientP.uniforms.uVelocity, bind(velocity.read, 1));
      blit(velocity.write);
      velocity.swap();

      gl.useProgram(advectP.program);
      gl.uniform2f(advectP.uniforms.texelSize, velocity.texelX, velocity.texelY);
      gl.uniform1i(advectP.uniforms.uVelocity, bind(velocity.read, 0));
      gl.uniform1i(advectP.uniforms.uSource, bind(velocity.read, 0));
      gl.uniform1f(advectP.uniforms.dt, dt);
      gl.uniform1f(advectP.uniforms.dissipation, VELOCITY_DISSIPATION);
      blit(velocity.write);
      velocity.swap();

      gl.uniform1i(advectP.uniforms.uVelocity, bind(velocity.read, 0));
      gl.uniform1i(advectP.uniforms.uSource, bind(dye.read, 1));
      gl.uniform1f(advectP.uniforms.dissipation, DENSITY_DISSIPATION);
      blit(dye.write);
      dye.swap();
    };

    const render = () => {
      gl.useProgram(displayP.program);
      gl.uniform2f(displayP.uniforms.texelSize, dye.texelX, dye.texelY);
      gl.uniform1i(displayP.uniforms.uTexture, bind(dye.read, 0));
      gl.uniform3f(displayP.uniforms.paper, paper[0], paper[1], paper[2]);
      blit(null);
    };

    /* ---- Loop -------------------------------------------------------- */
    const started = performance.now();
    let last = started;
    let frame = 0;
    let visible = true;
    let nextAuto = started + FIRST_BURST_MS;
    let burst = true;

    const update = (now: number) => {
      const dt = Math.min((now - last) / 1000, 1 / 60);
      last = now;
      if (resize()) initFramebuffers();

      if (now - pointer.colorAt > 650) {
        pointer.colorIndex = (pointer.colorIndex + 1) % PALETTE.length;
        pointer.colorAt = now;
      }
      if (pointer.moved) {
        pointer.moved = false;
        splat(
          pointer.x,
          pointer.y,
          pointer.dx,
          pointer.dy,
          tint(PALETTE[pointer.colorIndex], POINTER_INK),
        );
      }
      if (now >= nextAuto) {
        if (burst) {
          autoSplat(now, 7, 1.15);
          burst = false;
        } else if (now - pointer.lastMove > 1800) {
          autoSplat(now, 1 + Math.floor(Math.random() * 2), 0.9);
        }
        nextAuto = now + AUTO_EVERY_MS + Math.random() * 1200;
      }

      step(dt);
      render();
      if (visible) frame = requestAnimationFrame(update);
    };

    const observer = new IntersectionObserver(([entry]) => {
      const wasVisible = visible;
      visible = entry.isIntersecting;
      if (visible && !wasVisible) {
        last = performance.now();
        cancelAnimationFrame(frame);
        frame = requestAnimationFrame(update);
      }
    });
    observer.observe(canvas);

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerdown', onPointerMove, { passive: true });
    document.addEventListener('pointerleave', onPointerLeave);
    frame = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerdown', onPointerMove);
      document.removeEventListener('pointerleave', onPointerLeave);
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    };
  }, [paper]);

  return (
    <canvas
      ref={ref}
      aria-hidden='true'
      className={cn(
        'pointer-events-none absolute inset-0 h-full w-full bg-background',
        className,
      )}
    />
  );
}
