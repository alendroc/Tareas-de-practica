import { fetchExchangeRate, convertirMoneda } from "../src/curr encyConverter";

// Se declara global.fetch como jest.Mock para poder simular sus respuestas.
global.fetch = jest.fn();

describe("Pruebas de la función convertirMoneda", () => {
  
  beforeEach(() => {
    jest.clearAllMocks(); // Limpia los mocks antes de cada prueba
  });

  test("Debe convertir correctamente de USD a EUR con tasa 0.85", async () => {
    (global.fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ rate: 0.85 }),
      })
    );

    const resultado = await convertirMoneda(100, "USD", "EUR");
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(resultado).toBe(85); // 100 * 0.85
  });

  test("Debe convertir correctamente de EUR a JPY con tasa 130", async () => {
    (global.fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ rate: 130 }),
      })
    );

    const resultado = await convertirMoneda(50, "EUR", "JPY");
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(resultado).toBe(6500); // 50 * 130
  });

  test("Debe lanzar un error si el monto es negativo o cero", async () => {
    await expect(convertirMoneda(0, "USD", "EUR")).rejects.toThrow("El monto debe ser mayor a 0");
    await expect(convertirMoneda(-10, "USD", "EUR")).rejects.toThrow("El monto debe ser mayor a 0");
  });

  test("Debe lanzar un error si la API no devuelve una tasa de cambio válida", async () => {
    (global.fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({}), // No devuelve "rate"
      })
    );

    await expect(convertirMoneda(100, "USD", "EUR")).rejects.toThrow("No se pudo obtener la tasa de cambio");
  });

  test("Debe lanzar un error si la API responde con un error", async () => {
    (global.fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
      })
    );

    await expect(convertirMoneda(100, "USD", "EUR")).rejects.toThrow("Error al obtener la tasa de cambio");
  });
});
