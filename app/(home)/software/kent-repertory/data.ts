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

export const REPERTORY_BOOKS: KentRepertory[] = []

type RemedyInfo = {
  name: string;
  description: string;
};

export const REMEDY_DICTIONARY: Record<string, RemedyInfo[]> = {

  "abies-c.": [{ name: "Abies canadensis", description: "Abies canadensis" }],
  "abies-n.": [{ name: "Abies nigra", description: "Abies nigra" }],
  "abrot.": [{ name: "Abrotanum", description: "Abrotanum" }],
  "absin.": [{ name: "Absinthium", description: "Absinthium" }],
  "acal.": [{ name: "Acalypha indica", description: "Acalypha indica" }],
  "acet-ac.": [{ name: "Acetic acid", description: "Acetic acid" }],
  "acon-c.": [{ name: "Aconitum cammarum", description: "Aconitum cammarum" }],
  "acon.": [{ name: "Aconitum napellus", description: "Aconitum napellus" }],
  "acon-f.": [{ name: "Aconitum ferox", description: "Aconitum ferox" }],
  "acon-l.": [{ name: "Aconitum lycotonum", description: "Aconitum lycotonum" }],
  "act-sp.": [{ name: "Actaea spicata", description: "Actaea spicata" }],
  "adren.": [{ name: "Adrenalin", description: "Adrenalin" }],
  "aesc.": [{ name: "Aesculus hippocastanum", description: "Aesculus hippocastanum" }],
  "aesc-g.": [{ name: "Aesculus glabra", description: "Aesculus glabra" }],
  "aeth.": [{ name: "Aethusa cynapium", description: "Aethusa cynapium" }],
  "agar-em.": [{ name: "Agaricus emeticus", description: "Agaricus emeticus" }],
  "agar.": [{ name: "Agaricus muscarius", description: "Agaricus muscarius" }],
  "agar-ph.": [{ name: "Agaricus phalloides", description: "Agaricus phalloides" }],
  "agn.": [{ name: "Agnus castus", description: "Agnus castus" }],
  "agra-n.": [{ name: "Agraphis nutans", description: "Agraphis nutans" }],
  "ail.": [{ name: "Ailanthus", description: "Ailanthus" }],
  "alco.": [{ name: "Alcohol", description: "Alcohol" }],
  "alet.": [{ name: "Aletris farinosa", description: "Aletris farinosa" }],
  "all-c.": [{ name: "Allium сера", description: "Allium сера" }],
  "all-s.": [{ name: "Allium sativum", description: "Allium sativum" }],
  "aloe.": [{ name: "Aloe socotrina", description: "Aloe socotrina" }],
  "alst.": [{ name: "Alstonia constricta", description: "Alstonia constricta" }],
  "alumn.": [{ name: "Alumen", description: "Alumen" }],
  "alum.": [{ name: "Alumina", description: "Alumina" }],
  "alum-sil.": [{ name: "Alumina silicata", description: "Alumina silicata" }],
  "ambr.": [{ name: "Ambra grisea", description: "Ambra grisea" }],
  "ambro.": [{ name: "Ambrosia artemisiæ folia", description: "Ambrosia artemisiæ folia" }],
  "ammc.": [{ name: "Ammoniacum gummi", description: "Ammoniacum gummi" }],
  "am-be.": [{ name: "Ammonium benzoicum", description: "Ammonium benzoicum" }],
  "am-br.": [{ name: "Ammonium bromatum", description: "Ammonium bromatum" }],
  "am-c.": [{ name: "Ammonium carbonicum", description: "Ammonium carbonicum" }],
  "am-caust.": [{ name: "Ammonium causticum", description: "Ammonium causticum" }],
  "am-m.": [{ name: "Ammonium muriaticum", description: "Ammonium muriaticum" }],
  "amph.": [{ name: "Amphisbæna", description: "Amphisbæna" }],
  "amyg.": [{ name: "Amygdalæ amaræ aqua", description: "Amygdalæ amaræ aqua" }],
  "aml-n.": [{ name: "Amyl nitrite", description: "Amyl nitrite" }],
  "anac.": [{ name: "Anacardium orientale", description: "Anacardium orientale" }],
  "anac-oc.": [{ name: "Anacardium occidentale", description: "Anacardium occidentale" }],
  "anag.": [{ name: "Anagallis arvensis", description: "Anagallis arvensis" }],
  "anan.": [{ name: "Anantherum muricatum", description: "Anantherum muricatum" }],
  "ang.": [{ name: "Angustura vera", description: "Angustura vera" }],
  "anil.": [{ name: "Anilinum", description: "Anilinum" }],
  "anis.": [{ name: "Anisum stellatum", description: "Anisum stellatum" }],
  "anth.": [{ name: "Anthemis nobilis", description: "Anthemis nobilis" }],
  "anthr.": [{ name: "Anthracinum", description: "Anthracinum" }],
  "anthro.": [{ name: "Anthrokokali", description: "Anthrokokali" }],
  "ant-a.": [{ name: "Antimonium arsenicosum", description: "Antimonium arsenicosum" }],
  "ant-c.": [{ name: "Antimonium crudum", description: "Antimonium crudum" }],
  "ant-chl.": [{ name: "Antimonium chloridum", description: "Antimonium chloridum" }],
  "ant-ox.": [{ name: "Antimonium oxydatum", description: "Antimonium oxydatum" }],
  "ant-s.": [{ name: "Antimonium sulph. auratum", description: "Antimonium sulph. auratum" }],
  "ant-t.": [{ name: "Antimonium tartaricum", description: "Antimonium tartaricum" }],
  "aphis.": [{ name: "Aphis chenopodii glauci", description: "Aphis chenopodii glauci" }],
  "apis.": [{ name: "Apis mellifica", description: "Apis mellifica" }],
  "ap-g.": [{ name: "Apium graveolens", description: "Apium graveolens" }],
  "apom.": [{ name: "Apomorphium", description: "Apomorphium" }],
  "aral.": [{ name: "Aralia racemosa", description: "Aralia racemosa" }],
  "aran.": [{ name: "Aranea diadema", description: "Aranea diadema" }],
  "aran-s.": [{ name: "Aranea scinencia", description: "Aranea scinencia" }],
  "arg-c.": [{ name: "Argentum cyanidum", description: "Argentum cyanidum" }],
  "arg.": [{ name: "Argentum metallicum", description: "Argentum metallicum" }],
  "arg-mur.": [{ name: "Argentum muriaticum", description: "Argentum muriaticum" }],
  "arg-n.": [{ name: "Argentum nitricum", description: "Argentum nitricum" }],
  "arn.": [{ name: "Arnica montana", description: "Arnica montana" }],
  "ars.": [{ name: "Arsenicum album", description: "Arsenicum album" }],
  "ars-h.": [{ name: "Arsenicum hydrogenisatum", description: "Arsenicum hydrogenisatum" }],
  "ars-i.": [{ name: "Arsenicum iodatum", description: "Arsenicum iodatum" }],
  "ars-m.": [{ name: "Arsenicum metallicum", description: "Arsenicum metallicum" }],
  "ars-s-f.": [{ name: "Arsenicum sulphuratum flavum", description: "Arsenicum sulphuratum flavum" }],
  "ars-s-r.": [{ name: "Arsenicum sulphuratum rubrum", description: "Arsenicum sulphuratum rubrum" }],
  "art-v.": [{ name: "Artemesia vulgaris", description: "Artemesia vulgaris" }],
  "arum-d.": [{ name: "Arum dracontium", description: "Arum dracontium" }],
  "arum-i.": [{ name: "Arum italicum", description: "Arum italicum" }],
  "arum-m.": [{ name: "Arum maculatum", description: "Arum maculatum" }],
  "arum-t.": [{ name: "Arum triphyllum", description: "Arum triphyllum" }],
  "arund.": [{ name: "Arundo mauritanica", description: "Arundo mauritanica" }],
  "arund-d.": [{ name: "Arundo donax", description: "Arundo donax" }],
  "asaf.": [{ name: "Asafœtida", description: "Asafœtida" }],
  "asar.": [{ name: "Asarum europæum", description: "Asarum europæum" }],
  "asc-c.": [{ name: "Asclepias cornuti", description: "Asclepias cornuti" }],
  "asc-t.": [{ name: "Asclepias tuberosa", description: "Asclepias tuberosa" }],
  "asim.": [{ name: "Asimina triloba", description: "Asimina triloba" }],
  "aspar.": [{ name: "Asparagus officinalis", description: "Asparagus officinalis" }],
  "astac.": [{ name: "Astacus fluviatilis", description: "Astacus fluviatilis" }],
  "aster.": [{ name: "Asterias rubens", description: "Asterias rubens" }],
  "atro.": [{ name: "Atropinum", description: "Atropinum" }],
  "atro-s.": [{ name: "Atropia sulphurica", description: "Atropia sulphurica" }],
  "aur.": [{ name: "Aurum metallicum", description: "Aurum metallicum" }],

  "aur-a.": [{ name: "Aurum arsenicum", description: "Aurum arsenicum" }],
  "aur-i.": [{ name: "Aurum iodatum", description: "Aurum iodatum" }],
  "aur-m.": [{ name: "Aurum muriaticum", description: "Aurum muriaticum" }],
  "aur-m-n.": [{ name: "Aurum muriaticum natronatum", description: "Aurum muriaticum natronatum" }],
  "aur-s.": [{ name: "Aurum sulphuratum", description: "Aurum sulphuratum" }],

  "bac-b.": [{ name: "Bacillinum Burnett", description: "Bacillinum Burnett" }],
  "bac-dys.": [{ name: "Bacillus Dysentrico, Dysentery Bacillus, Shigella Dysentriae", description: "Bacillus Dysentrico, Dysentery Bacillus, Shigella Dysentriae" }],
  "bac-faec.": [{ name: "Bacillus Faecalis", description: "Bacillus Faecalis" }],
  "bac-morg.": [{ name: "Morgan Pure, Morgan bacillus, Morgan pure, Proteus morgani", description: "Morgan Pure, Morgan bacillus, Morgan pure, Proteus morgani" }],
  "bac-morg-b.": [{ name: "Morgan Bach", description: "Morgan Bach" }],
  "bac-morg-g.": [{ name: "Morgan Gaertner", description: "Morgan Gaertner" }],
  "bac-mut.": [{ name: "Bacillus Mutabile. Mutabile Bach", description: "Bacillus Mutabile. Mutabile Bach" }],
  "bac-prot.": [{ name: "Bacillus Proteus", description: "Bacillus Proteus" }],
  "bac-sev.": [{ name: "Bacillus Seven", description: "Bacillus Seven" }],
  "bac-syco.": [{ name: "Sycotic co. bacillus. Sycotic bacillus. Bowel nosode", description: "Sycotic co. bacillus. Sycotic bacillus. Bowel nosode" }],
  "bac-ten.": [{ name: "Bacillus ten", description: "Bacillus ten" }],

  "bad.": [{ name: "Badiaga", description: "Badiaga" }],
  "bals.": [{ name: "Balsamum peruvianum", description: "Balsamum peruvianum" }],
  "bapt.": [{ name: "Baptisia tinctoria", description: "Baptisia tinctoria" }],
  "bart.": [{ name: "Bartfelder (acid spring)", description: "Bartfelder (acid spring)" }],

  "bar-ac.": [{ name: "Baryta acetica", description: "Baryta acetica" }],
  "bar-c.": [{ name: "Baryta carbonica", description: "Baryta carbonica" }],
  "bar-i.": [{ name: "Baryta iodata", description: "Baryta iodata" }],
  "bar-m.": [{ name: "Baryta muriatica", description: "Baryta muriatica" }],

  "bell.": [{ name: "Belladonna", description: "Belladonna" }],
  "bell-p.": [{ name: "Bellis perennis", description: "Bellis perennis" }],

  "benz.": [{ name: "Benzinum", description: "Benzinum" }],
  "benz-ac.": [{ name: "Benzoic acid", description: "Benzoic acid" }],
  "benz-n.": [{ name: "Benzinum nitricum", description: "Benzinum nitricum" }],

  "berb.": [{ name: "Berberis vulgaris", description: "Berberis vulgaris" }],
  "berb-aq.": [{ name: "Berberis Aquifolium", description: "Berberis Aquifolium" }],
  "bism.": [{ name: "Bismuthum oxidum", description: "Bismuthum oxidum" }],

  "blatta-a.": [{ name: "Blatta americana", description: "Blatta americana" }],
  "blatta.": [{ name: "Blatta orientalis", description: "Blatta orientalis" }],

  "bol.": [{ name: "Boletus laricis", description: "Boletus laricis" }],
  "bor-ac.": [{ name: "Boracicum acidum", description: "Boracicum acidum" }],
  "borx.": [{ name: "Borax", description: "Borax" }],
  "both.": [{ name: "Bothrops lanceolatus", description: "Bothrops lanceolatus" }],
  "bov.": [{ name: "Bovista", description: "Bovista" }],
  "brach.": [{ name: "Brachyglottis repens", description: "Brachyglottis repens" }],
  "brom.": [{ name: "Bromium", description: "Bromium" }],
  "bruc.": [{ name: "Brucea antidysenterica", description: "Brucea antidysenterica" }],
  "bry.": [{ name: "Bryonia alba", description: "Bryonia alba" }],
  "bufo.": [{ name: "Bufo rana", description: "Bufo rana" }],
  "buf-s.": [{ name: "Bufo sahytiensis", description: "Bufo sahytiensis" }],

  "cact.": [{ name: "Cactus grandiflorus", description: "Cactus grandiflorus" }],
  "cadm.": [{ name: "Cadmium sulphuratum", description: "Cadmium sulphuratum" }],
  "cahin.": [{ name: "Cahinca", description: "Cahinca" }],
  "cain.": [{ name: "Cainca", description: "Cainca" }],
  "caj.": [{ name: "Cajuputum", description: "Cajuputum" }],
  "calad.": [{ name: "Caladium seguinum", description: "Caladium seguinum" }],

  "calc-ac.": [{ name: "Calcarea acetica", description: "Calcarea acetica" }],
  "calc-ar.": [{ name: "Calcarea arsenica", description: "Calcarea arsenica" }],
  "calc.": [{ name: "Calc.,Bac., -Abdomen, DISTENDED: In fat scrofulous children, Calc. 6, 6h. Intercurrently, Bac 30, once a week.", description: "Calc.,Bac., -Abdomen, DISTENDED: In fat scrofulous children, Calc. 6, 6h. Intercurrently, Bac 30, once a week." }],
  "calc-caust.": [{ name: "Calcarea caustica", description: "Calcarea caustica" }],
  "calc-chlor.": [{ name: "Calcarea Chlorinata", description: "Calcarea Chlorinata" }],
  "calc-f.": [{ name: "Calcarea fluorata", description: "Calcarea fluorata" }],
  "calc-i.": [{ name: "Calcarea iodata", description: "Calcarea iodata" }],
  "calc-m.": [{ name: "Calcarea Muriaticum", description: "Calcarea Muriaticum" }],
  "calc-p.": [{ name: "Calcarea phosphorica", description: "Calcarea phosphorica" }],
  "calc-sil.": [{ name: "Calcarea silicata", description: "Calcarea silicata" }],
  "calc-s.": [{ name: "Calcarea sulphurica", description: "Calcarea sulphurica" }],

  "calen.": [{ name: "Calendula officinalis", description: "Calendula officinalis" }],
  "calli.": [{ name: "Calliandra houstoni", description: "Calliandra houstoni" }],
  "calo.": [{ name: "Calotropis gigantea", description: "Calotropis gigantea" }],
  "calt.": [{ name: "Caltha palustris", description: "Caltha palustris" }],
  "camph.": [{ name: "Camphora officinarum", description: "Camphora officinarum" }],
  "canch.": [{ name: "Canchalagua", description: "Canchalagua" }],
  "cann-i.": [{ name: "Cannabis indica", description: "Cannabis indica" }],
  "cann-s.": [{ name: "Cannabis sativa", description: "Cannabis sativa" }],
  "canth.": [{ name: "Cantharis", description: "Cantharis" }],
  "caps.": [{ name: "Capsicum", description: "Capsicum" }],

  "carb-ac.": [{ name: "Carbolic acid", description: "Carbolic acid" }],
  "carb-an.": [{ name: "Carbo animalis", description: "Carbo animalis" }],
  "carb-h.": [{ name: "Carboneum hydrogenisatun", description: "Carboneum hydrogenisatun" }],
  "carbo-o.": [{ name: "Carboneum oxygenisatum", description: "Carboneum oxygenisatum" }],
  "carb-s.": [{ name: "Carboneum sulphuratum", description: "Carboneum sulphuratum" }],
  "carb-v.": [{ name: "Carbo vegetabilis", description: "Carbo vegetabilis" }],

  "card-b.": [{ name: "Carduus benedictus", description: "Carduus benedictus" }],
  "card-m.": [{ name: "Carduus marianus", description: "Carduus marianus" }],
  "carl.": [{ name: "Carlsbad", description: "Carlsbad" }],
  "casc.": [{ name: "Cascarilla", description: "Cascarilla" }],

  "cast-v.": [{ name: "Castanea vesca", description: "Castanea vesca" }],
  "cast-eq.": [{ name: "Castor equi", description: "Castor equi" }],
  "cast.": [{ name: "Castoreum", description: "Castoreum" }],

  "caul.": [{ name: "Caulophyllum thalictroides", description: "Caulophyllum thalictroides" }],
  "caust.": [{ name: "Causticum", description: "Causticum" }],
  "cean.": [{ name: "Ceanothus americanus", description: "Ceanothus americanus" }],
  "cedr.": [{ name: "Cedron", description: "Cedron" }],
  "cench.": [{ name: "Cenchris contortrix", description: "Cenchris contortrix" }],
  "cent.": [{ name: "Centaurea tagana", description: "Centaurea tagana" }],
  "cere-b.": [{ name: "Cereus bonplandii", description: "Cereus bonplandii" }],
  "cer-s.": [{ name: "Cereus serpentaria", description: "Cereus serpentaria" }],
  "cet.": [{ name: "Cetrararia islandica", description: "Cetrararia islandica" }],

  "cham.": [{ name: "Chamomilla", description: "Chamomilla" }],
  "chel.": [{ name: "Chelidonium majus", description: "Chelidonium majus" }],
  "chen.": [{ name: "Chenopodium glauci aphis", description: "Chenopodium glauci aphis" }],
  "chen-a.": [{ name: "Chenopodium anthelminticum", description: "Chenopodium anthelminticum" }],
  "chen-v.": [{ name: "Chenopodium vulvaria", description: "Chenopodium vulvaria" }],

  "chim.": [{ name: "Chimaphila umbellata", description: "Chimaphila umbellata" }],
  "chim-m.": [{ name: "Chimaphila maculata", description: "Chimaphila maculata" }],
  "chin.": [{ name: "China officinalis", description: "China officinalis" }],
  "chin-a.": [{ name: "Chininum arsenicosum", description: "Chininum arsenicosum" }],
  "chin-b.": [{ name: "Chininum brom", description: "Chininum brom" }],
  "chin-s.": [{ name: "Chininum sulphuricum", description: "Chininum sulphuricum" }],
  "chion.": [{ name: "Chionanthus virginica", description: "Chionanthus virginica" }],
  "chlol.": [{ name: "Chloralum", description: "Chloralum" }],
  "chlf.": [{ name: "Chloroform", description: "Chloroform" }],
  "chlor.": [{ name: "Chlorum", description: "Chlorum" }],
  "chol.": [{ name: "Cholesterinum", description: "Cholesterinum" }],

  "chr-as.": [{ name: "Chromicum acidum", description: "Chromicum acidum" }],
  "chr-ox.": [{ name: "Chromicum oxydatum", description: "Chromicum oxydatum" }],

  "cic.": [{ name: "Cicuta virosa", description: "Cicuta virosa" }],
  "cimx.": [{ name: "Cimex", description: "Cimex" }],
  "cimic.": [{ name: "Cimicifuga racemosa (Actaea Racemosa)", description: "Cimicifuga racemosa (Actaea Racemosa)" }],

  "cin.": [{ name: "Cin. -Abdomen, DISTENDED: When due to worms, Cina 3, 6h.", description: "Cin. -Abdomen, DISTENDED: When due to worms, Cina 3, 6h." }],
  "cina": [{ name: "Cina", description: "Cina" }],
  "cinch.": [{ name: "Cinchonium sulphuricum", description: "Cinchonium sulphuricum" }],
  "cinch-b.": [{ name: "Cinchona boliviana", description: "Cinchona boliviana" }],
  "cinnb.": [{ name: "Cinnabaris", description: "Cinnabaris" }],
  "cinnm.": [{ name: "Cinnamomum", description: "Cinnamomum" }],
  "cine-m.": [{ name: "Cineraria Maritima", description: "Cineraria Maritima" }],
  "cist.": [{ name: "Cistus canadensis", description: "Cistus canadensis" }],
  "cit-ac.": [{ name: "Citric acid", description: "Citric acid" }],
  "cit-l.": [{ name: "Citrus limonum", description: "Citrus limonum" }],
  "cit-v.": [{ name: "Citrus vulgaris", description: "Citrus vulgaris" }],

  "clem.": [{ name: "Clematis erecta", description: "Clematis erecta" }],
  "cob.": [{ name: "Cobaltum", description: "Cobaltum" }],
  "coca.": [{ name: "Coca", description: "Coca" }],
  "cocaine.": [{ name: "Cocainum muriaticum", description: "Cocainum muriaticum" }],
  "cocc.": [{ name: "Cocculus indicus", description: "Cocculus indicus" }],
  "cocc-s.": [{ name: "Coccinella septempunctata", description: "Coccinella septempunctata" }],
  "coc-c.": [{ name: "Coccus cacti", description: "Coccus cacti" }],
  "coch.": [{ name: "Cochlearia armoracia", description: "Cochlearia armoracia" }],
  "cod.": [{ name: "Codeinum", description: "Codeinum" }],
  "coff.": [{ name: "Coffea cruda", description: "Coffea cruda" }],
  "coff-t.": [{ name: "Coffea tosta", description: "Coffea tosta" }],

  "colch.": [{ name: "Colchicum autumnale", description: "Colchicum autumnale" }],
  "coll.": [{ name: "Collinsonia canadensis", description: "Collinsonia canadensis" }],
  "coloc.": [{ name: "Colocynthis", description: "Colocynthis" }],
  "colos.": [{ name: "Colostrum", description: "Colostrum" }],
  "com.": [{ name: "Comocladia dentata", description: "Comocladia dentata" }],

  "con.": [{ name: "Conium maculatum", description: "Conium maculatum" }],
  "conch.": [{ name: "Conchiolinum", description: "Conchiolinum" }],
  "conv.": [{ name: "Convallaria majalis", description: "Convallaria majalis" }],
  "conv-d.": [{ name: "Convolvulus duartinus", description: "Convolvulus duartinus" }],

  "cop.": [{ name: "Copaiva officinalis", description: "Copaiva officinalis" }],
  "cor-r.": [{ name: "Corallium rubrum", description: "Corallium rubrum" }],
  "cori-r.": [{ name: "Coriaria ruscifolia", description: "Coriaria ruscifolia" }],
  "corn.": [{ name: "Cornus circinata", description: "Cornus circinata" }],
  "corn-f.": [{ name: "Cornus florida", description: "Cornus florida" }],
  "corn-s.": [{ name: "Cornus seriea", description: "Cornus seriea" }],

  "crat.": [{ name: "Crategus Oxycantha", description: "Crategus Oxycantha" }],
  "croc.": [{ name: "Crocus sativus", description: "Crocus sativus" }],
  "cot.": [{ name: "Cotyledon umbilicus", description: "Cotyledon umbilicus" }],

  "crot-c.": [{ name: "Crotalus cascavella", description: "Crotalus cascavella" }],
  "crot-h.": [{ name: "Crotalus horridus", description: "Crotalus horridus" }],
  "crot-t.": [{ name: "Croton tiglium", description: "Croton tiglium" }],

  "cub.": [{ name: "Cubeba officinalis", description: "Cubeba officinalis" }],
  "culx.": [{ name: "Culex muscæ", description: "Culex muscæ" }],
  "cund.": [{ name: "Cundurango", description: "Cundurango" }],

  "cupr.": [{ name: "Cuprum metallicum", description: "Cuprum metallicum" }],
  "cupr-a.": [{ name: "Cuprum aceticum", description: "Cuprum aceticum" }],
  "cupr-ar.": [{ name: "Cuprum arsenicosum", description: "Cuprum arsenicosum" }],
  "cupr-n.": [{ name: "Cuprum nitricum", description: "Cuprum nitricum" }],
  "cupr-s.": [{ name: "Cuprum sulphuricum", description: "Cuprum sulphuricum" }],

  "cur.": [{ name: "Curare", description: "Curare" }],
  "cycl.": [{ name: "Cyclamen europæum", description: "Cyclamen europæum" }],
  "cypr.": [{ name: "Cypripedium pubescens", description: "Cypripedium pubescens" }],


  'daph.': [{ name: 'Daphne indica', description: 'Daphne indica' }],
  'der.': [{ name: 'Derris pinnata', description: 'Derris pinnata' }],
  'dig.': [{ name: 'Digitalis purpurea', description: 'Digitalis purpurea' }],
  'dios.': [
    {
      name: 'Dios. -Abdomen, DISTENDED: If from flatulence, with great pain, the bowels being open or loose, Dios. 12, 6h.',
      description: 'Dios. -Abdomen, DISTENDED: If from flatulence, with great pain, the bowels being open or loose, Dios. 12, 6h.'
    }
  ],
  'diph.': [{ name: 'Diptherinum', description: 'Diptherinum' }],
  'dirc.': [{ name: 'Dirca palustris', description: 'Dirca palustris' }],
  'dol.': [{ name: 'Dolichos pruriens', description: 'Dolichos pruriens' }],
  'dor.': [{ name: 'Doryphora', description: 'Doryphora' }],
  'dros.': [
    {
      name: 'Drosera rotundifolia',
      description: 'Drosera rotundifolia'
    }
  ],
  'dub.': [{ name: 'Duboisinum', description: 'Duboisinum' }],
  'dulc.': [{ name: 'Dulcamara', description: 'Dulcamara' }],
  'echi.': [
    {
      name: 'Echinacea angustifolia',
      description: 'Echinacea angustifolia'
    }
  ],
  'elaps.': [{ name: 'Elaps corallinus', description: 'Elaps corallinus' }],
  'elat.': [{ name: 'Elaterium', description: 'Elaterium' }],
  'electr.': [{ name: 'Electricitas', description: 'Electricitas' }],
  'epig.': [{ name: 'Epigea repens', description: 'Epigea repens' }],
  'equis.': [{ name: 'Equisetum hyemale', description: 'Equisetum hyemale' }],
  'erechthites.': [
    {
      name: 'Erechthites hieracifolia',
      description: 'Erechthites hieracifolia'
    }
  ],
  'erig.': [{ name: 'Erigeron canadense', description: 'Erigeron canadense' }],
  'ery-a.': [{ name: 'Eryngium aquaticum', description: 'Eryngium aquaticum' }],
  'ether.': [{ name: 'Ether', description: 'Ether' }],
  'eucal.': [
    { name: 'Eucalyptus globulus', description: 'Eucalyptus globulus' }
  ],
  'eug.': [{ name: 'Eugenia jambos', description: 'Eugenia jambos' }],
  'euon.': [{ name: 'Euonymus europæus', description: 'Euonymus europæus' }],
  'eup-per.': [
    {
      name: 'Eupatorium perfoliatum',
      description: 'Eupatorium perfoliatum'
    }
  ],
  'eup-pur.': [
    {
      name: 'Eupatorium purpureum',
      description: 'Eupatorium purpureum'
    }
  ],
  'euph.': [{ name: 'Euphorbium', description: 'Euphorbium' }],
  'euph-amyg.': [
    {
      name: 'Euphorbia amygdaloides',
      description: 'Euphorbia amygdaloides'
    }
  ],
  'euph-het.': [
    {
      name: 'Euphorbia heterodoxa',
      description: 'Euphorbia heterodoxa'
    }
  ],
  'euphr.': [
    {
      name: 'Euphrasia officinalis',
      description: 'Euphrasia officinalis'
    }
  ],
  'eupi.': [{ name: 'Eupion', description: 'Eupion' }],
  'fago.': [{ name: 'Fagopyrum', description: 'Fagopyrum' }],
  'ferr-ar.': [{ name: 'Ferrum arsenicosum', description: 'Ferrum arsenicosum' }],
  'ferr.': [{ name: 'Ferrum metallicum', description: 'Ferrum metallicum' }],
  'ferr-ac.': [{ name: 'Ferrum aceticum', description: 'Ferrum aceticum' }],
  'ferr-i.': [{ name: 'Ferrum iodatum', description: 'Ferrum iodatum' }],
  'ferr-ma.': [{ name: 'Ferrum magneticum', description: 'Ferrum magneticum' }],
  'ferr-m.': [{ name: 'Ferrum muriaticum', description: 'Ferrum muriaticum' }],
  'ferr-p.': [
    { name: 'Ferrum phosphoricum', description: 'Ferrum phosphoricum' }
  ],
  'ferr-pic.': [{ name: 'Ferrum picricum', description: 'Ferrum picricum' }],
  'ferr-py.': [
    {
      name: 'Ferrum Pyrophosphoricum',
      description: 'Ferrum Pyrophosphoricum'
    }
  ],
  'ferr-s.': [{ name: 'Ferrum sulphuricum', description: 'Ferrum sulphuricum' }],
  'fil.': [{ name: 'Filix mas', description: 'Filix mas' }],
  'fl-ac.': [{ name: 'Fluoricum acidum', description: 'Fluoricum acidum' }],
  'form.': [{ name: 'Formica rufa', description: 'Formica rufa' }],
  'frag-v.': [{ name: 'Fragaria vesca', description: 'Fragaria vesca' }],
  'gad.': [{ name: 'Gadus morrhua', description: 'Gadus morrhua' }],
  'gali.': [{ name: 'Galium Aparine', description: 'Galium Aparine' }],
  'gall-ac.': [{ name: 'Gallicum acidum', description: 'Gallicum acidum' }],
  'gamb.': [{ name: 'Gambogia', description: 'Gambogia' }],
  'gels.': [
    {
      name: 'Gelsemium sempervirens',
      description: 'Gelsemium sempervirens'
    }
  ],
  'genist.': [{ name: 'Genista tinctoria', description: 'Genista tinctoria' }],
  'gent-l.': [{ name: 'Gentiana lutea', description: 'Gentiana lutea' }],
  'gent-c.': [{ name: 'Gentiana cruciata', description: 'Gentiana cruciata' }],
  'ger.': [{ name: 'Geranium maculatum', description: 'Geranium maculatum' }],
  'get.': [{ name: 'Gettisburg water', description: 'Gettisburg water' }],
  'gins.': [{ name: 'Ginseng', description: 'Ginseng' }],
  'gland.': [{ name: 'Glanderine', description: 'Glanderine' }],
  'glon.': [{ name: 'Glonoin', description: 'Glonoin' }],
  'gnaph.': [{ name: 'Gnaphalium', description: 'Gnaphalium' }],
  'goss.': [
    { name: 'Gossypium herbaceum', description: 'Gossypium herbaceum' }
  ],
  'gran.': [{ name: 'Granatum punica', description: 'Granatum punica' }],
  'graph.': [{ name: 'Graphites', description: 'Graphites' }],
  'grat.': [
    {
      name: 'Gratiola officinalis',
      description: 'Gratiola officinalis'
    }
  ],
  'grin.': [{ name: 'Grindelia robusta', description: 'Grindelia robusta' }],
  'gua.': [{ name: 'Guaco', description: 'Guaco' }],
  'guano.': [{ name: 'Guano aust', description: 'Guano aust' }],
  'guar.': [{ name: 'Guarana', description: 'Guarana' }],
  'guare.': [{ name: 'Guarea', description: 'Guarea' }],
  'guaj.': [{ name: 'Guaiacum', description: 'Guaiacum' }],
  'gunp.': [{ name: 'Gunpowder', description: 'Gunpowder' }],
  'gymn.': [{ name: 'Gymnocladus', description: 'Gymnocladus' }],
  'haem.': [{ name: 'Hæmatoxylon', description: 'Hæmatoxylon' }],
  'ham.': [
    { name: 'Hamamelis virginica', description: 'Hamamelis virginica' }
  ],
  'hecla.': [{ name: 'Hecla lava', description: 'Hecla lava' }],
  'hedeom.': [
    { name: 'Hedeoma pulegioides', description: 'Hedeoma pulegioides' }
  ],
  'hell.': [{ name: 'Helleborus niger', description: 'Helleborus niger' }],
  'helo.': [{ name: 'Heloderma', description: 'Heloderma' }],
  'helon.': [{ name: 'Helonias dioica', description: 'Helonias dioica' }],
  'hep.': [
    {
      name: 'Hepar sulphuris calcareum',
      description: 'Hepar sulphuris calcareum'
    }
  ],
  'hipp.': [{ name: 'Hippomanes', description: 'Hippomanes' }],
  'hippoz.': [{ name: 'Hippozaenium', description: 'Hippozaenium' }],
  'hir-m.': [
    {
      name: 'Hirudo Medicinalis (sanguisuga)',
      description: 'Hirudo Medicinalis (sanguisuga)'
    }
  ],
  'hom.': [{ name: 'Homarus', description: 'Homarus' }],
  'hura.': [{ name: 'Hura braziliensis', description: 'Hura braziliensis' }],
  'hydrang.': [
    {
      name: 'Hydrangea arborescens',
      description: 'Hydrangea arborescens'
    }
  ],
  'hydr.': [
    {
      name: 'Hydrastis canadensis',
      description: 'Hydrastis canadensis'
    }
  ],
  'hydro.': [
    {
      name: 'Hydrocotyle asiatica',
      description: 'Hydrocotyle asiatica'
    }
  ],
  'hydr-ac.': [{ name: 'Hydrocyanic acid', description: 'Hydrocyanic acid' }],
  'hyos.': [{ name: 'Hyoscyamus niger', description: 'Hyoscyamus niger' }],
  'hyper.': [
    {
      name: 'Hypericum perforatum',
      description: 'Hypericum perforatum'
    }
  ],
  'iber.': [{ name: 'Iberís amara', description: 'Iberís amara' }],
  'ictod.': [{ name: 'Ictodes fœtida', description: 'Ictodes fœtida' }],
  'ign.': [
    {
      name: 'Ign., Asaf., -Abdomen, DISTENDED:Hysterical distension, (1) Ign. 12, 2h. (2) Asaf. 12, 2h.',
      description: 'Ign., Asaf., -Abdomen, DISTENDED:Hysterical distension, (1) Ign. 12, 2h. (2) Asaf. 12, 2h.'
    }
  ],
  'iii.': [{ name: 'Illicium anisatum', description: 'Illicium anisatum' }],
  'indg.': [{ name: 'Indigo', description: 'Indigo' }],
  'ind.': [{ name: 'Indium metallicum', description: 'Indium metallicum' }],
  'ing.': [{ name: 'Ingluvin', description: 'Ingluvin' }],
  'inul.': [{ name: 'Inula helenium', description: 'Inula helenium' }],
  'iodof.': [{ name: 'Iodoformum', description: 'Iodoformum' }],
  'iod.': [{ name: 'Iodium', description: 'Iodium' }],
  'ip.': [{ name: 'Ipecacuanha', description: 'Ipecacuanha' }],
  'ipom.': [{ name: 'Ipomia purpurea', description: 'Ipomia purpurea' }],
  'irid.': [{ name: 'Iridium metallicum', description: 'Iridium metallicum' }],
  'ir-fl.': [{ name: 'Iris florentina', description: 'Iris florentina' }],
  'ir-fœ.': [{ name: 'Iris fœtidissima', description: 'Iris fœtidissima' }],
  'ir-g.': [{ name: 'Iris germanica', description: 'Iris germanica' }],
  'iris-t.': [{ name: 'Iris Tenax', description: 'Iris Tenax' }],
  'iris.': [{ name: 'Iris versicolor', description: 'Iris versicolor' }],
  'jab.': [{ name: 'Jaborandi', description: 'Jaborandi' }],
  'jac.': [
    { name: 'Jacaranda gualandai', description: 'Jacaranda gualandai' }
  ],
  'jac-c.': [{ name: 'Jacaranda caroba', description: 'Jacaranda caroba' }],
  'jal.': [{ name: 'Jalapa', description: 'Jalapa' }],
  'jatr.': [{ name: 'Jatropha curcas', description: 'Jatropha curcas' }],
  'jug-c.': [{ name: 'Juglans cinerea', description: 'Juglans cinerea' }],
  'jug-r.': [{ name: 'Juglans regia', description: 'Juglans regia' }],
  'junc.': [{ name: 'Juncus effusus', description: 'Juncus effusus' }],
  'juni.': [
    {
      name: 'Juniperus virginiana',
      description: 'Juniperus virginiana'
    }
  ],
  'kali-a.': [{ name: 'Kali aceticum', description: 'Kali aceticum' }],
  'kali-ar.': [{ name: 'Kali arsenicosum', description: 'Kali arsenicosum' }],
  'kali-bi.': [{ name: 'Kali bichromicum', description: 'Kali bichromicum' }],
  'kali-br.': [{ name: 'Kali bromatum', description: 'Kali bromatum' }],
  'kali-c.': [{ name: 'Kali carbonicum', description: 'Kali carbonicum' }],
  'kali-chl.': [{ name: 'Kali chloricum', description: 'Kali chloricum' }],
  'kali-cit.': [{ name: 'kali citricum', description: 'kali citricum' }],
  'kali-cy.': [{ name: 'Kali cyanatum', description: 'Kali cyanatum' }],
  'kali-fer.': [{ name: 'Kali ferrocyanicum', description: 'Kali ferrocyanicum' }],
  'kali-i.': [{ name: 'Kali iodatum', description: 'Kali iodatum' }],
  'kali-m.': [{ name: 'Kali muriaticum', description: 'Kali muriaticum' }],
  'kali-ma.': [{ name: 'Kali manganicum', description: 'Kali manganicum' }],
  'kali-n.': [{ name: 'Kali nitricum', description: 'Kali nitricum' }],
  'kali-ox.': [{ name: 'Kali oxalicum', description: 'Kali oxalicum' }],
  'kali-p.': [{ name: 'Kali phosphoricum', description: 'Kali phosphoricum' }],
  'kali-pic.': [{ name: 'Kali picricum', description: 'Kali picricum' }],
  'kali-s.': [{ name: 'Kali sulphuricum', description: 'Kali sulphuricum' }],
  'kalm.': [{ name: 'Kalmia latifolia', description: 'Kalmia latifolia' }],
  'kaol.': [{ name: 'Kaolin', description: 'Kaolin' }],
  kino: [{ name: 'Kino', description: 'Kino' }],
  'kiss.': [{ name: 'Kissengen', description: 'Kissengen' }],
  'kreos.': [{ name: 'Kreosotum', description: 'Kreosotum' }],
  'lac-c.': [{ name: 'Lac caninum', description: 'Lac caninum' }],
  'lac-d.': [{ name: 'Lac defloratum', description: 'Lac defloratum' }],
  'lac-f.': [{ name: 'Lac felinum', description: 'Lac felinum' }],
  'lac-v.': [{ name: 'Lac Vaccinum', description: 'Lac Vaccinum' }],
  'lach.': [{ name: 'Lachesis', description: 'Lachesis' }],
  'lachn.': [
    {
      name: 'Lachnanthes tinctoria',
      description: 'Lachnanthes tinctoria'
    }
  ],
  'lac-ac.': [{ name: 'Lactic acid', description: 'Lactic acid' }],
  'lact.': [{ name: 'Lactuca virosa', description: 'Lactuca virosa' }],
  'lam.': [{ name: 'Lamium album', description: 'Lamium album' }],
  'lap-a.': [{ name: 'Lapis albus', description: 'Lapis albus' }],
  'lappa-a.': [{ name: 'Lappa arctium', description: 'Lappa arctium' }],
  'lappa-m.': [{ name: 'Lappa major', description: 'Lappa major' }],
  'lath.': [{ name: 'Lathyrus sativus', description: 'Lathyrus sativus' }],
  'lat-m.': [
    { name: 'Latrodectus mactans', description: 'Latrodectus mactans' }
  ],
  'laur.': [{ name: 'Laurocerasus', description: 'Laurocerasus' }],
  'lec.': [{ name: 'Lecithin', description: 'Lecithin' }],
  'led.': [{ name: 'Ledum palustre', description: 'Ledum palustre' }],
  'lem-m.': [{ name: 'Lemna minor', description: 'Lemna minor' }],
  'lepi.': [
    { name: 'Lepidium bonariense', description: 'Lepidium bonariense' }
  ],
  'lept.': [
    { name: 'Leptandra virginica', description: 'Leptandra virginica' }
  ],
  'lil-t.': [{ name: 'Lilium tigrinum', description: 'Lilium tigrinum' }],
  'linu-c.': [{ name: 'Linum cathar', description: 'Linum cathar' }],
  'lith.': [{ name: 'Lithium carbonicum', description: 'Lithium carbonicum' }],
  'lith-m.': [{ name: 'Lithium muriaticum', description: 'Lithium muriaticum' }],
  'lob-c.': [{ name: 'Lobelia cardinalis', description: 'Lobelia cardinalis' }],
  'lob.': [{ name: 'Lobelia inflata', description: 'Lobelia inflata' }],
  'lob-e.': [{ name: 'Lobelia Erinus', description: 'Lobelia Erinus' }],
  'lob-s.': [
    { name: 'Lobelia syphilitica', description: 'Lobelia syphilitica' }
  ],
  'lup.': [{ name: 'Lupulus', description: 'Lupulus' }],
  'lyc.': [
    {
      name: 'Lyc., -Abdomen, DISTENDED: If due to flatulence with or without constipation, Lyc. 6, 6hrly',
      description: 'Lyc., -Abdomen, DISTENDED: If due to flatulence with or without constipation, Lyc. 6, 6hrly'
    }
  ],
  'lycpr.': [{ name: 'Lycopersicum', description: 'Lycopersicum' }],
  'lycps.': [{ name: 'Lycopus virginicus', description: 'Lycopus virginicus' }],
  'lyss.': [
    {
      name: 'Hydrophobinum or lyssinum',
      description: 'Hydrophobinum or lyssinum'
    }
  ],
  'mag-arct.': [
    {
      name: 'Magnetis polus arcticus',
      description: 'Magnetis polus arcticus'
    }
  ],
  'mag-aust.': [
    {
      name: 'Magnetis polus australis',
      description: 'Magnetis polus australis'
    }
  ],
  'mag-c.': [{ name: 'Magnesia carbonica', description: 'Magnesia carbonica' }],
  'mag-m.': [{ name: 'Magnesia muriatica', description: 'Magnesia muriatica' }],
  'mag-p.': [
    {
      name: 'Magnesia phosphorica',
      description: 'Magnesia phosphorica'
    }
  ],
  'mag-p-a.': [{ name: 'Magnetis poli ambo', description: 'Magnetis poli ambo' }],
  'mag-s.': [
    { name: 'Magnesia sulphurica', description: 'Magnesia sulphurica' }
  ],
  'maland.': [{ name: 'Malandrinum', description: 'Malandrinum' }],
  'malar.': [
    { name: 'Malaria officinalis', description: 'Malaria officinalis' }
  ],
  'manc.': [
    {
      name: 'Mancinella (Hippomane mancinella)',
      description: 'Mancinella (Hippomane mancinella)'
    }
  ],
  'mang.': [{ name: 'Manganum', description: 'Manganum' }],
  'mang-m.': [
    { name: 'Manganum muriaticum', description: 'Manganum muriaticum' }
  ],
  'med.': [{ name: 'Medorrhinum', description: 'Medorrhinum' }],
  'meli.': [{ name: 'Melilotus alba', description: 'Melilotus alba' }],
  'menis.': [{ name: 'Menispermum', description: 'Menispermum' }],
  'ment.': [{ name: 'Mentha piperita', description: 'Mentha piperita' }],
  'meny.': [{ name: 'Menyanthes', description: 'Menyanthes' }],
  'meph.': [{ name: 'Mephitis', description: 'Mephitis' }],
  'merc.': [
    {
      name: 'Mercurius Solubilis hahnemaanian',
      description: 'Mercurius Solubilis hahnemaanian'
    }
  ],
  'merc-v.': [{ name: 'Mercurius vivus', description: 'Mercurius vivus' }],
  'merc-ac.': [{ name: 'Mercurius aceticus', description: 'Mercurius aceticus' }],
  'merc-c.': [
    {
      name: 'Mercurius corrosivus',
      description: 'Mercurius corrosivus'
    }
  ],
  'merc-cy.': [{ name: 'Mercurius cyanatus', description: 'Mercurius cyanatus' }],
  'merc-d.': [{ name: 'Mercurius dulcis', description: 'Mercurius dulcis' }],
  'merc-i-f.': [
    {
      name: 'Mercurius iodatus flavus',
      description: 'Mercurius iodatus flavus'
    }
  ],
  'merc-i-r.': [
    {
      name: 'Mercurius iodatus ruber',
      description: 'Mercurius iodatus ruber'
    }
  ],
  'merc-n.': [{ name: 'Mercurius nitrosus', description: 'Mercurius nitrosus' }],
  'merc-p-r.': [
    {
      name: 'Mercurius præcipitatus ruber',
      description: 'Mercurius præcipitatus ruber'
    }
  ],
  'merc-sul.': [
    {
      name: 'Mercurius sulphuricus',
      description: 'Mercurius sulphuricus'
    }
  ],
  'merl.': [
    {
      name: 'Mercurialis perennis',
      description: 'Mercurialis perennis'
    }
  ],
  'mez.': [{ name: 'Mezereum', description: 'Mezereum' }],
  'mill.': [{ name: 'Millefolium', description: 'Millefolium' }],
  'mit.': [{ name: 'Mitchella repens', description: 'Mitchella repens' }],
  'morph.': [{ name: 'Morphinum', description: 'Morphinum' }],
  'mosch.': [{ name: 'Moschus', description: 'Moschus' }],
  'murx.': [{ name: 'Murex', description: 'Murex' }],
  'mur-ac.': [{ name: 'Muriaticum acidum', description: 'Muriaticum acidum' }],
  'mygal.': [{ name: 'Mygale lasiodora', description: 'Mygale lasiodora' }],
  'myos.': [{ name: 'Myosotis', description: 'Myosotis' }],
  'myric.': [{ name: 'Myrica cerifera', description: 'Myrica cerifera' }],
  'myris.': [{ name: 'Myristica sebifera', description: 'Myristica sebifera' }],
  'myrt-c.': [{ name: 'Myrtus communis', description: 'Myrtus communis' }],
  naja: [{ name: 'Naja tripudia', description: 'Naja tripudia' }],
  'naph.': [{ name: 'Naphthalin', description: 'Naphthalin' }],
  'narcot.': [{ name: 'Narcotinum', description: 'Narcotinum' }],
  'nat-ac.': [{ name: 'Natrum aceticum', description: 'Natrum aceticum' }],
  'nat-a.': [{ name: 'Natrum arsenicatum', description: 'Natrum arsenicatum' }],
  'nat-c.': [{ name: 'Natrum carbonicum', description: 'Natrum carbonicum' }],
  'nat-caco.': [{ name: 'Natrum Cacodilinum', description: 'Natrum Cacodilinum' }],
  'nat-h.': [
    {
      name: 'Natrum hypochlorosum',
      description: 'Natrum hypochlorosum'
    }
  ],
  'nat-m.': [{ name: 'Natrum muriaticum', description: 'Natrum muriaticum' }],
  'nat-n.': [{ name: 'Natrum nitricum', description: 'Natrum nitricum' }],
  'nat-p.': [
    { name: 'Natrum phosphoricum', description: 'Natrum phosphoricum' }
  ],
  'nat-s.': [{ name: 'Natrum sulphuricum', description: 'Natrum sulphuricum' }],
  'nicc.': [{ name: 'Niccolum', description: 'Niccolum' }],
  'nicc-s.': [{ name: 'Niccolum sulph', description: 'Niccolum sulph' }],
  'nit-ac.': [{ name: 'Nitricum acidum', description: 'Nitricum acidum' }],
  'nit-m-ac.': [
    { name: 'Nitro muriatic acid', description: 'Nitro muriatic acid' }
  ],
  'nit-s-d.': [
    {
      name: 'Nitri spiritus dulcis',
      description: 'Nitri spiritus dulcis'
    }
  ],
  'nitro-o.': [
    {
      name: 'Nitrogenum oxygenatum',
      description: 'Nitrogenum oxygenatum'
    }
  ],
  'nuph.': [{ name: 'Nuphar luteum', description: 'Nuphar luteum' }],
  'nux-m.': [{ name: 'Nux moschata', description: 'Nux moschata' }],
  'nux-j.': [{ name: 'Nux juglans', description: 'Nux juglans' }],
  'nux-v.': [{ name: 'Nux vomica', description: 'Nux vomica' }],
  'nym.': [{ name: 'Nymphæa odorata', description: 'Nymphæa odorata' }],
  'oci.': [{ name: 'Ocimum canum', description: 'Ocimum canum' }],
  'oena.': [{ name: 'Oenanthe crocata', description: 'Oenanthe crocata' }],
  'olnd.': [{ name: 'Oleander', description: 'Oleander' }],
  'ol-an.': [{ name: 'Oleum animale', description: 'Oleum animale' }],
  'ol-j.': [
    {
      name: 'Oleum jecoris aselli',
      description: 'Oleum jecoris aselli'
    }
  ],
  'onos.': [{ name: 'Onosmodium', description: 'Onosmodium' }],
  'op.': [{ name: 'Opium', description: 'Opium' }],
  'orig.': [{ name: 'Origanum majorana', description: 'Origanum majorana' }],
  'osm.': [{ name: 'Osmium', description: 'Osmium' }],
  'ov.': [{ name: 'Ovinine', description: 'Ovinine' }],
  'ox-ac.': [{ name: 'Oxalicum acidum', description: 'Oxalicum acidum' }],
  'oxyt.': [{ name: 'Oxytropis lamberti', description: 'Oxytropis lamberti' }],
  ozone: [{ name: 'Ozone (Oxygenium)', description: 'Ozone (Oxygenium)' }],
  'paeon.': [{ name: 'Pæonia officinalis', description: 'Pæonia officinalis' }],
  'pall.': [{ name: 'Palladium', description: 'Palladium' }],
  'pareir.': [{ name: 'Pareira brava', description: 'Pareira brava' }],
  'par.': [{ name: 'Paris quadrifolia', description: 'Paris quadrifolia' }],
  'paull.': [{ name: 'Paullinja pinnata', description: 'Paullinja pinnata' }],
  'ped.': [{ name: 'Pediculus capitis', description: 'Pediculus capitis' }],
  'pen.': [{ name: 'Penthorum', description: 'Penthorum' }],
  'penic.': [{ name: 'Penicillinum', description: 'Penicillinum' }],
  'per.': [{ name: 'Persica', description: 'Persica' }],
  'peti.': [{ name: 'Petiveria', description: 'Petiveria' }],
  'petr.': [{ name: 'Petroleum', description: 'Petroleum' }],
  'petros.': [{ name: 'Petroselinum', description: 'Petroselinum' }],
  'phal.': [{ name: 'Phallus impudicus', description: 'Phallus impudicus' }],
  'phase.': [{ name: 'Phaseolus nanus', description: 'Phaseolus nanus' }],
  'phel.': [{ name: 'Phellandrium', description: 'Phellandrium' }],
  'ph-ac.': [
    { name: 'Phosphoricum acidum', description: 'Phosphoricum acidum' }
  ],
  'phos.': [{ name: 'Phosphorus', description: 'Phosphorus' }],
  'phys.': [{ name: 'Physostigma', description: 'Physostigma' }],
  'phyt.': [
    { name: 'Phytolacca decandra', description: 'Phytolacca decandra' }
  ],
  'pic-ac.': [{ name: 'Picricum acidum', description: 'Picricum acidum' }],
  'pimp.': [
    {
      name: 'Pimpinella saxifraga',
      description: 'Pimpinella saxifraga'
    }
  ],
  'pin-s.': [{ name: 'Pinus silvestris', description: 'Pinus silvestris' }],
  'pip-m.': [{ name: 'Piper methysticum', description: 'Piper methysticum' }],
  'pip-n.': [{ name: 'Piper nigrum', description: 'Piper nigrum' }],
  'plan.': [{ name: 'Plantago major', description: 'Plantago major' }],
  'plat.': [
    { name: 'Platinum metallicum', description: 'Platinum metallicum' }
  ],
  'plat-m.': [
    { name: 'Platinum muriaticum', description: 'Platinum muriaticum' }
  ],
  'pled.': [{ name: 'Plectranthus', description: 'Plectranthus' }],
  'plumbg.': [
    { name: 'Plumbago littoralis', description: 'Plumbago littoralis' }
  ],
  'plb.': [{ name: 'Plumbum metallicum', description: 'Plumbum metallicum' }],
  'plb-acet.': [{ name: 'plumbum aceticum', description: 'plumbum aceticum' }],
  'podo.': [
    {
      name: 'Podophyllum peltatum',
      description: 'Podophyllum peltatum'
    }
  ],
  'polyg.': [
    {
      name: 'Polygonum hydropiperoides',
      description: 'Polygonum hydropiperoides'
    }
  ],
  'polyp-o.': [
    {
      name: 'Polyporous Officinalis',
      description: 'Polyporous Officinalis'
    }
  ],
  'pop.': [
    { name: 'Populus tremuloides', description: 'Populus tremuloides' }
  ],
  'poth.': [{ name: 'Pothos fœtidus', description: 'Pothos fœtidus' }],
  'prun.': [{ name: 'Prunus spinosa', description: 'Prunus spinosa' }],
  'psor.': [{ name: 'Psorinum', description: 'Psorinum' }],
  'ptel.': [{ name: 'Ptelea trifoliata', description: 'Ptelea trifoliata' }],
  'pulx.': [{ name: 'Pulex iritans', description: 'Pulex iritans' }],
  'puls.': [
    {
      name: 'Pulsatilla nigricans',
      description: 'Pulsatilla nigricans'
    }
  ],
  'pul-n.': [
    {
      name: 'Pulsatilla nuttaliana',
      description: 'Pulsatilla nuttaliana'
    }
  ],
  'pyrog.': [{ name: 'Pyrogenium', description: 'Pyrogenium' }],
  'pyrus.': [{ name: 'Pyrus americana', description: 'Pyrus americana' }],
  'querc-g-sp.': [
    {
      name: 'Quercus glandis spiritus',
      description: 'Quercus glandis spiritus'
    }
  ],
  'rad.': [{ name: 'Radium', description: 'Radium' }],
  'ran-a.': [{ name: 'Ranunculus acris', description: 'Ranunculus acris' }],
  'ran-b.': [
    { name: 'Ranunculus bulbosus', description: 'Ranunculus bulbosus' }
  ],
  'ran-s.': [
    {
      name: 'Ranunculus sceleratus',
      description: 'Ranunculus sceleratus'
    }
  ],
  'raph.': [{ name: 'Raphanus', description: 'Raphanus' }],
  'rat.': [{ name: 'Ratanhia', description: 'Ratanhia' }],
  rheum: [{ name: 'Rheum', description: 'Rheum' }],
  'rhod.': [{ name: 'Rhododendron', description: 'Rhododendron' }],
  'rhus-a.': [{ name: 'Rhus aromatica', description: 'Rhus aromatica' }],
  'rhus-g.': [{ name: 'Rhus glabra', description: 'Rhus glabra' }],
  'rhus-r.': [{ name: 'Rhus radicans', description: 'Rhus radicans' }],
  'rhus-t.': [{ name: 'Rhus toxicodendron', description: 'Rhus toxicodendron' }],
  'rhus-v.': [{ name: 'Rhus venenata', description: 'Rhus venenata' }],
  'ric.': [{ name: 'Ricinus Communis', description: 'Ricinus Communis' }],
  'rob.': [
    { name: 'Robinia pseudacacia', description: 'Robinia pseudacacia' }
  ],
  'rubia-t.': [{ name: 'rubia tinctoria', description: 'rubia tinctoria' }],
  'rumex.': [{ name: 'Rumex crispus', description: 'Rumex crispus' }],
  'ruta.': [{ name: 'Ruta graveolens', description: 'Ruta graveolens' }],
  'sabad.': [{ name: 'Sabadilla', description: 'Sabadilla' }],
  'sabal.': [{ name: 'Sabal serrulata', description: 'Sabal serrulata' }],
  'sabin.': [{ name: 'Sabina', description: 'Sabina' }],
  'sacc.': [{ name: 'Saccharum album', description: 'Saccharum album' }],
  'sac-l.': [{ name: 'Saccharum lactis', description: 'Saccharum lactis' }],
  'sal-ac.': [{ name: 'Salicylicum acidum', description: 'Salicylicum acidum' }],
  'salam.': [{ name: 'Salamander', description: 'Salamander' }],
  'sal-n.': [{ name: 'Salix niger', description: 'Salix niger' }],
  'samb.': [{ name: 'Sambucus nigra', description: 'Sambucus nigra' }],
  'sang.': [
    {
      name: 'Sanguinaria canadensis',
      description: 'Sanguinaria canadensis'
    }
  ],
  'sang-n.': [
    { name: 'Sanguinaria nitrica', description: 'Sanguinaria nitrica' }
  ],
  'sanic.': [{ name: 'Sanicula aqua', description: 'Sanicula aqua' }],
  'sant.': [{ name: 'Santoninum', description: 'Santoninum' }],
  'sarr.': [
    { name: 'Sarracenia purpurea', description: 'Sarracenia purpurea' }
  ],
  'sars.': [{ name: 'Sarsaparilla', description: 'Sarsaparilla' }],
  'scirr.': [{ name: 'Scirrhinum', description: 'Scirrhinum' }],
  'scut.': [
    {
      name: 'Scutellaria lateriflora',
      description: 'Scutellaria lateriflora'
    }
  ],
  'sec.': [{ name: 'Secale cornutum', description: 'Secale cornutum' }],
  'sel.': [{ name: 'Selenium', description: 'Selenium' }],
  'senec.': [{ name: 'Senecio aureus', description: 'Senecio aureus' }],
  'seneg.': [{ name: 'Senega', description: 'Senega' }],
  'senn.': [{ name: 'Senna', description: 'Senna' }],
  'sep.': [{ name: 'Sepia', description: 'Sepia' }],
  'serp.': [{ name: 'Serpentaria', description: 'Serpentaria' }],
  'sil.': [
    {
      name: 'Sil.,Bac., -Abdomen, DISTENDED:In thin, rickety children, Sil. 6, 6h. Intercurrently, Bac. 30, once a week.',
      description: 'Sil.,Bac., -Abdomen, DISTENDED:In thin, rickety children, Sil. 6, 6h. Intercurrently, Bac. 30, once a week.'
    }
  ],
  'sin-a.': [{ name: 'Sinapis alba', description: 'Sinapis alba' }],
  'sin-n.': [{ name: 'Sinapis nigra', description: 'Sinapis nigra' }],
  'sol-m.': [{ name: 'Solanum mammosum', description: 'Solanum mammosum' }],
  'sol-n.': [{ name: 'Solanum nigrum', description: 'Solanum nigrum' }],
  'sol-o.': [{ name: 'Solanum oleraceum', description: 'Solanum oleraceum' }],
  'sol-t-ae.': [
    {
      name: 'Solanum tuberosum aegrotans',
      description: 'Solanum tuberosum aegrotans'
    }
  ],
  'sol-v.': [{ name: 'Solidago v.a.', description: 'Solidago v.a.' }],
  'spig.': [{ name: 'Spigelia anthelmia', description: 'Spigelia anthelmia' }],
  'spig-m.': [
    {
      name: 'Spigelia marilandica',
      description: 'Spigelia marilandica'
    }
  ],
  testing: [
    {
      name: 'abandoned',
      description: 'ABANDONED- these is the testing data under abandoned rubrics to test the functionality working properly or not'
    },
    {
      name: 'abrupt',
      description: 'ABRUPT- these is under abrupt helo world structuring balbal alnakcnaslsamscascasck'
    }
  ],
  'spira.': [{ name: 'Spiranthes', description: 'Spiranthes' }],
  'spong.': [{ name: 'Spongia tosta', description: 'Spongia tosta' }],
  'squil.': [{ name: 'Squilla hispanica', description: 'Squilla hispanica' }],
  'stach.': [{ name: 'Stachys betonica', description: 'Stachys betonica' }],
  'stann.': [{ name: 'Stannum metallicum', description: 'Stannum metallicum' }],
  'staph.': [{ name: 'Staphysagria', description: 'Staphysagria' }],
  'stel.': [{ name: 'Stellaria media', description: 'Stellaria media' }],
  'stict.': [{ name: 'Sticta pulmonaria', description: 'Sticta pulmonaria' }],
  'still.': [
    {
      name: 'Stillingia sylvatica',
      description: 'Stillingia sylvatica'
    }
  ],
  'stram.': [{ name: 'Stramonium', description: 'Stramonium' }],
  'stront-c.': [
    {
      name: 'Strontium carbonicum',
      description: 'Strontium carbonicum'
    }
  ],
  'stroph.': [
    {
      name: 'Strophanthus hispidus',
      description: 'Strophanthus hispidus'
    }
  ],
  'stry.': [{ name: 'Strychninum', description: 'Strychninum' }],
  'sulph.': [{ name: 'Sulphur', description: 'Sulphur' }],
  'sul-i.': [{ name: 'Sulphur iodatum', description: 'Sulphur iodatum' }],
  'sul-ac.': [{ name: 'Sulphuricum acidum', description: 'Sulphuricum acidum' }],
  'sumb.': [{ name: 'Sumbul', description: 'Sumbul' }],
  'syph.': [{ name: 'Syphilinum', description: 'Syphilinum' }],
  'symph.': [
    {
      name: 'Symphytum officinale',
      description: 'Symphytum officinale'
    }
  ],
  'sym-r.': [
    {
      name: 'Symphoricarpus racemosus',
      description: 'Symphoricarpus racemosus'
    }
  ],
  'tab.': [{ name: 'Tabacum', description: 'Tabacum' }],
  'tam-c.': [{ name: 'Tamus communis', description: 'Tamus communis' }],
  'tanac.': [{ name: 'Tanacetum vulgare', description: 'Tanacetum vulgare' }],
  'tann.': [{ name: 'Tanninum', description: 'Tanninum' }],
  'tarax.': [{ name: 'Taraxacum', description: 'Taraxacum' }],
  'tarent.': [
    { name: 'Tarentula hispanica', description: 'Tarentula hispanica' }
  ],
  'tarent-c.': [{ name: 'Tarentula cubensis', description: 'Tarentula cubensis' }],
  'tart-ac.': [{ name: 'Tartaricum acid', description: 'Tartaricum acid' }],
  'tax.': [{ name: 'Taxus baccata', description: 'Taxus baccata' }],
  'tell.': [{ name: 'Tellurium', description: 'Tellurium' }],
  'tep.': [{ name: 'Teplitz', description: 'Teplitz' }],
  'ter.': [{ name: 'Terebinthina', description: 'Terebinthina' }],
  'teucr.': [
    {
      name: 'Teucrium marum verum',
      description: 'Teucrium marum verum'
    }
  ],
  'thal.': [{ name: 'Thallium', description: 'Thallium' }],
  thea: [{ name: 'Thea sinensis', description: 'Thea sinensis' }],
  'ther.': [{ name: 'Theridion', description: 'Theridion' }],
  'thios.': [{ name: 'Thiosinaminum', description: 'Thiosinaminum' }],
  'thlaspi.': [
    {
      name: 'Thlaspi bursa pastoris',
      description: 'Thlaspi bursa pastoris'
    }
  ],
  'thy.': [{ name: 'thyroidinum', description: 'thyroidinum' }],
  'thuj.': [
    {
      name: ' thuj., -Abdomen, DISTENDED:As if a living animal were there, Thuj. 12, 2h.',
      description: ' thuj., -Abdomen, DISTENDED:As if a living animal were there, Thuj. 12, 2h.'
    }
  ],
  'til.': [{ name: 'Tilia curopea', description: 'Tilia curopea' }],
  'tong.': [{ name: 'Tongo', description: 'Tongo' }],
  'trif-p.': [{ name: 'Trifolium pratense', description: 'Trifolium pratense' }],
  'tril.': [{ name: 'Trillium pendulum', description: 'Trillium pendulum' }],
  'trom.': [
    {
      name: 'Trombidium muscæ domesticæ',
      description: 'Trombidium muscæ domesticæ'
    }
  ],
  'trio.': [
    {
      name: 'Triosteum perfoliatum',
      description: 'Triosteum perfoliatum'
    }
  ],
  'tub.': [{ name: 'Tuberculinum', description: 'Tuberculinum' }],
  'tub-av.': [
    { name: 'Tuberculinum aviare', description: 'Tuberculinum aviare' }
  ],
  'tus-f.': [{ name: 'Tussilago fragrans', description: 'Tussilago fragrans' }],
  'tus-p.': [
    { name: 'Tussilago petasites', description: 'Tussilago petasites' }
  ],
  'upa.': [{ name: 'Upas tiente', description: 'Upas tiente' }],
  'uran.': [{ name: 'Uranium nitricum', description: 'Uranium nitricum' }],
  'urt-u.': [{ name: 'Urtica urens', description: 'Urtica urens' }],
  'ust.': [{ name: 'Ustilago maydis', description: 'Ustilago maydis' }],
  'uva.': [{ name: 'Uva ursi', description: 'Uva ursi' }],
  'vac.': [{ name: 'Vaccininum', description: 'Vaccininum' }],
  'vanad.': [{ name: 'Vanadium', description: 'Vanadium' }],
  'valer.': [{ name: 'Valeriana', description: 'Valeriana' }],
  'vario.': [{ name: 'Variolinum', description: 'Variolinum' }],
  'verat.': [{ name: 'Veratrum album', description: 'Veratrum album' }],
  'verat-v.': [{ name: 'Veratrum viride', description: 'Veratrum viride' }],
  'verb.': [{ name: 'Verbascum thapsus', description: 'Verbascum thapsus' }],
  'vesp.': [{ name: 'Vespa crabro', description: 'Vespa crabro' }],
  'vib.': [{ name: 'Viburnum opulus', description: 'Viburnum opulus' }],
  'vinc.': [{ name: 'Vinca minor', description: 'Vinca minor' }],
  'viol-o.': [{ name: 'Viola odorata', description: 'Viola odorata' }],
  'viol-t.': [{ name: 'Viola tricolor', description: 'Viola tricolor' }],
  'vip.': [{ name: 'Vipera', description: 'Vipera' }],
  'visc.': [{ name: 'Viscum alburn', description: 'Viscum alburn' }],
  'wies.': [{ name: 'Wiesbaden', description: 'Wiesbaden' }],
  'wild.': [{ name: 'Wildbad', description: 'Wildbad' }],
  'wye.': [
    { name: 'Wyethia helenioides', description: 'Wyethia helenioides' }
  ],
  'xan.': [
    {
      name: 'Xanthoxylum fraxineum',
      description: 'Xanthoxylum fraxineum'
    }
  ],
  'x-ray.': [{ name: 'X Ray', description: 'X Ray' }],
  'yuc.': [{ name: 'Yucca', description: 'Yucca' }],
  'zinc.': [{ name: 'Zincum metallicum', description: 'Zincum metallicum' }],
  'zinc-ac.': [{ name: 'Zincum aceticum', description: 'Zincum aceticum' }],
  'zinc-c.': [{ name: 'Zincum cyanatum', description: 'Zincum cyanatum' }],
  'zinc-m.': [{ name: 'Zincum muriaticum', description: 'Zincum muriaticum' }],
  'zinc-ox.': [{ name: 'Zincum oxydatum', description: 'Zincum oxydatum' }],
  'zinc-pic.': [{ name: 'Zincum Picricum', description: 'Zincum Picricum' }],
  'zinc-s.': [{ name: 'Zincum sulphuricum', description: 'Zincum sulphuricum' }],
  'zing.': [{ name: 'Zingiber', description: 'Zingiber' }],
  'ziz.': [{ name: 'Zizia aurea', description: 'Zizia aurea' }]
}

