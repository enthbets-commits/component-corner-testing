import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import CartItem from "../CartItem";

describe("CartItem", () => {
  const item = {
    id: 1,
    name: "Mechanical Keyboard",
    price: 89.99,
  };

  it("renders the item name and price", () => {
    render(<CartItem item={item} onRemove={vi.fn()} />);

    expect(
      screen.getByRole("heading", { name: "Mechanical Keyboard" })
    ).toBeInTheDocument();

    expect(screen.getByText("$89.99")).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: "Remove" })
    ).toBeInTheDocument();
  });

  it("calls onRemove with the item ID when Remove is clicked", async () => {
    const user = userEvent.setup();
    const onRemove = vi.fn();

    render(<CartItem item={item} onRemove={onRemove} />);

    await user.click(screen.getByRole("button", { name: "Remove" }));

    expect(onRemove).toHaveBeenCalledTimes(1);
    expect(onRemove).toHaveBeenCalledWith(1);
  });
});