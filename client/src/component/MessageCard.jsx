function MessageCard({ message, isSentByCurrentUser, otherUser }) {
    return (
        <div
            style={
                isSentByCurrentUser
                    ? { ...styles.card, ...styles.currentUser }
                    : { ...styles.card, ...styles.otherUser }
            }
        >
            <div style={styles.header}>
                <b style={styles.username}>{isSentByCurrentUser ? "you" : otherUser}</b>
            </div>
            <p style={styles.text}>{message}</p>
        </div>
    );
}

export default MessageCard;

const styles = {
    card: {
        maxWidth: '70%',
        padding: '12px 16px',
        margin: '8px 10px',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        borderRadius: '12px',
        color: '#fff',
    },
    currentUser: {
        alignSelf: 'flex-end',
        backgroundColor: '#4caf50',
        borderRadius: '12px 12px 0 12px',
    },
    otherUser: {
        alignSelf: 'flex-start',
        backgroundColor: '#2196f3',
        borderRadius: '12px 12px 12px 0',
    },
    header: {
        marginBottom: '4px',
    },
    username: {
        fontSize: '14px',
        fontWeight: 'bold',
        textTransform: 'capitalize',
    },
    text: {
        margin: 0,
        fontSize: '15px',
        wordWrap: 'break-word',
        lineHeight: '1.5',
    },
};
