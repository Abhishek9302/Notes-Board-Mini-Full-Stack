'use client';

import Link from "next/link";
import { type CSSProperties } from "react";
import { type Note } from "@/lib/api";

export default function NoteCard({
  note,
  onDelete,
  style,
}: {
  note: Note;
  onDelete: (id: string) => void;
  style?: CSSProperties;
}) {
  return (
    <article className="note-card" style={style}>
      <div className="note-card-top">
        <Link href={`/notes/${note.id}`}>
          <h3>{note.title}</h3>
        </Link>
        <button type="button" className="btn btn-danger" onClick={() => onDelete(note.id)}>
          Delete
        </button>
      </div>
      <p>{note.body.length > 140 ? `${note.body.slice(0, 140)}…` : note.body}</p>
      <time dateTime={note.created_at}>{new Date(note.created_at).toLocaleString()}</time>
    </article>
  );
}
