import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { RoleGuard } from "@/components/auth/RoleGuard";
import Index from "./pages/Index";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import WebVitals from "./pages/WebVitals";
import AiContent from "./pages/AiContent";
import VoiceSearch from "./pages/VoiceSearch";
import EEAT from "./pages/EEAT";
import Mobile from "./pages/Mobile";
import LocalSeo from "./pages/LocalSeo";
import Content from "./pages/Content";
import AgentSystem from "./pages/AgentSystem";
import Projects from './pages/Projects';

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/auth/login" replace />;
  }

  return <>{children}</>;
};

const AuthRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  if (user) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/auth/login" element={<AuthRoute><Login /></AuthRoute>} />
      <Route path="/auth/signup" element={<AuthRoute><Signup /></AuthRoute>} />
      
      <Route path="/" element={<ProtectedRoute><Index /></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      <Route path="/web-vitals" element={<ProtectedRoute><WebVitals /></ProtectedRoute>} />
      <Route path="/ai-content" element={<ProtectedRoute><AiContent /></ProtectedRoute>} />
      <Route path="/voice-search" element={<ProtectedRoute><VoiceSearch /></ProtectedRoute>} />
      <Route path="/e-e-a-t" element={<ProtectedRoute><EEAT /></ProtectedRoute>} />
      <Route path="/mobile" element={<ProtectedRoute><Mobile /></ProtectedRoute>} />
      <Route path="/local-seo" element={<ProtectedRoute><LocalSeo /></ProtectedRoute>} />
      <Route path="/content" element={<ProtectedRoute><Content /></ProtectedRoute>} />
      <Route path="/agent-system" element={<ProtectedRoute><AgentSystem /></ProtectedRoute>} />
      <Route path="/projects" element={<ProtectedRoute><Projects /></ProtectedRoute>} />
      
      <Route 
        path="/admin" 
        element={
          <RoleGuard allowedRoles={['admin']}>
            <div>Admin Page</div>
          </RoleGuard>
        } 
      />
      
      <Route 
        path="/editor" 
        element={
          <RoleGuard allowedRoles={['admin', 'editor']}>
            <div>Editor Page</div>
          </RoleGuard>
        } 
      />
      
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <AppRoutes />
          </TooltipProvider>
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
