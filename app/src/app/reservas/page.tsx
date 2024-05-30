"use client";

import { useState } from "react";

type Slot = [number, number];

export default function BookingPage() {

  const [date, setDate] = useState<string>("");
  const [slots, setSlots] = useState<Slot[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<number | null>(null);

  const fetchAvailableSlots = async (selectedDate: string) => {
    const response = await fetch(`http://localhost:8080/api/bookings/availableSlots?date=${selectedDate}`, { cache: "no-cache" });
    if (response.status === 200) {
      const data: Slot[] = await response.json();
      setSlots(data);
    } else {
      console.error("Error fetching available slots");
    }
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = e.target.value;
    setDate(selectedDate);
    fetchAvailableSlots(selectedDate);
  };

  const handleBooking = async () => {
    if (selectedSlot === null) return alert("Please select a time slot");

    const response = await fetch("http://localhost:8080/api/bookings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ date, time: selectedSlot }),
    });

    if (response.status === 200) {
      alert("Booking successful");
    } else {
      console.error("Error making booking");
      alert("Booking failed");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Book a Slot</h1>
      <div className="mb-4">
        <label className="block text-gray-700">Choose a date:</label>
        <input
          type="date"
          value={date}
          onChange={handleDateChange}
          onClick={(e) => e.currentTarget.showPicker()}
          className="mt-1 block px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      {slots.length > 0 && (
        <div className="mb-4">
          <label className="block text-gray-700">Available Slots:</label>
          <div className="grid grid-cols-3 gap-2 mt-2">
            {slots.map((slot, index) => (
              <button
                key={index}
                onClick={() => setSelectedSlot(slot[0])}
                className={`px-4 py-2 rounded-md ${
                  selectedSlot === slot[0]
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                {slot[0]}:00
              </button>
            ))}
          </div>
        </div>
      )}
      <button
        onClick={handleBooking}
        className="px-4 py-2 bg-green-500 text-white rounded-md"
      >
        Make Booking
      </button>
    </div>
  );
}