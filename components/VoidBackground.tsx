'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const VERT = `
    #define PI 3.141592653589793
    #define PI2 6.283185307179586
    #define PHI 1.618033988749

    attribute float aIndex;
    attribute float aSize;
    attribute float aPhase;
    attribute vec3 aTextPos;

    uniform float uCount;
    uniform float uFormA;
    uniform float uFormB;
    uniform float uMix;
    uniform float uTime;
    uniform vec3 uMouse;
    uniform float uMouseRadius;
    uniform float uPointSize;
    uniform vec3 uColorA;
    uniform vec3 uColorB;
    uniform float uScrollVel;
    uniform float uSparkleIntensity;
    uniform float uBrightness;

    varying vec3 vColor;
    varying float vAlpha;

    float hash(float n) { return fract(sin(n + 0.1) * 43758.5453); }

    vec3 formSphere(float i, float n) {
        float p = acos(1.0 - 2.0 * (i + 0.5) / n);
        float t = PI2 * PHI * i;
        float r = 2.8 + hash(i * 6.7) * 0.4;
        return r * vec3(sin(p)*cos(t), sin(p)*sin(t), cos(p));
    }
    vec3 formHelix(float i, float n) {
        float t = i / n * PI2 * 4.0;
        float s = floor(mod(i, 3.0));
        float r = 1.2 + hash(i * 3.1) * 0.3;
        return vec3(r * cos(t + s * PI2 / 3.0), (i/n - 0.5) * 7.0, r * sin(t + s * PI2 / 3.0));
    }
    vec3 formGrid(float i, float n) {
        float side = ceil(sqrt(n));
        float x = (mod(i, side) / side - 0.5) * 7.0;
        float z = (floor(i / side) / side - 0.5) * 7.0;
        return vec3(x, sin(x * 1.2 + z * 0.8) * cos(z) * 0.6, z);
    }
    vec3 formTorus(float i, float n) {
        float t = i / n * PI2;
        float R = 2.2, r = 0.8 + hash(i * 2.9) * 0.2;
        return vec3((R + r * cos(3.0*t)) * cos(2.0*t), (R + r * cos(3.0*t)) * sin(2.0*t), r * sin(3.0*t));
    }
    vec3 formGalaxy(float i, float n) {
        float arm = floor(mod(i, 4.0));
        float t = i / n;
        float r = pow(t, 0.5) * 3.5;
        float a = t * 12.0 + arm * PI2 / 4.0;
        float sc = hash(i * 5.1) * 0.4;
        return vec3(r*cos(a)+(hash(i*2.3)-0.5)*sc, (hash(i*8.7)-0.5)*0.3, r*sin(a)+(hash(i*4.1)-0.5)*sc);
    }
    vec3 formVortex(float i, float n) {
        float t = i / n;
        float a = t * PI2 * 8.0;
        float r = (1.0 - t) * 3.5;
        return vec3(r * cos(a), (t - 0.5) * 5.0, r * sin(a));
    }
    vec3 formText(float i, float n) {
        return aTextPos;
    }

    vec3 getForm(float id, float i, float n) {
        if (id < 0.5) return formSphere(i, n);
        if (id < 1.5) return formHelix(i, n);
        if (id < 2.5) return formGrid(i, n);
        if (id < 3.5) return formTorus(i, n);
        if (id < 4.5) return formGalaxy(i, n);
        if (id < 5.5) return formVortex(i, n);
        return formText(i, n);
    }

    void main() {
        vec3 posA = getForm(uFormA, aIndex, uCount);
        vec3 posB = getForm(uFormB, aIndex, uCount);
        float t = uMix * uMix * (3.0 - 2.0 * uMix);
        vec3 pos = mix(posA, posB, t);

        pos += vec3(sin(uTime*0.5+aPhase*PI2)*0.1, cos(uTime*0.4+aPhase*4.17)*0.1, sin(uTime*0.3+aPhase*5.03)*0.1);

        float vel = min(uScrollVel, 3.0);
        pos += vec3(sin(aPhase*20.0+uTime*2.0), cos(aPhase*15.0+uTime*1.5), sin(aPhase*25.0+uTime*1.8)) * vel * 0.06;

        vec3 diff = pos - uMouse;
        float dist = length(diff);
        if (dist < uMouseRadius && dist > 0.001) {
            float f = 1.0 - dist / uMouseRadius;
            pos += normalize(diff) * f * f * f * 1.0;
        }

        vec3 baseColor = mix(uColorA, uColorB, t);
        float isStar = step(0.85, hash(aIndex * 11.3)) * uSparkleIntensity; 
        float sparkle = pow(sin(uTime * 2.0 + aPhase * 20.0) * 0.5 + 0.5, 2.0);
        vec3 starColor = vec3(0.9, 0.9, 1.0) * (0.6 + 0.6 * sparkle);
        vColor = mix(baseColor * (0.6 + hash(aIndex * 7.3) * 0.4), starColor, isStar);
        
        if (dist < uMouseRadius) vColor += (1.0 - dist/uMouseRadius) * 0.2;
        
        vAlpha = (0.15 + aSize * 0.08 + min(vel, 2.0) * 0.02) * min(uBrightness, 3.0);

        vec4 mv = modelViewMatrix * vec4(pos, 1.0);
        gl_PointSize = clamp(aSize * uPointSize * (0.6 + uBrightness * 0.4) * (80.0 / -mv.z), 1.0, 16.0);
        gl_Position = projectionMatrix * mv;
    }
