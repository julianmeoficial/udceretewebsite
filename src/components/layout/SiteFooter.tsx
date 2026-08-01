import Link from "next/link";
import styles from "./SiteFooter.module.css";

const platformLinks = [
  { label: "Blog", href: "/archivo" },
  { label: "Calendario", href: "/calendario" },
  { label: "Recursos", href: "/recursos" },
  { label: "Bienestar", href: "/bienestar" },
];

const institutionalLinks = [
  { label: "Contacto", href: "/acceso", external: false },
  {
    label: "SIMA",
    href: "https://sima.unicartagena.edu.co",
    external: true,
  },
  {
    label: "SMA",
    href: "https://sma.unicartagena.edu.co:8443/Smaix12/vista/mainMenu.jsp",
    external: true,
  },
  {
    label: "Universidad de Cartagena",
    href: "https://unicartagena.edu.co",
    external: true,
  },
];

const communityLinks = [
  { label: "Boletín", href: "/#boletin" },
  { label: "Suscribirse", href: "/#boletin" },
];

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.grid}>
          <div className={styles.brandBlock}>
            <p className={styles.kicker}>Universidad de Cartagena</p>
            <p className={styles.brandName}>Centro Tutorial Cereté</p>
            <p className={styles.desc}>
              Cereté, Córdoba · Colombia.
              <br />
              El Totumo Transversal 21A diagonal 16-130.
              <br />
              Tel: 3205003942
            </p>
          </div>

          <div>
            <p className={styles.heading}>Plataforma</p>
            <ul className={styles.links}>
              {platformLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={styles.link}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className={styles.heading}>Institucional</p>
            <ul className={styles.links}>
              {institutionalLinks.map((item) => (
                <li key={item.label}>
                  {item.external ? (
                    <a
                      href={item.href}
                      className={styles.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {item.label}
                    </a>
                  ) : (
                    <Link href={item.href} className={styles.link}>
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className={styles.heading}>Comunidad</p>
            <ul className={styles.links}>
              {communityLinks.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className={styles.link}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className={styles.bottom}>
          Prototipo MVP · {new Date().getFullYear()} · Universidad de Cartagena
        </p>
      </div>
    </footer>
  );
}
