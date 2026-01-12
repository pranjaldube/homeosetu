"use client"

import React, { useEffect, useMemo, useState } from "react"
import Head from "next/head"
import { useUser } from "@clerk/nextjs"
import Chatbot from "@/components/chatbot"

import {
    REPERTORY_BOOKS,
    getRemedyFullName,
    Rubric,
    Note,
    KentRepertory,
    Chapter,
} from "./data"
import { useKentAccessStore } from "@/hooks/acess"
import { useRouter } from "next/navigation"

const MIND_CHAPTER_ID = "mind"

type MindNotePayload = {
    id: string
    rubricId: string
    chapterId: string
    text: string
    createdAt: string
    userName?: string
}

type UserNoteCache = Record<
    string,
    {
        text: string
        timestamp: number
        userName?: string
    }[]
>

type SelectedRubric = { rubricId: string; chapterId: string; bookIndex: number }

type SelectedRemedy = { abbr: string; fullName: string, grade: number }

type CommonRemedy = {
    abbr: string
    fullName: string
    occurrences: {
        rubricId: string
        rubricName: string
        chapterName: string
        bookName: string
        grade: number
    }[]
}

function buildNotesFromCache(
    userNotes: UserNoteCache,
    chapterId: string | undefined,
    rubricId: string
): Note[] {
    if (!chapterId) return []
    const key = `${chapterId}_${rubricId}`
    const notes = userNotes[key] || []
    return notes.map<Note>((n) => ({
        type: "user",
        source:
            [n.userName, new Date(n.timestamp).toLocaleDateString()]
                .filter(Boolean)
                .join(" • ") || undefined,
        text: n.text,
    }))
}

function getFilteredRubrics(chapter: Chapter | undefined, query: string): Rubric[] {
    if (!chapter) return []
    const normalized = query.toLowerCase().trim()
    if (!normalized) return chapter.rubrics

    return chapter.rubrics.filter((rubric) => {
        if (rubric.name.toLowerCase().includes(normalized)) return true
        if (rubric.meaning && rubric.meaning.toLowerCase().includes(normalized))
            return true
        if (rubric.remedies.some((r) => r.abbr.toLowerCase().includes(normalized)))
            return true
        if (
            rubric.remedies.some((r) =>
                getRemedyFullName(r.abbr).toLowerCase().includes(normalized)
            )
        )
            return true
        return false
    })
}

function findCommonRemedies(selected: SelectedRubric[]): CommonRemedy[] {
    if (selected.length < 2) return []

    const data: { rubric: Rubric; chapter: Chapter; book: KentRepertory }[] = []

    selected.forEach((sel) => {
        const book = REPERTORY_BOOKS[sel.bookIndex]
        if (!book) return
        const chapter = book.chapters.find((c) => c.id === sel.chapterId)
        if (!chapter) return
        const rubric = chapter.rubrics.find((r) => r.id === sel.rubricId)
        if (!rubric) return
        data.push({ rubric, chapter, book })
    })

    if (data.length < 2) return []

    const map = new Map<string, CommonRemedy>()

    data.forEach(({ rubric, chapter, book }) => {
        rubric.remedies.forEach((remedy) => {
            const key = remedy.abbr.toLowerCase()
            if (!map.has(key)) {
                map.set(key, {
                    abbr: remedy.abbr,
                    fullName: getRemedyFullName(remedy.abbr),
                    occurrences: [],
                })
            }
            map.get(key)?.occurrences.push({
                rubricId: rubric.id,
                rubricName: rubric.name,
                chapterName: chapter.name,
                bookName: book.bookName,
                grade: remedy.grade,
            })
        })
    })

    const result = Array.from(map.values()).filter(
        (rem) => rem.occurrences.length === data.length
    )

    result.sort((a, b) => {
        const scoreA = a.occurrences.reduce((sum, o) => sum + o.grade, 0)
        const scoreB = b.occurrences.reduce((sum, o) => sum + o.grade, 0)
        return scoreB - scoreA
    })

    return result
}

