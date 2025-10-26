import { useMemo } from "react";
import { Text } from "../text/Text";
import "./PlaceholderCard.css";

type PlaceholderCardProps = {
  title: string;
  variant: "primary" | "danger";
  isActive?: boolean;
};

export const PlaceholderCard = ({
  title,
  variant,
  isActive,
}: PlaceholderCardProps) => {
  const variantClass = useMemo(() => {
    return `placeholder-card--${variant}`;
  }, [variant]);

  return (
    <div
      className={`placeholder-card ${variantClass} ${
        isActive ? `placeholder-card--active-${variant}` : ""
      }`}
    >
      <Text variant="body">{title}</Text>
    </div>
  );
};
