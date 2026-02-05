import React from "react";
import { Rubric, Note, getRemedyFullName } from "./data";

interface SelectedRemedyData {
  abbr: string;
  grade: number;
  fullForm?: string;
  description?: string;
}

interface RubricItemProps {
  rubric: Rubric;
  chapterId?: string;
  isSelected: boolean;
  compareMode: boolean;
  onToggleSelection: (rubricId: string) => void;
  onShowRemedyPanel: (
    abbr: string,
    grade: number,
    fullForm?: string,
    description?: string,
  ) => void;
  selectedRemedy?: SelectedRemedyData;
  onSelectRemedy: (rubricId: string, data: SelectedRemedyData) => void;
  allNotes: Note[];
  noteDraft: string;
  onUpdateDraft: (text: string) => void;
  onSaveNote: () => void;
  onCancelDraft: () => void;
  userId?: string | null;
  isOpen?: boolean;
  onToggle: () => void;
}

export const RubricItem = React.memo(function RubricItem({
  rubric,
  isSelected,
  compareMode,
  onToggleSelection,
  onShowRemedyPanel,
  selectedRemedy,
  onSelectRemedy,
  allNotes,
  noteDraft,
  onUpdateDraft,
  onSaveNote,
  onCancelDraft,
  userId,
  isOpen,
  onToggle,
}: RubricItemProps) {
  return (
    <details
      open={isOpen}
      className={`group rounded-xl border bg-slate-900/80 text-xs transition-colors ${
        isSelected
          ? "border-sky-400/70 shadow-[0_0_0_1px_rgba(56,189,248,0.4)]"
          : "border-slate-700 hover:border-slate-500"
      }`}
    >
      <summary
        className="flex cursor-pointer list-none items-center gap-3 px-4 py-3"
        onClick={(e) => {
          e.preventDefault();
          onToggle();
        }}
      >
        {compareMode && (
          <button
            type="button"
            className={`flex h-5 w-5 items-center justify-center rounded-md border text-[11px] transition-colors ${
              isSelected
                ? "border-sky-400 bg-sky-500 text-white"
                : "border-slate-600 bg-slate-800 text-slate-300 hover:border-sky-300"
            }`}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onToggleSelection(rubric.id);
            }}
          >
            {isSelected && "✓"}
          </button>
        )}
        <div className="flex flex-1 items-baseline gap-2">
          <span className="font-serif text-sm font-semibold text-slate-50">
            {rubric.name}
          </span>
          <span className="rounded-full bg-slate-900 px-2 py-0.5 text-[10px] text-slate-400">
            {rubric.remedies.length} remedies
          </span>
        </div>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          className="h-4 w-4 text-slate-500 transition-transform group-open:rotate-90"
        >
          <path d="M9 18l6-6-6-6" />
        </svg>
      </summary>
      <div className="border-t border-slate-800 bg-slate-950/70 px-4 pb-4 pt-3 text-[11px] text-slate-200">
        <div>
          <div className="mb-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">
            Remedies
          </div>
          <div className="flex flex-wrap gap-1.5">
            {rubric.remedies.map((rem) => (
              <button
                key={`${rubric.id}-${rem.abbr}-${rem.grade}`}
                type="button"
                onClick={() =>
                  onSelectRemedy(rubric.id, {
                    abbr: rem.abbr,
                    grade: rem.grade,
                    fullForm: rem.fullForm,
                    description: rem.description,
                  })
                }
                className={`inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-[11px] ${
                  rem.grade === 3
                    ? "border-rose-400/60 bg-rose-500/15 text-rose-200 font-semibold"
                    : rem.grade === 2
                      ? "border-amber-300/60 bg-amber-400/15 text-amber-100"
                      : "border-slate-700 bg-slate-900 text-slate-200"
                }`}
              >
                <span
                  className={`h-1.5 w-1.5 rounded-full ${
                    rem.grade === 3
                      ? "bg-rose-400"
                      : rem.grade === 2
                        ? "bg-amber-300"
                        : "bg-slate-300"
                  }`}
                />
                {rem.abbr}
              </button>
            ))}
          </div>
        </div>

        {rubric.meaning && (
          <div className="mt-3 rounded-lg border-l-4 border-emerald-500/80 bg-slate-900/90 px-3 py-2">
            <div className="mb-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
              Meaning
            </div>
            <p className="text-[11px] leading-relaxed text-slate-200">
              {rubric.meaning}
            </p>
          </div>
        )}

        {selectedRemedy && (
          <div className="mt-3 rounded-md border text-[14px] border-sky-400/40 bg-slate-900 px-3 py-2">
            <div className="mt-1 gap-2 text-slate-200">
              <p className="inline-block mt-1 mb-2 py-1 px-2 rounded bg-slate-800">
                {selectedRemedy.abbr}
              </p>
              <p className="px-1.5 py-0.5 text-sm font-medium">
                {selectedRemedy.fullForm ||
                  getRemedyFullName(selectedRemedy.abbr, rubric.id)}
              </p>
              {selectedRemedy.description && (
                <p className="mt-1 text-xs text-slate-400 italic px-1.5">
                  {selectedRemedy.description}
                </p>
              )}
            </div>
          </div>
        )}

        {allNotes.length > 0 && (
          <div className="mt-3 space-y-2">
            <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
              Notes
            </div>
            {allNotes.map((note, idx) => (
              <div
                key={idx}
                className="rounded-md border border-slate-700 bg-slate-900/90 px-3 py-2"
              >
                <div className="mb-1 flex items-center justify-between">
                  <span
                    className={`rounded px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wide ${
                      note.type === "system"
                        ? "bg-emerald-500/20 text-emerald-200"
                        : "bg-sky-500/20 text-sky-200"
                    }`}
                  >
                    {idx === 0
                      ? "When to USE"
                      : idx === 1
                        ? "WHEN TO USE METAPHORICALLY"
                        : note.type}
                  </span>
                  {note.source && (
                    <span className="text-[9px] italic text-slate-400">
                      {note.source}
                    </span>
                  )}
                </div>
                <p className="text-[11px] leading-relaxed text-slate-200">
                  {note.text}
                </p>
              </div>
            ))}
          </div>
        )}

        {rubric.crossReferences && rubric.crossReferences.length > 0 && (
          <div className="mt-3">
            <div className="mb-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
              Cross References
            </div>
            <div className="flex flex-wrap gap-1.5">
              {rubric.crossReferences.map((ref, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1 rounded-md border border-slate-700 bg-slate-900 px-2 py-0.5 text-[10px] text-slate-200"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    className="h-3 w-3"
                  >
                    <path d="M10 6H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  {ref.chapter} › {ref.rubric}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="mt-3 border-t border-slate-800 pt-2.5">
          <div className="mb-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
            Add Your Note
          </div>
          <textarea
            value={noteDraft}
            onChange={(e) => onUpdateDraft(e.target.value)}
            placeholder={
              userId
                ? "Enter your note here..."
                : "Sign in to save personal notes."
            }
            disabled={!userId || true}
            className="mt-1 w-full min-h-[70px] rounded-md border border-slate-700 bg-slate-950 px-2.5 py-1.5 text-[11px] text-slate-100 outline-none ring-0 placeholder:text-slate-500 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 disabled:cursor-not-allowed disabled:opacity-70"
          />
          <div className="mt-2 flex justify-end gap-2">
            <button
              type="button"
              disabled={true}
              className="rounded-md border border-slate-600 bg-slate-900 px-2 py-1 text-[11px] text-slate-200 hover:border-slate-400"
              onClick={onCancelDraft}
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={!userId || true}
              className="rounded-md bg-emerald-500 px-3 py-1 text-[11px] font-medium text-emerald-950 shadow-sm hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-60"
              onClick={onSaveNote}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </details>
  );
});
