import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronRight, Droplets, LineChart, Sprout } from "lucide-react";

interface OnboardingScreenProps {
  onComplete: () => void;
}

const slides = [
  {
    icon: Droplets,
    title: "Monitor Your Plants",
    description: "Real-time sensors track soil moisture, temperature, humidity, and light levels 24/7.",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: Sprout,
    title: "Automated Watering",
    description: "Smart automation waters your plants at the perfect time, even when you're away.",
    color: "text-secondary",
    bgColor: "bg-secondary/10",
  },
  {
    icon: LineChart,
    title: "Grow Smarter",
    description: "Analytics and insights help you understand your plants and optimize their growth.",
    color: "text-accent",
    bgColor: "bg-accent/20",
  },
];

export function OnboardingScreen({ onComplete }: OnboardingScreenProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      onComplete();
    }
  };

  const slideVariants = {
    enter: { x: 300, opacity: 0 },
    center: { x: 0, opacity: 1 },
    exit: { x: -300, opacity: 0 },
  };

  return (
    <div className="mobile-container min-h-screen bg-background flex flex-col">
      {/* Skip Button */}
      <div className="screen-padding pt-12 flex justify-end">
        <button
          onClick={onComplete}
          className="text-muted-foreground text-sm font-medium hover:text-foreground transition-colors touch-target"
        >
          Skip
        </button>
      </div>

      {/* Slide Content */}
      <div className="flex-1 flex flex-col items-center justify-center screen-padding">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3 }}
            className="text-center"
          >
            {/* Icon */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className={`w-32 h-32 ${slides[currentSlide].bgColor} rounded-3xl mx-auto mb-8 flex items-center justify-center`}
            >
              {(() => {
                const Icon = slides[currentSlide].icon;
                return <Icon className={`w-16 h-16 ${slides[currentSlide].color}`} />;
              })()}
            </motion.div>

            {/* Title */}
            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-title mb-4"
            >
              {slides[currentSlide].title}
            </motion.h2>

            {/* Description */}
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-muted-foreground max-w-xs mx-auto"
            >
              {slides[currentSlide].description}
            </motion.p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Pagination & CTA */}
      <div className="screen-padding pb-12">
        {/* Dots */}
        <div className="flex justify-center gap-2 mb-8">
          {slides.map((_, index) => (
            <motion.div
              key={index}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "w-6 bg-primary"
                  : "w-2 bg-muted-foreground/30"
              }`}
            />
          ))}
        </div>

        {/* Button */}
        <Button onClick={nextSlide} className="w-full" size="lg">
          {currentSlide === slides.length - 1 ? "Get Started" : "Next"}
          <ChevronRight className="w-5 h-5 ml-1" />
        </Button>
      </div>
    </div>
  );
}
