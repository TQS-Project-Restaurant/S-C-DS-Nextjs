import "@testing-library/jest-dom";
import UserReservationsPage from "@/app/reservas/user/page";
import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

jest.mock("next-auth/react", () => {
  const originalModule = jest.requireActual("next-auth/react");
  const mockSession = {
    expires: new Date(Date.now() + 2 * 86400).toISOString(),
    user: { email: "user@example.com", role: "USER", token: "dummy-token" },
  };
  return {
    __esModule: true,
    ...originalModule,
    useSession: jest.fn(() => {
      return { data: mockSession, status: "authenticated" };
    }),
  };
});

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  redirect: jest.fn(),
}));

describe("UserReservationsPage component", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("fetches and displays user reservations", async () => {
    const mockReservations = [
      {
        id: 1,
        dia: "2024-06-04",
        hora: ["9","00"],
        quantidadeMesas: 2,
        status: 2,
      },
      {
        id: 2,
        dia: "2024-06-05",
        hora: ["10","00"],
        quantidadeMesas: 3,
        status: 0,
      },
    ];

    (global as any).fetch = jest.fn().mockResolvedValue({
      status: 200,
      json: () => Promise.resolve(mockReservations),
    });

    render(<UserReservationsPage />);

    await waitFor(() => {
        expect(screen.getByText("My Reservations")).toBeInTheDocument();

        expect(screen.getByText("2024-06-04")).toBeInTheDocument();
        expect(screen.getByText("9:00")).toBeInTheDocument();
        expect(screen.getByText("2")).toBeInTheDocument();
        expect(screen.getByText("ACCEPTED")).toBeInTheDocument();
    
        expect(screen.getByText("2024-06-05")).toBeInTheDocument();
        expect(screen.getByText("10:00")).toBeInTheDocument();
        expect(screen.getByText("3")).toBeInTheDocument();
        expect(screen.getByText("PENDING")).toBeInTheDocument();    });

  });

  it("redirects if the user role is not USER", () => {
    const mockSession = {
      expires: new Date(Date.now() + 2 * 86400).toISOString(),
      user: { email: "admin@example.com", role: "ADMIN", token: "dummy-token" },
    };
    (useSession as jest.Mock).mockReturnValue({ data: mockSession, status: "authenticated" });

    render(<UserReservationsPage />);

    expect(redirect).toHaveBeenCalledWith("/menu");
  });
});
