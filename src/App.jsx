import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { AppLayout } from "@/components/layout/AppLayout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Learn from "./pages/Learn";
import Teach from "./pages/Teach";
import Credits from "./pages/Credits";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";
const queryClient = new QueryClient();
const App = () => (<QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Public Routes */}
              <Route path="/login" element={<Login />}/>
              <Route path="/register" element={<Register />}/>

              {/* Protected Routes */}
              <Route element={<AppLayout />}>
                <Route path="/learn" element={<Learn />}/>
                <Route path="/teach" element={<Teach />}/>
                <Route path="/credits" element={<Credits />}/>
                <Route path="/profile" element={<Profile />}/>
                <Route path="/settings" element={<Settings />}/>
                <Route path="/admin" element={<Admin />}/>
              </Route>

              {/* Redirects */}
              <Route path="/" element={<Navigate to="/learn" replace/>}/>

              {/* Catch-all */}
              <Route path="*" element={<NotFound />}/>
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>);
export default App;
