'use client';

import { useRouter } from "next/navigation";
import { createNote } from "@/lib/api";
import NoteForm from "@/components/NoteForm";

export default function NewNotePage() {
  const router = useRouter();

  async function handleSubmit(payload: { title: string; body: string }) {
    await createNote(payload);
    router.push("/");
  }

  return (
    <main style={{ maxWidth: 720, margin: "0 auto", padding: "24px" }}>
      <h1>New Note</h1>
      <NoteForm onSubmit={handleSubmit} onCancel={() => router.push("/")} />
    </main>
  );
}
