export type Remedy = {
  abbr: string
  grade: number
}

export type Note = {
  type: string
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
  bookName: "Kent Repertory",
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
        "meaning": "[Sudden & Unexpected Behaviour of the patient]",
        "notes": [
          {
            "type": "When to USE",
            "text": "[You can observe the behaviour of the patient when entering the clinic or while case taking to take this rubric for repertorisation.The behaviour of the patient is very sudden or harsh.Example - banging the door, coming inside the clinic and suddenly starting to tell about his complaints without any background of himself]"
          },
          {
            "type": "WHEN TO USE METAPHORICALLY",
            "text": "[Abruptness indicates a sudden shift in behaviour or act or break in continuity of talk or action implying taking this rubric in analysis] "
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
        "meaning": "[Absentmindedness simply means having or showing forgetful or inattentive behaviour.]",
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

export const Homeosetu_Clinical_Repertory: KentRepertory = {
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
          remedies: [{ abbr: "hep", grade: 1 }],
          notes: []
        },
        {
          id: "brights-disease",
          name: "Brights Disease",
          remedies: [{ abbr: "Kali-br", grade: 1 }],
          notes: []
        },
        {
          id: "conjunctivitis",
          name: "Conjunctivitis",
          remedies: [{ abbr: "Ham", grade: 1 }],
          notes: []
        },
        {
          id: "cholera",
          name: "Cholera",
          remedies: [{ abbr: "Bism", grade: 1 }],
          notes: []
        },
        {
          id: "chlorosis",
          name: "Chlorosis",
          remedies: [{ abbr: "ferr", grade: 1 }],
          notes: []
        },
        {
          id: "croup",
          name: "Croup",
          remedies: [
            { abbr: "acon", grade: 1 },
            { abbr: "iod", grade: 1 }
          ],
          notes: []
        },
        {
          id: "croup-membranous",
          name: "Croup, membranous",
          remedies: [{ abbr: "iod", grade: 1 }],
          notes: []
        },
        {
          id: "epilepsy",
          name: "Epilepsy",
          remedies: [
            { abbr: "bufo", grade: 1 },
            { abbr: "cimic", grade: 1 },
            { abbr: "Cupr", grade: 1 },
            { abbr: "hyos", grade: 1 }
          ],
          notes: []
        },
        {
          id: "gout",
          name: "Gout",
          remedies: [
            { abbr: "Abrot", grade: 1 },
            { abbr: "Aesc", grade: 1 }
          ],
          notes: []
        },
        {
          id: "haemorrhage-conjunctiva",
          name: "Haemorrhage, Conjunctiva",
          remedies: [{ abbr: "arn", grade: 1 }],
          notes: []
        },
        {
          id: "haemorrhage-retina",
          name: "Haemorrhage, retina",
          remedies: [{ abbr: "arn", grade: 1 }],
          notes: []
        },
        {
          id: "pertussis",
          name: "Pertussis",
          remedies: [{ abbr: "Euphr", grade: 1 }],
          notes: []
        },
        {
          id: "pharyngitis",
          name: "Pharyngitis",
          remedies: [{ abbr: "Aesc", grade: 1 }],
          notes: []
        },
        {
          id: "laryngitis",
          name: "Laryngitis",
          remedies: [{ abbr: "All-c", grade: 1 }],
          notes: []
        },
        {
          id: "lienteria",
          name: "Lienteria",
          remedies: [{ abbr: "Abrot", grade: 1 }],
          notes: []
        },
        {
          id: "rheumatism",
          name: "Rheumatism",
          remedies: [{ abbr: "Abrot", grade: 1 }],
          notes: []
        },
        {
          id: "tonsillitis",
          name: "Tonsillitis",
          remedies: [{ abbr: "Bar-c", grade: 1 }],
          notes: []
        },
        {
          id: "tuberculosis-chest",
          name: "Tuberculosis, chest",
          remedies: [{ abbr: "dros", grade: 1 }],
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
            { "abbr": "hep", "grade": 1 },
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
            { "abbr": "cina", "grade": 1 },
            { "abbr": "dios", "grade": 1 },
            { "abbr": "fil", "grade": 1 },
            { "abbr": "ign", "grade": 1 },
            { "abbr": "lyc", "grade": 1 },
            { "abbr": "sil", "grade": 1 },
            { "abbr": "thuj", "grade": 1 }
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
              "text": "[ClarkP*,Bell., - Abscess or Suppuration THREATENING:Redness, pain and throbbing...]"
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
              "text": "[ClarkP*, sul-ac., - Acidity. Acid Sulph 3, 4hrly.] [ClarkP*,arg-n., - Acidity With gastralgia...]"
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
              "text": "[ClarkP* , Carb-v., bell., puls., - Acne Simple and recent in young persons...]"
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
              "text": "[ClarkP*, Sulph., - Alcohol Habit: A single dose of Sulph. 30 or 200 every two or three weeks...]"
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
              "text": "[ClarkP*, Nux-v., - Alchoholism CHRONIC : Total abstinence Morning vomiting, tremulousness, Nux. v. 3, 4h.]"
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
              "text": "[ClarkP*, Acon., - Amaurosis:Recent; sudden blindness from cold bathing in hot weather, Aco. 3, 2h.] [ClarkP*, Gels., -Amurosis:Sudden blindness, Gels. 3, 2h.]"
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
              "text": "[ClarkP*, Chin., - Anaemia : From exhausting diseases, discharges, or haemorrhages, China off 3, 4h. Simple iron deficiency anaemias...]"
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
              "text": "[ClarkP*, Bar-c.,lyc., -Aneurism : Failing specific indications, begin in general with Baryta c 3x, gr. v. 8h. If that fails, Lycopodium 6, 4h]"
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
              "text": "[ClarkP*, hydr-ac., - Angina Pectoris: PAROXYSM.-Palpitation, anxiety, small pulse; associated with epilepsy, hydr-ac. 3x, th.] [ClarkP*, glon., - Angina Pectoris:PAROXYSM Violent beating...]"
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
              "text": "[ClarkP*, Aeth., - Anhidrosis : Dry, white, leathery skin, Aeth c 3, 4h.] [ClarkP*, Nat-c., - Anhidrosis :Skin of whole body becomes dry and cracked, Nat c 6, 4h.]"
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
              "text": "[ClarkP*, Ign.,mag-c., - Anxiety, Care, Grief, Worry, EFFECTS OF. (1) Ign. 3, 2h.; (2) Mag-c. 200, 4h.] [ClarkP*,Note.,- Grief. See Anxiety.]"
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
              "text": "[ClarkP*, Chen-a., -Aphasia: Chen anth 30, 4h.] [ClarkP*, Anac., -Aphasia: In paralysis with imbecility...]"
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
              "text": "[ClarkP*, Borx., -Aphthae or Thrush:Simple, in children or adults, Borax, 3x (gr. ii. or gtt. i.), 2h...]"
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
              "text": "[ClarkP*, Nux-v., - Apoplexy, THREATENED : Giddiness, headache, fullness in the head in plethoric subjects...]"
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
              "text": "[ClarkP*, Iris-t., -Appendicitis: Fearful pain in ileo-caecal region, great tenderness to pressure on one spot; deathly sensation in stomachpit...]"
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
              "text": "[ClarkP*, calc., - Appetite Depraved : For salt things, Calc carb 6, 6h. [ClarkP*, Sil., - For cold raw food, Sil. 6, 6h.]"
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
              "text": "[ClarkP*, Phos., Vanad.,Arteries, DISEASES OF. Suspected atheroma, (1) Phos. 3, 6h. (2) Vanad. 6, 6h.]"
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
              "text": "[ClarkP*, Apoc., - Ascites: Whenever the ascites is the principal trouble, if the symptoms indicate no other remedy, Apocy. Q, gtt. i. 3h.]"
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

export const HOMEOSETU_ALLEN: KentRepertory = {
  bookName: "Allen Fever Repertory",
  chapters: [
    {
      "id": "ch_cause",
      "name": "Cause",
      "icon": "",
      "description": "Causes for the clinical condition",
      "rubrics": [
        {
          "id": "cause_1",
          "name": "Air; in open",
          "remedies": [
            { "abbr": "Zinc.", "grade": 1 }
          ],
          "notes": []
        },
        {
          "id": "cause_2",
          "name": "Acids; abse of; or after taking",
          "remedies": [
            { "abbr": "Lach.", "grade": 1 }
          ],
          "notes": []
        },
        {
          "id": "cause_3",
          "name": "Alcohol; abuse of",
          "remedies": [
            { "abbr": "Crot-h.", "grade": 1 },
            { "abbr": "Led.", "grade": 1 },
            { "abbr": "nux-v.", "grade": 2 }
          ],
          "notes": []
        },
        {
          "id": "cause_4",
          "name": "Anger",
          "remedies": [
            { "abbr": "Bry.", "grade": 1 },
            { "abbr": "Cham.", "grade": 1 },
            { "abbr": "Cocc.", "grade": 1 },
            { "abbr": "nux-v.", "grade": 3 }
          ],
          "notes": []
        },
        {
          "id": "cause_5",
          "name": "Animal; heat; want of",
          "remedies": [
            { "abbr": "Led.", "grade": 1 },
            { "abbr": "Teucr.", "grade": 1 },
            { "abbr": "Sep.", "grade": 1 },
            { "abbr": "Sil.", "grade": 1 },
            { "abbr": "Tub.", "grade": 1 }
          ],
          "notes": []
        },
        {
          "id": "cause_6",
          "name": "Animal; heat; want of; tissue; decayed",
          "remedies": [
            { "abbr": "Anthr.", "grade": 1 },
            { "abbr": "Ars.", "grade": 1 },
            { "abbr": "pyrog.", "grade": 1 }
          ],
          "notes": []
        },
        {
          "id": "cause_7",
          "name": "Anthrax",
          "remedies": [
            { "abbr": "Anthr.", "grade": 1 },
            { "abbr": "Ars.", "grade": 1 },
            { "abbr": "Carb-ac.", "grade": 1 },
            { "abbr": "Crot-h.", "grade": 1 },
            { "abbr": "Lach.", "grade": 1 },
            { "abbr": "pyrog.", "grade": 1 }
          ],
          "notes": []
        },
        {
          "id": "cause_8",
          "name": "Anxiety",
          "remedies": [
            { "abbr": "Ars.", "grade": 1 },
            { "abbr": "Gels.", "grade": 2 }
          ],
          "notes": []
        },
        {
          "id": "cause_9",
          "name": "Arsenic; abuse of",
          "remedies": [
            { "abbr": "Ip.", "grade": 2 }
          ],
          "notes": []
        },
        {
          "id": "cause_10",
          "name": "Choleraic; occuring during cholera epidemics",
          "remedies": [
            { "abbr": "Elat.", "grade": 1 },
            { "abbr": "Verat.", "grade": 1 }
          ],
          "notes": []
        },
        {
          "id": "cause_11",
          "name": "Coffee; abuse of",
          "remedies": [
            { "abbr": "Cham.", "grade": 1 },
            { "abbr": "nux-v.", "grade": 1 }
          ],
          "notes": []
        },
        {
          "id": "cause_12",
          "name": "Diet; indiscretions in",
          "remedies": [
            { "abbr": "Ant-c.", "grade": 1 },
            { "abbr": "Cycl.", "grade": 1 },
            { "abbr": "Ip.", "grade": 2 },
            { "abbr": "Puls.", "grade": 1 }
          ],
          "notes": []
        },
        {
          "id": "cause_13",
          "name": "Diet; indiscretions in; may produce relapse",
          "remedies": [
            { "abbr": "Ant-c.", "grade": 1 },
            { "abbr": "Ip.", "grade": 2 }
          ],
          "notes": []
        },
        {
          "id": "cause_14",
          "name": "Diet; indiscretions in; eating pork; rich fat food",
          "remedies": [
            { "abbr": "Puls.", "grade": 1 }
          ],
          "notes": []
        },
        {
          "id": "cause_15",
          "name": "Diet; indiscretions in; eating pastry; sweets",
          "remedies": [
            { "abbr": "Cina.", "grade": 1 },
            { "abbr": "Ip.", "grade": 1 }
          ],
          "notes": []
        },
        {
          "id": "cause_16",
          "name": "Diet; indiscretons in eating late suppers; irregular; unseasonal",
          "remedies": [
            { "abbr": "nux-v.", "grade": 2 }
          ],
          "notes": []
        },
        {
          "id": "cause_17",
          "name": "Dissecting wounds",
          "remedies": [
            { "abbr": "Anthr.", "grade": 2 },
            { "abbr": "Ars.", "grade": 3 },
            { "abbr": "Carb-ac.", "grade": 1 },
            { "abbr": "Lach.", "grade": 3 },
            { "abbr": "pyrog.", "grade": 3 }
          ],
          "notes": []
        },
        {
          "id": "cause_18",
          "name": "Drinking; after",
          "remedies": [
            { "abbr": "Ars.", "grade": 1 },
            { "abbr": "Asar.", "grade": 1 }
          ],
          "notes": []
        },
        {
          "id": "cause_19",
          "name": "Eating; after",
          "remedies": [
            { "abbr": "Ars.", "grade": 1 },
            { "abbr": "Asar.", "grade": 1 },
            { "abbr": "Bell.", "grade": 1 },
            { "abbr": "Carb-an.", "grade": 1 },
            { "abbr": "Kali-c.", "grade": 1 },
            { "abbr": "Nux-v.", "grade": 1 },
            { "abbr": "Tarax.", "grade": 1 }
          ],
          "notes": []
        },
        {
          "id": "cause_20",
          "name": "Eating; after; and drinking",
          "remedies": [
            { "abbr": "Asar.", "grade": 1 },
            { "abbr": "Tarax.", "grade": 1 }
          ],
          "notes": []
        }
      ]
    },
    {
      "id": "ch_prodrome",
      "name": "Prodrome",
      "icon": "",
      "description": "Symptoms occurring before the main fever stage",
      "rubrics": [
        {
          "id": "prod_1",
          "name": "Abdomen; distention of",
          "remedies": [
            { "abbr": "Ars-h.", "grade": 1 }
          ],
          "notes": []
        },
        {
          "id": "prod_2",
          "name": "Anguish",
          "remedies": [
            { "abbr": "Chin.", "grade": 1 }
          ],
          "notes": []
        },
        {
          "id": "prod_3",
          "name": "Anticipation of any unusual ordeal may hasten chill",
          "remedies": [
            { "abbr": "Gels.", "grade": 1 }
          ],
          "notes": []
        },
        {
          "id": "prod_4",
          "name": "Anxiety",
          "remedies": [
            { "abbr": "Ars.", "grade": 1 },
            { "abbr": "Ars-h.", "grade": 1 },
            { "abbr": "Chin.", "grade": 1 }
          ],
          "notes": []
        },
        {
          "id": "prod_5",
          "name": "Appetite; loss of",
          "remedies": [
            { "abbr": "Hydr.", "grade": 1 }
          ],
          "notes": []
        },
        {
          "id": "prod_6",
          "name": "Back; aching in",
          "remedies": [
            { "abbr": "Aran.", "grade": 1 },
            { "abbr": "Carb-v.", "grade": 1 },
            { "abbr": "Eup-per.", "grade": 2 },
            { "abbr": "Ip.", "grade": 1 },
            { "abbr": "Podo.", "grade": 1 },
            { "abbr": "Rhus-t.", "grade": 1 }
          ],
          "notes": []
        },
        {
          "id": "prod_7",
          "name": "Back; pain in; above right ilium",
          "remedies": [
            { "abbr": "Eup-per.", "grade": 1 }
          ],
          "notes": []
        },
        {
          "id": "prod_8",
          "name": "Back; pain severe in lumbar region",
          "remedies": [
            { "abbr": "Aesc.", "grade": 2 },
            { "abbr": "Podo.", "grade": 1 }
          ],
          "notes": []
        },
        {
          "id": "prod_9",
          "name": "Back; pain in lumbar region",
          "remedies": [
            { "abbr": "Lac. c.", "grade": 1 }
          ],
          "notes": []
        },
        {
          "id": "prod_10",
          "name": "Bilious; symptoms strongly marked",
          "remedies": [
            { "abbr": "Podo.", "grade": 3 }
          ],
          "notes": []
        },
        {
          "id": "prod_11",
          "name": "Bones; pain in",
          "remedies": [
            { "abbr": "Chin.", "grade": 1 },
            { "abbr": "Eup-per.", "grade": 2 },
            { "abbr": "Eup-per.ur.", "grade": 1 },
            { "abbr": "nat-m.", "grade": 1 }
          ],
          "notes": []
        },
        {
          "id": "prod_12",
          "name": "Bones; pain in; of extremities",
          "remedies": [
            { "abbr": "Eup-per.", "grade": 1 }
          ],
          "notes": []
        },
        {
          "id": "prod_13",
          "name": "Bones; pains in; of extremities; as if broken",
          "remedies": [
            { "abbr": "Eup-per.", "grade": 3 },
            { "abbr": "Tub.", "grade": 1 }
          ],
          "notes": []
        },
        {
          "id": "prod_14",
          "name": "Bowels; pain in",
          "remedies": [
            { "abbr": "Ars.", "grade": 1 },
            { "abbr": "Elat.", "grade": 1 },
            { "abbr": "Eup-per.", "grade": 1 }
          ],
          "notes": []
        },
        {
          "id": "prod_15",
          "name": "Bowels; pain in; cutting like knifes",
          "remedies": [
            { "abbr": "Ars.", "grade": 1 }
          ],
          "notes": []
        },
        {
          "id": "prod_16",
          "name": "Chest; pain in",
          "remedies": [
            { "abbr": "Ars.", "grade": 1 },
            { "abbr": "Plant.", "grade": 1 }
          ],
          "notes": []
        },
        {
          "id": "prod_17",
          "name": "Chest; pain in; cutting",
          "remedies": [
            { "abbr": "Ars.", "grade": 1 }
          ],
          "notes": []
        },
        {
          "id": "prod_18",
          "name": "Chest; pain in; erratic",
          "remedies": [
            { "abbr": "Plant.", "grade": 1 }
          ],
          "notes": []
        },
        {
          "id": "prod_19",
          "name": "Chest; oppression of",
          "remedies": [
            { "abbr": "Ars-h.", "grade": 1 }
          ],
          "notes": []
        },
        {
          "id": "prod_20",
          "name": "Chilliness",
          "remedies": [
            { "abbr": "Elat.", "grade": 1 },
            { "abbr": "thuj.", "grade": 1 }
          ],
          "notes": []
        }
      ]


    }
  ]
}

export const Allen_Fever_Repertory: KentRepertory = {
  "bookName": "Homeosetu Bowel Nosode repertory",
  "chapters": [
    {
      "id": "bn_a_to_z",
      "name": "A to Z",
      "icon": "",
      "description": "Alphabetical listing of bowel nosode rubrics",
      "rubrics": [
        {
          "id": "r-1",
          "name": "Homeosetu Bowel Nosode Repertory,Age Suited ,Children",
          "remedies": [{ "abbr": "Bac-Syco", "grade": 1 }],
          "notes": []
        },
        {
          "id": "r-2",
          "name": "Homeosetu Bowel Nosode Repertory,Age Suited ,Adolescents",
          "remedies": [{ "abbr": "Bac-Prot", "grade": 1 }],
          "notes": []
        },
        {
          "id": "r-3",
          "name": "Homeosetu Bowel Nosode Repertory,Age Suited ,Adults",
          "remedies": [{ "abbr": "Bac-Prot", "grade": 1 }],
          "notes": []
        },
        {
          "id": "r-4",
          "name": "Homeosetu Bowel Nosode Repertory,Age Suited ,Infants",
          "remedies": [
            { "abbr": "Bac-Gaert", "grade": 1 },
            { "abbr": "Bac-Morg", "grade": 1 }
          ],
          "notes": []
        },
        {
          "id": "r-5",
          "name": "Homeosetu Bowel Nosode Repertory,Age Suited ,Preschool Children",
          "remedies": [
            { "abbr": "Bac-Gaert", "grade": 1 },
            { "abbr": "Bac-Morg", "grade": 1 }
          ],
          "notes": []
        },
        {
          "id": "r-6",
          "name": "Homeosetu Bowel Nosode Repertory,Age Suited ,Women",
          "remedies": [{ "abbr": "Bac-Faec", "grade": 1 }],
          "notes": []
        },
        {
          "id": "r-7",
          "name": "Back, Pain, standing Long",
          "remedies": [{ "abbr": "Bac-sev", "grade": 1 }],
          "notes": []
        },
        {
          "id": "r-8",
          "name": "Children, Adenoids",
          "remedies": [{ "abbr": "Bac-syco", "grade": 1 }],
          "notes": []
        },
        {
          "id": "r-9",
          "name": "Children, Headache, Chronic",
          "remedies": [{ "abbr": "Bac-Syco", "grade": 1 }],
          "notes": []
        },
        {
          "id": "r-10",
          "name": "Children, Headache, Persistent",
          "remedies": [{ "abbr": "Bac-Syco", "grade": 1 }],
          "notes": []
        },
        {
          "id": "r-11",
          "name": "Children, Headache, meningitis tubercular from",
          "remedies": [{ "abbr": "Bac-Syco", "grade": 1 }],
          "notes": []
        },
        {
          "id": "r-12",
          "name": "Children, Gastroenterities",
          "remedies": [{ "abbr": "Bac-Syco", "grade": 1 }],
          "notes": []
        },
        {
          "id": "r-13",
          "name": "Children, Gastroenterities,Acute",
          "remedies": [{ "abbr": "Bac-Syco", "grade": 1 }],
          "notes": []
        },
        {
          "id": "r-14",
          "name": "Children, Gastroenterities,Chronic",
          "remedies": [{ "abbr": "Bac-Syco", "grade": 1 }],
          "notes": []
        },
        {
          "id": "r-15",
          "name": "Children, Tonsillitis",
          "remedies": [{ "abbr": "Bac-syco", "grade": 1 }],
          "notes": []
        },
        {
          "id": "r-16",
          "name": "Circulation, Pulse, Slow",
          "remedies": [{ "abbr": "Bac-sev", "grade": 1 }],
          "notes": []
        },
        {
          "id": "r-17",
          "name": "Circulation, Angina Attacks",
          "remedies": [{ "abbr": "Bac-Prot", "grade": 1 }],
          "notes": [
            {
              "type": "Source symptom",
              "text": "[PatBN*, Bac-Prot., - Further indication for the use of this nosode is disturbance of the peripheral nervous system, evidenced by spasm of the peripheral circulation, e. g. \"dead fingers intermittent claudication in the circulation of the lower limbs ; anginal attacks due to spasm of the coronary capillaries.]"
            }
          ]
        },
        {
          "id": "r-18",
          "name": "Circulation, Palpitation",
          "remedies": [{ "abbr": "Bac-Dys", "grade": 1 }],
          "notes": []
        },
        {
          "id": "r-19",
          "name": "Circulation, Palpitation,Events Before",
          "remedies": [{ "abbr": "Bac-Dys", "grade": 1 }],
          "notes": []
        },
        {
          "id": "r-20",
          "name": "Circulation, Palpitation,Anxiety anticipatory",
          "remedies": [{ "abbr": "Bac-Dys", "grade": 1 }],
          "notes": []
        },
        {
          "id": "r-21",
          "name": "Circulation,Peripheral Disturbed",
          "remedies": [{ "abbr": "Bac-Prot", "grade": 1 }],
          "notes": [
            {
              "type": "Source symptom",
              "text": "[PatBN*, Bac-Prot., - Further indication for the use of this nosode is disturbance of the peripheral nervous system, evidenced by spasm of the peripheral circulation, e. g. \"dead fingers intermittent claudication in the circulation of the lower limbs ; anginal attacks due to spasm of the coronary capillaries.]"
            }
          ]
        },
        {
          "id": "r-22",
          "name": "Circulation, Spasms, Circulation Brain",
          "remedies": [{ "abbr": "Bac-Prot", "grade": 1 }],
          "notes": [
            {
              "type": "Source symptom",
              "text": "[PatBN*, Bac-Prot., - Meniere's Disease where spasm of the brain circulation results in vertigo attacks.]"
            }
          ]
        },
        {
          "id": "r-23",
          "name": "Clinical, Adenoids",
          "remedies": [{ "abbr": "Bac-Syco", "grade": 1 }],
          "notes": []
        },
        {
          "id": "r-24",
          "name": "Clinical, Albumubinuria",
          "remedies": [{ "abbr": "Bac-Syco", "grade": 1 }],
          "notes": []
        },
        {
          "id": "r-25",
          "name": "Clinical, Anaemia",
          "remedies": [{ "abbr": "Bac-syco", "grade": 1 }],
          "notes": []
        },
        {
          "id": "r-26",
          "name": "Clinical, Angioneurotic Oedema",
          "remedies": [{ "abbr": "Bac-Prot", "grade": 1 }],
          "notes": [
            {
              "type": "Source symptom",
              "text": "[PatBN*, Bac-Prot., - Angio-neurotic oedema, which one associates with the remedy Apis mellifica is found in the proving of the B. Proteus preparation and also a tendency for the production of herpetic eruption at the mucocutaneous margins.]"
            }
          ]
        },
        {
          "id": "r-27",
          "name": "Clinical, arthiritis",
          "remedies": [{ "abbr": "Bac-Morg-b", "grade": 1 }],
          "notes": [
            {
              "type": "Source symptom",
              "text": "[PatBN*, Bac-Morg-b., - Chronic congestion around the joints causes arthritic conditions, usually affecting the phalangeal or knee joint regions.]"
            }
          ]
        },
        {
          "id": "r-28",
          "name": "Clinical, Asthma",
          "remedies": [{ "abbr": "Bac-sev", "grade": 1 }],
          "notes": []
        },
        {
          "id": "r-29",
          "name": "Clinical, Balanitis",
          "remedies": [{ "abbr": "Bac-Syco", "grade": 1 }],
          "notes": []
        },
        {
          "id": "r-30",
          "name": "Clinical, Bilious Attacks",
          "remedies": [{ "abbr": "Bac-Morg-b", "grade": 1 }],
          "notes": [
            {
              "type": "Source symptom",
              "text": "[PATBN*,Bac-Morg-b., - Congestion of liver ; bilious attacks with severe headache which is finally relieved by vomiting large quantities of bile stained mucus.]"
            }
          ]
        },
        {
          "id": "r-31",
          "name": "Clinical, Bilious Attacks,menopause during",
          "remedies": [{ "abbr": "Bac-Morg-b", "grade": 1 }],
          "notes": [
            {
              "type": "Source symptom",
              "text": "[PatBN*,Bac-Morg-b., -A history of bilious attacks, especially occurring at the menopause in women should lead one to consider the use of the nosode]"
            }
          ]
        },
        {
          "id": "r-32",
          "name": "Clinical, Blood Pressure Low",
          "remedies": [{ "abbr": "Bac-sev", "grade": 1 }],
          "notes": []
        },
        {
          "id": "r-33",
          "name": "Clinical, Bronchial Catarrh",
          "remedies": [
            { "abbr": "Bac-sev", "grade": 1 },
            { "abbr": "Bac-Syco", "grade": 1 }
          ],
          "notes": []
        },
        {
          "id": "r-34",
          "name": "Clinical, Bronchial Catarrh,acute",
          "remedies": [{ "abbr": "Bac-syco", "grade": 1 }],
          "notes": []
        },
        {
          "id": "r-35",
          "name": "Clinical, Bronchial Catarrh,Sub-acute",
          "remedies": [{ "abbr": "Bac-syco", "grade": 1 }],
          "notes": []
        },
        {
          "id": "r-36",
          "name": "Clinical, Coeliac Disease",
          "remedies": [{ "abbr": "Bac-Gaert", "grade": 1 }],
          "notes": []
        },
        {
          "id": "r-37",
          "name": "Clinical, Cholecystitis",
          "remedies": [{ "abbr": "Bac-Morg-b", "grade": 1 }],
          "notes": []
        },
        {
          "id": "r-38",
          "name": "Clinical, Cholecystitis,attack acute",
          "remedies": [{ "abbr": "Bac-Morg-g", "grade": 1 }],
          "notes": []
        },
        {
          "id": "r-39",
          "name": "Clinical, Cholelithiasis",
          "remedies": [{ "abbr": "Bac-Morg-b", "grade": 1 }],
          "notes": []
        },
        {
          "id": "r-40",
          "name": "Clinical, Chorea",
          "remedies": [{ "abbr": "Bac-Dys", "grade": 1 }],
          "notes": []
        },
        {
          "id": "r-41",
          "name": "Clinical, Convulsions",
          "remedies": [{ "abbr": "Bac-Prot", "grade": 1 }],
          "notes": [
            {
              "type": "Source symptom",
              "text": "[PatBN*, Bac-Prot., - convulsive and epileptiform seizures and meningismus in children during febrile attacks often responds to the action of the nosode Proteus (Bach)]"
            }
          ]
        },
        {
          "id": "r-42",
          "name": "Clinical, Congenital,Pyloric Stenosis",
          "remedies": [{ "abbr": "Bac-Dys", "grade": 1 }],
          "notes": [
            {
              "type": "Source symptom",
              "text": "[PatBN*, Bac-Dys., - In some children, diagnosed as suffering from congenital pyloric stenosis considerable success has followed the use of Bacillus Dysentrico Bach , which would suggest that in these cases the condition had been due to pyloric spasm rather than to congenital malformation, of the pylorus.]"
            }
          ]
        },
        {
          "id": "r-43",
          "name": "Clinical, Cystitis",
          "remedies": [{ "abbr": "Bac-Syco", "grade": 1 }],
          "notes": []
        },
        {
          "id": "r-44",
          "name": "Clinical, Diarrhoea",
          "remedies": [{ "abbr": "Bac-Syco", "grade": 1 }],
          "notes": []
        },
        {
          "id": "r-45",
          "name": "Clinical, Duodenal Ulcer",
          "remedies": [
            { "abbr": "Bac-Prot", "grade": 1 },
            { "abbr": "Bac-Dys", "grade": 1 }
          ],
          "notes": [
            {
              "type": "Source symptom",
              "text": "[PatBN*, Bac-Prot.,-  It is now being realised that prolonged nerve strain is a factor in the production of duodenal ulcer, and in the' Proteus proving, this is also to be found]"
            }
          ]
        },
        {
          "id": "r-46",
          "name": "Clinical , Dysmenorrhoea",
          "remedies": [{ "abbr": "Bac-Morg-b", "grade": 1 }],
          "notes": []
        },
        {
          "id": "r-47",
          "name": "Clinical, Enteroptosis",
          "remedies": [{ "abbr": "Bac-sev", "grade": 1 }],
          "notes": []
        },
        {
          "id": "r-48",
          "name": "Clinical, Epilepsy",
          "remedies": [{ "abbr": "Bac-Prot", "grade": 1 }],
          "notes": [
            {
              "type": "Source symptom",
              "text": "[PatBN*, Bac-Prot., - convulsive and epileptiform seizures and meningismus in children during febrile attacks often responds to the action of the nosode Proteus (Bach)]"
            }
          ]
        },
        {
          "id": "r-49",
          "name": "Clinical, Fibrositis, rheumatic",
          "remedies": [{ "abbr": "Bac-Syco", "grade": 1 }],
          "notes": []
        },
        {
          "id": "r-50",
          "name": "Clinical, Gastroenteritis , Chronic",
          "remedies": [{ "abbr": "Bac-Gaert", "grade": 1 }],
          "notes": []
        }
      ]
    }
  ]
}

export const Homeosetu_Bowel_Nosode_repertory: KentRepertory = {
  "bookName": "Homeosetu Repertory To Keynotes and Characteristics of MM By Allen",
  "chapters": [
    {
      "id": "ak_ch_mind",
      "name": "Mind",
      "icon": "",
      "description": "Mind rubrics from Allen's Keynotes",
      "rubrics": [
        {
          "id": "ak_mind_1",
          "name": "Clairvoyant",
          "remedies": [{ "abbr": "lac-v.", "grade": 1 }],
          "notes": []
        },
        {
          "id": "ak_mind_2",
          "name": "Clairvoyant; As though about to hear bad news",
          "remedies": [{ "abbr": "lac-v.", "grade": 1 }],
          "notes": []
        },




        {
          "id": "ak_mind_12",
          "name": "Hysteria",
          "remedies": [
            { "abbr": "Hyos.", "grade": 1 },
            { "abbr": "ust.", "grade": 1 },
            { "abbr": "gels.", "grade": 1 },
            { "abbr": "plat.", "grade": 1 },
            { "abbr": "nux-m.", "grade": 1 },
            { "abbr": "electr.", "grade": 1 },
            { "abbr": "mag-m.", "grade": 1 },
            { "abbr": "Valer.", "grade": 1 },
            { "abbr": "thyr.", "grade": 1 },
            { "abbr": "croc.", "grade": 1 },
            { "abbr": "cimic.", "grade": 1 },
            { "abbr": "caul.", "grade": 1 },
            { "abbr": "bar-c.", "grade": 1 },
            { "abbr": "puls.", "grade": 1 },
            { "abbr": "Hell", "grade": 1 }
          ],
          "notes": []
        },
        {
          "id": "ak_mind_13",
          "name": "Hysteria; Intellectual Persons; in",
          "remedies": [{ "abbr": "Valer.", "grade": 1 }],
          "notes": []
        },


        {
          "id": "ak_mind_17",
          "name": "Hysteria; Menses; during",
          "remedies": [{ "abbr": "cimic.", "grade": 1 }],
          "notes": []
        },
        {
          "id": "ak_mind_18",
          "name": "Hysteria; Great Hilarity and dancing with",
          "remedies": [{ "abbr": "Croc.", "grade": 1 }],
          "notes": []
        },
        {
          "id": "ak_mind_19",
          "name": "Hysteria; Metrorrhagia from; Night bed in",
          "remedies": [{ "abbr": "Mag-m.", "grade": 1 }],
          "notes": []
        },
        {
          "id": "ak_mind_20",
          "name": "Hysteria; Women; in",
          "remedies": [
            { "abbr": "Mag-m.", "grade": 1 },
            { "abbr": "sep.", "grade": 1 },
            { "abbr": "Bar-c.", "grade": 1 }
          ],
          "notes": []
        },
        {
          "id": "ak_mind_23",
          "name": "Hysteria; laughter; involuntary",
          "remedies": [{ "abbr": "electr.", "grade": 1 }],
          "notes": []
        },
        {
          "id": "ak_mind_24",
          "name": "Hysteria; Spasms; with",
          "remedies": [{ "abbr": "cimic.", "grade": 1 }],
          "notes": []
        },
        {
          "id": "ak_mind_25",
          "name": "Hysteria; Women; Uterine Disorders with",
          "remedies": [
            { "abbr": "mag-m.", "grade": 1 },
            { "abbr": "ust.", "grade": 1 },
            { "abbr": "plat.", "grade": 1 }
          ],
          "notes": []
        },
        {
          "id": "ak_mind_26",
          "name": "Hysteria; Women; Uterine Disorders; Headache with",
          "remedies": [{ "abbr": "plat.", "grade": 1 }],
          "notes": []
        },
        {
          "id": "ak_mind_27",
          "name": "Hysteria; Children",
          "remedies": [{ "abbr": "Nux-m.", "grade": 1 }],
          "notes": []
        },
        {
          "id": "ak_mind_28",
          "name": "Irritability alternating Laughing",
          "remedies": [{ "abbr": "Sanic.", "grade": 1 }],
          "notes": []
        },
        {
          "id": "ak_mind_29",
          "name": "Love; Disappointed; ailments from",
          "remedies": [
            { "abbr": "Ant-c.", "grade": 1 },
            { "abbr": "Calc-p.", "grade": 1 }
          ],
          "notes": []
        },
        {
          "id": "ak_mind_30",
          "name": "Ailments; Anger from",
          "remedies": [{ "abbr": "Lyc.", "grade": 1 }],
          "notes": []
        },
        {
          "id": "ak_mind_31",
          "name": "Ailments; Care",
          "remedies": [{ "abbr": "Ph-ac.", "grade": 1 }],
          "notes": []
        },
        {
          "id": "ak_mind_32",
          "name": "Ailments; Chagrin",
          "remedies": [
            { "abbr": "Bry.", "grade": 1 },
            { "abbr": "Staph.", "grade": 1 }
          ],
          "notes": []
        },
        {
          "id": "ak_mind_33",
          "name": "Ailments; Envy",
          "remedies": [{ "abbr": "Staph.", "grade": 1 }],
          "notes": []
        },
        {
          "id": "ak_mind_34",
          "name": "Ailments; Fright",
          "remedies": [
            { "abbr": "apis.", "grade": 1 },
            { "abbr": "lyc.", "grade": 1 },
            { "abbr": "op.", "grade": 1 }
          ],
          "notes": []
        },
        {
          "id": "ak_mind_35",
          "name": "Ailments; Fright; fear still remaining",
          "remedies": [
            { "abbr": "acon.", "grade": 1 },
            { "abbr": "hyos.", "grade": 1 },
            { "abbr": "op.", "grade": 1 }
          ],
          "notes": []
        },
        {
          "id": "ak_mind_36",
          "name": "Ailments; News bad from",
          "remedies": [
            { "abbr": "ign.", "grade": 1 },
            { "abbr": "Apis.", "grade": 1 },
            { "abbr": "gels.", "grade": 1 }
          ],
          "notes": []
        },
        {
          "id": "ak_mind_37",
          "name": "Ailments; Motifying news from",
          "remedies": [{ "abbr": "Lyss.", "grade": 1 }],
          "notes": []
        },
        {
          "id": "ak_mind_38",
          "name": "Ailments; Grief from",
          "remedies": [
            { "abbr": "aur.", "grade": 1 },
            { "abbr": "calc-p.", "grade": 1 },
            { "abbr": "ign.", "grade": 1 },
            { "abbr": "ph-ac.", "grade": 1 },
            { "abbr": "caust.", "grade": 1 },
            { "abbr": "cocc.", "grade": 1 },
            { "abbr": "colch.", "grade": 1 },
            { "abbr": "coloc.", "grade": 1 },
            { "abbr": "cycl.", "grade": 1 },
            { "abbr": "kali-br.", "grade": 1 },
            { "abbr": "Lach.", "grade": 1 },
            { "abbr": "nat.m.", "grade": 1 },
            { "abbr": "pic-ac.", "grade": 1 },
            { "abbr": "plat.", "grade": 1 },
            { "abbr": "samb.", "grade": 1 },
            { "abbr": "staph.", "grade": 1 }
          ],
          "notes": []
        },
        {
          "id": "ak_mind_39",
          "name": "Ailments; Grief; Long Lasting",
          "remedies": [{ "abbr": "Lach.", "grade": 1 }],
          "notes": []
        },
        {
          "id": "ak_mind_40",
          "name": "Ailments; Love; Disappointed",
          "remedies": [
            { "abbr": "calc-p.", "grade": 1 },
            { "abbr": "ign.", "grade": 1 },
            { "abbr": "Ph-ac.", "grade": 1 }
          ],
          "notes": []
        },
        {
          "id": "ak_mind_41",
          "name": "Ailments; Pride",
          "remedies": [{ "abbr": "Staph.", "grade": 1 }],
          "notes": []
        },
        {
          "id": "ak_mind_42",
          "name": "Ailments; Rage",
          "remedies": [{ "abbr": "apis.", "grade": 1 }],
          "notes": []
        },
      ]
    },
    {

      "id": "ak_ch_cough",
      "name": "Cough",
      "icon": "",
      "description": "Cough rubrics from Allen's Keynotes",
      "rubrics": [
        {
          "id": "ak_cough_1",
          "name": "Cough",
          "remedies": [{ "abbr": "Lyss.", "grade": 1 }],
          "notes": []
        },
        {
          "id": "ak_cough_4",
          "name": "Cough; Associated Symptom; Eructations; with",
          "remedies": [{ "abbr": "Ambr.", "grade": 1 }],
          "notes": []
        },
        {
          "id": "ak_cough_5",
          "name": "Cough; Associated Symptoms; Head; with",
          "remedies": [{ "abbr": "Caps.", "grade": 1 }],
          "notes": []
        },
        {
          "id": "ak_cough_8",
          "name": "Cough; Associated Symptom; Urinary",
          "remedies": [
            { "abbr": "caust.", "grade": 1 },
            { "abbr": "puls.", "grade": 1 },
            { "abbr": "squil.", "grade": 1 },
            { "abbr": "verat.", "grade": 1 }
          ],
          "notes": []
        },
        {
          "id": "ak_cough_10",
          "name": "Cough; Air; Cold; Agg",
          "remedies": [{ "abbr": "Acon.", "grade": 1 }],
          "notes": []
        },
        {
          "id": "ak_cough_12",
          "name": "Cough; Night",
          "remedies": [
            { "abbr": "bac-b.", "grade": 1 },
            { "abbr": "con.", "grade": 1 },
            { "abbr": "dros.", "grade": 1 },
            { "abbr": "eup-per.", "grade": 1 },
            { "abbr": "hyos.", "grade": 1 },
            { "abbr": "Mag-p-a.", "grade": 1 },
            { "abbr": "Mag-arct.", "grade": 1 },
            { "abbr": "Med.", "grade": 1 }
          ],
          "notes": []
        },
        {
          "id": "ak_cough_15",
          "name": "Cough; Midnight",
          "remedies": [{ "abbr": "dros.", "grade": 1 }],
          "notes": []
        },
        {
          "id": "ak_cough_19",
          "name": "Cough; Asthmatic",
          "remedies": [{ "abbr": "Ip.", "grade": 1 }],
          "notes": []
        },
        {
          "id": "ak_cough_21",
          "name": "Cough; Barking",
          "remedies": [
            { "abbr": "dros.", "grade": 1 },
            { "abbr": "verb.", "grade": 1 }
          ],
          "notes": []
        },
        {
          "id": "ak_cough_24",
          "name": "Cough; Compels; Larynx grasp; to",
          "remedies": [{ "abbr": "all-c.", "grade": 1 }],
          "notes": []
        },
        {
          "id": "ak_cough_25",
          "name": "Cough; Daytime; only",
          "remedies": [
            { "abbr": "euphr.", "grade": 1 },
            { "abbr": "Ferr.", "grade": 1 },
            { "abbr": "Nat-m.", "grade": 1 }
          ],
          "notes": []
        },
        {
          "id": "ak_cough_31",
          "name": "Cough; Coughing agg",
          "remedies": [{ "abbr": "ign.", "grade": 1 }],
          "notes": []
        },
        {
          "id": "ak_cough_33",
          "name": "Cough; Croaking",
          "remedies": [{ "abbr": "acon.", "grade": 1 }],
          "notes": []
        },
        {
          "id": "ak_cough_36",
          "name": "Cough; Deep",
          "remedies": [
            { "abbr": "Apoc.", "grade": 1 },
            { "abbr": "lyc.", "grade": 1 },
            { "abbr": "Med.", "grade": 1 }
          ],
          "notes": []
        },
        {
          "id": "ak_cough_39",
          "name": "Cough; Drinking; Amel",
          "remedies": [
            { "abbr": "Caust.", "grade": 1 },
            { "abbr": "Cupr.", "grade": 1 }
          ],
          "notes": []
        },
        {
          "id": "ak_cough_41",
          "name": "Cough; Dry",
          "remedies": [
            { "abbr": "acon.", "grade": 1 },
            { "abbr": "am-c.", "grade": 1 },
            { "abbr": "apoc.", "grade": 1 },
            { "abbr": "Iod.", "grade": 1 },
            { "abbr": "con.", "grade": 1 },
            { "abbr": "bry.", "grade": 1 },
            { "abbr": "cina.", "grade": 1 },
            { "abbr": "hyos.", "grade": 1 },
            { "abbr": "Ip.", "grade": 1 }
          ],
          "notes": []
        },
        {
          "id": "ak_cough_43",
          "name": "Cough; Dry; Spasmodic",
          "remedies": [
            { "abbr": "Bry.", "grade": 1 },
            { "abbr": "Cina.", "grade": 1 },
            { "abbr": "hyos.", "grade": 1 },
            { "abbr": "Ip.", "grade": 1 },
            { "abbr": "kali-c.", "grade": 1 }
          ],
          "notes": []
        },
        {
          "id": "ak_cough_47",
          "name": "Cough; Expectoration; Easy; with",
          "remedies": [
            { "abbr": "Arg-m.", "grade": 1 },
            { "abbr": "bac-b.", "grade": 1 }
          ],
          "notes": []
        },
        {
          "id": "ak_cough_50",
          "name": "Cough; Expiration; on",
          "remedies": [
            { "abbr": "acon.", "grade": 1 },
            { "abbr": "caust.", "grade": 1 }
          ],
          "notes": []
        }
      ]


    }
  ]
}



// Unified library of all books for navigation
REPERTORY_BOOKS.push(KENT_REPERTORY, Homeosetu_Clinical_Repertory, HOMEOSETU_ALLEN, Allen_Fever_Repertory, Homeosetu_Bowel_Nosode_repertory)

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
