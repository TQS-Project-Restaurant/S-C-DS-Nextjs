"use client"

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

type Slot = [number, number];

export default function ReservasPage() {
  const [date, setDate] = useState<string>("");
  const [slots, setSlots] = useState<Slot[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<number[]>([]);
  const [tables, setTables] = useState<number>(1);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

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
  }, [session]);

  const fetchAvailableSlots = async (selectedDate: string) => {
    const response = await fetch(process.env.NEXT_PUBLIC_IP_ADDRESS + `/api/bookings/availableSlots?date=${selectedDate}`, { cache: "no-cache" });
    if (response.status === 200) {
      const data: Slot[] = await response.json();
      setSlots(data);
    } else {
      console.error("Error fetching available slots");
    }
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = e.target.value;
    setAlertMessage("")
    setSelectedSlot([])
    setDate(selectedDate);
    fetchAvailableSlots(selectedDate);
  };

  const handleBooking = async () => {
    if (selectedSlot.length === 0) return setAlertMessage("Please select a time slot");

    const response = await fetch(process.env.NEXT_PUBLIC_IP_ADDRESS + "/api/bookings", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${session?.user.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ dia: date, hora: selectedSlot, quantidadeMesas: tables }),
    });

    if (response.status === 201) {
      setAlertMessage("Booking successful");
      fetchAvailableSlots(date);
    } else {
      console.error("Error making booking");
      setAlertMessage("Booking failed");
    }
  };

  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Book a Slot</h1>
      <div className="mb-4">
        <label className="block text-gray-700">Choose a date:
          <input
            type="date"
            value={date}
            onChange={handleDateChange}
            onClick={(e) => e.currentTarget.showPicker()}
            min={getTodayDate()}
            className="mt-1 block px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </label>
      </div>
      {slots.length > 0 && (
        <div className="mb-4">
          <label className="block text-gray-700">Available Slots:
            <div className="grid grid-cols-3 gap-2 mt-2">
              {slots.map((slot, index) => (
                <button
                  key={`${slot[0]}-${slot[1]}`}
                  onClick={() => {setSelectedSlot([slot[0], slot[1]]); setAlertMessage("")}}
                  className={`px-4 py-2 rounded-md ${
                    selectedSlot[0] === slot[0] && selectedSlot[1] === slot[1]
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-700"
                    }`}
                >
                  {slot[0]}:00
                </button>
              ))}
            </div>
          </label>
        </div>
      )}
      <div className="mb-4">
        <label className="block text-gray-700">Number of Tables:
          <select
            value={tables}
            onChange={(e) => setTables(parseInt(e.target.value))}
            onClick={() => setAlertMessage("")}
            className="mt-1 block px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((tableCount) => (
              <option key={tableCount} value={tableCount}>
                {tableCount}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className="flex items-center">
        <button
          onClick={handleBooking}
          className="px-4 py-2 bg-green-500 text-white rounded-md mr-2"
        >
          Make Booking
        </button>
        {alertMessage && (
          <p className={`text-sm ${alertMessage.includes("successful") ? 'text-green-500' : 'text-red-500'}`}>
            {alertMessage}
          </p>
        )}
      </div>
    </div>
  );
}
