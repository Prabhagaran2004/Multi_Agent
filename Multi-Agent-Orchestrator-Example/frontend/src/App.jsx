import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AgentCard from './components/AgentCard';
import AgentModal from './components/AgentModal';
import WorkflowPanel from './components/WorkflowPanel';
import Header from './components/Header';
import Footer from './components/Footer';
import LoadingSpinner from './components/LoadingSpinner';
import { fetchAgents, deleteCustomAgent } from './services/api';

function App() {
  const [agents, setAgents] = useState([]);
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [showWorkflow, setShowWorkflow] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAgents();
  }, []);

  const loadAgents = async () => {
    try {
      const data = await fetchAgents();
      setAgents(data.agents);
      setLoading(false);
    } catch (error) {
      console.error('Error loading agents:', error);
      setLoading(false);
    }
  };

  const handleDeleteAgent = async (agentId) => {
    try {
      // Only delete from backend if it's a custom agent (starts with 'agent-')
      if (agentId.startsWith('agent-')) {
        await deleteCustomAgent(agentId);
      }
      // Remove from local state
      setAgents(prev => prev.filter(agent => agent.id !== agentId));
    } catch (error) {
      console.error('Error deleting agent:', error);
      alert('Failed to delete agent. Please try again.');
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full"
            animate={{
              x: [Math.random() * window.innerWidth, Math.random() * window.innerWidth],
              y: [Math.random() * window.innerHeight, Math.random() * window.innerHeight],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        ))}
      </div>

      <div className="relative z-10">
        <Header 
          onWorkflowClick={() => setShowWorkflow(!showWorkflow)}
        />

        <main className="container mx-auto px-4 py-8">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1
              className="text-6xl font-bold mb-4 gradient-text"
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Cricket Team AI
            </h1>
            <p className="text-xl text-white/80">
              Multi-Agent Orchestration System
            </p>
            <div className="mt-4 flex justify-center gap-4">
              <div className="glass-effect px-6 py-2 rounded-full">
                <span className="text-green-400">●</span> {agents.length} Agents Active
              </div>
              <div className="glass-effect px-6 py-2 rounded-full">
                <span className="text-blue-400">●</span> AI-Powered
              </div>
            </div>
          </motion.div>

          {/* Agents Grid */}
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <LoadingSpinner size="lg" text="Initializing AI Agents..." />
            </div>
          ) : (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {agents.map((agent, index) => (
                <AgentCard
                  key={agent.id}
                  agent={agent}
                  delay={index * 0.1}
                  onClick={() => setSelectedAgent(agent)}
                  onDelete={() => handleDeleteAgent(agent.id)}
                />
              ))}
            </motion.div>
          )}

          {/* Workflow Section */}
          <AnimatePresence>
            {showWorkflow && (
              <WorkflowPanel onClose={() => setShowWorkflow(false)} />
            )}
          </AnimatePresence>
        </main>

        <Footer />
      </div>

      {/* Agent Modal */}
      <AnimatePresence>
        {selectedAgent && (
          <AgentModal
            agent={selectedAgent}
            onClose={() => setSelectedAgent(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
