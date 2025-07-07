import { motion } from 'framer-motion';

const TypingIndicator = ({ userName = 'Someone' }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="flex justify-start mb-4"
    >
      <div className="bg-gradient-to-br from-message-received to-message-received/80 p-3 rounded-2xl">
        <div className="flex items-center space-x-1">
          <span className="text-xs text-text-secondary mr-2">
            {userName} is typing
          </span>
          <div className="flex space-x-1">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-2 h-2 bg-text-secondary rounded-full typing-dot"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{
                  duration: 1.4,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TypingIndicator;