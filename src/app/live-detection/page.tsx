"use client";

import { useState, useRef, useEffect, useTransition } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import RiskScoreMeter from './components/risk-score-meter';
import MicButton from './components/mic-button';
import { analyzeTranscript, AnalyzeTranscriptOutput } from '@/ai/flows/scam-detection-flow';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import ScamAlertModal from './components/scam-alert-modal';

type TranscriptEntry = {
  speaker: 'Caller' | 'Receiver';
  text: string;
  timestamp: string;
};

// Check for SpeechRecognition API
const SpeechRecognition =
  typeof window !== 'undefined' ? (window.SpeechRecognition || window.webkitSpeechRecognition) : null;

export default function LiveDetectionPage() {
  const [isRecordingCaller, setIsRecordingCaller] = useState(false);
  const [isRecordingReceiver, setIsRecordingReceiver] = useState(false);
  const [transcript, setTranscript] = useState<TranscriptEntry[]>([]);
  const [analysis, setAnalysis] = useState<AnalyzeTranscriptOutput | null>(null);
  const [isAnalyzing, startAnalyzing] = useTransition();
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const retryCountRef = useRef(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const startRecognition = (speaker: 'Caller' | 'Receiver') => {
    if (!SpeechRecognition) {
      alert("Your browser does not support the SpeechRecognition API. Please try Chrome or Safari.");
      return;
    }
    // Stop any existing recognition instance
    if (recognitionRef.current) {
      recognitionRef.current.onend = null; // Prevent onend from firing on manual stop
      recognitionRef.current.stop();
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onresult = (event) => {
      let finalTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        }
      }
      
      if (finalTranscript) {
         setTranscript(prev => [
          ...prev,
          {
            speaker: speaker,
            text: finalTranscript.trim(),
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
          },
        ]);
        retryCountRef.current = 0; // Reset retry count on successful result
      }
    };

    recognition.onerror = (event) => {
      console.error("Speech Recognition Error:", event.error);
      
      if (event.error === 'aborted') {
        console.log("Recognition aborted intentionally.");
        return;
      }
      
      if (event.error === 'network' && retryCountRef.current < 3) {
        retryCountRef.current++;
        console.log(`Network error, retrying... (Attempt ${retryCountRef.current})`);
        // We don't need to manually stop/start, the browser might handle it.
        // If it fully ends, onend will trigger. Let's rely on that.
        return;
      }
      
      setIsRecordingCaller(false);
      setIsRecordingReceiver(false);
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }

       alert(
        event.error === "network"
          ? "Speech recognition failed due to a network or microphone interruption. Please try again."
          : "Speech recognition stopped unexpectedly. Please try again."
      );
    };

    recognition.onend = () => {
      console.log("Recognition stopped.");
      // This is now primarily for logging, state changes are handled in clicks and errors.
      // Avoid auto-restarting here to prevent loops. The user can restart manually.
      const isStillRecording = isRecordingCaller || isRecordingReceiver;
      if (isStillRecording && recognitionRef.current === recognition) {
        // if the state is still recording, but the service ended, it's an unexpected stop.
      }
    };
    
    recognition.start();
    recognitionRef.current = recognition;
  };

  const stopRecognition = () => {
    if (recognitionRef.current) {
      recognitionRef.current.onend = null; // Prevent onend from firing on manual stop
      recognitionRef.current.stop();
      recognitionRef.current = null;
    }
    setIsRecordingCaller(false);
    setIsRecordingReceiver(false);
  };
  
  const runAnalysis = (currentTranscript: TranscriptEntry[]) => {
    if (currentTranscript.length > 0) {
      startAnalyzing(async () => {
        const fullTranscript = currentTranscript.map(t => `${t.speaker}: ${t.text}`).join('\n');
        const result = await analyzeTranscript({ transcript: fullTranscript });
        setAnalysis(result);
        if (result && result.riskScore >= 30) {
          setIsAlertOpen(true);
        }
      });
    } else {
      setAnalysis({ riskScore: 0, detectedKeywords: [], detectedTones: [], reason: "Start recording to begin analysis."});
    }
  };

  const handleCallerMicClick = () => {
    if (isRecordingCaller) {
      stopRecognition();
      runAnalysis(transcript);
    } else {
      stopRecognition(); // Stop any other recording
      setIsRecordingReceiver(false);
      setIsRecordingCaller(true);
      startRecognition('Caller');
    }
  };

  const handleReceiverMicClick = () => {
    if (isRecordingReceiver) {
      stopRecognition();
      runAnalysis(transcript);
    } else {
      stopRecognition(); // Stop any other recording
      setIsRecordingCaller(false);
      setIsRecordingReceiver(true);
      startRecognition('Receiver');
    }
  };

  const handleCloseAlert = () => {
    setIsAlertOpen(false);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    if (navigator.vibrate) {
      navigator.vibrate(0);
    }
  };

  useEffect(() => {
    return () => {
      // Cleanup on unmount
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  useEffect(() => {
    // Auto-scroll to bottom of transcript
    if (scrollAreaRef.current) {
      const scrollElement = scrollAreaRef.current.querySelector('div');
      if(scrollElement) {
        scrollElement.scrollTo({ top: scrollElement.scrollHeight, behavior: 'smooth' });
      }
    }
  }, [transcript]);

  useEffect(() => {
    if (isAlertOpen) {
      if (audioRef.current) {
        audioRef.current.loop = true;
        audioRef.current.play().catch(e => console.error("Audio play failed:", e));
      }
      if (navigator.vibrate) {
        navigator.vibrate([200, 100, 200]); // Vibrate pattern
      }
    }
  }, [isAlertOpen]);


  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <audio ref={audioRef} src="/siren.mp3" preload="auto"></audio>
      <ScamAlertModal 
        isOpen={isAlertOpen} 
        onClose={handleCloseAlert}
        analysis={analysis}
      />
      <Card className="lg:col-span-1">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Caller</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center">
          <div>
            <div className="text-2xl font-bold">+1 (555) 123-4567</div>
            <p className="text-xs text-muted-foreground">Unknown Caller</p>
          </div>
          <MicButton isRecording={isRecordingCaller} onClick={handleCallerMicClick} />
        </CardContent>
      </Card>
      <Card className="lg:col-span-1">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Receiver</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center">
          <div>
            <div className="text-2xl font-bold">Your Line</div>
            <p className="text-xs text-muted-foreground">{isRecordingReceiver ? 'Recording...' : 'Connected'}</p>
          </div>
          <MicButton isRecording={isRecordingReceiver} onClick={handleReceiverMicClick} />
        </CardContent>
      </Card>

      <Card className="md:col-span-2 lg:col-span-1 lg:row-span-2">
        <CardHeader>
          <CardTitle>Live Risk Score</CardTitle>
          <CardDescription>Real-time threat analysis</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center p-0 pt-4">
          <RiskScoreMeter score={analysis?.riskScore ?? 0} />
        </CardContent>
      </Card>

      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>AI Analysis</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {isAnalyzing ? (
            <div className="space-y-4">
              <Skeleton className="h-4 w-3/4" />
              <div className="flex gap-2">
                <Skeleton className="h-6 w-20" />
                <Skeleton className="h-6 w-24" />
              </div>
            </div>
          ) : !analysis ? (
             <p className="text-muted-foreground">Start recording to begin analysis.</p>
          ) : (
            <>
              <p className="text-muted-foreground">
                {analysis.reason}
              </p>
              {(analysis.detectedKeywords.length > 0 || analysis.detectedTones.length > 0) && (
                 <div className="flex flex-wrap gap-2">
                  {analysis.detectedKeywords.map((keyword) => (
                    <Badge key={keyword} variant="destructive">{keyword}</Badge>
                  ))}
                  {analysis.detectedTones.map((tone) => (
                    <Badge key={tone} variant="secondary">{tone}</Badge>
                  ))}
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>
      
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Live Transcript</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-48 w-full rounded-md border" ref={scrollAreaRef}>
             <div className="p-4 space-y-4">
              {transcript.length === 0 && (
                 <p className="text-sm text-muted-foreground text-center">
                  Press a record button to start transcription.
                </p>
              )}
              {transcript.map((entry, index) => (
                <div
                  key={index}
                  className={cn(
                    'flex flex-col',
                    entry.speaker === 'Receiver' ? 'items-end' : 'items-start'
                  )}
                >
                  <div
                    className={cn(
                      'max-w-xs rounded-lg px-3 py-2 text-sm',
                      entry.speaker === 'Receiver'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted'
                    )}
                  >
                    <p>{entry.text}</p>
                  </div>
                   <span className="text-xs text-muted-foreground mt-1">
                    {entry.speaker} at {entry.timestamp}
                  </span>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
