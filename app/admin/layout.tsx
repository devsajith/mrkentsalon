import AuthGuard from "@/components/Admin/AuthGuard";
import AdminSidebar from "@/components/Admin/AdminSidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <div className="flex">
        <AdminSidebar />

        <main className="flex-1">
          {children}
        </main>
      </div>
    </AuthGuard>
  );
}