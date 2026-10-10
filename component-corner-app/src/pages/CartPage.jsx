import CartItem from "../components/CartItem";

function CartPage({ cart, removeFromCart }) {
  const cartTotal = cart.reduce((total, item) => {
    return total + item.price;
  }, 0);

  return (
    <main className="cart-section">
      <h2>Shopping Cart</h2>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cart.map((item, index) => (
            <CartItem
              key={`${item.id}-${index}`}
              item={item}
              onRemove={removeFromCart}
            />
          ))}

          <h3>Cart Total: ${cartTotal.toFixed(2)}</h3>
        </>
      )}
    </main>
  );
}

export default CartPage;