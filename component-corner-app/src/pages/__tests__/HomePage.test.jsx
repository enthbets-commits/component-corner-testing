import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect, vi } from "vitest";
import HomePage from "../HomePage";

vi.mock("../../components/Hero", () => ({
  default: ({ title, subtitle, ctaText }) => (
    <section>
      <h1>{title}</h1>
      <p>{subtitle}</p>
      <button>{ctaText}</button>
    </section>
  ),
}));

describe("HomePage", () => {
  it("renders the main homepage content", () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    expect(
      screen.getByRole("heading", { name: "Upgrade Your Setup" })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", { name: "Why Shop With Us?" })
    ).toBeInTheDocument();

    expect(
      screen.getByText(/ComponentCorner makes it easy to find quality/i)
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: "Shop Now" })
    ).toBeInTheDocument();
  });
});