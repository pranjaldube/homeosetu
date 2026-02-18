import { PrismaClient } from '@prisma/client'
import * as fs from 'fs'
import * as path from 'path'
import { REMEDY_DICTIONARY } from '../app/(home)/software/kent-repertory/REMEDY_DICTIONARY'

const prisma = new PrismaClient()
const chapterName = 'Chest'

// Better CSV Splitter that strips quotes
function splitCsv(str: string): string[] {
    const result: string[] = [];
    let current = '';
    let inQuote = false;
    
    for (let i = 0; i < str.length; i++) {
        const char = str[i];
        if (char === '"') {
             if (inQuote && str[i+1] === '"') {
                 current += '"';
                 i++;
             } else {
                 inQuote = !inQuote;
             }
        } else if (char === ',' && !inQuote) {
            result.push(current);
            current = '';
        } else {
            current += char;
        }
    }
    result.push(current);
    return result;
}


// Helper to get remedy details
function getRemedyDetails(abbr: string) {
    // Remove dot at the end if present for lookup? 
    // The dictionary has keys like "acon." (with dot).
    // The CSV has " acon.," " 2tarent."
    
    // Logic:
    // 1. Extract grade and raw abbr.
    // 2. Clean raw abbr (trim).
    // 3. Lookup.
    
    // The input `abbr` here is just the clean text of the remedy symbol e.g. "acon." or "Apis"
    const cleanAbbr = abbr.toLowerCase().trim();
    
    // Try exact match
    let remedies = REMEDY_DICTIONARY[cleanAbbr];
    
    // If not found, maybe try adding a dot?
    if (!remedies && !cleanAbbr.endsWith('.')) {
         remedies = REMEDY_DICTIONARY[cleanAbbr + '.'];
    }
    
    if (!remedies || remedies.length === 0) {
        return {
            fullForm: null,
            description: null
        }
    }

    return {
        fullForm: remedies[0].name,
        description: remedies[0].description
    }
}


async function main() {
    console.log('Start seeding Kent Repertory from CSV...');
    
    const csvPath = path.join(process.cwd(), 'app/(home)/software/kent-repertory/kent-data.csv');
    
    if (!fs.existsSync(csvPath)) {
        console.error(`File not found: ${csvPath}`);
        return;
    }
    
    const fileContent = fs.readFileSync(csvPath, 'utf-8');
    const lines = fileContent.split(/\r?\n/);
    
    // 1. Create Book
    const book = await prisma.book.upsert({
        where: { bookName: 'Kent Repertory' },
        update: {},
        create: { bookName: 'Kent Repertory' },
    });
    console.log(`Book ID: ${book.id}`);
    
    // 2. Create Chapter "Mind"
    // Using findFirst because [bookId, name] might not be unique in schema constraint, but logically is.
    // Schema has @@index([bookId]).
    let chapter = await prisma.content.findFirst({
        where: {
            bookId: book.id,
            name: chapterName
        }
    });
    
    if (!chapter) {
        chapter = await prisma.content.create({
            data: {
                bookId: book.id,
                name: chapterName,
                description: `${chapterName} Chapter`
            }
        });
    }
    console.log(`Chapter '${chapterName}' ID: ${chapter.id}`);
    
    let rubricCount = 0;
    
    // 3. Process Lines
    // Skip header (Line 1)
    for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;
        
        const cols = splitCsv(line);
        if (cols.length < 3) continue; // Expecting at least Rubric, Remedies, Meaning
        
        // Columns: rubric, remedies, Meaning, ...
        let rawRubric = cols[0].trim();
        const rawRemedies = cols[1].trim();
        const meaning = cols[2].trim();
        
        // Clean Rubric Name
        // Remove trailing colon usually present: "ABANDONED :"
        let rubricName = rawRubric;
        if (rubricName.endsWith(':')) {
            rubricName = rubricName.slice(0, -1).trim();
        }
        if (!rubricName) continue;
        
        // console.log(`Processing Rubric: ${rubricName}`);
        
        // Upsert Rubric
        let rubric 
        // = await prisma.rubric.findFirst({
        //     where: {
        //         chapterId: chapter.id,
        //         name: rubricName
        //     }
        // });
        
        // if (!rubric) {
            rubric = await prisma.rubric.create({
                data: {
                    chapterId: chapter.id,
                    name: rubricName,
                    meaning: meaning || null
                }
            });
        // } else {
             // Update meaning if it exists and differs
        //      if (meaning && rubric.meaning !== meaning) {
        //          await prisma.rubric.update({
        //              where: { id: rubric.id },
        //              data: { meaning: meaning }
        //          });
        //      }
        // }
        
        // Parse Remedies
        if (rawRemedies) {
             const remedyList = rawRemedies.split(',').map(s => s.trim()).filter(s => s.length > 0);
             
             for (const remStr of remedyList) {
                 // Format: "2acon." or "nat-m." or "3Apis"
                 // Regex to split Grade (digit) and Name
                 const match = remStr.match(/^(\d+)?(.+)$/);
                 if (match) {
                     const gradeStr = match[1];
                     const abbrRaw = match[2].trim();
                     
                     const grade = gradeStr ? parseInt(gradeStr) : 1;
                     
                     const details = getRemedyDetails(abbrRaw);
                     
                     // Upsert Remedy?
                     // We probably want to avoid duplicates if running multiple times.
                     // But creating assumes we might not have a unique constraint easily checkable without ID.
                     // Schema: Remedy has @@index([rubricId]). No unique on [rubricId, abbr].
                     // So we should check.
                     
                     let existingRemedy 
                    //  = await prisma.remedy.findFirst({
                    //      where: {
                    //          rubricId: rubric.id,
                    //          abbr: abbrRaw
                    //      }
                    //  });
                     
                    //  if (!existingRemedy) {
                         await prisma.remedy.create({
                             data: {
                                 rubricId: rubric.id,
                                 abbr: abbrRaw,
                                 grade: grade,
                                 fullForm: details.fullForm,
                                 description: details.description
                             }
                         });
                    //  } else {
                    //      // Update grade/details if needed?
                    //      // Let's assume CSV is source of truth
                    //      await prisma.remedy.update({
                    //          where: { id: existingRemedy.id },
                    //          data: {
                    //              grade: grade,
                    //              fullForm: details.fullForm,
                    //              description: details.description
                    //          }
                    //      });
                    //  }
                 }
             }
        }
        
        rubricCount++;
        if (rubricCount % 50 === 0) {
            console.log(`Processed ${rubricCount} rubrics...`);
        }
    }
    
    console.log(`Seeding finished. Processed ${rubricCount} rubrics.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
