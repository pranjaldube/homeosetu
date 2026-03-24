import React, { useState } from "react";
import { Rubric, Note, getRemedyFullName } from "./data";
import toast from "react-hot-toast";

interface SelectedRemedyData {
  id?: string;
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
  canEdit?: boolean;
  onRubricUpdated?: (id: string, name: string, meaning: string) => void;
  onRemedyAdded?: (rubricId: string, data: SelectedRemedyData) => void;
  onRemedyDeleted?: (rubricId: string, remedyId: string) => void;
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
  canEdit,
  onRubricUpdated,
  onRemedyAdded,
  onRemedyDeleted,
}: RubricItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(rubric.name);
  const [editMeaning, setEditMeaning] = useState(rubric.meaning || "");
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveEdit = async () => {
    setIsSaving(true);
    try {
      const res = await fetch("/api/kent-repertory/rubrics", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: rubric.id,
          name: editName,
          meaning: editMeaning || null,
        }),
      });
      if (res.ok) {
        setIsEditing(false);
        toast.success("Data saved");
        if (onRubricUpdated) onRubricUpdated(rubric.id, editName, editMeaning);
      } else {
        alert("Failed to update rubric");
      }
    } catch (e) {
      console.error(e);
      alert("Error updating rubric");
    } finally {
      setIsSaving(false);
    }
  };

  const [isEditingRemedy, setIsEditingRemedy] = useState(false);
  const [editRemedy, setEditRemedy] = useState<SelectedRemedyData | null>(null);
  const [isSavingRemedy, setIsSavingRemedy] = useState(false);
  const [isDeletingRemedy, setIsDeletingRemedy] = useState(false);

  const handleSaveRemedyEdit = async () => {
    if (!editRemedy?.id) return;
    setIsSavingRemedy(true);
    try {
      const res = await fetch("/api/kent-repertory/remedies", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editRemedy),
      });
      if (res.ok) {
        setIsEditingRemedy(false);
        // refresh data locally by telling parent
        onSelectRemedy(rubric.id, editRemedy);
        toast.success("Data saved");
      } else {
        alert("Failed to update remedy");
      }
    } catch (e) {
      console.error(e);
      alert("Error updating remedy");
    } finally {
      setIsSavingRemedy(false);
    }
  };

  const handleDeleteRemedy = async () => {
    if (!editRemedy?.id) return;
    if (!confirm("Are you sure you want to delete this remedy?")) return;
    setIsDeletingRemedy(true);
    try {
      const res = await fetch(
        `/api/kent-repertory/remedies?id=${editRemedy.id}`,
        {
          method: "DELETE",
        },
      );
      if (res.ok) {
        setIsEditingRemedy(false);
        if (onRemedyDeleted) onRemedyDeleted(rubric.id, editRemedy.id);
        toast.success("Remedy deleted");
      } else {
        alert("Failed to delete remedy");
      }
    } catch (e) {
      console.error(e);
      alert("Error deleting remedy");
    } finally {
      setIsDeletingRemedy(false);
    }
  };

  const [isAddingRemedy, setIsAddingRemedy] = useState(false);
  const [newRemedy, setNewRemedy] = useState<SelectedRemedyData>({
    abbr: "",
    grade: 1,
    fullForm: "",
    description: "",
  });
  const [isSavingNewRemedy, setIsSavingNewRemedy] = useState(false);

  const handleAddRemedy = async () => {
    setIsSavingNewRemedy(true);
    try {
      const res = await fetch("/api/kent-repertory/remedies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...newRemedy, rubricId: rubric.id }),
      });
      if (res.ok) {
        const addedRemedy = await res.json();
        setIsAddingRemedy(false);
        if (onRemedyAdded) onRemedyAdded(rubric.id, addedRemedy);
        toast.success("Remedy added");
      } else {
        alert("Failed to add remedy");
      }
    } catch (e) {
      console.error(e);
      alert("Error adding remedy");
    } finally {
      setIsSavingNewRemedy(false);
    }
  };

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
          {isEditing ? (
            <div
              className="flex flex-col gap-2 w-full pr-4"
              onClick={(e) => e.stopPropagation()}
            >
              <input
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="w-full rounded-md border border-slate-700 bg-slate-950 px-2 py-1 text-xs text-slate-100 outline-none focus:border-emerald-500"
                placeholder="Rubric Name"
              />
              <textarea
                value={editMeaning}
                onChange={(e) => setEditMeaning(e.target.value)}
                className="w-full rounded-md border border-slate-700 bg-slate-950 px-2 py-1 text-xs text-slate-100 outline-none focus:border-emerald-500 min-h-[50px]"
                placeholder="Meaning (optional)"
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="rounded-md border border-slate-600 px-2 py-1 text-[10px] text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSaveEdit}
                  disabled={isSaving}
                  className="rounded-md bg-emerald-500 px-2 py-1 text-[10px] text-emerald-950"
                >
                  {isSaving ? "Saving..." : "Save"}
                </button>
              </div>
            </div>
          ) : (
            <>
              <span className="font-serif text-sm font-semibold text-slate-50">
                {rubric.name}
              </span>
              <span className="rounded-full bg-slate-900 px-2 py-0.5 text-[10px] text-slate-400">
                {rubric.remedies.length} remedies
              </span>
              {canEdit && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setIsEditing(true);
                  }}
                  className="ml-2 text-[10px] text-sky-400 hover:text-sky-300"
                >
                  ✎ Edit
                </button>
              )}
            </>
          )}
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
          <div className="mb-1 flex items-center gap-2">
            <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">
              Remedies
            </div>
            {canEdit && (
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setIsAddingRemedy(true);
                  setNewRemedy({
                    abbr: "",
                    grade: 1,
                    fullForm: "",
                    description: "",
                  });
                }}
                className="text-[10px] text-emerald-400 hover:text-emerald-300"
              >
                + Add
              </button>
            )}
          </div>
          {isAddingRemedy && (
            <div className="flex flex-col gap-2 w-full mb-3 p-2 bg-slate-950 rounded border border-slate-700">
              <input
                type="text"
                value={newRemedy.abbr}
                onChange={(e) =>
                  setNewRemedy({ ...newRemedy, abbr: e.target.value })
                }
                className="w-full rounded-md border border-slate-700 bg-slate-900 px-2 py-1 text-xs text-slate-100 outline-none focus:border-emerald-500"
                placeholder="Abbreviation"
              />
              <input
                type="number"
                value={newRemedy.grade}
                onChange={(e) =>
                  setNewRemedy({
                    ...newRemedy,
                    grade: parseInt(e.target.value) || 1,
                  })
                }
                className="w-full rounded-md border border-slate-700 bg-slate-900 px-2 py-1 text-xs text-slate-100 outline-none focus:border-emerald-500"
                placeholder="Grade"
                min="1"
                max="4"
              />
              <input
                type="text"
                value={newRemedy.fullForm || ""}
                onChange={(e) =>
                  setNewRemedy({ ...newRemedy, fullForm: e.target.value })
                }
                className="w-full rounded-md border border-slate-700 bg-slate-900 px-2 py-1 text-xs text-slate-100 outline-none focus:border-emerald-500"
                placeholder="Full Form"
              />
              <textarea
                value={newRemedy.description || ""}
                onChange={(e) =>
                  setNewRemedy({ ...newRemedy, description: e.target.value })
                }
                className="w-full rounded-md border border-slate-700 bg-slate-900 px-2 py-1 text-xs text-slate-100 outline-none focus:border-emerald-500 min-h-[50px]"
                placeholder="Description"
              />
              <div className="flex justify-end gap-2 mt-1">
                <button
                  type="button"
                  onClick={() => setIsAddingRemedy(false)}
                  className="rounded-md border border-slate-600 px-2 py-1 text-[10px] text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleAddRemedy}
                  disabled={isSavingNewRemedy}
                  className="rounded-md bg-emerald-500 px-2 py-1 text-[10px] text-emerald-950"
                >
                  {isSavingNewRemedy ? "Saving..." : "Add"}
                </button>
              </div>
            </div>
          )}
          <div className="flex flex-wrap gap-1.5">
            {rubric.remedies.map((rem) => (
              <button
                key={`${rubric.id}-${rem.abbr}-${rem.grade}`}
                type="button"
                onClick={() => {
                  onSelectRemedy(rubric.id, {
                    id: rem.id,
                    abbr: rem.abbr,
                    grade: rem.grade,
                    fullForm: rem.fullForm,
                    description: rem.description,
                  });
                  setIsEditingRemedy(false);
                }}
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

        {selectedRemedy && (
          <div className="mt-3 rounded-md border text-[14px] border-sky-400/40 bg-slate-900 px-3 py-2">
            {isEditingRemedy ? (
              <div className="flex flex-col gap-2 w-full mt-1 pr-2 text-slate-100 text-xs">
                <input
                  type="text"
                  value={editRemedy?.abbr || ""}
                  onChange={(e) =>
                    setEditRemedy((prev) =>
                      prev ? { ...prev, abbr: e.target.value } : null,
                    )
                  }
                  className="w-full rounded-md border border-slate-700 bg-slate-950 px-2 py-1 outline-none focus:border-emerald-500"
                  placeholder="Abbreviation"
                />
                <input
                  type="number"
                  value={editRemedy?.grade || 1}
                  onChange={(e) =>
                    setEditRemedy((prev) =>
                      prev
                        ? { ...prev, grade: parseInt(e.target.value) || 1 }
                        : null,
                    )
                  }
                  className="w-full rounded-md border border-slate-700 bg-slate-950 px-2 py-1 outline-none focus:border-emerald-500"
                  placeholder="Grade"
                  min="1"
                  max="4"
                />
                <input
                  type="text"
                  value={editRemedy?.fullForm || ""}
                  onChange={(e) =>
                    setEditRemedy((prev) =>
                      prev ? { ...prev, fullForm: e.target.value } : null,
                    )
                  }
                  className="w-full rounded-md border border-slate-700 bg-slate-950 px-2 py-1 outline-none focus:border-emerald-500"
                  placeholder="Full Form"
                />
                <textarea
                  value={editRemedy?.description || ""}
                  onChange={(e) =>
                    setEditRemedy((prev) =>
                      prev ? { ...prev, description: e.target.value } : null,
                    )
                  }
                  className="w-full rounded-md border border-slate-700 bg-slate-950 px-2 py-1 outline-none focus:border-emerald-500 min-h-[50px]"
                  placeholder="Description"
                />
                <div className="flex justify-between gap-2 mt-1">
                  <button
                    type="button"
                    onClick={handleDeleteRemedy}
                    disabled={isDeletingRemedy || isSavingRemedy}
                    className="rounded-md border border-rose-800 bg-rose-950 px-2 py-1 text-[10px] text-rose-400 hover:bg-rose-900"
                  >
                    {isDeletingRemedy ? "Deleting..." : "Delete"}
                  </button>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setIsEditingRemedy(false)}
                      className="rounded-md border border-slate-600 px-2 py-1 text-[10px] text-slate-300"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleSaveRemedyEdit}
                      disabled={isSavingRemedy || isDeletingRemedy}
                      className="rounded-md bg-emerald-500 px-2 py-1 text-[10px] text-emerald-950"
                    >
                      {isSavingRemedy ? "Saving..." : "Save"}
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="mt-1 gap-2 text-slate-200 relative">
                <p className="inline-block mt-1 mb-2 py-1 px-2 rounded bg-slate-800">
                  {selectedRemedy.abbr}{" "}
                  <span className="opacity-50 text-xs ml-1">
                    (Grade {selectedRemedy.grade})
                  </span>
                </p>
                {canEdit && (
                  <button
                    type="button"
                    onClick={() => {
                      setEditRemedy(selectedRemedy);
                      setIsEditingRemedy(true);
                    }}
                    className="absolute top-1 right-1 text-[10px] text-sky-400 hover:text-sky-300"
                  >
                    ✎ Edit
                  </button>
                )}
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
            )}
          </div>
        )}

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

        {rubric.patientVersion && (
          <div className="mt-3 rounded-lg border-l-4 border-sky-500/80 bg-slate-900/90 px-3 py-2">
            <div className="mb-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
              Patient Version
            </div>
            <p className="text-[11px] leading-relaxed text-slate-200">
              {rubric.patientVersion}
            </p>
          </div>
        )}

        {rubric.patientVersion2 && (
          <div className="mt-3 rounded-lg border-l-4 border-sky-500/80 bg-slate-900/90 px-3 py-2">
            <div className="mb-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
              Patient Version 2
            </div>
            <p className="text-[11px] leading-relaxed text-slate-200">
              {rubric.patientVersion2}
            </p>
          </div>
        )}

        {rubric.whenToUse && (
          <div className="mt-3 rounded-lg border-l-4 border-indigo-500/80 bg-slate-900/90 px-3 py-2">
            <div className="mb-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
              When to Use
            </div>
            <p className="text-[11px] leading-relaxed text-slate-200">
              {rubric.whenToUse}
            </p>
          </div>
        )}

        {rubric.whenToUseAsMetaphor && (
          <div className="mt-3 rounded-lg border-l-4 border-indigo-500/80 bg-slate-900/90 px-3 py-2">
            <div className="mb-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
              When to Use as Metaphor
            </div>
            <p className="text-[11px] leading-relaxed text-slate-200">
              {rubric.whenToUseAsMetaphor}
            </p>
          </div>
        )}

        {rubric.crossReferenceByDrKent && (
          <div className="mt-3 rounded-lg border-l-4 border-fuchsia-500/80 bg-slate-900/90 px-3 py-2">
            <div className="mb-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
              Cross Reference by Dr. Kent
            </div>
            <p className="text-[11px] leading-relaxed text-slate-200">
              {rubric.crossReferenceByDrKent}
            </p>
          </div>
        )}

        {rubric.crossReferenceByHomeosetu && (
          <div className="mt-3 rounded-lg border-l-4 border-fuchsia-500/80 bg-slate-900/90 px-3 py-2">
            <div className="mb-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
              Cross Reference by Homeosetu
            </div>
            <p className="text-[11px] leading-relaxed text-slate-200">
              {rubric.crossReferenceByHomeosetu}
            </p>
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
