import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import CategorySelector from "./CategorySelector";
import '@testing-library/jest-dom';

describe("CategorySelector", () => {
  it("renders primary categories and allows selection", () => {
    render(<CategorySelector onNext={jest.fn()} />);

    const primaryCategory = screen.getByLabelText(/Primary Category/i);
    expect(primaryCategory).toBeInTheDocument();

    fireEvent.mouseDown(primaryCategory); // Opens the select dropdown
    const gamingOption = screen.getByText("Gaming");
    fireEvent.click(gamingOption);

    expect(primaryCategory).toHaveValue("Gaming");
  });

  it("displays appropriate subcategories when primary category is selected", () => {
    render(<CategorySelector onNext={jest.fn()} />);

    const primaryCategory = screen.getByLabelText(/Primary Category/i);
    fireEvent.mouseDown(primaryCategory);
    fireEvent.click(screen.getByText("Gaming"));

    const subCategory = screen.getByLabelText(/Subcategory/i);
    fireEvent.mouseDown(subCategory);
    expect(screen.getByText("Action")) // Example subcategory for Gaming
      .toBeInTheDocument();
  });

  it("calls onNext with selected values on Next button click", () => {
    const onNextMock = jest.fn();
    render(<CategorySelector onNext={onNextMock} />);

    const primaryCategory = screen.getByLabelText(/Primary Category/i);
    const subCategory = screen.getByLabelText(/Subcategory/i);
    fireEvent.mouseDown(primaryCategory);
    fireEvent.click(screen.getByText("Gaming"));

    fireEvent.mouseDown(subCategory);
    fireEvent.click(screen.getByText("Action"));

    const nextButton = screen.getByText(/Next/i);
    fireEvent.click(nextButton);

    expect(onNextMock).toHaveBeenCalledWith({
      primaryCategory: "Gaming",
      subCategory: "Action",
    });
  });

  it("disables Next button until valid selections are made", () => {
    render(<CategorySelector onNext={jest.fn()} />);

    const nextButton = screen.getByText(/Next/i);
    expect(nextButton).toBeDisabled();

    const primaryCategory = screen.getByLabelText(/Primary Category/i);
    fireEvent.mouseDown(primaryCategory);
    fireEvent.click(screen.getByText("Gaming"));

    expect(nextButton).toBeDisabled(); // Subcategory still missing

    const subCategory = screen.getByLabelText(/Subcategory/i);
    fireEvent.mouseDown(subCategory);
    fireEvent.click(screen.getByText("Action"));

    expect(nextButton).toBeEnabled();
  });
});
