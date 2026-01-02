import { Handle } from 'reactflow';
import { NodeFields } from './NodeFields';

export const CommonNode = ({
  title,
  handles = [],
  fields = [],
  values = {},
  onFieldChange,
  children,
  variant = 'default', 
}) => {
  const allNodeStyles = {
    default: {
      border: '#999',
      headerBg: '#f5f5f5',
    },
    input: {
      border: '#2563eb',
      headerBg: '#dbeafe',
    },
    llm: {
      border: '#7c3aed',
      headerBg: '#ede9fe',
    },
    text: {
      border: '#16a34a',
      headerBg: '#dcfce7',
    },
    output: {
      border: '#ea580c',
      headerBg: '#ffedd5',
    },
  };
  const currStyle = allNodeStyles[variant] || allNodeStyles.default;
  
  return (
    <div
      style={{
        width: 220,
        border: `1px solid ${currStyle.border}`,
        borderRadius: 8,
        background: '#fff',
        boxShadow: '0 4px 10px rgba(0,0,0,0.08)',
        position: 'relative',
        fontSize: 12,
      }}
    >
      {handles.map((h) => (
        <Handle
          key={h.id}
          type={h.type}
          position={h.position}
          id={h.id}
          style={{
            width: 10,
            height: 10,
            background: currStyle.border,
            border: '2px solid white',
            ...h.style,
          }}
        />
      ))}
      <div
        style={{
          padding: '6px 10px',
          background: currStyle.headerBg,
          borderBottom: `1px solid ${currStyle.border}`,
          borderRadius: '8px 8px 0 0',
          fontWeight: 600,
        }}
      >
        {title}
      </div>
      <div style={{ padding: 10 }}>
        {fields.length > 0 && (
          <NodeFields
            fields={fields}
            values={values}
            onChange={onFieldChange}
          />
        )}
        {children}
      </div>
    </div>
  );
};
