interface PageIntroProps {
  label: string;
  title: string;
  summary: string;
  aside?: React.ReactNode;
}

export default function PageIntro({ label, title, summary, aside }: PageIntroProps) {
  return (
    <section className="simple-intro">
      <div className="simple-intro-main">
        <p className="simple-eyebrow">{label}</p>
        <h1 className="simple-title">{title}</h1>
        <p className="simple-summary">{summary}</p>
      </div>
      {aside ? <aside className="simple-intro-aside">{aside}</aside> : null}
    </section>
  );
}
