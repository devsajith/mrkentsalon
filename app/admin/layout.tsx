import AuthGuard from "@/components/Admin/AuthGuard";
import AdminSidebar from "@/components/Admin/AdminSidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <div className="min-h-screen flex flex-col md:flex-row">
        <AdminSidebar />

        <main className="flex-1 bg-surface/30 p-4 md:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </AuthGuard>
  );
}