import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppShell } from "@/components/layout/AppShell";
import LoginPage from "@/app/auth/LoginPage";
import Dashboard from "@/app/dashboard/Dashboard";
import Courses from "@/app/courses/Courses";
import People from "@/app/people/People";
import Timetable from "@/app/timetable/Timetable";
import Rooms from "@/app/rooms/Rooms";
import Reports from "@/app/reports/Reports";
import Settings from "@/app/settings/Settings";
import NotFound from "./pages/NotFound";
import "./api/msw/browser";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<AppShell />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="courses" element={<Courses />} />
            <Route path="people" element={<People />} />
            <Route path="timetable" element={<Timetable />} />
            <Route path="rooms" element={<Rooms />} />
            <Route path="reports" element={<Reports />} />
            <Route path="settings" element={<Settings />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
