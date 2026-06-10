"use client";

import {
    toggleService,
} from "@/services/service.service";

import EditServiceModal
    from "./EditServiceModal";

export default function ServiceTable({
    services,
}: {
    services: any[];
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

        <div className="bg-white rounded-lg shadow">

            <table className="w-full">

                <thead>

                    <tr className="border-b">

                        <th className="p-3 text-left">
                            Name
                        </th>

                        <th className="p-3 text-left">
                            Duration
                        </th>

                        <th className="p-3 text-left">
                            Price
                        </th>

                        <th className="p-3 text-left">
                            Status
                        </th>

                        <th className="p-3 text-left">
                            Action
                        </th>

                    </tr>

                </thead>

                <tbody>

                    {services.map(
                        (service) => (

                            <tr
                                key={service.id}
                                className="border-b"
                            >

                                <td className="p-3">
                                    {service.name}
                                </td>

                                <td className="p-3">
                                    {service.duration}
                                    min
                                </td>

                                <td className="p-3">
                                    ₹{service.price}
                                </td>

                                <td className="p-3">

                                    {service.is_active
                                        ? "Active"
                                        : "Disabled"}

                                </td>

                                <td className="p-3">

                                    <div className="flex gap-2">

                                        <EditServiceModal
                                            service={service}
                                        />

                                        <button
                                            onClick={() =>
                                                handleToggle(
                                                    service.id,
                                                    service.is_active
                                                )
                                            }
                                            className="border px-3 py-1 rounded"
                                        >
                                            {service.is_active
                                                ? "Disable"
                                                : "Enable"}
                                        </button>

                                    </div>

                                </td>

                            </tr>

                        )
                    )}

                </tbody>

            </table>

        </div>

    );

}