import { ref } from "vue";
import { TICKETS_KEY } from "../lib/session";

const load = () => {
  try {
    return JSON.parse(localStorage.getItem(TICKETS_KEY) || "[]");
  } catch {
    return [];
  }
};
const save = (arr) => localStorage.setItem(TICKETS_KEY, JSON.stringify(arr));

export function useTickets() {
  const tickets = ref(load());

  const validate = (t) => {
    const e = {};
    if (!t.title || t.title.trim().length < 3)
      e.title = "Title must be at least 3 characters.";
    if (!["open", "in_progress", "closed"].includes(t.status))
      e.status = "Status must be open, in_progress, or closed.";
    if (t.description && t.description.length > 500)
      e.description = "Description too long (max 500).";
    return e;
  };

  const create = (t) => {
    const e = validate(t);
    if (Object.keys(e).length) return { ok: false, errors: e };
    const item = {
      ...t,
      id: crypto.randomUUID(),
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    tickets.value = [item, ...tickets.value];
    save(tickets.value);
    return { ok: true };
  };

  const update = (id, patch) => {
    const idx = tickets.value.findIndex((x) => x.id === id);
    if (idx < 0) return { ok: false, errors: { form: "Not found" } };
    const cand = { ...tickets.value[idx], ...patch, updatedAt: Date.now() };
    const e = validate(cand);
    if (Object.keys(e).length) return { ok: false, errors: e };
    tickets.value.splice(idx, 1, cand);
    save(tickets.value);
    return { ok: true };
  };

  const remove = (id) => {
    tickets.value = tickets.value.filter((x) => x.id !== id);
    save(tickets.value);
  };

  return { tickets, create, update, remove };
}
