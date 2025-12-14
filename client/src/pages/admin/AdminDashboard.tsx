import { AdminDashboardLayout } from "@/components/layout/AdminDashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, DollarSign, Sparkles, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

const stats = [
  { title: "Total Users", value: "1,247", change: "+12%", icon: Users, color: "from-neon-purple/20 to-violet-500/20" },
  { title: "Total Revenue", value: "$6,420", change: "+18%", icon: DollarSign, color: "from-neon-cyan/20 to-blue-500/20" },
  { title: "Total Generations", value: "15,832", change: "+24%", icon: Sparkles, color: "from-pink-500/20 to-rose-500/20" },
  { title: "Growth Rate", value: "23%", change: "+5%", icon: TrendingUp, color: "from-green-500/20 to-emerald-500/20" },
];

const dailyData = [
  { name: "Mon", users: 120, revenue: 450 },
  { name: "Tue", users: 145, revenue: 520 },
  { name: "Wed", users: 130, revenue: 480 },
  { name: "Thu", users: 180, revenue: 680 },
  { name: "Fri", users: 195, revenue: 720 },
  { name: "Sat", users: 150, revenue: 550 },
  { name: "Sun", users: 165, revenue: 610 },
];

const monthlyData = [
  { name: "Jan", generations: 2100 },
  { name: "Feb", generations: 2400 },
  { name: "Mar", generations: 2800 },
  { name: "Apr", generations: 3200 },
  { name: "May", generations: 3800 },
  { name: "Jun", generations: 4200 },
];

const AdminDashboard = () => {
  
  return (
    <AdminDashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="font-display text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">Overview of your platform performance</p>
        </div>

        {/* Stats Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className={`bg-gradient-to-br ${stat.color} border-border/50`}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <stat.icon className="w-8 h-8 text-foreground/80" />
                    <span className="text-xs text-neon-cyan font-medium">{stat.change}</span>
                  </div>
                  <p className="font-display text-3xl font-bold mt-4">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid lg:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card variant="glass">
              <CardHeader>
                <CardTitle className="text-lg">Daily Revenue & Users</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={dailyData}>
                      <defs>
                        <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(263, 70%, 58%)" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="hsl(263, 70%, 58%)" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(188, 95%, 43%)" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="hsl(188, 95%, 43%)" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(222, 47%, 18%)" />
                      <XAxis dataKey="name" stroke="hsl(215, 20%, 65%)" fontSize={12} />
                      <YAxis stroke="hsl(215, 20%, 65%)" fontSize={12} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'hsl(222, 47%, 8%)', 
                          border: '1px solid hsl(222, 47%, 18%)',
                          borderRadius: '8px'
                        }} 
                      />
                      <Area type="monotone" dataKey="revenue" stroke="hsl(263, 70%, 58%)" fillOpacity={1} fill="url(#colorRevenue)" />
                      <Area type="monotone" dataKey="users" stroke="hsl(188, 95%, 43%)" fillOpacity={1} fill="url(#colorUsers)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card variant="glass">
              <CardHeader>
                <CardTitle className="text-lg">Monthly Generations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(222, 47%, 18%)" />
                      <XAxis dataKey="name" stroke="hsl(215, 20%, 65%)" fontSize={12} />
                      <YAxis stroke="hsl(215, 20%, 65%)" fontSize={12} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'hsl(222, 47%, 8%)', 
                          border: '1px solid hsl(222, 47%, 18%)',
                          borderRadius: '8px'
                        }} 
                      />
                      <Bar dataKey="generations" fill="hsl(263, 70%, 58%)" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </AdminDashboardLayout>
  );
};

export default AdminDashboard;