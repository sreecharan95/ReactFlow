import { useRef, useEffect, useState } from 'react';

const ResizeField = ({ label, value, onChange, onResize }) => {
  const textareaRef = useRef(null);
  const [height, setHeight] = useState('auto');

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'; 
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
      setHeight(`${textareaRef.current.scrollHeight}px`);
      if (onResize) {
        onResize(textareaRef.current.scrollHeight);
      }
    }
  }, [value, onResize]);

  return (
    <label
      style={{
        display: 'flex',
        flexDirection: 'column',
        fontSize: 12,
        color: '#374151',
      }}
    >
      <span style={{ marginBottom: 4, fontWeight: 500 }}>{label}</span>
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          padding: '6px 8px',
          borderRadius: 6,
          border: '1px solid #d1d5db',
          fontSize: 12,
          outline: 'none',
          resize: 'none',        
          overflow: 'hidden', 
          height,
        }}
        onFocus={(e) => {
          e.target.style.border = '1px solid #2563eb';
        }}
        onBlur={(e) => {
          e.target.style.border = '1px solid #d1d5db';
        }}
      />
    </label>
  );
};

export const NodeFields = ({ fields, values, onChange, onResize }) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
      }}
    >
      {fields.map((field) => {
        if (field.type === 'text') {
          return <ResizeField
            key={field.name}
            label={field.label}
            value={values[field.name] ?? ''}
            onChange={(val) => onChange(field.name, val)}
            onResize={onResize}
          />;
        }
        if (field.type === 'select') {
          return (
            <label
              key={field.name}
              style={{
                display: 'flex',
                flexDirection: 'column',
                fontSize: 12,
                color: '#374151',
              }}
            >
              <span style={{ marginBottom: 4, fontWeight: 500 }}>
                {field.label}
              </span>
              <select
                value={values[field.name]}
                onChange={(e) => onChange(field.name, e.target.value)}
                style={{
                  padding: '6px 8px',
                  borderRadius: 6,
                  border: '1px solid #d1d5db',
                  fontSize: 12,
                  backgroundColor: '#ffffff',
                  outline: 'none',
                  cursor: 'pointer',
                }}
                onFocus={(e) => {
                  e.target.style.border = '1px solid #2563eb';
                }}
                onBlur={(e) => {
                  e.target.style.border = '1px solid #d1d5db';
                }}
              >
                {field.options.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </label>
          );
        }
        return null;
      })}
    </div>
  );
};
