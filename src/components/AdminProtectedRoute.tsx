import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

interface AdminProtectedRouteProps {
  children: React.ReactNode;
}

export default function AdminProtectedRoute({ children }: AdminProtectedRouteProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = () => {
      const session = localStorage.getItem('admin-session');
      const loginTime = localStorage.getItem('admin-login-time');
      
      if (!session || session !== 'true') {
        setIsAuthenticated(false);
        return;
      }
      
      // Kontrola vypršení session (24 hodin)
      if (loginTime) {
        const now = Date.now();
        const loginTimestamp = parseInt(loginTime);
        const hoursSinceLogin = (now - loginTimestamp) / (1000 * 60 * 60);
        
        if (hoursSinceLogin > 24) {
          localStorage.removeItem('admin-session');
          localStorage.removeItem('admin-login-time');
          setIsAuthenticated(false);
          return;
        }
      }
      
      setIsAuthenticated(true);
    };

    checkAuth();
  }, []);

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Ověřuji přístup...</span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return <>{children}</>;
}