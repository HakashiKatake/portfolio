import { getRecentContactMessages } from "@/lib/contact-messages";

export const dynamic = "force-dynamic";

interface AdminPageProps {
  searchParams: Promise<{ key?: string }>;
}

function formatDate(value: Date) {
  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

export default async function AdminPage({ searchParams }: AdminPageProps) {
  const { key } = await searchParams;
  const expectedKey = process.env.ADMIN_ACCESS_KEY;
  const requiresKey = Boolean(expectedKey);
  const isAuthorized = !requiresKey || key === expectedKey;

  if (!isAuthorized) {
    return (
      <main style={{ padding: "2rem", fontFamily: "monospace" }}>
        <h1>Admin Inbox</h1>
        <p>Unauthorized.</p>
        <p>Open this page using: <code>/admin?key=YOUR_ADMIN_ACCESS_KEY</code></p>
      </main>
    );
  }

  let messages: Awaited<ReturnType<typeof getRecentContactMessages>> = [];
  let loadError = "";
  try {
    messages = await getRecentContactMessages(200);
  } catch (error) {
    loadError = error instanceof Error ? error.message : "Failed to load messages.";
  }

  return (
    <main style={{ padding: "2rem", fontFamily: "monospace", color: "#e9d5ff", background: "#090816", minHeight: "100vh" }}>
      <h1 style={{ marginBottom: "1rem" }}>Admin Inbox</h1>
      <p style={{ marginBottom: "1.5rem", color: "#c4b5fd" }}>
        {messages.length} message{messages.length === 1 ? "" : "s"} loaded.
      </p>

      {loadError ? <p style={{ color: "#fda4af" }}>{loadError}</p> : null}

      {messages.length === 0 ? (
        <p style={{ color: "#c4b5fd" }}>No messages yet.</p>
      ) : (
        <div style={{ display: "grid", gap: "1rem" }}>
          {messages.map((message) => (
            <article key={message._id.toString()} style={{ border: "1px solid #6d28d9", padding: "1rem", background: "rgba(30, 27, 75, 0.8)" }}>
              <p style={{ margin: 0, color: "#ddd6fe" }}>
                <strong>{message.name}</strong> · {message.email}
              </p>
              <p style={{ margin: "0.4rem 0", color: "#a78bfa" }}>
                {formatDate(message.createdAt)} · {message.source}
              </p>
              <p style={{ margin: "0.6rem 0 0", whiteSpace: "pre-wrap", lineHeight: 1.5 }}>{message.message}</p>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}