export const KENT_REPERTORY: KentRepertory = {
  bookName: "Kent",
  chapters: [
    {
      id: "mind",
      name: "Mind",
      icon: "⚕️",
      description: "Mental and emotional symptoms",
      rubrics: [{
        "id": "abandoned",
        "name": "ABANDONED",
        "remedies": [],
        "meaning": "",
        "notes": [],
        "crossReferences": [
          {
            "chapter": "Mind",
            "rubric": "Mind; FORSAKEN feeling (31) : "
          }
        ]
      },
      {
        "id": "abrupt",
        "name": "ABRUPT",
        "remedies": [
          {
            "abbr": "nat-m",
            "grade": 1
          },
          {
            "abbr": "tarent",
            "grade": 2
          }
        ],
        "meaning": "[KR,RbMean,-Sudden & Unexpected Behaviour of the patient]",
        "notes": [
          {
            "type": "system",
            "text": "[KR,Whntouse, -You can observe the behaviour of the patient when entering the clinic or while case taking to take this rubric for repertorisation.The behaviour of the patient is very sudden or harsh.Example - banging the door, coming inside the clinic and suddenly starting to tell about his complaints without any background of himself]"
          },
          {
            "type": "system",
            "text": "[KR,WhntoUseMetaphor, - Abruptness indicates a sudden shift in behaviour or act or break in continuity of talk or action implying taking this rubric in analysis] "
          }
        ],
        "crossReferences": [
          {
            "chapter": "Mind",
            "rubric": "Mind; ANSWERS; abruptly (17) :"
          }
        ]
      },
      {
        "id": "absent-minded",
        "name": "ABSENT-MINDED",
        "remedies": [
          {
            "abbr": "acon",
            "grade": 2
          },
          {
            "abbr": "act-sp",
            "grade": 1
          },
          {
            "abbr": "aesc",
            "grade": 1
          },
          {
            "abbr": "agar",
            "grade": 1
          },
          {
            "abbr": "agn",
            "grade": 2
          },
          {
            "abbr": "all-c",
            "grade": 1
          },
          {
            "abbr": "alum",
            "grade": 2
          },
          {
            "abbr": "am-c",
            "grade": 2
          },
          {
            "abbr": "am-m",
            "grade": 1
          },
          {
            "abbr": "anac",
            "grade": 2
          },
          {
            "abbr": "ang",
            "grade": 1
          },
          {
            "abbr": "arg",
            "grade": 1
          },
          {
            "abbr": "arn",
            "grade": 2
          },
          {
            "abbr": "ars",
            "grade": 1
          },
          {
            "abbr": "arum-t",
            "grade": 1
          },
          {
            "abbr": "asar",
            "grade": 1
          },
          {
            "abbr": "aur",
            "grade": 2
          },
          {
            "abbr": "bar-c",
            "grade": 2
          },
          {
            "abbr": "bell",
            "grade": 2
          },
          {
            "abbr": "bov",
            "grade": 2
          },
          {
            "abbr": "calad",
            "grade": 2
          },
          {
            "abbr": "calc",
            "grade": 1
          },
          {
            "abbr": "calc-s",
            "grade": 1
          },
          {
            "abbr": "Cann-i",
            "grade": 3
          },
          {
            "abbr": "cann-s",
            "grade": 1
          },
          {
            "abbr": "caps",
            "grade": 1
          },
          {
            "abbr": "carb-ac",
            "grade": 1
          },
          {
            "abbr": "carbn-s",
            "grade": 1
          },
          {
            "abbr": "carl",
            "grade": 2
          },
          {
            "abbr": "Caust",
            "grade": 3
          },
          {
            "abbr": "cench",
            "grade": 1
          },
          {
            "abbr": "Cham",
            "grade": 3
          },
          {
            "abbr": "chel",
            "grade": 1
          },
          {
            "abbr": "chin",
            "grade": 1
          },
          {
            "abbr": "cic",
            "grade": 2
          },
          {
            "abbr": "clem",
            "grade": 1
          },
          {
            "abbr": "cocc",
            "grade": 2
          },
          {
            "abbr": "coff",
            "grade": 1
          },
          {
            "abbr": "colch",
            "grade": 2
          },
          {
            "abbr": "coloc",
            "grade": 1
          },
          {
            "abbr": "con",
            "grade": 1
          },
          {
            "abbr": "croc",
            "grade": 1
          },
          {
            "abbr": "crot-h",
            "grade": 1
          },
          {
            "abbr": "cupr",
            "grade": 2
          },
          {
            "abbr": "cycl",
            "grade": 1
          },
          {
            "abbr": "daph",
            "grade": 1
          },
          {
            "abbr": "dirc",
            "grade": 1
          },
          {
            "abbr": "dulc",
            "grade": 1
          },
          {
            "abbr": "graph",
            "grade": 2
          },
          {
            "abbr": "guai",
            "grade": 1
          },
          {
            "abbr": "ham",
            "grade": 1
          },
          {
            "abbr": "Hell",
            "grade": 3
          },
          {
            "abbr": "hep",
            "grade": 1
          },
          {
            "abbr": "hyos",
            "grade": 2
          },
          {
            "abbr": "ign",
            "grade": 2
          },
          {
            "abbr": "jug-c",
            "grade": 1
          },
          {
            "abbr": "kali-br",
            "grade": 2
          },
          {
            "abbr": "kali-c",
            "grade": 2
          },
          {
            "abbr": "kali-p",
            "grade": 2
          },
          {
            "abbr": "kali-s",
            "grade": 1
          },
          {
            "abbr": "kreos",
            "grade": 2
          },
          {
            "abbr": "lac-c",
            "grade": 2
          },
          {
            "abbr": "Lach",
            "grade": 3
          },
          {
            "abbr": "led",
            "grade": 1
          },
          {
            "abbr": "lyc",
            "grade": 2
          },
          {
            "abbr": "lyss",
            "grade": 1
          },
          {
            "abbr": "mag-c",
            "grade": 2
          },
          {
            "abbr": "manc",
            "grade": 1
          },
          {
            "abbr": "mang",
            "grade": 1
          },
          {
            "abbr": "merc",
            "grade": 2
          },
          {
            "abbr": "Mez",
            "grade": 3
          },
          {
            "abbr": "mosch",
            "grade": 2
          },
          {
            "abbr": "nat-c",
            "grade": 1
          },
          {
            "abbr": "Nat-m",
            "grade": 3
          },
          {
            "abbr": "nat-p",
            "grade": 1
          },
          {
            "abbr": "nit-ac",
            "grade": 1
          },
          {
            "abbr": "Nux-m",
            "grade": 3
          },
          {
            "abbr": "nux-v",
            "grade": 2
          },
          {
            "abbr": "olnd",
            "grade": 2
          },
          {
            "abbr": "onos",
            "grade": 2
          },
          {
            "abbr": "op",
            "grade": 2
          },
          {
            "abbr": "petr",
            "grade": 2
          },
          {
            "abbr": "ph-ac",
            "grade": 2
          },
          {
            "abbr": "phos",
            "grade": 2
          },
          {
            "abbr": "Plat",
            "grade": 3
          },
          {
            "abbr": "plb",
            "grade": 2
          },
          {
            "abbr": "Puls",
            "grade": 3
          },
          {
            "abbr": "rhod",
            "grade": 1
          },
          {
            "abbr": "rhus-t",
            "grade": 2
          },
          {
            "abbr": "rhus-v",
            "grade": 1
          },
          {
            "abbr": "sars",
            "grade": 1
          },
          {
            "abbr": "Sep",
            "grade": 3
          },
          {
            "abbr": "sil",
            "grade": 2
          },
          {
            "abbr": "spong",
            "grade": 1
          },
          {
            "abbr": "stann",
            "grade": 1
          },
          {
            "abbr": "stram",
            "grade": 1
          },
          {
            "abbr": "sul-ac",
            "grade": 1
          },
          {
            "abbr": "sulph",
            "grade": 2
          },
          {
            "abbr": "tarent",
            "grade": 1
          },
          {
            "abbr": "thuj",
            "grade": 1
          },
          {
            "abbr": "Verat",
            "grade": 3
          },
          {
            "abbr": "verb",
            "grade": 1
          },
          {
            "abbr": "viol-o",
            "grade": 1
          },
          {
            "abbr": "viol-t",
            "grade": 1
          },
          {
            "abbr": "zinc",
            "grade": 1
          }
        ],
        "meaning": "[KR,RbMean,-Absentmindedness simply means having or showing forgetful or inattentive behaviour.]",
        "notes": [
          {
            "type": "system",
            "text": "[KR,Whntouse, -It may not be clearly evident in Case taking if patient is well aware of his speech and actions or in compensated cases. Hence it is best to understand the absentmindedness from examples given by patient about daily life to life activities or examples from relatives.]"
          },
          {
            "type": "system",
            "text": "[KR,WhntoUseMetaphor, - Absentmindedness is often a picture of someone who is lost in thought or is away from the present moment. any act showing patient is occupied in something else rather than the current conversation or the present moment, shall be a guide to take this rubric for analysis]"
          }
        ],
        "crossReferences": [
          {
            "chapter": "Mind",
            "rubric": "Mind; FORGETFUL (154) : "
          }
        ]
      },
      {
        "id": "absent-minded;-morning--:",
        "name": "ABSENT-MINDED; morning  :",
        "remedies": [
          {
            "abbr": "guai",
            "grade": 1
          },
          {
            "abbr": "nat-c",
            "grade": 1
          },
          {
            "abbr": "ph-ac",
            "grade": 1
          },
          {
            "abbr": "phos",
            "grade": 1
          }
        ],
        "meaning": "[KR,RbMean,-Absentmindedness simply means having or showing forgetful or inattentive behaviour.]",
        "notes": []
      },
      {
        "id": "absent-minded;-11-a.m.-to-4-p.m.--:",
        "name": "ABSENT-MINDED; 11 a.m. to 4 p.m.  :",
        "remedies": [
          {
            "abbr": "kali-n",
            "grade": 1
          }
        ],
        "meaning": "[KR,RbMean,-Absentmindedness simply means having or showing forgetful or inattentive behaviour.]",
        "notes": []
      },
      {
        "id": "absent-minded;-noon--:",
        "name": "ABSENT-MINDED; noon  :",
        "remedies": [
          {
            "abbr": "mosch",
            "grade": 1
          }
        ],
        "meaning": "[KR,RbMean,-Absentmindedness simply means having or showing forgetful or inattentive behaviour.]",
        "notes": []
      },
      {
        "id": "absent-minded;-menses,-during--:",
        "name": "ABSENT-MINDED; menses, during  :",
        "remedies": [
          {
            "abbr": "calc",
            "grade": 1
          }
        ],
        "meaning": "[KR,RbMean,-Absentmindedness simply means having or showing forgetful or inattentive behaviour.]",
        "notes": []
      },
      {
        "id": "absent-minded;-periodical-attacks-of,-short-lasting--:",
        "name": "ABSENT-MINDED; periodical attacks of, short lasting  :",
        "remedies": [
          {
            "abbr": "fl-ac",
            "grade": 1
          },
          {
            "abbr": "nux-m",
            "grade": 2
          }
        ],
        "meaning": "[KR,RbMean,-Absentmindedness simply means having or showing forgetful or inattentive behaviour.]",
        "notes": []
      },
      {
        "id": "absent-minded;-reading,-while--:",
        "name": "ABSENT-MINDED; reading, while  :",
        "remedies": [
          {
            "abbr": "agn",
            "grade": 1
          },
          {
            "abbr": "lach",
            "grade": 1
          },
          {
            "abbr": "nux-m",
            "grade": 2
          },
          {
            "abbr": "ph-ac",
            "grade": 1
          }
        ],
        "meaning": "[KR,RbMean,-Absentmindedness simply means having or showing forgetful or inattentive behaviour.]",
        "notes": []
      },
      {
        "id": "absent-minded;-starts-when-spoken-to--:",
        "name": "ABSENT-MINDED; starts when spoken to  :",
        "remedies": [
          {
            "abbr": "carb-ac",
            "grade": 1
          }
        ],
        "meaning": "[KR,RbMean,-Absentmindedness simply means having or showing forgetful or inattentive behaviour.]",
        "notes": []
      },
      {
        "id": "absent-minded;-writing,-while--:",
        "name": "ABSENT-MINDED; writing, while  :",
        "remedies": [
          {
            "abbr": "mag-c",
            "grade": 1
          }
        ],
        "meaning": "[KR,RbMean,-Absentmindedness simply means having or showing forgetful or inattentive behaviour.]",
        "notes": []
      },
      {
        "id": "absorbed--:",
        "name": "ABSORBED  :",
        "remedies": [
          {
            "abbr": "acon",
            "grade": 1
          },
          {
            "abbr": "am-m",
            "grade": 1
          },
          {
            "abbr": "ant-c",
            "grade": 1
          },
          {
            "abbr": "arn",
            "grade": 2
          },
          {
            "abbr": "bell",
            "grade": 1
          },
          {
            "abbr": "bov",
            "grade": 1
          },
          {
            "abbr": "calc",
            "grade": 1
          },
          {
            "abbr": "cann-i",
            "grade": 1
          },
          {
            "abbr": "canth",
            "grade": 1
          },
          {
            "abbr": "caps",
            "grade": 2
          },
          {
            "abbr": "carl",
            "grade": 2
          },
          {
            "abbr": "caust",
            "grade": 1
          },
          {
            "abbr": "cham",
            "grade": 1
          },
          {
            "abbr": "chin",
            "grade": 1
          },
          {
            "abbr": "cic",
            "grade": 1
          },
          {
            "abbr": "clem",
            "grade": 1
          },
          {
            "abbr": "cocc",
            "grade": 2
          },
          {
            "abbr": "con",
            "grade": 1
          },
          {
            "abbr": "cupr",
            "grade": 1
          },
          {
            "abbr": "cycl",
            "grade": 1
          },
          {
            "abbr": "grat",
            "grade": 1
          },
          {
            "abbr": "ham",
            "grade": 1
          },
          {
            "abbr": "Hell",
            "grade": 3
          },
          {
            "abbr": "ign",
            "grade": 1
          },
          {
            "abbr": "ip",
            "grade": 1
          },
          {
            "abbr": "lil-t",
            "grade": 1
          },
          {
            "abbr": "mang",
            "grade": 1
          },
          {
            "abbr": "merc",
            "grade": 1
          },
          {
            "abbr": "Mez",
            "grade": 3
          },
          {
            "abbr": "mosch",
            "grade": 1
          },
          {
            "abbr": "mur-ac",
            "grade": 1
          },
          {
            "abbr": "nat-c",
            "grade": 1
          },
          {
            "abbr": "nat-m",
            "grade": 2
          },
          {
            "abbr": "nat-p",
            "grade": 1
          },
          {
            "abbr": "nit-ac",
            "grade": 1
          },
          {
            "abbr": "Nux-m",
            "grade": 3
          },
          {
            "abbr": "ol-an",
            "grade": 1
          },
          {
            "abbr": "onos",
            "grade": 2
          },
          {
            "abbr": "op",
            "grade": 2
          },
          {
            "abbr": "phel",
            "grade": 1
          },
          {
            "abbr": "phos",
            "grade": 1
          },
          {
            "abbr": "puls",
            "grade": 2
          },
          {
            "abbr": "sabad",
            "grade": 1
          },
          {
            "abbr": "sars",
            "grade": 1
          },
          {
            "abbr": "spig",
            "grade": 1
          },
          {
            "abbr": "stann",
            "grade": 1
          },
          {
            "abbr": "stram",
            "grade": 1
          },
          {
            "abbr": "Sulph",
            "grade": 3
          }
        ],
        "meaning": "[KR,RbMean,-Absorbed means something or someone that is taking the attention totally]",
        "notes": [
          {
            "type": "system",
            "text": "You can use this rubric in all patients who have been described in patient versions by us. And also in cases of Functional cases of Psychiatric illnesses especially Personality Disorders and Brain injuries."
          }
        ],
        "crossReferences": [
          {
            "chapter": "Mind",
            "rubric": "Mind; FANCIES (0):"
          }
        ]
      },
      {
        "id": "absorbed;-daytime--:",
        "name": "ABSORBED; daytime  :",
        "remedies": [],
        "meaning": "[KR,RbMean,-Absorbed means something or someone that is taking the attention totally]",
        "notes": []
      },
      {
        "id": "absorbed;-morning--:",
        "name": "ABSORBED; morning  :",
        "remedies": [
          {
            "abbr": "nat-c",
            "grade": 2
          },
          {
            "abbr": "nux-v",
            "grade": 1
          }
        ],
        "meaning": "[KR,RbMean,-Absorbed means something or someone that is taking the attention totally]",
        "notes": []
      },
      {
        "id": "absorbed;-afternoon--:",
        "name": "ABSORBED; afternoon  :",
        "remedies": [
          {
            "abbr": "mang",
            "grade": 1
          }
        ],
        "meaning": "[KR,RbMean,-Absorbed means something or someone that is taking the attention totally]",
        "notes": []
      },
      {
        "id": "absorbed;-evening--:",
        "name": "ABSORBED; evening  :",
        "remedies": [
          {
            "abbr": "am-m",
            "grade": 1
          }
        ],
        "meaning": "[KR,RbMean,-Absorbed means something or someone that is taking the attention totally]",
        "notes": []
      },
      {
        "id": "absorbed;-alternating,-with-frivolity--:",
        "name": "ABSORBED; alternating, with frivolity  :",
        "remedies": [
          {
            "abbr": "arg-n",
            "grade": 1
          }
        ],
        "meaning": "[KR,RbMean,-Absorbed means something or someone that is taking the attention totally, Frivolity means taking for granted or not serious in doing something]",
        "notes": []
      },
      {
        "id": "absorbed;-as-to-what-would-become-of-him--:",
        "name": "ABSORBED; as to what would become of him  :",
        "remedies": [
          {
            "abbr": "nat-m",
            "grade": 1
          }
        ],
        "meaning": "[KR,RbMean,-Absorbed means something or someone that is taking the attention totally]",
        "notes": []
      },
      {
        "id": "absorbed;-eating,-after--:",
        "name": "ABSORBED; eating, after  :",
        "remedies": [],
        "meaning": "[KR,RbMean,-Absorbed means something or someone that is taking the attention totally]",
        "notes": []
      },
      {
        "id": "absorbed;-menses,-during--:",
        "name": "ABSORBED; menses, during  :",
        "remedies": [
          {
            "abbr": "mur-ac",
            "grade": 1
          }
        ],
        "meaning": "[KR,RbMean,-Absorbed means something or someone that is taking the attention totally]",
        "notes": []
      },],
    },
  ],
}

