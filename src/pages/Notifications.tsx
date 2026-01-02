import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NotificationItem } from "@/components/NotificationItem";
import { BottomNav } from "@/components/BottomNav";
import { ArrowLeft, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface Notification {
  id: string;
  type: "low_moisture" | "pump_activity" | "sensor_error";
  message: string;
  timestamp: string;
  read?: boolean;
}

export function NotificationsScreen() {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "low_moisture",
      message: "Soil moisture dropped below 35%. Consider watering soon.",
      timestamp: "5 min ago",
    },
    {
      id: "2",
      type: "pump_activity",
      message: "Automated watering completed. 200ml water dispensed.",
      timestamp: "1 hour ago",
      read: true,
    },
    {
      id: "3",
      type: "sensor_error",
      message: "Temperature sensor connection lost. Please check device.",
      timestamp: "3 hours ago",
    },
    {
      id: "4",
      type: "pump_activity",
      message: "Morning watering schedule activated.",
      timestamp: "Yesterday",
      read: true,
    },
  ]);

  const handleDismiss = (id: string) => {
    setNotifications(notifications.filter((n) => n.id !== id));
  };

  const clearAll = () => {
    setNotifications([]);
  };

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
            <div>
              <h1 className="text-title">Notifications</h1>
              <p className="text-muted-foreground text-sm">
                {notifications.length} alerts
              </p>
            </div>
          </div>
          {notifications.length > 0 && (
            <Button
              onClick={clearAll}
              variant="ghost"
              size="sm"
              className="text-muted-foreground"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Clear all
            </Button>
          )}
        </div>
      </div>

      {/* Notifications List */}
      <div className="screen-padding space-y-3">
        <AnimatePresence>
          {notifications.map((notification, index) => (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              transition={{ delay: index * 0.05 }}
            >
              <NotificationItem
                notification={notification}
                onDismiss={handleDismiss}
              />
            </motion.div>
          ))}
        </AnimatePresence>

        {notifications.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="w-16 h-16 bg-muted rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-3xl">🔔</span>
            </div>
            <p className="text-muted-foreground">No notifications</p>
            <p className="text-sm text-muted-foreground">You're all caught up!</p>
          </motion.div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}

export default NotificationsScreen;
