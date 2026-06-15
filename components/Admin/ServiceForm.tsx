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
    <div className="bg-white p-6 rounded-2xl border border-border-light shadow-sm space-y-5">
      <h2 className="text-lg font-bold text-text-primary border-b border-border-light/60 pb-3 flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Add Service
      </h2>

      <div className="space-y-4">
        {/* Service Name */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-text-muted uppercase tracking-wider">Service Name</label>
          <input
            type="text"
            placeholder="e.g. Classic Haircut"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-surface/50 border border-border-light/60 rounded-xl py-2.5 px-4 text-sm font-medium text-text-primary placeholder:text-text-muted outline-none border-transparent focus:border-accent/30 focus:ring-4 focus:ring-accent/10 transition-all"
          />
        </div>

        {/* Description */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-text-muted uppercase tracking-wider">Description</label>
          <textarea
            placeholder="Service details..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full bg-surface/50 border border-border-light/60 rounded-xl py-2.5 px-4 text-sm font-medium text-text-primary placeholder:text-text-muted outline-none border-transparent focus:border-accent/30 focus:ring-4 focus:ring-accent/10 transition-all min-h-[80px]"
          />
        </div>

        {/* Duration */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-text-muted uppercase tracking-wider">Duration (Minutes)</label>
          <input
            type="number"
            placeholder="e.g. 30"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="w-full bg-surface/50 border border-border-light/60 rounded-xl py-2.5 px-4 text-sm font-medium text-text-primary placeholder:text-text-muted outline-none border-transparent focus:border-accent/30 focus:ring-4 focus:ring-accent/10 transition-all"
          />
        </div>

        {/* Price */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-text-muted uppercase tracking-wider">Price (₹)</label>
          <input
            type="number"
            placeholder="e.g. 500"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full bg-surface/50 border border-border-light/60 rounded-xl py-2.5 px-4 text-sm font-medium text-text-primary placeholder:text-text-muted outline-none border-transparent focus:border-accent/30 focus:ring-4 focus:ring-accent/10 transition-all"
          />
        </div>

        {/* Submit button */}
        <button
          type="button"
          onClick={handleSubmit}
          className="w-full bg-gradient-to-r from-accent to-accent-light py-3 rounded-xl text-sm font-bold text-white shadow-md hover:shadow-lg transition-all active:shadow-sm cursor-pointer flex items-center justify-center gap-2 border-none"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Add Service
        </button>
      </div>
    </div>
  );

}