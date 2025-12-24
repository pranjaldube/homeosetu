"use client"

import React, { useEffect, useState } from "react"
import Head from "next/head"
import Chatbot from "@/components/chatbot"

import {
  REPERTORY_BOOKS,
  getRemedyFullName,
  formatRemedy,
  Rubric,
  Note,
  KentRepertory,
  Chapter,
} from "./data"

class KentRepertoryApp {
  currentChapter: any = null
  currentBookIndex = 0
  userNotes: Record<string, { text: string; timestamp: number }[]> = {}
  compareMode = false
  selectedRubrics: Set<string> = new Set()

  chaptersList: HTMLElement | null = null
  rubricsContainer: HTMLElement | null = null
  breadcrumb: HTMLElement | null = null
  searchInput: HTMLInputElement | null = null
  remedyPanel: HTMLElement | null = null
  overlay: HTMLElement | null = null
  closePanelBtn: HTMLElement | null = null

  remedyName: HTMLElement | null = null
  remedyAbbr: HTMLElement | null = null
  remedyFullName: HTMLElement | null = null
  remedyGradation: HTMLElement | null = null

  compareToggle: HTMLElement | null = null
  compareModeBar: HTMLElement | null = null
  selectedCount: HTMLElement | null = null
  clearSelectionBtn: HTMLElement | null = null
  viewComparisonBtn: HTMLButtonElement | null = null
  exitCompareBtn: HTMLElement | null = null

  comparisonPanel: HTMLElement | null = null
  closeComparisonBtn: HTMLElement | null = null
  selectedRubricsList: HTMLElement | null = null
  commonRemediesList: HTMLElement | null = null
  commonCount: HTMLElement | null = null
  comparisonEmpty: HTMLElement | null = null

  constructor() {
    this.userNotes = this.loadUserNotes()
    this.init()
  }

  getCurrentBook(): KentRepertory {
    return REPERTORY_BOOKS[this.currentBookIndex]
  }

  getCurrentChapters() {
    return this.getCurrentBook().chapters
  }

  init() {
    this.cacheElements()
    this.renderChapters()
    this.bindEvents()

    const firstChapterWithRubrics = this.getCurrentChapters().find(
      (ch) => ch.rubrics.length > 0
    )

    if (firstChapterWithRubrics) {
      this.selectChapter(firstChapterWithRubrics.id)
    }
  }

  cacheElements() {
    this.chaptersList = document.getElementById("chaptersList")
    this.rubricsContainer = document.getElementById("rubricsContainer")
    this.breadcrumb = document.getElementById("breadcrumb")
    this.searchInput = document.getElementById("searchInput") as HTMLInputElement
    this.remedyPanel = document.getElementById("remedyPanel")
    this.overlay = document.getElementById("overlay")
    this.closePanelBtn = document.getElementById("closePanel")

    this.remedyName = document.getElementById("remedyName")
    this.remedyAbbr = document.getElementById("remedyAbbr")
    this.remedyFullName = document.getElementById("remedyFullName")
    this.remedyGradation = document.getElementById("remedyGradation")

    this.compareToggle = document.getElementById("compareToggle")
    this.compareModeBar = document.getElementById("compareModeBar")
    this.selectedCount = document.getElementById("selectedCount")
    this.clearSelectionBtn = document.getElementById("clearSelection")
    this.viewComparisonBtn = document.getElementById(
      "viewComparison"
    ) as HTMLButtonElement
    this.exitCompareBtn = document.getElementById("exitCompare")

    this.comparisonPanel = document.getElementById("comparisonPanel")
    this.closeComparisonBtn = document.getElementById("closeComparison")
    this.selectedRubricsList = document.getElementById("selectedRubricsList")
    this.commonRemediesList = document.getElementById("commonRemediesList")
    this.commonCount = document.getElementById("commonCount")
    this.comparisonEmpty = document.getElementById("comparisonEmpty")
  }

