import { AdminPageHeader } from "@/features/admin/components/AdminPageHeader";
import { EventForm } from "@/features/calendar/components/EventForm";
import { createEvent } from "@/features/calendar/actions";

export default function NewEventPage() {
  return (
    <div>
      <AdminPageHeader kicker="Calendario" title="Nuevo evento" />
      <EventForm onSave={createEvent} />
    </div>
  );
}
