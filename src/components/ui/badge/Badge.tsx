import "./Badge.css";

export const Badge = ({
  children,
  variant,
}: {
  children: React.ReactNode;
  variant:
    | "primary"
    | "success"
    | "danger"
    | "warning"
    | "info"
    | "secondary-dark";
}) => {
  return <span className={`badge badge--${variant}`}>{children}</span>;
};
