import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RuleCard } from "@/components/RuleCard";
import { BottomNav } from "@/components/BottomNav";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Rule {
  id: string;
  sensor: "moisture" | "temperature" | "humidity" | "light";
  condition: "<" | ">";
  threshold: number;
  action: string;
  enabled: boolean;
}

export function AutomationScreen() {
  const navigate = useNavigate();
  const [rules, setRules] = useState<Rule[]>([
    {
      id: "1",
      sensor: "moisture",
      condition: "<",
      threshold: 40,
      action: "Turn pump ON",
      enabled: true,
    },
    {
      id: "2",
      sensor: "moisture",
      condition: ">",
      threshold: 80,
      action: "Turn pump OFF",
      enabled: true,
    },
    {
      id: "3",
      sensor: "temperature",
      condition: ">",
      threshold: 35,
      action: "Send alert",
      enabled: false,
    },
  ]);

  const handleToggle = (id: string, enabled: boolean) => {
    setRules(rules.map((rule) => (rule.id === id ? { ...rule, enabled } : rule)));
  };

  const handleEdit = (id: string) => {
    navigate(`/automation/edit/${id}`);
  };

  const handleDelete = (id: string) => {
    setRules(rules.filter((rule) => rule.id !== id));
  };

  return (
    <div className="mobile-container min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="screen-padding pt-12 pb-6">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-muted transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-title">Automation</h1>
            <p className="text-muted-foreground text-sm">{rules.length} active rules</p>
          </div>
        </div>
      </div>

      {/* Rules */}
      <div className="screen-padding space-y-3">
        <AnimatePresence>
          {rules.map((rule, index) => (
            <motion.div
              key={rule.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <RuleCard
                rule={rule}
                onToggle={handleToggle}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            </motion.div>
          ))}
        </AnimatePresence>

        {rules.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-muted-foreground">No automation rules yet</p>
            <p className="text-sm text-muted-foreground">Add your first rule to get started</p>
          </motion.div>
        )}
      </div>

      {/* Floating Add Button */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5, type: "spring" }}
        className="fixed bottom-24 right-4 z-40"
      >
        <Button
          onClick={() => navigate("/automation/add")}
          size="icon"
          className="w-14 h-14 rounded-2xl shadow-lg"
        >
          <Plus className="w-6 h-6" />
        </Button>
      </motion.div>

      <BottomNav />
    </div>
  );
}

export default AutomationScreen;
