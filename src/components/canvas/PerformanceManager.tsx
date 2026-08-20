"use client";

import { PerformanceMonitor } from "@react-three/drei";
import { useState } from "react";

interface PerformanceManagerProps {
  children: React.ReactNode;
  onDecline: () => void;
}

export default function PerformanceManager({ children, onDecline }: PerformanceManagerProps) {
  const [dpr, setDpr] = useState(1.5); // Start with a decent DPR, scale down if needed

  return (
    <PerformanceMonitor
      onIncline={() => setDpr(2)}
      onDecline={() => {
        setDpr(1);
        onDecline(); // Notify parent to turn off heavy effects (shadows, antialiasing, etc) if needed
      }}
      flipflops={3}
      onFallback={() => setDpr(1)}
    >
      {/* We can pass DPR down or use it via useThree if needed, but R3F canvas handles global DPR. 
          For now, this component just monitors and triggers callbacks. */}
      {children}
    </PerformanceMonitor>
  );
}
