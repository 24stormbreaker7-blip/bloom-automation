import { motion } from "framer-motion";
import { AlertCircle, Droplet, Zap, AlertTriangle, X } from "lucide-react";

interface Notification {
  id: string;
  type: "low_moisture" | "pump_activity" | "sensor_error";
  message: string;
  timestamp: string;
  read?: boolean;
}

interface NotificationItemProps {
  notification: Notification;
  onDismiss?: (id: string) => void;
}

const notificationConfig = {
  low_moisture: {
    icon: Droplet,
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
  pump_activity: {
    icon: Zap,
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  sensor_error: {
    icon: AlertTriangle,
    color: "text-destructive",
    bgColor: "bg-destructive/10",
  },
};

export function NotificationItem({ notification, onDismiss }: NotificationItemProps) {
  const config = notificationConfig[notification.type];
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className={`flex items-start gap-3 p-4 rounded-xl bg-card card-shadow ${
        notification.read ? "opacity-60" : ""
      }`}
    >
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${config.bgColor}`}>
        <Icon className={`w-5 h-5 ${config.color}`} />
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-body">{notification.message}</p>
        <p className="text-label text-muted-foreground mt-1">{notification.timestamp}</p>
      </div>

      {onDismiss && (
        <button
          onClick={() => onDismiss(notification.id)}
          className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-muted transition-colors"
        >
          <X className="w-4 h-4 text-muted-foreground" />
        </button>
      )}
    </motion.div>
  );
}
