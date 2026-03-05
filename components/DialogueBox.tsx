"use client";

import { Card } from "pixel-retroui";
import { Bubble } from "pixel-retroui";
import { useState } from "react";

interface DialogueBoxProps {
  speakerName: string;
  lines: string[];
  onClose?: () => void;
}

export function DialogueBox({ speakerName, lines, onClose }: DialogueBoxProps) {
  const [lineIndex, setLineIndex] = useState(0);

  const handleNext = () => {
    if (lineIndex < lines.length - 1) {
      setLineIndex(lineIndex + 1);
    } else if (onClose) {
      onClose();
    }
  };

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 w-full max-w-2xl px-4">
      <Card
        bg="#1a1a2e"
        textColor="#e0e0ff"
        borderColor="#6d28d9"
        shadowColor="#4c1d95"
        className="p-4"
      >
        <div className="flex items-start gap-3">
          <div className="min-w-fit">
            <span className="text-purple-300 font-bold text-sm">{speakerName}</span>
          </div>
          <Bubble direction="left" bg="#2d1b69" borderColor="#6d28d9" textColor="#c4b5fd">
            <p className="text-sm">{lines[lineIndex]}</p>
          </Bubble>
        </div>
        <div className="flex justify-between items-center mt-3">
          <span className="text-xs text-purple-600">
            {lineIndex + 1}/{lines.length}
          </span>
          <button
            onClick={handleNext}
            className="text-xs text-purple-400 hover:text-purple-300 cursor-pointer"
          >
            {lineIndex < lines.length - 1 ? "Next ▶" : "Close ✕"}
          </button>
        </div>
      </Card>
    </div>
  );
}