`;

const FRAG = `
    varying vec3 vColor;
    varying float vAlpha;
    void main() {
        float d = length(gl_PointCoord - 0.5);
        if (d > 0.5) discard;
        float a = (1.0 - smoothstep(0.3, 0.5, d)) * vAlpha;
        gl_FragColor = vec4(vColor, a);
    }
`;

export default function VoidBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scrollRef = useRef(0);
  const scrollVelRef = useRef(0);

  useEffect(() => {
    const handleScroll = (e: any) => {
      scrollRef.current = e.detail.scroll;
      scrollVelRef.current = e.detail.scrollVel;
    };
    window.addEventListener('app-scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('app-scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (!canvasRef.current) return;

    const N = window.innerWidth < 769 ? 3000 : 6000;
    const ren = new THREE.WebGLRenderer({ canvas: canvasRef.current, antialias: false, alpha: true });
    ren.setSize(window.innerWidth, window.innerHeight);
    ren.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const cam = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
    cam.position.set(0, 0, 7);
    let targetZ = 7;

    const scene = new THREE.Scene();
    const geo = new THREE.BufferGeometry();
    const idx = new Float32Array(N);
    const sizes = new Float32Array(N);
    const phases = new Float32Array(N);
    for (let i = 0; i < N; i++) {
      idx[i] = i;
      sizes[i] = 0.4 + Math.random() * 1.0;
      phases[i] = Math.random();
    }
    
    const textPos = new Float32Array(N * 3);
    const textCanvas = document.createElement('canvas');
    textCanvas.width = 2560;
    textCanvas.height = 300;
    const ctx = textCanvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, textCanvas.width, textCanvas.height);
      ctx.font = '900 180px "Inter", "Arial", sans-serif';
      (ctx as any).letterSpacing = '15px';
      ctx.fillStyle = '#fff';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('CODE & CONVERT', 1280, 150);
      const data = ctx.getImageData(0, 0, textCanvas.width, textCanvas.height).data;
      const textGeo: {x: number, y: number}[] = [];
      for (let y = 0; y < textCanvas.height; y += 2) {
        for (let x = 0; x < textCanvas.width; x += 2) {
          if (data[(y * textCanvas.width + x) * 4] > 128) {
            textGeo.push({ x: (x - 1280) * 0.005, y: -(y - 150) * 0.005 - 1.4 });
          }
        }
      }
      if (textGeo.length > 0) {
        for (let i = 0; i < N; i++) {
          const pt = textGeo[Math.floor(Math.random() * textGeo.length)];
          textPos[i * 3]     = pt.x + (Math.random() - 0.5) * 0.05;
          textPos[i * 3 + 1] = pt.y + (Math.random() - 0.5) * 0.05;
          textPos[i * 3 + 2] = (Math.random() - 0.5) * 0.1;
        }
      }
    }

    geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(N * 3), 3));
    geo.setAttribute('aIndex', new THREE.BufferAttribute(idx, 1));
    geo.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1));
    geo.setAttribute('aPhase', new THREE.BufferAttribute(phases, 1));
    geo.setAttribute('aTextPos', new THREE.BufferAttribute(textPos, 3));

    const mat = new THREE.ShaderMaterial({
      vertexShader: VERT,
      fragmentShader: FRAG,
      uniforms: {
        uCount: { value: N },
        uFormA: { value: 0 },
        uFormB: { value: 0 },
        uMix: { value: 0 },
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector3(100, 100, 100) },
        uMouseRadius: { value: 5.0 },
        uPointSize: { value: 0.8 },
        uColorA: { value: new THREE.Color(1.0, 0.12, 0.12) },
        uColorB: { value: new THREE.Color(1.0, 0.12, 0.12) },
        uScrollVel: { value: 0 },
        uSparkleIntensity: { value: 0 },
        uBrightness: { value: 1.0 },
      },
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const points = new THREE.Points(geo, mat);
    points.frustumCulled = false;
    scene.add(points);

    const kf = [
      { s: 0.00, f: 0, z: 7, r: 1.0, g: 0.12, b: 0.12, sparkle: 0.0, bright: 5.0 },
      { s: 0.07, f: 0, z: 7, r: 1.0, g: 0.12, b: 0.12, sparkle: 0.0, bright: 5.0 },
      { s: 0.19, f: 1, z: 9, r: 1.0, g: 1.0, b: 1.0, sparkle: 1.0, bright: 1.0 },
      { s: 0.26, f: 1, z: 9, r: 1.0, g: 1.0, b: 1.0, sparkle: 1.0, bright: 1.0 },
      { s: 0.38, f: 2, z: 8, r: 1.0, g: 0.33, b: 0.33, sparkle: 1.0, bright: 1.0 },
      { s: 0.45, f: 2, z: 8, r: 1.0, g: 0.33, b: 0.33, sparkle: 1.0, bright: 1.0 },
      { s: 0.57, f: 3, z: 7.5, r: 0.6, g: 0.0, b: 0.0, sparkle: 1.0, bright: 1.0 },
      { s: 0.64, f: 3, z: 7.5, r: 0.6, g: 0.0, b: 0.0, sparkle: 1.0, bright: 1.0 },
      { s: 0.74, f: 4, z: 10, r: 1.0, g: 0.12, b: 0.12, sparkle: 1.0, bright: 1.0 },
      { s: 0.79, f: 4, z: 10, r: 1.0, g: 0.12, b: 0.12, sparkle: 1.0, bright: 1.0 },
      { s: 0.88, f: 5, z: 6, r: 1.0, g: 1.0, b: 1.0, sparkle: 1.0, bright: 1.0 },
      { s: 0.94, f: 5, z: 6, r: 1.0, g: 1.0, b: 1.0, sparkle: 1.0, bright: 1.0 },
      { s: 0.99, f: 6, z: 6, r: 1.0, g: 0.2, b: 0.2, sparkle: 1.0, bright: 1.2 },
      { s: 1.00, f: 6, z: 6, r: 1.0, g: 0.2, b: 0.2, sparkle: 1.0, bright: 1.2 },
    ];

    const mouseNDC = { x: -100, y: -100 };
    const mouse3D = new THREE.Vector3(100, 100, 100);
    const _v = new THREE.Vector3();
    const _d = new THREE.Vector3();

    let lastWidth = window.innerWidth;
    let lastHeight = window.innerHeight;

    const handleResize = () => {
      const newWidth = window.innerWidth;
      const newHeight = window.innerHeight;
      const isMobile = newWidth <= 768;

      if (isMobile && newWidth === lastWidth && Math.abs(newHeight - lastHeight) < 150) {
        return;
      }

      lastWidth = newWidth;
      lastHeight = newHeight;

      ren.setSize(newWidth, newHeight);
      cam.aspect = newWidth / newHeight;
      cam.updateProjectionMatrix();
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseNDC.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseNDC.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    function getState(s: number) {
      let i = 0;
      while (i < kf.length - 1 && kf[i + 1].s <= s) i++;
      const a = kf[i];
      const b = kf[Math.min(i + 1, kf.length - 1)];
      const range = b.s - a.s;
      const t = range > 0 ? Math.max(0, Math.min(1, (s - a.s) / range)) : 0;
      return {
        fA: a.f, fB: b.f, mix: a.f === b.f ? 0 : t,
        z: a.z + (b.z - a.z) * t,
        rA: a.r, gA: a.g, bA: a.b,
        rB: b.r, gB: b.g, bB: b.b,
        sparkle: a.sparkle + (b.sparkle - a.sparkle) * t,
        bright: a.bright + (b.bright - a.bright) * t,
      };
    }

    let frameId: number;
    const loop = () => {
      frameId = requestAnimationFrame(loop);
      const t = performance.now() * 0.001;
      const st = getState(scrollRef.current);
      const u = mat.uniforms;

      u.uFormA.value = st.fA;
      u.uFormB.value = st.fB;
      u.uMix.value = st.mix;
      u.uTime.value = t;
      u.uScrollVel.value += (Math.abs(scrollVelRef.current) - u.uScrollVel.value) * 0.1;
      u.uColorA.value.setRGB(st.rA, st.gA, st.bA);
      u.uColorB.value.setRGB(st.rB, st.gB, st.bB);
      u.uSparkleIntensity.value = st.sparkle;
      u.uBrightness.value = st.bright;

      _v.set(mouseNDC.x, mouseNDC.y, 0.5).unproject(cam);
      _d.copy(_v).sub(cam.position).normalize();
      const dist = -cam.position.z / _d.z;
      mouse3D.copy(cam.position).addScaledVector(_d, dist);
      u.uMouse.value.lerp(mouse3D, 0.05);

      const isMobile = window.innerWidth <= 768;
      const zOffset = isMobile ? 4 : 0;
      targetZ += ((st.z + zOffset) - targetZ) * 0.04;
      const mx = Math.max(-1, Math.min(1, mouseNDC.x));
      const my = Math.max(-1, Math.min(1, mouseNDC.y));
      cam.position.x += (mx * 0.4 - cam.position.x) * 0.02;
      cam.position.y += (my * 0.25 - cam.position.y) * 0.02;
      cam.position.z += (targetZ - cam.position.z) * 0.04;
      cam.lookAt(0, 0, 0);

      ren.render(scene, cam);
    };

    loop();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(frameId);
      ren.dispose();
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none bg-[#050505]">
      <canvas ref={canvasRef} className="w-full h-full opacity-40 sm:opacity-50" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(5,5,5,0.95)_100%)]" />
      <div className="absolute inset-0 bg-[#050505]/40" />
    </div>
  );
}