  bindEvents() {
    this.searchInput?.addEventListener("input", (e) =>
      this.handleSearch((e.target as HTMLInputElement).value)
    )

    this.closePanelBtn?.addEventListener("click", () => this.closeRemedyPanel())
    this.overlay?.addEventListener("click", () => {
      this.closeRemedyPanel()
      this.closeComparisonPanel()
    })

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        this.closeRemedyPanel()
        this.closeComparisonPanel()
      }
    })

    document.querySelectorAll(".nav-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        document
          .querySelectorAll(".nav-btn")
          .forEach((b) => b.classList.remove("active"))
          ; (e.target as HTMLElement).classList.add("active")
      })
    })

    this.compareToggle?.addEventListener("click", () => this.toggleCompareMode())
    this.clearSelectionBtn?.addEventListener("click", () =>
      this.clearRubricSelection()
    )
    this.viewComparisonBtn?.addEventListener("click", () =>
      this.showComparisonPanel()
    )
    this.exitCompareBtn?.addEventListener("click", () => this.exitCompareMode())
    this.closeComparisonBtn?.addEventListener("click", () =>
      this.closeComparisonPanel()
    )
  }

  renderChapters() {
    if (!this.chaptersList) return

    const currentBook = this.getCurrentBook()

    this.chaptersList.innerHTML = `
      <div class="book-selector-wrapper">
        <select id="bookDropdown" class="book-dropdown">
          ${REPERTORY_BOOKS.map(
      (book, idx) =>
        `<option value="${idx}" ${idx === this.currentBookIndex ? "selected" : ""
        }>${book.bookName}</option>`
    ).join("")}
        </select>
      </div>
      <div class="chapters-list-inner">
        ${currentBook.chapters
        .map(
          (chapter) => `
          <div class="chapter-item ${this.currentChapter && this.currentChapter.id === chapter.id
              ? "active"
              : ""
            }" data-book-index="${this.currentBookIndex}" data-chapter-id="${chapter.id}">
            <div class="chapter-icon-small">${chapter.icon}</div>
            <div class="chapter-info">
              <div class="chapter-name">${chapter.name}</div>
              <div class="chapter-rubric-count">${chapter.rubrics.length} rubrics</div>
            </div>
          </div>
        `
        )
        .join("")}
      </div>
    `

    // Bind book dropdown
    const bookDropdown = this.chaptersList.querySelector(
      "#bookDropdown"
    ) as HTMLSelectElement | null
    if (bookDropdown) {
      bookDropdown.addEventListener("change", (e) => {
        const idx = Number((e.target as HTMLSelectElement).value)
        this.currentBookIndex = idx
        this.renderChapters()
        const firstChapterWithRubrics = this.getCurrentChapters().find(
          (ch) => ch.rubrics.length > 0
        )
        if (firstChapterWithRubrics) {
          this.selectChapter(firstChapterWithRubrics.id)
        }
      })
    }

    // Bind chapter clicks
    this.chaptersList.querySelectorAll(".chapter-item").forEach((item) => {
      item.addEventListener("click", () => {
        const bookIndex = Number(
          (item as HTMLElement).dataset.bookIndex || 0
        )
        this.currentBookIndex = bookIndex
        this.selectChapter((item as HTMLElement).dataset.chapterId || "")
      })
    })
  }

  selectChapter(chapterId: string) {
    this.currentChapter = this.getCurrentChapters().find(
      (ch) => ch.id === chapterId
    )
    if (!this.currentChapter) return

    this.chaptersList
      ?.querySelectorAll(".chapter-item")
      .forEach((item) =>
        item.classList.toggle(
          "active",
          (item as HTMLElement).dataset.chapterId === chapterId
        )
      )

    this.updateBreadcrumb()
    this.renderRubrics(this.currentChapter.rubrics)
  }

  updateBreadcrumb() {
    if (!this.currentChapter || !this.breadcrumb) return
    this.breadcrumb.innerHTML = `
      <span class="crumb">Kent Repertory</span>
      <span class="separator">›</span>
      <span class="crumb active">${this.currentChapter.name}</span>
    `
  }

  renderRubrics(rubrics: Rubric[]) {
    if (!this.rubricsContainer) return
    if (rubrics.length === 0) {
      this.rubricsContainer.innerHTML = `
        <div class="empty-state">
          <svg class="empty-state-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M9 12h6M12 9v6M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          <h3>No Rubrics Yet</h3>
          <p>This chapter will be populated in a future update.</p>
        </div>
      `
      return
    }

    const legendHTML = `
      <div class="gradation-legend">
        <span class="legend-title">Gradation:</span>
        <div class="legend-items">
          <div class="legend-item">
            <span class="legend-dot grade-1"></span>
            <span class="legend-label">1 Mark</span>
          </div>
          <div class="legend-item">
            <span class="legend-dot grade-2"></span>
            <span class="legend-label">2 Marks</span>
          </div>
          <div class="legend-item">
            <span class="legend-dot grade-3"></span>
            <span class="legend-label">3 Marks</span>
          </div>
        </div>
      </div>
    `

    const rubricsHTML = rubrics.map((rubric) => this.createRubricHTML(rubric)).join("")
    this.rubricsContainer.innerHTML = legendHTML + rubricsHTML
    this.bindRubricEvents()
  }

  createRubricHTML(rubric: Rubric) {
    const remedyCount = rubric.remedies.length

    const allNotes = [...(rubric.notes || []), ...this.getUserNotesForRubric(rubric.id)]
    const isSelected = this.selectedRubrics.has(rubric.id)

    return `
      <div class="rubric-accordion ${isSelected ? "selected" : ""}" data-rubric-id="${rubric.id}">
        <div class="rubric-header">
          <div class="rubric-checkbox ${isSelected ? "checked" : ""}" data-rubric-id="${rubric.id}"></div>
          <svg class="expand-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M9 18l6-6-6-6"/>
          </svg>
          <div class="rubric-title">
            <span class="rubric-name">${rubric.name}</span>
            <span class="remedy-count">${remedyCount} remedies</span>
          </div>
        </div>
        <div class="rubric-content">
          ${this.createRemediesSectionHTML(rubric.remedies, rubric.id)}
          ${rubric.meaning ? this.createMeaningSectionHTML(rubric.meaning) : ""}
          ${this.createRemedyDetailsPlaceholderHTML(rubric.id)}
          ${this.createNotesSectionHTML(allNotes)}
          ${rubric.crossReferences ? this.createCrossRefSectionHTML(rubric.crossReferences) : ""}
          ${this.createAddNoteSectionHTML(rubric.id)}
        </div>
      </div>
    `
  }

  createRemediesSectionHTML(remedies: Rubric["remedies"], rubricId: string) {
    const grade3 = remedies.filter((r) => r.grade === 3)
    const grade2 = remedies.filter((r) => r.grade === 2)
    const grade1 = remedies.filter((r) => r.grade === 1)

    const renderGroup = (group: typeof remedies, grade: number) =>
      group
        .map(
          (r) => `
            <span class="remedy-tag grade-${grade}" data-abbr="${r.abbr}" data-grade="${r.grade}" data-rubric-id="${rubricId}">
              <span class="grade-indicator"></span>
              ${r.abbr}
            </span>
          `
        )
        .join("")

    return `
      <div class="remedies-section">
        <div class="section-label">Remedies</div>
        <div class="remedies-list">
          ${renderGroup(grade3, 3)}
          ${renderGroup(grade2, 2)}
          ${renderGroup(grade1, 1)}
        </div>
      </div>
    `
  }

  createMeaningSectionHTML(meaning: string) {
    return `
      <div class="meaning-section">
        <div class="section-label">Meaning</div>
        <p class="meaning-text">${meaning}</p>
      </div>
    `
  }

  createRemedyDetailsPlaceholderHTML(rubricId: string) {
    return `
      <div class="remedy-details-container" data-rubric-id="${rubricId}"></div>
    `
  }

  createRemedyDetailsHTML(abbr: string, grade: number, rubricId: string) {
    const fullName = getRemedyFullName(abbr)
    const gradeText = `${grade} Mark${grade > 1 ? "s" : ""} (${this.getGradeDescription(grade)})`

    // Placeholder data - can be replaced with actual remedy data structure later
    const description = `Detailed description for ${fullName} (${abbr}) in this context.`
    const causes = `Common causes and clinical conditions associated with ${fullName}.`
    const investigations = `Recommended investigations: Complete blood count, specific diagnostic tests, etc.`

    return `
      <div class="remedy-details-section" data-abbr="${abbr}">
        <div class="remedy-details-header">
          <div class="remedy-details-title">
            <span class="remedy-name-display">${abbr}</span>
            <span class="remedy-grade-badge grade-${grade}">${gradeText}</span>
          </div>
          <button class="close-remedy-details" data-rubric-id="${rubricId}" data-abbr="${abbr}">×</button>
        </div>
        <div class="remedy-details-content">
          <div class="remedy-detail-item">
            <div class="remedy-detail-label">Description</div>
            <p class="remedy-detail-text">${fullName}</p>
          </div>
        </div>
      </div>
    `
  }

  createNotesSectionHTML(notes: Rubric["notes"]) {
    if (!notes.length) return ""
    const notesHTML = notes
      .map(
        (note) => `
        <div class="note-item">
          <div class="note-header">
            <span class="note-tag ${note.type}">${note.type === "system" ? "System" : "My Note"}</span>
            ${note.source ? `<span class="note-source">${note.source}</span>` : ""}
          </div>
          <p class="note-text">${note.text}</p>
        </div>
      `
      )
      .join("")

    return `
      <div class="notes-section">
        <div class="section-label">Notes</div>
        ${notesHTML}
      </div>
    `
  }

  createCrossRefSectionHTML(crossRefs: NonNullable<Rubric["crossReferences"]>) {
    if (!crossRefs?.length) return ""

    const refsHTML = crossRefs
      .map(
        (ref) => `
        <a class="cross-ref-link" data-chapter="${ref.chapter}" data-rubric="${ref.rubric}">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
          </svg>
          ${ref.chapter} › ${ref.rubric}
        </a>
      `
      )
      .join("")

    return `
      <div class="cross-ref-section">
        <div class="section-label">Cross References</div>
        <div class="cross-ref-list">
          ${refsHTML}
        </div>
      </div>
    `
  }

  createAddNoteSectionHTML(rubricId: string) {
    return `
      <div class="add-note-section">
        <button class="add-note-btn" data-rubric-id="${rubricId}">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 5v14M5 12h14"/>
          </svg>
          Add Your Note
        </button>
        <div class="note-input-area" data-rubric-id="${rubricId}">
          <textarea class="note-textarea" placeholder="Enter your note here..."></textarea>
          <div class="note-actions">
            <button class="note-action-btn cancel">Cancel</button>
            <button class="note-action-btn save">Save Note</button>
          </div>
        </div>
      </div>
    `
  }

  bindRubricEvents() {
    this.rubricsContainer
      ?.querySelectorAll(".rubric-header")
      .forEach((header) => {
        header.addEventListener("click", (e) => {
          if ((e.target as HTMLElement).closest(".rubric-checkbox")) return
          header.closest(".rubric-accordion")?.classList.toggle("open")
        })
      })

    this.rubricsContainer
      ?.querySelectorAll(".rubric-checkbox")
      .forEach((checkbox) => {
        checkbox.addEventListener("click", (e) => {
          e.stopPropagation()
          if (!this.compareMode) return
          const rubricId = (checkbox as HTMLElement).dataset.rubricId
          if (rubricId) this.toggleRubricSelection(rubricId)
        })
      })

    this.rubricsContainer?.querySelectorAll(".remedy-tag").forEach((tag) => {
      tag.addEventListener("click", (e) => {
        e.stopPropagation()
        const el = tag as HTMLElement
        const abbr = el.dataset.abbr || ""
        const grade = Number(el.dataset.grade || "1")
        const rubricId = el.dataset.rubricId || ""
        this.showRemedyDetails(abbr, grade, rubricId)
      })
    })

    // Bind close buttons for remedy details
    this.rubricsContainer?.querySelectorAll(".close-remedy-details").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation()
        const el = btn as HTMLElement
        const rubricId = el.dataset.rubricId || ""
        this.hideRemedyDetails(rubricId)
      })
    })

    this.rubricsContainer?.querySelectorAll(".add-note-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation()
        const rubricId = (btn as HTMLElement).dataset.rubricId
        const inputArea = this.rubricsContainer?.querySelector(
          `.note-input-area[data-rubric-id="${rubricId}"]`
        ) as HTMLElement | null
        if (inputArea) {
          inputArea.classList.add("active")
            ; (btn as HTMLElement).style.display = "none"
        }
      })
    })

    this.rubricsContainer
      ?.querySelectorAll(".note-action-btn.cancel")
      .forEach((btn) => {
        btn.addEventListener("click", (e) => {
          e.stopPropagation()
          const inputArea = (btn as HTMLElement).closest(
            ".note-input-area"
          ) as HTMLElement | null
          if (!inputArea) return
          const rubricId = inputArea.dataset.rubricId
          const addBtn = this.rubricsContainer?.querySelector(
            `.add-note-btn[data-rubric-id="${rubricId}"]`
          ) as HTMLElement | null
          inputArea.classList.remove("active")
          const textarea = inputArea.querySelector("textarea") as HTMLTextAreaElement
          if (textarea) textarea.value = ""
          if (addBtn) addBtn.style.display = "inline-flex"
        })
      })

    this.rubricsContainer
      ?.querySelectorAll(".note-action-btn.save")
      .forEach((btn) => {
        btn.addEventListener("click", (e) => {
          e.stopPropagation()
          const inputArea = (btn as HTMLElement).closest(
            ".note-input-area"
          ) as HTMLElement | null
          if (!inputArea) return
          const rubricId = inputArea.dataset.rubricId
          const textarea = inputArea.querySelector("textarea") as HTMLTextAreaElement
          const text = textarea?.value.trim()
          if (!rubricId || !text) return
          this.addUserNote(rubricId, text)
          textarea.value = ""
          inputArea.classList.remove("active")
          const addBtn = this.rubricsContainer?.querySelector(
            `.add-note-btn[data-rubric-id="${rubricId}"]`
          ) as HTMLElement | null
          if (addBtn) addBtn.style.display = "inline-flex"
          if (this.currentChapter) this.renderRubrics(this.currentChapter.rubrics)
        })
      })

    this.rubricsContainer?.querySelectorAll(".cross-ref-link").forEach((link) => {
      link.addEventListener("click", (e) => {
        e.stopPropagation()
        const el = link as HTMLElement
        const chapter = el.dataset.chapter || ""
        const rubric = el.dataset.rubric || ""
        this.navigateToCrossRef(chapter, rubric)
      })
    })
  }

  showRemedyDetails(abbr: string, grade: number, rubricId: string) {
    const container = this.rubricsContainer?.querySelector(
      `.remedy-details-container[data-rubric-id="${rubricId}"]`
    ) as HTMLElement | null

    if (!container) return

    // Check if details already exist for this remedy
    const existingDetails = container.querySelector(
      `.remedy-details-section[data-abbr="${abbr}"]`
    ) as HTMLElement | null

    // Accordion behavior: Close and remove all other remedy details in this rubric
    const allDetails = container.querySelectorAll(".remedy-details-section")
    allDetails.forEach((details) => {
      const detailsEl = details as HTMLElement
      if (detailsEl.dataset.abbr !== abbr) {
        detailsEl.classList.remove("active")
        // Remove from DOM after animation completes
        setTimeout(() => {
          if (!detailsEl.classList.contains("active")) {
            detailsEl.remove()
          }
        }, 300)
      }
    })

    if (existingDetails) {
      // Toggle visibility - if already active, close it; otherwise open it
      if (existingDetails.classList.contains("active")) {
        existingDetails.classList.remove("active")
        // Remove from DOM after animation completes
        setTimeout(() => {
          if (!existingDetails.classList.contains("active") && existingDetails.parentNode) {
            existingDetails.remove()
          }
        }, 300)
      } else {
        existingDetails.classList.add("active")
        setTimeout(() => {
          existingDetails.scrollIntoView({ behavior: "smooth", block: "nearest" })
        }, 10)
      }
      return
    }

    // Create and insert new remedy details (all others already closed above)
    const detailsHTML = this.createRemedyDetailsHTML(abbr, grade, rubricId)
    container.insertAdjacentHTML("beforeend", detailsHTML)

    // Make it visible
    const newDetails = container.querySelector(
      `.remedy-details-section[data-abbr="${abbr}"]`
    ) as HTMLElement | null
    if (newDetails) {
      setTimeout(() => {
        newDetails.classList.add("active")
        newDetails.scrollIntoView({ behavior: "smooth", block: "nearest" })
      }, 10)
    }

    // Bind close button
    const closeBtn = container.querySelector(
      `.close-remedy-details[data-abbr="${abbr}"]`
    )
    if (closeBtn) {
      closeBtn.addEventListener("click", (e) => {
        e.stopPropagation()
        this.hideRemedyDetails(rubricId, abbr)
      })
    }
  }

  hideRemedyDetails(rubricId: string, abbr?: string) {
    const container = this.rubricsContainer?.querySelector(
      `.remedy-details-container[data-rubric-id="${rubricId}"]`
    ) as HTMLElement | null

    if (!container) return

    if (abbr) {
      // Hide specific remedy details
      const details = container.querySelector(
        `.remedy-details-section[data-abbr="${abbr}"]`
      ) as HTMLElement | null
      if (details) {
        details.classList.remove("active")
        setTimeout(() => {
          details.remove()
        }, 300)
      }
    } else {
      // Hide all remedy details for this rubric
      const allDetails = container.querySelectorAll(".remedy-details-section")
      allDetails.forEach((details) => {
        ; (details as HTMLElement).classList.remove("active")
        setTimeout(() => {
          details.remove()
        }, 300)
      })
    }
  }

  showRemedyPanel(abbr: string, grade: string | number) {
    const fullName = getRemedyFullName(abbr)
    const g = Number(grade) || 1
    const gradeText = `${g} Mark${g > 1 ? "s" : ""} (${this.getGradeDescription(g)})`

    if (this.remedyName) this.remedyName.textContent = fullName
    if (this.remedyAbbr) this.remedyAbbr.textContent = abbr
    if (this.remedyFullName) this.remedyFullName.textContent = fullName
    if (this.remedyGradation) this.remedyGradation.textContent = gradeText

    this.remedyPanel?.classList.add("open")
    this.overlay?.classList.add("active")
  }

  closeRemedyPanel() {
    this.remedyPanel?.classList.remove("open")
    this.overlay?.classList.remove("active")
  }

  getGradeDescription(grade: number) {
    switch (grade) {
      case 1:
        return "Confirmed by clinical experience"
      case 2:
        return "Frequently confirmed"
      case 3:
        return "Strongly indicated"
      default:
        return ""
    }
  }

  handleSearch(query: string) {
    if (!this.currentChapter) return
    const normalizedQuery = query.toLowerCase().trim()
    if (!normalizedQuery) {
      this.renderRubrics(this.currentChapter.rubrics)
      return
    }

    const filteredRubrics = this.currentChapter.rubrics.filter((rubric: Rubric) => {
      if (rubric.name.toLowerCase().includes(normalizedQuery)) return true
      if (rubric.meaning && rubric.meaning.toLowerCase().includes(normalizedQuery)) return true
      if (rubric.remedies.some((r) => r.abbr.toLowerCase().includes(normalizedQuery))) return true
      if (
        rubric.remedies.some((r) =>
          getRemedyFullName(r.abbr).toLowerCase().includes(normalizedQuery)
        )
      )
        return true
      return false
    })
    console.log("filteredRubrics", filteredRubrics)
    this.renderRubrics(filteredRubrics)
  }

  applyChatQuery(intent: string | { query?: string; chapterId?: string }) {
    const query = typeof intent === "string" ? intent : intent?.query || ""
    const chapterId = typeof intent === "string" ? undefined : intent?.chapterId

    if (chapterId) {
      this.selectChapter(chapterId)
      // For pure chapter selection from chatbot, clear any previous search text
      if (!query && this.searchInput) {
        this.searchInput.value = ""
      }
    } else if (!this.currentChapter) {
      const firstChapterWithRubrics = REPERTORY_BOOKS[0].chapters.find(
        (ch: Chapter) => ch.rubrics.length > 0
      )
      if (firstChapterWithRubrics) {
        this.currentBookIndex = 0
        this.selectChapter(firstChapterWithRubrics.id)
      }
    }

    if (query && this.searchInput) {
      this.searchInput.value = query
      this.handleSearch(query)
    } else if (query) {
      this.handleSearch(query)
    }

    this.rubricsContainer?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  navigateToCrossRef(chapterName: string, rubricName: string) {
    const chapter =
      REPERTORY_BOOKS[0].chapters.find(
        (ch: Chapter) =>
          ch.name.toLowerCase() === chapterName.toLowerCase()
      ) ||
      this.getCurrentChapters().find(
        (ch: Chapter) => ch.name.toLowerCase() === chapterName.toLowerCase()
      )
    if (!chapter) return

    this.selectChapter(chapter.id)

    setTimeout(() => {
      const rubricElement = Array.from(
        this.rubricsContainer?.querySelectorAll(".rubric-accordion") || []
      ).find((el) => {
        const nameEl = el.querySelector(".rubric-name")
        return (
          nameEl &&
          nameEl.textContent?.toLowerCase() === rubricName.toLowerCase()
        )
      }) as HTMLElement | undefined

      if (rubricElement) {
        rubricElement.classList.add("open")
        rubricElement.scrollIntoView({ behavior: "smooth", block: "center" })
      }
    }, 100)
  }

  loadUserNotes(): Record<string, { text: string; timestamp: number }[]> {
    try {
      const saved = localStorage.getItem("kentRepertory_userNotes")
      const parsed = saved ? JSON.parse(saved) : {}
      return parsed
    } catch (e) {
      console.warn("Failed to load user notes:", e)
      return {}
    }
  }

  saveUserNotes() {
    try {
      localStorage.setItem("kentRepertory_userNotes", JSON.stringify(this.userNotes))
    } catch (e) {
      console.warn("Failed to save user notes:", e)
    }
  }

  getUserNotesForRubric(rubricId: string): Note[] {
    const key = `${this.currentChapter?.id}_${rubricId}`
    const notes = this.userNotes[key] || []
    return notes.map<Note>((n) => ({
      type: "user",
      source: new Date(n.timestamp).toLocaleDateString(),
      text: n.text,
    }))
  }

  addUserNote(rubricId: string, text: string) {
    const key = `${this.currentChapter?.id}_${rubricId}`
    if (!this.userNotes[key]) this.userNotes[key] = []
    this.userNotes[key].push({ text: String(text), timestamp: Date.now() })
    this.saveUserNotes()
  }

  toggleCompareMode() {
    this.compareMode = !this.compareMode
    this.compareToggle?.classList.toggle("active", this.compareMode)
    this.compareModeBar?.classList.toggle("active", this.compareMode)
    this.rubricsContainer?.classList.toggle("compare-mode", this.compareMode)
    if (!this.compareMode) this.clearRubricSelection()
  }

  exitCompareMode() {
    this.compareMode = false
    this.compareToggle?.classList.remove("active")
    this.compareModeBar?.classList.remove("active")
    this.rubricsContainer?.classList.remove("compare-mode")
    this.clearRubricSelection()
    this.closeComparisonPanel()
  }

  toggleRubricSelection(rubricId: string) {
    if (this.selectedRubrics.has(rubricId)) this.selectedRubrics.delete(rubricId)
    else this.selectedRubrics.add(rubricId)
    this.updateSelectionUI(rubricId)
    this.updateCompareBar()
  }

  updateSelectionUI(rubricId: string) {
    const accordion = this.rubricsContainer?.querySelector(
      `.rubric-accordion[data-rubric-id="${rubricId}"]`
    )
    const checkbox = this.rubricsContainer?.querySelector(
      `.rubric-checkbox[data-rubric-id="${rubricId}"]`
    )
    const isSelected = this.selectedRubrics.has(rubricId)
    accordion?.classList.toggle("selected", isSelected)
    checkbox?.classList.toggle("checked", isSelected)
  }

  updateCompareBar() {
    const count = this.selectedRubrics.size
    if (this.selectedCount)
      this.selectedCount.textContent = `${count} rubric${count !== 1 ? "s" : ""} selected`
    if (this.viewComparisonBtn) this.viewComparisonBtn.disabled = count < 2
  }

  clearRubricSelection() {
    this.selectedRubrics.forEach((rubricId) => {
      this.updateSelectionUI(rubricId)
    })
    this.selectedRubrics.clear()
    this.updateCompareBar()
  }

  showComparisonPanel() {
    if (this.selectedRubrics.size < 2) return
    const selectedRubricsData = this.getSelectedRubricsData()
    const commonRemedies = this.findCommonRemedies(selectedRubricsData)
    this.renderSelectedRubricsList(selectedRubricsData)
    this.renderCommonRemedies(commonRemedies)
    this.comparisonPanel?.classList.add("open")
    this.overlay?.classList.add("active")
  }

  closeComparisonPanel() {
    this.comparisonPanel?.classList.remove("open")
    if (!this.remedyPanel?.classList.contains("open")) {
      this.overlay?.classList.remove("active")
    }
  }

  getSelectedRubricsData() {
    if (!this.currentChapter) return []
    return this.currentChapter.rubrics.filter((rubric: Rubric) =>
      this.selectedRubrics.has(rubric.id)
    )
  }

  findCommonRemedies(rubrics: Rubric[]) {
    if (rubrics.length < 2) return []
    const remedyMap = new Map<
      string,
      { abbr: string; fullName: string; occurrences: { rubricId: string; rubricName: string; grade: number }[] }
    >()

    rubrics.forEach((rubric) => {
      rubric.remedies.forEach((remedy) => {
        const key = remedy.abbr.toLowerCase()
        if (!remedyMap.has(key)) {
          remedyMap.set(key, {
            abbr: remedy.abbr,
            fullName: getRemedyFullName(remedy.abbr),
            occurrences: [],
          })
        }
        remedyMap.get(key)?.occurrences.push({
          rubricId: rubric.id,
          rubricName: rubric.name,
          grade: remedy.grade,
        })
      })
    })

    const commonRemedies = Array.from(remedyMap.values()).filter(
      (remedy) => remedy.occurrences.length === rubrics.length
    )

    commonRemedies.sort((a, b) => {
      const scoreA = a.occurrences.reduce((sum, occ) => sum + occ.grade, 0)
      const scoreB = b.occurrences.reduce((sum, occ) => sum + occ.grade, 0)
      return scoreB - scoreA
    })

    return commonRemedies
  }

  renderSelectedRubricsList(rubrics: Rubric[]) {
    if (!this.selectedRubricsList) return
    this.selectedRubricsList.innerHTML = rubrics
      .map(
        (rubric) => `
        <div class="selected-rubric-item">
          <span class="selected-rubric-name">${rubric.name}</span>
          <span class="selected-rubric-count">${rubric.remedies.length} remedies</span>
        </div>
      `
      )
      .join("")
  }

  renderCommonRemedies(commonRemedies: any[]) {
    if (this.commonCount) this.commonCount.textContent = `${commonRemedies.length} found`

    const hasResults = commonRemedies.length > 0
    this.comparisonEmpty?.classList.toggle("visible", !hasResults)
    const section = document.querySelector(".common-remedies-section") as HTMLElement | null
    if (section) section.style.display = hasResults ? "block" : "none"
    if (!hasResults || !this.commonRemediesList) return

    this.commonRemediesList.innerHTML = commonRemedies
      .map((remedy) => {
        const totalScore = remedy.occurrences.reduce(
          (sum: number, occ: any) => sum + occ.grade,
          0
        )

        const gradesHTML = remedy.occurrences
          .map(
            (occ: any) => `
            <div class="grade-in-rubric">
              <span class="grade-dot g${occ.grade}"></span>
              <span class="rubric-ref" title="${occ.rubricName}">${occ.rubricName}</span>
            </div>
          `
          )
          .join("")

        return `
          <div class="common-remedy-card" data-abbr="${remedy.abbr}">
            <div class="common-remedy-header">
              <div>
                <div class="common-remedy-name">${remedy.fullName}</div>
                <div class="common-remedy-abbr">${remedy.abbr}</div>
              </div>
              <div class="total-grade-score">${totalScore}</div>
            </div>
            <div class="common-remedy-grades">
              ${gradesHTML}
            </div>
          </div>
        `
      })
      .join("")

    this.commonRemediesList.querySelectorAll(".common-remedy-card").forEach((card) => {
      card.addEventListener("click", () => {
        const abbr = (card as HTMLElement).dataset.abbr ?? ""
        if (!abbr) return
        const remedy = commonRemedies.find((r) => r.abbr === abbr)
        if (remedy) {
          const maxGrade = Math.max(...remedy.occurrences.map((o: any) => o.grade))
          this.showRemedyPanel(abbr, maxGrade)
        }
      })
    })
  }
}

