import "@testing-library/jest-dom";
import BebidaPage from "@/app/bebidas/[bebidaID]/page";
import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { Comida } from "@/app/_interfaces";

const bebida: Comida = {
  id: 1,
  nome: "Coca-Cola",
  preco: 22.55,
  hidratosCarbono: 55.02,
  proteina: 2.65,
  kcal: 672,
  stock: 20,
  imagemUrl: "/images/food/cocacola.png",
};

jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      route: "/",
      pathname: "",
      query: "",
      asPath: "",
      push: jest.fn(),
      events: {
        on: jest.fn(),
        off: jest.fn(),
      },
      beforePopState: jest.fn(() => null),
      prefetch: jest.fn(() => null),
    };
  },
}));

describe("Prato page Component", () => {
  it("data is received", async () => {

    (global as any).fetch = jest.fn(() =>
      Promise.resolve({
        status: 200,
        json: () => Promise.resolve(bebida),
      })
    );

    let pagina = await BebidaPage({ params: { bebidaID: 1 } });

    render(pagina);

    expect(screen.getByText(`€${bebida.preco.toFixed(2)}`)).toBeInTheDocument();
    expect(screen.getByText(`${bebida.kcal}`)).toBeInTheDocument();
    expect(screen.getByText(`${bebida.hidratosCarbono}g`)).toBeInTheDocument();
    expect(screen.getByText(`${bebida.proteina}g`)).toBeInTheDocument();
    expect(screen.getByAltText(bebida.nome)).toHaveAttribute('src', `http://localhost:8080${bebida.imagemUrl}`);
  });

  it("data is not received", async () => {

    (global as any).fetch = jest.fn(() =>
      Promise.resolve({
        status: 500,
      })
    );

    let pagina = await BebidaPage({ params: { bebidaID: 1 } });

    render(pagina);

    expect(screen.getByText('Bebida não foi encontrada')).toBeInTheDocument();  });
});
