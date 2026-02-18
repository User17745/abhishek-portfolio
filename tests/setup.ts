import { expect, afterEach, vi } from "vitest";
import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

vi.mock("react-dom", () => ({
  ...vi.importActual("react-dom"),
  useEffect: vi.fn((fn) => fn()),
}));
