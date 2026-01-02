// outputNode.js

import { useState } from 'react';
import { Position } from 'reactflow';
import { CommonNode } from './CommonNode';

export const OutputNode = ({ id, data }) => {
  const [values, setValues] = useState({
    name: data?.outputName || id.replace('customOutput-', 'output_'),
    type: data?.outputType || 'Text',
  });

  return (
    <CommonNode
      title="Output"
      values={values}
      onFieldChange={(k, v) =>
        setValues((prev) => ({ ...prev, [k]: v }))
      }
      variant="output"
      fields={[
        { name: 'name', label: 'Name', type: 'text' },
        {
          name: 'type',
          label: 'Type',
          type: 'select',
          options: [
            { label: 'Text', value: 'Text' },
            { label: 'Image', value: 'Image' },
          ],
        },
      ]}
      handles={[
        {
          type: 'target',
          position: Position.Left,
          id: `${id}-value`,
        },
      ]}
    />
  );
};

