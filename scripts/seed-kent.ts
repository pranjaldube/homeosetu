import { PrismaClient } from '@prisma/client'
import KENT_REPERTORY from '../app/(home)/software/kent-repertory/KENT_REPERTORY'
import { REMEDY_DICTIONARY } from '../app/(home)/software/kent-repertory/REMEDY_DICTIONARY'

const prisma = new PrismaClient()

// Helper to get remedy details from dictionary
function getRemedyDetails(abbr: string) {
  const cleanAbbr = abbr.toLowerCase().trim()
  const remedies = REMEDY_DICTIONARY[cleanAbbr]
  
  if (!remedies || remedies.length === 0) {
    return {
      fullForm: null,
      description: null
    }
  }

  // Use the first match from the dictionary
  return {
    fullForm: remedies[0].name,
    description: remedies[0].description
  }
}

async function main() {
  console.log('Start seeding Kent Repertory...')

  // 1. Create or Update the Book
  const book = await prisma.book.upsert({
    where: { bookName: KENT_REPERTORY.bookName },
    update: {},
    create: {
      bookName: KENT_REPERTORY.bookName,
    },
  })

  console.log(`Created/Found Book: ${book.bookName} (${book.id})`)

  for (const chapterData of KENT_REPERTORY.chapters) {
    console.log(`Processing Chapter: ${chapterData.name}`)

    // 2. Create or Update Chapter (Content)
    // We assume chapter names are unique within the book for now, or match by name
    // Using findFirst + create/update pattern since name isn't unique in schema but contextually should be for this book
    let chapter = await prisma.content.findFirst({
        where: {
            bookId: book.id,
            name: chapterData.name,
        }
    })

    if (chapter) {
        // Update if needed
        chapter = await prisma.content.update({
            where: { id: chapter.id },
            data: {
                description: chapterData.description,
                icon: chapterData.icon
            }
        })
    } else {
        chapter = await prisma.content.create({
            data: {
                bookId: book.id,
                name: chapterData.name,
                description: chapterData.description,
                icon: chapterData.icon,
            }
        })
    }

    for (const rubricData of chapterData.rubrics) {
        // 3. Create Rubric
        // Upsert by chapterId + name (schema has index @@index([chapterId, name]))
        // Since there is no unique constraint on [chapterId, name] in the schema provided (only indices),
        // we strictly should use findFirst to check existence.
        
        // Note: The schema has `@@index([chapterId, name])` but not `@unique`. 
        // We will try to find existing rubric to avoid duplicates on re-runs.
        let rubric = await prisma.rubric.findFirst({
            where: {
                chapterId: chapter.id,
                name: rubricData.name
            }
        })

        if (!rubric) {
             rubric = await prisma.rubric.create({
                data: {
                    chapterId: chapter.id,
                    name: rubricData.name,
                    meaning: rubricData.meaning,
                }
            })
        } else {
            // Update meaning just in case
            await prisma.rubric.update({
                where: { id: rubric.id },
                data: { meaning: rubricData.meaning }
            })
        }

        // 4. Create Remedies
        for (const remedyData of rubricData.remedies) {
            const dictionaryData = getRemedyDetails(remedyData.abbr)

            await prisma.remedy.create({
                data: {
                    rubricId: rubric.id,
                    abbr: remedyData.abbr,
                    grade: remedyData.grade,
                    fullForm: dictionaryData.fullForm,
                    description: dictionaryData.description,
                }
            })
        }
    }
  }

  console.log('Seeding finished.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
