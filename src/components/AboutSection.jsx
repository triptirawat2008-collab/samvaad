import React from 'react';
import { Globe2, ShieldCheck, Code2, ArrowRight } from 'lucide-react';

export default function AboutSection({ onOpenTranslate }) {
  return (
    <section className="py-12 md:py-16 max-w-4xl mx-auto px-4 sm:px-6">
      
      {/* Section Header */}
      <div className="space-y-2 mb-10 text-center md:text-left">
        <span className="text-xs font-semibold text-[#87966A] uppercase tracking-wider">
          Background & Purpose
        </span>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#183D32] tracking-tight">
          About Samwad
        </h1>
        <p className="text-sm text-[#72786F] max-w-2xl leading-relaxed">
          Indian Sign Language (ISL) is a rich, natural language utilized by the deaf and hard-of-hearing 
          communities across India. Samwad was built to facilitate direct communication without requiring 
          specialized wearable hardware.
        </p>
      </div>

      {/* 3 Information Blocks */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* Block 1: Linguistic Distinction */}
        <div className="bg-[#FAF9F4] border border-[#E9E0CF] rounded-lg p-5 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-[#183D32]">
              <Globe2 className="w-4 h-4 text-[#87966A]" />
              <h2 className="text-sm font-bold">Linguistic Characteristics</h2>
            </div>
            <p className="text-xs text-[#72786F] leading-relaxed">
              Unlike American Sign Language (ASL) which frequently employs single-handed spelling, 
              ISL incorporates dual-handed formations, distinctive spatial grammar, and a Subject-Object-Verb 
              (SOV) syntax.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-[#E9E0CF] text-[11px] font-medium text-[#87966A]">
            Dual-Hand Kinematics
          </div>
        </div>

        {/* Block 2: Technical Methodology */}
        <div className="bg-[#FAF9F4] border border-[#E9E0CF] rounded-lg p-5 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-[#183D32]">
              <Code2 className="w-4 h-4 text-[#87966A]" />
              <h2 className="text-sm font-bold">Vision-Based Modeling</h2>
            </div>
            <p className="text-xs text-[#72786F] leading-relaxed">
              Computer vision extracts normalized 3D articulatory coordinates per hand. Sequence recognition 
              interprets spatial trajectory dynamics across frame sequences to synthesize English phrases.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-[#E9E0CF] text-[11px] font-medium text-[#87966A]">
            Zero Specialized Sensors
          </div>
        </div>

        {/* Block 3: Privacy & Accessibility */}
        <div className="bg-[#FAF9F4] border border-[#E9E0CF] rounded-lg p-5 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-[#183D32]">
              <ShieldCheck className="w-4 h-4 text-[#87966A]" />
              <h2 className="text-sm font-bold">Privacy by Design</h2>
            </div>
            <p className="text-xs text-[#72786F] leading-relaxed">
              Video capture occurs strictly within the client browser session. Video streams are not stored 
              or uploaded, ensuring privacy during everyday interactions in public and personal spaces.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-[#E9E0CF] text-[11px] font-medium text-[#87966A]">
            Client-Side Privacy
          </div>
        </div>

      </div>

      {/* Footer CTA */}
      <div className="mt-8 pt-6 border-t border-[#E9E0CF] flex items-center justify-between text-xs text-[#72786F]">
        <span>Designed for accessible two-way communication.</span>
        {onOpenTranslate && (
          <button
            onClick={onOpenTranslate}
            className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded bg-[#183D32] hover:bg-[#225344] text-[#FAF9F4] text-xs font-medium cursor-pointer"
          >
            <span>Start Translating</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

    </section>
  );
}
