import type { Client } from "@/types";

type Props = {
  clients: Client[];
  selectedClientId: string;
  onSelect: (id: string) => void;
};

export default function ClientSidebar({
  clients,
  selectedClientId,
  onSelect,
}: Props) {
  return (
    <aside className="flex h-full min-h-0 flex-col rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h1 className="text-[20px] font-semibold tracking-tight text-slate-900">
            Compliance Tracker
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Multi-client compliance dashboard
          </p>
        </div>

        <div className="flex h-8 min-w-8 items-center justify-center rounded-full bg-slate-100 px-2 text-sm font-semibold text-slate-600">
          {clients.length}
        </div>
      </div>

      <div className="mb-3 text-sm font-semibold text-slate-800">Clients</div>

      <div className="flex-1 space-y-3 overflow-y-auto pr-1">
        {clients.map((client) => {
          const active = selectedClientId === client.id;

          return (
            <button
              key={client.id}
              onClick={() => onSelect(client.id)}
              className={`w-full rounded-2xl border px-4 py-4 text-left transition ${
                active
                  ? "border-teal-500 bg-slate-50 shadow-sm"
                  : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
              }`}
            >
              <div className="text-[18px] font-semibold leading-snug text-slate-900">
                {client.companyName}
              </div>
              <div className="mt-2 text-sm text-slate-500">
                {client.country} • {client.entityType}
              </div>
            </button>
          );
        })}
      </div>
    </aside>
  );
}