export const CLINICAL_REPERTORY: KentRepertory = {
  bookName: "Clinical",
  chapters: [
    {
      id: "clinical-abdomen",
      name: "Clinical – Abdomen & Abscess",
      icon: "⚕️",
      description: "Clinical rubrics from Clarke and Boericke for abdomen and abscess",
      rubrics: [
        {
          id: "abdomen-coldness-in-clarke",
          name: "Abdomen; Coldness in (Clarke)",
          remedies: [
            { abbr: "testing", grade: 3 },
            { abbr: "phel.", grade: 1 },
            { abbr: "plect.", grade: 1 },
          ],
          meaning: "Testing",
          notes: [
            { type: "system", source: "HCP", text: "Testing" },
            { type: "system", source: "HCP", text: "IX to do" },
            { type: "system", source: "Clarke", text: "TESTING" },
          ],
          crossReferences: [],
        },
        {
          id: "abdomen-coldness-in-boericke",
          name: "Abdomen; Coldness in (Boericke)",
          remedies: [
            { abbr: "aeth.", grade: 1 },
            { abbr: "ambr.", grade: 1 },
            { abbr: "bar-c.", grade: 1 },
            { abbr: "cadm-s.", grade: 1 },
            { abbr: "chin.", grade: 1 },
            { abbr: "colch.", grade: 1 },
            { abbr: "dulc.", grade: 1 },
            { abbr: "kali-br.", grade: 1 },
            { abbr: "kali-c.", grade: 1 },
            { abbr: "kali-s.", grade: 1 },
            { abbr: "meny.", grade: 1 },
            { abbr: "onos.", grade: 1 },
            { abbr: "phos.", grade: 1 },
            { abbr: "sil.", grade: 1 },
            { abbr: "staph.", grade: 1 },
            { abbr: "tab.", grade: 1 },
            { abbr: "verat.", grade: 1 },
          ],
          meaning: "Testing",
          notes: [
            { type: "system", source: "HCP", text: "Testing" },
            { type: "system", source: "HCP", text: "IX to do" },
            { type: "system", source: "Boericke", text: "TESTING" },
          ],
          crossReferences: [],
        },
        {
          id: "abdomen-distended-clarke",
          name: "Abdomen; Distended (Clarke)",
          remedies: [
            { abbr: "calc.", grade: 1 },
            { abbr: "dios.", grade: 1 },
            { abbr: "cin.", grade: 1 },
            { abbr: "ign.", grade: 1 },
            { abbr: "lyc.", grade: 1 },
            { abbr: "sil.", grade: 1 },
            { abbr: "thuj.", grade: 1 },
          ],
          meaning: "Testing",
          notes: [
            { type: "system", source: "HCP", text: "Testing" },
            { type: "system", source: "HCP", text: "Testing" },
          ],
          crossReferences: [],
        },
        {
          id: "abdomen-distended-boericke",
          name: "Abdomen; Distended (Boericke)",
          remedies: [
            { abbr: "abies-c.", grade: 1 },
            { abbr: "abrot.", grade: 1 },
            { abbr: "acal.", grade: 1 },
            { abbr: "act-sp.", grade: 1 },
            { abbr: "agar.", grade: 1 },
            { abbr: "ambr.", grade: 1 },
            { abbr: "anthro.", grade: 1 },
            { abbr: "aran.", grade: 1 },
            { abbr: "arg-n.", grade: 1 },
            { abbr: "arn.", grade: 1 },
            { abbr: "bapt.", grade: 1 },
            { abbr: "bar-c.", grade: 1 },
            { abbr: "bell.", grade: 1 },
            { abbr: "brom.", grade: 1 },
            { abbr: "caj.", grade: 1 },
            { abbr: "calc.", grade: 1 },
            { abbr: "cann-i.", grade: 1 },
            { abbr: "carb-ac.", grade: 1 },
            { abbr: "carb-v.", grade: 1 },
            { abbr: "carb-s.", grade: 1 },
            { abbr: "cham.", grade: 1 },
            { abbr: "chel.", grade: 1 },
            { abbr: "chin.", grade: 1 },
            { abbr: "cic.", grade: 1 },
            { abbr: "coca", grade: 1 },
            { abbr: "cocc.", grade: 1 },
            { abbr: "colch.", grade: 1 },
            { abbr: "coloc.", grade: 1 },
            { abbr: "corn.", grade: 1 },
            { abbr: "crot-h.", grade: 1 },
            { abbr: "gamb.", grade: 1 },
            { abbr: "hedeom.", grade: 1 },
            { abbr: "hep.", grade: 1 },
            { abbr: "hyos.", grade: 1 },
            { abbr: "iodof.", grade: 1 },
            { abbr: "jal.", grade: 1 },
            { abbr: "jatr.", grade: 1 },
            { abbr: "jug-r.", grade: 1 },
            { abbr: "kali-c.", grade: 1 },
            { abbr: "kreos.", grade: 1 },
            { abbr: "lil-t.", grade: 1 },
            { abbr: "meny.", grade: 1 },
            { abbr: "merc.", grade: 1 },
            { abbr: "morph.", grade: 1 },
            { abbr: "mosch.", grade: 1 },
            { abbr: "nat-m.", grade: 1 },
            { abbr: "nat-n.", grade: 1 },
            { abbr: "nux-m.", grade: 1 },
            { abbr: "nux-v.", grade: 1 },
            { abbr: "onos.", grade: 1 },
            { abbr: "ph-ac.", grade: 1 },
            { abbr: "podo.", grade: 1 },
            { abbr: "puls.", grade: 1 },
            { abbr: "raph.", grade: 1 },
            { abbr: "rhus-t.", grade: 1 },
            { abbr: "sabin.", grade: 1 },
            { abbr: "scut.", grade: 1 },
            { abbr: "sil.", grade: 1 },
            { abbr: "sumb.", grade: 1 },
            { abbr: "tab.", grade: 1 },
            { abbr: "ter.", grade: 1 },
            { abbr: "thuj.", grade: 1 },
            { abbr: "zinc.", grade: 1 },
          ],
          meaning:
            "Distended abdomen can result from various factors, including gas accumulation, fluid retention, digestive disorders, and more serious medical conditions.",
          notes: [
            { type: "system", source: "HCP", text: "Testing" },
          ],
          crossReferences: [],
        },
        {
          id: "abdomen-large-clarke",
          name: "Abdomen; Large (Clarke)",
          remedies: [{ abbr: "calc.", grade: 1 }],
          meaning: "Testing",
          notes: [{ type: "system", source: "HCP", text: "Testing" }],
          crossReferences: [],
        },
        {
          id: "abdomen-large-boericke",
          name: "Abdomen; Large (Boericke)",
          remedies: [
            { abbr: "mez.", grade: 1 },
            { abbr: "phos.", grade: 1 },
            { abbr: "urt-u.", grade: 1 },
          ],
          meaning: "Testing",
          notes: [{ type: "system", source: "HCP", text: "Testing" }],
          crossReferences: [],
        },
        {
          id: "abdomen-operations-on-vomiting-after",
          name: "Abdomen; Operations on, vomiting after",
          remedies: [
            { abbr: "all-c.", grade: 1 },
            { abbr: "bism.", grade: 1 },
          ],
          meaning: "Testing",
          notes: [{ type: "system", source: "HCP", text: "Testing" }],
          crossReferences: [],
        },
        {
          id: "abdomen-plethora-of-clarke",
          name: "Abdomen; Plethora of (Clarke)",
          remedies: [{ abbr: "aloe.", grade: 1 }],
          meaning: "Testing",
          notes: [{ type: "system", source: "HCP", text: "Testing" }],
          crossReferences: [],
        },
        {
          id: "abdomen-plethora-of-boericke",
          name: "Abdomen; Plethora of (Boericke)",
          remedies: [{ abbr: "sulph.", grade: 1 }],
          meaning: "Testing",
          notes: [{ type: "system", source: "HCP", text: "Testing" }],
          crossReferences: [],
        },
        {
          id: "abdomen-swelling-of-clarke",
          name: "Abdomen; Swelling of (Clarke)",
          remedies: [{ abbr: "paraf.", grade: 1 }],
          meaning: "Dropsical swelling of abdomen (ascites).",
          notes: [{ type: "system", source: "HCP", text: "Testing" }],
          crossReferences: [],
        },
        {
          id: "abscess-clarke",
          name: "Abscess (Clarke)",
          remedies: [
            { abbr: "anan.", grade: 1 },
            { abbr: "apis.", grade: 1 },
            { abbr: "arn.", grade: 1 },
            { abbr: "ars.", grade: 1 },
            { abbr: "bell.", grade: 1 },
            { abbr: "calc-s.", grade: 1 },
            { abbr: "calen.", grade: 1 },
            { abbr: "chin.", grade: 1 },
            { abbr: "elat.", grade: 1 },
            { abbr: "fl-ac.", grade: 1 },
            { abbr: "guai.", grade: 1 },
            { abbr: "hep.", grade: 1 },
            { abbr: "hippoz.", grade: 1 },
            { abbr: "merc.", grade: 1 },
            { abbr: "nat-sal.", grade: 1 },
            { abbr: "pyrog.", grade: 1 },
            { abbr: "sil.", grade: 1 },
            { abbr: "symph.", grade: 1 },
            { abbr: "syph.", grade: 1 },
            { abbr: "thyr.", grade: 1 },
          ],
          meaning: "Testing",
          notes: [
            {
              type: "system",
              source: "Clarke",
              text:
                "Detailed clinical instructions for abscess and suppuration management; see Clarke's text for dosing and local applications.",
            },
          ],
          crossReferences: [],
        },
      ],
    },
  ],
}


// Unified library of all books for navigation
REPERTORY_BOOKS.push(KENT_REPERTORY, CLINICAL_REPERTORY)

export function getRemedyFullName(
  abbr: string,
  name?: string
): string {
  const cleanAbbr = abbr.toLowerCase().trim();
  const remedies = REMEDY_DICTIONARY[cleanAbbr];

  if (!remedies || remedies.length === 0) {
    return abbr;
  }

  // If name is provided, try to find a matching remedy
  if (name) {
    const match = remedies.find(
      r => r.name.toLowerCase() === name.toLowerCase()
    );
    return match?.description ?? remedies[0].description;
  }

  // Default: return first remedy name
  return remedies[0].description
}


export function formatRemedy(remedy: Remedy): string {
  const prefix = remedy.grade > 1 ? remedy.grade : ""
  return `${prefix}${remedy.abbr}`
}
