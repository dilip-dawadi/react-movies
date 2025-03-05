import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./Button";

export const Modal = ({ isModalOpen, onModalClose, children, className }) => {
  return (
    <AnimatePresence>
      {isModalOpen && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-dark-100/20 bg-opacity-50 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onModalClose}
        >
          <motion.div
            className={`relative w-full max-w-md bg-white rounded-2xl shadow-lg p-6 text-left ${className}`}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
          >
            <Button
              className="absolute top-2 right-2 text-2xl text-dark-100 bg-transparent border-none cursor-pointer"
              onClick={onModalClose}
              label="&times;"
            />
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
