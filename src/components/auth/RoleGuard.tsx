
import { useAuth, AppRole } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";

interface RoleGuardProps {
  children: React.ReactNode;
  allowedRoles: AppRole[];
  redirectTo?: string;
}

export const RoleGuard: React.FC<RoleGuardProps> = ({
  children,
  allowedRoles,
  redirectTo = "/auth/login",
}) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  if (!user || !user.role || !allowedRoles.includes(user.role)) {
    return <Navigate to={redirectTo} replace />;
  }

  return <>{children}</>;
};
