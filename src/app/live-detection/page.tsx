"use client";

import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import RiskScoreMeter from './components/risk-score-meter';
import MicButton from './components/mic-button';

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
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const startRecognition = (speaker: 'Caller' | 'Receiver') => {
    if (!SpeechRecognition) {
      alert("Your browser does not support the SpeechRecognition API. Please try Chrome or Safari.");
      return;
    }
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onresult = (event) => {
      let interimTranscript = '';
      let finalTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        } else {
          interimTranscript += event.results[i][0].transcript;
        }
      }
      
      if (finalTranscript) {
         setTranscript(prev => [
          ...prev,
          {
            speaker: speaker,
            text: finalTranscript,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
          },
        ]);
      }
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error', event.error);
      setIsRecordingCaller(false);
      setIsRecordingReceiver(false);
    };

    recognition.onend = () => {
      if ((speaker === 'Caller' && isRecordingCaller) || (speaker === 'Receiver' && isRecordingReceiver)) {
        // Restart recognition if it stops unexpectedly while still in recording state
        recognition.start();
      }
    };

    recognition.start();
    recognitionRef.current = recognition;
  };

  const stopRecognition = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      recognitionRef.current = null;
    }
  };

  const handleCallerMicClick = () => {
    if (isRecordingCaller) {
      stopRecognition();
      setIsRecordingCaller(false);
    } else {
      stopRecognition();
      setIsRecordingReceiver(false);
      setIsRecordingCaller(true);
      startRecognition('Caller');
    }
  };

  const handleReceiverMicClick = () => {
    if (isRecordingReceiver) {
      stopRecognition();
      setIsRecordingReceiver(false);
    } else {
      stopRecognition();
      setIsRecordingCaller(false);
      setIsRecordingReceiver(true);
      startRecognition('Receiver');
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
      scrollAreaRef.current.scrollTo({ top: scrollAreaRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [transcript]);


  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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
          <RiskScoreMeter />
        </CardContent>
      </Card>

      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>AI Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            {isRecordingCaller || isRecordingReceiver ? 'AI is analyzing the conversation...' : 'Start recording to begin analysis.'}
          </p>
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
