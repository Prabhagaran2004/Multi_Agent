import { motion } from 'framer-motion';
import { ChevronRight, Zap, Trash2 } from 'lucide-react';

const colorMap = {
  blue: 'from-blue-500 to-blue-700',
  cyan: 'from-cyan-500 to-cyan-700',
  indigo: 'from-indigo-500 to-indigo-700',
  green: 'from-green-500 to-green-700',
  red: 'from-red-500 to-red-700',
  purple: 'from-purple-500 to-purple-700',
  orange: 'from-orange-500 to-orange-700',
};

const AgentCard = ({ agent, delay, onClick, onDelete }) => {
  const gradientClass = colorMap[agent.color] || colorMap.blue;

  const handleDelete = (e) => {
    e.stopPropagation();
    if (onDelete) {
      onDelete();
    }
  };

  return (
    <motion.div
      className="agent-card group relative overflow-hidden"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      whileHover={{ y: -5 }}
      onClick={onClick}
    >
      {/* Delete button - only show for custom agents */}
      {onDelete && agent.id.startsWith('agent-') && (
        <motion.button
          onClick={handleDelete}
          className="absolute top-4 right-4 z-20 glass-effect p-2 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-red-500/30 transition-all border border-red-500/50"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          title="Delete Agent"
        >
          <Trash2 className="w-4 h-4 text-red-400" />
        </motion.button>
      )}

      {/* Gradient overlay */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradientClass} opacity-0 group-hover:opacity-10 transition-opacity`} />
      
      {/* Icon circle */}
      <motion.div
        className={`w-16 h-16 bg-gradient-to-br ${gradientClass} rounded-2xl flex items-center justify-center text-3xl mb-4 shadow-lg`}
        whileHover={{ rotate: [0, -10, 10, -10, 0] }}
        transition={{ duration: 0.5 }}
      >
        {agent.icon}
      </motion.div>

      <div className="relative z-10">
        <h3 className="text-2xl font-bold mb-2 flex items-center gap-2">
          {agent.name}
          <motion.div
            className="opacity-0 group-hover:opacity-100"
            initial={{ x: -10 }}
            whileHover={{ x: 0 }}
          >
            <ChevronRight className="w-5 h-5" />
          </motion.div>
        </h3>
        
        <p className={`text-sm font-semibold bg-gradient-to-r ${gradientClass} bg-clip-text text-transparent mb-3`}>
          {agent.role}
        </p>
        
        <p className="text-white/70 text-sm mb-4 leading-relaxed">
          {agent.description}
        </p>

        {/* Capabilities */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs text-white/60">
            <Zap className="w-3 h-3" />
            <span>Capabilities:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {agent.capabilities.slice(0, 2).map((cap, index) => (
              <span
                key={index}
                className="text-xs px-3 py-1 bg-white/10 rounded-full border border-white/20"
              >
                {cap}
              </span>
            ))}
            {agent.capabilities.length > 2 && (
              <span className="text-xs px-3 py-1 bg-white/10 rounded-full border border-white/20">
                +{agent.capabilities.length - 2} more
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Hover glow effect */}
      <motion.div
        className={`absolute -bottom-20 -right-20 w-40 h-40 bg-gradient-to-br ${gradientClass} rounded-full blur-3xl opacity-0 group-hover:opacity-30 transition-opacity`}
      />
    </motion.div>
  );
};

export default AgentCard;
