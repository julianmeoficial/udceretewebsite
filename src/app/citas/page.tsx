import { CitationTool } from "@/components/citations/CitationTool";
import styles from "./page.module.css";

export default function CitationPage() {
  return (
    <div className={styles.page}>
      <div className="container">
        <header className={styles.header}>
          <p className={styles.kicker}>HERRAMIENTAS</p>
          <h1 className={styles.title}>Generador de citas</h1>
          <p className={styles.subtitle}>
            Formatea referencias en APA 7 o Vancouver. En este prototipo los DOI se resuelven con
            un catálogo local de demostración.
          </p>
        </header>
        <CitationTool idPrefix="citas" />
      </div>
    </div>
  );
}
