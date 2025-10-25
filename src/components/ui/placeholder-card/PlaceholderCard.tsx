import { useMemo } from "react";
import { Text } from "../text/Text";
import "./PlaceholderCard.css";

type PlaceholderCardProps = {
  title: string;
  variant: "primary" | "danger";
};

export const PlaceholderCard = ({ title, variant }: PlaceholderCardProps) => {
  const variantClass = useMemo(() => {
    return `placeholder-card--${variant}`;
  }, [variant]);

  return (
    <div className={`placeholder-card ${variantClass}`}>
      <Text variant="body">{title}</Text>
    </div>
  );
};
