import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { SplashScreen } from "@/components/SplashScreen";
import { OnboardingScreen } from "@/components/OnboardingScreen";
import { LoginScreen } from "@/components/LoginScreen";
import HomeScreen from "@/pages/Home";
import SensorsScreen from "@/pages/Sensors";
import AutomationScreen from "@/pages/Automation";
import AddEditRuleScreen from "@/pages/AddEditRule";
import PlantProfileScreen from "@/pages/PlantProfile";
import AnalyticsScreen from "@/pages/Analytics";
import SettingsScreen from "@/pages/Settings";
import NotificationsScreen from "@/pages/Notifications";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

type AppState = "splash" | "onboarding" | "login" | "app";

const App = () => {
  const [appState, setAppState] = useState<AppState>("splash");

  // Check if user has completed onboarding
  useEffect(() => {
    const hasOnboarded = localStorage.getItem("plantguard_onboarded");
    const isLoggedIn = localStorage.getItem("plantguard_logged_in");

    if (hasOnboarded && isLoggedIn) {
      setAppState("app");
    }
  }, []);

  const handleSplashComplete = () => {
    const hasOnboarded = localStorage.getItem("plantguard_onboarded");
    const isLoggedIn = localStorage.getItem("plantguard_logged_in");

    if (hasOnboarded && isLoggedIn) {
      setAppState("app");
    } else if (hasOnboarded) {
      setAppState("login");
    } else {
      setAppState("onboarding");
    }
  };

  const handleOnboardingComplete = () => {
    localStorage.setItem("plantguard_onboarded", "true");
    setAppState("login");
  };

  const handleLogin = () => {
    localStorage.setItem("plantguard_logged_in", "true");
    setAppState("app");
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <AnimatePresence mode="wait">
          {appState === "splash" && (
            <SplashScreen key="splash" onComplete={handleSplashComplete} />
          )}

          {appState === "onboarding" && (
            <OnboardingScreen key="onboarding" onComplete={handleOnboardingComplete} />
          )}

          {appState === "login" && (
            <LoginScreen
              key="login"
              onLogin={handleLogin}
              onRegister={handleLogin}
              onGuest={handleLogin}
            />
          )}

          {appState === "app" && (
            <BrowserRouter key="app">
              <Routes>
                <Route path="/" element={<HomeScreen />} />
                <Route path="/sensors" element={<SensorsScreen />} />
                <Route path="/automation" element={<AutomationScreen />} />
                <Route path="/automation/add" element={<AddEditRuleScreen />} />
                <Route path="/automation/edit/:id" element={<AddEditRuleScreen />} />
                <Route path="/plant" element={<PlantProfileScreen />} />
                <Route path="/analytics" element={<AnalyticsScreen />} />
                <Route path="/settings" element={<SettingsScreen />} />
                <Route path="/notifications" element={<NotificationsScreen />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          )}
        </AnimatePresence>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
