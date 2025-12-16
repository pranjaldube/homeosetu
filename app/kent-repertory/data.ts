export type Remedy = {
  abbr: string
  grade: number
}

export type Note = {
  type: "system" | "user"
  source?: string
  text: string
}

export type CrossReference = {
  chapter: string
  rubric: string
}

export type Rubric = {
  id: string
  name: string
  remedies: Remedy[]
  meaning?: string
  notes: Note[]
  crossReferences?: CrossReference[]
}

export type Chapter = {
  id: string
  name: string
  icon: string
  description?: string
  rubrics: Rubric[]
}

export type KentRepertory = {
  bookName: string
  chapters: Chapter[]
}

export const REMEDY_DICTIONARY: Record<string, string> = {
  "acon.": "Aconitum napellus",
  "anac.": "Anacardium orientale",
  "ant-c.": "Antimonium crudum",
  "bell.": "Belladonna",
  "bor.": "Borax veneta",
  "borx.": "Borax veneta",
  "carb-an.": "Carbo animalis",
  "carb-v.": "Carbo vegetabilis",
  "coff.": "Coffea cruda",
  "croc.": "Crocus sativus",
  hura: "Hura brasiliensis",
  "ign.": "Ignatia amara",
  "nat-m.": "Natrum muriaticum",
  "nux-v.": "Nux vomica",
  "ox-ac.": "Oxalicum acidum",
  "par.": "Paris quadrifolia",
  "phos.": "Phosphorus",
  "plat.": "Platinum metallicum",
  "puls.": "Pulsatilla nigricans",
  "seneg.": "Senega",
  "verat.": "Veratrum album",
  "tarent.": "Tarentula hispanica",
  "ars.": "Arsenicum album",
  "bry.": "Bryonia alba",
  "calc.": "Calcarea carbonica",
  "cham.": "Chamomilla",
  "chin.": "China officinalis",
  "con.": "Conium maculatum",
  "graph.": "Graphites",
  "hyos.": "Hyoscyamus niger",
  "kali-c.": "Kali carbonicum",
  "lach.": "Lachesis mutus",
  "lyc.": "Lycopodium clavatum",
  "merc.": "Mercurius solubilis",
  "nit-ac.": "Nitricum acidum",
  "op.": "Opium",
  "petr.": "Petroleum",
  "rhus-t.": "Rhus toxicodendron",
  "sep.": "Sepia succus",
  "sil.": "Silicea terra",
  "stram.": "Stramonium",
  "sulph.": "Sulphur",
  "thuj.": "Thuja occidentalis",
  "zinc.": "Zincum metallicum",
  apis: "Apis mellifica",
  "arg-n.": "Argentum nitricum",
  "aur.": "Aurum metallicum",
  "bar-c.": "Baryta carbonica",
  "caust.": "Causticum",
  "cupr.": "Cuprum metallicum",
  "dig.": "Digitalis purpurea",
  "dulc.": "Dulcamara",
  "ferr.": "Ferrum metallicum",
  "gels.": "Gelsemium sempervirens",
  "hell.": "Helleborus niger",
  "hep.": "Hepar sulphuris calcareum",
  "iod.": "Iodum",
  "ip.": "Ipecacuanha",
  "kali-br.": "Kali bromatum",
  "led.": "Ledum palustre",
  "mag-m.": "Magnesia muriatica",
  "mur-ac.": "Muriaticum acidum",
  "nat-c.": "Natrum carbonicum",
  "nux-m.": "Nux moschata",
  "ph-ac.": "Phosphoricum acidum",
  "plb.": "Plumbum metallicum",
  "psor.": "Psorinum",
  "ran-b.": "Ranunculus bulbosus",
  ruta: "Ruta graveolens",
  "sabad.": "Sabadilla",
  "spig.": "Spigelia anthelmia",
  "spong.": "Spongia tosta",
  "staph.": "Staphysagria",
  "stann.": "Stannum metallicum",
  "valer.": "Valeriana officinalis",
  "verb.": "Verbascum thapsus",
  "viol-t.": "Viola tricolor",
  "ambr.": "Ambra grisea",
  "am-c.": "Ammonium carbonicum",
  "am-m.": "Ammonium muriaticum",
  "arg-met.": "Argentum metallicum",
  "arn.": "Arnica montana",
  "asaf.": "Asafoetida",
  "asar.": "Asarum europaeum",
  "aur-m.": "Aurum muriaticum",
  "camph.": "Camphora",
  "canth.": "Cantharis vesicatoria",
  "caps.": "Capsicum annuum",
  "carb-s.": "Carbo sulphuratum",
  "cic.": "Cicuta virosa",
  cina: "Cina maritima",
  "cocc.": "Cocculus indicus",
  "colch.": "Colchicum autumnale",
  "coloc.": "Colocynthis",
  "cycl.": "Cyclamen europaeum",
  "dros.": "Drosera rotundifolia",
  "euphr.": "Euphrasia officinalis",
  "guai.": "Guaiacum officinale",
  "kali-n.": "Kali nitricum",
  "kreos.": "Kreosotum",
  "laur.": "Laurocerasus",
  "mag-c.": "Magnesia carbonica",
  "mang.": "Manganum aceticum",
  "meny.": "Menyanthes trifoliata",
  "mez.": "Mezereum",
  "mosch.": "Moschus",
  "olnd.": "Oleander",
  "phel.": "Phellandrium aquaticum",
  "plat-m.": "Platinum metallicum",
  "ran-s.": "Ranunculus sceleratus",
  "sars.": "Sarsaparilla officinalis",
  "sec.": "Secale cornutum",
  "sel.": "Selenium metallicum",
  "squil.": "Squilla maritima",
  "stront.": "Strontium carbonicum",
  "sul-ac.": "Sulphuricum acidum",
  "tarax.": "Taraxacum officinale",
  "teucr.": "Teucrium marum verum",
  "viol-o.": "Viola odorata",
  "kali-s.": "Kali sulphuricum",
}

