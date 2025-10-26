import React from "react";
import "./Text.css";

type TextVariant = "h1" | "h2" | "h3" | "paragraph" | "label" | "span";

type TextSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl";

interface TextProps {
  variant: TextVariant;
  size: TextSize;
  children: React.ReactNode;
  className?: string;
}

export const Text = ({
  variant,
  size,
  children,
  className = "",
}: TextProps) => {
  const baseClasses = "text-base";

  const sizeClasses = {
    xs: "text-xs",
    sm: "text-sm",
    md: "text-md",
    lg: "text-lg",
    xl: "text-xl",
    "2xl": "text-2xl",
    "3xl": "text-3xl",
    "4xl": "text-4xl",
  };

  const combinedClasses =
    `${baseClasses} ${sizeClasses[size]} ${className}`.trim();

  switch (variant) {
    case "h1":
      return <h1 className={combinedClasses}>{children}</h1>;
    case "h2":
      return <h2 className={combinedClasses}>{children}</h2>;
    case "h3":
      return <h3 className={combinedClasses}>{children}</h3>;
    case "paragraph":
      return <p className={combinedClasses}>{children}</p>;
    case "label":
      return <label className={combinedClasses}>{children}</label>;
    case "span":
      return <span className={combinedClasses}>{children}</span>;
    default:
      return <p className={combinedClasses}>{children}</p>;
  }
};
