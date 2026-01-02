import { useState } from "react";
import { motion } from "framer-motion";
import { PlantStatusCard } from "@/components/PlantStatusCard";
import { Button } from "@/components/ui/button";
import { BottomNav } from "@/components/BottomNav";
import { Droplet, Pause, Settings, Bell, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function HomeScreen() {
  const navigate = useNavigate();
  const [isWatering, setIsWatering] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const handleWaterNow = () => {
    setIsWatering(true);
    setTimeout(() => setIsWatering(false), 3000);
  };

  const greeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  return (
    <div className="mobile-container min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="screen-padding pt-12 pb-6">
        <div className="flex items-center justify-between">
          <div>
            <motion.p
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-muted-foreground text-sm"
            >
              {greeting()} 👋
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="text-title"
            >
              Dashboard
            </motion.h1>
          </div>
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={() => navigate("/notifications")}
            className="w-11 h-11 bg-card rounded-xl flex items-center justify-center card-shadow relative"
          >
            <Bell className="w-5 h-5 text-foreground" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-destructive rounded-full" />
          </motion.button>
        </div>
      </div>

      {/* Main Content */}
      <div className="screen-padding space-y-4">
        {/* Plant Status Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <PlantStatusCard
            moisture={65}
            temperature={24}
            humidity={58}
            light={75}
            plantName="Tomato Plant"
          />
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-3 gap-3"
        >
          <Button
            onClick={handleWaterNow}
            variant={isWatering ? "secondary" : "default"}
            className="flex-col h-20 gap-2"
            disabled={isWatering}
          >
            <Droplet className={`w-6 h-6 ${isWatering ? "animate-pulse" : ""}`} />
            <span className="text-xs">{isWatering ? "Watering..." : "Water Now"}</span>
          </Button>

          <Button
            onClick={() => setIsPaused(!isPaused)}
            variant={isPaused ? "accent" : "muted"}
            className="flex-col h-20 gap-2"
          >
            <Pause className="w-6 h-6" />
            <span className="text-xs">{isPaused ? "Resume" : "Pause"}</span>
          </Button>

          <Button
            onClick={() => navigate("/settings")}
            variant="muted"
            className="flex-col h-20 gap-2"
          >
            <Settings className="w-6 h-6" />
            <span className="text-xs">Settings</span>
          </Button>
        </motion.div>

        {/* Menu Items */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-3 mt-6"
        >
          <h3 className="text-heading">Quick Access</h3>

          <MenuItem
            title="Live Sensor Data"
            subtitle="Real-time readings from all sensors"
            onClick={() => navigate("/sensors")}
          />
          <MenuItem
            title="Automation Rules"
            subtitle="Manage your watering schedules"
            onClick={() => navigate("/automation")}
          />
          <MenuItem
            title="Plant Profile"
            subtitle="View and edit plant details"
            onClick={() => navigate("/plant")}
          />
        </motion.div>
      </div>

      <BottomNav />
    </div>
  );
}

function MenuItem({
  title,
  subtitle,
  onClick,
}: {
  title: string;
  subtitle: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="w-full bg-card rounded-xl p-4 card-shadow flex items-center justify-between hover:bg-muted/50 transition-colors touch-target text-left"
    >
      <div>
        <p className="text-body font-medium">{title}</p>
        <p className="text-label text-muted-foreground">{subtitle}</p>
      </div>
      <ChevronRight className="w-5 h-5 text-muted-foreground" />
    </button>
  );
}

export default HomeScreen;
