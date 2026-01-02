 
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
 
 export const PipelineResultModal = ({
  open,
  onClose,
  result,
}) => {
  if (!open) return null;
  const { num_nodes, num_edges, is_DAG, message } = result ?? {};

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