"use client";

import {
    toggleService,
} from "@/services/service.service";

import EditServiceModal
    from "./EditServiceModal";

type Service = {
  id: string;
  name: string;
  description?: string;
  duration: number;
  price: number;
  is_active: boolean;
};

export default function ServiceTable({
  services,
}: {
  services: Service[];
}) {

    async function handleToggle(
        id: string,
        isActive: boolean
    ) {

        await toggleService(
            id,
            !isActive
        );

        window.location.reload();

    }

  return (
    <div className="bg-white rounded-2xl border border-border-light shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[600px] border-collapse">
          <thead>
            <tr className="bg-surface/50 border-b border-border-light">
              <th className="p-4 text-left text-[11px] font-bold text-text-muted uppercase tracking-wider">Service Name</th>
              <th className="p-4 text-left text-[11px] font-bold text-text-muted uppercase tracking-wider">Duration</th>
              <th className="p-4 text-left text-[11px] font-bold text-text-muted uppercase tracking-wider">Price</th>
              <th className="p-4 text-left text-[11px] font-bold text-text-muted uppercase tracking-wider">Status</th>
              <th className="p-4 text-left text-[11px] font-bold text-text-muted uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-light/40">
            {services.map((service) => (
              <tr key={service.id} className="hover:bg-surface/20 transition-colors">
                <td className="p-4 font-bold text-sm text-text-primary">
                  {service.name}
                  {service.description && (
                    <p className="font-normal text-xs text-text-secondary mt-0.5 max-w-xs truncate">{service.description}</p>
                  )}
                </td>
                <td className="p-4 text-sm font-semibold text-text-secondary">
                  {service.duration} min
                </td>
                <td className="p-4 text-sm font-bold text-text-primary">
                  ₹{service.price}
                </td>
                <td className="p-4">
                  <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider ring-1 ${
                    service.is_active
                      ? "bg-emerald-50 text-emerald-700 ring-emerald-600/10"
                      : "bg-red-50 text-red-700 ring-red-600/10"
                  }`}>
                    {service.is_active ? "Active" : "Disabled"}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex gap-2">
                    <EditServiceModal service={service} />
                    <button
                      type="button"
                      onClick={() => handleToggle(service.id, service.is_active)}
                      className={`border text-xs px-3 py-1.5 rounded-lg shadow-sm font-bold transition-all shrink-0 cursor-pointer ${
                        service.is_active
                          ? "border-red-200 hover:bg-red-50 text-red-600"
                          : "border-emerald-200 hover:bg-emerald-50 text-emerald-600"
                      }`}
                    >
                      {service.is_active ? "Disable" : "Enable"}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

}