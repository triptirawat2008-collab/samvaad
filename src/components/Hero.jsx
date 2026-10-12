import React from 'react';
import { Camera, ArrowRight, Eye, Cpu, MessageSquare } from 'lucide-react';

export default function Hero({ onStartTranslating, onLearnMore }) {
  const steps = [
    {
      number: '1',
      title: 'Capture signs',
      description: 'Your webcam records natural hand and body gestures directly in the browser.',
      icon: Eye,
    },
    {
      number: '2',
      title: 'Recognize gestures',
      description: 'Computer vision maps landmark positions to identify Indian Sign Language motion sequences.',
      icon: Cpu,
    },
    {
      number: '3',
      title: 'Display English captions',
      description: 'Translated English sentences appear as clean, legible captions directly over the video stream.',
      icon: MessageSquare,
    },
  ];

  return (
    <section className="py-12 md:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-12">
        
        {/* Main Headline & Purpose Statement */}
        <div className="space-y-4 text-center md:text-left">
          <div className="inline-flex items-center space-x-2 px-2.5 py-1 rounded bg-[#E9E0CF] text-[#183D32] text-xs font-medium">
            <span>Indian Sign Language to English Translation</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#183D32] leading-tight">
            Communicate across languages with Indian Sign Language translation.
          </h1>

          <p className="text-base sm:text-lg text-[#252C27] leading-relaxed max-w-2xl font-normal">
            Samwad is an assistive vision application designed to interpret Indian Sign Language (ISL) gestures 
            and generate natural English text in real time, supporting accessible two-way communication.
          </p>

          {/* Primary Action Button */}
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={() => onStartTranslating && onStartTranslating()}
              className="px-5 py-2.5 rounded-md bg-[#183D32] hover:bg-[#225344] active:bg-[#0f2720] text-[#FAF9F4] font-medium text-sm transition-colors inline-flex items-center space-x-2 cursor-pointer shadow-xs"
            >
              <Camera className="w-4 h-4 text-[#87966A]" />
              <span>Open Translation Workspace</span>
            </button>

            <button
              onClick={() => onLearnMore && onLearnMore()}
              className="px-4 py-2.5 rounded-md bg-[#FAF9F4] hover:bg-[#E9E0CF] text-[#183D32] font-medium text-sm border border-[#DACDB6] transition-colors inline-flex items-center space-x-1.5 cursor-pointer"
            >
              <span>How It Works</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#72786F]" />
            </button>
          </div>
        </div>

        {/* Simple Three-Step Sequence */}
        <div className="pt-6 border-t border-[#E9E0CF] space-y-4">
          <div>
            <h2 className="text-xs uppercase font-semibold text-[#72786F] tracking-wider">
              How Samwad Works
            </h2>
            <p className="text-sm font-medium text-[#183D32] mt-0.5">
              Three straightforward stages from physical gesture to readable sentence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <div 
                  key={step.number}
                  className="bg-[#FAF9F4] border border-[#E9E0CF] rounded-lg p-5 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="w-6 h-6 rounded bg-[#E9E0CF] text-[#183D32] text-xs font-bold flex items-center justify-center">
                        {step.number}
                      </span>
                      <Icon className="w-4 h-4 text-[#87966A]" />
                    </div>
                    <h3 className="text-base font-semibold text-[#183D32] mb-1">
                      {step.title}
                    </h3>
                    <p className="text-xs text-[#72786F] leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Practical ISL Linguistic Context */}
        <div className="bg-[#E9E0CF]/40 rounded-lg p-5 border border-[#DACDB6] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs">
          <div className="space-y-1">
            <p className="font-semibold text-[#183D32]">
              Engineered specifically for Indian Sign Language
            </p>
            <p className="text-[#72786F] leading-normal max-w-xl">
              Unlike single-handed sign systems, ISL relies extensively on dual-hand kinematics, 
              spatial orientation, and distinct grammatical syntax.
            </p>
          </div>
          <button
            onClick={() => onLearnMore && onLearnMore()}
            className="text-xs font-semibold text-[#183D32] hover:text-[#225344] underline decoration-[#87966A] whitespace-nowrap cursor-pointer shrink-0"
          >
            Read workflow details &rarr;
          </button>
        </div>

      </div>
    </section>
  );
}
