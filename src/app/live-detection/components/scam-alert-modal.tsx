"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PhoneOff, ShieldOff, VolumeX } from "lucide-react";
import type { AnalyzeTranscriptOutput } from "@/ai/flows/scam-detection-flow";

type ScamAlertModalProps = {
  isOpen: boolean;
  onClose: () => void;
  analysis: AnalyzeTranscriptOutput | null;
};

export default function ScamAlertModal({ isOpen, onClose, analysis }: ScamAlertModalProps) {
  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md p-0 overflow-hidden bg-destructive/90 text-destructive-foreground border-red-500/50 !rounded-2xl shadow-2xl shadow-red-500/50">
        <DialogHeader className="sr-only">
          <DialogTitle>Scam Risk Detected</DialogTitle>
          <DialogDescription>
            A high scam risk has been detected. The risk score is {analysis?.riskScore ?? 0}%. Reason: {analysis?.reason}. Please do not share sensitive information.
          </DialogDescription>
        </DialogHeader>
        <div className="relative p-8 flex flex-col items-center justify-center text-center space-y-4 animate-pulse-intense">
          <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-destructive via-transparent to-destructive"></div>
          <div className="w-20 h-20 flex items-center justify-center rounded-full bg-red-500/20 mb-4 animate-ping-slow">
            <span className="text-5xl">🚨</span>
          </div>

          <h2 className="text-3xl font-bold tracking-tighter">SCAM RISK DETECTED</h2>

          <div className="text-7xl font-bold text-white drop-shadow-lg">
            {analysis?.riskScore ?? 0}%
          </div>
          
          {analysis?.reason && (
            <p className="font-semibold text-lg text-red-200">
              Pattern: {analysis.reason}
            </p>
          )}

          <p className="max-w-sm font-medium text-destructive-foreground bg-red-900/50 p-3 rounded-lg border border-red-500/50">
            DO NOT share sensitive information like OTPs, PINs, or personal details.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 pt-4 w-full">
            <Button variant="secondary" size="lg" className="w-full bg-red-700 hover:bg-red-800 text-white" onClick={onClose}>
              <PhoneOff className="mr-2" /> End Call
            </Button>
            <Button variant="outline" size="lg" className="w-full border-red-400 text-red-200 hover:bg-red-800/50 hover:text-white" onClick={onClose}>
              <ShieldOff className="mr-2" /> Block Caller
            </Button>
          </div>
            <Button variant="ghost" size="sm" className="mt-4 text-red-300 hover:text-white" onClick={onClose}>
                <VolumeX className="mr-2 h-4 w-4" /> Stop Alert
            </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
