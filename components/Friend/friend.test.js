/**
 * @jest-environment jsdom
 */

import { render, screen } from "@testing-library/react";
import Friend from "./Friend";

const exampleFriend = {
  id: "6245b003db2493cb8e4e7482",
  name: "Sarmad",
  image: "imageUrl",
  email: "sarmad@testmail.de",
  friendsIds: ["6245b003db2493cb8e4e7482"],
};

describe("friend", () => {
  it("should render", () => {
    render(<Friend userFriend={exampleFriend} />);
    const friend = screen.getByTestId("friend");
    expect(friend).toBeInTheDocument();
  });
});
