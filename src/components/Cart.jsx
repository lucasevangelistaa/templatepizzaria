import { motion as Motion } from "framer-motion";
import { FiX, FiTrash2 } from "react-icons/fi";
import CartItem from "./CartItem";
import OrderForm from "./OrderForm";

const Cart = ({
  cartItems,
  onClose,
  removeFromCart,
  updateQuantity,
  clearCart,
}) => {
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <Motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 text-black z-50 flex justify-end"
    >
      <Motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 30 }}
        className="bg-white w-full max-w-md h-full overflow-y-auto"
      >
        <div className="p-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-orange-600">Seu Pedido</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <FiX size={24} />
            </button>
          </div>

          {cartItems.length === 0 ? (
            <p className="text-center text-gray-500 py-8">
              Seu carrinho está vazio
            </p>
          ) : (
            <>
              <div className="space-y-4 mb-6">
                {cartItems.map((item) => (
                  <CartItem
                    key={item.id}
                    item={item}
                    removeFromCart={removeFromCart}
                    updateQuantity={updateQuantity}
                  />
                ))}
              </div>

              <div className="flex justify-between items-center mb-4">
                <button
                  onClick={clearCart}
                  className="flex items-center text-red-500 hover:text-red-700"
                >
                  <FiTrash2 className="mr-1" /> Limpar tudo
                </button>
                <div className="text-lg font-bold">
                  Total: R$ {total.toFixed(2)}
                </div>
              </div>

              <OrderForm total={total} cartItems={cartItems} />
            </>
          )}
        </div>
      </Motion.div>
    </Motion.div>
  );
};

export default Cart;
