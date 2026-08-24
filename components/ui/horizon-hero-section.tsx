import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import './horizon-hero-section.css';

gsap.registerPlugin(ScrollTrigger);

interface ThreeRefs {
  scene: THREE.Scene | null;
  camera: THREE.PerspectiveCamera | null;
  renderer: THREE.WebGLRenderer | null;
  composer: EffectComposer | null;
  stars: THREE.Points[];
  nebula: THREE.Mesh | null;
  mountains: THREE.Mesh[];
  atmosphere: THREE.Mesh | null;
  animationId: number | null;
}

const SECTION_DATA = [
  {
    id: 'ayan-gaji',
    name: 'AYAN GAJI',
    tag: 'FULL-STACK',
    badge: '01 // SENIOR ENGINEER',
    line1: 'Senior Full-Stack Web Engineer & System Architect.',
    line2: 'Crafting Python Microservices, SQLite Architectures & Glassmorphic Web Apps.',
    metrics: [
      { label: 'EXPERIENCE', value: '3+ Years', change: 'MAX' },
      { label: 'API UPTIME', value: '99.9%', change: '+0.1%' },
      { label: 'DEV STATUS', value: 'AVAILABLE', status: 'optimal' }
    ]
  },
  {
    id: 'skills',
    name: 'SKILLS MATRIX',
    tag: 'ARCHITECTURE',
    badge: '02 // CORE PROFICIENCIES',
    line1: 'Python 3, REST Microservices & SQLite Database Engines,',
    line2: 'Modern JavaScript (ES6+), React.js, and Three.js 3D WebGL.',
    metrics: [
      { label: 'PYTHON & REST', value: '95%', change: 'EXPERT' },
      { label: 'JS & WEBGL', value: '94%', change: 'EXPERT' },
      { label: 'SQLITE DB', value: '90%', status: 'optimal' }
    ]
  },
  {
    id: 'contact',
    name: 'CONTACT ME',
    tag: 'HIRE ME',
    badge: '03 // DIRECT CONNECT',
    line1: 'Available for Custom Full-Stack Projects & Senior Engineering Roles.',
    line2: 'Direct Email: gajiayan404@gmail.com | Global Remote Availability.',
    metrics: [
      { label: 'RESPONSE TIME', value: '< 24 Hours', change: 'FAST' },
      { label: 'COMMUNICATION', value: 'DIRECT', change: 'ACTIVE' },
      { label: 'LOCATION', value: 'WORLDWIDE', status: 'optimal' }
    ]
  }
];

