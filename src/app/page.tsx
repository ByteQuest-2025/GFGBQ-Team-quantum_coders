import { ShieldCheck } from 'lucide-react';

export default function DashboardPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-12rem)] text-center p-4">
      <div className="flex items-center gap-4 mb-4">
        <ShieldCheck className="w-16 h-16 text-primary" />
        <h1 className="text-5xl font-bold tracking-tight font-headline">
          VoiceShield AI
        </h1>
      </div>
      <p className="text-xl text-muted-foreground max-w-2xl">
        AI Powered Real-Time Scam Call Protection System
      </p>
    </div>
  );
}
