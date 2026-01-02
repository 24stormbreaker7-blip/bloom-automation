import { motion } from "framer-motion";
import { BottomNav } from "@/components/BottomNav";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Pencil, Droplet, ThermometerSun, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export function PlantProfileScreen() {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [notes, setNotes] = useState("Planted on March 15. Prefers morning sun. Water every 2-3 days.");

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
            <h1 className="text-title">Plant Profile</h1>
          </div>
          <Button
            onClick={() => setIsEditing(!isEditing)}
            variant="ghost"
            size="icon"
          >
            <Pencil className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Plant Image */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="screen-padding"
      >
        <div className="w-full aspect-square bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl flex items-center justify-center mb-6">
          <div className="text-center">
            <div className="w-24 h-24 bg-primary/20 rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-5xl">🌱</span>
            </div>
            <p className="text-muted-foreground text-sm">Tap to add photo</p>
          </div>
        </div>
      </motion.div>

      {/* Plant Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="screen-padding"
      >
        <div className="bg-card rounded-2xl p-5 card-shadow space-y-4">
          <div>
            <p className="text-label text-muted-foreground">Plant Name</p>
            <h2 className="text-heading">Tomato Plant</h2>
          </div>

          <div>
            <p className="text-label text-muted-foreground">Type</p>
            <p className="text-body">Solanum lycopersicum (Cherry Tomato)</p>
          </div>

          <div className="grid grid-cols-3 gap-4 pt-2">
            <div className="flex flex-col items-center gap-2 p-3 bg-muted/50 rounded-xl">
              <Calendar className="w-5 h-5 text-primary" />
              <p className="text-label text-center">Growth Stage</p>
              <p className="text-sm font-medium">Vegetative</p>
            </div>
            <div className="flex flex-col items-center gap-2 p-3 bg-muted/50 rounded-xl">
              <Droplet className="w-5 h-5 text-blue-500" />
              <p className="text-label text-center">Water Need</p>
              <p className="text-sm font-medium">Medium</p>
            </div>
            <div className="flex flex-col items-center gap-2 p-3 bg-muted/50 rounded-xl">
              <ThermometerSun className="w-5 h-5 text-orange-500" />
              <p className="text-label text-center">Light Need</p>
              <p className="text-sm font-medium">Full Sun</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Notes */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="screen-padding mt-4"
      >
        <div className="bg-card rounded-2xl p-5 card-shadow">
          <p className="text-label text-muted-foreground mb-3">Notes</p>
          {isEditing ? (
            <div className="space-y-3">
              <Textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="min-h-[100px] rounded-xl"
              />
              <Button onClick={() => setIsEditing(false)} size="sm">
                Save Notes
              </Button>
            </div>
          ) : (
            <p className="text-body">{notes}</p>
          )}
        </div>
      </motion.div>

      <BottomNav />
    </div>
  );
}

export default PlantProfileScreen;
