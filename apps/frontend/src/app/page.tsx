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
      setError(e instanceof Error ? e.message : String(e));
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
      alert(e instanceof Error ? e.message : String(e));
    }
  }

  return (
    <main className="shell">
      <header className="brand-bar">
        <div className="brand">
          <h1>Notes Board</h1>
          <p>A quiet place for quick thoughts — create, open, and clear notes in one board.</p>
        </div>
        <Link href="/notes/new" className="btn btn-primary">
          New Note
        </Link>
      </header>

      {loading && <p className="status">Loading notes…</p>}
      {error && <p className="status error">Couldn’t load notes: {error}</p>}

      {!loading && !error && notes.length === 0 && (
        <div className="empty">No notes yet. Start with a new one.</div>
      )}

      <div className="notes-grid">
        {notes.map((note, index) => (
          <NoteCard key={note.id} note={note} onDelete={handleDelete} style={{ animationDelay: `${index * 40}ms` }} />
        ))}
      </div>
    </main>
  );
}
