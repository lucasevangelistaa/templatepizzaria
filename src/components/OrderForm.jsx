import { useState } from "react";
import { motion as Motion } from "framer-motion";

const OrderForm = ({ total, cartItems }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [orderType, setOrderType] = useState("delivery");
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("pix");
  const [cashAmount, setCashAmount] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validação dos campos
    if (!name || !phone || (orderType === "delivery" && !address)) {
      alert("Por favor, preencha todos os campos obrigatórios");
      return;
    }

    // Formatar mensagem para WhatsApp
    let message = `*NOVO PEDIDO*%0A%0A`;
    message += `*Nome:* ${name}%0A`;
    message += `*Telefone:* ${phone}%0A`;
    message += `*Tipo:* ${
      orderType === "delivery" ? "Entrega" : "Retirada"
    }%0A`;

    if (orderType === "delivery") {
      message += `*Endereço:* ${address}%0A`;
    }

    message += `*Forma de pagamento:* ${getPaymentMethodName(
      paymentMethod
    )}%0A`;

    if (paymentMethod === "cash") {
      const change =
        cashAmount - total > 0 ? (cashAmount - total).toFixed(2) : 0;
      message += `*Valor pago:* R$ ${parseFloat(cashAmount).toFixed(2)}%0A`;
      message += `*Troco:* R$ ${change}%0A`;
    }

    message += `%0A*Itens do pedido:*%0A`;
    cartItems.forEach((item) => {
      message += `- ${item.name} (${item.quantity}x) - R$ ${(
        item.price * item.quantity
      ).toFixed(2)}%0A`;
    });

    message += `%0A*Total:* R$ ${total.toFixed(2)}%0A`;

    if (notes) {
      message += `%0A*Observações:*%0A${notes}`;
    }

    // Abrir WhatsApp com a mensagem formatada
    window.open(`https://wa.me/5598984986243?text=${message}`, "_blank");
  };

  const getPaymentMethodName = (method) => {
    switch (method) {
      case "pix":
        return "Pix";
      case "card":
        return "Cartão";
      case "cash":
        return "Dinheiro";
      default:
        return "";
    }
  };

  return (
    <Motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className="space-y-4"
    >
      <h3 className="font-bold text-lg">Informações do Pedido</h3>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Nome *
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Telefone *
        </label>
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Tipo de Pedido
        </label>
        <div className="flex space-x-4">
          <label className="flex items-center">
            <input
              type="radio"
              name="orderType"
              value="delivery"
              checked={orderType === "delivery"}
              onChange={() => setOrderType("delivery")}
              className="mr-2"
            />
            Entrega
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="orderType"
              value="pickup"
              checked={orderType === "pickup"}
              onChange={() => setOrderType("pickup")}
              className="mr-2"
            />
            Retirada
          </label>
        </div>
      </div>

      {orderType === "delivery" && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Endereço *
          </label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
      )}

      {orderType === "pickup" && (
        <div className="bg-yellow-50 p-3 rounded-md text-sm">
          <p className="font-medium">Endereço para retirada:</p>
          <p>Rua das Pizzas, 123 - Centro</p>
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Forma de Pagamento
        </label>
        <select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
        >
          <option value="pix">Pix</option>
          <option value="card">Cartão</option>
          <option value="cash">Dinheiro</option>
        </select>
      </div>

      {paymentMethod === "cash" && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Vai pagar com quanto?
          </label>
          <input
            type="number"
            min={total}
            step="0.01"
            value={cashAmount}
            onChange={(e) => setCashAmount(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          {cashAmount && cashAmount < total && (
            <p className="text-red-500 text-sm mt-1">Valor insuficiente</p>
          )}
          {cashAmount && cashAmount >= total && (
            <p className="text-green-600 text-sm mt-1">
              Troco: R$ {(cashAmount - total).toFixed(2)}
            </p>
          )}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Observações
        </label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
          rows={3}
          placeholder="Ex: Tirar cebola, borda recheada..."
        />
      </div>

      <button
        type="submit"
        className="w-full bg-orange-500 text-white py-3 rounded-md font-bold hover:bg-orange-600 transition-colors"
      >
        Finalizar Pedido (R$ {total.toFixed(2)})
      </button>
    </Motion.form>
  );
};

export default OrderForm;
