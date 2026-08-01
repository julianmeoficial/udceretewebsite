import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { UsersManager } from "@/components/admin/UsersManager";
import { getUsers, updateUser } from "./actions";

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
