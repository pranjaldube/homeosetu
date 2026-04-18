"use client";

import React, { useEffect, useMemo, useState, useCallback } from "react";
import Head from "next/head";
import { useUser } from "@clerk/nextjs";
import Chatbot from "@/components/chatbot";
import { useKentAccessStore } from "@/hooks/use-kent-access";

import {
  getRemedyFullName,
  Rubric,
  Note,
  KentRepertory,
  Chapter,
} from "./data";
import { useRouter } from "next/navigation";
import { Virtuoso } from "react-virtuoso";
import { RubricItem } from "./RubricItem";
import toast from "react-hot-toast";

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
      patientVersion?: string;
      patientVersion2?: string;
      whenToUse?: string;
      whenToUseAsMetaphor?: string;
      crossReferenceByDrKent?: string;
      crossReferenceByHomeosetu?: string;
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
        patientVersion: rubric.patientVersion || undefined,
        patientVersion2: rubric.patientVersion2 || undefined,
        whenToUse: rubric.whenToUse || undefined,
        whenToUseAsMetaphor: rubric.whenToUseAsMetaphor || undefined,
        crossReferenceByDrKent: rubric.crossReferenceByDrKent || undefined,
        crossReferenceByHomeosetu:
          rubric.crossReferenceByHomeosetu || undefined,
        remedies: (rubric.remedies || []).map((remedy) => ({
          id: remedy.id,
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
        patientVersion: rubric.patientVersion || undefined,
        patientVersion2: rubric.patientVersion2 || undefined,
        whenToUse: rubric.whenToUse || undefined,
        whenToUseAsMetaphor: rubric.whenToUseAsMetaphor || undefined,
        crossReferenceByDrKent: rubric.crossReferenceByDrKent || undefined,
        crossReferenceByHomeosetu:
          rubric.crossReferenceByHomeosetu || undefined,
        remedies: (rubric.remedies || []).map((remedy: any) => ({
          id: remedy.id,
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

type SelectedRubric = {
  rubricId: string;
  rubricName: string;
  chapterId: string;
  chapterName: string;
  bookId: string;
  bookName: string;
  remedies: {
    id?: string;
    abbr: string;
    fullForm?: string;
    description?: string;
    grade: number;
  }[];
};

type SelectedRemedy = {
  id?: string;
  abbr: string;
  fullName: string;
  grade: number;
};

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

  const words = query
    .toLowerCase()
    .trim()
    .split(/\s+/) // split by spaces
    .filter(Boolean);

  if (!words.length) return chapter.rubrics;

  return chapter.rubrics.filter((rubric) => {
    const searchableText = [rubric.name]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();
    console.log(words);
    // 🔥 Every word must exist
    return words.every((word) => searchableText.includes(word));
  });
}

function findCommonRemedies(selected: SelectedRubric[]): CommonRemedy[] {
  if (selected.length < 1) return [];

  const map = new Map<string, CommonRemedy>();

  selected.forEach((sel) => {
    sel.remedies.forEach((remedy) => {
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
        rubricId: sel.rubricId,
        rubricName: sel.rubricName,
        chapterName: sel.chapterName,
        bookName: sel.bookName,
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

  // Feedback states
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [feedbackEmail, setFeedbackEmail] = useState(
    user?.primaryEmailAddress?.emailAddress || "",
  );
  const [isSubmittingFeedback, setIsSubmittingFeedback] = useState(false);

  // Book list from database (metadata only)
  const [availableBooks, setAvailableBooks] = useState<BookMetadata[]>([
    {
      id: "03b1c6ba-3002-4db6-830e-b42132ad8976",
      bookName: "Kent Repertory",
      createdAt: new Date("2026-01-24T11:31:54Z"),
    },
    {
      id: "e6eca118-9185-4dc4-be87-f2b0aa0b7cc9",
      bookName: "Homeosetu Clinical Repertory",
      createdAt: new Date("2026-01-24T11:32:28Z"),
    },
    {
      id: "1d8c2480-89a7-42df-960e-cba80a8f73c9",
      bookName: "Allen Fevers Repertory",
      createdAt: new Date("2026-02-27T05:30:28Z"),
    },
    {
      id: "7632b05d-3bae-4444-8020-29ef2811c061",
      bookName:
        "Repertory to Keynotes and Characteristics of MM By Dr H C Allen",
      createdAt: new Date("2026-03-02T05:30:28Z"),
    },
    {
      id: "c803e7ec-0866-4d9f-a052-68cf5c7f701a",
      bookName: "Homeosetu bowel nosode repertory",
      createdAt: new Date("2026-03-02T05:30:28Z"),
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

  const [selectedRemedies, setSelectedRemedies] = useState<{
    [rubricId: string]: {
      id?: string;
      abbr: string;
      grade: number;
      fullForm?: string;
      description?: string;
    };
  }>({});

  const [remedyPanel, setRemedyPanel] = useState<{
    open: boolean;
    id?: string;
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

  const canEdit =
    isLoaded &&
    !!user &&
    user.id === process.env.NEXT_PUBLIC_KENT_EDITOR_USER_ID;

  const handleRubricUpdated = useCallback(
    (id: string, name: string, meaning: string) => {
      setCurrentBook((prev) => {
        if (!prev || !currentChapterId) return prev;
        return {
          ...prev,
          chapters: prev.chapters.map((ch) => {
            if (ch.id !== currentChapterId) return ch;
            return {
              ...ch,
              rubrics: ch.rubrics.map((r) =>
                r.id === id ? { ...r, name, meaning: meaning || undefined } : r,
              ),
            };
          }),
        };
      });
    },
    [currentChapterId],
  );

  const handleRemedyAdded = useCallback(
    (
      rubricId: string,
      remedy: {
        id?: string;
        abbr: string;
        fullForm?: string;
        description?: string;
        grade: number;
      },
    ) => {
      setCurrentBook((prev) => {
        if (!prev || !currentChapterId) return prev;
        return {
          ...prev,
          chapters: prev.chapters.map((ch) => {
            if (ch.id !== currentChapterId) return ch;
            return {
              ...ch,
              rubrics: ch.rubrics.map((r) => {
                if (r.id !== rubricId) return r;
                return {
                  ...r,
                  remedies: [...r.remedies, remedy],
                };
              }),
            };
          }),
        };
      });
    },
    [currentChapterId],
  );

  const handleRemedyDeleted = useCallback(
    (rubricId: string, remedyId: string) => {
      setCurrentBook((prev) => {
        if (!prev || !currentChapterId) return prev;
        return {
          ...prev,
          chapters: prev.chapters.map((ch) => {
            if (ch.id !== currentChapterId) return ch;
            return {
              ...ch,
              rubrics: ch.rubrics.map((r) => {
                if (r.id !== rubricId) return r;
                return {
                  ...r,
                  remedies: r.remedies.filter((rem) => rem.id !== remedyId),
                };
              }),
            };
          }),
        };
      });
    },
    [currentChapterId],
  );

  const currentChapter: Chapter | undefined = useMemo(() => {
    if (!currentChapterId || !currentBook) return undefined;
    return currentBook?.chapters.find((c) => c.id === currentChapterId);
  }, [currentBook, currentChapterId]);

  const filteredRubrics = useMemo(
    () => getFilteredRubrics(currentChapter, searchQuery),
    [currentChapter, searchQuery],
  );

  const commonRemedies = useMemo(
    () => findCommonRemedies(selectedRubrics),
    [selectedRubrics],
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
      if (isExpired) return;
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
    if (isExpired) return;
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
  console.log("userid from kent repeertort", user?.id);

  /* New function to remove specific rubric from selection */
  const handleRemoveRubric = (
    rubricId: string,
    chapterId: string,
    bookId: string,
  ) => {
    setSelectedRubrics((prev) =>
      prev.filter(
        (r) =>
          !(
            r.rubricId === rubricId &&
            r.chapterId === chapterId &&
            r.bookId === bookId
          ),
      ),
    );
  };

  const handleToggleRubricSelection = (
    rubricId: string,
    rubricName: string,
    remedies: any[],
  ) => {
    if (!currentChapter || !currentBook || !selectedBookId) return;
    setSelectedRubrics((prev) => {
      const exists = prev.find(
        (r) =>
          r.rubricId === rubricId &&
          r.chapterId === currentChapter.id &&
          r.bookId === selectedBookId,
      );
      if (exists) {
        return prev.filter(
          (r) =>
            !(
              r.rubricId === rubricId &&
              r.chapterId === currentChapter.id &&
              r.bookId === selectedBookId
            ),
        );
      }
      return [
        ...prev,
        {
          rubricId,
          rubricName,
          chapterId: currentChapter.id,
          chapterName: currentChapter.name,
          bookId: selectedBookId,
          bookName: currentBook.bookName,
          remedies,
        },
      ];
    });
  };

  const isRubricSelected = (rubricId: string) => {
    if (!currentChapter || !selectedBookId) return false;
    return selectedRubrics.some(
      (r) =>
        r.rubricId === rubricId &&
        r.chapterId === currentChapter.id &&
        r.bookId === selectedBookId,
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
    if (isExpired) return;
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

  const { isExpired, isLoading } = useKentAccessStore();
  const selectedCount = selectedRubrics.length;

  useEffect(() => {
    if (!isLoaded || isLoading) return;

    if (!user) {
      console.log("user not logged in");
      toast.error("Please login");
      window.location.href = "/sign-in";
      return;
    }

    if (isExpired) {
      toast.error("Your subscription is ended");
      router.push("/software/access");
    }
  }, [isLoaded, user, isExpired, isLoading, router]);

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
                <div className="font-serif text-xs font-medium tracking-[0.12em]">
                  Online Homeopathy Software
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
                <p
                  className="cursor-pointer text-[12px] pr-4 hover:text-emerald-400"
                  onClick={() => {
                    if (!user) {
                      toast.error("Please login");
                      return;
                    }
                    setIsFeedbackOpen(true);
                  }}
                >
                  Share your FeedBack
                </p>
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
              <div className="mb-3 flex flex-col gap-2 rounded-lg border border-sky-500/40 bg-sky-500/10 px-3 py-2 text-[11px] text-sky-100">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-semibold">{selectedCount}</span>{" "}
                    rubric
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

                {selectedCount > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-1 border-t border-sky-500/20 pt-2">
                    {selectedRubrics.map((sel) => {
                      return (
                        <div
                          key={`${sel.bookId}-${sel.chapterId}-${sel.rubricId}`}
                          className="flex items-center gap-1.5 rounded-md bg-sky-500/20 px-2 py-1 text-[10px] text-sky-100 border border-sky-500/30"
                        >
                          <span className="font-medium">{sel.rubricName}</span>
                          <span className="text-sky-300/80">
                            ({sel.bookName} › {sel.chapterName})
                          </span>
                          <button
                            onClick={() =>
                              handleRemoveRubric(
                                sel.rubricId,
                                sel.chapterId,
                                sel.bookId,
                              )
                            }
                            className="ml-0.5 rounded-full p-0.5 hover:bg-sky-500/40 text-sky-200 hover:text-white transition-colors"
                            title="Remove from comparison"
                          >
                            <svg
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth={2}
                              className="h-3 w-3"
                            >
                              <path d="M18 6L6 18M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}
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
                        onToggleSelection={(rubricId) =>
                          handleToggleRubricSelection(
                            rubricId,
                            rubric.name,
                            rubric.remedies,
                          )
                        }
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
                        canEdit={canEdit}
                        onRubricUpdated={handleRubricUpdated}
                        onRemedyAdded={handleRemedyAdded}
                        onRemedyDeleted={handleRemedyDeleted}
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
            remedyPanel.open ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
          onClick={() => {
            setRemedyPanel({ open: false });
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

        {comparisonOpen && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <div
              className="absolute inset-0 bg-slate-900/40"
              onClick={() => setComparisonOpen(false)}
            />
            <div className="relative z-10 flex max-h-[90vh] w-[95vw] max-w-6xl flex-col bg-white shadow-2xl rounded-sm">
              <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
                <div className="flex items-center">
                  <div className="px-4 pt-2 -mb-2">
                    <img
                      src="/logo.jpg"
                      alt="Homeosetu Logo"
                      className="h-12 w-12 object-contain opacity-80"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg text-slate-700">
                      Homeosetu WebApp Case Repertorisation
                    </h3>
                    <div className="text-sm text-slate-700">
                      Online Homeopathy Software
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  className="text-slate-400 hover:text-slate-600 focus:outline-none text-xl leading-none px-2"
                  onClick={() => setComparisonOpen(false)}
                >
                  &times;
                </button>
              </div>

              <div className="flex-1 overflow-auto bg-white p-4">
                <table className="w-full min-w-max border-collapse text-sm">
                  <thead>
                    <tr>
                      <th className="sticky top-0 z-20 border-b border-t border-r border-slate-200 bg-white p-2 align-bottom text-left font-medium text-sky-600 min-w-[200px]">
                        <span className="cursor-pointer underline">Rubric</span>
                      </th>
                      {commonRemedies.map((rem) => {
                        const totalScore = rem.occurrences.reduce(
                          (sum, o) => sum + o.grade,
                          0,
                        );
                        return (
                          <th
                            key={rem.abbr}
                            className="sticky top-0 z-20 h-40 w-10 border-b border-t border-r border-slate-200 bg-white p-0 align-bottom"
                          >
                            <div className="flex h-full w-full items-center justify-center pb-2">
                              <div
                                className=" whitespace-nowrap font-bold text-slate-800"
                                style={{
                                  transformOrigin: "center top",
                                  transform: "translateY(5px) rotate(-90deg)",
                                }}
                              >
                                {rem.abbr} ({totalScore})
                              </div>
                            </div>
                          </th>
                        );
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    {selectedRubrics.map((sel, idx) => {
                      return (
                        <tr
                          key={`${sel.bookId}-${sel.chapterId}-${sel.rubricId}-${idx}`}
                          className="hover:bg-slate-50 group"
                        >
                          <td className="border-b border-r border-slate-200 p-2 text-slate-800 bg-white group-hover:bg-slate-50 relative z-10 w-[200px]">
                            <div className="font-medium">
                              {sel.chapterName !== sel.rubricName
                                ? sel.rubricName
                                : sel.chapterName}
                            </div>
                            <div className="text-[10px] text-slate-500 mt-0.5">
                              {sel.bookName} › {sel.chapterName}
                            </div>
                          </td>
                          {commonRemedies.map((rem) => {
                            const occurrence = rem.occurrences.find(
                              (o) =>
                                o.rubricId === sel.rubricId &&
                                o.chapterName === sel.chapterName &&
                                o.bookName === sel.bookName,
                            );
                            return (
                              <td
                                key={`${sel.bookId}-${sel.chapterId}-${sel.rubricId}-${rem.abbr}`}
                                className="border-b border-r border-slate-200 p-2 text-center text-slate-800 min-w-[40px] w-10"
                              >
                                {occurrence ? occurrence.grade : ""}
                              </td>
                            );
                          })}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        <button
          type="button"
          className="fixed bottom-14 right-6 z-50 grid h-14 w-14 place-items-center rounded-full border-0 bg-gradient-to-tr from-indigo-600 to-violet-600 text-2xl shadow-xl shadow-indigo-900/60 transition hover:translate-y-[-1px] hover:shadow-2xl"
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

        {isFeedbackOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
              onClick={() => setIsFeedbackOpen(false)}
            />
            <div className="relative z-[110] w-full max-w-md overflow-hidden rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl">
              <div className="border-b border-slate-800 px-6 py-4 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white">
                  Share Your Feedback
                </h3>
                <button
                  onClick={() => setIsFeedbackOpen(false)}
                  className="text-slate-400 hover:text-white transition"
                >
                  ✕
                </button>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1.5">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    value={feedbackMessage}
                    onChange={(e) => setFeedbackMessage(e.target.value)}
                    placeholder="Tell us what you think..."
                    className="w-full rounded-lg border border-slate-700 bg-slate-800/50 px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:border-orange-500 focus:outline-none transition resize-none"
                  />
                </div>
                <button
                  disabled={!feedbackMessage.trim() || isSubmittingFeedback}
                  onClick={async () => {
                    if (isExpired) return;
                    try {
                      setIsSubmittingFeedback(true);
                      const res = await fetch("/api/feedback", {
                        method: "POST",
                        body: JSON.stringify({
                          message: feedbackMessage,
                          email: feedbackEmail,
                        }),
                      });

                      if (!res.ok) throw new Error("Failed to submit feedback");

                      toast.success("Feedback submitted! Thank you.");
                      setFeedbackMessage("");
                      setIsFeedbackOpen(false);
                    } catch (err) {
                      toast.error("Something went wrong. Please try again.");
                    } finally {
                      setIsSubmittingFeedback(false);
                    }
                  }}
                  className="w-full rounded-lg bg-gradient-to-r from-amber-500 to-orange-600 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-900/20 hover:from-amber-400 hover:to-orange-500 disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  {isSubmittingFeedback ? "Submitting..." : "Send Feedback"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default KentRepertoryPage;
