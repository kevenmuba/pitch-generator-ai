import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserDashboardLayout } from "@/components/layout/UserDashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { User, Mail, Lock, Shield, Crown, Calendar, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { useAuthStore } from "@/store/auth.store";

const Profile = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const { user, updateProfile, logout } = useAuthStore();

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();

    await updateProfile({ name, email });

    toast({
      title: "Profile updated",
      description: "Your profile has been updated successfully.",
    });
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <UserDashboardLayout>
      <div className="space-y-8 max-w-2xl">
        <div>
          <h1 className="font-display text-3xl font-bold">Profile</h1>
          <p className="text-muted-foreground">Manage your account settings</p>
        </div>

        {/* Account Overview */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Card variant="neon">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-neon-purple to-neon-cyan flex items-center justify-center text-2xl font-bold">
                  {user?.name?.charAt(0).toUpperCase() || "U"}
                </div>
                <div className="flex-1">
                  <h2 className="font-display text-xl font-bold">{user?.name}</h2>
                  <p className="text-muted-foreground">{user?.email}</p>

                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant={user?.role === "admin" ? "neon" : "cyan"}>
                      {user?.role === "admin" ? (
                        <>
                          <Shield className="w-3 h-3 mr-1" /> Admin
                        </>
                      ) : (
                        <>
                          <User className="w-3 h-3 mr-1" /> User
                        </>
                      )}
                    </Badge>

                 
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Profile Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card variant="glass">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <User className="w-5 h-5" />
                Profile Information
              </CardTitle>
              <CardDescription>Update your personal details</CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleUpdateProfile} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                <Button type="submit" variant="default">
                  Save Changes
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>

        {/* Logout */}
        <Button onClick={handleLogout} variant="destructive">
          Logout
        </Button>
      </div>
    </UserDashboardLayout>
  );
};

export default Profile;
