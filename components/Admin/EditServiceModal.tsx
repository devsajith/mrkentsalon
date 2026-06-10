"use client";

import { useState } from "react";

import {
  updateService,
} from "@/services/service.service";

type Props = {
  service: any;
};

export default function EditServiceModal({
  service,
}: Props) {

  const [name, setName] =
    useState(service.name);

  const [description,
    setDescription] =
    useState(
      service.description || ""
    );

  const [duration,
    setDuration] =
    useState(service.duration);

  const [price,
    setPrice] =
    useState(service.price);

  const [open,
    setOpen] =
    useState(false);

  async function handleSave() {

    try {

      await updateService(
        service.id,
        {
          name,
          description,
          duration:
            Number(duration),
          price:
            Number(price),
        }
      );

      window.location.reload();

    } catch (error) {

      console.error(error);

      alert(
        "Failed to update service"
      );

    }

  }

  return (
    <>
      <button
        onClick={() =>
          setOpen(true)
        }
        className="border px-3 py-1 rounded"
      >
        Edit
      </button>

      {open && (

        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">

          <div className="bg-white p-6 rounded-lg w-[500px]">

            <h2 className="text-xl font-bold mb-4">
              Edit Service
            </h2>

            <div className="space-y-3">

              <input
                value={name}
                onChange={(e) =>
                  setName(
                    e.target.value
                  )
                }
                className="w-full border p-2 rounded"
              />

              <textarea
                value={
                  description
                }
                onChange={(e) =>
                  setDescription(
                    e.target.value
                  )
                }
                className="w-full border p-2 rounded"
              />

              <input
                type="number"
                value={duration}
                onChange={(e) =>
                  setDuration(
                    Number(
                      e.target.value
                    )
                  )
                }
                className="w-full border p-2 rounded"
              />

              <input
                type="number"
                value={price}
                onChange={(e) =>
                  setPrice(
                    Number(
                      e.target.value
                    )
                  )
                }
                className="w-full border p-2 rounded"
              />

              <div className="flex gap-2">

                <button
                  onClick={
                    handleSave
                  }
                  className="bg-black text-white px-4 py-2 rounded"
                >
                  Save
                </button>

                <button
                  onClick={() =>
                    setOpen(false)
                  }
                  className="border px-4 py-2 rounded"
                >
                  Cancel
                </button>

              </div>

            </div>

          </div>

        </div>

      )}
    </>
  );
}