'use client';

import { useRouter } from "next/navigation";
import Link from "next/link";
import { createNote } from "@/lib/api";
import NoteForm from "@/components/NoteForm";

export default function NewNotePage() {
  const router = useRouter();

  async function handleSubmit(payload: { title: string; body: string }) {
    await createNote(payload);
    router.push("/");
  }

  return (
    <main className="shell">
      <Link href="/" className="back-link">
        ← Back to board
      </Link>
      <header className="brand-bar">
        <div className="brand">
          <h1>New Note</h1>
          <p>Add a title and a few lines — it lands on the board immediately.</p>
        </div>
      </header>
      <NoteForm onSubmit={handleSubmit} onCancel={() => router.push("/")} />
    </main>
  );
}
