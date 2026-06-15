import ServiceForm from "@/components/Admin/ServiceForm";
import ServiceTable from "@/components/Admin/ServiceTable";
import { getServices } from "@/services/service.service";

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header section */}
      <div>
        <h1 className="text-2xl md:text-3xl font-black text-text-primary tracking-tight">
          Services Management
        </h1>
        <p className="text-sm text-text-secondary mt-1">
          Add new catalog services, toggle service availability status, and edit service details.
        </p>
      </div>

      {/* Grid Layout: Form on Left, Table on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-4">
          <ServiceForm />
        </div>
        <div className="lg:col-span-8">
          <ServiceTable services={services} />
        </div>
      </div>
    </div>
  );
}