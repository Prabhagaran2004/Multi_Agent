import { motion } from 'framer-motion';
import { Heart, Github, Code } from 'lucide-react';

const Footer = () => {
  return (
    <motion.footer
      className="glass-effect border-t border-white/10 mt-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1 }}
    >
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-white/70">
            <Code className="w-4 h-4" />
            <span className="text-sm">
              Built with
              <motion.span
                className="inline-block mx-1"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <Heart className="w-4 h-4 inline text-red-400" fill="currentColor" />
              </motion.span>
              using React & FastAPI
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-sm text-white/60">
              Cricket Team AI Multi-Agent System
            </span>
          </div>

          <div className="text-xs text-white/50">
            Powered by GROQ AI
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
