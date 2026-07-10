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
        setError(String(e));
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
      alert(String(e));
    }
  }

  if (loading) return <main style={{ maxWidth: 720, margin: "0 auto", padding: 24 }}>Loading…</main>;
  if (error) return <main style={{ maxWidth: 720, margin: "0 auto", padding: 24, color: "red" }}>{error}</main>;
  if (!note) return <main style={{ maxWidth: 720, margin: "0 auto", padding: 24 }}>Not found</main>;

  return (
    <main style={{ maxWidth: 720, margin: "0 auto", padding: "24px" }}>
      <div style={{ marginBottom: 16 }}>
        <Link href="/">← Back</Link>
      </div>
      <h1 style={{ margin: "0 0 12px" }}>{note.title}</h1>
      <p style={{ whiteSpace: "pre-wrap", lineHeight: 1.6 }}>{note.body}</p>
      <small style={{ color: "#888" }}>{new Date(note.created_at).toLocaleString()}</small>
      <div style={{ marginTop: 24 }}>
        <button onClick={handleDelete} style={{ padding: "8px 16px", cursor: "pointer" }}>Delete</button>
      </div>
    </main>
  );
}
