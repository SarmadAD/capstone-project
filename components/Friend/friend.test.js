/**
 * @jest-environment jsdom
 */

import { render, screen } from "@testing-library/react";
import Friend from "./Friend";

const exampleFriend = {
  name: "Sarmad",
};

describe("friend", () => {
  it("should render", () => {
    render(<Friend userFriend={exampleFriend} />);
    const friend = screen.getByTestId("friend");
    expect(friend).toBeInTheDocument();
  });
  it.todo("test if friend item can be created");
  it.todo("test if friend can be deleted");
});
