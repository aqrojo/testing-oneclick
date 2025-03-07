import { test, expect } from "vitest";
import { render, screen, within } from "@testing-library/react";
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

test("Se puede cambiar la selección", async () => {
  // Arrange
  const user = userEvent.setup();
  render(<MultipleChoiceExample />);
  const option1 = getOptionByIndex(1);
  const option2 = getOptionByIndex(2);
  // Act & Assert ...
  await user.click(option1);
  expect(option1).toHaveClass("selected");
  expect(option2).not.toHaveClass("selected");

  await user.click(option2);
  expect(option1).not.toHaveClass("selected");
  expect(option2).toHaveClass("selected");
});

test("Tras evaluar las opciones y botón de comprobar quedan bloqueados", async () => {
  // Arrange
  const user = userEvent.setup();
  render(<MultipleChoiceExample />);
  const options = screen.getAllByTestId("option");
  const checkButton = screen.getByText("Comprobar");
  // Act
  await user.click(checkButton);

  // Assert
  expect(checkButton).toBeDisabled();
  options.forEach((option) => {
    expect(option).toBeDisabled();
  });
});

test("Tras evaluar correctamente > feedback success", async () => {
  // Arrange
  const user = userEvent.setup();
  const solution = data.correctAnswer;
  render(<MultipleChoiceExample />);
  const exercise = screen.getByTestId("exercise");
  const correctOption = getOptionByName(solution);
  const checkButton = screen.getByText("Comprobar");

  // Act
  await user.click(correctOption);
  await user.click(checkButton);

  // Assert
  expect(exercise).toHaveClass("success");
});

test("Tras evaluar erroneamente > feedback error", async () => {
  // Arrange
  const user = userEvent.setup();
  const solution = data.correctAnswer;
  const wrongOption = data.options.find((option) => option !== solution);

  render(<MultipleChoiceExample />);
  const exercise = screen.getByTestId("exercise");
  const wrongtOptionItem = getOptionByName(wrongOption);
  const checkButton = screen.getByText("Comprobar");

  // Act
  await user.click(wrongtOptionItem);
  await user.click(checkButton);

  // Assert
  expect(exercise).toHaveClass("error");
});

test("Botón reset está deshabilitado cuando el ejercicio no está evaluado", async () => {
  // en el primer test añadir al botón reset
  // Arrange
  const user = userEvent.setup();
  render(<MultipleChoiceExample />);
  const checkButton = screen.getByText("Comprobar");
  const resetButton = screen.getByText("Reiniciar");
  // Act
  expect(resetButton).toBeDisabled();
  await user.click(checkButton);

  // Assert
  expect(resetButton).not.toBeDisabled();
});

test("Pulsar botón reset reinicia el ejercicio", async () => {
  // Arrange
  const user = userEvent.setup();
  render(<MultipleChoiceExample />);
  const option1 = getOptionByIndex(1);
  const checkButton = screen.getByText("Comprobar");
  const resetButton = screen.getByText("Reiniciar");
  // Act & assert ...
  // elegir una opción y comprobar el ejercicio
  await user.click(option1);
  await user.click(checkButton);

  // comprobar que option1 el botón de comprobar está deshabilitado
  expect(option1).toBeDisabled();
  expect(option1).toHaveClass("selected");
  expect(checkButton).toBeDisabled();

  // resetear el ejercicio
  await user.click(resetButton);

  // comprobar que el reset ha funcionado
  expect(option1).not.toBeDisabled();
  expect(option1).not.toHaveClass("selected");
  expect(checkButton).not.toBeDisabled();
  expect(resetButton).toBeDisabled();
});

function getOptionByIndex(index) {
  return screen.getAllByTestId("option")[index];
}

function getOptionByName(name) {
  const options = screen.getByTestId("optionList");
  return within(options).getByText(name);
}
