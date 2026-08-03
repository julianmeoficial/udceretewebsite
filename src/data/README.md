# `src/data` — seeds y configuración

| Ruta | Rol |
|------|-----|
| `cms/*.json` | Fuente de verdad editable por el admin (demo MVP) |
| `*.ts` | Seeds / fallbacks / config estática (`posts`, `nav`, `site`, …) |
| `types.ts` | Contrato de dominio — **conservar** al migrar CMS |

En producción: seeds → migraciones; JSON CMS → base de datos.
