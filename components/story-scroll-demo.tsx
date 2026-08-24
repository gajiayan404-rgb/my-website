import React from 'react';
import FlowArt, { FlowSection } from '@/components/ui/story-scroll';

export const StoryScrollDemo: React.FC = () => {
  return (
    <FlowArt aria-label="Ayan Gaji Portfolio Presentation">
      <FlowSection aria-label="Who I Am" style={{ backgroundColor: '#0B0F19', color: '#fff' }}>
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#00F2FE]">01 — Senior Full-Stack Engineer</p>
        <hr className="my-[2vw] border-none border-t border-white/20 opacity-100" />
        <div>
          <h1 className="text-[clamp(3rem,9vw,11rem)] font-bold leading-[0.88] uppercase tracking-tight text-white">
            Ayan<br /><span style={{ color: '#00F2FE' }}>Gaji</span><br />.DEV
          </h1>
        </div>
        <hr className="my-[2vw] border-none border-t border-white/20 opacity-100" />
        <p className="mt-auto max-w-[50ch] text-[clamp(1rem,2.2vw,1.8rem)] font-normal leading-relaxed text-gray-300">
          Engineering robust Python REST microservices, SQLite relational databases, and high-performance glassmorphic web architectures.
        </p>
      </FlowSection>

      <FlowSection aria-label="Core Skills" style={{ backgroundColor: '#070a14', color: '#fff' }}>
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#7F00FF]">02 — Core Technical Matrix</p>
        <hr className="my-[2vw] border-none border-t border-white/20" />
        <div>
          <h2 className="text-[clamp(2.8rem,8vw,9rem)] font-bold leading-[0.88] uppercase tracking-tight">
            Python 3<br />SQLite DB<br /><span style={{ color: '#7F00FF' }}>React & 3D</span>
          </h2>
        </div>
        <hr className="my-[2vw] border-none border-t border-white/20" />
        <p className="max-w-[50ch] text-[clamp(1rem,2.2vw,1.8rem)] font-normal leading-relaxed text-gray-300">
          Over 3+ years designing RESTful APIs, relational schema optimizations, asynchronous DOM pipelines, and Three.js 3D WebGL user interfaces.
        </p>
      </FlowSection>

      <FlowSection aria-label="Featured Projects" style={{ backgroundColor: '#0f172a', color: '#fff' }}>
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#38bdf8]">03 — Featured Production Work</p>
        <hr className="my-[2vw] border-none border-t border-white/20" />
        <div>
          <h2 className="text-[clamp(2.5rem,7vw,8rem)] font-bold leading-[0.9] uppercase tracking-tight">
            Smart Color<br />Python API<br />Glass Suite
          </h2>
        </div>
        <hr className="my-[2vw] border-none border-t border-white/20" />
        <p className="max-w-[50ch] text-[clamp(1rem,2.2vw,1.8rem)] font-normal leading-relaxed text-gray-300">
          Live Netlify applications, custom calculation visualizers, instant PDF generation engines, and real-time cloud synchronizations.
        </p>
      </FlowSection>

      <FlowSection aria-label="Contact & Hire" style={{ backgroundColor: '#030014', color: '#fff' }}>
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#10b981]">04 — Let&apos;s Build Together</p>
        <hr className="my-[2vw] border-none border-t border-white/20" />
        <div>
          <h2 className="text-[clamp(2.8rem,8vw,9rem)] font-bold leading-[0.88] uppercase tracking-tight">
            Available<br />For Hire<br /><span style={{ color: '#10b981' }}>Worldwide</span>
          </h2>
        </div>
        <p className="mt-auto max-w-[50ch] text-[clamp(1rem,2.2vw,1.8rem)] font-normal leading-relaxed text-gray-300">
          Direct Email: <strong className="text-white">gajiayan404@gmail.com</strong> — Response time under 24 hours. Open for custom projects and engineering roles.
        </p>
      </FlowSection>
    </FlowArt>
  );
};

export default StoryScrollDemo;
