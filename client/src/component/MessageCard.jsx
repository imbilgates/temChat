function MessageCard({ message, isSentByCurrentUser, otherUser }) {
    return (
        <div
            className={`flex ${
                isSentByCurrentUser ? 'justify-start' : 'justify-end'
            }`}
        >
            <div
                className={`p-3 my-2 rounded-xl text-white shadow-lg transition-all max-w-[85%] sm:max-w-[70%] md:max-w-[60%] lg:max-w-[50%] ${
                    isSentByCurrentUser
                        ? 'bg-green-500 rounded-bl-none'
                        : 'bg-blue-500 rounded-tr-none'
                }`}
            >
                <div className="mb-1">
                    <b className="text-sm font-bold capitalize sm:text-base md:text-lg">
                        {isSentByCurrentUser ? 'you' : otherUser}
                    </b>
                </div>
                <p className="text-base break-words leading-6 sm:leading-7 sm:text-lg">
                    {message}
                </p>
            </div>
        </div>
    );
}

export default MessageCard;
