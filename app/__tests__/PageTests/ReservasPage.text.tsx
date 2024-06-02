import "@testing-library/jest-dom";
import ReservasPage from "@/app/reservas/page";
import React from "react";
import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

const slots = [
  [9, 10],
  [10, 11],
];

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

describe("ReservasPage component", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("shows available slots and allows booking", async () => {
    (global as any).fetch = jest.fn((url) => {
      if (url.includes("availableSlots")) {
        return Promise.resolve({
          status: 200,
          json: () => Promise.resolve(slots),
        });
      }
      if (url.includes("/bookings")) {
        return Promise.resolve({
          status: 201,
        });
      }
      return Promise.reject(new Error("Unhandled fetch call"));
    });

    render(<ReservasPage />);

    // Set date
    const dateInput = screen.getByLabelText("Choose a date:");
    act(() => {
        fireEvent.change(dateInput, { target: { value: "2023-12-12" } });
    });

    // Wait for slots to load
    await waitFor(() => {
      expect(screen.getByText("Available Slots:")).toBeInTheDocument();
    });

    // Select a slot
    const slotButton = screen.getByText("9:00");
    act(() => {
        fireEvent.click(slotButton);
    });

    // Select number of tables
    const tableSelect = screen.getByLabelText("Number of Tables:");
    act(() => {
        fireEvent.change(tableSelect, { target: { value: "2" } });
    });

    //Make booking
    const bookingButton = screen.getByText("Make Booking");
    act(() => {
        fireEvent.click(bookingButton);
    });

    // Check alert for successful booking
    await waitFor(() => {
        expect(screen.getByText("Booking successful")).toBeInTheDocument();
    });
  });

  it("redirects if the user is not a USER", () => {
    const mockSession = {
      expires: new Date(Date.now() + 2 * 86400).toISOString(),
      user: { email: "admin@example.com", role: "ADMIN", token: "dummy-token" },
    };
    (useSession as jest.Mock).mockReturnValue({
      data: mockSession,
      status: "authenticated",
    });

    render(<ReservasPage />);

    expect(redirect).toHaveBeenCalledWith("/menu");
  });
});
