"use client";

import { useState } from "react";
import { updateSettings } from "@/services/settings.service";

type SettingsFormProps = {
  initialData: Record<string, string>;
};

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

      console.error(error);

      setMessage(
        "Failed to save settings"
      );

    } finally {

      setLoading(false);

    }
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow">

      <div className="space-y-4">

        <div>
          <label className="block mb-1 font-medium">
            Business Name
          </label>

          <input
            type="text"
            value={
              formData.business_name || ""
            }
            onChange={(e) =>
              handleChange(
                "business_name",
                e.target.value
              )
            }
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">
            Phone
          </label>

          <input
            type="text"
            value={formData.phone || ""}
            onChange={(e) =>
              handleChange(
                "phone",
                e.target.value
              )
            }
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">
            Opening Time
          </label>

          <input
            type="time"
            value={
              formData.opening_time || ""
            }
            onChange={(e) =>
              handleChange(
                "opening_time",
                e.target.value
              )
            }
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">
            Closing Time
          </label>

          <input
            type="time"
            value={
              formData.closing_time || ""
            }
            onChange={(e) =>
              handleChange(
                "closing_time",
                e.target.value
              )
            }
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">
            Slot Duration
          </label>

          <input
            type="number"
            value={
              formData.slot_duration || ""
            }
            onChange={(e) =>
              handleChange(
                "slot_duration",
                e.target.value
              )
            }
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">
            Slot Capacity
          </label>

          <input
            type="number"
            value={
              formData.slot_capacity || ""
            }
            onChange={(e) =>
              handleChange(
                "slot_capacity",
                e.target.value
              )
            }
            className="w-full border p-2 rounded"
          />
        </div>

        {message && (
          <div
            className={`p-3 rounded ${
              message.includes(
                "successfully"
              )
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {message}
          </div>
        )}

        <button
          type="button"
          onClick={handleSave}
          disabled={loading}
          className="bg-black text-white px-4 py-2 rounded disabled:opacity-50"
        >
          {loading
            ? "Saving..."
            : "Save Settings"}
        </button>

      </div>

    </div>
  );
}