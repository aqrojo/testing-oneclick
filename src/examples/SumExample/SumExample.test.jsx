import { test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SumExample from "./SumExample";

test("Todos los elementos están instanciados", () => {
  // Arrange
  render(<SumExample />);
  const number1 = screen.getByTestId("number1");
  const number2 = screen.getByTestId("number2");
  const button = screen.getByText("Sumar");
  const result = screen.getByTestId("result");
  // Act ...
  // Assert
  expect(number1).toBeInTheDocument();
  expect(number2).toBeInTheDocument();
  expect(button).toBeInTheDocument();
  expect(result).toBeInTheDocument();
});

test("se puede obtener el resultado de una suma", async () => {
  // Arrange
  render(<SumExample />);
  const number1 = screen.getByTestId("number1");
  const number2 = screen.getByTestId("number2");
  const button = screen.getByText("Sumar");
  const result = screen.getByTestId("result");
  const user = userEvent.setup();

  // Act
  await user.type(number1, "5");
  await user.type(number2, "2");
  await user.click(button);

  // Assert
  expect(result).toHaveTextContent("7");
});
