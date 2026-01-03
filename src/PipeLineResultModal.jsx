const overlayStyle = {
  position: 'fixed',
  inset: 0,
  background: 'rgba(0,0,0,0.45)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 9999,
};

const modalStyle = {
  background: '#ffffff',
  padding: 20,
  borderRadius: 14,
  width: 380,
  boxShadow: '0 25px 50px rgba(0,0,0,0.25)',
};

const headerStyle = (isDAG) => ({
  marginBottom: 14,
  color: isDAG ? '#065f46' : '#991b1b',
});

const infoRow = {
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: 6,
  fontSize: 14,
};

const statusBox = (isDAG) => ({
  marginTop: 14,
  padding: 12,
  borderRadius: 8,
  background: isDAG ? '#ecfdf5' : '#fef2f2',
  color: isDAG ? '#065f46' : '#991b1b',
  fontWeight: 600,
  fontSize: 14,
});

const cycleBox = {
  marginTop: 10,
  padding: 10,
  borderRadius: 8,
  background: '#fff',
  border: '1px solid #fecaca',
  fontSize: 13,
};

const cycleItem = {
  padding: '4px 0',
  fontFamily: 'monospace',
};

const closeBtn = {
  marginTop: 18,
  width: '100%',
  padding: '10px 0',
  borderRadius: 8,
  border: 'none',
  background: '#2563eb',
  color: '#fff',
  fontWeight: 600,
  cursor: 'pointer',
};

export const PipelineResultModal = ({
  open,
  onClose,
  result,
}) => {
  if (!open || !result) return null;
  const {
    num_nodes,
    num_edges,
    is_DAG,
    message,
    cycles = [],
  } = result;
  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <h2 style={headerStyle(is_DAG)}>
          {is_DAG ? 'Pipeline is valid' : 'Pipeline is invalid'}
        </h2>
        <div style={infoRow}>
          <span>Nodes</span>
          <strong>{num_nodes}</strong>
        </div>
        <div style={infoRow}>
          <span>Edges</span>
          <strong>{num_edges}</strong>
        </div>
        <div style={statusBox(is_DAG)}>
          {message}
        </div>
        {!is_DAG && cycles.length > 0 && (
          <div style={cycleBox}>
            <strong>Detected Cycles</strong>
            {cycles.map((cycle, idx) => (
              <div key={idx} style={cycleItem}>
                {idx + 1}. {cycle.join(' → ')}
              </div>
            ))}
          </div>
        )}
        <button style={closeBtn} onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};
