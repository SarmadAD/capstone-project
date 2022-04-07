describe("friendslist", () => {
  const exampleUser = {
    id: "6245b003db2493cb8e4e7482",
    name: "Sarmad",
    image: "Image URL",
    email: "Nice email",
    friendIds: ["6245b003db2493cb8e4e7482", "6245b003db2493cb8e4e7482"],
  };
  it("check if friendslist has items", () => {
    expect(exampleUser.friendIds.length).toBeGreaterThan(0);
  });
});
