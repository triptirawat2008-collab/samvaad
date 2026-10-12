import React, { useState } from 'react';
import { Menu, X, Video } from 'lucide-react';

export default function Header({ 
  activeView, 
  onNavigate, 
  isCameraActive 
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNav = (view) => {
    setMobileMenuOpen(false);
    if (onNavigate) {
      onNavigate(view);
    }
  };

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'translate', label: 'Translate', hasLiveIndicator: true },
    { id: 'how-it-works', label: 'How It Works' },
    { id: 'about', label: 'About' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#183D32] text-[#FAF9F4] border-b border-[#235244]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14 md:h-16">
          
          {/* Logo & Samwad Name */}
          <button 
            onClick={() => handleNav('home')}
            className="flex items-center space-x-2.5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#87966A] rounded p-1 cursor-pointer"
            aria-label="Samwad Home"
          >
            <div className="w-8 h-8 rounded bg-[#FAF9F4]/10 border border-[#FAF9F4]/15 flex items-center justify-center p-1.5 text-[#FAF9F4]">
              <svg viewBox="0 0 40 40" className="w-full h-full text-[#FAF9F4]" fill="none" stroke="currentColor">
                <path d="M8 28 C16 16, 24 16, 32 28" stroke="#87966A" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M15 27V16C15 14.9 15.9 14 17 14C18.1 14 19 14.9 19 16V22" strokeWidth="2" strokeLinecap="round" />
                <path d="M19 16V13C19 11.9 19.9 11 21 11C22.1 11 23 11.9 23 13V22" strokeWidth="2" strokeLinecap="round" />
                <path d="M23 16V14.5C23 13.4 23.9 12.5 25 12.5C26.1 12.5 27 13.4 27 14.5V23" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
            
            <div className="flex items-baseline space-x-2">
              <span className="font-semibold text-lg tracking-tight text-[#FAF9F4]">
                Samwad
              </span>
              <span className="text-xs text-[#FAF9F4]/60 font-normal hidden sm:inline">
                ISL Translation
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 text-sm font-medium">
            {navItems.map((item) => {
              const isActive = activeView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNav(item.id)}
                  className={`px-3 py-1.5 rounded transition-colors cursor-pointer flex items-center space-x-1.5 ${
                    isActive
                      ? 'bg-[#235244] text-[#FAF9F4]'
                      : 'text-[#FAF9F4]/75 hover:text-[#FAF9F4] hover:bg-[#235244]/50'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <span>{item.label}</span>
                  {item.hasLiveIndicator && isCameraActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#87966A]" title="Camera Active" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Primary Header Action */}
          <div className="hidden md:flex items-center">
            {activeView !== 'translate' ? (
              <button
                onClick={() => handleNav('translate')}
                className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-md bg-[#87966A] hover:bg-[#96a677] text-[#FAF9F4] font-medium text-xs sm:text-sm transition-colors cursor-pointer"
              >
                <Video className="w-3.5 h-3.5" />
                <span>Start Translating</span>
              </button>
            ) : (
              <span className="text-xs text-[#FAF9F4]/60">
                Studio Active
              </span>
            )}
          </div>

          {/* Mobile hamburger menu toggle */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 rounded text-[#FAF9F4] hover:bg-[#235244] focus:outline-none"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden py-2 border-t border-[#235244] space-y-1 bg-[#183D32]">
            {navItems.map((item) => {
              const isActive = activeView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNav(item.id)}
                  className={`block w-full text-left px-3 py-2 rounded text-sm font-medium ${
                    isActive ? 'bg-[#235244] text-[#FAF9F4]' : 'text-[#FAF9F4]/80 hover:bg-[#235244]'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {item.label} {item.hasLiveIndicator && isCameraActive && '• Live'}
                </button>
              );
            })}
            {activeView !== 'translate' && (
              <div className="pt-2 px-1">
                <button
                  onClick={() => handleNav('translate')}
                  className="w-full text-center px-4 py-2 rounded-md bg-[#87966A] text-[#FAF9F4] font-medium text-sm hover:bg-[#96a677]"
                >
                  Start Translating
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
