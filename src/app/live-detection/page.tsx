import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Mic } from 'lucide-react';
import RiskScoreMeter from './components/risk-score-meter';

export default function LiveDetectionPage() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <Card className="lg:col-span-1">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Caller</CardTitle>
          <Mic className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">+1 (555) 123-4567</div>
          <p className="text-xs text-muted-foreground">Unknown Caller</p>
        </CardContent>
      </Card>
      <Card className="lg:col-span-1">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Receiver</CardTitle>
          <Mic className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">Your Line</div>
          <p className="text-xs text-muted-foreground">Connected</p>
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
            AI is analyzing the conversation for suspicious patterns...
          </p>
        </CardContent>
      </Card>
      
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Live Transcript</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-48 w-full rounded-md border p-4">
            <p className="text-sm text-muted-foreground">
              [00:02] Caller: Hello, this is a very important message regarding your car's extended warranty.
              <br />
              [00:07] You: I don't have a car.
            </p>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
