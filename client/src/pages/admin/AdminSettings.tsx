import { useState } from "react";
import { AdminDashboardLayout } from "@/components/layout/AdminDashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { 
  Settings, 
  Zap, 
  FileText, 
  Clock, 
  Save,
  AlertCircle
} from "lucide-react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

const systemLogs = [
  { time: "12:45:32", type: "info", message: "User john@example.com generated a pitch" },
  { time: "12:44:18", type: "success", message: "Payment PAY-001 processed successfully" },
  { time: "12:43:05", type: "warning", message: "Rate limit approached for IP 192.168.1.1" },
  { time: "12:42:51", type: "info", message: "New user registration: mike@example.com" },
  { time: "12:41:22", type: "error", message: "Failed login attempt for admin@demo.com" },
];

const AdminSettings = () => {
  const { toast } = useToast();
  const [freeTrialCredits, setFreeTrialCredits] = useState("5");
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);

  const handleSave = () => {
    toast({
      title: "Settings saved",
      description: "Your changes have been saved successfully.",
    });
  };

  return (
    <AdminDashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="font-display text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground">Manage platform settings and configurations</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Free Trial Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card variant="glass">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Zap className="w-5 h-5 text-neon-purple" />
                  Free Trial Settings
                </CardTitle>
                <CardDescription>Configure free trial parameters</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="freeCredits">Free Credits per User</Label>
                  <Input
                    id="freeCredits"
                    type="number"
                    value={freeTrialCredits}
                    onChange={(e) => setFreeTrialCredits(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">Number of free generations for new users</p>
                </div>
                <Button onClick={handleSave}>
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Template Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card variant="glass">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <FileText className="w-5 h-5 text-neon-cyan" />
                  Template Management
                </CardTitle>
                <CardDescription>Manage pitch templates</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
                    <span>Dating Templates</span>
                    <Badge variant="cyan">12 active</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
                    <span>Cold Calling Templates</span>
                    <Badge variant="cyan">8 active</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
                    <span>Business Templates</span>
                    <Badge variant="cyan">10 active</Badge>
                  </div>
                </div>
                <Button variant="outline" className="w-full">
                  Manage Templates
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* System Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card variant="glass">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Settings className="w-5 h-5 text-neon-purple" />
                  System Settings
                </CardTitle>
                <CardDescription>Platform-wide configurations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Maintenance Mode</p>
                    <p className="text-sm text-muted-foreground">Disable access for regular users</p>
                  </div>
                  <Switch checked={maintenanceMode} onCheckedChange={setMaintenanceMode} />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Email Notifications</p>
                    <p className="text-sm text-muted-foreground">Send admin alerts via email</p>
                  </div>
                  <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* System Logs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card variant="glass">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Clock className="w-5 h-5 text-neon-cyan" />
                  System Logs
                </CardTitle>
                <CardDescription>Recent system activity</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 max-h-[250px] overflow-y-auto">
                  {systemLogs.map((log, index) => (
                    <div key={index} className="flex items-start gap-3 p-2 text-sm hover:bg-secondary/30 rounded">
                      <span className="text-muted-foreground font-mono text-xs">{log.time}</span>
                      <AlertCircle className={`w-4 h-4 flex-shrink-0 ${
                        log.type === "error" ? "text-destructive" :
                        log.type === "warning" ? "text-yellow-500" :
                        log.type === "success" ? "text-neon-cyan" :
                        "text-muted-foreground"
                      }`} />
                      <span className="text-muted-foreground">{log.message}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </AdminDashboardLayout>
  );
};

export default AdminSettings;