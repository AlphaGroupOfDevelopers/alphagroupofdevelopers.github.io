import React, { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";

interface AdminAuthContextType {
  isAuthenticated: boolean;
  login: (passcode: string) => boolean;
  logout: () => void;
  changePasscode: (currentPass: string, newPass: string) => boolean;
  hasCustomPasscode: boolean;
}

const PASSCODE_STORAGE_KEY = "alpha_admin_passcode_hash";
const SESSION_STORAGE_KEY = "alpha_admin_authenticated";
const DEFAULT_PASSCODE = "alpha2026";

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem(SESSION_STORAGE_KEY) === "true";
  });

  const [hasCustomPasscode, setHasCustomPasscode] = useState<boolean>(() => {
    return !!localStorage.getItem(PASSCODE_STORAGE_KEY);
  });

  const getActivePasscode = () => {
    return localStorage.getItem(PASSCODE_STORAGE_KEY) || DEFAULT_PASSCODE;
  };

  const login = (inputPasscode: string): boolean => {
    const activePass = getActivePasscode();
    if (inputPasscode.trim() === activePass) {
      setIsAuthenticated(true);
      sessionStorage.setItem(SESSION_STORAGE_KEY, "true");
      toast.success("Welcome, Admin!", {
        description: "Authenticated successfully to the management console."
      });
      return true;
    } else {
      toast.error("Incorrect Passcode", {
        description: "Please check your credentials and try again."
      });
      return false;
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem(SESSION_STORAGE_KEY);
    toast.info("Logged out from admin session");
  };

  const changePasscode = (currentPass: string, newPass: string): boolean => {
    const activePass = getActivePasscode();
    if (currentPass.trim() !== activePass) {
      toast.error("Current passcode is incorrect");
      return false;
    }
    if (newPass.trim().length < 4) {
      toast.error("New passcode must be at least 4 characters");
      return false;
    }
    localStorage.setItem(PASSCODE_STORAGE_KEY, newPass.trim());
    setHasCustomPasscode(true);
    toast.success("Passcode updated successfully!");
    return true;
  };

  return (
    <AdminAuthContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
        changePasscode,
        hasCustomPasscode
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error("useAdminAuth must be used within an AdminAuthProvider");
  }
  return context;
}
