function renderParagraph(text: string, key: string) {
  return (
    <p key={key} className="simple-article-paragraph">
      {text}
    </p>
  );
}

export default function MarkdownBlocks({ content }: { content: string }) {
  const lines = content.split("\n");
  const blocks: React.ReactNode[] = [];

  let index = 0;
  while (index < lines.length) {
    const line = lines[index]?.trim() ?? "";

    if (!line) {
      index += 1;
      continue;
    }

    if (line.startsWith("## ")) {
      blocks.push(
        <h2 key={`h2-${index}`} className="simple-article-h2">
          {line.replace(/^##\s+/, "")}
        </h2>
      );
      index += 1;
      continue;
    }

    if (line.startsWith("# ")) {
      blocks.push(
        <h1 key={`h1-${index}`} className="simple-article-h1">
          {line.replace(/^#\s+/, "")}
        </h1>
      );
      index += 1;
      continue;
    }

    if (line.startsWith("- ")) {
      const items: string[] = [];
      while (index < lines.length) {
        const current = lines[index]?.trim() ?? "";
        if (!current.startsWith("- ")) {
          break;
        }
        items.push(current.replace(/^-\s+/, ""));
        index += 1;
      }

      blocks.push(
        <ul key={`ul-${index}`} className="simple-article-list">
          {items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      );
      continue;
    }

    const paragraphLines: string[] = [line];
    index += 1;
    while (index < lines.length) {
      const current = lines[index]?.trim() ?? "";
      if (!current || current.startsWith("#") || current.startsWith("- ")) {
        break;
      }
      paragraphLines.push(current);
      index += 1;
    }

    blocks.push(renderParagraph(paragraphLines.join(" "), `p-${index}`));
  }

  return <div className="simple-article">{blocks}</div>;
}
