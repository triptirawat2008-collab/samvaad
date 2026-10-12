import React from 'react';
import { ShieldCheck } from 'lucide-react';

const CURRENT_YEAR = 2026;

export default function Footer({ onNavigate }) {
  const handleNav = (view) => {
    if (onNavigate) {
      onNavigate(view);
    }
  };

  return (
    <footer className="bg-[#183D32] text-[#FAF9F4] border-t border-[#235244] py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 pb-8 border-b border-[#235244]">
          
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-2.5">
            <div className="flex items-center space-x-2">
              <div className="w-7 h-7 rounded bg-[#FAF9F4]/10 border border-[#FAF9F4]/15 flex items-center justify-center p-1 text-[#FAF9F4]">
                <svg viewBox="0 0 40 40" className="w-full h-full text-[#87966A]" fill="none" stroke="currentColor">
                  <path d="M8 28 C16 16, 24 16, 32 28" stroke="#87966A" strokeWidth="2.5" strokeLinecap="round" />
                  <path d="M15 27V16C15 14.9 15.9 14 17 14C18.1 14 19 14.9 19 16V22" strokeWidth="2" strokeLinecap="round" />
                  <path d="M19 16V13C19 11.9 19.9 11 21 11C22.1 11 23 11.9 23 13V22" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
              <span className="text-base font-bold tracking-tight text-[#FAF9F4]">
                Samwad
              </span>
            </div>
            <p className="text-xs text-[#FAF9F4]/70 max-w-sm leading-relaxed">
              An assistive application bridging Indian Sign Language (ISL) gestures and English 
              communication through real-time video translation.
            </p>
            <div className="flex items-center space-x-1.5 text-xs text-[#87966A]">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Camera frames are processed in-session; no video is saved or transmitted.</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-2">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#87966A]">
              Navigation
            </h3>
            <ul className="space-y-1.5 text-xs text-[#FAF9F4]/75">
              <li>
                <button 
                  onClick={() => handleNav('home')}
                  className="hover:text-[#FAF9F4] transition-colors cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('translate')}
                  className="hover:text-[#FAF9F4] transition-colors cursor-pointer"
                >
                  Translate Workspace
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('how-it-works')}
                  className="hover:text-[#FAF9F4] transition-colors cursor-pointer"
                >
                  How It Works
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('about')}
                  className="hover:text-[#FAF9F4] transition-colors cursor-pointer"
                >
                  About ISL
                </button>
              </li>
            </ul>
          </div>

          {/* Technical Architecture */}
          <div className="space-y-2">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#87966A]">
              Technology
            </h3>
            <ul className="space-y-1.5 text-xs text-[#FAF9F4]/75">
              <li>Indian Sign Language (ISL)</li>
              <li>Spatial Landmark Extraction</li>
              <li>Sequential Gesture Recognition</li>
              <li>Live Caption Synthesis</li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright row */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-[#FAF9F4]/60 gap-3">
          <p>
            &copy; {CURRENT_YEAR} Samwad. All rights reserved.
          </p>
          <p>
            Designed for accessible, dignified communication.
          </p>
        </div>

      </div>
    </footer>
  );
}
