'use client';

import { useEffect, useRef } from 'react';

import { cn } from '@/lib/utils';

interface SilkProps {
  className?: string;
  /** Overall brightness of the weave (0-1). */
  brightness?: number;
  /** Animation speed multiplier. */
  speed?: number;
}

const VERT = `
attribute vec2 a_position;
void main() { gl_Position = vec4(a_position, 0.0, 1.0); }
`;

// Flowing silk: layered sines displaced by a slow-moving field. Light tones
// only; the pattern reads as folded satin catching light from the top-left.
const FRAG = `
precision highp float;
uniform vec2 u_res;
uniform float u_time;
uniform float u_bright;

float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

void main() {
  vec2 uv = gl_FragCoord.xy / u_res.xy;
  float aspect = u_res.x / u_res.y;
  vec2 p = vec2(uv.x * aspect, uv.y);
  float t = u_time * 0.08;

  // Slow large-scale warp so the folds drift like fabric.
  float warp = sin(p.y * 2.2 + t) * 0.45 + sin(p.x * 1.4 - t * 0.6) * 0.3
             + sin((p.x + p.y) * 0.9 + t * 0.4) * 0.35;

  // Thin diagonal ridges: the silk threads.
  float phase = (p.x * 0.55 + p.y * 1.7 + warp) * 16.0 + t * 1.6;
  float ridge = pow(abs(sin(phase)), 8.0);
  float ridge2 = pow(abs(sin(phase * 0.5 + 1.3)), 3.0);

  // Broad shading so some folds sit in shadow.
  float broad = 0.5 + 0.5 * sin((p.x * 0.8 + p.y * 0.5 + warp * 0.6) * 3.0 - t);

  float grain = (hash(gl_FragCoord.xy) - 0.5) * 0.02;
  float v = 0.86 + 0.05 * broad + 0.07 * ridge2 + 0.10 * ridge + grain;
  v = clamp(v * u_bright, 0.0, 1.0);

  vec3 col = vec3(v * 0.985, v * 0.985, v * 0.975);
  gl_FragColor = vec4(col, 1.0);
}
`;

/**
 * Silk texture rendered in WebGL, in light greys. Used behind the hero and
 * the footer wordmark. Falls back to a flat gradient if WebGL is missing.
 */
export function Silk({ className, brightness = 1.02, speed = 1 }: SilkProps) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const gl = canvas.getContext('webgl', { antialias: false, alpha: false });
    if (!gl) return;

    const compile = (type: number, source: string) => {
      const shader = gl.createShader(type)!;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      return shader;
    };
    const program = gl.createProgram()!;
    gl.attachShader(program, compile(gl.VERTEX_SHADER, VERT));
    gl.attachShader(program, compile(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(program);
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
    const uBright = gl.getUniformLocation(program, 'u_bright');

    const reduce = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    let frame = 0;
    let start = performance.now();
    let visible = true;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const { clientWidth, clientHeight } = canvas;
      canvas.width = Math.max(1, Math.floor(clientWidth * dpr * 0.6));
      canvas.height = Math.max(1, Math.floor(clientHeight * dpr * 0.6));
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    const render = (now: number) => {
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, ((now - start) / 1000) * speed);
      gl.uniform1f(uBright, brightness);
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
      start = 0;
    };
  }, [brightness, speed]);

  return (
    <canvas
      ref={ref}
      aria-hidden='true'
      className={cn(
        'pointer-events-none absolute inset-0 h-full w-full bg-gradient-to-b from-[#e9e9e5] to-[#dcdcd7]',
        className,
      )}
    />
  );
}
