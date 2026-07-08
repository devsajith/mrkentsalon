import React from "react";

interface BarberScissorsLoaderProps {
  colorClass?: string;
  size?: number;
  label?: string;
  containerClass?: string;
}

export default function BarberScissorsLoader({
  colorClass = "text-accent",
  size = 64,
  label = "Loading...",
  containerClass = "flex flex-col items-center justify-center gap-4 py-8"
}: BarberScissorsLoaderProps) {
  return (
    <div className={containerClass}>
      <div 
        className="animate-scissors-container flex items-center justify-center" 
        style={{ width: size, height: size }}
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 64 64" 
          className={`w-full h-full ${colorClass}`}
        >
          {/* Scissors Pivot */}
          <circle cx="32" cy="32" r="2.5" className="fill-current text-text-primary" />
          
          {/* Left Handle and Right Blade */}
          <g className="animate-scissors-left">
            {/* Blade extending to top right */}
            <path d="M32 32 L48 12 C44 16, 38 24, 32 32 Z" fill="currentColor" />
            <path d="M32 32 L48 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            {/* Handle extending to bottom left */}
            <path d="M32 32 L20 44" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            {/* Ring at bottom left */}
            <circle cx="17" cy="47" r="5.5" stroke="currentColor" strokeWidth="2.5" fill="none" />
            {/* Finger rest (tang) on the ring */}
            <path d="M12 50 C9 51, 8 47, 11 44" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
          </g>

          {/* Right Handle and Left Blade */}
          <g className="animate-scissors-right">
            {/* Blade extending to top left */}
            <path d="M32 32 L16 12 C20 16, 26 24, 32 32 Z" fill="currentColor" />
            <path d="M32 32 L16 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            {/* Handle extending to bottom right */}
            <path d="M32 32 L44 44" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            {/* Ring at bottom right */}
            <circle cx="47" cy="47" r="5.5" stroke="currentColor" strokeWidth="2.5" fill="none" />
          </g>
        </svg>
      </div>
      {label && (
        <span className="text-xs font-bold uppercase tracking-widest text-text-secondary animate-pulse">
          {label}
        </span>
      )}
    </div>
  );
}
