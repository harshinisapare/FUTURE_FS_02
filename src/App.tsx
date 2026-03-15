import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import LoginPage from "./pages/Login.tsx";
import LandingPage from "./pages/Landing.tsx";
import NotFound from "./pages/NotFound.tsx";
import { useAuthStore } from "@/lib/auth-store";

const queryClient = new QueryClient();

const App = () => {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Landing page — always accessible */}
            <Route path="/" element={<LandingPage />} />

            {/* Login — always shows login form, never auto-skips */}
            <Route path="/login" element={<LoginPage />} />

            {/* Dashboard — protected, redirects to /login if not authenticated */}
            <Route
              path="/dashboard"
              element={isAuthenticated ? <Index /> : <Navigate to="/login" replace />}
            />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;