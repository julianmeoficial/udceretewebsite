# Autenticación y permisos

> **@mvp** — La autenticación actual es una simulación para validar flujos del panel admin. No usar en producción.

---

## Sesión demo

### Cookie

| Propiedad | Valor |
|-----------|-------|
| Nombre | `udc_session` |
| Contenido | JSON `{ email, name, role, expiresAt }` |
| TTL | 24 horas (`SESSION_MAX_AGE_MS`) |
| Definición | [`src/lib/auth/types.ts`](../../src/lib/auth/types.ts) |

### Roles

| Rol | Etiqueta | Descripción |
|-----|----------|-------------|
| `superadmin` | Superadmin | Acceso total, incluye usuarios y ajustes |
| `centro_admin` | Admin del centro | Gestión de contenido (artículos, recursos, calendario, bienestar) |

---

## Flujo de acceso

1. Usuario visita `/acceso`
2. Puede usar magic-link simulado o el panel demo (`AdminDemoPanel`)
3. Server action (`signInDemoSuperadmin` / `signInDemoCentroAdmin`) crea la cookie
4. Redirect al destino (`next` param) o `/admin`

Cerrar sesión: `signOut` elimina la cookie.

### Usuarios demo

Definidos en `DEMO_USERS` de `types.ts` (marcados `@mvp`):

| Rol | Email |
|-----|-------|
| superadmin | `superadmin@unicartagena.edu.co` |
| centro_admin | `admin.cerete@unicartagena.edu.co` |

---

## Middleware

[`src/middleware.ts`](../../src/middleware.ts) protege `/admin/*`:

```
Request a /admin/*
    → ¿Cookie válida y no expirada?
        No  → redirect /acceso?next={pathname}
        Sí  → ¿Ruta superadmin-only y rol ≠ superadmin?
                Sí  → redirect /admin
                No  → continuar
```

Rutas exclusivas de superadmin:

- `/admin/usuarios`
- `/admin/ajustes`

---

## Matriz de permisos

Definida en [`src/lib/auth/permissions.ts`](../../src/lib/auth/permissions.ts).

### Secciones admin

| Sección | superadmin | centro_admin |
|---------|:----------:|:------------:|
| dashboard | ✓ | ✓ |
| articulos | ✓ | ✓ |
| recursos | ✓ | ✓ |
| calendario | ✓ | ✓ |
| bienestar | ✓ | ✓ |
| usuarios | ✓ | — |
| ajustes | ✓ | — |

### Funciones

| Función | Comportamiento |
|---------|----------------|
| `canAccessSection(role, section)` | ¿Puede ver la sección en el sidebar? |
| `canManageContent(role)` | ¿Puede crear/editar/eliminar contenido? |
| `roleLabel(role)` | Etiqueta legible del rol |

`canManageContent` devuelve `true` para ambos roles. La restricción fina está en `canAccessSection` y el middleware.

---

## Uso en componentes

- `getSession()` — lectura de sesión en server components
- `requireSession()` — lanza si no hay sesión (server actions)
- `AdminShell` filtra nav según `canAccessSection`
- Server actions validan permisos antes de mutar

---

## Migración a auth real

Conservar:

1. Patrón de middleware con matcher `/admin/:path*`
2. Tipo `SessionUser` y separación rol/permisos
3. `canAccessSection` como base de ACL

Reemplazar:

1. Cookie JSON por token/sesión institucional
2. `DEMO_USERS` y acciones demo
3. Validación de expiración en servidor con store real
