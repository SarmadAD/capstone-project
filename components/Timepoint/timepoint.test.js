import { timepoints } from "../../db";
import { render, screen, cleanup } from "@testing-library/react";

describe("Timepoint", () => {
  it("Check if first timepoint is not null and undefinded", () => {
    expect(timepoints[0]).not.toBeNull();
    expect(timepoints[0]).not.toBeUndefined();
  });
  it.todo("test if timepoint is rendered")
});
