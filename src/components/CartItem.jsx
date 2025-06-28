import { motion as Motion } from "framer-motion";
import { FiMinus, FiPlus, FiX } from "react-icons/fi";

const CartItem = ({ item, removeFromCart, updateQuantity }) => {
  return (
    <Motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
    >
      <div className="flex-1">
        <h4 className="font-medium">{item.name}</h4>
        <p className="text-sm text-gray-500">{item.description}</p>
      </div>

      <div className="flex items-center">
        <button
          onClick={() => updateQuantity(item.id, item.quantity - 1)}
          className="p-1 text-gray-500 hover:text-orange-500"
        >
          <FiMinus size={14} />
        </button>

        <span className="mx-2 w-6 text-center">{item.quantity}</span>

        <button
          onClick={() => updateQuantity(item.id, item.quantity + 1)}
          className="p-1 text-gray-500 hover:text-orange-500"
        >
          <FiPlus size={14} />
        </button>

        <button
          onClick={() => removeFromCart(item.id)}
          className="ml-3 p-1 text-gray-500 hover:text-red-500"
        >
          <FiX size={16} />
        </button>
      </div>
    </Motion.div>
  );
};

export default CartItem;
