import { AdminDashboardLayout } from "@/components/layout/AdminDashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DollarSign, TrendingUp, CreditCard, Crown } from "lucide-react";
import { motion } from "framer-motion";

const revenueStats = [
  { title: "Monthly Revenue", value: "$6,420", change: "+18%", icon: DollarSign },
  { title: "Subscriptions", value: "892", change: "+12%", icon: Crown },
  { title: "One-time Purchases", value: "355", change: "+8%", icon: CreditCard },
  { title: "MRR Growth", value: "23%", change: "+5%", icon: TrendingUp },
];

const recentPayments = [
  { id: "PAY-001", user: "john@example.com", amount: "$5.00", type: "Unlimited Monthly", date: "Dec 8, 2024", status: "completed" },
  { id: "PAY-002", user: "jane@example.com", amount: "$1.00", type: "Single Credit", date: "Dec 8, 2024", status: "completed" },
  { id: "PAY-003", user: "mike@example.com", amount: "$5.00", type: "Unlimited Monthly", date: "Dec 7, 2024", status: "completed" },
  { id: "PAY-004", user: "sarah@example.com", amount: "$5.00", type: "Unlimited Monthly", date: "Dec 7, 2024", status: "failed" },
  { id: "PAY-005", user: "chris@example.com", amount: "$1.00", type: "Single Credit", date: "Dec 6, 2024", status: "completed" },
  { id: "PAY-006", user: "alex@example.com", amount: "$5.00", type: "Unlimited Monthly", date: "Dec 6, 2024", status: "completed" },
];

const AdminRevenue = () => {
  return (
    <AdminDashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="font-display text-3xl font-bold">Revenue</h1>
          <p className="text-muted-foreground">Track payments and revenue metrics</p>
        </div>

        {/* Stats Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {revenueStats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card variant="glass">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-neon-purple/20 to-neon-cyan/20 flex items-center justify-center">
                      <stat.icon className="w-5 h-5 text-neon-purple" />
                    </div>
                    <span className="text-xs text-neon-cyan font-medium">{stat.change}</span>
                  </div>
                  <p className="font-display text-2xl font-bold mt-4">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Payments Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card variant="glass">
            <CardHeader>
              <CardTitle className="text-lg">Recent Payments</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border/50">
                      <th className="text-left p-4 font-medium text-muted-foreground">Payment ID</th>
                      <th className="text-left p-4 font-medium text-muted-foreground">User</th>
                      <th className="text-left p-4 font-medium text-muted-foreground">Type</th>
                      <th className="text-left p-4 font-medium text-muted-foreground">Amount</th>
                      <th className="text-left p-4 font-medium text-muted-foreground">Date</th>
                      <th className="text-left p-4 font-medium text-muted-foreground">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentPayments.map((payment) => (
                      <tr key={payment.id} className="border-b border-border/50 last:border-0 hover:bg-secondary/30 transition-colors">
                        <td className="p-4 font-mono text-sm">{payment.id}</td>
                        <td className="p-4 text-muted-foreground">{payment.user}</td>
                        <td className="p-4">
                          <Badge variant={payment.type.includes("Unlimited") ? "neon" : "glass"}>
                            {payment.type}
                          </Badge>
                        </td>
                        <td className="p-4 font-medium">{payment.amount}</td>
                        <td className="p-4 text-muted-foreground">{payment.date}</td>
                        <td className="p-4">
                          <Badge variant={payment.status === "completed" ? "cyan" : "destructive"} className="capitalize">
                            {payment.status}
                          </Badge>
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

export default AdminRevenue;