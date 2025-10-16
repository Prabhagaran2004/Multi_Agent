import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, CheckCircle, Clock, AlertCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { executeWorkflow } from '../services/api';

const WorkflowPanel = ({ onClose }) => {
  const [matchInfo, setMatchInfo] = useState('');
  const [playerName, setPlayerName] = useState('');
  const [loading, setLoading] = useState(false);
  const [workflowResult, setWorkflowResult] = useState(null);
  const [expandedTask, setExpandedTask] = useState(null);

  const handleExecute = async (e) => {
    e.preventDefault();
    if (!matchInfo.trim() || !playerName.trim()) return;

    setLoading(true);
    setWorkflowResult(null);

    try {
      const response = await executeWorkflow(matchInfo, playerName);
      setWorkflowResult(response);
    } catch (error) {
      console.error('Workflow execution failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const getAgentIcon = (agentType) => {
    const icons = {
      head_coach: '🎯',
      batting_coach: '🏏',
      bowling_coach: '⚡',
      head_physio: '💪',
      player: '👤',
    };
    return icons[agentType] || '🤖';
  };

  const getAgentColor = (agentType) => {
    const colors = {
      head_coach: 'from-blue-500 to-blue-700',
      batting_coach: 'from-green-500 to-green-700',
      bowling_coach: 'from-red-500 to-red-700',
      head_physio: 'from-purple-500 to-purple-700',
      player: 'from-orange-500 to-orange-700',
    };
    return colors[agentType] || 'from-gray-500 to-gray-700';
  };

  return (
    <motion.div
      className="glass-effect rounded-2xl p-6 mb-8"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold gradient-text mb-2">Workflow Execution</h2>
          <p className="text-white/70">Execute a complete multi-agent workflow</p>
        </div>
        <motion.button
          onClick={onClose}
          className="w-10 h-10 glass-effect hover:bg-white/20 rounded-xl flex items-center justify-center transition-colors"
          whileHover={{ rotate: 90 }}
          whileTap={{ scale: 0.9 }}
        >
          <X className="w-6 h-6" />
        </motion.button>
      </div>

      {/* Input Form */}
      <form onSubmit={handleExecute} className="space-y-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2 text-white/80">
              Match Information
            </label>
            <input
              type="text"
              value={matchInfo}
              onChange={(e) => setMatchInfo(e.target.value)}
              placeholder="e.g., Upcoming match against Mumbai Indians"
              className="w-full glass-effect px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-white/50"
              disabled={loading}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2 text-white/80">
              Player Name
            </label>
            <input
              type="text"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              placeholder="e.g., Virat Kohli"
              className="w-full glass-effect px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-white/50"
              disabled={loading}
            />
          </div>
        </div>

        <motion.button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-4 rounded-xl flex items-center justify-center gap-3 font-semibold disabled:opacity-50 text-lg"
          whileHover={{ scale: loading ? 1 : 1.02 }}
          whileTap={{ scale: loading ? 1 : 0.98 }}
          disabled={loading || !matchInfo.trim() || !playerName.trim()}
        >
          {loading ? (
            <>
              <motion.div
                className="w-6 h-6 border-3 border-white border-t-transparent rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              />
              <span>Executing Workflow...</span>
            </>
          ) : (
            <>
              <Play className="w-6 h-6" />
              <span>Execute Complete Workflow</span>
            </>
          )}
        </motion.button>
      </form>

      {/* Workflow Progress/Results */}
      <AnimatePresence>
        {workflowResult && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-4"
          >
            <div className="glass-effect p-4 rounded-xl border-2 border-green-500/50">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-6 h-6 text-green-400" />
                <div>
                  <h3 className="font-semibold text-lg">Workflow Completed</h3>
                  <p className="text-sm text-white/70">
                    All {workflowResult.tasks?.length || 0} agents executed successfully
                  </p>
                </div>
              </div>
            </div>

            {/* Task Results */}
            <div className="space-y-3">
              <h3 className="text-xl font-semibold mb-4">Agent Executions</h3>
              {workflowResult.tasks?.map((task, index) => (
                <motion.div
                  key={task.id}
                  className="glass-effect rounded-xl overflow-hidden"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div
                    className={`p-4 bg-gradient-to-r ${getAgentColor(task.agent)} cursor-pointer`}
                    onClick={() => setExpandedTask(expandedTask === task.id ? null : task.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="text-2xl">{getAgentIcon(task.agent)}</div>
                        <div>
                          <h4 className="font-semibold capitalize">
                            {task.agent.replace('_', ' ')}
                          </h4>
                          <p className="text-sm text-white/80">{task.method}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {task.status === 'completed' ? (
                          <CheckCircle className="w-5 h-5 text-green-300" />
                        ) : task.status === 'in_progress' ? (
                          <Clock className="w-5 h-5 text-yellow-300 animate-pulse" />
                        ) : task.status === 'failed' ? (
                          <AlertCircle className="w-5 h-5 text-red-300" />
                        ) : null}
                        {expandedTask === task.id ? (
                          <ChevronUp className="w-5 h-5" />
                        ) : (
                          <ChevronDown className="w-5 h-5" />
                        )}
                      </div>
                    </div>
                  </div>

                  <AnimatePresence>
                    {expandedTask === task.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="bg-black/20 p-4"
                      >
                        <h5 className="font-semibold mb-2 text-sm text-white/80">
                          Agent Response:
                        </h5>
                        <div className="bg-black/30 p-4 rounded-lg max-h-96 overflow-y-auto">
                          <p className="text-white/90 whitespace-pre-wrap text-sm leading-relaxed">
                            {task.full_result || task.result || 'No response available'}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default WorkflowPanel;
