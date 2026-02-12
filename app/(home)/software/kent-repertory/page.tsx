"use client";

import React, { useEffect, useMemo, useState, useCallback } from "react";
import Head from "next/head";
import { useUser } from "@clerk/nextjs";
import Chatbot from "@/components/chatbot";

import {
  getRemedyFullName,
  Rubric,
  Note,
  KentRepertory,
  Chapter,
} from "./data";
import { useKentAccessStore } from "@/hooks/acess";
import { useRouter } from "next/navigation";
import { Virtuoso } from "react-virtuoso";
import { RubricItem } from "./RubricItem";

// Book metadata type (from database)
type BookMetadata = {
  id: string;
  bookName: string;
  createdAt: string | Date;
};

// API Response Types
type ApiBookResponse = {
  book: {
    id: string;
    bookName: string;
    createdAt: string;
  };
  contents: Array<{
    id: string;
    name: string;
    icon: string;
    description?: string;
    bookId: string;
    rubrics: Array<{
      id: string;
      name: string;
      meaning?: string;
      chapterId: string;
      remedies: Array<{
        id: string;
        abbr: string;
        grade: number;
        rubricId: string;
        fullForm?: string;
        description?: string;
      }>;
      notes: Array<{
        id: string;
        type: string;
        source?: string;
        text: string;
        rubricId: string;
      }>;
      crossReferences: Array<{
        id: string;
        chapterTarget: string;
        rubricTarget: string;
        rubricId: string;
      }>;
    }>;
  }>;
};

// Transform API response to KentRepertory format
function transformApiBookToKentRepertory(
  apiData: ApiBookResponse,
): KentRepertory {
  return {
    bookName: apiData.book.bookName,
    chapters: (apiData.contents || []).map((content) => ({
      id: content.id,
      name: content.name,
      icon: content.icon || "📖",
      description: content.description || undefined,
      rubrics: (content.rubrics || []).map((rubric) => ({
        id: rubric.id,
        name: rubric.name,
        meaning: rubric.meaning || undefined,
        remedies: (rubric.remedies || []).map((remedy) => ({
          abbr: remedy.abbr,
          grade: remedy.grade,
          fullForm: remedy.fullForm || undefined,
          description: remedy.description || undefined,
        })),
        notes: (rubric.notes || []).map((note) => ({
          type: note.type,
          source: note.source || undefined,
          text: note.text,
        })),
        crossReferences: (rubric.crossReferences || []).map((crossRef) => ({
          chapter: crossRef.chapterTarget,
          rubric: crossRef.rubricTarget,
          rubricId: crossRef.rubricId,
        })),
      })),
    })),
  };
}

