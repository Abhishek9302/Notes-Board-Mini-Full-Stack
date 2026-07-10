'use client';

import Link from "next/link";
import { type Note } from "@/lib/api";

export default function NoteCard({ note, onDelete }: { note: Note; onDelete: (id: string) => void }) {
  return (
    <div style={{ background: "#fff", borderRadius: 8, padding: 16, boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <Link href={`/notes/${note.id}`} style={{ textDecoration: "none", color: "inherit" }}>
          <h3 style={{ margin: "0 0 8px" }}>{note.title}</h3>
        </Link>
        <button onClick={() => onDelete(note.id)} style={{ cursor: "pointer" }}>Delete</button>
      </div>
      <p style={{ margin: 0, color: "#555", whiteSpace: "pre-wrap" }}>
        {note.body.length > 120 ? note.body.slice(0, 120) + "…" : note.body}
      </p>
      <small style={{ color: "#888" }}>
        {new Date(note.created_at).toLocaleString()}
      </small>
    </div>
  );
}
