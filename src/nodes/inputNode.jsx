import { useState } from 'react';
import { Position } from 'reactflow';
import { CommonNode } from './CommonNode';

export const InputNode = ({ id, data }) => {
  const [values, setValues] = useState({
    name: data?.inputName || id.replace('customInput-', 'input_'),
    type: data?.inputType || 'Text',
  });
  const handleChange = (key, value) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <CommonNode
      title="Input"
      variant='input'
      values={values}
      onFieldChange={handleChange}
      fields={[
        {
          name: 'name',
          label: 'Name',
          type: 'text',
        },
        {
          name: 'type',
          label: 'Type',
          type: 'select',
          options: [
            { label: 'Text', value: 'Text' },
            { label: 'File', value: 'File' },
          ],
        },
      ]}
      handles={[
        {
          type: 'source',
          position: Position.Right,
          id: `${id}-value`,
        },
      ]}
    />
  );
};
