'use client';

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { getNote, deleteNote, type Note } from "@/lib/api";

export default function NoteDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [note, setNote] = useState<Note | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    getNote(id)
      .then((n) => {
        setNote(n);
        setLoading(false);
      })
      .catch((e) => {
        setError(e instanceof Error ? e.message : String(e));
        setLoading(false);
      });
  }, [id]);

  async function handleDelete() {
    if (!note) return;
    if (!confirm("Delete this note?")) return;
    try {
      await deleteNote(note.id);
      router.push("/");
    } catch (e) {
      alert(e instanceof Error ? e.message : String(e));
    }
  }

  if (loading) {
    return (
      <main className="shell">
        <p className="status">Loading note…</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="shell">
        <p className="status error">{error}</p>
        <Link href="/" className="back-link">
          ← Back to board
        </Link>
      </main>
    );
  }

  if (!note) {
    return (
      <main className="shell">
        <p className="status">Note not found.</p>
        <Link href="/" className="back-link">
          ← Back to board
        </Link>
      </main>
    );
  }

  return (
    <main className="shell">
      <Link href="/" className="back-link">
        ← Back to board
      </Link>
      <article className="panel">
        <h1 className="detail-title">{note.title}</h1>
        <p className="detail-body">{note.body}</p>
        <p className="meta">{new Date(note.created_at).toLocaleString()}</p>
        <div className="actions" style={{ marginTop: "1.5rem" }}>
          <button type="button" className="btn btn-danger" onClick={handleDelete}>
            Delete note
          </button>
        </div>
      </article>
    </main>
  );
}
