import { motion } from 'framer-motion';
import { Target, Workflow, Sparkles } from 'lucide-react';

const Header = ({ onWorkflowClick }) => {
  return (
    <motion.header
      className="glass-effect border-b border-white/10"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100 }}
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <motion.div
            className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center"
            whileHover={{ rotate: 180 }}
            transition={{ duration: 0.3 }}
          >
            <Target className="w-6 h-6 text-white" />
          </motion.div>
          <div>
            <h1 className="text-xl font-bold">Cricket Team AI</h1>
            <p className="text-xs text-white/60">Multi-Agent System</p>
          </div>
        </div>

        <div className="flex gap-4">
          <motion.button
            onClick={onWorkflowClick}
            className="glass-effect px-6 py-2 rounded-xl flex items-center gap-2 hover:bg-white/20 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Workflow className="w-5 h-5" />
            <span>Execute Workflow</span>
          </motion.button>

          <motion.div
            className="glass-effect px-4 py-2 rounded-xl flex items-center gap-2"
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Sparkles className="w-5 h-5 text-yellow-400" />
            <span className="text-sm">AI Active</span>
          </motion.div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
