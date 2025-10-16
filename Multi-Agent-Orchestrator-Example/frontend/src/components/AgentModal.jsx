import { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Send, Loader, CheckCircle, AlertCircle } from 'lucide-react';
import { executeAgent } from '../services/api';

const colorMap = {
  blue: 'from-blue-500 to-blue-700',
  green: 'from-green-500 to-green-700',
  red: 'from-red-500 to-red-700',
  purple: 'from-purple-500 to-purple-700',
  orange: 'from-orange-500 to-orange-700',
};

const AgentModal = ({ agent, onClose }) => {
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const gradientClass = colorMap[agent.color] || colorMap.blue;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await executeAgent(agent.id, inputValue);
      setResult(response.result);
    } catch (err) {
      setError(err.response?.data?.detail || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const getPlaceholder = () => {
    switch (agent.id) {
      case 'head_coach':
        return 'Enter match information (e.g., "Match against Mumbai Indians")';
      case 'batting_coach':
      case 'bowling_coach':
      case 'head_physio':
      case 'player':
        return 'Enter player name (e.g., "Virat Kohli")';
      default:
        return 'Enter your input...';
    }
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="glass-effect rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl"
        initial={{ scale: 0.9, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 50 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className={`bg-gradient-to-r ${gradientClass} p-6 relative overflow-hidden`}>
          <motion.div
            className="absolute inset-0 opacity-20"
            animate={{
              backgroundPosition: ['0% 0%', '100% 100%'],
            }}
            transition={{ duration: 10, repeat: Infinity, repeatType: 'reverse' }}
            style={{
              backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
              backgroundSize: '20px 20px',
            }}
          />
          
          <div className="relative flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-4xl backdrop-blur-sm">
                {agent.icon}
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white">{agent.name}</h2>
                <p className="text-white/90 text-lg">{agent.role}</p>
              </div>
            </div>
            <motion.button
              onClick={onClose}
              className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-xl flex items-center justify-center transition-colors"
              whileHover={{ rotate: 90 }}
              whileTap={{ scale: 0.9 }}
            >
              <X className="w-6 h-6 text-white" />
            </motion.button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <span className={`w-1 h-6 bg-gradient-to-b ${gradientClass} rounded-full`} />
              Capabilities
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {agent.capabilities.map((capability, index) => (
                <motion.div
                  key={index}
                  className="glass-effect p-4 rounded-xl flex items-center gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span className="text-white/90">{capability}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Interaction Form */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <span className={`w-1 h-6 bg-gradient-to-b ${gradientClass} rounded-full`} />
              Interact with Agent
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={getPlaceholder()}
                  className="w-full glass-effect px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-white/50"
                  disabled={loading}
                />
              </div>
              <motion.button
                type="submit"
                className={`w-full bg-gradient-to-r ${gradientClass} px-6 py-3 rounded-xl flex items-center justify-center gap-2 font-semibold disabled:opacity-50`}
                whileHover={{ scale: loading ? 1 : 1.02 }}
                whileTap={{ scale: loading ? 1 : 0.98 }}
                disabled={loading || !inputValue.trim()}
              >
                {loading ? (
                  <>
                    <Loader className="w-5 h-5 animate-spin" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Execute Agent</span>
                  </>
                )}
              </motion.button>
            </form>
          </div>

          {/* Error Display */}
          {error && (
            <motion.div
              className="glass-effect border-2 border-red-500/50 p-4 rounded-xl flex items-start gap-3 mb-4"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-red-400 mb-1">Error</h4>
                <p className="text-white/80 text-sm">{error}</p>
              </div>
            </motion.div>
          )}

          {/* Result Display */}
          {result && (
            <motion.div
              className="glass-effect p-6 rounded-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                Agent Response
              </h4>
              <div className="bg-black/30 p-4 rounded-lg">
                <p className="text-white/90 whitespace-pre-wrap leading-relaxed">
                  {result}
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AgentModal;
