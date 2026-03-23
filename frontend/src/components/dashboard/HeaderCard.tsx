import type { Client } from "@/types";

type Props = {
  client?: Client;
  onOpenAddTask: () => void;
};

export default function HeaderCard({ client, onOpenAddTask }: Props) {
  return (
    <section className="rounded-[28px] border border-slate-200 bg-white px-6 py-6 shadow-sm">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-[22px] font-semibold tracking-tight text-slate-900 md:text-[24px]">
            {client?.companyName || "Select a client"}
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            {client ? `${client.country} • ${client.entityType}` : "No client selected"}
          </p>
        </div>

        <button
          onClick={onOpenAddTask}
          className="h-12 rounded-2xl bg-teal-700 px-5 text-sm font-semibold text-white transition hover:bg-teal-800"
        >
          + New Task
        </button>
      </div>
    </section>
  );
}