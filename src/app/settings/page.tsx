import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function SettingsPage() {
  return (
    <Tabs defaultValue="general" className="w-full max-w-4xl mx-auto">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="general">General</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
        <TabsTrigger value="account">Account</TabsTrigger>
      </TabsList>
      <TabsContent value="general">
        <Card>
          <CardHeader>
            <CardTitle>General Settings</CardTitle>
            <CardDescription>Manage general application settings.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="dark-mode" className="flex flex-col space-y-1">
                <span>Dark Mode</span>
                <span className="font-normal leading-snug text-muted-foreground">
                  Always enabled for this premium theme.
                </span>
              </Label>
              <Switch id="dark-mode" checked disabled />
            </div>
             <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="mic-input" className="flex flex-col space-y-1">
                <span>Default Microphone</span>
                 <span className="font-normal leading-snug text-muted-foreground">
                  Your primary audio input device.
                </span>
              </Label>
              <Button variant="outline">Select Device</Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="notifications">
        <Card>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>Manage how you receive notifications.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="push-notifications" className="flex flex-col space-y-1">
                <span>Push Notifications</span>
                <span className="font-normal leading-snug text-muted-foreground">
                  Receive alerts for high-risk calls.
                </span>
              </Label>
              <Switch id="push-notifications" defaultChecked />
            </div>
            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="email-summary" className="flex flex-col space-y-1">
                <span>Weekly Email Summary</span>
                <span className="font-normal leading-snug text-muted-foreground">
                  Get a weekly report of detected scams.
                </span>
              </Label>
              <Switch id="email-summary" />
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="account">
        <Card>
          <CardHeader>
            <CardTitle>Account</CardTitle>
            <CardDescription>Manage your account and subscription.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" defaultValue="user@example.com" disabled />
            </div>
            <div className="space-y-2">
              <Label>Subscription</Label>
              <div className="flex items-center justify-between rounded-lg border p-3">
                 <p className="text-sm font-medium">Premium Plan</p>
                 <Button variant="outline">Manage</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
