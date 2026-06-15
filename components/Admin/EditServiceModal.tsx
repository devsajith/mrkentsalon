"use client";

import { useState } from "react";

import {
  updateService,
} from "@/services/service.service";

type Service = {
  id: string;
  name: string;
  description?: string;
  duration: number;
  price: number;
  is_active: boolean;
};

type Props = {
  service: Service;
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

      alert(
        "Failed to update service"
      );

    }

  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="border border-border-light hover:bg-surface text-text-primary text-xs px-3 py-1.5 rounded-lg shadow-sm font-bold transition-all shrink-0 cursor-pointer"
      >
        Edit
      </button>

      {open && (
        <div className="fixed inset-0 bg-black/65 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
          <div className="bg-white p-6 rounded-2xl w-[95%] max-w-[480px] border border-border-light shadow-2xl space-y-5 animate-scale-in">
            <h2 className="text-lg font-black text-text-primary border-b border-border-light/60 pb-3 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-2.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
              Edit Service
            </h2>

            <div className="space-y-4">
              {/* Service Name */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-text-muted uppercase tracking-wider">Service Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-surface/50 border border-border-light/60 rounded-xl py-2.5 px-4 text-sm font-medium text-text-primary outline-none focus:border-accent/30 focus:ring-4 focus:ring-accent/10 transition-all"
                />
              </div>

              {/* Description */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-text-muted uppercase tracking-wider">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-surface/50 border border-border-light/60 rounded-xl py-2.5 px-4 text-sm font-medium text-text-primary outline-none focus:border-accent/30 focus:ring-4 focus:ring-accent/10 transition-all min-h-[80px]"
                />
              </div>

              {/* Duration */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-text-muted uppercase tracking-wider">Duration (Minutes)</label>
                <input
                  type="number"
                  value={duration}
                  onChange={(e) => setDuration(Number(e.target.value))}
                  className="w-full bg-surface/50 border border-border-light/60 rounded-xl py-2.5 px-4 text-sm font-medium text-text-primary outline-none focus:border-accent/30 focus:ring-4 focus:ring-accent/10 transition-all"
                />
              </div>

              {/* Price */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-text-muted uppercase tracking-wider">Price (₹)</label>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  className="w-full bg-surface/50 border border-border-light/60 rounded-xl py-2.5 px-4 text-sm font-medium text-text-primary outline-none focus:border-accent/30 focus:ring-4 focus:ring-accent/10 transition-all"
                />
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleSave}
                  className="flex-1 bg-gradient-to-r from-accent to-accent-light text-white py-3 rounded-xl text-sm font-bold shadow-md hover:shadow-lg transition-all active:shadow-sm cursor-pointer border-none"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="flex-1 border border-border-light/85 hover:bg-surface text-text-secondary py-3 rounded-xl text-sm font-bold transition-all cursor-pointer"
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