export const Button = ({
  label = 'Click',
  onClick,
  variant = 'primary',
  style: customStyle = {},
}) => {
  const variants = {
    primary: { bg: '#2563eb', hover: '#1d4ed8', active: '#1e40af', color: '#fff' },
    secondary: { bg: '#6b7280', hover: '#4b5563', active: '#374151', color: '#fff' },
    danger: { bg: '#dc2626', hover: '#b91c1c', active: '#991b1b', color: '#fff' },
  };

  const colors = variants[variant] || variants.primary;

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        marginTop: 12,
        ...customStyle.wrapper,
      }}
    >
      <button
        onClick={onClick}
        style={{
          padding: '8px 16px',
          borderRadius: 6,
          border: 'none',
          backgroundColor: colors.bg,
          color: colors.color,
          fontSize: 13,
          fontWeight: 600,
          cursor: 'pointer',
          boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
          transition: 'all 0.2s ease',
          ...customStyle.button,
        }}
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = colors.hover;
          e.target.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = colors.bg;
          e.target.style.boxShadow = '0 2px 6px rgba(0,0,0,0.1)';
        }}
        onMouseDown={(e) => {
          e.target.style.backgroundColor = colors.active;
          e.target.style.transform = 'scale(0.98)';
        }}
        onMouseUp={(e) => {
          e.target.style.backgroundColor = colors.bg;
          e.target.style.transform = 'scale(1)';
        }}
      >
        {label}
      </button>
    </div>
  );
};
