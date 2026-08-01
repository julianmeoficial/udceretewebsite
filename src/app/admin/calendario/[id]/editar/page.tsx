import { notFound } from "next/navigation";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { EventForm } from "@/components/admin/EventForm";
import { getEventById, updateEvent, deleteEvent } from "../../actions";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EditEventPage({ params }: Props) {
  const { id } = await params;
  const event = await getEventById(id);
  if (!event) notFound();

  return (
    <div>
      <AdminPageHeader kicker="Calendario" title="Editar evento" description={event.title} />
      <EventForm
        event={event}
        onSave={updateEvent.bind(null, id)}
        onDelete={deleteEvent.bind(null, id)}
      />
    </div>
  );
}
