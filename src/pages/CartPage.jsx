import React, { useState } from "react";
import { Trash2 } from "lucide-react";

const CartPage = ({ cart, removeFromCart, updateCartItemQuantity }) => {
  const [itemToRemove, setItemToRemove] = useState(null);

  // Calculate total
  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

 
  const handleRemoveConfirmation = (item) => {
    setItemToRemove(item);
  };

  const confirmRemove = () => {
    if (itemToRemove) {
      removeFromCart(itemToRemove.id);
      setItemToRemove(null);
    }
  };


  const cancelRemove = () => {
    setItemToRemove(null);
  };

  return (
    <div className="container mx-auto px-4 py-8 relative">
      {/* Confirmation Modal */}
      {itemToRemove && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full">
            <h2 className="text-xl font-bold mb-4 text-center text-black">
              Are you sure you want to remove item(s) from cart?
            </h2>
            <div className="flex justify-center space-x-4">
              <button
                onClick={confirmRemove}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
              >
                Remove
              </button>
              <button
                onClick={cancelRemove}
                className="bg-gray-200 text-black px-4 py-2 rounded hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <h1 className="text-3xl font-bold mb-6 text-center">Your Cart</h1>

      {cart.length === 0 ? (
        <p className="text-center text-gray-700">Your cart is empty</p>
      ) : (
        <div className="max-w-4xl mx-auto">
          {cart.map((item) => (
            <div
              key={item.id}
              className="bg-white text-black border border-gray-300 rounded-lg mb-4 p-4 
              transform transition-transform hover:scale-[1.02]"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-20 h-20 object-cover rounded-md border"
                  />
                  <div>
                    <h2 className="font-bold text-lg">{item.title}</h2>
                    <p className="text-gray-700">{item.artist}</p>
                    <p className="font-semibold">€{item.price.toFixed(2)}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="flex items-center border border-black rounded-full">
                    <button
                      onClick={() =>
                        updateCartItemQuantity(item.id, item.quantity - 1)
                      }
                      disabled={item.quantity <= 1}
                      className="px-3 py-1 disabled:opacity-50 bg-transparent focus:outline-none hover:border-none hover:outline-none"
                    >
                      -
                    </button>
                    <span className="px-4">{item.quantity}</span>
                    <button
                      onClick={() =>
                        updateCartItemQuantity(item.id, item.quantity + 1)
                      }
                      className="px-3 py-1 bg-transparent focus:outline-none hover:border-none hover:outline-none"
                    >
                      +
                    </button>
                  </div>

                  <div className="font-semibold w-20 text-right">
                    €{(item.price * item.quantity).toFixed(2)}
                  </div>

                  <button
                    onClick={() => handleRemoveConfirmation(item)}
                    className="hover:text-gray-700"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}

          <div className="mt-8 flex justify-between items-center">
            <div className="text-xl font-bold">
              Total: €{calculateTotal().toFixed(2)}
            </div>
            <button className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition-colors">
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