export const KENT_REPERTORY: KentRepertory = {
  bookName: "Kent Repertory",
  chapters: [
    {
      id: "mind",
      name: "Mind",
      icon: "🧠",
      description: "Mental and emotional symptoms",
      rubrics: [
        {
          id: "abrupt",
          name: "Abrupt",
          remedies: [
            { abbr: "nat-m.", grade: 1 },
            { abbr: "tarent.", grade: 2 },
          ],
          meaning:
            "Abrupt behavior refers to sudden, unexpected changes in manner or speech. The patient may suddenly change topics, interrupt conversations, or make unexpected movements.",
          notes: [
            {
              type: "system",
              source: "KR, WhenToUse",
              text: "Consider when the patient shows sudden changes in behavior or communication style without apparent reason.",
            },
          ],
          crossReferences: [
            { chapter: "Mind", rubric: "Impatience" },
            { chapter: "Mind", rubric: "Hurried" },
          ],
        },
        {
          id: "admonition-agg",
          name: "Admonition agg.",
          remedies: [
            { abbr: "bell.", grade: 2 },
            { abbr: "plat.", grade: 2 },
          ],
          meaning:
            "Aggravation from being reprimanded or corrected. The patient becomes worse when given advice, warnings, or criticism.",
          notes: [
            {
              type: "system",
              source: "KR, WhenToUse",
              text: "Use when the patient reacts negatively to any form of correction or advice, becoming more agitated or symptomatic.",
            },
          ],
          crossReferences: [
            { chapter: "Mind", rubric: "Anger from contradiction" },
            { chapter: "Mind", rubric: "Obstinate" },
          ],
        },
        {
          id: "affectionate",
          name: "Affectionate",
          remedies: [
            { abbr: "acon.", grade: 1 },
            { abbr: "anac.", grade: 1 },
            { abbr: "ant-c.", grade: 1 },
            { abbr: "borx.", grade: 1 },
            { abbr: "carb-an.", grade: 1 },
            { abbr: "carb-v.", grade: 1 },
            { abbr: "coff.", grade: 1 },
            { abbr: "croc.", grade: 2 },
            { abbr: "hura", grade: 1 },
            { abbr: "ign.", grade: 2 },
            { abbr: "nat-m.", grade: 2 },
            { abbr: "nux-v.", grade: 1 },
            { abbr: "ox-ac.", grade: 1 },
            { abbr: "par.", grade: 1 },
            { abbr: "phos.", grade: 1 },
            { abbr: "plat.", grade: 1 },
            { abbr: "puls.", grade: 2 },
            { abbr: "seneg.", grade: 1 },
            { abbr: "verat.", grade: 1 },
          ],
          meaning:
            "Affectionate means feeling or liking someone or something and expressing it through emotions or actions. The patient shows warmth, tenderness, and emotional expressiveness toward others.",
          notes: [
            {
              type: "system",
              source: "Oza, Pt-Ver",
              text: "I usually have good feelings for those who express their inner thoughts with me. I will give them a shoulder to cry or express more thoughts.",
            },
            {
              type: "system",
              source: "Oza, Pt-Ver",
              text: "My child will always touch the other child and express his desire to shake hands.",
            },
            {
              type: "system",
              source: "KR, WhenToUse",
              text: "It will be the behaviour of the person in his/her actions to show his desire to reach out to other people to introduce himself or lend a helping hand for any purpose.",
            },
            {
              type: "system",
              source: "KR, WhenToUseMetaphor",
              text: "NONE",
            },
          ],
          crossReferences: [
            { chapter: "Mind", rubric: "Love" },
            { chapter: "Mind", rubric: "Indifference" },
          ],
        },
        {
          id: "anger",
          name: "Anger",
          remedies: [
            { abbr: "acon.", grade: 2 },
            { abbr: "ars.", grade: 3 },
            { abbr: "aur.", grade: 2 },
            { abbr: "bell.", grade: 3 },
            { abbr: "bry.", grade: 2 },
            { abbr: "calc.", grade: 2 },
            { abbr: "cham.", grade: 3 },
            { abbr: "chin.", grade: 2 },
            { abbr: "hyos.", grade: 2 },
            { abbr: "ign.", grade: 2 },
            { abbr: "lyc.", grade: 3 },
            { abbr: "nat-m.", grade: 2 },
            { abbr: "nux-v.", grade: 3 },
            { abbr: "phos.", grade: 2 },
            { abbr: "plat.", grade: 2 },
            { abbr: "puls.", grade: 1 },
            { abbr: "sep.", grade: 2 },
            { abbr: "staph.", grade: 3 },
            { abbr: "stram.", grade: 2 },
            { abbr: "sulph.", grade: 2 },
          ],
          meaning:
            "A strong feeling of displeasure and antagonism. The patient displays irritability, rage, or violent outbursts.",
          notes: [
            {
              type: "system",
              source: "KR, WhenToUse",
              text: "Consider when the patient has difficulty controlling their temper, shows frequent irritability, or has episodes of rage.",
            },
          ],
          crossReferences: [
            { chapter: "Mind", rubric: "Irritability" },
            { chapter: "Mind", rubric: "Rage" },
            { chapter: "Mind", rubric: "Violence" },
          ],
        },
        {
          id: "anxiety",
          name: "Anxiety",
          remedies: [
            { abbr: "acon.", grade: 3 },
            { abbr: "arg-n.", grade: 3 },
            { abbr: "ars.", grade: 3 },
            { abbr: "aur.", grade: 2 },
            { abbr: "calc.", grade: 2 },
            { abbr: "caust.", grade: 2 },
            { abbr: "gels.", grade: 2 },
            { abbr: "ign.", grade: 2 },
            { abbr: "kali-c.", grade: 2 },
            { abbr: "lyc.", grade: 2 },
            { abbr: "nat-m.", grade: 2 },
            { abbr: "nit-ac.", grade: 2 },
            { abbr: "nux-v.", grade: 2 },
            { abbr: "ph-ac.", grade: 2 },
            { abbr: "phos.", grade: 3 },
            { abbr: "puls.", grade: 2 },
            { abbr: "sep.", grade: 2 },
            { abbr: "sil.", grade: 2 },
            { abbr: "sulph.", grade: 2 },
            { abbr: "verat.", grade: 2 },
          ],
          meaning:
            "A feeling of worry, nervousness, or unease about something with an uncertain outcome. May include physical symptoms like palpitations, sweating, and restlessness.",
          notes: [
            {
              type: "system",
              source: "KR, WhenToUse",
              text: "Applicable when the patient reports constant worry, fear of the future, or anticipatory anxiety about events.",
            },
          ],
          crossReferences: [
            { chapter: "Mind", rubric: "Fear" },
            { chapter: "Mind", rubric: "Restlessness" },
            { chapter: "Mind", rubric: "Apprehension" },
          ],
        },
        {
          id: "confusion",
          name: "Confusion of mind",
          remedies: [
            { abbr: "acon.", grade: 1 },
            { abbr: "bell.", grade: 2 },
            { abbr: "bry.", grade: 2 },
            { abbr: "calc.", grade: 2 },
            { abbr: "con.", grade: 2 },
            { abbr: "gels.", grade: 2 },
            { abbr: "hell.", grade: 3 },
            { abbr: "hyos.", grade: 2 },
            { abbr: "lach.", grade: 2 },
            { abbr: "lyc.", grade: 2 },
            { abbr: "merc.", grade: 2 },
            { abbr: "nat-m.", grade: 2 },
            { abbr: "nux-m.", grade: 3 },
            { abbr: "nux-v.", grade: 2 },
            { abbr: "op.", grade: 3 },
            { abbr: "phos.", grade: 2 },
            { abbr: "puls.", grade: 2 },
            { abbr: "rhus-t.", grade: 2 },
            { abbr: "sep.", grade: 2 },
            { abbr: "stram.", grade: 2 },
            { abbr: "sulph.", grade: 2 },
          ],
          meaning:
            "Difficulty in thinking clearly, inability to focus or concentrate. The patient may feel mentally foggy, disoriented, or have trouble forming coherent thoughts.",
          notes: [
            {
              type: "system",
              source: "KR, WhenToUse",
              text: "Consider when the patient complains of mental fog, difficulty concentrating, or feeling that their mind is not working properly.",
            },
          ],
          crossReferences: [
            { chapter: "Mind", rubric: "Dullness" },
            { chapter: "Mind", rubric: "Memory weakness" },
            { chapter: "Mind", rubric: "Concentration difficult" },
          ],
        },
        {
          id: "fear",
          name: "Fear",
          remedies: [
            { abbr: "acon.", grade: 3 },
            { abbr: "arg-n.", grade: 3 },
            { abbr: "ars.", grade: 3 },
            { abbr: "bell.", grade: 2 },
            { abbr: "calc.", grade: 3 },
            { abbr: "gels.", grade: 2 },
            { abbr: "graph.", grade: 2 },
            { abbr: "ign.", grade: 2 },
            { abbr: "kali-c.", grade: 2 },
            { abbr: "lyc.", grade: 3 },
            { abbr: "nat-m.", grade: 2 },
            { abbr: "phos.", grade: 3 },
            { abbr: "plat.", grade: 2 },
            { abbr: "puls.", grade: 2 },
            { abbr: "sep.", grade: 2 },
            { abbr: "sil.", grade: 2 },
            { abbr: "stram.", grade: 3 },
            { abbr: "sulph.", grade: 2 },
          ],
          meaning:
            "An unpleasant emotion caused by the threat of danger, pain, or harm. May manifest as specific phobias or general fearfulness.",
          notes: [
            {
              type: "system",
              source: "KR, WhenToUse",
              text: "Use when the patient expresses significant fears that affect their daily life or cause distress.",
            },
          ],
          crossReferences: [
            { chapter: "Mind", rubric: "Anxiety" },
            { chapter: "Mind", rubric: "Timidity" },
            { chapter: "Mind", rubric: "Cowardice" },
          ],
        },
        {
          id: "grief",
          name: "Grief",
          remedies: [
            { abbr: "acon.", grade: 1 },
            { abbr: "aur.", grade: 3 },
            { abbr: "caust.", grade: 2 },
            { abbr: "ign.", grade: 3 },
            { abbr: "lach.", grade: 2 },
            { abbr: "nat-m.", grade: 3 },
            { abbr: "ph-ac.", grade: 3 },
            { abbr: "puls.", grade: 2 },
            { abbr: "sep.", grade: 2 },
            { abbr: "staph.", grade: 2 },
          ],
          meaning:
            "Deep sorrow, especially caused by loss. The patient may exhibit prolonged mourning, inability to recover from emotional losses, or silent grief.",
          notes: [
            {
              type: "system",
              source: "KR, WhenToUse",
              text: "Indicated when symptoms began after a significant loss or when the patient is unable to process grief normally.",
            },
          ],
          crossReferences: [
            { chapter: "Mind", rubric: "Sadness" },
            { chapter: "Mind", rubric: "Weeping" },
            { chapter: "Mind", rubric: "Ailments from grief" },
          ],
        },
      ],
    },
    {
      id: "vertigo",
      name: "Vertigo",
      icon: "💫",
      description: "Symptoms related to dizziness and balance",
      rubrics: [
        {
          id: "vertigo-general",
          name: "Vertigo in general",
          remedies: [
            { abbr: "acon.", grade: 2 },
            { abbr: "bell.", grade: 2 },
            { abbr: "bry.", grade: 3 },
            { abbr: "calc.", grade: 2 },
            { abbr: "chin.", grade: 2 },
            { abbr: "con.", grade: 3 },
            { abbr: "gels.", grade: 2 },
            { abbr: "nux-v.", grade: 2 },
            { abbr: "phos.", grade: 2 },
            { abbr: "puls.", grade: 2 },
            { abbr: "sil.", grade: 2 },
            { abbr: "sulph.", grade: 2 },
          ],
          meaning:
            "Sensation of spinning or loss of balance. May be accompanied by nausea, unsteadiness, or disorientation.",
          notes: [
            {
              type: "system",
              source: "KR, WhenToUse",
              text: "Consider modalities - when the vertigo occurs, what makes it better or worse.",
            },
          ],
          crossReferences: [
            { chapter: "Head", rubric: "Heaviness" },
            { chapter: "Stomach", rubric: "Nausea" },
          ],
        },
      ],
    },
    {
      id: "head",
      name: "Head",
      icon: "🗣️",
      description: "Symptoms of the head excluding the mind",
      rubrics: [
        {
          id: "headache",
          name: "Pain, headache in general",
          remedies: [
            { abbr: "acon.", grade: 2 },
            { abbr: "bell.", grade: 3 },
            { abbr: "bry.", grade: 3 },
            { abbr: "calc.", grade: 2 },
            { abbr: "chin.", grade: 2 },
            { abbr: "gels.", grade: 3 },
            { abbr: "glon.", grade: 3 },
            { abbr: "ign.", grade: 2 },
            { abbr: "lach.", grade: 2 },
            { abbr: "lyc.", grade: 2 },
            { abbr: "nat-m.", grade: 3 },
            { abbr: "nux-v.", grade: 3 },
            { abbr: "phos.", grade: 2 },
            { abbr: "puls.", grade: 2 },
            { abbr: "sep.", grade: 2 },
            { abbr: "sil.", grade: 3 },
            { abbr: "spig.", grade: 3 },
            { abbr: "sulph.", grade: 2 },
          ],
          meaning:
            "Pain in any part of the head. May vary in character, location, and modalities.",
          notes: [
            {
              type: "system",
              source: "KR, WhenToUse",
              text: "Note the exact location, character of pain (throbbing, pressing, etc.), and what makes it better or worse.",
            },
          ],
          crossReferences: [
            { chapter: "Head", rubric: "Congestion" },
            { chapter: "Eye", rubric: "Pain" },
          ],
        },
      ],
    },
    { id: "eye", name: "Eye", icon: "👁️", description: "Symptoms related to the eyes and vision", rubrics: [] },
    { id: "vision", name: "Vision", icon: "👓", description: "Visual disturbances and symptoms", rubrics: [] },
    { id: "ear", name: "Ear", icon: "👂", description: "Symptoms of the ear", rubrics: [] },
    { id: "hearing", name: "Hearing", icon: "🔊", description: "Hearing-related symptoms", rubrics: [] },
    { id: "nose", name: "Nose", icon: "👃", description: "Symptoms of the nose", rubrics: [] },
    { id: "face", name: "Face", icon: "😶", description: "Symptoms of the face", rubrics: [] },
    { id: "mouth", name: "Mouth", icon: "👄", description: "Symptoms of the mouth", rubrics: [] },
    { id: "teeth", name: "Teeth", icon: "🦷", description: "Dental symptoms", rubrics: [] },
    { id: "throat", name: "Throat", icon: "🔴", description: "Throat symptoms", rubrics: [] },
    { id: "external-throat", name: "External Throat", icon: "🔵", description: "External throat symptoms", rubrics: [] },
    { id: "stomach", name: "Stomach", icon: "🫃", description: "Stomach symptoms", rubrics: [] },
    { id: "abdomen", name: "Abdomen", icon: "🫄", description: "Abdominal symptoms", rubrics: [] },
    { id: "rectum", name: "Rectum", icon: "🔶", description: "Rectal symptoms", rubrics: [] },
    { id: "stool", name: "Stool", icon: "🟤", description: "Stool characteristics", rubrics: [] },
    { id: "bladder", name: "Bladder", icon: "💧", description: "Bladder symptoms", rubrics: [] },
    { id: "kidneys", name: "Kidneys", icon: "🫘", description: "Kidney symptoms", rubrics: [] },
    { id: "prostate", name: "Prostate Gland", icon: "🔘", description: "Prostate symptoms", rubrics: [] },
    { id: "urethra", name: "Urethra", icon: "💦", description: "Urethral symptoms", rubrics: [] },
    { id: "urine", name: "Urine", icon: "🧪", description: "Urine characteristics", rubrics: [] },
    { id: "genitalia-male", name: "Genitalia Male", icon: "♂️", description: "Male genital symptoms", rubrics: [] },
    { id: "genitalia-female", name: "Genitalia Female", icon: "♀️", description: "Female genital symptoms", rubrics: [] },
    { id: "larynx", name: "Larynx & Trachea", icon: "🎤", description: "Larynx and trachea symptoms", rubrics: [] },
    { id: "respiration", name: "Respiration", icon: "🌬️", description: "Breathing symptoms", rubrics: [] },
    { id: "cough", name: "Cough", icon: "🤧", description: "Cough symptoms", rubrics: [] },
    { id: "expectoration", name: "Expectoration", icon: "💨", description: "Expectoration symptoms", rubrics: [] },
    { id: "chest", name: "Chest", icon: "🫁", description: "Chest symptoms", rubrics: [] },
    { id: "back", name: "Back", icon: "🔙", description: "Back symptoms", rubrics: [] },
    { id: "extremities", name: "Extremities", icon: "🦵", description: "Symptoms of limbs", rubrics: [] },
    { id: "sleep", name: "Sleep", icon: "😴", description: "Sleep-related symptoms", rubrics: [] },
    { id: "dreams", name: "Dreams", icon: "💭", description: "Dream patterns", rubrics: [] },
    { id: "chill", name: "Chill", icon: "🥶", description: "Chilliness symptoms", rubrics: [] },
    { id: "fever", name: "Fever", icon: "🤒", description: "Fever symptoms", rubrics: [] },
    { id: "perspiration", name: "Perspiration", icon: "💦", description: "Sweating symptoms", rubrics: [] },
    { id: "skin", name: "Skin", icon: "🖐️", description: "Skin symptoms", rubrics: [] },
    { id: "generalities", name: "Generalities", icon: "⚡", description: "General symptoms affecting the whole person", rubrics: [] },
  ],
}

export function getRemedyFullName(abbr: string): string {
  const cleanAbbr = abbr.toLowerCase().trim()
  return REMEDY_DICTIONARY[cleanAbbr] || abbr
}

export function formatRemedy(remedy: Remedy): string {
  const prefix = remedy.grade > 1 ? remedy.grade : ""
  return `${prefix}${remedy.abbr}`
}