export const Component: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cardBoxRef = useRef<HTMLDivElement>(null);
  const titleContainerRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const metricsBoxRef = useRef<HTMLDivElement>(null);
  const scrollProgressRef = useRef<HTMLDivElement>(null);
  const progressFillRef = useRef<HTMLDivElement>(null);
  const sectionCounterRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  // Smooth scroll tracking refs
  const targetScrollProgress = useRef(0);
  const currentScrollProgress = useRef(0);
  const currentSectionRef = useRef(0);

  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [isReady, setIsReady] = useState(true);
  const totalSections = SECTION_DATA.length;

  const threeRefs = useRef<ThreeRefs>({
    scene: null,
    camera: null,
    renderer: null,
    composer: null,
    stars: [],
    nebula: null,
    mountains: [],
    atmosphere: null,
    animationId: null
  });

  // Smooth programmatic scroll navigation function
  const scrollToSection = useCallback((index: number) => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const maxScroll = documentHeight - windowHeight;
    const targetY = (index / (totalSections - 1)) * maxScroll;

    window.scrollTo({
      top: targetY,
      behavior: 'smooth'
    });
  }, [totalSections]);

  const handleNextSection = useCallback(() => {
    const nextIdx = (activeSectionIndex + 1) % totalSections;
    scrollToSection(nextIdx);
  }, [activeSectionIndex, totalSections, scrollToSection]);

  const handlePrevSection = useCallback(() => {
    const prevIdx = (activeSectionIndex - 1 + totalSections) % totalSections;
    scrollToSection(prevIdx);
  }, [activeSectionIndex, totalSections, scrollToSection]);

  // Professional 3D Card Mouse Tilt & Specular Reflection Effect
  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardBoxRef.current) return;
    const card = cardBoxRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -7;
    const rotateY = ((x - centerX) / centerX) * 7;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    card.style.setProperty('--mouse-x', `${(x / rect.width) * 100}%`);
    card.style.setProperty('--mouse-y', `${(y / rect.height) * 100}%`);
  };

  const handleCardMouseLeave = () => {
    if (!cardBoxRef.current) return;
    cardBoxRef.current.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)`;
  };

  // Initialize Three.js WebGL Scene
  useEffect(() => {
    if (!canvasRef.current) return;

    const { current: refs } = threeRefs;
    const width = window.innerWidth;
    const height = window.innerHeight;

    // Scene setup
    refs.scene = new THREE.Scene();
    refs.scene.fog = new THREE.FogExp2(0x030014, 0.0003);

    // Camera
    refs.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 3000);
    refs.camera.position.set(0, 25, 260);

    // High performance WebGL Renderer
    refs.renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
      stencil: false,
      depth: true
    });
    refs.renderer.setSize(width, height);
    refs.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    refs.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    refs.renderer.toneMappingExposure = 0.68;

    // Post-processing Effect Composer
    refs.composer = new EffectComposer(refs.renderer);
    const renderPass = new RenderPass(refs.scene, refs.camera);
    refs.composer.addPass(renderPass);

    // UnrealBloomPass
    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(Math.floor(width / 2), Math.floor(height / 2)),
      0.7,
      0.35,
      0.8
    );
    refs.composer.addPass(bloomPass);

    // 1. Create Procedural Starfields
    const starCount = 4500;
    for (let i = 0; i < 3; i++) {
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(starCount * 3);
      const colors = new Float32Array(starCount * 3);
      const sizes = new Float32Array(starCount);

      for (let j = 0; j < starCount; j++) {
        const radius = 250 + Math.random() * 950;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(Math.random() * 2 - 1);

        positions[j * 3] = radius * Math.sin(phi) * Math.cos(theta);
        positions[j * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
        positions[j * 3 + 2] = radius * Math.cos(phi);

        const color = new THREE.Color();
        const colorChoice = Math.random();
        if (colorChoice < 0.6) {
          color.setHSL(0.58, 0.8, 0.85); // Electric Blue/Cyan
        } else if (colorChoice < 0.85) {
          color.setHSL(0.8, 0.7, 0.85);  // Purple Violet
        } else {
          color.setHSL(0, 0, 0.98);      // Pure White
        }

        colors[j * 3] = color.r;
        colors[j * 3 + 1] = color.g;
        colors[j * 3 + 2] = color.b;
        sizes[j] = Math.random() * 2.4 + 0.6;
      }

      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
      geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

      const material = new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 },
          depth: { value: i }
        },
        vertexShader: `
          attribute float size;
          attribute vec3 color;
          varying vec3 vColor;
          uniform float time;
          uniform float depth;
          
          void main() {
            vColor = color;
            vec3 pos = position;
            
            float angle = time * 0.035 * (1.0 - depth * 0.25);
            mat2 rot = mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
            pos.xy = rot * pos.xy;
            
            vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
            gl_PointSize = size * (280.0 / -mvPosition.z);
            gl_Position = projectionMatrix * mvPosition;
          }
        `,
        fragmentShader: `
          varying vec3 vColor;
          void main() {
            float dist = length(gl_PointCoord - vec2(0.5));
            if (dist > 0.5) discard;
            float opacity = 1.0 - smoothstep(0.0, 0.5, dist);
            gl_FragColor = vec4(vColor, opacity * 0.95);
          }
        `,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      });

      const stars = new THREE.Points(geometry, material);
      refs.scene.add(stars);
      refs.stars.push(stars);
    }

    // 2. Create Dynamic Glowing Nebula Plane
    const nebulaGeo = new THREE.PlaneGeometry(7000, 3500, 70, 70);
    const nebulaMat = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        color1: { value: new THREE.Color(0x0055ff) },
        color2: { value: new THREE.Color(0xa800ff) },
        color3: { value: new THREE.Color(0x00f2fe) },
        opacity: { value: 0.3 }
      },
      vertexShader: `
        varying vec2 vUv;
        varying float vElevation;
        uniform float time;
        void main() {
          vUv = uv;
          vec3 pos = position;
          float elevation = sin(pos.x * 0.007 + time * 0.5) * cos(pos.y * 0.007 + time * 0.4) * 32.0;
          pos.z += elevation;
          vElevation = elevation;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 color1;
        uniform vec3 color2;
        uniform vec3 color3;
        uniform float opacity;
        uniform float time;
        varying vec2 vUv;
        varying float vElevation;
        
        void main() {
          float mix1 = sin(vUv.x * 5.0 + time * 0.4) * 0.5 + 0.5;
          float mix2 = cos(vUv.y * 5.0 + time * 0.3) * 0.5 + 0.5;
          vec3 col = mix(color1, color2, mix1);
          col = mix(col, color3, mix2 * 0.45);
          float alpha = opacity * (1.0 - length(vUv - 0.5) * 1.8);
          alpha = clamp(alpha * (1.0 + vElevation * 0.015), 0.0, 1.0);
          gl_FragColor = vec4(col, alpha);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
      depthWrite: false
    });

    const nebula = new THREE.Mesh(nebulaGeo, nebulaMat);
    nebula.position.set(0, 45, -880);
    refs.scene.add(nebula);
    refs.nebula = nebula;

    // 3. Create Multi-Layer Parallax Mountains
    const mountainLayers = [
      { distance: -60, height: 50, color: 0x0c0c1e, opacity: 0.95 },
      { distance: -130, height: 75, color: 0x09142b, opacity: 0.85 },
      { distance: -210, height: 95, color: 0x071e3d, opacity: 0.70 },
      { distance: -320, height: 125, color: 0x052d56, opacity: 0.50 }
    ];

    mountainLayers.forEach((layer, index) => {
      const points: THREE.Vector2[] = [];
      const segments = 60;
      for (let i = 0; i <= segments; i++) {
        const x = (i / segments - 0.5) * 1500;
        const y = Math.sin(i * 0.12 + index) * layer.height +
                 Math.sin(i * 0.06) * layer.height * 0.6 +
                 Math.cos(i * 0.18) * layer.height * 0.25 - 80;
        points.push(new THREE.Vector2(x, y));
      }
      points.push(new THREE.Vector2(3200, -350));
      points.push(new THREE.Vector2(-3200, -350));

      const shape = new THREE.Shape(points);
      const geometry = new THREE.ShapeGeometry(shape);
      const material = new THREE.MeshBasicMaterial({
        color: layer.color,
        transparent: true,
        opacity: layer.opacity,
        side: THREE.DoubleSide
      });

      const mountain = new THREE.Mesh(geometry, material);
      mountain.position.set(0, -10, layer.distance);
      mountain.userData = { 
        baseZ: layer.distance, 
        baseY: -10, 
        baseOpacity: layer.opacity,
        index 
      };
      refs.scene!.add(mountain);
      refs.mountains.push(mountain);
    });

    // 4. Create Atmospheric Glow
    const atmoGeo = new THREE.SphereGeometry(750, 32, 32);
    const atmoMat = new THREE.ShaderMaterial({
      uniforms: { time: { value: 0 } },
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        uniform float time;
        void main() {
          float intensity = pow(0.65 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.2);
          vec3 atmosphere = vec3(0.2, 0.55, 1.0) * intensity;
          float pulse = sin(time * 1.5) * 0.08 + 0.92;
          gl_FragColor = vec4(atmosphere * pulse, intensity * 0.22);
        }
      `,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
      transparent: true
    });
    const atmosphere = new THREE.Mesh(atmoGeo, atmoMat);
    refs.scene.add(atmosphere);
    refs.atmosphere = atmosphere;

    // Smooth Animation & Scroll RAF Loop
    const animate = () => {
      refs.animationId = requestAnimationFrame(animate);
      const time = performance.now() * 0.001;

      // 60-120 FPS Smooth Lerp
      const lerpSpeed = 0.065;
      currentScrollProgress.current += (targetScrollProgress.current - currentScrollProgress.current) * lerpSpeed;
      const progress = currentScrollProgress.current;

      // Update DOM progress bar without triggering React re-renders
      if (progressFillRef.current) {
        progressFillRef.current.style.width = `${Math.min(Math.max(progress * 100, 0), 100)}%`;
      }

      // Detect active section switch and trigger smooth animated transition
      const activeIdx = Math.min(Math.floor(progress * totalSections + 0.15), totalSections - 1);
      if (activeIdx !== currentSectionRef.current) {
        currentSectionRef.current = activeIdx;
        setActiveSectionIndex(activeIdx);
        if (sectionCounterRef.current) {
          sectionCounterRef.current.innerText = `${String(activeIdx + 1).padStart(2, '0')} / ${String(totalSections).padStart(2, '0')}`;
        }
      }

      // Spline/Keyframe Camera Interpolation
      const cameraPositions = [
        { x: 0, y: 25, z: 260 },
        { x: 0, y: 38, z: 20 },
        { x: 0, y: 55, z: -480 }
      ];

      const scaledProgress = progress * (cameraPositions.length - 1);
      const segmentIndex = Math.min(Math.floor(scaledProgress), cameraPositions.length - 2);
      const segmentProgress = Math.max(0, Math.min(1, scaledProgress - segmentIndex));

      const p0 = cameraPositions[segmentIndex];
      const p1 = cameraPositions[segmentIndex + 1] || p0;

      // Cosine easing
      const smoothT = (1 - Math.cos(segmentProgress * Math.PI)) / 2;
      const targetCamX = p0.x + (p1.x - p0.x) * smoothT;
      const targetCamY = p0.y + (p1.y - p0.y) * smoothT;
      const targetCamZ = p0.z + (p1.z - p0.z) * smoothT;

      // Subtle float motion
      const floatX = Math.sin(time * 0.3) * 1.5;
      const floatY = Math.cos(time * 0.4) * 1.0;

      if (refs.camera) {
        refs.camera.position.x = targetCamX + floatX;
        refs.camera.position.y = targetCamY + floatY;
        refs.camera.position.z = targetCamZ;
        refs.camera.lookAt(0, targetCamY * 0.3, targetCamZ - 400);
      }

      // Update Starfield
      refs.stars.forEach((starField) => {
        const mat = starField.material as THREE.ShaderMaterial;
        if (mat.uniforms) mat.uniforms.time.value = time;
      });

      // Update Nebula
      if (refs.nebula) {
        const mat = refs.nebula.material as THREE.ShaderMaterial;
        if (mat.uniforms) mat.uniforms.time.value = time;
        refs.nebula.position.z = targetCamZ - 800;
      }

      // Update Atmosphere
      if (refs.atmosphere) {
        const mat = refs.atmosphere.material as THREE.ShaderMaterial;
        if (mat.uniforms) mat.uniforms.time.value = time;
      }

      // Parallax Mountains
      refs.mountains.forEach((mountain) => {
        const data = mountain.userData;
        mountain.position.y = data.baseY + Math.sin(time * 0.5 + data.index) * 1.5;
        
        if (refs.camera) {
          const distanceToCam = mountain.position.z - refs.camera.position.z;
          const mat = mountain.material as THREE.MeshBasicMaterial;
          if (distanceToCam > -50) {
            const fade = Math.max(0, Math.min(1, (distanceToCam + 120) / 120));
            mat.opacity = data.baseOpacity * fade;
          } else {
            mat.opacity = data.baseOpacity;
          }
        }
      });

      if (refs.composer) {
        refs.composer.render();
      }
    };

    animate();
    setIsReady(true);

    const handleResize = () => {
      const newWidth = window.innerWidth;
      const newHeight = window.innerHeight;
      if (refs.camera && refs.renderer && refs.composer) {
        refs.camera.aspect = newWidth / newHeight;
        refs.camera.updateProjectionMatrix();
        refs.renderer.setSize(newWidth, newHeight);
        refs.composer.setSize(newWidth, newHeight);
      }
    };

    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      if (refs.animationId) cancelAnimationFrame(refs.animationId);
      window.removeEventListener('resize', handleResize);

      refs.stars.forEach((starField) => {
        starField.geometry.dispose();
        (starField.material as THREE.Material).dispose();
      });

      refs.mountains.forEach((mountain) => {
        mountain.geometry.dispose();
        (mountain.material as THREE.Material).dispose();
      });

      if (refs.nebula) {
        refs.nebula.geometry.dispose();
        (refs.nebula.material as THREE.Material).dispose();
      }

      if (refs.atmosphere) {
        refs.atmosphere.geometry.dispose();
        (refs.atmosphere.material as THREE.Material).dispose();
      }

      if (refs.renderer) refs.renderer.dispose();
    };
  }, [totalSections]);

  // Passive high-performance scroll listener
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const maxScroll = documentHeight - windowHeight;
      const progress = maxScroll > 0 ? Math.min(Math.max(scrollY / maxScroll, 0), 1) : 0;
      
      targetScrollProgress.current = progress;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Professional Box & Content Transition GSAP Animation
  useEffect(() => {
    if (!cardBoxRef.current) return;

    // Elegant spring-loaded card entry animation
    gsap.fromTo(
      cardBoxRef.current,
      { 
        y: 40, 
        opacity: 0, 
        scale: 0.94,
        filter: 'blur(12px)',
        transformPerspective: 1000
      },
      { 
        y: 0, 
        opacity: 1, 
        scale: 1, 
        filter: 'blur(0px)',
        duration: 0.85, 
        ease: 'power3.out' 
      }
    );

    if (titleContainerRef.current) {
      gsap.fromTo(
        titleContainerRef.current,
        { y: 25, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, delay: 0.1, ease: 'power3.out' }
      );
    }

    if (subtitleRef.current) {
      gsap.fromTo(
        subtitleRef.current.children,
        { y: 15, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 0.6, delay: 0.2, ease: 'power2.out' }
      );
    }

    if (metricsBoxRef.current) {
      gsap.fromTo(
        metricsBoxRef.current.children,
        { y: 20, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, stagger: 0.08, duration: 0.6, delay: 0.25, ease: 'back.out(1.4)' }
      );
    }
  }, [activeSectionIndex]);

  // Entrance Intro GSAP Animations
  useEffect(() => {
    if (!isReady) return;

    gsap.set([menuRef.current, scrollProgressRef.current, scrollIndicatorRef.current], {
      visibility: 'visible'
    });

    const tl = gsap.timeline();

    if (menuRef.current) {
      tl.from(menuRef.current, { x: -80, opacity: 0, duration: 1, ease: 'power3.out' });
    }

    if (scrollIndicatorRef.current) {
      tl.from(scrollIndicatorRef.current, { y: 40, opacity: 0, duration: 0.8, ease: 'power2.out' }, '-=0.5');
    }

    if (scrollProgressRef.current) {
      tl.from(scrollProgressRef.current, { opacity: 0, y: 30, duration: 0.8, ease: 'power2.out' }, '-=0.5');
    }

    return () => {
      tl.kill();
    };
  }, [isReady]);

  const activeSection = SECTION_DATA[activeSectionIndex] || SECTION_DATA[0];

  return (
    <div ref={containerRef} className="hero-container cosmos-style">
      {/* 3D WebGL Canvas */}
      <canvas ref={canvasRef} className="hero-canvas" />

      {/* Floating Side Glass Menu Box */}
      <div ref={menuRef} className="side-menu glass-interactive-box" style={{ visibility: 'visible' }}>
        <div className="menu-icon">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div className="vertical-text">AYAN.DEV</div>
      </div>

      {/* Interactive Right-Side Section Navigation Controls */}
      <nav className="section-nav-controls" aria-label="Section Navigation">
        <div className="nav-controls-pill glass-interactive-box">
          {SECTION_DATA.map((section, idx) => {
            const isActive = activeSectionIndex === idx;
            return (
              <button
                key={section.id}
                onClick={() => scrollToSection(idx)}
                className={`nav-dot-btn ${isActive ? 'active' : ''}`}
                title={`Jump to ${section.name}`}
                aria-label={`Jump to ${section.name}`}
              >
                <span className="dot-circle" />
                <span className="dot-label">{section.name}</span>
              </button>
            );
          })}
        </div>

        {/* Up / Down Navigation Controls */}
        <div className="nav-arrow-group glass-interactive-box">
          <button 
            onClick={handlePrevSection} 
            className="nav-arrow-btn" 
            title="Previous Section"
            aria-label="Previous Section"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="18 15 12 9 6 15"></polyline>
            </svg>
          </button>
          <button 
            onClick={handleNextSection} 
            className="nav-arrow-btn" 
            title="Next Section"
            aria-label="Next Section"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>
        </div>
      </nav>

      {/* Center 3D Professional Glass Feature Box with Mouse Tilt & Sheen */}
      <div className="hero-content cosmos-content">
        <div 
          ref={cardBoxRef} 
          className="pro-glass-card-box"
          onMouseMove={handleCardMouseMove}
          onMouseLeave={handleCardMouseLeave}
        >
          {/* Card Border Shimmer Highlight */}
          <div className="card-border-glow" />

          {/* Section Header & Badge */}
          <div ref={titleContainerRef} className="title-wrapper">
            <div className="section-badge-pill">
              <span className="badge-pulse-dot" />
              <span className="badge-text">{activeSection.badge}</span>
            </div>
            <h1 className="hero-title">{activeSection.name}</h1>
          </div>

          {/* Subtitle */}
          <div ref={subtitleRef} className="hero-subtitle cosmos-subtitle">
            <p className="subtitle-line">{activeSection.line1}</p>
            <p className="subtitle-line">{activeSection.line2}</p>
          </div>

          {/* Professional Metrics Telemetry Grid (Boxes) */}
          <div ref={metricsBoxRef} className="metrics-telemetry-grid">
            {activeSection.metrics.map((metric, i) => (
              <div key={i} className="metric-chip-box">
                <span className="metric-label">{metric.label}</span>
                <div className="metric-val-row">
                  <span className="metric-val">{metric.value}</span>
                  {metric.change && (
                    <span className="metric-tag">{metric.change}</span>
                  )}
                  {metric.status && (
                    <span className="metric-status-glow" />
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Subtle CTA Action in Box */}
          <div className="card-footer-action">
            <button className="pro-explore-btn" onClick={handleNextSection}>
              <span>EXPLORE DEEP DIVE</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Bottom Scroll Indicator */}
      <div 
        ref={scrollIndicatorRef} 
        className="interactive-scroll-indicator glass-interactive-box" 
        onClick={handleNextSection}
        style={{ visibility: 'visible' }}
        title="Click or scroll to explore"
      >
        <div className="mouse-icon">
          <div className="mouse-wheel" />
        </div>
        <span className="indicator-text">SCROLL TO EXPLORE</span>
        <div className="scroll-arrow-pulse">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
          </svg>
        </div>
      </div>

      {/* High Performance Scroll Progress HUD Box */}
      <div ref={scrollProgressRef} className="scroll-progress glass-interactive-box" style={{ visibility: 'visible' }}>
        <div className="scroll-text">{activeSection.tag}</div>
        <div className="progress-track">
          <div ref={progressFillRef} className="progress-fill" style={{ width: '0%' }} />
        </div>
        <div ref={sectionCounterRef} className="section-counter">
          01 / 03
        </div>
      </div>

      {/* Scroll Sections defining total page scroll height */}
      <div className="scroll-sections">
        {SECTION_DATA.map((section, idx) => (
          <section key={idx} className="content-section" id={`section-${section.id}`}>
            <div className="section-anchor" />
          </section>
        ))}
      </div>
    </div>
  );
};

export default Component;
