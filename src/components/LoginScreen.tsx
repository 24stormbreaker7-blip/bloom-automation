import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Leaf, Cpu } from "lucide-react";

interface LoginScreenProps {
  onLogin: () => void;
  onRegister: () => void;
  onGuest: () => void;
}

export function LoginScreen({ onLogin, onRegister, onGuest }: LoginScreenProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = () => {
    const newErrors: { email?: string; password?: string } = {};

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      if (isLogin) {
        onLogin();
      } else {
        onRegister();
      }
    }
  };

  return (
    <div className="mobile-container min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="screen-padding pt-16 pb-8">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="flex items-center justify-center gap-2 mb-4"
        >
          <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center">
            <div className="relative">
              <Leaf className="w-6 h-6 text-white" />
              <Cpu className="w-3 h-3 text-white absolute -bottom-0.5 -right-0.5" />
            </div>
          </div>
        </motion.div>

        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-title text-center"
        >
          {isLogin ? "Welcome Back" : "Create Account"}
        </motion.h1>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-muted-foreground text-center mt-2"
        >
          {isLogin
            ? "Sign in to continue to PlantGuard"
            : "Start your smart gardening journey"}
        </motion.p>
      </div>

      {/* Form */}
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="screen-padding flex-1"
      >
        <div className="space-y-5">
          {/* Email Field */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-label">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) setErrors({ ...errors, email: undefined });
              }}
              className={`h-12 rounded-xl ${errors.email ? "border-destructive" : ""}`}
            />
            {errors.email && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-destructive text-xs"
              >
                {errors.email}
              </motion.p>
            )}
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <Label htmlFor="password" className="text-label">
              Password
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errors.password) setErrors({ ...errors, password: undefined });
                }}
                className={`h-12 rounded-xl pr-12 ${errors.password ? "border-destructive" : ""}`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {errors.password && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-destructive text-xs"
              >
                {errors.password}
              </motion.p>
            )}
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-8 space-y-3">
          <Button onClick={handleSubmit} className="w-full" size="lg">
            {isLogin ? "Login" : "Create Account"}
          </Button>

          <Button
            onClick={() => setIsLogin(!isLogin)}
            variant="outline"
            className="w-full"
            size="lg"
          >
            {isLogin ? "Create Account" : "Back to Login"}
          </Button>
        </div>

        {/* Guest Option */}
        <div className="mt-6 text-center">
          <button
            onClick={onGuest}
            className="text-muted-foreground text-sm hover:text-primary transition-colors touch-target"
          >
            Continue as Guest
          </button>
        </div>
      </motion.div>
    </div>
  );
}
