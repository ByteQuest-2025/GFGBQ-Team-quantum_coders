"use client";

import { Button } from "@/components/ui/button";
import { Mic, MicOff } from "lucide-react";

type MicButtonProps = {
  isRecording: boolean;
  onClick: () => void;
};

export default function MicButton({ isRecording, onClick }: MicButtonProps) {
  return (
    <Button
      onClick={onClick}
      variant={isRecording ? "destructive" : "outline"}
      size="icon"
      className="ml-auto"
    >
      {isRecording ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
      <span className="sr-only">{isRecording ? "Stop recording" : "Start recording"}</span>
    </Button>
  );
}
