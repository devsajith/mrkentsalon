"use client";

import { useState } from "react";

import {
  createService,
} from "@/services/service.service";

export default function ServiceForm() {

  const [name, setName] =
    useState("");

  const [description,
    setDescription] =
    useState("");

  const [duration,
    setDuration] =
    useState("");

  const [price,
    setPrice] =
    useState("");

  async function handleSubmit() {

    try {

      await createService({
        name,
        description,
        duration:
          Number(duration),
        price:
          Number(price),
      });

      window.location.reload();

    } catch (error) {

      console.error(error);

      alert(
        "Failed to create service"
      );

    }

  }

  return (

    <div className="bg-white p-5 rounded-lg shadow mb-6">

      <h2 className="text-xl font-bold mb-4">
        Add Service
      </h2>

      <div className="space-y-3">

        <input
          placeholder="Service Name"
          value={name}
          onChange={(e) =>
            setName(
              e.target.value
            )
          }
          className="w-full border p-2 rounded"
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) =>
            setDescription(
              e.target.value
            )
          }
          className="w-full border p-2 rounded"
        />

        <input
          type="number"
          placeholder="Duration"
          value={duration}
          onChange={(e) =>
            setDuration(
              e.target.value
            )
          }
          className="w-full border p-2 rounded"
        />

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) =>
            setPrice(
              e.target.value
            )
          }
          className="w-full border p-2 rounded"
        />

        <button
          onClick={handleSubmit}
          className="bg-black text-white px-4 py-2 rounded"
        >
          Add Service
        </button>

      </div>

    </div>

  );

}