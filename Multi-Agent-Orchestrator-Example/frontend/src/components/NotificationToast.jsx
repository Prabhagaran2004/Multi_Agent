import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, Info, AlertTriangle } from 'lucide-react';

const NotificationToast = ({ message, type = 'info', onClose }) => {
  const icons = {
    success: <CheckCircle className="w-5 h-5 text-green-400" />,
    error: <XCircle className="w-5 h-5 text-red-400" />,
    warning: <AlertTriangle className="w-5 h-5 text-yellow-400" />,
    info: <Info className="w-5 h-5 text-blue-400" />,
  };

  const borderColors = {
    success: 'border-green-500/50',
    error: 'border-red-500/50',
    warning: 'border-yellow-500/50',
    info: 'border-blue-500/50',
  };

  return (
    <motion.div
      className={`glass-effect border-2 ${borderColors[type]} p-4 rounded-xl flex items-center gap-3 min-w-[300px]`}
      initial={{ opacity: 0, y: -20, x: '-50%' }}
      animate={{ opacity: 1, y: 0, x: '-50%' }}
      exit={{ opacity: 0, y: -20, x: '-50%' }}
      style={{ position: 'fixed', top: '20px', left: '50%', zIndex: 1000 }}
    >
      {icons[type]}
      <p className="flex-1 text-white/90">{message}</p>
    </motion.div>
  );
};

export default NotificationToast;
