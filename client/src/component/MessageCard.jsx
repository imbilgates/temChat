function MessageCard({ message, isSentByCurrentUser, otherUser }) {
    return (
        <div
            className={`flex ${
                isSentByCurrentUser ? 'justify-start' : 'justify-end'
            }`}
        >
            <div
                className={`max-w-[70%] p-3 my-2 rounded-xl text-white shadow-lg ${
                    isSentByCurrentUser
                        ? 'bg-green-500 rounded-bl-none'
                        : 'bg-blue-500 rounded-tr-none'
                }`}
            >
                <div className="mb-1">
                    <b className="text-sm font-bold capitalize">
                        {isSentByCurrentUser ? "you" : otherUser}
                    </b>
                </div>
                <p className="text-base break-words leading-6">{message}</p>
            </div>
        </div>
    );
}

export default MessageCard;
