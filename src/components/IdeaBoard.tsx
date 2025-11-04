import { useMemo, useState, type CSSProperties } from "react";
import styles from "./IdeaBoard.module.css";

type Idea = {
  title: string;
  description: string;
  cta: string;
  tone: "dreamy" | "kinetic" | "playful" | "minimal";
};

const baseIdeas: Idea[] = [
  {
    title: "Pulse Atlas",
    description:
      "Map ambient energy across a city and turn live data into harmonic waves that dance with every passerby.",
    cta: "Prototype the soundscape",
    tone: "kinetic"
  },
  {
    title: "Fragment Stories",
    description:
      "Collect micro-moments from strangers and weave them into shimmering narrative tapestries in real time.",
    cta: "Spin the next tale",
    tone: "dreamy"
  },
  {
    title: "Echo Garden",
    description:
      "Plant voice notes like seeds, let them grow into interactive blooms that visitors can remix and re-seed.",
    cta: "Plant a whisper",
    tone: "playful"
  },
  {
    title: "Signal Loom",
    description:
      "Translate the hidden rhythms of APIs into living textiles that shift with server mood swings.",
    cta: "Weave the fabric",
    tone: "minimal"
  }
];

const toneCopy: Record<Idea["tone"], string> = {
  dreamy: "Dreamy",
  kinetic: "Kinetic",
  playful: "Playful",
  minimal: "Minimalist"
};

type IdeaBoardProps = {
  palette: string[];
};

const IdeaBoard = ({ palette }: IdeaBoardProps) => {
  const [selectedTone, setSelectedTone] = useState<Idea["tone"] | "all">("all");

  const ideas = useMemo(() => {
    if (selectedTone === "all") return baseIdeas;
    return baseIdeas.filter((idea) => idea.tone === selectedTone);
  }, [selectedTone]);

  return (
    <section className={styles.board}>
      <header>
        <h2>Prototype prompts</h2>
        <p>
          Pick a tone, remix an idea, and let the canvas guide the next
          experiment.
        </p>
        <div className={styles.filters}>
          <button
            type="button"
            className={selectedTone === "all" ? styles.active : ""}
            onClick={() => setSelectedTone("all")}
          >
            All
          </button>
          {(Object.keys(toneCopy) as Idea["tone"][]).map((tone) => (
            <button
              type="button"
              key={tone}
              className={selectedTone === tone ? styles.active : ""}
              onClick={() => setSelectedTone(tone)}
            >
              {toneCopy[tone]}
            </button>
          ))}
        </div>
      </header>
      <div className={styles.grid}>
        {ideas.map((idea) => (
          <article
            key={idea.title}
            style={
              {
                "--accent": palette[0],
                "--accentSoft": palette[1]
              } as CSSProperties
            }
          >
            <h3>{idea.title}</h3>
            <p>{idea.description}</p>
            <button type="button">{idea.cta}</button>
          </article>
        ))}
      </div>
    </section>
  );
};

export default IdeaBoard;
