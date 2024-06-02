"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";

type Reservation = {
  id: number;
  dia: string;
  hora: string;
  quantidadeMesas: number;
  status: number;
};

export default function UserReservationsPage() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const router = useRouter();

  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/api/auth/signin?callbackUrl=/reservas');
    },
  });

  useEffect(() => {
    if (session?.user != undefined && session?.user.role !== "USER") {
      redirect("/menu");
    }
    else if (session?.user != undefined){
        fetchReservations()
    }
  }, [session]);

  const fetchReservations = async () => {
      const response = await fetch("http://localhost:8080/api/bookings", {
        headers: {
          Authorization: `Bearer ${session?.user.token}`,
        },
      });

      if (response.status === 200) {
        const data: Reservation[] = await response.json();
        setReservations(data);
      }
  };

  const getStatusLabel = (status: number) => {
    switch (status) {
      case 0:
        return { text: "PENDING", color: "bg-yellow-500" };
      case 1:
        return { text: "PREPARING", color: "bg-blue-500" };
      case 2:
        return { text: "ACCEPTED", color: "bg-green-500" };
      case 3:
        return { text: "CANCELLED", color: "bg-red-500" };
      default:
        return { text: "UNKNOWN", color: "bg-gray-500" };
    }
  };

  return (
    
    <div className="container mx-auto p-4">
        <button
            onClick={() => router.push("/reservas")}
            className="mb-4 px-4 py-2 bg-gray-300 text-gray-700 rounded-md"
        >
        Fazer Reserva
        </button>
      <h1 className="text-2xl font-bold mb-4">My Reservations</h1>
      {alertMessage && (
        <div className="mb-4 text-red-500">
          <p>{alertMessage}</p>
        </div>
      )}
      {reservations.length > 0 ? (
        <div className="grid grid-cols-1 gap-4">
          {reservations.map((reservation) => {
            const status = getStatusLabel(reservation.status);
            return (
              <div key={reservation.id} className="p-4 border rounded-md shadow-sm">
                <p className="text-gray-700"><strong>Date:</strong> {reservation.dia}</p>
                <p className="text-gray-700"><strong>Time:</strong> {reservation.hora[0]}:00</p>
                <p className="text-gray-700"><strong>Tables:</strong> {reservation.quantidadeMesas}</p>
                <p className="text-gray-700">
                  <strong>Status:</strong>
                  <span className={`ml-2 px-2 py-1 rounded text-white ${status.color}`}>
                    {status.text}
                  </span>
                </p>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-gray-700">You have no reservations.</p>
      )}
    </div>
  );
}
