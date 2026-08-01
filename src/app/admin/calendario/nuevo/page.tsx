import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { EventForm } from "@/components/admin/EventForm";
import { createEvent } from "../actions";

export default function NewEventPage() {
  return (
    <div>
      <AdminPageHeader kicker="Calendario" title="Nuevo evento" />
      <EventForm onSave={createEvent} />
    </div>
  );
}
