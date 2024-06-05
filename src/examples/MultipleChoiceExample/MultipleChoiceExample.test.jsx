import { test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MultipleChoiceExample from "./MultipleChoiceExample";
import data from "./data.json";

// Asserts por defecto en Jest
// https://jestjs.io/docs/expect

// Asserts para testear el dom
// https://github.com/testing-library/jest-dom

test("Todos los elementos están instanciados", () => {
  // Arrange
  render(<MultipleChoiceExample />);
  const stimulus = screen.getByText(data.stimulus);
  const options = screen.getAllByTestId("option");
  const checkButton = screen.getByText("Comprobar");
  // Act ...
  // Assert
  expect(stimulus).toBeInTheDocument();
  expect(options).toHaveLength(data.options.length);
  expect(checkButton).toBeInTheDocument();
});

test("Se puede seleccionar una opcion", async () => {
  // Arrange
  const user = userEvent.setup();
  render(<MultipleChoiceExample />);
  const option1 = getOptionByIndex(1);
  // Act ...
  await user.click(option1);
  // Assert
  expect(option1).toHaveClass("selected");
});

test("Se puede cambiar la selección", () => {});

test("Tras evaluar las opciones y botón de comprobar quedan bloqueados", () => {});

test("Tras evaluar correctamente > feedback success", () => {});

test("Tras evaluar erroneamente > feedback error", () => {});
