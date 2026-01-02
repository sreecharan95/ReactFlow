import { useState, useEffect } from 'react';
import {
  Position,
  useUpdateNodeInternals,
} from 'reactflow';
import { CommonNode } from './CommonNode';
import { useStore } from '../store';
import { shallow } from 'zustand/shallow';


const extractVariables = (text) => {
  if (typeof text !== 'string') return [];
  return [
    ...text.matchAll(/{{\s*([\w$]+)\s*}}/g),
  ].map((m) => m[1]);
};

const selector = (state) => ({
  updateNodeField: state.updateNodeField,
});

export const TextNode = ({ id, data }) => {
  const [values, setValues] = useState({
    text: data?.text || '',
  });
  const [variables, setVariables] = useState(
    Array.isArray(data?.variables) ? data.variables : []
  );
  const { updateNodeField } = useStore(selector, shallow);
  const updateNodeInternals = useUpdateNodeInternals();
  const handleFieldChange = (key, value) => {
    setValues((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  useEffect(() => {
    const rawText = values.text ?? '';
    const extractedVars = extractVariables(rawText);
    const isSame =
      extractedVars.length === variables.length &&
      extractedVars.every((v, i) => v === variables[i]);
    if (!isSame) {
      setVariables(extractedVars);
      updateNodeField(id, 'variables', extractedVars);
    }
    updateNodeField(id, 'text', rawText);
    updateNodeInternals(id);
  }, [
    values.text,
    id,
    updateNodeField,
    updateNodeInternals,
    variables,
  ]);

  const nodeHeight = Math.max(
    80,
    60 + variables.length * 28
  );

  return (
    <CommonNode
      title="Text"
      variant="text"
      fields={[
        { name: 'text', label: 'Text', type: 'text' },
      ]}
      values={values}
      onFieldChange={handleFieldChange}
      style={{ height: nodeHeight }}
      handles={[
        ...variables.map((variable, index) => ({
          type: 'target',
          position: Position.Left,
          id: `var-${variable}`, 
          style: {
            top: `${((index + 1) * 100) / (variables.length + 1)}%`,
          },
        })),
        {
          type: 'source',
          position: Position.Right,
          id: 'output',
        },
      ]}
    />
  );
};
