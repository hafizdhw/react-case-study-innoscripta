export const SyncIcon = ({ isSyncing }: { isSyncing: boolean }) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      className="sync-icon"
      style={{
        animation: isSyncing ? "spin 1.5s linear infinite" : undefined,
      }}
    >
      <defs>
        <linearGradient id="syncGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--color-primary)" />
          <stop offset="100%" stopColor="var(--color-primary-light)" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge> 
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      
      {/* Background circle */}
      <circle
        cx="10"
        cy="10"
        r="8"
        stroke="var(--color-border)"
        strokeWidth="1.5"
        fill="none"
        opacity="0.3"
      />
      
      {/* Main sync arcs */}
      <path
        d="M18 10a8 8 0 0 1-8 8"
        stroke="url(#syncGradient)"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
        filter={isSyncing ? "url(#glow)" : undefined}
        opacity={isSyncing ? 1 : 0.8}
      />
      <path
        d="M2 10a8 8 0 0 1 8-8"
        stroke="url(#syncGradient)"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
        filter={isSyncing ? "url(#glow)" : undefined}
        opacity={isSyncing ? 1 : 0.8}
      />
      
      {/* Arrow indicators */}
      <polygon 
        points="17.5,11 18.5,10 17.5,9" 
        fill="var(--color-primary)"
        opacity={isSyncing ? 1 : 0.7}
      />
      <polygon 
        points="2.5,9 1.5,10 2.5,11" 
        fill="var(--color-primary)"
        opacity={isSyncing ? 1 : 0.7}
      />
      
      {/* Center dot */}
      <circle
        cx="10"
        cy="10"
        r="1.5"
        fill="var(--color-primary)"
        opacity={isSyncing ? 0.8 : 0.6}
      />
      
      <style>
        {`
          .sync-icon {
            transition: all 0.3s ease-in-out;
          }
          
          .sync-icon:hover {
            transform: scale(1.1);
          }
          
          @keyframes spin {
            0% { 
              transform: rotate(0deg);
            }
            100% { 
              transform: rotate(360deg);
            }
          }
        `}
      </style>
    </svg>
  );
};
