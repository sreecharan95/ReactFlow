import { PipelineToolbar } from './FlowToolbar';
import { PipelineUI } from './PipeLineUI';
import { Button } from './Button';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';
import axios from 'axios';
import { useState } from 'react';
import { PipelineResultModal } from './PipeLineResultModal';

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  getNodeID: state.getNodeID,
  addNode: state.addNode,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});

function App() {
  const {
    nodes,
    edges,
  } = useStore(selector, shallow);
  const clearCanvas = () => {
    useStore.getState().clearAll(); 
  };
const [result, setResult] = useState(null);
const [open, setOpen] = useState(false);

const onSubmitPipeLine = async () => {
  try {
    const normalizedEdges = edges.map((edge) => ({
      id: edge.id,
      source: edge.source,
      target: edge.target,
      sourceHandle: edge.sourceHandle,
      targetHandle: edge.targetHandle,
    }));
    const normalizedNodes = nodes.map((node) => ({
      id: node.id,
      type: node.type,
      data: node.data,
    }));
     const isDAGresult = await axios.post('http://localhost:8000/pipelines/parse', {
      nodes: normalizedNodes,
      edges: normalizedEdges
    });
    setResult(isDAGresult.data);
    setOpen(true);
  } catch (error) {
    alert(
      'Failed to analyze pipeline.\n' +
      (error.response?.data?.detail || error.message)
    );
  }
};

  return (
    <div>
      <PipelineToolbar />
      <PipelineUI />
      <div style={{display: "flex", justifyContent: "center", gap: "20px", marginTop: "20px"}}>
        <Button
        label="Submit"
        variant="primary"
        onClick={() => {
          onSubmitPipeLine()
        }}/>
        <Button
        label="Clear"
        variant="danger"
        onClick={() => {
          clearCanvas()
        }}/>
      </div>
      <PipelineResultModal
        open={open}
        onClose={() => setOpen(false)}
        result={result}/>
    </div>
  );
}

export default App;
