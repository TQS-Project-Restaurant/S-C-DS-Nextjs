import '@testing-library/jest-dom';
import MenuPage from "@/app/menu/page";
import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { Menu } from '@/app/_interfaces';

const menu:Menu = {
    id: 1,
    pratos: [
      {
        id: 1,
        nome: 'Francesinha',
        preco: 22.55,
        hidratosCarbono: 55.02,
        proteina: 2.65,
        kcal: 672,
        stock: 20,
        imagemUrl: '/images/food/francesinha.png'
      },
      {
        id: 2,
        nome: 'Sopa Tomate',
        preco: 13.75,
        hidratosCarbono: 39.31,
        proteina: 35.38,
        kcal: 390,
        stock: 20,
        imagemUrl: '/images/food/sopatomate.png'
      }
    ],
    bebidas: [
      {
        id: 1,
        nome: 'Coca-Cola',
        preco: 4.24,
        hidratosCarbono: 0.51,
        proteina: 2.5,
        kcal: 53,
        stock: 20,
        imagemUrl: '/images/drinks/cocacola.png'
      },
      {
        id: 2,
        nome: 'Sumo de Laranja',
        preco: 2.77,
        hidratosCarbono: 23.52,
        proteina: 0.5,
        kcal: 81,
        stock: 20,
        imagemUrl: '/images/drinks/sumolaranja.png'
      }
    ],
    dia: '2024-05-28'
};

jest.mock('next/navigation', () => ({
  useRouter() {
    return ({
      route: '/',
      pathname: '',
      query: '',
      asPath: '',
      push: jest.fn(),
      events: {
        on: jest.fn(),
        off: jest.fn()
      },
      beforePopState: jest.fn(() => null),
      prefetch: jest.fn(() => null)
    });
  },
}));



describe("Menu page Component",()=>{
  afterEach(()=>{

  })

    it("data is received", async ()=>{
      (global as any).fetch = jest.fn(() =>
        Promise.resolve({
          status:200,
          json: () => Promise.resolve(menu),
        })
      );
      let pagina = await MenuPage();
      render(pagina)
      expect(screen.getAllByTestId("prato").length).toBe(4)
    });

    it("data no received", async ()=>{
      (global as any).fetch = jest.fn(() =>
        Promise.resolve({
          status:500,
        })
      );
      let pagina = await MenuPage();
      render(pagina)
      expect(screen.getByText("No Menu")).toBeInTheDocument();
    })
})