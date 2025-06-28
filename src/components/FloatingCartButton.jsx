import { motion as Motion } from 'framer-motion';
import { FiShoppingBag } from 'react-icons/fi';

const FloatingCartButton = ({ itemCount, onClick }) => {
  return (
    <Motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="fixed bottom-6 right-6 bg-orange-500 text-white p-4 rounded-full shadow-lg z-40 flex items-center justify-center"
    >
      <FiShoppingBag size={24} />
      {itemCount > 0 && (
        <Motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center"
        >
          {itemCount}
        </Motion.span>
      )}
    </Motion.button>
  );
};

export default FloatingCartButton;