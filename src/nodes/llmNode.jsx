import { Position } from 'reactflow';
import { CommonNode } from './CommonNode';

export const LLMNode = ({ id }) => {
  return (
    <CommonNode
      title="LLM"
      variant="llm"
      handles={[
        { type: 'target', position: Position.Left, id: `${id}-system`, style: { top: '33%' } },
        { type: 'target', position: Position.Left, id: `${id}-prompt`, style: { top: '66%' } },
        { type: 'source', position: Position.Right, id: `${id}-response` },
      ]}
    >
      <div style={{ fontStyle: 'italic', color: '#555' }}>
        This is a LLM.
      </div>
    </CommonNode>
  );
};

