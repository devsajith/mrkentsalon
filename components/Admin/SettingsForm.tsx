"use client";

import { useState } from "react";
import { updateSettings } from "@/services/settings.service";
import BarberScissorsLoader from "@/components/BarberScissorsLoader";

type SettingsFormProps = {
  initialData: Record<string, string>;
};

const timeOptions = Array.from({ length: 48 }).map((_, i) => {
  const hour = Math.floor(i / 2);
  const min = (i % 2) * 30;
  const val = `${String(hour).padStart(2, "0")}:${String(min).padStart(2, "0")}`;
  const ampm = hour >= 12 ? "PM" : "AM";
  const hour12 = hour % 12 === 0 ? 12 : hour % 12;
  const label = `${hour12}:${String(min).padStart(2, "0")} ${ampm}`;
  return { val, label };
});

export default function SettingsForm({
  initialData,
}: SettingsFormProps) {

  const [formData, setFormData] =
    useState(initialData);

  const [loading, setLoading] =
    useState(false);

  const [message, setMessage] =
    useState("");

  function handleChange(
    key: string,
    value: string
  ) {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  async function handleSave() {

    try {

      setLoading(true);
      setMessage("");

      await updateSettings(
        formData
      );

      setMessage(
        "Settings saved successfully"
      );

    } catch (error) {

      setMessage(
        "Failed to save settings"
      );

    } finally {

      setLoading(false);

    }
  }

  return (
    <div className="bg-white p-6 md:p-8 rounded-2xl border border-border-light shadow-md max-w-3xl space-y-8 animate-fade-in">
      
      <div className="border-b border-border-light/60 pb-4">
        <h2 className="text-xl font-bold text-text-primary flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
          </svg>
          Configure Settings
        </h2>
        <p className="text-xs text-text-secondary mt-1">Manage operational timings, customer capacity, and business details</p>
      </div>

      <div className="space-y-6">
        {/* Section 1: Business Profile */}
        <div className="bg-surface/30 p-5 rounded-2xl border border-border-light/50 space-y-4">
          <h3 className="text-xs font-bold text-text-muted uppercase tracking-wider border-b border-border-light/40 pb-2">
            1. Business Profile
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-text-secondary">Business Name</label>
              <input
                type="text"
                value={formData.business_name || ""}
                onChange={(e) => handleChange("business_name", e.target.value)}
                className="w-full bg-white border border-border-light/80 rounded-xl py-2.5 px-4 text-sm font-semibold text-text-primary outline-none focus:border-accent/30 focus:ring-4 focus:ring-accent/10 transition-all"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-text-secondary">Contact Phone</label>
              <input
                type="text"
                value={formData.phone || ""}
                onChange={(e) => handleChange("phone", e.target.value)}
                className="w-full bg-white border border-border-light/80 rounded-xl py-2.5 px-4 text-sm font-semibold text-text-primary outline-none focus:border-accent/30 focus:ring-4 focus:ring-accent/10 transition-all"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Operations Timing */}
        <div className="bg-surface/30 p-5 rounded-2xl border border-border-light/50 space-y-4">
          <h3 className="text-xs font-bold text-text-muted uppercase tracking-wider border-b border-border-light/40 pb-2">
            2. Operational Timings
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-text-secondary">Opening Time</label>
              <div className="relative">
                <select
                  value={formData.opening_time ? formData.opening_time.substring(0, 5) : ""}
                  onChange={(e) => handleChange("opening_time", e.target.value)}
                  className="w-full bg-white border border-border-light/80 rounded-xl py-2.5 pl-4 pr-10 text-sm font-semibold text-text-primary outline-none focus:border-accent/30 focus:ring-4 focus:ring-accent/10 transition-all appearance-none cursor-pointer"
                >
                  <option value="">Select Opening Time</option>
                  {timeOptions.map((opt) => (
                    <option key={opt.val} value={opt.val}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-text-muted">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-text-secondary">Closing Time</label>
              <div className="relative">
                <select
                  value={formData.closing_time ? formData.closing_time.substring(0, 5) : ""}
                  onChange={(e) => handleChange("closing_time", e.target.value)}
                  className="w-full bg-white border border-border-light/80 rounded-xl py-2.5 pl-4 pr-10 text-sm font-semibold text-text-primary outline-none focus:border-accent/30 focus:ring-4 focus:ring-accent/10 transition-all appearance-none cursor-pointer"
                >
                  <option value="">Select Closing Time</option>
                  {timeOptions.map((opt) => (
                    <option key={opt.val} value={opt.val}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-text-muted">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Slot Configuration */}
        <div className="bg-surface/30 p-5 rounded-2xl border border-border-light/50 space-y-4">
          <h3 className="text-xs font-bold text-text-muted uppercase tracking-wider border-b border-border-light/40 pb-2">
            3. Booking Configuration
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-text-secondary">Default Slot Duration (mins)</label>
              <input
                type="number"
                value={formData.slot_duration || ""}
                onChange={(e) => handleChange("slot_duration", e.target.value)}
                className="w-full bg-white border border-border-light/80 rounded-xl py-2.5 px-4 text-sm font-semibold text-text-primary outline-none focus:border-accent/30 focus:ring-4 focus:ring-accent/10 transition-all"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-text-secondary">Simultaneous Capacity per Slot</label>
              <input
                type="number"
                value={formData.slot_capacity || ""}
                onChange={(e) => handleChange("slot_capacity", e.target.value)}
                className="w-full bg-white border border-border-light/80 rounded-xl py-2.5 px-4 text-sm font-semibold text-text-primary outline-none focus:border-accent/30 focus:ring-4 focus:ring-accent/10 transition-all"
              />
            </div>
             <div className="space-y-1">
              <label className="text-xs font-bold text-text-secondary">Walk in Capacity</label>
              <input
                type="number"
                value={formData.walkin_capacity || ""}
                onChange={(e) => handleChange("walkin_capacity", e.target.value)}
                className="w-full bg-white border border-border-light/80 rounded-xl py-2.5 px-4 text-sm font-semibold text-text-primary outline-none focus:border-accent/30 focus:ring-4 focus:ring-accent/10 transition-all"
              />
            </div>
          </div>
        </div>

        {/* Success/Error Banner */}
        {message && (
          <div
            className={`p-4 rounded-xl text-sm font-semibold border ${
              message.includes("successfully")
                ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                : "bg-red-50 text-red-700 border-red-200"
            } animate-slide-down`}
          >
            {message}
          </div>
        )}

        {/* Submit */}
        <div className="pt-2">
          <button
            type="button"
            onClick={handleSave}
            disabled={loading}
            className="w-full md:w-auto bg-gradient-to-r from-accent to-accent-light text-white px-8 py-3.5 rounded-xl text-sm font-bold shadow-md hover:shadow-lg transition-all active:shadow-sm cursor-pointer disabled:opacity-50 border-none"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <BarberScissorsLoader size={16} label="" colorClass="text-white" containerClass="inline-flex items-center" />
                Saving Configuration...
              </span>
            ) : (
              "Save Configuration"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}