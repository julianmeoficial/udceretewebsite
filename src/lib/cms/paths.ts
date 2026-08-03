/**
 * Rutas y nombres de archivos del CMS JSON local.
 * Conservar como mapa de colecciones al migrar a BD.
 */
import path from "path";

export const CMS_DIR = path.join(process.cwd(), "src/data/cms");

export const CMS_FILES = {
  posts: "posts.json",
  resources: "resources.json",
  events: "events.json",
  wellbeing: "wellbeing.json",
  users: "users.json",
  site: "site.json",
} as const;
