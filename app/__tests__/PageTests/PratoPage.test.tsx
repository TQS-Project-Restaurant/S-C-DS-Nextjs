import "@testing-library/jest-dom";
import PratoPage from "@/app/pratos/[pratoID]/page";
import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { Comida } from "@/app/_interfaces";

const prato: Comida = {
  id: 1,
  nome: "Francesinha",
  preco: 22.55,
  hidratosCarbono: 55.02,
  proteina: 2.65,
  kcal: 672,
  stock: 20,
  imagemUrl: "/images/food/francesinha.png",
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
        json: () => Promise.resolve(prato),
      })
    );

    let pagina = await PratoPage({ params: { pratoID: 1 } });

    render(pagina);

    expect(screen.getByText(`€${prato.preco.toFixed(2)}`)).toBeInTheDocument();
    expect(screen.getByText(`${prato.kcal}`)).toBeInTheDocument();
    expect(screen.getByText(`${prato.hidratosCarbono}g`)).toBeInTheDocument();
    expect(screen.getByText(`${prato.proteina}g`)).toBeInTheDocument();
    expect(screen.getByAltText(prato.nome)).toHaveAttribute('src', `http://api:8080${prato.imagemUrl}`);
  });

  it("data is not received", async () => {

    (global as any).fetch = jest.fn(() =>
      Promise.resolve({
        status: 500,
      })
    );

    let pagina = await PratoPage({ params: { pratoID: 1 } });

    render(pagina);

    expect(screen.getByText('Prato não foi encontrado')).toBeInTheDocument();  });
});
