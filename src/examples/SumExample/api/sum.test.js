import { test, expect } from "vitest";
import sum from "./sum";

test("sum suma dos números correctamente", () => {
  // Arrange: Preparar el escenario
  const num1 = 1;
  const num2 = 2;
  const expectedResult = 3;

  // Act: Ejecutar la función que se está testeando
  const result = sum(num1, num2);

  // Assert: Verificar que el resultado es el esperado
  expect(result).toBe(expectedResult);
});
