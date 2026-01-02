import { motion, AnimatePresence } from "framer-motion";
import { Switch } from "@/components/ui/switch";
import { Pencil, Trash2, Droplet, Thermometer, Cloud, Sun } from "lucide-react";

interface AutomationRule {
  id: string;
  sensor: "moisture" | "temperature" | "humidity" | "light";
  condition: "<" | ">";
  threshold: number;
  action: string;
  enabled: boolean;
}

interface RuleCardProps {
  rule: AutomationRule;
  onToggle: (id: string, enabled: boolean) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const sensorIcons = {
  moisture: Droplet,
  temperature: Thermometer,
  humidity: Cloud,
  light: Sun,
};

const sensorColors = {
  moisture: "text-primary bg-primary/10",
  temperature: "text-orange-500 bg-orange-500/10",
  humidity: "text-blue-500 bg-blue-500/10",
  light: "text-accent bg-accent/20",
};

const sensorLabels = {
  moisture: "Moisture",
  temperature: "Temp",
  humidity: "Humidity",
  light: "Light",
};

const sensorUnits = {
  moisture: "%",
  temperature: "°C",
  humidity: "%",
  light: "%",
};

export function RuleCard({ rule, onToggle, onEdit, onDelete }: RuleCardProps) {
  const Icon = sensorIcons[rule.sensor];
  const colorClasses = sensorColors[rule.sensor];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100 }}
      className={`bg-card rounded-xl p-4 card-shadow ${!rule.enabled && "opacity-60"}`}
    >
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${colorClasses.split(" ")[1]}`}>
          <Icon className={`w-5 h-5 ${colorClasses.split(" ")[0]}`} />
        </div>

        <div className="flex-1">
          <p className="text-body font-medium">
            {rule.action} when {sensorLabels[rule.sensor]} {rule.condition} {rule.threshold}
            {sensorUnits[rule.sensor]}
          </p>
          <p className="text-label text-muted-foreground">
            {rule.enabled ? "Active" : "Paused"}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onEdit(rule.id)}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-muted transition-colors"
          >
            <Pencil className="w-4 h-4 text-muted-foreground" />
          </button>
          <button
            onClick={() => onDelete(rule.id)}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-destructive/10 transition-colors"
          >
            <Trash2 className="w-4 h-4 text-destructive" />
          </button>
          <Switch
            checked={rule.enabled}
            onCheckedChange={(checked) => onToggle(rule.id, checked)}
          />
        </div>
      </div>
    </motion.div>
  );
}
