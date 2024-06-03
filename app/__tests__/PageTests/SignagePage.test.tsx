import '@testing-library/jest-dom';
import Signage from "@/app/signage/page";
import React from "react";
import { render, screen } from "@testing-library/react";
import useSWR from "swr";

const orders = [
  { id: 1, mesa: 1, pratos: [{ id: 1, nome: "francesinha" }], bebidas: [{ id: 1 }], status: 1,},
  { id: 2, mesa: 2, pratos: [{ id: 2, nome: "bacalhau" }], bebidas: [{ id: 2 }], status: 0,},
];

jest.mock("next-auth/react", () => {
  const originalModule = jest.requireActual('next-auth/react');
  const mockSession = {
    expires: new Date(Date.now() + 2 * 86400).toISOString(),
    user: { email:"kitchen@gmail.com",role:"KITCHEN",token:"da" }
  };
  return {
    __esModule: true,
    ...originalModule,
    useSession: jest.fn(() => {
      return {data: mockSession, status: 'authenticated'}  // return type is [] in v3 but changed to {} in v4
    }),
  };
});

jest.mock("swr");

describe("Signage component", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("shows loading state", () => {
    (useSWR as jest.Mock).mockReturnValue({
      data: undefined,
      error: undefined,
    });

    render(<Signage />);
    
    expect(screen.getByText("Carregando...")).toBeInTheDocument();
  });

  it("shows error state", () => {
    (useSWR as jest.Mock).mockReturnValue({
      data: undefined,
      error: new Error("Error fetching data"),
    });

    render(<Signage />);
    
    expect(screen.getByText("Erro ao carregar os dados.")).toBeInTheDocument();
  });

  it("shows orders in progress and pending orders", () => {

    (useSWR as jest.Mock).mockReturnValue({
      data: orders,
      error: undefined,
    });

    render(<Signage />);

    expect(screen.getByText("Orders In Progress")).toBeInTheDocument();
    expect(screen.getByText("Order 1")).toBeInTheDocument();
    expect(screen.getByText(orders[0].pratos[0].nome)).toBeInTheDocument();

    expect(screen.getByText("Pending Orders")).toBeInTheDocument();
    expect(screen.getByText("Order 2")).toBeInTheDocument();
    expect(screen.getByText(orders[1].pratos.length + " Pratos")).toBeInTheDocument();
  });
});