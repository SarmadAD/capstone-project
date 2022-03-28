import { timepoints } from "../../db";
import { render, screen, cleanup } from "@testing-library/react";

afterEach(() => {
  cleanup();
});

describe("TimepointList", () => {
  it("test if timepointList has elements", () => {
    expect(timepoints.length).toBeGreaterThan(0);
  });
});
