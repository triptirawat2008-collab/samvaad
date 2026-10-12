import React from 'react';
import { Camera, Eye, Cpu, MessageSquare, ArrowRight, ShieldCheck } from 'lucide-react';

export default function WorkflowPipeline({ onOpenTranslate }) {
  const workflowStages = [
    {
      step: '1',
      title: 'Video Capture',
      summary: 'The camera captures the user signing in front of the screen.',
      details: 'Video frames are accessed through standard browser APIs without sending raw video to external cloud servers. Processing operates in-session on the client machine.',
      icon: Camera,
    },
    {
      step: '2',
      title: 'Landmark Extraction',
      summary: 'A computer-vision component extracts relevant hand and body landmarks.',
      details: 'Spatial coordinate trackers (such as MediaPipe Hands and Pose) identify 21 articulatory keypoints per hand along with upper-body reference positions.',
      icon: Eye,
    },
    {
      step: '3',
      title: 'Sequence Processing',
      summary: 'A trained recognition or translation model processes the sequence.',
      details: 'Temporal neural architectures (such as recurrent networks or spatio-temporal models) evaluate gesture transitions and grammatical patterns over time.',
      icon: Cpu,
    },
    {
      step: '4',
      title: 'Caption Generation',
      summary: 'Recognized English text appears as captions over the video.',
      details: 'The recognized signs are formatted into coherent English phrases and presented directly as live subtitles overlaid at the bottom of the video preview.',
      icon: MessageSquare,
    },
  ];

  return (
    <section className="py-12 md:py-16 max-w-4xl mx-auto px-4 sm:px-6">
      
      {/* Header */}
      <div className="space-y-2 mb-10 text-center md:text-left">
        <span className="text-xs font-semibold text-[#87966A] uppercase tracking-wider">
          System Workflow
        </span>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#183D32] tracking-tight">
          How Samwad Translates Sign Language
        </h1>
        <p className="text-sm text-[#72786F] max-w-2xl leading-relaxed">
          The translation pipeline transitions from optical video capture to coordinate landmark 
          geometry, neural sequence recognition, and live caption rendering.
        </p>
      </div>

      {/* 4-Stage Sequential Cards */}
      <div className="space-y-4">
        {workflowStages.map((stage) => {
          const Icon = stage.icon;
          return (
            <div 
              key={stage.step}
              className="bg-[#FAF9F4] border border-[#E9E0CF] rounded-lg p-5 flex flex-col sm:flex-row items-start gap-4 transition-colors hover:border-[#DACDB6]"
            >
              {/* Step indicator */}
              <div className="w-9 h-9 rounded bg-[#E9E0CF] text-[#183D32] flex items-center justify-center font-bold text-sm shrink-0">
                {stage.step}
              </div>

              {/* Main description */}
              <div className="flex-1 space-y-1">
                <div className="flex items-center space-x-2">
                  <h2 className="text-base font-bold text-[#183D32]">
                    {stage.title}
                  </h2>
                  <Icon className="w-4 h-4 text-[#87966A]" />
                </div>
                <p className="text-sm font-medium text-[#252C27]">
                  {stage.summary}
                </p>
                <p className="text-xs text-[#72786F] leading-relaxed pt-1">
                  {stage.details}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Honest Technical Note & Privacy */}
      <div className="mt-8 pt-6 border-t border-[#E9E0CF] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#72786F]">
        <div className="flex items-center space-x-2">
          <ShieldCheck className="w-4 h-4 text-[#87966A] shrink-0" />
          <span>Camera frames are processed locally; no raw video footage is stored or transmitted.</span>
        </div>

        {onOpenTranslate && (
          <button
            onClick={onOpenTranslate}
            className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-md bg-[#183D32] hover:bg-[#225344] text-[#FAF9F4] text-xs font-medium cursor-pointer"
          >
            <span>Open Workspace</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

    </section>
  );
}
