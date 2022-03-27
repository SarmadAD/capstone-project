const { timepoints } = require("../../db");

describe("TimepointList", () => {
  it("test if timepointList has elements", () => {
      expect(timepoints.length).toBeGreaterThan(0)
  });
});
