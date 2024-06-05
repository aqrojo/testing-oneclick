import { test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import MultipleChoiceExample from "./MultipleChoiceExample";

// Asserts por defecto en Jest
// https://jestjs.io/docs/expect

// Asserts para testear el dom
// https://github.com/testing-library/jest-dom

test("Todos los elementos están instanciados", () => {
  // Arrange
  render(<MultipleChoiceExample />);
  const stimulus = screen.getByText("¿Cuál es la capital de Francia?");
  const options = screen.getAllByTestId("option");
  const checkButton = screen.getByText("Comprobar");
  const resetButton = screen.getByText("Reiniciar");
  // Act ...
  // Assert
  expect(stimulus).toBeInTheDocument();
  expect(options).toHaveLength(4);
  expect(checkButton).toBeInTheDocument();
  expect(resetButton).toBeInTheDocument();
});

test("Se puede seleccionar una opcion", async () => {});

test("Se puede cambiar la selección", async () => {});

test("Tras evaluar las opciones y botón de comprobar quedan bloqueados", async () => {});

test("Tras evaluar correctamente > feedback success", async () => {});

test("Tras evaluar erroneamente > feedback error", async () => {});
