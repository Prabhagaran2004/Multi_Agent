import { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Plus, Bot, Users, TrendingUp, Zap, BarChart, Target } from 'lucide-react';

const iconOptions = [
  { icon: '🤖', label: 'Robot' },
  { icon: '⚡', label: 'Lightning' },
  { icon: '🎯', label: 'Target' },
  { icon: '📊', label: 'Chart' },
  { icon: '🔥', label: 'Fire' },
  { icon: '💡', label: 'Bulb' },
  { icon: '🚀', label: 'Rocket' },
  { icon: '⭐', label: 'Star' },
];

const colorOptions = [
  { value: 'blue', label: 'Blue', class: 'from-blue-500 to-blue-700' },
  { value: 'cyan', label: 'Cyan', class: 'from-cyan-500 to-cyan-700' },
  { value: 'indigo', label: 'Indigo', class: 'from-indigo-500 to-indigo-700' },
  { value: 'purple', label: 'Purple', class: 'from-purple-500 to-purple-700' },
  { value: 'green', label: 'Green', class: 'from-green-500 to-green-700' },
];

const AddAgentModal = ({ onClose, onAddAgent }) => {
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    description: '',
    icon: '🤖',
    color: 'blue',
    capabilities: [''],
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const filteredCapabilities = formData.capabilities.filter(cap => cap.trim() !== '');
    
    if (formData.name && formData.role && formData.description && filteredCapabilities.length > 0) {
      onAddAgent({
        ...formData,
        capabilities: filteredCapabilities,
        id: `agent-${Date.now()}`,
        type: formData.name.toLowerCase().replace(/\s+/g, '_'),
      });
      onClose();
    }
  };

  const addCapability = () => {
    setFormData(prev => ({
      ...prev,
      capabilities: [...prev.capabilities, ''],
    }));
  };

  const updateCapability = (index, value) => {
    const newCapabilities = [...formData.capabilities];
    newCapabilities[index] = value;
    setFormData(prev => ({ ...prev, capabilities: newCapabilities }));
  };

  const removeCapability = (index) => {
    if (formData.capabilities.length > 1) {
      const newCapabilities = formData.capabilities.filter((_, i) => i !== index);
      setFormData(prev => ({ ...prev, capabilities: newCapabilities }));
    }
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="glass-effect rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Add New Agent
          </h2>
          <button
            onClick={onClose}
            className="glass-effect p-2 rounded-xl hover:bg-white/20 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-blue-300">Agent Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="w-full glass-effect rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-black/30"
              placeholder="e.g., Data Analyst"
              required
            />
          </div>

          {/* Role */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-blue-300">Role</label>
            <input
              type="text"
              value={formData.role}
              onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
              className="w-full glass-effect rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-black/30"
              placeholder="e.g., Data Analysis Specialist"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-blue-300">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="w-full glass-effect rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-black/30 min-h-[100px]"
              placeholder="Describe what this agent does..."
              required
            />
          </div>

          {/* Icon Selection */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-blue-300">Icon</label>
            <div className="grid grid-cols-8 gap-2">
              {iconOptions.map((opt) => (
                <button
                  key={opt.icon}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, icon: opt.icon }))}
                  className={`glass-effect p-3 rounded-xl text-2xl hover:bg-white/20 transition-colors ${
                    formData.icon === opt.icon ? 'ring-2 ring-blue-500 bg-white/20' : ''
                  }`}
                >
                  {opt.icon}
                </button>
              ))}
            </div>
          </div>

          {/* Color Selection */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-blue-300">Color Theme</label>
            <div className="grid grid-cols-5 gap-3">
              {colorOptions.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, color: opt.value }))}
                  className={`glass-effect p-3 rounded-xl hover:bg-white/20 transition-colors ${
                    formData.color === opt.value ? 'ring-2 ring-blue-500' : ''
                  }`}
                >
                  <div className={`w-full h-8 rounded-lg bg-gradient-to-r ${opt.class}`} />
                  <p className="text-xs mt-2">{opt.label}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Capabilities */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-blue-300">Capabilities</label>
            <div className="space-y-2">
              {formData.capabilities.map((cap, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={cap}
                    onChange={(e) => updateCapability(index, e.target.value)}
                    className="flex-1 glass-effect rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-black/30"
                    placeholder={`Capability ${index + 1}`}
                  />
                  {formData.capabilities.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeCapability(index)}
                      className="glass-effect px-3 rounded-xl hover:bg-red-500/20 transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addCapability}
                className="glass-effect px-4 py-2 rounded-xl hover:bg-white/20 transition-colors flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Capability
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 glass-effect px-6 py-3 rounded-xl hover:bg-white/20 transition-colors font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 px-6 py-3 rounded-xl hover:from-blue-600 hover:to-cyan-600 transition-colors font-semibold shadow-lg"
            >
              Add Agent
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default AddAgentModal;
