import { Droplet, Thermometer, Cloud, Sun, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { motion } from "framer-motion";

interface SensorCardProps {
  type: "moisture" | "temperature" | "humidity" | "light";
  value: number;
  unit: string;
  trend?: "up" | "down" | "stable";
  lastUpdated?: string;
}

const sensorConfig = {
  moisture: {
    icon: Droplet,
    label: "Soil Moisture",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  temperature: {
    icon: Thermometer,
    label: "Temperature",
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
  },
  humidity: {
    icon: Cloud,
    label: "Humidity",
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
  },
  light: {
    icon: Sun,
    label: "Light Level",
    color: "text-accent",
    bgColor: "bg-accent/20",
  },
};

const trendIcons = {
  up: TrendingUp,
  down: TrendingDown,
  stable: Minus,
};

export function SensorCard({ type, value, unit, trend = "stable", lastUpdated }: SensorCardProps) {
  const config = sensorConfig[type];
  const Icon = config.icon;
  const TrendIcon = trendIcons[trend];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="sensor-card flex items-center gap-4"
    >
      <div className={`w-12 h-12 rounded-xl ${config.bgColor} flex items-center justify-center`}>
        <Icon className={`w-6 h-6 ${config.color}`} />
      </div>
      <div className="flex-1">
        <p className="text-label">{config.label}</p>
        <div className="flex items-baseline gap-1">
          <span className="text-heading">{value}</span>
          <span className="text-muted-foreground text-sm">{unit}</span>
        </div>
      </div>
      <div className="flex flex-col items-end gap-1">
        <TrendIcon
          className={`w-4 h-4 ${
            trend === "up" ? "text-primary" : trend === "down" ? "text-destructive" : "text-muted-foreground"
          }`}
        />
        {lastUpdated && <span className="text-[10px] text-muted-foreground">{lastUpdated}</span>}
      </div>
    </motion.div>
  );
}
