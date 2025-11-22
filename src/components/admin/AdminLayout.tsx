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
      {/* Ajustat padding-top (pt) pentru mobil vs desktop */}
      <div className="min-h-screen bg-secondary/20 pt-16 md:pt-20 pb-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          {/* Header Section - Mai compact pe mobil */}
          <div className="mb-6 md:mb-8">
            <div className="bg-background rounded-lg shadow-sm border border-border p-4 md:p-6">
              <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-1 md:mb-2">
                Panou de Administrare
              </h1>
              <p className="text-sm md:text-base text-muted-foreground">
                Gestionează conținutul site-ului și setările
              </p>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="bg-background rounded-lg shadow-sm border border-border p-4 md:p-6 min-h-[600px]">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};
