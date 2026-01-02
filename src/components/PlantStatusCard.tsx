import { motion } from "framer-motion";
import { Droplet, Thermometer, Cloud, Sun } from "lucide-react";

interface PlantStatusCardProps {
  moisture: number;
  temperature: number;
  humidity: number;
  light: number;
  plantName?: string;
}

export function PlantStatusCard({
  moisture,
  temperature,
  humidity,
  light,
  plantName = "My Plant",
}: PlantStatusCardProps) {
  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (moisture / 100) * circumference;

  const getMoistureStatus = (value: number) => {
    if (value < 30) return { text: "Needs Water", color: "text-destructive" };
    if (value < 50) return { text: "Low", color: "text-accent" };
    if (value < 80) return { text: "Optimal", color: "text-primary" };
    return { text: "Saturated", color: "text-blue-500" };
  };

  const status = getMoistureStatus(moisture);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-card rounded-2xl p-5 card-shadow"
    >
      <div className="flex items-center gap-4">
        {/* Circular Moisture Indicator */}
        <div className="relative w-28 h-28">
          <svg className="w-28 h-28 -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="hsl(var(--muted))"
              strokeWidth="8"
            />
            <motion.circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="hsl(var(--primary))"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <Droplet className="w-5 h-5 text-primary mb-1" />
            <span className="text-xl font-bold">{moisture}%</span>
          </div>
        </div>

        {/* Plant Info */}
        <div className="flex-1">
          <h3 className="text-heading mb-1">{plantName}</h3>
          <p className={`text-sm font-medium ${status.color}`}>{status.text}</p>
          
          <div className="grid grid-cols-3 gap-2 mt-3">
            <div className="flex items-center gap-1">
              <Thermometer className="w-4 h-4 text-orange-500" />
              <span className="text-label">{temperature}°C</span>
            </div>
            <div className="flex items-center gap-1">
              <Cloud className="w-4 h-4 text-blue-500" />
              <span className="text-label">{humidity}%</span>
            </div>
            <div className="flex items-center gap-1">
              <Sun className="w-4 h-4 text-accent" />
              <span className="text-label">{light}%</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
