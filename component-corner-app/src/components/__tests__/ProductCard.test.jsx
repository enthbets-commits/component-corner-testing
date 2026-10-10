import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect, vi } from "vitest";
import ProductCard from "../ProductCard";

describe("ProductCard", () => {
  const product = {
    id: 1,
    name: "Gaming Keyboard",
    description: "A mechanical keyboard for gaming.",
    price: 59.99,
    image: "/keyboard.jpg",
  };

  it("renders the product information", () => {
    render(
      <MemoryRouter>
        <ProductCard product={product} onAddToCart={vi.fn()} />
      </MemoryRouter>
    );

    expect(
      screen.getByRole("heading", { name: "Gaming Keyboard" })
    ).toBeInTheDocument();

    expect(
      screen.getByText("A mechanical keyboard for gaming.")
    ).toBeInTheDocument();

    expect(screen.getByText("$59.99")).toBeInTheDocument();

    expect(screen.getByRole("img", { name: "Gaming Keyboard" }))
      .toBeInTheDocument();
  });

  it("calls onAddToCart when the button is clicked", async () => {
    const user = userEvent.setup();
    const onAddToCart = vi.fn();

    render(
      <MemoryRouter>
        <ProductCard product={product} onAddToCart={onAddToCart} />
      </MemoryRouter>
    );

    await user.click(screen.getByRole("button", { name: "Add to Cart" }));

    expect(onAddToCart).toHaveBeenCalledTimes(1);
    expect(onAddToCart).toHaveBeenCalledWith(product);
  });
});