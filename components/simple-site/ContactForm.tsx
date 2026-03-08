"use client";

import { useState } from "react";
import { Button } from "pixel-retroui";
import { RETRO_THEME } from "@/components/simple-site/theme";

type FormState = {
  name: string;
  email: string;
  message: string;
};

const INITIAL_FORM: FormState = {
  name: "",
  email: "",
  message: "",
};

export default function ContactForm() {
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<{ type: "idle" | "success" | "error"; message: string }>({
    type: "idle",
    message: "",
  });

  const onChange = (field: keyof FormState) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus({ type: "idle", message: "" });

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setStatus({ type: "error", message: "Please fill all fields." });
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const payload = (await response.json()) as { error?: string };
      if (!response.ok) {
        setStatus({ type: "error", message: payload.error ?? "Could not send your message." });
        return;
      }

      setForm(INITIAL_FORM);
      setStatus({ type: "success", message: "Message sent. I will get back to you soon." });
    } catch {
      setStatus({ type: "error", message: "Network error. Please try again." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="simple-form-grid">
      <input
        value={form.name}
        onChange={onChange("name")}
        type="text"
        name="name"
        autoComplete="name"
        placeholder="Your name"
        className="simple-contact-input"
        maxLength={80}
      />
      <input
        value={form.email}
        onChange={onChange("email")}
        type="email"
        name="email"
        autoComplete="email"
        placeholder="Your email"
        className="simple-contact-input"
        maxLength={140}
      />
      <textarea
        value={form.message}
        onChange={onChange("message")}
        name="message"
        placeholder="Tell me about your game, role, or collaboration idea"
        className="simple-contact-textarea"
        rows={5}
        maxLength={4000}
      />
      <Button
        type="submit"
        disabled={submitting}
        bg={RETRO_THEME.buttonPrimaryBg}
        textColor={RETRO_THEME.buttonText}
        shadow={RETRO_THEME.buttonShadow}
        borderColor={RETRO_THEME.border}
        className="simple-retro-button simple-submit-button"
      >
        {submitting ? "Sending..." : "Send Inquiry"}
      </Button>
      {status.type !== "idle" ? (
        <p className={status.type === "success" ? "simple-form-status simple-form-status-success" : "simple-form-status simple-form-status-error"}>
          {status.message}
        </p>
      ) : null}
    </form>
  );
}
