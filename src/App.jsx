import { PipelineToolbar } from './FlowToolbar';
import { PipelineUI } from './PipeLineUI';
import { Button } from './Button';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';
import axios from 'axios';
import { useState } from 'react';

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  getNodeID: state.getNodeID,
  addNode: state.addNode,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});

const overlayStyle = {
  position: 'fixed',
  inset: 0,
  background: 'rgba(0,0,0,0.4)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 9999,
};

const modalStyle = {
  background: '#ffffff',
  padding: 20,
  borderRadius: 12,
  width: 360,
  boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
};

const infoRow = {
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: 6,
};

const closeBtn = {
  marginTop: 16,
  width: '100%',
  padding: '8px 0',
  borderRadius: 6,
  border: 'none',
  background: '#2563eb',
  color: '#fff',
  fontWeight: 600,
  cursor: 'pointer',
};


 const PipelineResultModal = ({
  open,
  onClose,
  result,
}) => {
  if (!open) return null;
  const { num_nodes, num_edges, is_DAG, message } = result;

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <h2 style={{ marginBottom: 12 }}>
          {is_DAG ? 'Pipeline Valid' : 'Pipeline Invalid'}
        </h2>
        <div style={infoRow}>
          <span>Nodes</span>
          <strong>{num_nodes}</strong>
        </div>
        <div style={infoRow}>
          <span>Edges</span>
          <strong>{num_edges}</strong>
        </div>
        <div
          style={{
            marginTop: 12,
            padding: 10,
            borderRadius: 6,
            background: is_DAG ? '#ecfdf5' : '#fef2f2',
            color: is_DAG ? '#065f46' : '#991b1b',
            fontWeight: 600,
          }}
        >
          {message}
        </div>
        <button style={closeBtn} onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};


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
        }}
        />
        <Button
        label="Clear"
        variant="danger"
        onClick={() => {
       clearCanvas()
      }}
    />
    <PipelineResultModal
    open={open}
    onClose={() => setOpen(false)}
    result={result}/>
    </div>
    </div>
  );
}

export default App;
