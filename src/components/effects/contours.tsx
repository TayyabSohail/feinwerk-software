'use client';

import { useEffect, useRef } from 'react';

import { cn } from '@/lib/utils';

interface ContoursProps {
  className?: string;
  /** Animation speed multiplier. */
  speed?: number;
}

const VERT = `
attribute vec2 a_position;
void main() { gl_Position = vec4(a_position, 0.0, 1.0); }
`;

// Contour map: a slowly drifting, domain-warped noise field sliced into
// hairline elevation lines on paper, with a faint emerald cast on the
// highest ground. Light tones only; it reads as a surveyor's map or a
// machined surface, not as a pattern.
const frag = (derivatives: boolean) => `
${derivatives ? '#extension GL_OES_standard_derivatives : enable' : ''}
precision highp float;
uniform vec2 u_res;
uniform float u_time;

float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  mat2 m = mat2(1.6, 1.2, -1.2, 1.6);
  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p = m * p + 3.7;
    a *= 0.5;
  }
  return v;
}

float width(float f) { return ${derivatives ? 'fwidth(f) * 1.5 + 0.004' : '0.05'}; }

void main() {
  vec2 uv = gl_FragCoord.xy / u_res.xy;
  float aspect = u_res.x / u_res.y;
  vec2 p = vec2(uv.x * aspect, uv.y) * 1.45;
  float t = u_time * 0.035;

  vec2 q = vec2(fbm(p + vec2(0.0, t)), fbm(p + vec2(5.2, 1.3) - t));
  float n = fbm(p + 0.55 * q + vec2(t * 0.4, 0.0));

  float f = n * 17.0;
  float g = abs(fract(f + 0.5) - 0.5);
  float line = 1.0 - smoothstep(0.0, width(f), g);

  vec3 paper = vec3(0.963, 0.963, 0.957);
  float shade = smoothstep(0.32, 0.78, n);
  vec3 col = mix(paper - 0.024, paper + 0.014, shade);
  col -= line * 0.08;

  vec3 emerald = vec3(0.063, 0.725, 0.506);
  col = mix(col, emerald, smoothstep(0.6, 0.82, n) * 0.055);

  float grain = (hash(gl_FragCoord.xy) - 0.5) * 0.012;
  gl_FragColor = vec4(col + grain, 1.0);
}
`;

/**
 * Contour-line texture rendered in WebGL behind the hero. Falls back to a
 * flat paper gradient when WebGL is missing; pauses off screen and holds a
 * single frame under reduced motion.
 */
export function Contours({ className, speed = 1 }: ContoursProps) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const gl = canvas.getContext('webgl', { antialias: false, alpha: false });
    if (!gl) return;
    const derivatives = Boolean(gl.getExtension('OES_standard_derivatives'));

    const compile = (type: number, source: string) => {
      const shader = gl.createShader(type)!;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      return shader;
    };
    const program = gl.createProgram()!;
    gl.attachShader(program, compile(gl.VERTEX_SHADER, VERT));
    gl.attachShader(program, compile(gl.FRAGMENT_SHADER, frag(derivatives)));
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW,
    );
    const position = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(program, 'u_res');
    const uTime = gl.getUniformLocation(program, 'u_time');

    const reduce = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    let frame = 0;
    const start = performance.now();
    let visible = true;

    const resize = () => {
      // Near 1:1 with CSS pixels so the hairlines stay crisp.
      const dpr = Math.min(window.devicePixelRatio || 1, 1.25);
      const { clientWidth, clientHeight } = canvas;
      canvas.width = Math.max(1, Math.floor(clientWidth * dpr));
      canvas.height = Math.max(1, Math.floor(clientHeight * dpr));
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    const render = (now: number) => {
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, ((now - start) / 1000) * speed);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      if (!reduce && visible) frame = requestAnimationFrame(render);
    };

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !reduce) {
        cancelAnimationFrame(frame);
        frame = requestAnimationFrame(render);
      }
    });
    observer.observe(canvas);

    resize();
    window.addEventListener('resize', resize);
    frame = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener('resize', resize);
    };
  }, [speed]);

  return (
    <canvas
      ref={ref}
      aria-hidden='true'
      className={cn(
        'pointer-events-none absolute inset-0 h-full w-full bg-gradient-to-b from-[#f4f4f1] to-[#ebebe7]',
        className,
      )}
    />
  );
}
