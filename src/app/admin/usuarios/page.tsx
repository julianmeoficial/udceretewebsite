import { AdminPageHeader } from "@/features/admin/components/AdminPageHeader";
import { UsersManager } from "@/features/admin/components/UsersManager";
import { getUsers, updateUser } from "@/features/admin/actions/users";

export default async function AdminUsersPage() {
  const users = await getUsers();

  return (
    <div>
      <AdminPageHeader
        kicker="Acceso"
        title="Usuarios demo"
        description="Gestiona roles y estado de cuentas de demostración."
      />
      <UsersManager users={users} onUpdate={updateUser} />
    </div>
  );
}
