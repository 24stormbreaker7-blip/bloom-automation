import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

export function AddEditRuleScreen() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = !!id;

  const [sensor, setSensor] = useState("moisture");
  const [condition, setCondition] = useState("<");
  const [threshold, setThreshold] = useState("");
  const [action, setAction] = useState("pump_on");
  const [delay, setDelay] = useState("0");

  const handleSave = () => {
    // Save logic would go here
    navigate("/automation");
  };

  return (
    <div className="mobile-container min-h-screen bg-background">
      {/* Header */}
      <div className="screen-padding pt-12 pb-6">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-muted transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-title">{isEditing ? "Edit Rule" : "Add Rule"}</h1>
        </div>
      </div>

      {/* Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="screen-padding space-y-6"
      >
        {/* Sensor */}
        <div className="space-y-2">
          <Label className="text-label">Sensor</Label>
          <Select value={sensor} onValueChange={setSensor}>
            <SelectTrigger className="h-12 rounded-xl">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-card">
              <SelectItem value="moisture">Soil Moisture</SelectItem>
              <SelectItem value="temperature">Temperature</SelectItem>
              <SelectItem value="humidity">Humidity</SelectItem>
              <SelectItem value="light">Light Level</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Condition */}
        <div className="space-y-2">
          <Label className="text-label">Condition</Label>
          <Select value={condition} onValueChange={setCondition}>
            <SelectTrigger className="h-12 rounded-xl">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-card">
              <SelectItem value="<">Less than (&lt;)</SelectItem>
              <SelectItem value=">">Greater than (&gt;)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Threshold */}
        <div className="space-y-2">
          <Label className="text-label">Threshold Value</Label>
          <Input
            type="number"
            placeholder="e.g., 40"
            value={threshold}
            onChange={(e) => setThreshold(e.target.value)}
            className="h-12 rounded-xl"
          />
        </div>

        {/* Action */}
        <div className="space-y-2">
          <Label className="text-label">Action</Label>
          <Select value={action} onValueChange={setAction}>
            <SelectTrigger className="h-12 rounded-xl">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-card">
              <SelectItem value="pump_on">Turn Pump ON</SelectItem>
              <SelectItem value="pump_off">Turn Pump OFF</SelectItem>
              <SelectItem value="alert">Send Alert</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Delay */}
        <div className="space-y-2">
          <Label className="text-label">Delay (seconds)</Label>
          <Input
            type="number"
            placeholder="0"
            value={delay}
            onChange={(e) => setDelay(e.target.value)}
            className="h-12 rounded-xl"
          />
          <p className="text-xs text-muted-foreground">
            Wait before triggering the action
          </p>
        </div>

        {/* Buttons */}
        <div className="pt-4 space-y-3">
          <Button onClick={handleSave} className="w-full" size="lg">
            {isEditing ? "Save Changes" : "Create Rule"}
          </Button>
          <Button
            onClick={() => navigate("/automation")}
            variant="ghost"
            className="w-full"
            size="lg"
          >
            Cancel
          </Button>
        </div>
      </motion.div>
    </div>
  );
}

export default AddEditRuleScreen;
