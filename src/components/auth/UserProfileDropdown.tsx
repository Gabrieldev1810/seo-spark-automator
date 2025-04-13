
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut, User, Settings } from "lucide-react";

export function UserProfileDropdown() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const getInitials = () => {
    if (user?.profile?.first_name && user?.profile?.last_name) {
      return `${user.profile.first_name.charAt(0)}${user.profile.last_name.charAt(0)}`;
    }
    return user?.user?.email?.charAt(0).toUpperCase() || "U";
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/auth/login");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none">
        <div className="flex items-center gap-3 cursor-pointer">
          <Avatar>
            <AvatarImage src={user?.profile?.avatar_url || ""} />
            <AvatarFallback>{getInitials()}</AvatarFallback>
          </Avatar>
          <div className="hidden md:block">
            <p className="text-sm font-medium">
              {user?.profile?.first_name
                ? `${user.profile.first_name} ${user.profile.last_name}`
                : user?.user?.email}
            </p>
            <p className="text-xs text-sidebar-foreground/60 capitalize">
              {user?.role || "User"}
            </p>
          </div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => navigate("/profile")}>
          <User className="mr-2 h-4 w-4" />
          <span>Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => navigate("/settings")}>
          <Settings className="mr-2 h-4 w-4" />
          <span>Settings</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
