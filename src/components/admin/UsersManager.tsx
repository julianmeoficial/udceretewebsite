"use client";

import { useState } from "react";
import type { CmsUser, UserRole } from "@/data/types";
import { roleLabel } from "@/lib/auth/permissions";
import styles from "./UsersManager.module.css";

type Props = {
  users: CmsUser[];
  onUpdate: (id: string, data: { role: UserRole; active: boolean }) => Promise<{ error?: string; success?: boolean }>;
};

export function UsersManager({ users: initialUsers, onUpdate }: Props) {
  const [users, setUsers] = useState(initialUsers);
  const [message, setMessage] = useState("");

  async function toggleActive(user: CmsUser) {
    const result = await onUpdate(user.id, { role: user.role, active: !user.active });
    if (!result.error) {
      setUsers((current) =>
        current.map((item) =>
          item.id === user.id ? { ...item, active: !item.active } : item,
        ),
      );
      setMessage("Usuario actualizado.");
    }
  }

  async function changeRole(user: CmsUser, role: UserRole) {
    const result = await onUpdate(user.id, { role, active: user.active });
    if (!result.error) {
      setUsers((current) =>
        current.map((item) => (item.id === user.id ? { ...item, role } : item)),
      );
      setMessage("Rol actualizado.");
    }
  }

  return (
    <div>
      {message ? <p className={styles.message} role="status">{message}</p> : null}
      <ul className={styles.list}>
        {users.map((user) => (
          <li key={user.id} className={styles.item}>
            <div>
              <p className={styles.name}>{user.name}</p>
              <p className={styles.email}>{user.email}</p>
            </div>
            <div className={styles.controls}>
              <select
                className={styles.select}
                value={user.role}
                onChange={(e) => changeRole(user, e.target.value as UserRole)}
                aria-label={`Rol de ${user.name}`}
              >
                <option value="superadmin">{roleLabel("superadmin")}</option>
                <option value="centro_admin">{roleLabel("centro_admin")}</option>
              </select>
              <button
                type="button"
                className={user.active ? styles.activeBtn : styles.inactiveBtn}
                onClick={() => toggleActive(user)}
              >
                {user.active ? "Activo" : "Inactivo"}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
