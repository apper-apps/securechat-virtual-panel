import { motion } from 'framer-motion';

const Loading = ({ type = 'default' }) => {
  if (type === 'chat-list') {
    return (
      <div className="p-4 space-y-4">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="flex items-center space-x-4 p-3 rounded-2xl bg-surface/50"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-primary/30 to-accent/30 rounded-full animate-pulse" />
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gradient-to-r from-text-secondary/30 to-text-tertiary/30 rounded-full w-3/4 animate-pulse" />
              <div className="h-3 bg-gradient-to-r from-text-tertiary/30 to-text-secondary/30 rounded-full w-1/2 animate-pulse" />
            </div>
            <div className="h-3 bg-gradient-to-r from-text-tertiary/30 to-text-secondary/30 rounded-full w-12 animate-pulse" />
          </motion.div>
        ))}
      </div>
    );
  }

  if (type === 'messages') {
    return (
      <div className="p-4 space-y-4">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className={`flex ${i % 2 === 0 ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-xs p-3 rounded-2xl ${
              i % 2 === 0 
                ? 'bg-gradient-to-br from-primary/30 to-primary/20' 
                : 'bg-gradient-to-br from-surface/50 to-surface/30'
            } animate-pulse`}>
              <div className="h-4 bg-gradient-to-r from-text-secondary/30 to-text-tertiary/30 rounded-full w-full mb-2" />
              <div className="h-3 bg-gradient-to-r from-text-tertiary/30 to-text-secondary/30 rounded-full w-1/3" />
            </div>
          </motion.div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center p-8">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full"
      />
    </div>
  );
};

export default Loading;