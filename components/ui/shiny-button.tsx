import React from 'react';

interface ShinyButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary' | 'outline';
}

export function ShinyButton({
  children = 'Get unlimited access',
  className = '',
  variant = 'primary',
  ...props
}: ShinyButtonProps) {
  return (
    <button
      className={`group relative inline-flex items-center justify-center overflow-hidden rounded-full p-[1px] font-bold text-sm tracking-wide transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none cursor-pointer ${className}`}
      {...props}
    >
      {/* Top glowing shine effect / Specular light reflection */}
      <span className="absolute inset-x-0 top-0 h-[2px] w-3/4 mx-auto bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-85 blur-[0.5px] transition-all duration-500 group-hover:w-full group-hover:opacity-100" />

      {/* Ambient background glow aura */}
      <span className="absolute inset-0 rounded-full bg-gradient-to-b from-blue-600/30 via-slate-900/60 to-black opacity-80" />

      {/* Button Body with Midnight Gradient and Ambient Blue Drop-Shadow */}
      <span className="relative flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-b from-[#0b0f19] to-[#030712] border border-white/10 text-white shadow-[0_0_20px_rgba(59,130,246,0.2)] group-hover:shadow-[0_0_28px_rgba(56,189,248,0.45)] group-hover:border-cyan-500/40 transition-all duration-300">
        {children}
      </span>
    </button>
  );
}

export default ShinyButton;
