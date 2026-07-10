const API_BASE = process.env.NEXT_PUBLIC_API_URL || "";

export type Note = {
  id: string;
  title: string;
  body: string;
  created_at: string;
};

export async function getNotes(): Promise<Note[]> {
  const res = await fetch(`${API_BASE}/api/notes`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch notes");
  return res.json();
}

export async function getNote(id: string): Promise<Note> {
  const res = await fetch(`${API_BASE}/api/notes/${id}`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch note");
  return res.json();
}

export async function createNote(payload: { title: string; body: string }): Promise<Note> {
  const res = await fetch(`${API_BASE}/api/notes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to create note");
  return res.json();
}

export async function deleteNote(id: string): Promise<void> {
  const res = await fetch(`${API_BASE}/api/notes/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete note");
}
