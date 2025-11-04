import { useMemo, useState } from "react";
import GenerativeCanvas from "./components/GenerativeCanvas";
import IdeaBoard from "./components/IdeaBoard";
import styles from "./App.module.css";

const palettes = [
  ["#0E0B16", "#4717F6", "#A239CA", "#FFFDFF"],
  ["#001514", "#FBFFFE", "#ACFCD9", "#76E7CD"],
  ["#202020", "#F46036", "#2E294E", "#1B998B"],
  ["#011627", "#FDFFFC", "#2EC4B6", "#E71D36"]
];

function App() {
  const [paletteIndex, setPaletteIndex] = useState(0);
  const palette = useMemo(() => palettes[paletteIndex], [paletteIndex]);

  return (
    <main className={styles.main}>
      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <h1>Agentic Playground</h1>
          <p>
            An evolving canvas that dreams in color, builds ideas on the fly,
            and invites you to remix the future in real time.
          </p>
          <div className={styles.palettePicker}>
            {palettes.map((option, idx) => (
              <button
                key={option.join("-")}
                type="button"
                className={idx === paletteIndex ? styles.paletteActive : ""}
                onClick={() => setPaletteIndex(idx)}
                aria-label={`Use palette ${idx + 1}`}
              >
                {option.map((shade) => (
                  <span key={shade} style={{ backgroundColor: shade }} />
                ))}
              </button>
            ))}
          </div>
        </div>
        <GenerativeCanvas palette={palette} />
      </section>
      <IdeaBoard palette={palette} />
      <footer className={styles.footer}>
        Built autonomously. Remix until it surprises you.
      </footer>
    </main>
  );
}

export default App;
