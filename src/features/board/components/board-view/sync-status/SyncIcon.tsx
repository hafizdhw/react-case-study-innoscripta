export const SyncIcon = ({ isSyncing }: { isSyncing: boolean }) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      style={{
        marginRight: 4,
        animation: isSyncing ? "spin 1s linear infinite" : undefined,
      }}
    >
      <g>
        <circle
          cx="10"
          cy="10"
          r="8"
          stroke="#517edb"
          strokeWidth="2"
          fill="none"
          opacity="0.15"
        />
        <path
          d="M18 10a8 8 0 0 1-8 8"
          stroke="#517edb"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M2 10a8 8 0 0 1 8-8"
          stroke="#517edb"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
        <polygon points="17.5,11 18.5,10 17.5,9" fill="#517edb" />
      </g>
      <style>
        {`
            @keyframes spin {
              100% { transform: rotate(360deg);}
            }
            `}
      </style>
    </svg>
  );
};