const KENT_STYLES = `
/* ============================================
   Kent Repertory - Elegant Medical Aesthetic
   ============================================ */

:root {
    /* Color Palette - Deep Medical Tones */
    --bg-primary: #0d1117;
    --bg-secondary: #161b22;
    --bg-tertiary: #21262d;
    --bg-elevated: #282e36;
    
    --accent-primary: #7c9885;
    --accent-secondary: #5d7a66;
    --accent-tertiary: #4a6352;
    --accent-glow: rgba(124, 152, 133, 0.15);
    
    --text-primary: #e6edf3;
    --text-secondary: #a8b4c0;
    --text-muted: #6e7c8a;
    --text-accent: #8fb898;
    
    --border-primary: #30363d;
    --border-secondary: #21262d;
    
    --gradation-1: #a8b4c0;
    --gradation-2: #e8b94b;
    --gradation-3: #e05c5c;
    
    --shadow-soft: 0 4px 20px rgba(0, 0, 0, 0.3);
    --shadow-medium: 0 8px 32px rgba(0, 0, 0, 0.4);
    
    /* Typography */
    --font-display: 'Cormorant Garamond', Georgia, serif;
    --font-body: 'Source Sans 3', -apple-system, sans-serif;
    
    /* Spacing */
    --space-xs: 0.25rem;
    --space-sm: 0.5rem;
    --space-md: 1rem;
    --space-lg: 1.5rem;
    --space-xl: 2rem;
    --space-2xl: 3rem;
    
    /* Transitions */
    --transition-fast: 150ms ease;
    --transition-medium: 250ms ease;
    --transition-slow: 400ms cubic-bezier(0.4, 0, 0.2, 1);
}

/* Reset & Base */
*, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

html {
    font-size: 16px;
    scroll-behavior: smooth;
}

body {
    font-family: var(--font-body);
    background: var(--bg-primary);
    color: var(--text-primary);
    line-height: 1.6;
    min-height: 100vh;
    overflow-x: hidden;
}

/* Background Pattern */
body::before {
    content: '';
    position: fixed;
    inset: 0;
    background: 
        radial-gradient(ellipse at 20% 20%, rgba(124, 152, 133, 0.08) 0%, transparent 50%),
        radial-gradient(ellipse at 80% 80%, rgba(93, 122, 102, 0.06) 0%, transparent 50%),
        linear-gradient(180deg, var(--bg-primary) 0%, #0a0e12 100%);
    pointer-events: none;
    z-index: -1;
}

/* App Container */
.app-container {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
}

/* ============================================
   Header
   ============================================ */
.main-header {
    background: linear-gradient(180deg, var(--bg-secondary) 0%, rgba(22, 27, 34, 0.95) 100%);
    border-bottom: 1px solid var(--border-primary);
    backdrop-filter: blur(10px);
    position: sticky;
    top: 0;
    z-index: 100;
}

.header-content {
    max-width: 1600px;
    margin: 0 auto;
    padding: var(--space-md) var(--space-xl);
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-xl);
}

.logo-section {
    display: flex;
    align-items: center;
    gap: var(--space-md);
}

.logo-icon {
    width: 48px;
    height: 48px;
    color: var(--accent-primary);
    flex-shrink: 0;
}

.logo-text h1 {
    font-family: var(--font-display);
    font-size: 1.75rem;
    font-weight: 600;
    letter-spacing: 0.02em;
    color: var(--text-primary);
}

.logo-text .subtitle {
    font-size: 0.8rem;
    color: var(--text-muted);
    letter-spacing: 0.1em;
    text-transform: uppercase;
}

.main-nav {
    display: flex;
    gap: var(--space-sm);
}

.nav-btn {
    font-family: var(--font-body);
    font-size: 0.9rem;
    font-weight: 500;
    padding: var(--space-sm) var(--space-md);
    background: transparent;
    border: 1px solid transparent;
    border-radius: 6px;
    color: var(--text-secondary);
    cursor: pointer;
    transition: all var(--transition-fast);
}

.nav-btn:hover {
    color: var(--text-primary);
    background: var(--bg-tertiary);
}

.nav-btn.active {
    color: var(--text-accent);
    background: var(--accent-glow);
    border-color: var(--accent-secondary);
}

/* ============================================
   Main Content Layout
   ============================================ */
.main-content {
    display: flex;
    flex: 1;
    max-width: 1600px;
    margin: 0 auto;
    width: 100%;
}

/* ============================================
   Sidebar - Chapters
   ============================================ */
.chapters-sidebar {
    width: 280px;
    flex-shrink: 0;
    background: var(--bg-secondary);
    border-right: 1px solid var(--border-primary);
    display: flex;
    flex-direction: column;
    height: calc(100vh - 80px);
    position: sticky;
    top: 80px;
}

.sidebar-header {
    padding: var(--space-lg);
    border-bottom: 1px solid var(--border-primary);
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.sidebar-header h2 {
    font-family: var(--font-display);
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--text-primary);
}

.chapter-count {
    font-size: 0.75rem;
    color: var(--text-muted);
    background: var(--bg-tertiary);
    padding: 2px 8px;
    border-radius: 10px;
}

.chapters-list {
    flex: 1;
    overflow-y: auto;
    padding: var(--space-sm);
}

.chapter-item {
    display: flex;
    align-items: center;
    gap: var(--space-md);
    padding: var(--space-md);
    border-radius: 8px;
    cursor: pointer;
    transition: all var(--transition-fast);
    margin-bottom: 2px;
}

.chapter-item:hover {
    background: var(--bg-tertiary);
}

.chapter-item.active {
    background: var(--accent-glow);
    border: 1px solid var(--accent-tertiary);
}

.chapter-icon {
    width: 40px;
    height: 40px;
    background: var(--bg-tertiary);
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.25rem;
    flex-shrink: 0;
}

.chapter-item.active .chapter-icon {
    background: var(--accent-secondary);
}

.chapter-info {
    flex: 1;
    min-width: 0;
}

.chapter-name {
    font-weight: 500;
    font-size: 0.95rem;
    color: var(--text-primary);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.chapter-rubric-count {
    font-size: 0.8rem;
    color: var(--text-muted);
}

/* ============================================
   Content Area
   ============================================ */
.content-area {
    flex: 1;
    padding: var(--space-xl);
    overflow-y: auto;
}

.content-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--space-xl);
    gap: var(--space-lg);
}

.breadcrumb {
    display: flex;
    align-items: center;
    gap: var(--space-sm);
    font-size: 0.9rem;
}

.breadcrumb .crumb {
    color: var(--text-muted);
}

.breadcrumb .crumb.active {
    color: var(--text-accent);
    font-weight: 500;
}

.breadcrumb .separator {
    color: var(--text-muted);
}

.search-box {
    position: relative;
    width: 320px;
}

.search-icon {
    position: absolute;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
    width: 18px;
    height: 18px;
    color: var(--text-muted);
    pointer-events: none;
}

.search-box input {
    width: 100%;
    padding: var(--space-sm) var(--space-md);
    padding-left: 42px;
    font-family: var(--font-body);
    font-size: 0.9rem;
    background: var(--bg-tertiary);
    border: 1px solid var(--border-primary);
    border-radius: 8px;
    color: var(--text-primary);
    outline: none;
    transition: all var(--transition-fast);
}

.search-box input::placeholder {
    color: var(--text-muted);
}

.search-box input:focus {
    border-color: var(--accent-secondary);
    box-shadow: 0 0 0 3px var(--accent-glow);
}

/* ============================================
   Rubrics Container
   ============================================ */
.rubrics-container {
    display: flex;
    flex-direction: column;
    gap: var(--space-sm);
}

/* ============================================
   Rubric Accordion
   ============================================ */
.rubric-accordion {
    background: var(--bg-secondary);
    border: 1px solid var(--border-primary);
    border-radius: 12px;
    overflow: hidden;
    transition: all var(--transition-medium);
}

.rubric-accordion:hover {
    border-color: var(--border-primary);
    box-shadow: var(--shadow-soft);
}

.rubric-accordion.open {
    border-color: var(--accent-tertiary);
}

/* Rubric Header */
.rubric-header {
    display: flex;
    align-items: center;
    padding: var(--space-md) var(--space-lg);
    cursor: pointer;
    gap: var(--space-md);
    transition: background var(--transition-fast);
}

.rubric-header:hover {
    background: var(--bg-tertiary);
}

.rubric-accordion.open .rubric-header {
    background: var(--accent-glow);
    border-bottom: 1px solid var(--border-primary);
}

.expand-icon {
    width: 20px;
    height: 20px;
    color: var(--text-muted);
    transition: transform var(--transition-medium);
    flex-shrink: 0;
}

.rubric-accordion.open .expand-icon {
    transform: rotate(90deg);
    color: var(--text-accent);
}

.rubric-title {
    flex: 1;
    display: flex;
    align-items: baseline;
    gap: var(--space-sm);
    min-width: 0;
}

.rubric-name {
    font-family: var(--font-display);
    font-size: 1.15rem;
    font-weight: 600;
    color: var(--text-primary);
}

.rubric-accordion.open .rubric-name {
    color: var(--text-accent);
}

.remedy-count {
    font-size: 0.85rem;
    color: var(--text-muted);
    background: var(--bg-tertiary);
    padding: 2px 10px;
    border-radius: 12px;
    white-space: nowrap;
}

.rubric-preview {
    font-size: 0.85rem;
    color: var(--text-muted);
    max-width: 300px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

/* Rubric Content */
.rubric-content {
    display: none;
    padding: var(--space-lg);
    background: var(--bg-primary);
    animation: slideDown var(--transition-medium);
}

.rubric-accordion.open .rubric-content {
    display: block;
}

@keyframes slideDown {
    from {
        opacity: 0;
        transform: translateY(-10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* Remedies Grid */
.remedies-section {
    margin-bottom: var(--space-lg);
}

.section-label {
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--text-muted);
    margin-bottom: var(--space-sm);
}

.remedies-list {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-sm);
}

.remedy-tag {
    display: inline-flex;
    align-items: center;
    padding: 4px 12px;
    border-radius: 6px;
    font-size: 0.9rem;
    font-family: var(--font-body);
    cursor: pointer;
    transition: all var(--transition-fast);
    border: 1px solid transparent;
}

.remedy-tag:hover {
    transform: translateY(-1px);
    box-shadow: var(--shadow-soft);
}

/* Gradation Styles */
.remedy-tag.grade-1 {
    background: var(--bg-tertiary);
    color: var(--gradation-1);
    border-color: var(--border-primary);
}

.remedy-tag.grade-1:hover {
    background: var(--bg-elevated);
    border-color: var(--gradation-1);
}

.remedy-tag.grade-2 {
    background: rgba(232, 185, 75, 0.12);
    color: var(--gradation-2);
    border-color: rgba(232, 185, 75, 0.3);
}

.remedy-tag.grade-2:hover {
    background: rgba(232, 185, 75, 0.2);
    border-color: var(--gradation-2);
}

.remedy-tag.grade-3 {
    background: rgba(224, 92, 92, 0.12);
    color: var(--gradation-3);
    border-color: rgba(224, 92, 92, 0.3);
    font-weight: 600;
}

.remedy-tag.grade-3:hover {
    background: rgba(224, 92, 92, 0.2);
    border-color: var(--gradation-3);
}

.grade-indicator {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    margin-right: 6px;
}

.grade-1 .grade-indicator { background: var(--gradation-1); }
.grade-2 .grade-indicator { background: var(--gradation-2); }
.grade-3 .grade-indicator { background: var(--gradation-3); }

/* Meaning Section */
.meaning-section {
    margin-bottom: var(--space-lg);
    padding: var(--space-md);
    background: var(--bg-secondary);
    border-radius: 8px;
    border-left: 3px solid var(--accent-primary);
}

.meaning-section .section-label {
    margin-bottom: var(--space-xs);
}

.meaning-text {
    font-size: 0.95rem;
    color: var(--text-secondary);
    line-height: 1.7;
}

/* Remedy Details Section */
.remedy-details-container {
    margin-bottom: 0;
    min-height: 0;
}

.remedy-details-container:empty {
    display: none;
}

.remedy-details-container:not(:empty) {
    margin-bottom: var(--space-lg);
}

.remedy-details-section {
    margin: 0;
    padding: 0;
    background: var(--bg-secondary);
    border-radius: 8px;
    border-left: 3px solid var(--accent-primary);
    opacity: 0;
    max-height: 0;
    overflow: hidden;
    transition: all var(--transition-medium);
}

.remedy-details-section.active {
    opacity: 1;
    max-height: 2000px;
    padding: var(--space-md);
    margin-bottom: var(--space-md);
}

.remedy-details-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: var(--space-md);
    padding-bottom: var(--space-sm);
    border-bottom: 1px solid var(--border-primary);
}

.remedy-details-title {
    display: flex;
    align-items: center;
    gap: var(--space-sm);
    flex-wrap: wrap;
}

.remedy-name-display {
    font-size: 1rem;
    font-weight: 600;
    color: var(--text-primary);
}

.remedy-abbr-display {
    font-size: 0.85rem;
    color: var(--text-muted);
    font-family: var(--font-mono);
}

.remedy-grade-badge {
    padding: 2px 8px;
    border-radius: 6px;
    font-size: 0.75rem;
    font-weight: 500;
}

.remedy-grade-badge.grade-1 {
    background: rgba(100, 180, 220, 0.15);
    color: var(--gradation-1);
}

.remedy-grade-badge.grade-2 {
    background: rgba(232, 185, 75, 0.15);
    color: var(--gradation-2);
}

.remedy-grade-badge.grade-3 {
    background: rgba(224, 92, 92, 0.15);
    color: var(--gradation-3);
}

.close-remedy-details {
    background: transparent;
    border: none;
    color: var(--text-muted);
    font-size: 1.5rem;
    line-height: 1;
    cursor: pointer;
    padding: 4px 8px;
    border-radius: 4px;
    transition: all var(--transition-fast);
}

.close-remedy-details:hover {
    background: var(--bg-tertiary);
    color: var(--text-primary);
}

.remedy-details-content {
    display: flex;
    flex-direction: column;
    gap: var(--space-md);
}

.remedy-detail-item {
    padding: var(--space-sm);
}

.remedy-detail-label {
    font-size: 0.85rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--text-muted);
    margin-bottom: var(--space-xs);
}

.remedy-detail-text {
    font-size: 0.95rem;
    color: var(--text-secondary);
    line-height: 1.7;
    margin: 0;
}

/* Notes Section */
.notes-section {
    margin-bottom: var(--space-lg);
}

.note-item {
    padding: var(--space-md);
    background: var(--bg-secondary);
    border-radius: 8px;
    margin-bottom: var(--space-sm);
    border: 1px solid var(--border-primary);
}

.note-header {
    display: flex;
    align-items: center;
    gap: var(--space-sm);
    margin-bottom: var(--space-xs);
}

.note-tag {
    font-size: 0.7rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    padding: 2px 8px;
    border-radius: 4px;
}

.note-tag.system {
    background: rgba(124, 152, 133, 0.2);
    color: var(--accent-primary);
}

.note-tag.user {
    background: rgba(100, 150, 220, 0.2);
    color: #6496dc;
}

.note-source {
    font-size: 0.8rem;
    color: var(--text-muted);
    font-style: italic;
}

.note-text {
    font-size: 0.9rem;
    color: var(--text-secondary);
    line-height: 1.6;
}

/* Cross References */
.cross-ref-section {
    margin-bottom: var(--space-lg);
}

.cross-ref-list {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-sm);
}

.cross-ref-link {
    display: inline-flex;
    align-items: center;
    gap: var(--space-xs);
    padding: 6px 12px;
    background: var(--bg-tertiary);
    border: 1px solid var(--border-primary);
    border-radius: 6px;
    font-size: 0.85rem;
    color: var(--text-secondary);
    text-decoration: none;
    cursor: pointer;
    transition: all var(--transition-fast);
}

.cross-ref-link:hover {
    background: var(--bg-elevated);
    color: var(--text-accent);
    border-color: var(--accent-tertiary);
}

.cross-ref-link svg {
    width: 14px;
    height: 14px;
}

/* Add Note Button */
.add-note-section {
    border-top: 1px solid var(--border-primary);
    padding-top: var(--space-md);
}

.add-note-btn {
    display: inline-flex;
    align-items: center;
    gap: var(--space-sm);
    padding: var(--space-sm) var(--space-md);
    background: transparent;
    border: 1px dashed var(--border-primary);
    border-radius: 8px;
    color: var(--text-muted);
    font-family: var(--font-body);
    font-size: 0.9rem;
    cursor: pointer;
    transition: all var(--transition-fast);
}

.add-note-btn:hover {
    border-color: var(--accent-secondary);
    color: var(--text-accent);
    background: var(--accent-glow);
}

.add-note-btn svg {
    width: 16px;
    height: 16px;
}

/* Note Input Area */
.note-input-area {
    display: none;
    margin-top: var(--space-md);
}

.note-input-area.active {
    display: block;
}

.note-textarea {
    width: 100%;
    min-height: 100px;
    padding: var(--space-md);
    font-family: var(--font-body);
    font-size: 0.9rem;
    background: var(--bg-secondary);
    border: 1px solid var(--border-primary);
    border-radius: 8px;
    color: var(--text-primary);
    resize: vertical;
    outline: none;
    transition: border-color var(--transition-fast);
}

.note-textarea:focus {
    border-color: var(--accent-secondary);
}

.note-actions {
    display: flex;
    justify-content: flex-end;
    gap: var(--space-sm);
    margin-top: var(--space-sm);
}

.note-action-btn {
    padding: var(--space-sm) var(--space-md);
    border-radius: 6px;
    font-family: var(--font-body);
    font-size: 0.85rem;
    cursor: pointer;
    transition: all var(--transition-fast);
}

.note-action-btn.cancel {
    background: transparent;
    border: 1px solid var(--border-primary);
    color: var(--text-secondary);
}

.note-action-btn.cancel:hover {
    background: var(--bg-tertiary);
}

.note-action-btn.save {
    background: var(--accent-secondary);
    border: none;
    color: var(--text-primary);
}

.note-action-btn.save:hover {
    background: var(--accent-primary);
}

/* ============================================
   Remedy Detail Panel
   ============================================ */
.remedy-panel {
    position: fixed;
    right: -400px;
    top: 0;
    width: 380px;
    height: 100vh;
    background: var(--bg-secondary);
    border-left: 1px solid var(--border-primary);
    box-shadow: var(--shadow-medium);
    z-index: 200;
    transition: right var(--transition-slow);
    display: flex;
    flex-direction: column;
}

.remedy-panel.open {
    right: 0;
}

.panel-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: var(--space-lg);
    border-bottom: 1px solid var(--border-primary);
    background: var(--bg-tertiary);
}

.panel-header h3 {
    font-family: var(--font-display);
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--text-primary);
}

.close-panel {
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    border: none;
    color: var(--text-muted);
    font-size: 1.5rem;
    cursor: pointer;
    border-radius: 6px;
    transition: all var(--transition-fast);
}

.close-panel:hover {
    background: var(--bg-elevated);
    color: var(--text-primary);
}

.panel-content {
    flex: 1;
    padding: var(--space-lg);
    overflow-y: auto;
}

.remedy-info {
    display: flex;
    flex-direction: column;
    gap: var(--space-md);
}

.info-row {
    display: flex;
    flex-direction: column;
    gap: var(--space-xs);
}

.info-row .label {
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--text-muted);
}

.info-row .value {
    font-size: 1rem;
    color: var(--text-primary);
}

/* Overlay */
.overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
    opacity: 0;
    visibility: hidden;
    transition: all var(--transition-medium);
    z-index: 150;
}

.overlay.active {
    opacity: 1;
    visibility: visible;
}

/* ============================================
   Gradation Legend
   ============================================ */
.gradation-legend {
    display: flex;
    align-items: center;
    gap: var(--space-lg);
    padding: var(--space-sm) var(--space-md);
    background: var(--bg-tertiary);
    border-radius: 8px;
    margin-bottom: var(--space-lg);
}

.legend-title {
    font-size: 0.8rem;
    font-weight: 600;
    color: var(--text-muted);
    text-transform: uppercase;
    letter-spacing: 0.05em;
}

.legend-items {
    display: flex;
    gap: var(--space-md);
}

.legend-item {
    display: flex;
    align-items: center;
    gap: var(--space-xs);
    font-size: 0.85rem;
}

.legend-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
}

.legend-dot.grade-1 { background: var(--gradation-1); }
.legend-dot.grade-2 { background: var(--gradation-2); }
.legend-dot.grade-3 { background: var(--gradation-3); }

.legend-label {
    color: var(--text-secondary);
}

/* ============================================
   Scrollbar Styling
   ============================================ */
::-webkit-scrollbar {
    width: 8px;
    height: 8px;
}

::-webkit-scrollbar-track {
    background: var(--bg-primary);
}

::-webkit-scrollbar-thumb {
    background: var(--border-primary);
    border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
    background: var(--text-muted);
}

/* ============================================
   Responsive Design
   ============================================ */
@media (max-width: 1200px) {
    .chapters-sidebar {
        width: 240px;
    }
    
    .rubric-preview {
        display: none;
    }
}

@media (max-width: 900px) {
    .main-content {
        flex-direction: column;
    }
    
    .chapters-sidebar {
        width: 100%;
        height: auto;
        position: static;
        max-height: 300px;
    }
    
    .content-header {
        flex-direction: column;
        align-items: flex-start;
    }
    
    .search-box {
        width: 100%;
    }
    
    .remedy-panel {
        width: 100%;
        right: -100%;
    }
}

@media (max-width: 600px) {
    .header-content {
        flex-direction: column;
        gap: var(--space-md);
    }
    
    .main-nav {
        width: 100%;
        justify-content: center;
    }
    
    .content-area {
        padding: var(--space-md);
    }
    
    .rubric-header {
        padding: var(--space-md);
    }
    
    .remedies-list {
        gap: var(--space-xs);
    }
    
    .remedy-tag {
        font-size: 0.8rem;
        padding: 3px 8px;
    }
}

/* ============================================
   Compare Mode
   ============================================ */

/* Header actions container */
.header-actions {
    display: flex;
    align-items: center;
    gap: var(--space-md);
}

/* Compare toggle button */
.compare-toggle-btn {
    display: inline-flex;
    align-items: center;
    gap: var(--space-sm);
    padding: var(--space-sm) var(--space-md);
    background: var(--bg-tertiary);
    border: 1px solid var(--border-primary);
    border-radius: 8px;
    color: var(--text-secondary);
    font-family: var(--font-body);
    font-size: 0.9rem;
    cursor: pointer;
    transition: all var(--transition-fast);
    white-space: nowrap;
}

.compare-toggle-btn svg {
    width: 18px;
    height: 18px;
}

.compare-toggle-btn:hover {
    background: var(--bg-elevated);
    color: var(--text-primary);
    border-color: var(--accent-tertiary);
}

.compare-toggle-btn.active {
    background: linear-gradient(135deg, rgba(100, 180, 220, 0.2), rgba(80, 160, 200, 0.15));
    border-color: #4da6cc;
    color: #7dc4e8;
}

/* Compare Mode Bar */
.compare-mode-bar {
    display: none;
    align-items: center;
    justify-content: space-between;
    padding: var(--space-md) var(--space-lg);
    background: linear-gradient(135deg, rgba(100, 180, 220, 0.12), rgba(80, 160, 200, 0.08));
    border: 1px solid rgba(100, 180, 220, 0.3);
    border-radius: 12px;
    margin-bottom: var(--space-lg);
    animation: slideDown var(--transition-medium);
}

.compare-mode-bar.active {
    display: flex;
}

.compare-info {
    display: flex;
    align-items: center;
    gap: var(--space-sm);
    color: #7dc4e8;
    font-weight: 500;
}

.compare-info svg {
    width: 20px;
    height: 20px;
}

.compare-actions {
    display: flex;
    align-items: center;
    gap: var(--space-sm);
}

.compare-action-btn {
    display: inline-flex;
    align-items: center;
    gap: var(--space-xs);
    padding: var(--space-sm) var(--space-md);
    border-radius: 6px;
    font-family: var(--font-body);
    font-size: 0.85rem;
    cursor: pointer;
    transition: all var(--transition-fast);
}

.compare-action-btn svg {
    width: 16px;
    height: 16px;
}

.compare-action-btn.clear {
    background: transparent;
    border: 1px solid var(--border-primary);
    color: var(--text-secondary);
}

.compare-action-btn.clear:hover {
    background: var(--bg-tertiary);
    color: var(--text-primary);
}

.compare-action-btn.view {
    background: linear-gradient(135deg, #4da6cc, #3d8fb3);
    border: none;
    color: white;
    font-weight: 500;
}

.compare-action-btn.view:hover:not(:disabled) {
    background: linear-gradient(135deg, #5db6dc, #4d9fc3);
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(77, 166, 204, 0.3);
}

.compare-action-btn.view:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

.compare-action-btn.exit {
    background: transparent;
    border: 1px solid rgba(224, 92, 92, 0.4);
    color: #e07070;
}

.compare-action-btn.exit:hover {
    background: rgba(224, 92, 92, 0.1);
    border-color: #e05c5c;
}

/* Rubric Selection Checkbox */
.rubric-checkbox {
    display: none;
    align-items: center;
    justify-content: center;
    width: 22px;
    height: 22px;
    border: 2px solid var(--border-primary);
    border-radius: 6px;
    background: var(--bg-tertiary);
    cursor: pointer;
    transition: all var(--transition-fast);
    flex-shrink: 0;
    margin-right: var(--space-sm);
}

.compare-mode .rubric-checkbox {
    display: flex;
}

.rubric-checkbox:hover {
    border-color: #4da6cc;
    background: rgba(100, 180, 220, 0.1);
}

.rubric-checkbox.checked {
    background: linear-gradient(135deg, #4da6cc, #3d8fb3);
    border-color: #4da6cc;
}

.rubric-checkbox.checked::after {
    content: '';
    width: 6px;
    height: 10px;
    border: solid white;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
    margin-bottom: 2px;
}

/* Selected rubric styling */
.rubric-accordion.selected {
    border-color: #4da6cc;
    box-shadow: 0 0 0 1px rgba(100, 180, 220, 0.3), var(--shadow-soft);
}

.rubric-accordion.selected .rubric-header {
    background: rgba(100, 180, 220, 0.08);
}

/* ============================================
   Comparison Panel
   ============================================ */
.comparison-panel {
    position: fixed;
    right: -450px;
    top: 0;
    width: 420px;
    height: 100vh;
    background: var(--bg-secondary);
    border-left: 1px solid var(--border-primary);
    box-shadow: var(--shadow-medium);
    z-index: 200;
    transition: right var(--transition-slow);
    display: flex;
    flex-direction: column;
}

.comparison-panel.open {
    right: 0;
}

.comparison-header {
    background: linear-gradient(135deg, rgba(100, 180, 220, 0.15), rgba(80, 160, 200, 0.1));
    border-bottom: 1px solid rgba(100, 180, 220, 0.2);
}

.comparison-title {
    display: flex;
    align-items: center;
    gap: var(--space-sm);
    color: #7dc4e8;
}

.comparison-title svg {
    width: 24px;
    height: 24px;
}

.comparison-title h3 {
    font-family: var(--font-display);
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--text-primary);
}

.comparison-content {
    flex: 1;
    overflow-y: auto;
}

/* Selected Rubrics Section */
.selected-rubrics-section {
    padding: var(--space-lg);
    border-bottom: 1px solid var(--border-primary);
}

.selected-rubrics-list {
    display: flex;
    flex-direction: column;
    gap: var(--space-sm);
    margin-top: var(--space-sm);
}

.selected-rubric-item {
    display: flex;
    align-items: center;
    gap: var(--space-sm);
    padding: var(--space-sm) var(--space-md);
    background: var(--bg-tertiary);
    border-radius: 8px;
    border-left: 3px solid #4da6cc;
}

.selected-rubric-name {
    flex: 1;
    font-weight: 500;
    color: var(--text-primary);
}

.selected-rubric-count {
    font-size: 0.8rem;
    color: var(--text-muted);
    background: var(--bg-elevated);
    padding: 2px 8px;
    border-radius: 10px;
}

/* Common Remedies Section */
.common-remedies-section {
    padding: var(--space-lg);
}

.common-remedies-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: var(--space-md);
}

.common-count {
    font-size: 0.85rem;
    font-weight: 600;
    color: #7dc4e8;
    background: rgba(100, 180, 220, 0.15);
    padding: 4px 12px;
    border-radius: 12px;
}

.common-remedies-list {
    display: flex;
    flex-direction: column;
    gap: var(--space-sm);
}

/* Common Remedy Card */
.common-remedy-card {
    background: var(--bg-tertiary);
    border: 1px solid var(--border-primary);
    border-radius: 10px;
    padding: var(--space-md);
    transition: all var(--transition-fast);
}

.common-remedy-card:hover {
    border-color: var(--accent-tertiary);
    box-shadow: var(--shadow-soft);
}

.common-remedy-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: var(--space-sm);
}

.common-remedy-name {
    font-weight: 600;
    color: var(--text-primary);
}

.common-remedy-abbr {
    font-size: 0.85rem;
    color: var(--text-muted);
    font-family: monospace;
}

.common-remedy-grades {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-xs);
}

.grade-in-rubric {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    font-size: 0.8rem;
    padding: 3px 8px;
    border-radius: 4px;
    background: var(--bg-elevated);
}

.grade-in-rubric .grade-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
}

.grade-in-rubric .grade-dot.g1 { background: var(--gradation-1); }
.grade-in-rubric .grade-dot.g2 { background: var(--gradation-2); }
.grade-in-rubric .grade-dot.g3 { background: var(--gradation-3); }

.grade-in-rubric .rubric-ref {
    color: var(--text-secondary);
    max-width: 120px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

/* Comparison Empty State */
.comparison-empty {
    display: none;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: var(--space-2xl);
    text-align: center;
    color: var(--text-muted);
}

.comparison-empty.visible {
    display: flex;
}

.comparison-empty svg {
    width: 64px;
    height: 64px;
    margin-bottom: var(--space-md);
    opacity: 0.5;
}

.comparison-empty p {
    font-size: 0.95rem;
    line-height: 1.6;
}

/* Total Grade Score */
.total-grade-score {
    display: flex;
    align-items: center;
    gap: var(--space-xs);
    padding: 4px 10px;
    background: linear-gradient(135deg, rgba(143, 184, 152, 0.2), rgba(124, 152, 133, 0.15));
    border-radius: 6px;
    font-size: 0.85rem;
    font-weight: 600;
    color: var(--text-accent);
}

.total-grade-score::before {
    content: 'Σ';
    font-size: 0.9rem;
}

/* ============================================
   Empty State
   ============================================ */
.empty-state {
    text-align: center;
    padding: var(--space-2xl);
    color: var(--text-muted);
}

.empty-state-icon {
    width: 64px;
    height: 64px;
    margin: 0 auto var(--space-md);
    opacity: 0.5;
}

.empty-state h3 {
    font-family: var(--font-display);
    font-size: 1.25rem;
    color: var(--text-secondary);
    margin-bottom: var(--space-sm);
}

.empty-state p {
    font-size: 0.9rem;
}

/* Book accordion in sidebar */
/* Book Dropdown Selector */
.book-selector-wrapper {
    margin-bottom: var(--space-md);
    padding-bottom: var(--space-md);
    border-bottom: 1px solid var(--border-primary);
}

.book-dropdown {
    width: 100%;
    padding: 10px 12px;
    border-radius: 10px;
    border: 1px solid var(--border-primary);
    background: var(--bg-secondary);
    font-size: 0.95rem;
    font-weight: 600;
    color: var(--text-primary);
    cursor: pointer;
    transition: all var(--transition-fast);
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='none' stroke='%234f46e5' stroke-width='2' d='M2 4l4 4 4-4'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 12px center;
    padding-right: 36px;
}

.book-dropdown:hover {
    border-color: var(--accent-tertiary);
    box-shadow: var(--shadow-soft);
}

.book-dropdown:focus {
    outline: none;
    border-color: var(--accent-tertiary);
    box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
}

.chapters-list-inner {
    display: flex;
    flex-direction: column;
    gap: var(--space-xs);
}

.chapter-icon-small {
    width: 28px;
    height: 28px;
    background: var(--bg-tertiary);
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.9rem;
    flex-shrink: 0;
}

.chapter-item.active .chapter-icon-small {
    background: var(--accent-secondary);
}

/* ============================================
   Compare Mode Responsive
   ============================================ */
@media (max-width: 900px) {
    .comparison-panel {
        width: 100%;
        right: -100%;
    }
    
    .compare-mode-bar {
        flex-direction: column;
        gap: var(--space-md);
        align-items: flex-start;
    }
    
    .compare-actions {
        width: 100%;
        flex-wrap: wrap;
    }
}

@media (max-width: 600px) {
    .header-actions {
        flex-direction: column;
        width: 100%;
    }
    
    .compare-toggle-btn {
        width: 100%;
        justify-content: center;
    }
}

/* ============================================
   Chatbot Shortcut
   ============================================ */
@keyframes chatbot-bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-6px);
  }
}

.chatbot-fab {
  position: fixed;
  right: 24px;
  bottom: 65px;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  border: none;
  background: linear-gradient(135deg, #4f46e5, #7c3aed);
  color: #fff;
  font-size: 24px;
  box-shadow: 0 12px 30px rgba(79, 70, 229, 0.35);
  cursor: pointer;
  z-index: 120;
  display: grid;
  place-items: center;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  animation: chatbot-bounce 2.5s ease-in-out infinite;
}

.chatbot-fab:hover {
  animation: none; /* stops bouncing on hover */
  transform: translateY(-2px);
  box-shadow: 0 16px 36px rgba(79, 70, 229, 0.4);
}

.chatbot-fab-wrapper {
  position: fixed;
  right: 24px;
  bottom: 24px;
  z-index: 120;
}

.chatbot-note {
  position: absolute;
  bottom: 110px;
  right: -24px;
  background: #111827;
  color: #fff;
  padding: 6px 10px;
  font-size: 12px;
  border-radius: 8px;
  white-space: nowrap;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  opacity: 0.95;
}

/* small arrow */
.chatbot-note::after {
  content: "";
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  border-width: 6px;
  border-style: solid;
  border-color: #111827 transparent transparent transparent;
}


@keyframes scroll-bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-4px);
  }
}

.scroll-top-btn {
  position: fixed;
  right: 24px;
  bottom: 8px; /* sits nicely above chatbot button */
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: none;
  background: #111827;
  color: #fff;
  font-size: 18px;
  cursor: pointer;
  display: grid;
  place-items: center;
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.35);
  z-index: 120;
  animation: scroll-bounce 3s ease-in-out infinite;
  transition: transform 0.2s ease, box-shadow 0.2s ease, opacity 0.2s;
}

.scroll-top-btn:hover {
  animation: none;
  transform: translateY(-2px);
  box-shadow: 0 14px 30px rgba(0, 0, 0, 0.45);
}


.kent-chatbot-backdrop {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.35);
    z-index: 130;
}

.kent-chatbot-panel {
    position: fixed;
    right: 24px;
    bottom: 96px;
    width: 380px;
    max-width: calc(100% - 32px);
    background: #fff;
    border-radius: 16px;
    box-shadow: 0 16px 48px rgba(0, 0, 0, 0.16);
    z-index: 140;
    overflow: hidden;
    display: flex;
    flex-direction: column;
}

.kent-chatbot-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 14px 16px;
    background: #f5f4ff;
    color: #2d2a44;
    font-weight: 600;
    letter-spacing: 0.01em;
}

.kent-chatbot-close {
    background: transparent;
    border: none;
    font-size: 20px;
    cursor: pointer;
    color: #5046e5;
    line-height: 1;
}
`

