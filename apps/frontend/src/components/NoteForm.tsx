'use client';

import { useState } from "react";

export default function NoteForm({
  onSubmit,
  onCancel,
}: {
  onSubmit: (payload: { title: string; body: string }) => void | Promise<void>;
  onCancel: () => void;
}) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [busy, setBusy] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;
    setBusy(true);
    try {
      await onSubmit({ title: title.trim(), body: body.trim() });
    } finally {
      setBusy(false);
    }
  }

  return (
    <form className="form-grid panel" onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor="title">Title</label>
        <input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="What’s on your mind?"
          required
        />
      </div>
      <div className="field">
        <label htmlFor="body">Body</label>
        <textarea
          id="body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows={8}
          placeholder="Write the note…"
        />
      </div>
      <div className="actions">
        <button type="submit" className="btn btn-primary" disabled={busy}>
          {busy ? "Saving…" : "Save note"}
        </button>
        <button type="button" className="btn btn-ghost" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
}
