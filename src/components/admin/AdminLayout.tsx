import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Navbar } from "@/components/Navbar";

export const AdminLayout: React.FC = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-secondary/20 pt-20">
        <div className="container mx-auto px-4 py-8 max-w-9xl">
          {/* Header Section */}
          <div className="mb-8">
            <div className="bg-background rounded-lg shadow-sm border border-border p-6">
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Panou de Administrare
              </h1>
              <p className="text-muted-foreground">
                Gestionează conținutul site-ului și setările
              </p>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="bg-background rounded-lg shadow-sm border border-border p-6 min-h-[600px]">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};