const KentRepertoryPage = () => {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false)
  const KENT_CHAT_QUERY_KEY = "kentChatQuery"

  const handleKentRedirect = (intent?: string | { query?: string; chapterId?: string }) => {
    if (typeof window === "undefined") return

    const payload =
      typeof intent === "string" ? { query: intent } : intent || undefined

    const app = (window as any).kentApp as KentRepertoryApp | undefined
    // If Kent app is already loaded (we're on this page), just apply without closing chatbot
    if (app && typeof app.applyChatQuery === "function") {
      app.applyChatQuery(payload || "")
      return
    }

    // Otherwise we're being called from another page: persist intent and navigate
    if (payload) {
      sessionStorage.setItem(KENT_CHAT_QUERY_KEY, JSON.stringify(payload))
    } else {
      sessionStorage.removeItem(KENT_CHAT_QUERY_KEY)
    }

    window.location.href = "/kent-repertory"
  }

  useEffect(() => {
    if (typeof window === "undefined") return
    const app = new KentRepertoryApp()
      ; (window as any).kentApp = app

    const storedQuery = sessionStorage.getItem(KENT_CHAT_QUERY_KEY)
    if (storedQuery) {
      let parsed: string | { query?: string; chapterId?: string } = storedQuery
      try {
        parsed = JSON.parse(storedQuery)
      } catch {
        parsed = storedQuery
      }
      app.applyChatQuery(parsed)
      sessionStorage.removeItem(KENT_CHAT_QUERY_KEY)
    }
  }, [])

  return (
    <>
      <Head>
        <title>Kent Repertory | Homeosetu</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Source+Sans+3:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </Head>

      <div className="app-container">
        <header className="main-header">
          <div className="header-content">
            <div className="logo-section">
              <div className="logo-icon">
                <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="24" cy="24" r="22" stroke="currentColor" strokeWidth="2" />
                  <path
                    d="M24 8v32M8 24h32"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  <circle cx="24" cy="24" r="8" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </div>
              <div className="logo-text">
                <h1>Kent Repertory</h1>
                <span className="subtitle">Homeopathic Materia Medica</span>
              </div>
            </div>
            <nav className="main-nav">
              <button className="nav-btn active" data-section="repertory">
                Repertory
              </button>
              <button className="nav-btn" data-section="remedies">
                Remedies Index
              </button>
              <button className="nav-btn" data-section="notes">
                My Notes
              </button>
            </nav>
          </div>
        </header>

        <main className="main-content">
          <aside className="chapters-sidebar">
            <div className="sidebar-header">
              <h2>Books & Chapters</h2>
            </div>
            <div className="chapters-list" id="chaptersList" />
          </aside>

          <section className="content-area">
            <div className="content-header">
              <div className="breadcrumb" id="breadcrumb">
                <span className="crumb">Kent Repertory</span>
                <span className="separator">›</span>
                <span className="crumb active">Mind</span>
              </div>
              <div className="header-actions">
                <button className="compare-toggle-btn" id="compareToggle">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M16 3h5v5M8 3H3v5M3 16v5h5M21 16v5h-5M9 12h6M12 9v6" />
                  </svg>
                  <span>Compare Rubrics</span>
                </button>
                <div className="search-box">
                  <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8" />
                    <path d="M21 21l-4.35-4.35" />
                  </svg>
                  <input type="text" id="searchInput" placeholder="Search rubrics..." />
                </div>
              </div>
            </div>

            <div className="compare-mode-bar" id="compareModeBar">
              <div className="compare-info">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span id="selectedCount">0 rubrics selected</span>
              </div>
              <div className="compare-actions">
                <button className="compare-action-btn clear" id="clearSelection">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Clear
                </button>
                <button className="compare-action-btn view" id="viewComparison" disabled>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  View Common Remedies
                </button>
                <button className="compare-action-btn exit" id="exitCompare">
                  Exit Compare
                </button>
              </div>
            </div>

            <div className="rubrics-container" id="rubricsContainer" />
          </section>
        </main>

        <div className="remedy-panel" id="remedyPanel">
          <div className="panel-header">
            <h3 id="remedyName">Remedy Name</h3>
            <button className="close-panel" id="closePanel">
              ×
            </button>
          </div>
          <div className="panel-content">
            <div className="remedy-info">
              <div className="info-row">
                <span className="label">Abbreviation:</span>
                <span className="value" id="remedyAbbr">
                  -
                </span>
              </div>
              <div className="info-row">
                <span className="label">Full Name:</span>
                <span className="value" id="remedyFullName">
                  -
                </span>
              </div>
              <div className="info-row">
                <span className="label">Gradation:</span>
                <span className="value" id="remedyGradation">
                  -
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="comparison-panel" id="comparisonPanel">
          <div className="panel-header comparison-header">
            <div className="comparison-title">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M16 3h5v5M8 3H3v5M3 16v5h5M21 16v5h-5" />
              </svg>
              <h3>Common Remedies</h3>
            </div>
            <button className="close-panel" id="closeComparison">
              ×
            </button>
          </div>
          <div className="panel-content comparison-content">
            <div className="selected-rubrics-section">
              <div className="section-label">Comparing Rubrics</div>
              <div className="selected-rubrics-list" id="selectedRubricsList" />
            </div>

            <div className="common-remedies-section">
              <div className="common-remedies-header">
                <div className="section-label">Common Remedies</div>
                <span className="common-count" id="commonCount">
                  0 found
                </span>
              </div>
              <div className="common-remedies-list" id="commonRemediesList" />
            </div>

            <div className="comparison-empty" id="comparisonEmpty">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p>No common remedies found between the selected rubrics.</p>
            </div>
          </div>
        </div>

        <div className="overlay" id="overlay" />

        <div className="chatbot-fab-wrapper">
          <div className="chatbot-note">Need help?</div>

          <button
            className="chatbot-fab"
            onClick={() => setIsChatbotOpen(true)}
            aria-label="Open chatbot"
          >
            💬
          </button>
        </div>
        <button
  className="scroll-top-btn"
  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
  aria-label="Scroll to top"
>
  ⬆️
</button>


        {isChatbotOpen && (
          <>
            <div
              className="kent-chatbot-backdrop"
              onClick={() => setIsChatbotOpen(false)}
            />
            <div className="kent-chatbot-panel">
              <div className="kent-chatbot-header">
                <span>Ask Homeosetu</span>
                <button
                  className="kent-chatbot-close"
                  onClick={() => setIsChatbotOpen(false)}
                  aria-label="Close chatbot"
                >
                  ×
                </button>
              </div>
              <Chatbot onKentRequested={handleKentRedirect} />
            </div>
          </>
        )}
      </div>

      <style jsx global>{KENT_STYLES}</style>
    </>
  )
}

export default KentRepertoryPage


