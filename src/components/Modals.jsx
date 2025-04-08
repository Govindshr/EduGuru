import { motion, AnimatePresence } from 'framer-motion';

function WhoweareModal({ isOpen, onClose, title, content }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 1050,
          }}
        >
          <motion.div
            className="modal-dialog modal-dialog-centered"
            initial={{ scale: 0.8, y: 100, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.8, y: 100, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            style={{
              margin: 'auto',
              maxWidth: '720px',
              backgroundColor: '#fff',
              borderRadius: 0,
              padding: '1.5rem',
            }}
          >
            <div className="modal-content border-0 rounded-0">
              <div className="modal-header border-0">
                <h1 className="modal-title fs-6 fw-semibold">{title}</h1>
                <button type="button" className="btn-close" onClick={onClose}></button>
              </div>
              <div className="modal-body">{content}</div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
export default WhoweareModal;