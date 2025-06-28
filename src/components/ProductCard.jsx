import {motion as Motion } from "framer-motion";
import { FiPlus } from "react-icons/fi";

const ProductCard = ({ pizza, addToCart }) => {
  return (
    <Motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="card-item rounded-lg shadow-md overflow-hidden"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}>
      <div className="p-4">
        <h3 className="font-bold text-lg text-white">{pizza.name}</h3>
        <p className="text-gray-300 text-sm mt-1">{pizza.description}</p>
        <div className="flex justify-between items-center mt-3">
          <span className="font-bold text-orange-600">
            R$ {pizza.price.toFixed(2)}
          </span>
          <button
            onClick={() => addToCart(pizza)}
            className="bg-orange-500 text-white p-2 rounded-full hover:bg-orange-600 transition-colors"
          >
            <FiPlus size={16} />
          </button>
        </div>
      </div>
    </Motion.div>
  );
};

export default ProductCard;