const KentRepertoryPage: React.FC = () => {
    const { user, isLoaded } = useUser()
    const router = useRouter();
    const [isChatbotOpen, setIsChatbotOpen] = useState(false)

    const [currentBookIndex, setCurrentBookIndex] = useState(0)
    const [currentChapterId, setCurrentChapterId] = useState<string | undefined>()
    const [searchQuery, setSearchQuery] = useState("")

    const [compareMode, setCompareMode] = useState(false)
    const [selectedRubrics, setSelectedRubrics] = useState<SelectedRubric[]>([])

    const [userNotes, setUserNotes] = useState<UserNoteCache>({})
    const [noteDrafts, setNoteDrafts] = useState<Record<string, string>>({})
    const { kentAccess } = useKentAccessStore();

    const [selectedRemedies, setSelectedRemedies] = useState<{
        [rubricId: string]: {
            abbr: string
            grade: number
        }
    }>({})

    const [remedyPanel, setRemedyPanel] = useState<{
        open: boolean
        abbr?: string
        fullName?: string
        grade?: number
    }>({ open: false })

    const [comparisonOpen, setComparisonOpen] = useState(false)

    const currentUserName =
        user?.fullName ||
        user?.username ||
        user?.primaryEmailAddress?.emailAddress ||
        undefined

    const currentBook = REPERTORY_BOOKS[currentBookIndex]
    const currentChapter: Chapter | undefined = useMemo(() => {
        if (!currentChapterId) return undefined
        return currentBook.chapters.find((c) => c.id === currentChapterId)
    }, [currentBook, currentChapterId])

    const filteredRubrics = useMemo(
        () => getFilteredRubrics(currentChapter, searchQuery),
        [currentChapter, searchQuery]
    )

    const commonRemedies = useMemo(
        () => findCommonRemedies(selectedRubrics),
        [selectedRubrics]
    )

    useEffect(() => {
        if (!currentChapterId) {
            const first = currentBook.chapters.find((c) => c.rubrics.length > 0)
            if (first) setCurrentChapterId(first.id)
        }
    }, [currentBook, currentChapterId])

    useEffect(() => {
        if (!isLoaded || !user?.id) return
        if (currentChapterId !== MIND_CHAPTER_ID) return

        const load = async () => {
            try {
                const res = await fetch(`/api/kent-notes?chapterId=${MIND_CHAPTER_ID}`)
                if (!res.ok) return
                const data = (await res.json()) as { notes: MindNotePayload[] }
                setUserNotes((prev) => {
                    const updated: UserNoteCache = { ...prev }
                    Object.keys(updated).forEach((key) => {
                        if (key.startsWith(`${MIND_CHAPTER_ID}_`)) delete updated[key]
                    })
                    data.notes.forEach((note) => {
                        const key = `${note.chapterId}_${note.rubricId}`
                        if (!updated[key]) updated[key] = []
                        updated[key].push({
                            text: note.text,
                            timestamp: new Date(note.createdAt).getTime(),
                            userName: note.userName,
                        })
                    })
                    return updated
                })
            } catch (e) {
                console.error("Failed to load Mind notes:", e)
            }
        }
        void load()
    }, [isLoaded, user?.id, currentChapterId])

    const handleSelectChapter = (chapterId: string) => {
        setCurrentChapterId(chapterId)
        setSearchQuery("")
    }

    const handleToggleRubricSelection = (rubricId: string) => {
        if (!currentChapter) return
        setSelectedRubrics((prev) => {
            const exists = prev.find(
                (r) =>
                    r.rubricId === rubricId &&
                    r.chapterId === currentChapter.id &&
                    r.bookIndex === currentBookIndex
            )
            if (exists) {
                return prev.filter(
                    (r) =>
                        !(
                            r.rubricId === rubricId &&
                            r.chapterId === currentChapter.id &&
                            r.bookIndex === currentBookIndex
                        )
                )
            }
            return [
                ...prev,
                {
                    rubricId,
                    chapterId: currentChapter.id,
                    bookIndex: currentBookIndex,
                },
            ]
        })
    }

    const isRubricSelected = (rubricId: string) => {
        if (!currentChapter) return false
        return selectedRubrics.some(
            (r) =>
                r.rubricId === rubricId &&
                r.chapterId === currentChapter.id &&
                r.bookIndex === currentBookIndex
        )
    }

    const handleToggleCompareMode = () => {
        setCompareMode((prev) => {
            const next = !prev
            if (!next) {
                setSelectedRubrics([])
                setComparisonOpen(false)
            }
            return next
        })
    }
    
    const handleSaveNote = async (rubricId: string) => {
        if (!currentChapter) return
        const key = `${currentChapter.id}_${rubricId}`
        const text = (noteDrafts[key] || "").trim()
        if (!text) return

        if (!user?.id) {
            alert("Please sign in to save notes.")
            return
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
            })
            if (!res.ok) throw new Error("Unable to save note")
            const data = (await res.json()) as { note: MindNotePayload }
            setUserNotes((prev) => {
                const updated: UserNoteCache = { ...prev }
                const cacheKey = `${data.note.chapterId}_${data.note.rubricId}`
                if (!updated[cacheKey]) updated[cacheKey] = []
                updated[cacheKey].push({
                    text: data.note.text,
                    timestamp: new Date(data.note.createdAt).getTime(),
                    userName: data.note.userName,
                })
                return updated
            })
            setNoteDrafts((prev) => {
                const copy = { ...prev }
                delete copy[key]
                return copy
            })
        } catch (e) {
            console.error("Failed to save note:", e)
            alert("We couldn't save your note. Please try again.")
        }
    }

    const handleShowRemedyPanel = (abbr: string, grade: number) => {
        const fullName = getRemedyFullName(abbr)
        setRemedyPanel({ open: true, abbr, fullName, grade })
    }

    const handleApplyChatQuery = (
        intent: string | { query?: string; chapterId?: string }
    ) => {
        const query = typeof intent === "string" ? intent : intent?.query || ""
        const chapterId =
            typeof intent === "string" ? undefined : intent?.chapterId

        if (chapterId) {
            setCurrentChapterId(chapterId)
            if (!query) setSearchQuery("")
        } else if (!currentChapterId) {
            const first = REPERTORY_BOOKS[0].chapters.find(
                (ch: Chapter) => ch.rubrics.length > 0
            )
            if (first) {
                setCurrentBookIndex(0)
                setCurrentChapterId(first.id)
            }
        }

        if (query) {
            setSearchQuery(query)
        }

        if (typeof window !== "undefined") {
            window.scrollTo({ top: 0, behavior: "smooth" })
        }
    }

    const KENT_CHAT_QUERY_KEY = "kentChatQuery"

    const handleKentRedirect = (
        intent?: string | { query?: string; chapterId?: string }
    ) => {
        if (typeof window === "undefined") return

        const payload =
            typeof intent === "string" ? { query: intent } : intent || undefined

        handleApplyChatQuery(payload || "")

        if (payload) {
            sessionStorage.setItem(KENT_CHAT_QUERY_KEY, JSON.stringify(payload))
        } else {
            sessionStorage.removeItem(KENT_CHAT_QUERY_KEY)
        }
    }

    useEffect(() => {
        if (typeof window === "undefined") return
        const stored = sessionStorage.getItem(KENT_CHAT_QUERY_KEY)
        if (!stored) return
        let parsed: string | { query?: string; chapterId?: string } = stored
        try {
            parsed = JSON.parse(stored)
        } catch {
            parsed = stored
        }
        handleApplyChatQuery(parsed)
        sessionStorage.removeItem(KENT_CHAT_QUERY_KEY)
    }, [])

    const selectedCount = selectedRubrics.length


    useEffect(()=>{
        if(!kentAccess){
            router.push('/software/access')
        }
    },[kentAccess, router])

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
                <header className="sticky top-0 z-20 border-b border-slate-700 bg-gradient-to-b from-slate-900/95 via-slate-900/90 to-slate-950">
                    <div className="mx-auto flex items-center justify-between gap-6 px-5 py-3">
                        <div className="flex items-center gap-3">
                            <div className="h-12 w-12 text-emerald-400">
                                <img src="/logo.jpg" alt="Homeosetu Logo" className="h-full w-full" />
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
                                value={currentBookIndex}
                                onChange={(e) => {
                                    const idx = Number(e.target.value)
                                    setCurrentBookIndex(idx)
                                    const first = REPERTORY_BOOKS[idx].chapters.find(
                                        (c) => c.rubrics.length > 0
                                    )
                                    setCurrentChapterId(first ? first.id : undefined)
                                    // setSelectedRubrics([])
                                    setSearchQuery("")
                                }}
                                className="mt-1 w-full rounded-md border border-slate-700 bg-slate-950 px-2.5 py-2 text-xs font-medium text-slate-100 shadow-sm outline-none ring-0 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                            >
                                {REPERTORY_BOOKS.map((book, idx) => (
                                    <option key={book.bookName} value={idx}>
                                        {book.bookName}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="flex-1 space-y-1 overflow-y-auto px-2 py-2">
                            {currentBook.chapters.map((chapter) => {
                                const active = chapter.id === currentChapterId
                                return (
                                    <div
                                        key={chapter.id}
                                        className={`flex cursor-pointer items-center gap-3 rounded-md px-3 py-2 text-xs transition-colors ${active
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
                                                {chapter.rubrics.length} rubrics
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </aside>

                    <section className="flex-1 px-5 py-5">
                        <div className="mb-4 flex items-center justify-between gap-4">
                            <div className="flex items-center gap-2 text-xs text-slate-400">
                                <span>{currentBook.bookName}</span>
                                <span className="text-slate-500">›</span>
                                <span className="font-medium text-emerald-300">
                                    {currentChapter ? currentChapter.name : "Select a chapter"}
                                </span>
                            </div>
                            <div className="flex items-center gap-3">
                                <button
                                    type="button"
                                    className={`inline-flex items-center gap-2 rounded-md border px-3 py-1.5 text-[11px] font-medium transition-colors ${compareMode
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
                                <div className="relative w-64">
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
                                        placeholder="Search rubrics..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full rounded-md border border-slate-700 bg-slate-950 py-1.5 pl-8 pr-2 text-xs text-slate-100 outline-none ring-0 placeholder:text-slate-500 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                                    />
                                </div>
                            </div>
                        </div>

                        {compareMode && (
                            <div className="mb-3 flex items-center justify-between rounded-lg border border-sky-500/40 bg-sky-500/10 px-3 py-2 text-[11px] text-sky-100">
                                <div>
                                    <span className="font-semibold">{selectedCount}</span>{" "}
                                    rubric{selectedCount === 1 ? "" : "s"} selected
                                </div>
                                <div className="flex items-center gap-2">
                                    <button
                                        type="button"
                                        className="rounded-md border border-slate-600 bg-slate-900 px-2 py-1 text-[11px] text-slate-200 hover:border-slate-400"
                                        onClick={() => {
                                            setSelectedRubrics([])
                                            setComparisonOpen(false)
                                        }}
                                    >
                                        Clear
                                    </button>
                                    <button
                                        type="button"
                                        disabled={selectedCount < 2}
                                        className={`rounded-md px-2 py-1 text-[11px] font-medium text-white transition-colors ${selectedCount < 2
                                            ? "cursor-not-allowed bg-sky-500/30"
                                            : "bg-sky-500 hover:bg-sky-600"
                                            }`}
                                        onClick={() => setComparisonOpen(true)}
                                    >
                                        View Common Remedies
                                    </button>
                                    <button
                                        type="button"
                                        className="rounded-md border border-red-400/60 bg-red-500/10 px-2 py-1 text-[11px] text-red-200 hover:border-red-300"
                                        onClick={() => {
                                            setCompareMode(false)
                                            setSelectedRubrics([])
                                            setComparisonOpen(false)
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

                        {(!currentChapter || filteredRubrics.length === 0) && (
                            <div className="mt-10 rounded-xl border border-dashed border-slate-700 bg-slate-900/60 px-6 py-10 text-center text-sm text-slate-400">
                                {currentChapter
                                    ? "No rubrics match your search in this chapter."
                                    : "Select a chapter from the left to view its rubrics."}
                            </div>
                        )}

                        <div className="space-y-3 pb-10">
                            {filteredRubrics.map((rubric) => {
                                const selected = isRubricSelected(rubric.id)
                                const allNotes: Note[] = [
                                    ...(rubric.notes || []),
                                    ...buildNotesFromCache(
                                        userNotes,
                                        currentChapter?.id,
                                        rubric.id
                                    ),
                                ]
                                const cacheKey = `${currentChapter?.id}_${rubric.id}`

                                return (
                                    <details
                                        key={rubric.id}
                                        className={`group rounded-xl border bg-slate-900/80 text-xs transition-colors ${selected
                                            ? "border-sky-400/70 shadow-[0_0_0_1px_rgba(56,189,248,0.4)]"
                                            : "border-slate-700 hover:border-slate-500"
                                            }`}
                                    >
                                        <summary className="flex cursor-pointer list-none items-center gap-3 px-4 py-3">
                                            {compareMode && (
                                                <button
                                                    type="button"
                                                    className={`flex h-5 w-5 items-center justify-center rounded-md border text-[11px] transition-colors ${selected
                                                        ? "border-sky-400 bg-sky-500 text-white"
                                                        : "border-slate-600 bg-slate-800 text-slate-300 hover:border-sky-300"
                                                        }`}
                                                    onClick={(e) => {
                                                        e.preventDefault()
                                                        e.stopPropagation()
                                                        handleToggleRubricSelection(rubric.id)
                                                    }}
                                                >
                                                    {selected && "✓"}
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
                                                                setSelectedRemedies((prev) => ({
                                                                    ...prev,
                                                                    [rubric.id]: {
                                                                        abbr: rem.abbr,
                                                                        grade: rem.grade,
                                                                    },
                                                                }))
                                                            }

                                                            className={`inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-[11px] ${rem.grade === 3
                                                                ? "border-rose-400/60 bg-rose-500/15 text-rose-200 font-semibold"
                                                                : rem.grade === 2
                                                                    ? "border-amber-300/60 bg-amber-400/15 text-amber-100"
                                                                    : "border-slate-700 bg-slate-900 text-slate-200"
                                                                }`}
                                                        >
                                                            <span
                                                                className={`h-1.5 w-1.5 rounded-full ${rem.grade === 3
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

                                            {selectedRemedies[rubric.id] && (
                                                <div className="mt-3 rounded-md border text-[14px] border-sky-400/40 bg-slate-900 px-3 py-2">
                                                    <div className="mt-1 gap-2 text-slate-200">
                                                        <p className="inline-block mt-1 mb-2 py-1 px-2 rounded bg-slate-800">
                                                            {selectedRemedies[rubric.id].abbr}
                                                        </p>
                                                        <p className="px-1.5 py-0.5">
                                                            {getRemedyFullName(selectedRemedies[rubric.id].abbr, rubric.id)}
                                                        </p>
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
                                                                    className={`rounded px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wide ${note.type === "system"
                                                                        ? "bg-emerald-500/20 text-emerald-200"
                                                                        : "bg-sky-500/20 text-sky-200"
                                                                        }`}
                                                                >
                                                                    {note.type === "system" ? "System" : "My Note"}
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
                                                    value={noteDrafts[cacheKey] || ""}
                                                    onChange={(e) =>
                                                        setNoteDrafts((prev) => ({
                                                            ...prev,
                                                            [cacheKey]: e.target.value,
                                                        }))
                                                    }
                                                    placeholder={
                                                        user?.id
                                                            ? "Enter your note here..."
                                                            : "Sign in to save personal notes."
                                                    }
                                                    disabled={!user?.id}
                                                    className="mt-1 w-full min-h-[70px] rounded-md border border-slate-700 bg-slate-950 px-2.5 py-1.5 text-[11px] text-slate-100 outline-none ring-0 placeholder:text-slate-500 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 disabled:cursor-not-allowed disabled:opacity-70"
                                                />
                                                <div className="mt-2 flex justify-end gap-2">
                                                    <button
                                                        type="button"
                                                        className="rounded-md border border-slate-600 bg-slate-900 px-2 py-1 text-[11px] text-slate-200 hover:border-slate-400"
                                                        onClick={() =>
                                                            setNoteDrafts((prev) => {
                                                                const copy = { ...prev }
                                                                delete copy[cacheKey]
                                                                return copy
                                                            })
                                                        }
                                                    >
                                                        Cancel
                                                    </button>
                                                    <button
                                                        type="button"
                                                        disabled={!user?.id}
                                                        className="rounded-md bg-emerald-500 px-3 py-1 text-[11px] font-medium text-emerald-950 shadow-sm hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-60"
                                                        onClick={() => handleSaveNote(rubric.id)}
                                                    >
                                                        Save
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </details>
                                )
                            })}
                        </div>
                    </section>
                </main>

                <div
                    className={`fixed inset-0 z-30 bg-black/50 transition-opacity ${remedyPanel.open || comparisonOpen ? "opacity-100" : "pointer-events-none opacity-0"
                        }`}
                    onClick={() => {
                        setRemedyPanel({ open: false })
                        setComparisonOpen(false)
                    }}
                />
                <div
                    className={`fixed top-0 z-40 flex h-screen w-80 max-w-[90vw] flex-col border-l border-slate-800 bg-slate-900/95 shadow-2xl transition-transform ${remedyPanel.open ? "right-0" : "-right-80"
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
                    className={`fixed top-0 z-40 flex h-screen w-80 max-w-[90vw] flex-col border-l border-slate-800 bg-slate-900/95 shadow-2xl transition-transform ${comparisonOpen ? (remedyPanel.open ? "right-80" : "right-0") : "-right-80"
                        }`}
                >
                    <div className="flex items-center justify-between border-b border-slate-800 px-4 py-3">
                        <h3 className="text-sm font-semibold text-slate-50">Common Remedies</h3>
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
                            {selectedRubrics.length === 0 && (
                                <div className="text-[11px] text-slate-400">
                                    Select at least two rubrics in compare mode.
                                </div>
                            )}
                            {selectedRubrics.map((sel, idx) => {
                                const book = REPERTORY_BOOKS[sel.bookIndex]
                                const chapter = book.chapters.find((c) => c.id === sel.chapterId)
                                const rubric = chapter?.rubrics.find((r) => r.id === sel.rubricId)
                                if (!chapter || !rubric) return null
                                return (
                                    <div
                                        key={`${sel.bookIndex}-${sel.chapterId}-${sel.rubricId}-${idx}`}
                                        className="mb-1 rounded-md border border-slate-700 bg-slate-900 px-2 py-1 text-[11px]"
                                    >
                                        <div className="text-slate-100">{rubric.name}</div>
                                        <div className="text-[10px] text-slate-400">
                                            {book.bookName} › {chapter.name}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>

                        <div>
                            <div className="mb-1 flex items-center justify-between">
                                <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                                    Common Remedies
                                </div>
                                <div className="inline-flex items-center rounded-full bg-slate-800 px-2 py-0.5 text-[11px] text-slate-100">
                                    {commonRemedies.length} found
                                </div>
                            </div>
                            {commonRemedies.length === 0 && (
                                <div className="text-[11px] text-slate-400">
                                    No remedies are common to all selected rubrics.
                                </div>
                            )}
                            {commonRemedies.map((rem) => (
                                <div
                                    key={rem.abbr}
                                    className="mb-2 cursor-pointer rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-[11px] hover:border-sky-400/80"
                                    onClick={() => {
                                        const maxGrade = Math.max(
                                            ...rem.occurrences.map((o) => o.grade)
                                        )
                                        handleShowRemedyPanel(rem.abbr, maxGrade)
                                    }}
                                >
                                    <div className="mb-1 flex items-center justify-between">
                                        <span className="font-semibold text-slate-100">
                                            {rem.abbr}
                                        </span>
                                        <span className="text-[10px] text-slate-400">
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
                    onClick={() => setIsChatbotOpen(true)}
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
                        <div className="fixed bottom-20 right-5 z-70 flex w-80 max-w-[calc(100%-32px)] flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
                            <div className="flex items-center justify-between bg-indigo-50 px-3.5 py-2.5 text-xs font-semibold text-slate-800">
                                <span>Ask Homeosetu</span>
                                <button
                                    type="button"
                                    className="text-base text-indigo-500"
                                    onClick={() => setIsChatbotOpen(false)}
                                    aria-label="Close chatbot"
                                >
                                    ×
                                </button>
                            </div>
                            <div className="h-[420px] bg-white">
                                <Chatbot onKentRequested={handleKentRedirect} />
                            </div>
                        </div>
                    </>
                )}
            </div>
        </>
    )
}

export default KentRepertoryPage

