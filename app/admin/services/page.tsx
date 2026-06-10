import ServiceForm
from "@/components/Admin/ServiceForm";

import ServiceTable
from "@/components/Admin/ServiceTable";

import {
  getServices,
} from "@/services/service.service";

export default async function ServicesPage() {

  const services =
    await getServices();

  return (

    <div>

      <h1 className="text-3xl font-bold mb-6">
        Services
      </h1>

      <ServiceForm />

      <ServiceTable
        services={services}
      />

    </div>

  );

}