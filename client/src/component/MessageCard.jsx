function MessageCard({ message }) {
    return (
      <div style={styles.card}>
        <p style={styles.text}>{message}</p>
      </div>
    );
  }
  
  export default MessageCard;
  
  const styles = {
    card: {
      padding: '10px',
      margin: '5px 0',
      borderRadius: '8px',
      backgroundColor: '#f1f1f1',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    },
    text: {
      margin: 0,
      fontSize: '16px',
      color: '#333',
    },
  };
  