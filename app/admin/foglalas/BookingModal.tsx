import React from "react";

type Props = {
  formTitle?: string;
  form: {
    title: string;
    date: string;
    startTime: string;
    endTime: string;
    note: string;
  };
  onChange: (form: any) => void;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  editId?: string | null;
  onDelete?: () => void;
};

export default function BookingModal({
  formTitle = "Új időpont foglalás",
  form,
  onChange,
  onClose,
  onSubmit,
  editId,
  onDelete,
}: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 px-2 sm:px-4">
      <div
        className="
          bg-white rounded-2xl shadow-xl p-4 sm:p-8 w-full
          max-w-xs sm:max-w-md md:max-w-lg
          relative flex flex-col
        "
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-5 text-gray-600 hover:text-gray-900 text-xl font-bold"
          title="Bezárás"
          aria-label="Bezárás"
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-5 text-gray-900">{editId ? "Időpont szerkesztése" : formTitle}</h2>
        <form className="space-y-4 flex flex-col" onSubmit={onSubmit}>
          <div>
            <label className="block font-semibold mb-1 text-gray-900">Név/Megnevezés</label>
            <input
              type="text"
              required
              value={form.title}
              onChange={e => onChange({ ...form, title: e.target.value })}
              className="w-full border border-gray-300 px-3 py-2 rounded-md text-gray-900 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Páciens neve vagy esemény"
            />
          </div>
          <div>
            <label className="block font-semibold mb-1 text-gray-900">Dátum</label>
            <input
              type="date"
              required
              value={form.date}
              onChange={e => onChange({ ...form, date: e.target.value })}
              className="w-full border border-gray-300 px-3 py-2 rounded-md text-gray-900 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
              
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label className="block font-semibold mb-1 text-gray-900">Kezdés</label>
              <div className="relative">
                <input
                  type="time"
                  required
                  value={form.startTime}
                  min="06:00"
                  max="22:00"
                  onChange={e => onChange({ ...form, startTime: e.target.value })}
                  className="w-full border border-gray-300 px-3 py-2 rounded-md text-gray-900 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
                <span className="absolute top-2 right-3 text-gray-400 pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                    <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
                  </svg>
                </span>
              </div>
            </div>
            <div className="flex-1">
              <label className="block font-semibold mb-1 text-gray-900">Befejezés</label>
              <div className="relative">
                <input
                  type="time"
                  required
                  value={form.endTime}
                  min="06:00"
                  max="22:00"
                  onChange={e => onChange({ ...form, endTime: e.target.value })}
                  className="w-full border border-gray-300 px-3 py-2 rounded-md text-gray-900 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
                <span className="absolute top-2 right-3 text-gray-400 pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                    <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
                  </svg>
                </span>
              </div>
            </div>
          </div>
          <div>
            <label className="block font-semibold mb-1 text-gray-900">Megjegyzés</label>
            <textarea
              value={form.note}
              onChange={e => onChange({ ...form, note: e.target.value })}
              className="w-full border border-gray-300 px-3 py-2 rounded-md text-gray-900 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Pl. sérülés típusa, terápia, megjegyzés"
              rows={2}
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-3 mt-2">
            <button
              type="submit"
              className="bg-blue-900 text-white py-2 px-4 rounded-md font-bold w-full hover:bg-blue-800 transition"
            >
              {editId ? "Módosítás mentése" : "Mentés"}
            </button>
            {editId && onDelete && (
              <button
                type="button"
                onClick={onDelete}
                className="bg-red-600 text-white py-2 px-4 rounded-md font-bold w-full hover:bg-red-700 transition"
              >
                Törlés
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}