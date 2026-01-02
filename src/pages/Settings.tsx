import { motion } from "framer-motion";
import { BottomNav } from "@/components/BottomNav";
import { ArrowLeft, ChevronRight, Wifi, Bell, Palette, Globe, Info, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";

export function SettingsScreen() {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const settingsGroups = [
    {
      title: "Device",
      items: [
        {
          icon: Wifi,
          label: "Sensor Calibration",
          subtitle: "Calibrate connected sensors",
          action: "navigate",
        },
      ],
    },
    {
      title: "Preferences",
      items: [
        {
          icon: Bell,
          label: "Notifications",
          subtitle: notifications ? "Enabled" : "Disabled",
          action: "toggle",
          value: notifications,
          onChange: setNotifications,
        },
        {
          icon: Palette,
          label: "Dark Mode",
          subtitle: darkMode ? "On" : "Off",
          action: "toggle",
          value: darkMode,
          onChange: setDarkMode,
        },
        {
          icon: Globe,
          label: "Language",
          subtitle: "English",
          action: "navigate",
        },
      ],
    },
    {
      title: "About",
      items: [
        {
          icon: Info,
          label: "About PlantGuard",
          subtitle: "Version 1.0.0",
          action: "navigate",
        },
        {
          icon: Shield,
          label: "Privacy Policy",
          subtitle: "",
          action: "navigate",
        },
      ],
    },
  ];

  return (
    <div className="mobile-container min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="screen-padding pt-12 pb-6">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-muted transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-title">Settings</h1>
        </div>
      </div>

      {/* Settings Groups */}
      <div className="screen-padding space-y-6">
        {settingsGroups.map((group, groupIndex) => (
          <motion.div
            key={group.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: groupIndex * 0.1 }}
          >
            <h3 className="text-label text-muted-foreground mb-3">{group.title}</h3>
            <div className="bg-card rounded-2xl card-shadow overflow-hidden">
              {group.items.map((item, itemIndex) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.label}
                    className={`w-full flex items-center gap-4 p-4 hover:bg-muted/50 transition-colors touch-target text-left ${
                      itemIndex < group.items.length - 1 ? "border-b border-border" : ""
                    }`}
                    onClick={() => {
                      if (item.action === "navigate") {
                        // Navigate logic
                      }
                    }}
                  >
                    <div className="w-10 h-10 bg-muted rounded-xl flex items-center justify-center">
                      <Icon className="w-5 h-5 text-foreground" />
                    </div>
                    <div className="flex-1">
                      <p className="text-body font-medium">{item.label}</p>
                      {item.subtitle && (
                        <p className="text-label text-muted-foreground">{item.subtitle}</p>
                      )}
                    </div>
                    {item.action === "toggle" ? (
                      <Switch
                        checked={item.value}
                        onCheckedChange={item.onChange}
                        onClick={(e) => e.stopPropagation()}
                      />
                    ) : (
                      <ChevronRight className="w-5 h-5 text-muted-foreground" />
                    )}
                  </button>
                );
              })}
            </div>
          </motion.div>
        ))}
      </div>

      <BottomNav />
    </div>
  );
}

export default SettingsScreen;
