import { Children, type ReactNode } from "react";

type Animation = "fade-up" | "fade-in" | "fade-left" | "fade-right" | "scale-in" | "slide-up";

interface AnimateProps {
  children: ReactNode;
  animation?: Animation;
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
}

export function Animate({ children, animation = "fade-up", delay = 0, duration = 650, className = "" }: AnimateProps) {
  return (
    <div
      data-animate={animation}
      data-delay={delay}
      data-duration={duration}
      className={className}
    >
      {children}
    </div>
  );
}

interface StaggerProps {
  children: ReactNode;
  stagger?: number;
  animation?: Animation;
  className?: string;
}

export function Stagger({ children, stagger = 80, animation = "fade-up", className = "" }: StaggerProps) {
  return (
    <div data-stagger={stagger} data-animate={animation} className={className}>
      {Children.map(children, child => <div className="stagger-child">{child}</div>)}
    </div>
  );
}
