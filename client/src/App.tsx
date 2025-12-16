import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import UserDashboard from "./pages/dashboard/UserDashboard";
import ContentList from "./pages/dashboard/ContentList";
import PitchGenerator from "./pages/dashboard/PitchGenerator";
import Billing from "./pages/dashboard/Billing";
import Profile from "./pages/dashboard/Profile";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminRevenue from "./pages/admin/AdminRevenue";
import AdminSettings from "./pages/admin/AdminSettings";
import NotFound from "./pages/NotFound";
import BillingSuccess from "./pages/dashboard/billing/success";
import BillingCancel from "./pages/dashboard/billing/BillingCancel";
import AdminTemplates from "./pages/admin/templates";
import Lesson from "./pages/dashboard/Lesson";
import LessonDetail from "./pages/dashboard/lesson-detail";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <AuthProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            
            {/* User Dashboard Routes */}
            <Route path="/dashboard" element={
              
                <UserDashboard />
             
            } />
            <Route path="/dashboard/content" element={
              
                <ContentList />
            
            } />

            <Route
  path="/dashboard/lesson/:lessonId"
  element={<LessonDetail />}
/>


            
            <Route path="/dashboard/lesson" element={
              
                <Lesson />
            
            } />
            <Route path="/dashboard/content/:scenario/:level" element={
              
                <PitchGenerator />
            
            } />
            <Route path="/dashboard/billing" element={
              
                <Billing />
             
            } />

            <Route path="/dashboard/billing/success" element={
              
                <BillingSuccess/>
             
            } />

            <Route path="/dashboard/billing/cancel" element={
              
                <BillingCancel/>
             
            } />
            <Route path="/dashboard/profile" element={
             
                <Profile />
            
            } />
            
            {/* Admin Dashboard Routes */}
            <Route path="/admin" element={
              
                <AdminDashboard />
            
            } />
            <Route path="/admin/users" element={
              
                <AdminUsers />
              
            } />
            <Route path="/admin/revenue" element={
              
                <AdminRevenue />
              
            } />
            <Route path="/admin/templates" element={
             
                <AdminTemplates />
              
            } />
            <Route path="/admin/settings" element={
             
                <AdminSettings />
              
            } />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </ThemeProvider>
  </QueryClientProvider>
);

export default App;
