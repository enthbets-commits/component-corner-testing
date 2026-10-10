import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import App from "../App";

vi.mock("../components/Header", () => ({
  default: ({ storeName, cartCount }) => (
    <header>
      <span>{storeName}</span>
      <span>Cart count: {cartCount}</span>
    </header>
  ),
}));

vi.mock("../components/Footer", () => ({
  default: () => <footer>Test Footer</footer>,
}));

vi.mock("../pages/HomePage", () => ({
  default: () => <h1>Home Page</h1>,
}));

vi.mock("../pages/ProductsPage", () => ({
  default: ({ products, addToCart }) => (
    <section>
      <h1>Products</h1>
      {products.map((product) => (
        <button key={product.id} onClick={() => addToCart(product)}>
          Add {product.name}
        </button>
      ))}
    </section>
  ),
}));

vi.mock("../pages/ProductDetailsPage", () => ({
  default: () => <h1>Product Details</h1>,
}));

vi.mock("../pages/CartPage", () => ({
  default: ({ cart, removeFromCart }) => (
    <section>
      <h1>Shopping Cart</h1>
      {cart.map((item) => (
        <div key={item.id}>
          <span>{item.name}</span>
          <button onClick={() => removeFromCart(item.id)}>
            Remove {item.name}
          </button>
        </div>
      ))}
    </section>
  ),
}));

describe("App cart state and localStorage", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
    window.history.replaceState({}, "", "/");
  });

  it("loads a saved cart from localStorage", async () => {
    const savedCart = [
      { id: 1, name: "Mechanical Keyboard", price: 89.99 },
    ];

    localStorage.setItem("componentCornerCart", JSON.stringify(savedCart));
    window.history.replaceState({}, "", "/cart");

    render(<App />);

    expect(
      screen.getByText("Mechanical Keyboard")
    ).toBeInTheDocument();

    expect(screen.getByText("Cart count: 1")).toBeInTheDocument();
  });

  it("saves the cart to localStorage when a product is added", async () => {
    const user = userEvent.setup();

    window.history.replaceState({}, "", "/products");
    render(<App />);

    await user.click(
      screen.getByRole("button", { name: "Add Mechanical Keyboard" })
    );

    await waitFor(() => {
      const savedCart = JSON.parse(
        localStorage.getItem("componentCornerCart")
      );

      expect(savedCart).toHaveLength(1);
      expect(savedCart[0].name).toBe("Mechanical Keyboard");
    });

    expect(screen.getByText("Cart count: 1")).toBeInTheDocument();
  });

  it("removes a product and saves the updated cart", async () => {
    const user = userEvent.setup();

    localStorage.setItem(
      "componentCornerCart",
      JSON.stringify([
        { id: 1, name: "Mechanical Keyboard", price: 89.99 },
      ])
    );

    window.history.replaceState({}, "", "/cart");
    render(<App />);

    await user.click(
      screen.getByRole("button", { name: "Remove Mechanical Keyboard" })
    );

    await waitFor(() => {
      expect(
        JSON.parse(localStorage.getItem("componentCornerCart"))
      ).toEqual([]);
    });

    expect(screen.getByText("Cart count: 0")).toBeInTheDocument();
  });
});