// Fetch book from API (Metadata + Chapters list only)
async function fetchBookFromAPI(
  bookId?: string,
  bookName?: string,
): Promise<{ book: KentRepertory | null; error: string | null }> {
  try {
    const params = new URLSearchParams();
    if (bookId) params.append("bookId", bookId);
    if (bookName) params.append("bookName", bookName);

    if (!bookId && !bookName) {
      return {
        book: null,
        error: "Either bookId or bookName must be provided",
      };
    }

    const response = await fetch(`/api/books/contents?${params.toString()}`);

    if (!response.ok) {
      let errorMessage = `Failed to fetch book: ${response.statusText}`;
      try {
        const errorData = await response.json();
        if (errorData.error) {
          errorMessage = errorData.error;
        }
      } catch {
        // If JSON parsing fails, use the default error message
      }
      return { book: null, error: errorMessage };
    }

    const data: ApiBookResponse = await response.json();

    // Validate the response structure
    if (!data || !data.book || !data.contents) {
      return { book: null, error: "Invalid response format from API" };
    }

    const transformedBook = transformApiBookToKentRepertory(data);
    return { book: transformedBook, error: null };
  } catch (error) {
    console.error("Error fetching book from API:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    return { book: null, error: `Network error: ${errorMessage}` };
  }
}

// Fetch specific chapter contents (Rubrics)
async function fetchChapterContents(
  chapterId: string,
): Promise<{ chapter: Chapter | null; error: string | null }> {
  try {
    const response = await fetch(`/api/books/contents?chapterId=${chapterId}`);

    if (!response.ok) {
      return { chapter: null, error: "Failed to fetch chapter contents" };
    }

    const data = await response.json();
    if (!data || !data.chapter) {
      return { chapter: null, error: "Invalid chapter data" };
    }

    // Transform single chapter response to match our internal `Chapter` type
    // We can reuse the logic from `transformApiBookToKentRepertory` but for a single item
    // Or just manually map it here since it's one item.
    const apiChapter = data.chapter; // Type matches part of ApiBookResponse['contents'][0]

    const transformedChapter: Chapter = {
      id: apiChapter.id,
      name: apiChapter.name,
      icon: apiChapter.icon || "📖",
      description: apiChapter.description || undefined,
      rubrics: (apiChapter.rubrics || []).map((rubric: any) => ({
        id: rubric.id,
        name: rubric.name,
        meaning: rubric.meaning || undefined,
        remedies: (rubric.remedies || []).map((remedy: any) => ({
          abbr: remedy.abbr,
          grade: remedy.grade,
          fullForm: remedy.fullForm || undefined,
          description: remedy.description || undefined,
        })),
        notes: (rubric.notes || []).map((note: any) => ({
          type: note.type,
          source: note.source || undefined,
          text: note.text,
        })),
        crossReferences: (rubric.crossReferences || []).map(
          (crossRef: any) => ({
            chapter: crossRef.chapterTarget,
            rubric: crossRef.rubricTarget,
            rubricId: crossRef.rubricId,
          }),
        ),
      })),
    };

    return { chapter: transformedChapter, error: null };
  } catch (error) {
    console.error("Error fetching chapter:", error);
    return { chapter: null, error: "Network error fetching chapter" };
  }
}

const MIND_CHAPTER_ID = "mind";

type MindNotePayload = {
  id: string;
  rubricId: string;
  chapterId: string;
  text: string;
  createdAt: string;
  userName?: string;
};

type UserNoteCache = Record<
  string,
  {
    text: string;
    timestamp: number;
    userName?: string;
  }[]
>;

type SelectedRubric = { rubricId: string; chapterId: string };

type SelectedRemedy = { abbr: string; fullName: string; grade: number };

type CommonRemedy = {
  abbr: string;
  fullName: string;
  description?: string;
  occurrences: {
    rubricId: string;
    rubricName: string;
    chapterName: string;
    bookName: string;
    grade: number;
  }[];
};

function buildNotesFromCache(
  userNotes: UserNoteCache,
  chapterId: string | undefined,
  rubricId: string,
): Note[] {
  if (!chapterId) return [];
  const key = `${chapterId}_${rubricId}`;
  const notes = userNotes[key] || [];
  return notes.map<Note>((n) => ({
    type: "user",
    source:
      [n.userName, new Date(n.timestamp).toLocaleDateString()]
        .filter(Boolean)
        .join(" • ") || undefined,
    text: n.text,
  }));
}

function getFilteredRubrics(
  chapter: Chapter | undefined,
  query: string,
): Rubric[] {
  if (!chapter) return [];
  const normalized = query.toLowerCase().trim();
  if (!normalized) return chapter.rubrics;

  return chapter.rubrics.filter((rubric) => {
    if (rubric.name.toLowerCase().includes(normalized)) return true;
    if (rubric.meaning && rubric.meaning.toLowerCase().includes(normalized))
      return true;
    if (rubric.remedies.some((r) => r.abbr.toLowerCase().includes(normalized)))
      return true;
    if (
      rubric.remedies.some((r) =>
        (r.fullForm || getRemedyFullName(r.abbr))
          .toLowerCase()
          .includes(normalized),
      )
    )
      return true;
    return false;
  });
}

function findCommonRemedies(
  selected: SelectedRubric[],
  book: KentRepertory | null,
): CommonRemedy[] {
  if (selected.length < 1 || !book) return [];

  const data: { rubric: Rubric; chapter: Chapter; book: KentRepertory }[] = [];

  selected.forEach((sel) => {
    const chapter = book.chapters.find((c) => c.id === sel.chapterId);
    if (!chapter) return;
    const rubric = chapter.rubrics.find((r) => r.id === sel.rubricId);
    if (!rubric) return;
    data.push({ rubric, chapter, book });
  });

  if (data.length < 1) return [];

  const map = new Map<string, CommonRemedy>();

  data.forEach(({ rubric, chapter, book }) => {
    rubric.remedies.forEach((remedy) => {
      const key = remedy.abbr.toLowerCase();
      if (!map.has(key)) {
        map.set(key, {
          abbr: remedy.abbr,
          fullName: remedy.fullForm || getRemedyFullName(remedy.abbr),
          description: remedy.description,
          occurrences: [],
        });
      }
      map.get(key)?.occurrences.push({
        rubricId: rubric.id,
        rubricName: rubric.name,
        chapterName: chapter.name,
        bookName: book.bookName,
        grade: remedy.grade,
      });
    });
  });

  const result = Array.from(map.values());

  result.sort((a, b) => {
    // Primary sort: Occurrence count (Descending)
    if (a.occurrences.length !== b.occurrences.length) {
      return b.occurrences.length - a.occurrences.length;
    }
    // Secondary sort: Total Score (Descending)
    const scoreA = a.occurrences.reduce((sum, o) => sum + o.grade, 0);
    const scoreB = b.occurrences.reduce((sum, o) => sum + o.grade, 0);
    return scoreB - scoreA;
  });

  return result;
}

const KentRepertoryPage: React.FC = () => {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  // Book list from database (metadata only)
  const [availableBooks, setAvailableBooks] = useState<BookMetadata[]>([
    {
      id: "03b1c6ba-3002-4db6-830e-b42132ad8976",
      bookName: "Kent Repertory",
      createdAt: new Date("2026-01-24T11:31:54Z"),
    },
    {
      id: "7849d943-6a0c-4534-b77a-26c3a4da0abe",
      bookName: "Homeosetu Clinical Repertory",
      createdAt: new Date("2026-01-24T11:32:28Z"),
    },
  ]);
  const [loadingBooksList, setLoadingBooksList] = useState(false);

  // Currently selected book and its contents
  const [selectedBookId, setSelectedBookId] = useState<string | null>(null);
  const [currentBook, setCurrentBook] = useState<KentRepertory | null>(null);
  const [currentChapterId, setCurrentChapterId] = useState<
    string | undefined
  >();
  const [searchQuery, setSearchQuery] = useState("");

  // Loading and error states
  const [loadingBook, setLoadingBook] = useState(false);
  const [bookError, setBookError] = useState<string | null>(null);
  const [loadingChapter, setLoadingChapter] = useState(false); // New loading state for simple chapter fetch

  const [compareMode, setCompareMode] = useState(false);
  const [selectedRubrics, setSelectedRubrics] = useState<SelectedRubric[]>([]);

  const [userNotes, setUserNotes] = useState<UserNoteCache>({});
  const [noteDrafts, setNoteDrafts] = useState<Record<string, string>>({});
  const { kentAccess } = useKentAccessStore();

  const [selectedRemedies, setSelectedRemedies] = useState<{
    [rubricId: string]: {
      abbr: string;
      grade: number;
      fullForm?: string;
      description?: string;
    };
  }>({});

  const [remedyPanel, setRemedyPanel] = useState<{
    open: boolean;
    abbr?: string;
    fullName?: string;
    grade?: number;
    description?: string;
  }>({ open: false });

  const [comparisonOpen, setComparisonOpen] = useState(false);
  const [expandedRubrics, setExpandedRubrics] = useState<
    Record<string, boolean>
  >({});

  const handleToggleExpand = useCallback((id: string) => {
    setExpandedRubrics((prev) => ({ ...prev, [id]: !prev[id] }));
  }, []);

  const currentUserName =
    user?.fullName ||
    user?.username ||
    user?.primaryEmailAddress?.emailAddress ||
    undefined;
  const currentChapter: Chapter | undefined = useMemo(() => {
    if (!currentChapterId || !currentBook) return undefined;
    return currentBook?.chapters.find((c) => c.id === currentChapterId);
  }, [currentBook, currentChapterId]);

  const filteredRubrics = useMemo(
    () => getFilteredRubrics(currentChapter, searchQuery),
    [currentChapter, searchQuery],
  );

  const commonRemedies = useMemo(
    () => findCommonRemedies(selectedRubrics, currentBook),
    [selectedRubrics, currentBook],
  );

  // useEffect(() => {
  //   if (!currentChapterId && currentBook) {
  //     // Don't auto-select initially to avoid implicit fetch?
  //     // Or auto-select first one and fetch its contents
  //     const first = currentBook?.chapters.find((c: Chapter) => true); // Just pick first
  //     if (first) {
  //       handleSelectChapter(first.id); // Use handler to trigger fetch
  //     }
  //   }
  // }, [currentBook, currentChapterId]);

  // Clear error message after 5 seconds
  useEffect(() => {
    if (bookError) {
      const timer = setTimeout(() => setBookError(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [bookError]);

  // Fetch list of available books on mount
  // useEffect(() => {
  //     const fetchBooksList = async () => {
  //         try {
  //             setLoadingBooksList(true)
  //             const response = await fetch("/api/books")
  //             if (!response.ok) {
  //                 console.error("Failed to fetch books list")
  //                 return
  //             }
  //             const books: BookMetadata[] = await response.json()
  //             setAvailableBooks(books)
  //
  //             // Auto-select first book if available
  //             if (books.length > 0 && !selectedBookId) {
  //                 setSelectedBookId(books[0].id)
  //             }
  //         } catch (error) {
  //             console.error("Error fetching books list:", error)
  //         } finally {
  //             setLoadingBooksList(false)
  //         }
  //     }
  //
  //     fetchBooksList()
  // }, [])

  // Load book contents when a book is selected
  useEffect(() => {
    if (!selectedBookId) return;

    const loadBookContents = async () => {
      setLoadingBook(true);
      setBookError(null);

      const { book, error } = await fetchBookFromAPI(selectedBookId, undefined);

      if (error) {
        setBookError(error);
        setLoadingBook(false);
        return;
      }

      if (book) {
        setCurrentBook(book);
        // Reset chapter selection when book changes
        setCurrentChapterId(undefined); // Let the other useEffect pick the first one
      } else {
        setBookError("Failed to load book contents");
      }

      setLoadingBook(false);
    };

    loadBookContents();
  }, [selectedBookId]);

  // Handle book selection change
  const handleBookChange = (bookId: string) => {
    setSelectedBookId(bookId);
  };

  // useEffect(() => {
  //     if (!isLoaded || !user?.id) return
  //     if (currentChapterId !== MIND_CHAPTER_ID) return
  //
  //     const load = async () => {
  //         try {
  //             const res = await fetch(`/api/kent-notes?chapterId=${MIND_CHAPTER_ID}`)
  //             if (!res.ok) return
  //             const data = (await res.json()) as { notes: MindNotePayload[] }
  //             setUserNotes((prev) => {
  //                 const updated: UserNoteCache = { ...prev }
  //                 Object.keys(updated).forEach((key) => {
  //                     if (key.startsWith(`${MIND_CHAPTER_ID}_`)) delete updated[key]
  //                 })
  //                 data.notes.forEach((note) => {
  //                     const key = `${note.chapterId}_${note.rubricId}`
  //                     if (!updated[key]) updated[key] = []
  //                     updated[key].push({
  //                         text: note.text,
  //                         timestamp: new Date(note.createdAt).getTime(),
  //                         userName: note.userName,
  //                     })
  //                 })
  //                 return updated
  //             })
  //         } catch (e) {
  //             console.error("Failed to load Mind notes:", e)
  //         }
  //     }
  //     void load()
  // }, [isLoaded, user?.id, currentChapterId])

  const handleSelectChapter = async (chapterId: string) => {
    setCurrentChapterId(chapterId);
    setSearchQuery("");

    // Check if we need to fetch rubrics
    if (!currentBook) return;

    const chapter = currentBook.chapters.find((c) => c.id === chapterId);
    if (chapter && (!chapter.rubrics || chapter.rubrics.length === 0)) {
      // Fetch rubrics
      setLoadingChapter(true);
      const { chapter: fetchedChapter, error } =
        await fetchChapterContents(chapterId);
      setLoadingChapter(false);

      if (fetchedChapter) {
        // Update currentBook with the new chapter details including rubrics
        setCurrentBook((prev) => {
          if (!prev) return null;
          return {
            ...prev,
            chapters: prev.chapters.map((c) =>
              c.id === chapterId ? fetchedChapter : c,
            ),
          };
        });
      } else {
        console.error("Failed to fetch rubrics for chapter", error);
      }
    }
  };

  /* New function to remove specific rubric from selection */
  const handleRemoveRubric = (rubricId: string, chapterId: string) => {
    setSelectedRubrics((prev) =>
      prev.filter(
        (r) => !(r.rubricId === rubricId && r.chapterId === chapterId),
      ),
    );
  };

  const handleToggleRubricSelection = (rubricId: string) => {
    if (!currentChapter) return;
    setSelectedRubrics((prev) => {
      const exists = prev.find(
        (r) => r.rubricId === rubricId && r.chapterId === currentChapter.id,
      );
      if (exists) {
        return prev.filter(
          (r) =>
            !(r.rubricId === rubricId && r.chapterId === currentChapter.id),
        );
      }
      return [
        ...prev,
        {
          rubricId,
          chapterId: currentChapter.id,
        },
      ];
    });
  };

  const isRubricSelected = (rubricId: string) => {
    if (!currentChapter) return false;
    return selectedRubrics.some(
      (r) => r.rubricId === rubricId && r.chapterId === currentChapter.id,
    );
  };

  const handleToggleCompareMode = () => {
    setCompareMode((prev) => {
      const next = !prev;
      if (!next) {
        setSelectedRubrics([]);
        setComparisonOpen(false);
      }
      return next;
    });
  };

  const handleSaveNote = async (rubricId: string) => {
    if (!currentChapter) return;
    const key = `${currentChapter.id}_${rubricId}`;
    const text = (noteDrafts[key] || "").trim();
    if (!text) return;

    if (!user?.id) {
      alert("Please sign in to save notes.");
      return;
    }

    try {
      const res = await fetch("/api/kent-notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          rubricId,
          text,
          chapterId: currentChapter.id || MIND_CHAPTER_ID,
          userName: currentUserName,
        }),
      });
      if (!res.ok) throw new Error("Unable to save note");
      const data = (await res.json()) as { note: MindNotePayload };
      setUserNotes((prev) => {
        const updated: UserNoteCache = { ...prev };
        const cacheKey = `${data.note.chapterId}_${data.note.rubricId}`;
        if (!updated[cacheKey]) updated[cacheKey] = [];
        updated[cacheKey].push({
          text: data.note.text,
          timestamp: new Date(data.note.createdAt).getTime(),
          userName: data.note.userName,
        });
        return updated;
      });
      setNoteDrafts((prev) => {
        const copy = { ...prev };
        delete copy[key];
        return copy;
      });
    } catch (e) {
      console.error("Failed to save note:", e);
      alert("We couldn't save your note. Please try again.");
    }
  };

  const handleShowRemedyPanel = (
    abbr: string,
    grade: number,
    fullForm?: string,
    description?: string,
  ) => {
    const fullName = fullForm || getRemedyFullName(abbr);
    setRemedyPanel({ open: true, abbr, fullName, grade, description });
  };

  const handleApplyChatQuery = (
    intent: string | { query?: string; chapterId?: string },
  ) => {
    const query = typeof intent === "string" ? intent : intent?.query || "";
    const chapterId =
      typeof intent === "string" ? undefined : intent?.chapterId;

    if (chapterId) {
      setCurrentChapterId(chapterId);
      if (!query) setSearchQuery("");
    } else if (!currentChapterId && currentBook) {
      const first = currentBook.chapters.find(
        (ch: Chapter) => ch.rubrics.length > 0,
      );
      if (first) {
        setCurrentChapterId(first.id);
      }
    }

    if (query) {
      setSearchQuery(query);
    }

    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const KENT_CHAT_QUERY_KEY = "kentChatQuery";

  const handleKentRedirect = (
    intent?: string | { query?: string; chapterId?: string },
  ) => {
    if (typeof window === "undefined") return;

    const payload =
      typeof intent === "string" ? { query: intent } : intent || undefined;

    handleApplyChatQuery(payload || "");

    if (payload) {
      sessionStorage.setItem(KENT_CHAT_QUERY_KEY, JSON.stringify(payload));
    } else {
      sessionStorage.removeItem(KENT_CHAT_QUERY_KEY);
    }
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = sessionStorage.getItem(KENT_CHAT_QUERY_KEY);
    if (!stored) return;
    let parsed: string | { query?: string; chapterId?: string } = stored;
    try {
      parsed = JSON.parse(stored);
    } catch {
      parsed = stored;
    }
    handleApplyChatQuery(parsed);
    sessionStorage.removeItem(KENT_CHAT_QUERY_KEY);
  }, []);

  const selectedCount = selectedRubrics.length;

  useEffect(() => {
    if (!kentAccess) {
      router.push("/software/access");
    }
  }, [kentAccess, router]);

  return (
    <>
      <Head>
        <title>Homeosetu | WebApp</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Source+Sans+3:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </Head>

      <div className="min-h-screen flex flex-col bg-slate-950 text-slate-50">
        <header className="top-0 border-b border-slate-700 bg-gradient-to-b from-slate-900/95 via-slate-900/90 to-slate-950">
          <div className="mx-auto flex items-center justify-between gap-6 px-5 py-3">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 text-emerald-400">
                <img
                  src="/logo.jpg"
                  alt="Homeosetu Logo"
                  className="h-full w-full"
                />
              </div>
              <div className="space-y-0.5">
                <div className="font-serif text-xl font-semibold tracking-[0.12em] uppercase">
                  Homeosetu WebApp
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="mx-auto flex w-full flex-1">
          <aside className="flex w-64 flex-col border-r border-slate-800 bg-slate-900/80">
            <div className="border-b border-slate-800 px-4 pb-3 pt-4">
              <h2 className="mb-1 text-sm font-semibold text-slate-100">
                Books &amp; Chapters
              </h2>

              <select
                value={selectedBookId || ""}
                onChange={(e) => {
                  if (e.target.value) {
                    handleBookChange(e.target.value);
                    setSearchQuery("");
                  }
                }}
                disabled={loadingBook}
                className="mt-1 w-full rounded-md border border-slate-700 bg-slate-950 px-2.5 py-2 text-xs font-medium text-slate-100 shadow-sm outline-none ring-0 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {availableBooks.length === 0 ? (
                  <option value="">No books available</option>
                ) : (
                  <>
                    <option value="">Select a book</option>
                    {availableBooks.map((book) => (
                      <option key={book.id} value={book.id}>
                        {book.bookName}
                      </option>
                    ))}
                  </>
                )}
              </select>
              {bookError && (
                <div className="mt-2 rounded-md border border-red-500/60 bg-red-500/10 px-2 py-1 text-[10px] text-red-200">
                  {bookError}
                </div>
              )}
            </div>
            <div className="flex-1 space-y-1 overflow-y-auto px-2 py-2">
              {!currentBook && !loadingBook && (
                <div className="px-3 py-4 text-center text-xs text-slate-400">
                  Select a book to view chapters
                </div>
              )}
              {loadingBook && (
                <div className="px-3 py-4 text-center text-xs text-slate-400">
                  Loading book contents...
                </div>
              )}
              {currentBook?.chapters.map((chapter) => {
                const active = chapter.id === currentChapterId;
                return (
                  <div
                    key={chapter.id}
                    className={`flex cursor-pointer items-center gap-3 rounded-md px-3 py-2 text-xs transition-colors ${
                      active
                        ? "border border-emerald-500/60 bg-emerald-500/10"
                        : "border border-transparent hover:bg-slate-800/70"
                    }`}
                    onClick={() => handleSelectChapter(chapter.id)}
                  >
                    <div className="flex h-7 w-7 items-center justify-center rounded-md bg-slate-800 text-sm">
                      {chapter.icon}
                    </div>
                    <div className="space-y-0.5">
                      <div className="truncate text-xs font-medium text-slate-100">
                        {chapter.name}
                      </div>
                      <div className="text-[10px] text-slate-400">
                        {chapter.description}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </aside>

          <section className="flex-1 px-5 py-5">
            <div className="mb-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <span>{currentBook?.bookName || "No book selected"}</span>
                <span className="text-slate-500">›</span>
                <span className="font-medium text-emerald-300">
                  {currentChapter ? currentChapter.name : "Select a chapter"}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  className={`inline-flex items-center gap-2 rounded-md border px-3 py-1.5 text-[11px] font-medium transition-colors ${
                    compareMode
                      ? "border-sky-400/70 bg-sky-500/10 text-sky-200"
                      : "border-slate-700 bg-slate-900 text-slate-300 hover:border-slate-500"
                  }`}
                  onClick={handleToggleCompareMode}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    className="h-4 w-4"
                  >
                    <path d="M16 3h5v5M8 3H3v5M3 16v5h5M21 16v5h-5M9 12h6M12 9v6" />
                  </svg>
                  <span>Compare Rubrics</span>
                </button>
                <div className="relative w-96">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500"
                  >
                    <circle cx="11" cy="11" r="7" />
                    <path d="M20 20l-4-4" />
                  </svg>
                  <input
                    type="text"
                    placeholder="Search Remedy, Rubric ,meanings"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full rounded-md border border-slate-700 bg-slate-950 py-3 pl-8 pr-2 text-xs text-slate-100 outline-none ring-0 placeholder:text-slate-500 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                  />
                </div>
              </div>
            </div>

            {compareMode && (
              <div className="mb-3 flex items-center justify-between rounded-lg border border-sky-500/40 bg-sky-500/10 px-3 py-2 text-[11px] text-sky-100">
                <div>
                  <span className="font-semibold">{selectedCount}</span> rubric
                  {selectedCount === 1 ? "" : "s"} selected
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    className="rounded-md border border-slate-600 bg-slate-900 px-2 py-1 text-[11px] text-slate-200 hover:border-slate-400"
                    onClick={() => {
                      setSelectedRubrics([]);
                      setComparisonOpen(false);
                    }}
                  >
                    Clear
                  </button>
                  <button
                    type="button"
                    disabled={selectedCount < 1}
                    className={`rounded-md px-2 py-1 text-[11px] font-medium text-white transition-colors ${
                      selectedCount < 1
                        ? "cursor-not-allowed bg-sky-500/30"
                        : "bg-sky-500 hover:bg-sky-600"
                    }`}
                    onClick={() => setComparisonOpen(true)}
                  >
                    View Remedy Analysis
                  </button>
                  <button
                    type="button"
                    className="rounded-md border border-red-400/60 bg-red-500/10 px-2 py-1 text-[11px] text-red-200 hover:border-red-300"
                    onClick={() => {
                      setCompareMode(false);
                      setSelectedRubrics([]);
                      setComparisonOpen(false);
                    }}
                  >
                    Exit
                  </button>
                </div>
              </div>
            )}

            <div className="mb-3 flex items-center gap-4 rounded-lg bg-slate-900/80 px-3 py-2 text-[11px] text-slate-300">
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                Gradation
              </span>
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-slate-300" /> 1 Mark
                </span>
                <span className="inline-flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-amber-300" /> 2 Marks
                </span>
                <span className="inline-flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-rose-400" /> 3 Marks
                </span>
              </div>
            </div>

            {loadingChapter && (
              <div className="mt-10 flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-700 bg-slate-900/60 px-6 py-10 text-center text-sm text-slate-400">
                <div className="mb-2 h-6 w-6 animate-spin rounded-full border-2 border-slate-600 border-t-emerald-500"></div>
                Loading rubrics...
              </div>
            )}

            {!loadingChapter &&
              (!currentChapter || filteredRubrics.length === 0) && (
                <div className="mt-10 rounded-xl border border-dashed border-slate-700 bg-slate-900/60 px-6 py-10 text-center text-sm text-slate-400">
                  {currentChapter
                    ? "No rubrics match your search in this chapter."
                    : "Select a chapter from the left to view its rubrics."}
                </div>
              )}

            <div className="pb-10">
              <Virtuoso
                useWindowScroll
                data={filteredRubrics}
                itemContent={(index, rubric) => {
                  const selected = isRubricSelected(rubric.id);
                  const allNotes: Note[] = [
                    ...(rubric.notes || []),
                    ...buildNotesFromCache(
                      userNotes,
                      currentChapter?.id,
                      rubric.id,
                    ),
                  ];
                  const cacheKey = `${currentChapter?.id}_${rubric.id}`;

                  return (
                    <div className="mb-3">
                      <RubricItem
                        rubric={rubric}
                        chapterId={currentChapter?.id}
                        isSelected={selected}
                        compareMode={compareMode}
                        onToggleSelection={handleToggleRubricSelection}
                        onShowRemedyPanel={handleShowRemedyPanel}
                        selectedRemedy={selectedRemedies[rubric.id]}
                        onSelectRemedy={(rubricId, data) =>
                          setSelectedRemedies((prev) => ({
                            ...prev,
                            [rubricId]: data,
                          }))
                        }
                        allNotes={allNotes}
                        noteDraft={noteDrafts[cacheKey] || ""}
                        onUpdateDraft={(text) =>
                          setNoteDrafts((prev) => ({
                            ...prev,
                            [cacheKey]: text,
                          }))
                        }
                        onSaveNote={() => handleSaveNote(rubric.id)}
                        onCancelDraft={() =>
                          setNoteDrafts((prev) => {
                            const copy = { ...prev };
                            delete copy[cacheKey];
                            return copy;
                          })
                        }
                        userId={user?.id}
                        isOpen={!!expandedRubrics[rubric.id]}
                        onToggle={() => handleToggleExpand(rubric.id)}
                      />
                    </div>
                  );
                }}
              />
            </div>
          </section>
        </main>

        <div
          className={`fixed inset-0 z-30 bg-black/50 transition-opacity ${
            remedyPanel.open || comparisonOpen
              ? "opacity-100"
              : "pointer-events-none opacity-0"
          }`}
          onClick={() => {
            setRemedyPanel({ open: false });
            setComparisonOpen(false);
          }}
        />
        <div
          className={`fixed top-0 z-40 flex h-screen w-80 max-w-[90vw] flex-col border-l border-slate-800 bg-slate-900/95 shadow-2xl transition-transform ${
            remedyPanel.open ? "right-0" : "-right-80"
          }`}
        >
          <div className="flex items-center justify-between border-b border-slate-800 px-4 py-3">
            <h3 className="text-sm font-semibold text-slate-50">
              {remedyPanel.fullName || "Remedy Details"}
            </h3>
            <button
              type="button"
              className="rounded-md border border-slate-600 bg-slate-900 px-2 py-1 text-xs text-slate-200 hover:border-slate-400"
              onClick={() => setRemedyPanel({ open: false })}
            >
              ✕
            </button>
          </div>
          <div className="flex-1 overflow-y-auto px-4 py-3 text-xs text-slate-200">
            {remedyPanel.abbr && (
              <>
                <div className="mb-3">
                  <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                    Abbreviation
                  </div>
                  <div className="mt-1 text-[11px] text-slate-100">
                    {remedyPanel.abbr}
                  </div>
                </div>
                <div className="mb-3">
                  <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                    Full Name
                  </div>
                  <div className="mt-1 text-[11px] text-slate-100">
                    {remedyPanel.fullName || remedyPanel.abbr}
                  </div>
                </div>
                {remedyPanel.grade != null && (
                  <div className="mb-3">
                    <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                      Gradation
                    </div>
                    <div className="mt-1 inline-flex items-center rounded-full bg-slate-800 px-2 py-0.5 text-[11px] text-slate-100">
                      {remedyPanel.grade} Mark
                      {remedyPanel.grade > 1 ? "s" : ""}
                    </div>
                  </div>
                )}
                {remedyPanel.description && (
                  <div className="mb-3">
                    <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                      Description
                    </div>
                    <div className="mt-1 text-[11px] text-slate-100 leading-relaxed">
                      {remedyPanel.description}
                    </div>
                  </div>
                )}
              </>
            )}
            {!remedyPanel.abbr && (
              <div className="text-[11px] text-slate-400">
                Select a remedy to view details.
              </div>
            )}
          </div>
        </div>

        <div
          className={`fixed py-1 z-40 flex h-screen w-80 max-w-[90vw] flex-col border-l border-slate-800 bg-slate-900/95 shadow-2xl transition-transform ${
            comparisonOpen
              ? remedyPanel.open
                ? "right-80"
                : "right-0"
              : "-right-80"
          }`}
        >
          <div className="flex items-center justify-between border-b border-slate-800 px-4 py-3">
            <h3 className="text-sm font-semibold text-slate-50">
              Remedy Analysis
            </h3>
            <button
              type="button"
              className="rounded-md border border-slate-600 bg-slate-900 px-2 py-1 text-xs text-slate-200 hover:border-slate-400"
              onClick={() => setComparisonOpen(false)}
            >
              ✕
            </button>
          </div>
          <div className="flex-1 overflow-y-auto px-4 py-3 text-xs text-slate-200">
            <div className="mb-3">
              <div className="mb-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                Comparing Rubrics
              </div>
              {selectedRubrics.length < 2 && (
                <div className="text-[11px] pb-2 text-slate-400">
                  Select at least two rubric in compare mode.
                </div>
              )}
              {selectedRubrics.map((sel, idx) => {
                if (!currentBook) return null;
                const chapter = currentBook.chapters.find(
                  (c: Chapter) => c.id === sel.chapterId,
                );
                const rubric = chapter?.rubrics.find(
                  (r: Rubric) => r.id === sel.rubricId,
                );
                if (!chapter || !rubric) return null;
                return (
                  <div
                    key={`${sel.chapterId}-${sel.rubricId}-${idx}`}
                    className="mb-1 flex items-start justify-between gap-2 rounded-md border border-slate-700 bg-slate-900 px-2 py-1 text-[11px]"
                  >
                    <div>
                      <div className="text-slate-100">{rubric.name}</div>
                      <div className="text-[10px] text-slate-400">
                        {currentBook.bookName} › {chapter.name}
                      </div>
                    </div>
                    <button
                      type="button"
                      className="ml-1 text-slate-500 transition-colors hover:text-red-400"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveRubric(sel.rubricId, sel.chapterId);
                      }}
                      title="Remove rubric"
                    >
                      ✕
                    </button>
                  </div>
                );
              })}
            </div>

            <div>
              <div className="mb-1 flex items-center justify-between">
                <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                  Remedies
                </div>
                <div className="inline-flex items-center rounded-full bg-slate-800 px-2 py-0.5 text-[11px] text-slate-100">
                  {commonRemedies.length} found
                </div>
              </div>
              {commonRemedies.length === 0 && (
                <div className="text-[11px] text-slate-400">
                  No remedies found.
                </div>
              )}
              {commonRemedies.map((rem) => (
                <div
                  key={rem.abbr}
                  className="mb-2 cursor-pointer rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-[11px] hover:border-sky-400/80"
                  // onClick={() => {
                  //   const maxGrade = Math.max(
                  //     ...rem.occurrences.map((o) => o.grade),
                  //   );
                  //   handleShowRemedyPanel(
                  //     rem.abbr,
                  //     maxGrade,
                  //     rem.fullName,
                  //     rem.description,
                  //   );
                  // }}
                >
                  <div className="mb-1 flex items-center justify-between">
                    <span className="font-semibold text-slate-100">
                      {rem.abbr}
                    </span>
                    <span className="text-[12px] font-semibold text-slate-400">
                      {rem.occurrences.length} rubrics
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-300">
                    {rem.occurrences.map((o, idx) => (
                      <span key={idx}>
                        {idx > 0 ? " • " : ""}
                        {o.rubricName}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <button
          type="button"
          className="fixed bottom-16 right-6 z-50 grid h-14 w-14 place-items-center rounded-full border-0 bg-gradient-to-tr from-indigo-600 to-violet-600 text-2xl shadow-xl shadow-indigo-900/60 transition hover:translate-y-[-1px] hover:shadow-2xl"
          onClick={() => setIsChatbotOpen(!isChatbotOpen)}
          aria-label="Open chatbot"
        >
          💬
        </button>
        <button
          type="button"
          className="fixed bottom-3 right-6 z-40 grid h-11 w-11 place-items-center rounded-full border-0 bg-slate-900 text-lg text-slate-50 shadow-xl shadow-black/60 transition hover:translate-y-[-1px] hover:shadow-2xl"
          onClick={() =>
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            })
          }
          aria-label="Scroll to top"
        >
          ⬆️
        </button>

        {isChatbotOpen && (
          <>
            <div
              className="fixed inset-0 z-60 bg-black/40"
              onClick={() => setIsChatbotOpen(false)}
            />
            <div className="fixed bottom-20 right-5 z-70 flex w-88 max-w-[calc(100%-32px)] flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
              {/* <div className="flex items-center justify-between bg-indigo-50 px-3.5 py-2.5 text-xs font-semibold text-slate-800">
                                <span>Ask Homeosetu</span>
                                <button
                                    type="button"
                                    className="text-base text-indigo-500"
                                    onClick={() => setIsChatbotOpen(false)}
                                    aria-label="Close chatbot"
                                >
                                    ×
                                </button>
                            </div> */}
              <div className="bg-white z-50">
                <Chatbot onKentRequested={handleKentRedirect} />
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default KentRepertoryPage;
