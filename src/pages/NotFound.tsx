import { useLocation, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  return (
    <div className="mobile-container min-h-screen bg-background flex flex-col items-center justify-center screen-padding">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-center"
      >
        <div className="w-20 h-20 bg-accent/20 rounded-full mx-auto mb-6 flex items-center justify-center">
          <AlertTriangle className="w-10 h-10 text-accent" />
        </div>
        
        <h1 className="text-title mb-2">Page Not Found</h1>
        <p className="text-muted-foreground mb-8">
          The page "{location.pathname}" doesn't exist.
        </p>
        
        <Button asChild>
          <Link to="/">
            <Home className="w-5 h-5 mr-2" />
            Back to Home
          </Link>
        </Button>
      </motion.div>
    </div>
  );
};

export default NotFound;
