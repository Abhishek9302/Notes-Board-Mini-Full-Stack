'use client';

import { useEffect, useState } from "react";
import Link from "next/link";
import { getNotes, deleteNote, type Note } from "@/lib/api";
import NoteCard from "@/components/NoteCard";

export default function HomePage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    try {
      setLoading(true);
      setError(null);
      const data = await getNotes();
      setNotes(data);
    } catch (e) {
      setError(String(e));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function handleDelete(id: string) {
    if (!confirm("Delete this note?")) return;
    try {
      await deleteNote(id);
      setNotes((prev) => prev.filter((n) => n.id !== id));
    } catch (e) {
      alert(String(e));
    }
  }

  return (
    <main style={{ maxWidth: 720, margin: "0 auto", padding: "24px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <h1>Notes Board</h1>
        <Link href="/notes/new">
          <button style={{ padding: "8px 16px", cursor: "pointer" }}>New Note</button>
        </Link>
      </div>

      {loading && <p>Loading…</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && notes.length === 0 && <p>No notes yet.</p>}

      <div style={{ display: "grid", gap: 16 }}>
        {notes.map((note) => (
          <NoteCard key={note.id} note={note} onDelete={handleDelete} />
        ))}
      </div>
    </main>
  );
}
