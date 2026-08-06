"use server";

import { redirect } from "next/navigation";
import type { CalendarEvent, Category } from "@/data/types";
import { canManageContent } from "@/lib/auth/permissions";
import { requireSession } from "@/lib/auth/session";
import { readCmsEvents } from "@/lib/cms/read";
import { revalidatePublicEvents } from "@/lib/cms/revalidate";
import { createId } from "@/lib/cms/utils";
import { writeCmsEvents } from "@/lib/cms/write";

type EventInput = {
  title: string;
  date: string;
  endDate?: string;
  category: Category;
  description: string;
  location?: string;
};

async function assertCanEdit() {
  const session = await requireSession();
  if (!canManageContent(session.role)) throw new Error("No autorizado");
  return session;
}

export async function createEvent(input: EventInput) {
  await assertCanEdit();
  if (!input.title.trim()) return { error: "El título es obligatorio." };
  if (!input.date) return { error: "La fecha es obligatoria." };

  const events = await readCmsEvents();
  const event: CalendarEvent = {
    id: createId("evt"),
    title: input.title.trim(),
    date: input.date,
    endDate: input.endDate?.trim() || undefined,
    category: input.category,
    description: input.description.trim(),
    location: input.location?.trim() || undefined,
  };

  await writeCmsEvents([event, ...events]);
  revalidatePublicEvents();
  redirect("/admin/calendario");
}

export async function updateEvent(id: string, input: EventInput) {
  await assertCanEdit();
  if (!input.title.trim()) return { error: "El título es obligatorio." };

  const events = await readCmsEvents();
  const index = events.findIndex((item) => item.id === id);
  if (index === -1) return { error: "Evento no encontrado." };

  events[index] = {
    ...events[index],
    title: input.title.trim(),
    date: input.date,
    endDate: input.endDate?.trim() || undefined,
    category: input.category,
    description: input.description.trim(),
    location: input.location?.trim() || undefined,
  };

  await writeCmsEvents(events);
  revalidatePublicEvents();
  return { success: true };
}

export async function deleteEvent(id: string) {
  await assertCanEdit();
  const events = await readCmsEvents();
  await writeCmsEvents(events.filter((item) => item.id !== id));
  revalidatePublicEvents();
  redirect("/admin/calendario");
}

export async function getEventById(id: string) {
  const events = await readCmsEvents();
  return events.find((item) => item.id === id);
}
