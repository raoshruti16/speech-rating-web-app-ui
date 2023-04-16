import React from "react";
import { render, fireEvent, screen} from "@testing-library/react";
import AdminHeader from "./AdminHeader";

test("renders AdminHeader component", () => {
  render(<AdminHeader />);
});

test("renders AdminHeader component with expected elements", () => {
    const { getByText, getByRole } = render(<AdminHeader />);
    expect(getByText("Speech App")).toBeInTheDocument();
    expect(getByText("Welcome Shruti !")).toBeInTheDocument();
  });



describe("AdminHeader", () => {
  it("renders without errors", () => {
    render(<AdminHeader />);
  });

  it("displays the 'Speech App' text", () => {
    const { getByText } = render(<AdminHeader />);
    expect(getByText("Speech App")).toBeInTheDocument();
  });

  it("displays the user's name", () => {
    const { getByText } = render(<AdminHeader />);
    expect(getByText("Welcome Shruti !")).toBeInTheDocument();
  });

});

describe("AdminHeader", () => {
    it("renders correctly", () => {
      const { asFragment } = render(<AdminHeader />);
      expect(asFragment()).toMatchSnapshot();
    });
  });
