import { useState } from 'react';
import { Position } from 'reactflow';
import { CommonNode } from './CommonNode';

export const ExpressionNode = ({ id, data }) => {
  const [values, setValues] = useState({
    expression: data?.expression || '',
  });

  const handleFieldChange = (key, value) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <CommonNode
      title="Expression"
      variant="text" 
      values={values}
      onFieldChange={handleFieldChange}
      fields={[
        {
          name: 'expression',
          label: 'Expression',
          type: 'text',
        },
      ]}
      handles={[
        {
          type: 'target',
          position: Position.Left,
          id: `${id}-input`,
        },
        {
          type: 'source',
          position: Position.Right,
          id: `${id}-output`,
        },
      ]}
    >
      <div style={{ fontSize: 11, color: '#6b7280', marginTop: 4 }}>
        Enter a JavaScript expression.
      </div>
    </CommonNode>
  );
};
