import React from "react";
import "./Skeleton.css";

type SkeletonVariant = "text" | "rectangular" | "circular";
type SkeletonSize = "sm" | "md" | "lg" | "xl";

interface SkeletonProps {
  variant?: SkeletonVariant;
  size?: SkeletonSize;
  width?: string | number;
  height?: string | number;
  className?: string;
  children?: React.ReactNode;
}

export const Skeleton = ({
  variant = "rectangular",
  size = "md",
  width,
  height,
  className = "",
  children,
}: SkeletonProps) => {
  const sizeClasses = {
    sm: "skeleton--sm",
    md: "skeleton--md", 
    lg: "skeleton--lg",
    xl: "skeleton--xl",
  };

  const variantClasses = {
    text: "skeleton--text",
    rectangular: "skeleton--rectangular",
    circular: "skeleton--circular",
  };

  const combinedClasses = `skeleton ${sizeClasses[size]} ${variantClasses[variant]} ${className}`.trim();

  const style = {
    ...(width && { width: typeof width === "number" ? `${width}px` : width }),
    ...(height && { height: typeof height === "number" ? `${height}px` : height }),
  };

  return (
    <div className={combinedClasses} style={style}>
      {children}
    </div>
  );
};
