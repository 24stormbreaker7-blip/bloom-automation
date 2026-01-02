import { motion } from "framer-motion";
import { SensorCard } from "@/components/SensorCard";
import { BottomNav } from "@/components/BottomNav";
import { ArrowLeft, RefreshCw } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export function SensorsScreen() {
  const navigate = useNavigate();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1500);
  };

  const sensors = [
    { type: "moisture" as const, value: 65, unit: "%", trend: "stable" as const, lastUpdated: "Just now" },
    { type: "temperature" as const, value: 24, unit: "°C", trend: "up" as const, lastUpdated: "2 min ago" },
    { type: "humidity" as const, value: 58, unit: "%", trend: "down" as const, lastUpdated: "1 min ago" },
    { type: "light" as const, value: 75, unit: "%", trend: "up" as const, lastUpdated: "Just now" },
  ];

  return (
    <div className="mobile-container min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="screen-padding pt-12 pb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-muted transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-title">Sensors</h1>
          </div>
          <button
            onClick={handleRefresh}
            className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-muted transition-colors"
          >
            <RefreshCw className={`w-5 h-5 ${isRefreshing ? "animate-spin" : ""}`} />
          </button>
        </div>
      </div>

      {/* Sensor Cards */}
      <div className="screen-padding space-y-3">
        <p className="text-muted-foreground text-sm mb-4">
          Real-time data from your connected sensors
        </p>
        {sensors.map((sensor, index) => (
          <motion.div
            key={sensor.type}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <SensorCard {...sensor} />
          </motion.div>
        ))}
      </div>

      <BottomNav />
    </div>
  );
}

export default SensorsScreen;
