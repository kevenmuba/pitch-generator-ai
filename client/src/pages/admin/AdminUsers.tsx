import { useState } from "react";
import { AdminDashboardLayout } from "@/components/layout/AdminDashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  MoreVertical, 
  Shield, 
  User as UserIcon,
  Trash2,
  Ban
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

const usersData = [
  { id: 1, name: "John Doe", email: "john@example.com", role: "user", status: "active", generations: 45, joined: "Dec 1, 2024" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", role: "user", status: "active", generations: 128, joined: "Nov 15, 2024" },
  { id: 3, name: "Mike Johnson", email: "mike@example.com", role: "admin", status: "active", generations: 12, joined: "Oct 20, 2024" },
  { id: 4, name: "Sarah Williams", email: "sarah@example.com", role: "user", status: "banned", generations: 0, joined: "Nov 1, 2024" },
  { id: 5, name: "Chris Brown", email: "chris@example.com", role: "user", status: "active", generations: 87, joined: "Sep 10, 2024" },
];

const AdminUsers = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredUsers = usersData.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAction = (action: string, userName: string) => {
    toast({
      title: `${action} user`,
      description: `${action} action performed on ${userName}`,
    });
  };

  return (
    <AdminDashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl font-bold">Users</h1>
            <p className="text-muted-foreground">Manage all registered users</p>
          </div>
          <div className="relative max-w-xs w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card variant="glass">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border/50">
                      <th className="text-left p-4 font-medium text-muted-foreground">User</th>
                      <th className="text-left p-4 font-medium text-muted-foreground">Role</th>
                      <th className="text-left p-4 font-medium text-muted-foreground">Status</th>
                      <th className="text-left p-4 font-medium text-muted-foreground">Generations</th>
                      <th className="text-left p-4 font-medium text-muted-foreground">Joined</th>
                      <th className="text-left p-4 font-medium text-muted-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((user) => (
                      <tr key={user.id} className="border-b border-border/50 last:border-0 hover:bg-secondary/30 transition-colors">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-neon-purple/30 to-neon-cyan/30 flex items-center justify-center">
                              <UserIcon className="w-5 h-5" />
                            </div>
                            <div>
                              <p className="font-medium">{user.name}</p>
                              <p className="text-sm text-muted-foreground">{user.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <Badge variant={user.role === "admin" ? "neon" : "glass"} className="capitalize">
                            {user.role === "admin" && <Shield className="w-3 h-3 mr-1" />}
                            {user.role}
                          </Badge>
                        </td>
                        <td className="p-4">
                          <Badge variant={user.status === "active" ? "cyan" : "destructive"} className="capitalize">
                            {user.status}
                          </Badge>
                        </td>
                        <td className="p-4 font-medium">{user.generations}</td>
                        <td className="p-4 text-muted-foreground">{user.joined}</td>
                        <td className="p-4">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreVertical className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleAction("Toggle role", user.name)}>
                                <Shield className="w-4 h-4 mr-2" />
                                Toggle Role
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleAction("Ban", user.name)}>
                                <Ban className="w-4 h-4 mr-2" />
                                {user.status === "banned" ? "Unban" : "Ban"} User
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                className="text-destructive"
                                onClick={() => handleAction("Delete", user.name)}
                              >
                                <Trash2 className="w-4 h-4 mr-2" />
                                Delete User
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </AdminDashboardLayout>
  );
};

export default AdminUsers;