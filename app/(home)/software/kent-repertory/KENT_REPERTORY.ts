 type Remedy = {
  abbr: string
  grade: number
  fullForm?: string
  description?: string
}

 type Note = {
  type: string
  source?: string
  text: string
}

 type CrossReference = {
  chapter: string
  rubric: string
}

 type Rubric = {
  id: string
  name: string
  remedies: Remedy[]
  meaning?: string
  notes: Note[]
  crossReferences?: CrossReference[]
}

 type Chapter = {
  id: string
  name: string
  icon: string
  description?: string
  rubrics: Rubric[]
}

 type KentRepertory = {
  bookName: string
  chapters: Chapter[]
}

const Homeosetu_Clinical_Repertory: KentRepertory = {
  bookName: "Homeosetu Clinical Repertory",
  chapters: [
    {
      id: "clinical-allen",
      name: "Clinical (Allen)",
      icon: "",
      rubrics: [
        {
          id: "asthma",
          name: "Asthma",
          remedies: [{ abbr: "hep.", grade: 1 }],
          notes: []
        },
        {
          id: "brights-disease",
          name: "Brights Disease",
          remedies: [{ abbr: "Kali-br.", grade: 1 }],
          notes: []
        },
        {
          id: "conjunctivitis",
          name: "Conjunctivitis",
          remedies: [{ abbr: "Ham.", grade: 1 }],
          notes: []
        },
        {
          id: "cholera",
          name: "Cholera",
          remedies: [{ abbr: "Bism.", grade: 1 }],
          notes: []
        },
        {
          id: "chlorosis",
          name: "Chlorosis",
          remedies: [{ abbr: "ferr.", grade: 1 }],
          notes: []
        },
        {
          id: "croup",
          name: "Croup",
          remedies: [
            { abbr: "acon.", grade: 1 },
            { abbr: "iod.", grade: 1 }
          ],
          notes: []
        },
        {
          id: "croup-membranous",
          name: "Croup, membranous",
          remedies: [{ abbr: "iod.", grade: 1 }],
          notes: []
        },
        {
          id: "epilepsy",
          name: "Epilepsy",
          remedies: [
            { abbr: "bufo.", grade: 1 },
            { abbr: "cimic.", grade: 1 },
            { abbr: "Cupr.", grade: 1 },
            { abbr: "hyos.", grade: 1 }
          ],
          notes: []
        },
        {
          id: "gout",
          name: "Gout",
          remedies: [
            { abbr: "Abrot.", grade: 1 },
            { abbr: "Aesc.", grade: 1 }
          ],
          notes: []
        },
        {
          id: "haemorrhage-conjunctiva",
          name: "Haemorrhage, Conjunctiva",
          remedies: [{ abbr: "arn.", grade: 1 }],
          notes: []
        },
        {
          id: "haemorrhage-retina",
          name: "Haemorrhage, retina",
          remedies: [{ abbr: "arn.", grade: 1 }],
          notes: []
        },
        {
          id: "pertussis",
          name: "Pertussis",
          remedies: [{ abbr: "Euphr.", grade: 1 }],
          notes: []
        },
        {
          id: "pharyngitis",
          name: "Pharyngitis",
          remedies: [{ abbr: "Aesc.", grade: 1 }],
          notes: []
        },
        {
          id: "laryngitis",
          name: "Laryngitis",
          remedies: [{ abbr: "All-c.", grade: 1 }],
          notes: []
        },
        {
          id: "lienteria",
          name: "Lienteria",
          remedies: [{ abbr: "Abrot.", grade: 1 }],
          notes: []
        },
        {
          id: "rheumatism",
          name: "Rheumatism",
          remedies: [{ abbr: "Abrot.", grade: 1 }],
          notes: []
        },
        {
          id: "tonsillitis",
          name: "Tonsillitis",
          remedies: [{ abbr: "Bar-c.", grade: 1 }],
          notes: []
        },
        {
          id: "tuberculosis-chest",
          name: "Tuberculosis, chest",
          remedies: [{ abbr: "dros.", grade: 1 }],
          notes: []
        }
      ]
    },
    {
      id: "clinical-boericke",
      name: "Clinical (Boericke)",
      icon: "",
      rubrics: [
        {
          "id": "rubric_0",
          "name": "Clinical;Boericke;Abdomen;Coldness in (17)",
          "remedies": [
            { "abbr": "aeth.", "grade": 1 },
            { "abbr": "ambr.", "grade": 1 },
            { "abbr": "bar-c.", "grade": 1 },
            { "abbr": "cadm-s.", "grade": 1 },
            { "abbr": "chin.", "grade": 1 },
            { "abbr": "colch.", "grade": 1 },
            { "abbr": "dulc.", "grade": 1 },
            { "abbr": "kali-br.", "grade": 1 },
            { "abbr": "kali-c.", "grade": 1 },
            { "abbr": "kali-s.", "grade": 1 },
            { "abbr": "meny.", "grade": 1 },
            { "abbr": "onos.", "grade": 1 },
            { "abbr": "phos.", "grade": 1 },
            { "abbr": "sil.", "grade": 1 },
            { "abbr": "staph.", "grade": 1 },
            { "abbr": "tab.", "grade": 1 },
            { "abbr": "verat.", "grade": 1 }
          ],
          "notes": []
        },
        {
          "id": "rubric_1",
          "name": "Clinical;Boericke; Abdomen; Coldness in,Boericke (17)",
          "remedies": [
            { "abbr": "aeth", "grade": 1 },
            { "abbr": "ambr", "grade": 1 },
            { "abbr": "bar-c", "grade": 1 },
            { "abbr": "cadm-s", "grade": 1 },
            { "abbr": "chin", "grade": 1 },
            { "abbr": "colch", "grade": 1 },
            { "abbr": "dulc", "grade": 1 },
            { "abbr": "kali-br", "grade": 1 },
            { "abbr": "kali-c", "grade": 1 },
            { "abbr": "kali-s", "grade": 1 },
            { "abbr": "meny", "grade": 1 },
            { "abbr": "onos", "grade": 1 },
            { "abbr": "phos", "grade": 1 },
            { "abbr": "sil", "grade": 1 },
            { "abbr": "staph", "grade": 1 },
            { "abbr": "tab", "grade": 1 },
            { "abbr": "verat", "grade": 1 }
          ],
          "notes": []
        },
        {
          "id": "rubric_2",
          "name": "Clinical;Boericke;Abdomen;Distended (65)",
          "remedies": [
            { "abbr": "abies-c", "grade": 1 },
            { "abbr": "abrot", "grade": 1 },
            { "abbr": "acal", "grade": 1 },
            { "abbr": "act-sp", "grade": 1 },
            { "abbr": "agar", "grade": 1 },
            { "abbr": "alf", "grade": 1 },
            { "abbr": "ambr", "grade": 1 },
            { "abbr": "anthro", "grade": 1 },
            { "abbr": "aran", "grade": 1 },
            { "abbr": "arg-n", "grade": 1 },
            { "abbr": "arn", "grade": 1 },
            { "abbr": "bapt", "grade": 1 },
            { "abbr": "bar-c", "grade": 1 },
            { "abbr": "bell", "grade": 1 },
            { "abbr": "brom", "grade": 1 },
            { "abbr": "caj", "grade": 1 },
            { "abbr": "calc", "grade": 1 },
            { "abbr": "cann-i", "grade": 1 },
            { "abbr": "carb-ac", "grade": 1 },
            { "abbr": "carb-v", "grade": 1 },
            { "abbr": "carbn-s", "grade": 1 },
            { "abbr": "cham", "grade": 1 },
            { "abbr": "chel", "grade": 1 },
            { "abbr": "chin", "grade": 1 },
            { "abbr": "cic", "grade": 1 },
            { "abbr": "coca", "grade": 1 },
            { "abbr": "cocc", "grade": 1 },
            { "abbr": "colch", "grade": 1 },
            { "abbr": "coloc", "grade": 1 },
            { "abbr": "corn", "grade": 1 },
            { "abbr": "crot-h", "grade": 1 },
            { "abbr": "gamb", "grade": 1 },
            { "abbr": "hedeo", "grade": 1 },
            { "abbr": "hep.", "grade": 1 },
            { "abbr": "hyos", "grade": 1 },
            { "abbr": "iodof", "grade": 1 },
            { "abbr": "jal", "grade": 1 },
            { "abbr": "jatr", "grade": 1 },
            { "abbr": "jug-r", "grade": 1 },
            { "abbr": "kali-c", "grade": 1 },
            { "abbr": "kreos", "grade": 1 },
            { "abbr": "lil-t", "grade": 1 },
            { "abbr": "meny", "grade": 1 },
            { "abbr": "merc", "grade": 1 },
            { "abbr": "morph", "grade": 1 },
            { "abbr": "mosch", "grade": 1 },
            { "abbr": "nat-m", "grade": 1 },
            { "abbr": "nat-n", "grade": 1 },
            { "abbr": "nux-m", "grade": 1 },
            { "abbr": "nux-v", "grade": 1 },
            { "abbr": "onis", "grade": 1 },
            { "abbr": "ph-ac", "grade": 1 },
            { "abbr": "podo", "grade": 1 },
            { "abbr": "puls", "grade": 1 },
            { "abbr": "raph", "grade": 1 },
            { "abbr": "rhus-t", "grade": 1 },
            { "abbr": "sabin", "grade": 1 },
            { "abbr": "scut", "grade": 1 },
            { "abbr": "sil", "grade": 1 },
            { "abbr": "slag", "grade": 1 },
            { "abbr": "sumb", "grade": 1 },
            { "abbr": "tab", "grade": 1 },
            { "abbr": "ter", "grade": 1 },
            { "abbr": "thuj", "grade": 1 },
            { "abbr": "zinc", "grade": 1 }
          ],
          "notes": []
        },
        {
          "id": "rubric_3",
          "name": "Clinical;Boericke;Abdomen; Large (3)",
          "remedies": [
            { "abbr": "mez", "grade": 1 },
            { "abbr": "phos", "grade": 1 },
            { "abbr": "urt-u", "grade": 1 }
          ],
          "notes": []
        },
        {
          "id": "rubric_4",
          "name": "Clinical; Boericke; Abdomen; Plethora of (1)",
          "remedies": [
            { "abbr": "sulph", "grade": 1 }
          ],
          "notes": []
        },
        {
          "id": "rubric_5",
          "name": "Clinical; Boericke; Abdomen; Swelling of (33)",
          "remedies": [
            { "abbr": "agn", "grade": 1 },
            { "abbr": "apis", "grade": 1 },
            { "abbr": "ars", "grade": 1 },
            { "abbr": "aur", "grade": 1 },
            { "abbr": "bar-c", "grade": 1 },
            { "abbr": "bar-m", "grade": 1 },
            { "abbr": "bell", "grade": 1 },
            { "abbr": "bry", "grade": 1 },
            { "abbr": "calc", "grade": 3 },
            { "abbr": "carbn-s", "grade": 1 },
            { "abbr": "card-m", "grade": 1 },
            { "abbr": "chin", "grade": 1 },
            { "abbr": "con", "grade": 1 },
            { "abbr": "croc", "grade": 2 },
            { "abbr": "dol", "grade": 1 },
            { "abbr": "dulc", "grade": 1 },
            { "abbr": "gran", "grade": 1 },
            { "abbr": "graph", "grade": 1 },
            { "abbr": "grat", "grade": 1 },
            { "abbr": "hell", "grade": 1 },
            { "abbr": "kali-m", "grade": 2 },
            { "abbr": "kali-p", "grade": 2 },
            { "abbr": "mez", "grade": 1 },
            { "abbr": "pall", "grade": 2 },
            { "abbr": "ptel", "grade": 1 },
            { "abbr": "raph", "grade": 1 },
            { "abbr": "rhus-t", "grade": 1 },
            { "abbr": "sil", "grade": 1 },
            { "abbr": "staph", "grade": 2 },
            { "abbr": "stel", "grade": 1 },
            { "abbr": "stront-c", "grade": 2 },
            { "abbr": "thuj", "grade": 1 },
            { "abbr": "verat", "grade": 2 }
          ],
          "notes": []
        },
        {
          "id": "rubric_6",
          "name": "Clinical; Boericke; Abdomen; Throbbing in (3)",
          "remedies": [
            { "abbr": "aesc", "grade": 1 },
            { "abbr": "bar-m", "grade": 1 },
            { "abbr": "ign", "grade": 1 }
          ],
          "notes": []
        },
        {
          "id": "rubric_7",
          "name": "Clinical; Boericke; Abortion (13)",
          "remedies": [
            { "abbr": "alet", "grade": 1 },
            { "abbr": "caul", "grade": 1 },
            { "abbr": "croc", "grade": 1 },
            { "abbr": "eup-pur", "grade": 1 },
            { "abbr": "ferr", "grade": 1 },
            { "abbr": "op", "grade": 1 },
            { "abbr": "pin-l", "grade": 2 },
            { "abbr": "plb", "grade": 1 },
            { "abbr": "pyrog", "grade": 1 },
            { "abbr": "sabin", "grade": 1 },
            { "abbr": "sec", "grade": 1 },
            { "abbr": "sep", "grade": 1 },
            { "abbr": "tril", "grade": 1 }
          ],
          "notes": []
        },
        {
          "id": "rubric_8",
          "name": "Clinical; Boericke; Abortion; After effects of (1)",
          "remedies": [
            { "abbr": "sabin", "grade": 1 }
          ],
          "notes": []
        },
        {
          "id": "rubric_9",
          "name": "Clinical; Boericke; Abortion; Hemorrhage after (1)",
          "remedies": [
            { "abbr": "croc", "grade": 1 }
          ],
          "notes": []
        },
        {
          "id": "rubric_10",
          "name": "Clinical; Boericke; Abortion; Tendency to (4)",
          "remedies": [
            { "abbr": "alet", "grade": 1 },
            { "abbr": "ferr", "grade": 1 },
            { "abbr": "plb", "grade": 1 },
            { "abbr": "sep", "grade": 1 }
          ],
          "notes": []
        },
        {
          "id": "rubric_11",
          "name": "Clinical; Boericke; Abortion; Threatened (5)",
          "remedies": [
            { "abbr": "croc", "grade": 1 },
            { "abbr": "eup-pur", "grade": 1 },
            { "abbr": "op", "grade": 1 },
            { "abbr": "sec", "grade": 1 },
            { "abbr": "tril", "grade": 1 }
          ],
          "notes": []
        },
        {
          "id": "rubric_12",
          "name": "Clinical; Boericke; Abscess (34)",
          "remedies": [
            { "abbr": "anan", "grade": 1 },
            { "abbr": "anthr", "grade": 1 },
            { "abbr": "antipyrin", "grade": 1 },
            { "abbr": "arn", "grade": 1 },
            { "abbr": "ars-i", "grade": 1 },
            { "abbr": "bold", "grade": 1 },
            { "abbr": "bry", "grade": 1 },
            { "abbr": "calc", "grade": 1 },
            { "abbr": "calc-hp", "grade": 1 },
            { "abbr": "calc-p", "grade": 1 },
            { "abbr": "calc-s", "grade": 1 },
            { "abbr": "carb-ac", "grade": 1 },
            { "abbr": "fl-ac", "grade": 1 },
            { "abbr": "guai", "grade": 1 },
            { "abbr": "gunp", "grade": 1 },
            { "abbr": "hecla", "grade": 1 },
            { "abbr": "hep", "grade": 1 },
            { "abbr": "hippoz", "grade": 1 },
            { "abbr": "lap-a", "grade": 1 },
            { "abbr": "lyc", "grade": 1 },
            { "abbr": "merc", "grade": 1 },
            { "abbr": "methyl", "grade": 1 },
            { "abbr": "oper", "grade": 1 },
            { "abbr": "ph-ac", "grade": 1 },
            { "abbr": "phos", "grade": 1 },
            { "abbr": "phyt", "grade": 1 },
            { "abbr": "pyrog", "grade": 1 },
            { "abbr": "scol", "grade": 1 },
            { "abbr": "sil", "grade": 3 },
            { "abbr": "staphycoc", "grade": 1 },
            { "abbr": "symph", "grade": 1 },
            { "abbr": "syph", "grade": 1 },
            { "abbr": "tarent-c", "grade": 1 },
            { "abbr": "tub", "grade": 1 }
          ],
          "notes": []
        },
        {
          "id": "rubric_13",
          "name": "Clinical; Boericke; Abscess; Succession of (1)",
          "remedies": [
            { "abbr": "syph", "grade": 1 }
          ],
          "notes": []
        },
        {
          "id": "rubric_14",
          "name": "Clinical; Boericke; Acidity (107)",
          "remedies": [
            { "abbr": "acet-ac", "grade": 1 },
            { "abbr": "adren", "grade": 1 },
            { "abbr": "am-p", "grade": 1 },
            { "abbr": "ambr", "grade": 1 },
            { "abbr": "ant-c", "grade": 1 },
            { "abbr": "ant-t", "grade": 1 },
            { "abbr": "apom", "grade": 1 },
            { "abbr": "arg-n", "grade": 1 },
            { "abbr": "ars", "grade": 1 },
            { "abbr": "arund", "grade": 1 },
            { "abbr": "bar-m", "grade": 1 },
            { "abbr": "bell", "grade": 1 },
            { "abbr": "benz-ac", "grade": 1 },
            { "abbr": "bor-ac", "grade": 1 },
            { "abbr": "but-ac", "grade": 1 },
            { "abbr": "calc", "grade": 1 },
            { "abbr": "carb-ac", "grade": 1 },
            { "abbr": "card-m", "grade": 1 },
            { "abbr": "caust", "grade": 1 },
            { "abbr": "cham", "grade": 1 },
            { "abbr": "chin-ar", "grade": 1 },
            { "abbr": "chin-s", "grade": 1 },
            { "abbr": "chr-ac", "grade": 1 },
            { "abbr": "cit-ac", "grade": 1 },
            { "abbr": "coc-c", "grade": 1 },
            { "abbr": "coff", "grade": 1 },
            { "abbr": "coloc", "grade": 1 },
            { "abbr": "con", "grade": 1 },
            { "abbr": "corn-f", "grade": 1 },
            { "abbr": "cuph", "grade": 1 },
            { "abbr": "cupr-ar", "grade": 1 },
            { "abbr": "dros", "grade": 1 },
            { "abbr": "elaps", "grade": 1 },
            { "abbr": "euon-a", "grade": 1 },
            { "abbr": "fab", "grade": 1 },
            { "abbr": "fago", "grade": 1 },
            { "abbr": "ferr-cit", "grade": 1 },
            { "abbr": "ferr-s", "grade": 1 },
            { "abbr": "fili-v", "grade": 1 },
            { "abbr": "fl-ac", "grade": 1 },
            { "abbr": "form-ac", "grade": 3 },
            { "abbr": "franc", "grade": 1 },
            { "abbr": "gall-ac", "grade": 1 },
            { "abbr": "gent-l", "grade": 1 },
            { "abbr": "grat", "grade": 1 },
            { "abbr": "helo", "grade": 1 },
            { "abbr": "hep", "grade": 1 },
            { "abbr": "hip-ac", "grade": 1 },
            { "abbr": "hydr-ac", "grade": 1 },
            { "abbr": "ichth", "grade": 1 },
            { "abbr": "ign", "grade": 1 },
            { "abbr": "joan", "grade": 1 },
            { "abbr": "kali-bi", "grade": 1 },
            { "abbr": "kali-c", "grade": 1 },
            { "abbr": "kali-chl", "grade": 1 },
            { "abbr": "lac-ac", "grade": 1 },
            { "abbr": "lach", "grade": 1 },
            { "abbr": "linu-u", "grade": 1 },
            { "abbr": "lith-be", "grade": 1 },
            { "abbr": "lith-c", "grade": 1 },
            { "abbr": "lob", "grade": 1 },
            { "abbr": "lyc", "grade": 1 },
            { "abbr": "mag-c", "grade": 1 },
            { "abbr": "merc-c", "grade": 1 },
            { "abbr": "mez", "grade": 1 },
            { "abbr": "mur-ac", "grade": 1 },
            { "abbr": "myric", "grade": 1 },
            { "abbr": "nabal", "grade": 1 },
            { "abbr": "nat-n", "grade": 1 },
            { "abbr": "nat-p", "grade": 1 },
            { "abbr": "nat-s", "grade": 1 },
            { "abbr": "nit-ac", "grade": 1 },
            { "abbr": "nit-m-ac", "grade": 1 },
            { "abbr": "oci", "grade": 1 },
            { "abbr": "ox-ac", "grade": 1 },
            { "abbr": "petr", "grade": 1 },
            { "abbr": "ph-ac", "grade": 1 },
            { "abbr": "pic-ac", "grade": 1 },
            { "abbr": "pipe", "grade": 1 },
            { "abbr": "podo", "grade": 1 },
            { "abbr": "pop", "grade": 1 },
            { "abbr": "ptel", "grade": 1 },
            { "abbr": "quas", "grade": 1 },
            { "abbr": "queb", "grade": 1 },
            { "abbr": "rob", "grade": 1 },
            { "abbr": "sabal", "grade": 1 },
            { "abbr": "sac-alb", "grade": 1 },
            { "abbr": "sal-ac", "grade": 1 },
            { "abbr": "sang", "grade": 1 },
            { "abbr": "sant", "grade": 1 },
            { "abbr": "sarcol-ac", "grade": 1 },
            { "abbr": "sec", "grade": 1 },
            { "abbr": "sep", "grade": 1 },
            { "abbr": "spira", "grade": 1 },
            { "abbr": "stront-br", "grade": 1 },
            { "abbr": "sul-ac", "grade": 1 },
            { "abbr": "sulo-ac", "grade": 1 },
            { "abbr": "sulph", "grade": 1 },
            { "abbr": "tann-ac", "grade": 1 },
            { "abbr": "tart-ac", "grade": 1 },
            { "abbr": "thea", "grade": 1 },
            { "abbr": "thlaspi", "grade": 1 },
            { "abbr": "thyr", "grade": 1 },
            { "abbr": "uran-n", "grade": 1 },
            { "abbr": "urotrop", "grade": 1 },
            { "abbr": "urt-u", "grade": 1 },
            { "abbr": "zing", "grade": 1 }
          ],
          "notes": []
        },
        {
          "id": "rubric_15",
          "name": "Clinical; Boericke; Acidity; Infants, in (1)",
          "remedies": [
            { "abbr": "cuph", "grade": 1 }
          ],
          "notes": []
        },
        {
          "id": "rubric_16",
          "name": "Clinical; Boericke; Acne (52)",
          "remedies": [
            { "abbr": "ant-s", "grade": 2 },
            { "abbr": "anthr", "grade": 1 },
            { "abbr": "arn", "grade": 1 },
            { "abbr": "ars", "grade": 1 },
            { "abbr": "ars-br", "grade": 1 },
            { "abbr": "ars-i", "grade": 1 },
            { "abbr": "ars-s-r", "grade": 1 },
            { "abbr": "asim", "grade": 1 },
            { "abbr": "aster", "grade": 1 },
            { "abbr": "bell", "grade": 1 },
            { "abbr": "bell-p", "grade": 1 },
            { "abbr": "berb-a", "grade": 2 },
            { "abbr": "bov", "grade": 1 },
            { "abbr": "brom", "grade": 1 },
            { "abbr": "calc-hp", "grade": 1 },
            { "abbr": "carb-an", "grade": 1 },
            { "abbr": "chrysar", "grade": 1 },
            { "abbr": "crot-h", "grade": 1 },
            { "abbr": "cupr-ar", "grade": 1 },
            { "abbr": "cycl", "grade": 1 },
            { "abbr": "eug", "grade": 2 },
            { "abbr": "glon", "grade": 1 },
            { "abbr": "graph", "grade": 1 },
            { "abbr": "hep", "grade": 1 },
            { "abbr": "hydrc", "grade": 1 },
            { "abbr": "ichth", "grade": 3 },
            { "abbr": "insulin", "grade": 1 },
            { "abbr": "jug-r", "grade": 1 },
            { "abbr": "kali-ar", "grade": 1 },
            { "abbr": "kali-bi", "grade": 1 },
            { "abbr": "kali-br", "grade": 2 },
            { "abbr": "kali-i", "grade": 2 },
            { "abbr": "kali-m", "grade": 1 },
            { "abbr": "lappa", "grade": 1 },
            { "abbr": "led", "grade": 1 },
            { "abbr": "lyc", "grade": 1 },
            { "abbr": "med", "grade": 1 },
            { "abbr": "nux-v", "grade": 1 },
            { "abbr": "ov", "grade": 1 },
            { "abbr": "ph-ac", "grade": 1 },
            { "abbr": "psor", "grade": 1 },
            { "abbr": "puls", "grade": 1 },
            { "abbr": "rad-br", "grade": 1 },
            { "abbr": "sang", "grade": 1 },
            { "abbr": "sel", "grade": 1 },
            { "abbr": "skat", "grade": 1 },
            { "abbr": "staphycoc", "grade": 1 },
            { "abbr": "sul-i", "grade": 2 },
            { "abbr": "sulo-ac", "grade": 1 },
            { "abbr": "ter", "grade": 1 },
            { "abbr": "tub", "grade": 1 },
            { "abbr": "urine", "grade": 1 }
          ],
          "notes": [
            { "type": "Investigation", "text": "Boericke (52)" }
          ]
        },
        {
          "id": "rubric_17",
          "name": "Clinical; Boericke; Acne; Nose, of (2)",
          "remedies": [
            { "abbr": "ars", "grade": 1 },
            { "abbr": "psor", "grade": 1 }
          ],
          "notes": []
        },
        {
          "id": "rubric_18",
          "name": "Clinical; Boericke; Acne; Rosacea (10)",
          "remedies": [
            { "abbr": "bell", "grade": 1 },
            { "abbr": "carb-an", "grade": 1 },
            { "abbr": "chrysar", "grade": 1 },
            { "abbr": "eug", "grade": 1 },
            { "abbr": "ichth", "grade": 3 },
            { "abbr": "kali-i", "grade": 1 },
            { "abbr": "ov", "grade": 1 },
            { "abbr": "psor", "grade": 1 },
            { "abbr": "rad-br", "grade": 1 },
            { "abbr": "sulo-ac", "grade": 1 }
          ],
          "notes": []
        },
        {
          "id": "rubric_22",
          "name": "Clinical; Boericke; Addison's disease (2)",
          "remedies": [
            { "abbr": "adren", "grade": 2 },
            { "abbr": "nat-m", "grade": 1 }
          ],
          "notes": []
        },
        {
          "id": "rubric_23",
          "name": "Clinical; Clarke; Adenitis (1)",
          "remedies": [
            { "abbr": "dulc", "grade": 1 }
          ],
          "notes": []
        },
        {
          "id": "rubric_24",
          "name": "Clinical; Boericke; Adenitis (1)",
          "remedies": [
            { "abbr": "dulc", "grade": 1 }
          ],
          "notes": []
        },
        {
          "id": "rubric_25",
          "name": "Clinical; Clarke; Adenoids (9)",
          "remedies": [
            { "abbr": "agra", "grade": 1 },
            { "abbr": "calc", "grade": 1 },
            { "abbr": "calc-f", "grade": 1 },
            { "abbr": "lob-s", "grade": 1 },
            { "abbr": "psor", "grade": 1 },
            { "abbr": "sanguin-n", "grade": 1 },
            { "abbr": "spig", "grade": 1 },
            { "abbr": "staph", "grade": 1 },
            { "abbr": "sulph", "grade": 1 }
          ],
          "notes": []
        },
        {
          "id": "rubric_26",
          "name": "Clinical; Boericke; Adenoids (7)",
          "remedies": [
            { "abbr": "agra", "grade": 2 },
            { "abbr": "calc-i", "grade": 1 },
            { "abbr": "calc-p", "grade": 1 },
            { "abbr": "iod", "grade": 1 },
            { "abbr": "kali-s", "grade": 1 },
            { "abbr": "mez", "grade": 1 },
            { "abbr": "sulph", "grade": 1 }
          ],
          "notes": []
        },
        {
          "id": "rubric_27",
          "name": "Clinical; Clarke; Adhesions (1)",
          "remedies": [
            { "abbr": "thiosin", "grade": 1 }
          ],
          "notes": []
        },
        {
          "id": "rubric_28",
          "name": "Clinical; Boericke; Adhesions (8)",
          "remedies": [
            { "abbr": "asc-t", "grade": 1 },
            { "abbr": "calc-f", "grade": 2 },
            { "abbr": "iris-t", "grade": 1 },
            { "abbr": "merc-c", "grade": 1 },
            { "abbr": "osm", "grade": 1 },
            { "abbr": "sep", "grade": 1 },
            { "abbr": "stann", "grade": 1 },
            { "abbr": "thiosin", "grade": 3 }
          ],
          "notes": []
        },
        {
          "id": "rubric_29",
          "name": "Clinical; Clarke; Adipsia (1)",
          "remedies": [
            { "abbr": "puls", "grade": 1 }
          ],
          "notes": []
        },
        {
          "id": "rubric_30",
          "name": "Clinical; Boericke; Adipsia (10)",
          "remedies": [
            { "abbr": "aeth", "grade": 1 },
            { "abbr": "ant-t", "grade": 1 },
            { "abbr": "apis", "grade": 1 },
            { "abbr": "gels", "grade": 1 },
            { "abbr": "hell", "grade": 1 },
            { "abbr": "ign", "grade": 1 },
            { "abbr": "meny", "grade": 1 },
            { "abbr": "nux-m", "grade": 1 },
            { "abbr": "puls", "grade": 3 },
            { "abbr": "sars", "grade": 1 }
          ],
          "notes": []
        },
        {
          "id": "rubric_31",
          "name": "Clinical; Boericke; After-pains (16)",
          "remedies": [
            { "abbr": "arn", "grade": 1 },
            { "abbr": "caul", "grade": 1 },
            { "abbr": "cham", "grade": 1 },
            { "abbr": "cimic", "grade": 3 },
            { "abbr": "cupr", "grade": 1 },
            { "abbr": "ferr", "grade": 1 },
            { "abbr": "gels", "grade": 1 },
            { "abbr": "hydr-ac", "grade": 1 },
            { "abbr": "ign", "grade": 1 },
            { "abbr": "kali-c", "grade": 1 },
            { "abbr": "nux-m", "grade": 1 },
            { "abbr": "nux-v", "grade": 1 },
            { "abbr": "podo", "grade": 1 },
            { "abbr": "puls", "grade": 1 },
            { "abbr": "sabin", "grade": 1 },
            { "abbr": "xanth", "grade": 1 }
          ],
          "notes": []
        },
        {
          "id": "rubric_32",
          "name": "Clinical; Boericke; Agalactia (12)",
          "remedies": [
            { "abbr": "agn", "grade": 3 },
            { "abbr": "asaf", "grade": 1 },
            { "abbr": "bry", "grade": 1 },
            { "abbr": "calc", "grade": 1 },
            { "abbr": "caust", "grade": 1 },
            { "abbr": "cycl", "grade": 1 },
            { "abbr": "galeg", "grade": 1 },
            { "abbr": "lac-c", "grade": 1 },
            { "abbr": "lac-d", "grade": 1 },
            { "abbr": "puls", "grade": 1 },
            { "abbr": "ric", "grade": 1 },
            { "abbr": "urt-u", "grade": 1 }
          ],
          "notes": []
        },
        {
          "id": "rubric_33",
          "name": "Clinical; Clarke; Agalactia (1)",
          "remedies": [
            { "abbr": "agn", "grade": 1 }
          ],
          "notes": []
        },
        {
          "id": "rubric_34",
          "name": "Clinical; Boericke; Albuminuria (32)",
          "remedies": [
            { "abbr": "adren", "grade": 1 },
            { "abbr": "apis", "grade": 1 },
            { "abbr": "arg-n", "grade": 1 },
            { "abbr": "ars", "grade": 1 },
            { "abbr": "aur-m-n", "grade": 1 },
            { "abbr": "bell", "grade": 1 },
            { "abbr": "berb", "grade": 1 },
            { "abbr": "calc-ars", "grade": 1 },
            { "abbr": "canth", "grade": 1 },
            { "abbr": "carbn-s", "grade": 1 },
            { "abbr": "conv", "grade": 1 },
            { "abbr": "dig", "grade": 1 },
            { "abbr": "euphorb", "grade": 1 },
            { "abbr": "ferr-m", "grade": 1 },
            { "abbr": "ferr-p", "grade": 1 },
            { "abbr": "fuch", "grade": 1 },
            { "abbr": "glon", "grade": 1 },
            { "abbr": "helon", "grade": 1 },
            { "abbr": "kali-chl", "grade": 1 },
            { "abbr": "kalm", "grade": 1 },
            { "abbr": "merc-c", "grade": 3 },
            { "abbr": "nit-ac", "grade": 1 },
            { "abbr": "oci", "grade": 1 },
            { "abbr": "osmium", "grade": 1 },
            { "abbr": "ph-ac", "grade": 1 },
            { "abbr": "phos", "grade": 1 },
            { "abbr": "phyt", "grade": 1 },
            { "abbr": "plb", "grade": 1 },
            { "abbr": "sabin", "grade": 1 },
            { "abbr": "sec", "grade": 1 },
            { "abbr": "ter", "grade": 1 },
            { "abbr": "uran-n", "grade": 1 }
          ],
          "notes": []
        },
        {
          "id": "rubric_35",
          "name": "Clinical; Boericke; Albuminuria; Acute (9)",
          "remedies": [
            { "abbr": "apis", "grade": 1 },
            { "abbr": "canth", "grade": 1 },
            { "abbr": "conv", "grade": 1 },
            { "abbr": "dig", "grade": 1 },
            { "abbr": "ferr-p", "grade": 1 },
            { "abbr": "glon", "grade": 1 },
            { "abbr": "kali-chl", "grade": 1 },
            { "abbr": "merc-c", "grade": 1 },
            { "abbr": "ter", "grade": 1 }
          ],
          "notes": []
        },
        {
          "id": "rubric_36",
          "name": "Clinical; Boericke; Albuminuria; Chronic (11)",
          "remedies": [
            { "abbr": "ars", "grade": 1 },
            { "abbr": "aur-m-n", "grade": 1 },
            { "abbr": "calc-ars", "grade": 1 },
            { "abbr": "fuch", "grade": 1 },
            { "abbr": "helon", "grade": 1 },
            { "abbr": "kalm", "grade": 1 },
            { "abbr": "nit-ac", "grade": 1 },
            { "abbr": "ph-ac", "grade": 1 },
            { "abbr": "phos", "grade": 1 },
            { "abbr": "plb", "grade": 1 },
            { "abbr": "uran-n", "grade": 1 }
          ],
          "notes": []
        },
        {
          "id": "rubric_37",
          "name": "Clinical; Boericke; Albuminuria; Physiological (1)",
          "remedies": [
            { "abbr": "ferr-p", "grade": 1 }
          ],
          "notes": []
        },
        {
          "id": "rubric_38",
          "name": "Clinical; Clarke; Albuminuria (1)",
          "remedies": [
            { "abbr": "merc-c", "grade": 1 }
          ],
          "notes": []
        },
        {
          "id": "rubric_39",
          "name": "Clinical; Boericke; Alcoholism (33)",
          "remedies": [
            { "abbr": "agar", "grade": 1 },
            { "abbr": "am-m", "grade": 1 },
            { "abbr": "ant-c", "grade": 1 },
            { "abbr": "apom", "grade": 1 },
            { "abbr": "ars", "grade": 1 },
            { "abbr": "asar", "grade": 1 },
            { "abbr": "avena", "grade": 1 },
            { "abbr": "bell", "grade": 1 },
            { "abbr": "caps", "grade": 1 },
            { "abbr": "carb-ac", "grade": 1 },
            { "abbr": "cimic", "grade": 1 },
            { "abbr": "hyos", "grade": 1 },
            { "abbr": "kali-br", "grade": 1 },
            { "abbr": "kali-p", "grade": 1 },
            { "abbr": "lach", "grade": 1 },
            { "abbr": "led", "grade": 1 },
            { "abbr": "lup", "grade": 1 },
            { "abbr": "nux-v", "grade": 1 },
            { "abbr": "op", "grade": 1 },
            { "abbr": "passif", "grade": 1 },
            { "abbr": "querc", "grade": 1 },
            { "abbr": "ran-b", "grade": 1 },
            { "abbr": "stram", "grade": 1 },
            { "abbr": "strych", "grade": 1 },
            { "abbr": "strych-n", "grade": 1 },
            { "abbr": "sul-ac", "grade": 1 },
            { "abbr": "sulph", "grade": 1 },
            { "abbr": "sumb", "grade": 1 },
            { "abbr": "syph", "grade": 1 },
            { "abbr": "tarent", "grade": 1 },
            { "abbr": "zinc", "grade": 1 },
            { "abbr": "zinc-p", "grade": 1 }
          ],
          "notes": []
        },
        {
          "id": "rubric_40",
          "name": "Clinical; Boericke; Alcoholism; Chronic (11)",
          "remedies": [
            { "abbr": "ant-c", "grade": 1 },
            { "abbr": "asar", "grade": 1 },
            { "abbr": "avena", "grade": 1 },
            { "abbr": "caps", "grade": 1 },
            { "abbr": "lach", "grade": 1 },
            { "abbr": "led", "grade": 1 },
            { "abbr": "nux-v", "grade": 1 },
            { "abbr": "querc", "grade": 1 },
            { "abbr": "sul-ac", "grade": 1 },
            { "abbr": "sulph", "grade": 1 },
            { "abbr": "syph", "grade": 1 }
          ],
          "notes": []
        },
        {
          "id": "rubric_41",
          "name": "Clinical; Boericke; Alcoholism; Habits of (1)",
          "remedies": [
            { "abbr": "avena", "grade": 1 }
          ],
          "notes": []
        },
        {
          "id": "rubric_42",
          "name": "Clinical; Boericke; Alcoholism; Hereditary (1)",
          "remedies": [
            { "abbr": "asar", "grade": 1 }
          ],
          "notes": []
        },
        {
          "id": "rubric_43",
          "name": "Clinical; Boericke; Alcoholism; Nervousness of (1)",
          "remedies": [
            { "abbr": "kali-p", "grade": 1 }
          ],
          "notes": []
        },
        {
          "id": "rubric_44",
          "name": "Clinical; Boericke; Alcoholism; Sleeplessness of (3)",
          "remedies": [
            { "abbr": "lup", "grade": 1 },
            { "abbr": "passif", "grade": 1 },
            { "abbr": "sumb", "grade": 1 }
          ],
          "notes": []
        },
        {
          "id": "rubric_45",
          "name": "Clinical; Boericke; Alcoholism; Tremor of (1)",
          "remedies": [
            { "abbr": "ant-t", "grade": 1 }
          ],
          "notes": []
        },
        {
          "id": "rubric_46",
          "name": "Clinical; Boericke; Alopecia (26)",
          "remedies": [
            { "abbr": "alum", "grade": 1 },
            { "abbr": "arn", "grade": 1 },
            { "abbr": "ars", "grade": 1 },
            { "abbr": "calc", "grade": 1 },
            { "abbr": "carb-v", "grade": 1 },
            { "abbr": "fl-ac", "grade": 3 },
            { "abbr": "graph", "grade": 1 },
            { "abbr": "hep", "grade": 1 },
            { "abbr": "ign", "grade": 1 },
            { "abbr": "kali-c", "grade": 1 },
            { "abbr": "lach", "grade": 1 },
            { "abbr": "lyc", "grade": 1 },
            { "abbr": "manc", "grade": 1 },
            { "abbr": "merc", "grade": 1 },
            { "abbr": "nat-m", "grade": 1 },
            { "abbr": "nit-ac", "grade": 1 },
            { "abbr": "ph-ac", "grade": 3 },
            { "abbr": "phos", "grade": 1 },
            { "abbr": "psor", "grade": 1 },
            { "abbr": "sel", "grade": 1 },
            { "abbr": "sep", "grade": 1 },
            { "abbr": "sil", "grade": 1 },
            { "abbr": "sphing", "grade": 1 },
            { "abbr": "sulph", "grade": 1 },
            { "abbr": "thuj", "grade": 1 },
            { "abbr": "vinc-m", "grade": 1 }
          ],
          "notes": []
        },
        {
          "id": "rubric_47",
          "name": "Clinical; Boericke; Alopecia; Areata (1)",
          "remedies": [
            { "abbr": "vinc-m", "grade": 1 }
          ],
          "notes": []
        },
        {
          "id": "rubric_48",
          "name": "Clinical; Boericke; Alopecia; Chronic (1)",
          "remedies": [
            { "abbr": "fl-ac", "grade": 1 }
          ],
          "notes": []
        },
        {
          "id": "rubric_49",
          "name": "Clinical; Boericke; Alopecia; Post-febrile (1)",
          "remedies": [
            { "abbr": "ph-ac", "grade": 1 }
          ],
          "notes": []
        }
      ]
    },
    {
      "id": "clarke-clarke",
      "name": "Clinical (Clarke)",
      "icon": "",
      "description": "Clinical rubrics from Clarke's Dictionary",
      "rubrics": [
        {
          "id": "r-1",
          "name": "Clinical; Abdomen; (0)",
          "remedies": [],
          "notes": []
        },
        {
          "id": "r-2",
          "name": "Clinical;Clarke;Abdomen;Coldness in (2)",
          "remedies": [
            { "abbr": "phel", "grade": 1 },
            { "abbr": "plect", "grade": 1 }
          ],
          "notes": []
        },
        {
          "id": "r-3",
          "name": "Clinical;Clarke; Abdomen; Distended (7)",
          "remedies": [
            { "abbr": "cin.", "grade": 1 },
            { "abbr": "dios.", "grade": 1 },
            { "abbr": "fil.", "grade": 1 },
            { "abbr": "ign.", "grade": 1 },
            { "abbr": "lyc.", "grade": 1 },
            { "abbr": "sil.", "grade": 1 },
            { "abbr": "thuj.", "grade": 1 }
          ],
          "notes": [
            {
              "type": "Homeopathic Pointers",
              "text": "[ClarkP*, Calc.,Bac., -Abdomen, DISTENDED: In fat scrofulous children, Calc. 6, 6h. Intercurrently, Bac 30, once a week.] [ClarkP*, Sil.,Bac., -Abdomen, DISTENDED:In thin, rickety children, Sil. 6, 6h. Intercurrently, Bac. 30, once a week.] [ClarkP*, Cin. -Abdomen, DISTENDED: When due to worms, Cina 3, 6h.] [ClarkP*, Lyc., -Abdomen, DISTENDED: If due to flatulence with or without constipation, Lyc. 6, 6hrly ] [ClarkP*, Dios. -Abdomen, DISTENDED: If from flatulence, with great pain, the bowels being open or loose, Dios. 12, 6h.] [ClarkP*, Ign., Asaf., -Abdomen, DISTENDED:Hysterical distension, (1) Ign. 12, 2h. (2) Asaf. 12, 2h.] [ClarkP*, thuj., -Abdomen, DISTENDED:As if a living animal were there, Thuj. 12, 2h.]"
            }
          ]
        },
        {
          "id": "r-4",
          "name": "Clinical;Clarke; Abdomen; Large (1)",
          "remedies": [{ "abbr": "calc", "grade": 1 }],
          "notes": []
        },
        {
          "id": "r-5",
          "name": "Clinical; Abdomen; Operations on, vomiting after (2)",
          "remedies": [
            { "abbr": "All-c", "grade": 1 },
            { "abbr": "Bism", "grade": 1 }
          ],
          "notes": []
        },
        {
          "id": "r-6",
          "name": "Clinical; Clarke; Abdomen; Plethora of (1)",
          "remedies": [{ "abbr": "aloe", "grade": 1 }],
          "notes": []
        },
        {
          "id": "r-7",
          "name": "Clinical; Clarke; Abdomen; Swelling of (1)",
          "remedies": [{ "abbr": "Paraf", "grade": 1 }],
          "notes": [
            {
              "type": "Homeopathic Pointers",
              "text": "DROPSICAL. See Ascites and Dropsy."
            }
          ]
        },
        {
          "id": "r-8",
          "name": "Clinical; Clarke; Abdomen; Throbbing in (1)",
          "remedies": [{ "abbr": "bruc", "grade": 1 }],
          "notes": []
        },
        {
          "id": "r-9",
          "name": "Clinical; Clarke; Abortion (16)",
          "remedies": [
            { "abbr": "alet", "grade": 1 },
            { "abbr": "asc-c", "grade": 1 },
            { "abbr": "fil", "grade": 1 },
            { "abbr": "goss", "grade": 1 },
            { "abbr": "kou", "grade": 1 },
            { "abbr": "lyc", "grade": 1 },
            { "abbr": "murx", "grade": 1 },
            { "abbr": "nux-m", "grade": 1 },
            { "abbr": "parth", "grade": 1 },
            { "abbr": "pin-l", "grade": 1 },
            { "abbr": "rhus-t", "grade": 1 },
            { "abbr": "rosm", "grade": 1 },
            { "abbr": "rumx", "grade": 1 },
            { "abbr": "sabin", "grade": 1 },
            { "abbr": "tanac", "grade": 1 },
            { "abbr": "thuj", "grade": 1 }
          ],
          "notes": [
            {
              "type": "Homeopathic Pointers",
              "text": "Abortion. See Miscarriage."
            }
          ]
        },
        {
          "id": "r-10",
          "name": "Clinical; Clarke; Abortion; After effects of (1)",
          "remedies": [{ "abbr": "sabin", "grade": 1 }],
          "notes": []
        },
        {
          "id": "r-11",
          "name": "Clinical; Clarke; Abortion; Hemorrhage after (1)",
          "remedies": [{ "abbr": "thlaspi", "grade": 1 }],
          "notes": []
        },
        {
          "id": "r-12",
          "name": "Clinical; Clarke; Abortion; Tendency to (1)",
          "remedies": [{ "abbr": "Cimic", "grade": 1 }],
          "notes": []
        },
        {
          "id": "r-13",
          "name": "Clinical; Clarke; Abortion; Threatened (7)",
          "remedies": [
            { "abbr": "bapt", "grade": 1 },
            { "abbr": "caul", "grade": 1 },
            { "abbr": "croc", "grade": 1 },
            { "abbr": "ham", "grade": 1 },
            { "abbr": "phyt", "grade": 1 },
            { "abbr": "sec", "grade": 1 },
            { "abbr": "vib-p", "grade": 1 }
          ],
          "notes": []
        },
        {
          "id": "r-14",
          "name": "Clinical; Clarke; Abscess (21)",
          "remedies": [
            { "abbr": "anan", "grade": 1 },
            { "abbr": "apis", "grade": 1 },
            { "abbr": "arn", "grade": 1 },
            { "abbr": "ars", "grade": 1 },
            { "abbr": "bell", "grade": 1 },
            { "abbr": "calc-s", "grade": 1 },
            { "abbr": "calen", "grade": 1 },
            { "abbr": "chin", "grade": 1 },
            { "abbr": "elat", "grade": 1 },
            { "abbr": "fl-ac", "grade": 1 },
            { "abbr": "guai", "grade": 1 },
            { "abbr": "hep", "grade": 1 },
            { "abbr": "hippoz", "grade": 1 },
            { "abbr": "matth", "grade": 1 },
            { "abbr": "merc", "grade": 1 },
            { "abbr": "nat-sal", "grade": 1 },
            { "abbr": "pyrog", "grade": 1 },
            { "abbr": "sil", "grade": 1 },
            { "abbr": "symph", "grade": 1 },
            { "abbr": "syph", "grade": 1 },
            { "abbr": "thyr", "grade": 1 }
          ],
          "notes": [
            {
              "type": "Homeopathic Pointers",
              "text": "Abscess or Suppuration THREATENING:Redness, pain and throbbing..."
            }
          ]
        },
        {
          "id": "r-19",
          "name": "Clinical; Clarke; Acidity (12)",
          "remedies": [
            { "abbr": "arg-n", "grade": 1 },
            { "abbr": "calc", "grade": 1 },
            { "abbr": "calc-ar", "grade": 1 },
            { "abbr": "carb-v", "grade": 1 },
            { "abbr": "cham", "grade": 1 },
            { "abbr": "lob-s", "grade": 1 },
            { "abbr": "luna", "grade": 1 },
            { "abbr": "par", "grade": 1 },
            { "abbr": "podo", "grade": 1 },
            { "abbr": "prun-v", "grade": 1 },
            { "abbr": "rob", "grade": 1 },
            { "abbr": "sul-ac", "grade": 1 }
          ],
          "notes": [
            {
              "type": "Homeopathic Pointers",
              "text": "Acidity. Acid Sulph 3, 4hrly.] [ClarkP*,arg-n., - Acidity With gastralgia..."
            }
          ]
        },
        {
          "id": "r-23",
          "name": "Clinical; Clarke; Acne (36)",
          "remedies": [
            { "abbr": "ail", "grade": 1 },
            { "abbr": "ant-s", "grade": 1 },
            { "abbr": "anthr", "grade": 1 },
            { "abbr": "ars-br", "grade": 1 },
            { "abbr": "ars-s-r", "grade": 1 },
            { "abbr": "aster", "grade": 1 },
            { "abbr": "bell", "grade": 1 },
            { "abbr": "bell-p", "grade": 1 },
            { "abbr": "carb-ac", "grade": 1 },
            { "abbr": "carb-v", "grade": 1 },
            { "abbr": "carbn-s", "grade": 1 },
            { "abbr": "chim", "grade": 1 },
            { "abbr": "cop", "grade": 1 },
            { "abbr": "dios", "grade": 1 },
            { "abbr": "graph", "grade": 1 },
            { "abbr": "ign", "grade": 1 },
            { "abbr": "ind", "grade": 1 },
            { "abbr": "jug-c", "grade": 1 },
            { "abbr": "jug-r", "grade": 1 },
            { "abbr": "kali-bi", "grade": 1 },
            { "abbr": "kali-br", "grade": 1 },
            { "abbr": "kali-m", "grade": 1 },
            { "abbr": "kreos", "grade": 1 },
            { "abbr": "lappa", "grade": 1 },
            { "abbr": "maland", "grade": 1 },
            { "abbr": "pic-ac", "grade": 1 },
            { "abbr": "pix", "grade": 1 },
            { "abbr": "psor", "grade": 1 },
            { "abbr": "puls", "grade": 1 },
            { "abbr": "sil", "grade": 1 },
            { "abbr": "sul-i", "grade": 1 },
            { "abbr": "sulph", "grade": 1 },
            { "abbr": "sumb", "grade": 1 },
            { "abbr": "tub", "grade": 1 },
            { "abbr": "urine", "grade": 1 },
            { "abbr": "vinc", "grade": 1 }
          ],
          "notes": [
            {
              "type": "Homeopathic Pointers",
              "text": "Carb-v., bell., puls., - Acne Simple and recent in young persons..."
            }
          ]
        },

        {
          "id": "r-51",
          "name": "Clinical; Clarke; Albuminuria (45)",
          "remedies": [],
          "notes": []
        },
        {
          "id": "r-57",
          "name": "Clinical; Clarke; Alcohol habit (1)",
          "remedies": [],
          "notes": [
            {
              "type": "Homeopathic Pointers",
              "text": "Alcohol Habit: A single dose of Sulph. 30 or 200 every two or three weeks..."
            }
          ]
        },
        {
          "id": "r-60",
          "name": "Clinical; Clarke; Alcoholism; Chronic (1)",
          "remedies": [],
          "notes": [
            {
              "type": "Homeopathic Pointers",
              "text": "Alchoholism CHRONIC : Total abstinence Morning vomiting, tremulousness, Nux. v. 3, 4h."
            }
          ]
        },
        {
          "id": "r-67",
          "name": "Clinical; Clarke; Amaurosis (29)",
          "remedies": [],
          "notes": [
            {
              "type": "Homeopathic Pointers",
              "text": "Amaurosis:Recent; sudden blindness from cold bathing in hot weather, Aco. 3, 2h.] [ClarkP*, Gels., -Amurosis:Sudden blindness, Gels. 3, 2h."
            }
          ]
        },
        {
          "id": "r-74",
          "name": "Clinical; Clarke; Anaemia (44)",
          "remedies": [],
          "notes": [
            {
              "type": "Homeopathic Pointers",
              "text": "Anaemia : From exhausting diseases, discharges, or haemorrhages, China off 3, 4h. Simple iron deficiency anaemias..."
            }
          ]
        },
        {
          "id": "r-84",
          "name": "Clinical; Clarke; Aneurism (17)",
          "remedies": [],
          "notes": [
            {
              "type": "Homeopathic Pointers",
              "text": "Failing specific indications, begin in general with Baryta c 3x, gr. v. 8h. If that fails, Lycopodium 6, 4h"
            }
          ]
        },
        {
          "id": "r-92",
          "name": "Clinical; Clarke; Angina; Pectoris (59)",
          "remedies": [],
          "notes": [
            {
              "type": "Homeopathic Pointers",
              "text": "PAROXYSM.-Palpitation, anxiety, small pulse; associated with epilepsy, hydr-ac. 3x, th.] [ClarkP*, glon., - Angina Pectoris:PAROXYSM Violent beating..."
            }
          ]
        },
        {
          "id": "r-95",
          "name": "Clinical; Clarke; anhidrosis (3)",
          "remedies": [],
          "notes": [
            {
              "type": "Homeopathic Pointers",
              "text": "Dry, white, leathery skin, Aeth c 3, 4h.] [ClarkP*, Nat-c., - Anhidrosis :Skin of whole body becomes dry and cracked, Nat c 6, 4h."
            }
          ]
        },

        {
          "id": "r-101",
          "name": "Clinical; Clarke; Anus; Soreness of (2)",
          "remedies": [],
          "notes": []
        },
        {
          "id": "r-104",
          "name": "Clinical; Clarke; Anxiety (1)",
          "remedies": [],
          "notes": [
            {
              "type": "Homeopathic Pointers",
              "text": "Anxiety, Care, Grief, Worry, EFFECTS OF. (1) Ign. 3, 2h.; (2) Mag-c. 200, 4h.] [ClarkP*,Note.,- Grief. See Anxiety."
            }
          ]
        },
        {
          "id": "r-108",
          "name": "Clinical; Clarke; Aphasia (6)",
          "remedies": [],
          "notes": [
            {
              "type": "Homeopathic Pointers",
              "text": "Aphasia: Chen anth 30, 4h.In paralysis with imbecility..."
            }
          ]
        },
        {
          "id": "r-112",
          "name": "Clinical; Clarke; Aphthae (22)",
          "remedies": [],
          "notes": [
            {
              "type": "Homeopathic Pointers",
              "text": "Borx., -Aphthae or Thrush:Simple, in children or adults, Borax, 3x (gr. ii. or gtt. i.), 2h..."
            }
          ]
        },
        {
          "id": "r-114",
          "name": "Clinical; Clarke; Apoplexy (49)",
          "remedies": [],
          "notes": [
            {
              "type": "Homeopathic Pointers",
              "text": "Giddiness, headache, fullness in the head in plethoric subjects..."
            }
          ]
        },
        {
          "id": "r-116",
          "name": "Clinical; Clarke; Appendicitis (19)",
          "remedies": [],
          "notes": [
            {
              "type": "Homeopathic Pointers",
              "text": "Fearful pain in ileo-caecal region, great tenderness to pressure on one spot; deathly sensation in stomachpit..."
            }
          ]
        },
        {
          "id": "r-120",
          "name": "Clinical; Clarke; Appetite; Depraved (4)",
          "remedies": [],
          "notes": [
            {
              "type": "Homeopathic Pointers",
              "text": "For salt things, Calc carb 6, 6h. [ClarkP*, Sil., - For cold raw food, Sil. 6, 6h."
            }
          ]
        },
        {
          "id": "r-123",
          "name": "Clinical; Clarke; Appetite; Lost (2)",
          "remedies": [],
          "notes": [
            {
              "type": "Homeopathic Pointers",
              "text": "[ClarkP*, Chin., - Appetite LOST : Want of appetite, which returns while eating, Chin. 3, 6h.]"
            }
          ]
        },
        {
          "id": "r-132",
          "name": "Clinical; Clarke; Arteries; Diseases of (2)",
          "remedies": [],
          "notes": [
            {
              "type": "Homeopathic Pointers",
              "text": " Phos., Vanad.,Arteries, DISEASES OF. Suspected atheroma, (1) Phos. 3, 6h. (2) Vanad. 6, 6h."
            }
          ]
        },
        {
          "id": "r-144",
          "name": "Clinical; Clarke; Ascites (13)",
          "remedies": [],
          "notes": [
            {
              "type": "Homeopathic Pointers",
              "text": "Whenever the ascites is the principal trouble, if the symptoms indicate no other remedy, Apocy. Q, gtt. i. 3h."
            }
          ]
        },
        {
          "id": "r-150",
          "name": "Clinical; Clarke; Asthenopia (11)",
          "remedies": [],
          "notes": [
            {
              "type": "Homeopathic Pointers",
              "text": "Asthenopia. See Eyes: SIGHT."
            }
          ]
        }

      ]

    }
  ]
}

export default Homeosetu_Clinical_Repertory