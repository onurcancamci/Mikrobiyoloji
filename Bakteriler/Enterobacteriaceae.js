//Citrobacter
Bakteriler.push({
  AileAdi: "Enterobacteriaceae",
  CinsAdi: "Citrobacter",
  TurAdi: "koseri",
  
  Gram: "Negative",
  Shape:  "Basil",
  Solunum: "Aerob_Ve_Fakultatif_Anaerob",
  Enzimler: ["Katalaz","Laktoz","Indol"],
  Hareket: "Hareketli",
  Antijenler: ["H" , "O"],
  KulturOrtami: [{
    Name: "MacConkey Agar",
    Gorunus: ["Mukoid","Puturlu"],
    Aciklama: ["Laktoz Fermente Eder","Mukoid veya Puturlu gorunebilir"]
  }],
  Direnc : ["Vankomisin"],
  Duyarlilik: "Kolistin",
  VirualanFaktorler: Aciklamali("Flagella","Peritrichous"),
  Aciklama : ["Karbon kaynagi olarak sadece Sitrat kullanabilir","Normal Florada Bulunur?","Firsatci Enfeksiyon Yapabilir","Burda Yeterince Bilgi Henuz Yok"],
});
Bakteriler.push({
  AileAdi: "Enterobacteriaceae",
  CinsAdi: "Citrobacter",
  TurAdi: "freundii",
  
  Gram: "Negative",
  Shape:  "Basil",
  Solunum: "Fakultatif_Anaerob",
  Enzimler: ["Katalaz","Laktoz"],
  Hareket: "Hareketli",
  Antijenler: ["H" , "O"],
  KulturOrtami: [{
    Name: "MacConkey Agar",
    Gorunus: ["Mukoid","Puturlu"],
    Aciklama: ["Laktoz Fermente Eder","Mukoid veya Puturlu gorunebilir","Tekli yada Ciftli olabilir"]
  }],
  Direnc : ["Vankomisin"],
  Duyarlilik: "Kolistin",
  VirualanFaktorler: Aciklamali("Flagella","Peritrichous"),
  Aciklama : ["Karbon kaynagi olarak sadece Sitrat kullanabilir","Normal Floarada Bulunur",
  "Azot Dongusunde Onemli","Vucut direnci dusuk kisilerde ve premature bebeklerde enfeksiyon",
  "En onemli Citrobacter","Burda Yeterince Bilgi Henuz Yok"],
});

//Enterobacter
Bakteriler.push({
  AileAdi: "Enterobacteriaceae",
  CinsAdi: "Enterobacter",
  TurAdi: "aerogenes",
  
  Gram: "Negative",
  Shape:  "Basil",
  Solunum: "Fakultatif_Anaerob",
  Enzimler: ["Katalaz","Laktoz","Ornitin Dekarboksilaz"],
  Hareket: "Hareketli",
  Antijenler: ["H" , "O"],
  KulturOrtami: [{
    Name: "MacConkey Agar",
    Aciklama: "Laktoz Fermente Eder"
  }],
  Direnc : "Vankomisin",
  Duyarlilik : "Kolistin",
  VirualanFaktorler: {Name: "Flagella", Aciklama: "Peritrichous"},
  Aciklama : ["Burda Yeterince Bilgi Henuz Yok","Bazi Turlerin Kapsulu olabilir"],
});
Bakteriler.push({
  AileAdi: "Enterobacteriaceae",
  CinsAdi: "Enterobacter",
  TurAdi: "cloacae",
  
  Gram: "Negative",
  Shape:  "Basil",
  Solunum: "Fakultatif_Anaerob",
  Enzimler: ["Katalaz","Laktoz","Ornitin Dekarboksilaz",{Name: "Ureaz", Aciklama:"65%"}],
  Hareket: "Hareketli",
  Antijenler: ["H" , "O"],
  KulturOrtami: [{
    Name: "MacConkey Agar",
    Aciklama: "Laktoz Fermente Eder"
  }],
  Direnc : "Vankomisin",
  Duyarlilik : "Kolistin",
  VirualanFaktorler: {Name: "Flagella", Aciklama: "Peritrichous"},
  Aciklama : ["Burda Yeterince Bilgi Henuz Yok","Bazi Turlerin Kapsulu olabilir"],
});

//Escherichia
Bakteriler.push({
  AileAdi: "Enterobacteriaceae",
  CinsAdi: "Escherichia",
  TurAdi: "coli",
  Gram: "Negative",
  Shape:  "Basil",
  Solunum: "Fakultatif_Anaerob",
  Enzimler: ["Indol","Katalaz","Mannitol","Hemolizin",Aciklamali("Laktoz","Salmonella Ve Shigella dan ayirir"),Aciklamali("Sakkaroz","Bazen")],
  Hareket: ["Hareketli","Hareketsiz"],
  //?Kapsul: Aciklamali("Kapsullu","Bazilari"),
  Antijenler: ["O","K","H","P"],
  KulturOrtami: [{
    Name: "MacConkey Agar",
    Gorunus: ["S tipi"],
    Aciklama: ["Kapsullu olanlar M tipi"]
  }],
  Direnc : "Vankomisin",
  Duyarlilik: "Kolistin",
  VirualanFaktorler: ["Endotoksin",{Name: "Flagella", Aciklama: "Peritrichous"}],
  Hastaliklar: [{
    Name: "Idrar Yolu Enfeksiyonu",
  }, {
    Name: "Barsak Enfeksiyonlari",
  }, {
    Name: "Septisemi",
  }, {
    Name: "Menenjit",
  }, {
    Name: "Pnomoni",
  }],
  Aciklama : ["Normal Florada Bulunur","Nitrat Reduksiyonu Yapar","Bazi suslari kapsullu olabilir"],
});

//Klebsiella
Bakteriler.push({
  AileAdi: "Enterobacteriaceae",
  CinsAdi: "Klebsiella",
  TurAdi: "pneumoniae",
  SubTur: "pneumoniae",
  
  Gram: "Negative",
  Shape:  "Basil",
  Solunum: "Fakultatif_Anaerob",
  Enzimler: ["Laktoz","Ureaz","Sitrat","VP","Sakkaroz","Mannitol","Katalaz"],
  Hareket: "Hareketsiz",
  KulturOrtami: [{
    Name: "MacConkey Agar",
    Gorunus: "Mukoid",
    Aciklama: "Laktoz Fermente Eder"
  }],
  Antijenler: [{
    Name: "O",
    Aciklama: "9 serotip"
  }, {
    Name: "K",
    Aciklama: ["77 serotip","Kapsul Antijeni"],
  }],
  Direnc : {
    Name: "Beta-Laktam",
    Aciklama: ["Genis Spektrumlu Beta-Laktamazi Var","R plazmitleri ile"]
  },
  VirualanFaktorler: ["Sidereforlar",{
    Name: "Pili",
    Aciklama: "Tip 1, Tip 3"
  }],
  Aciklama: ["Hastane Enfeksiyonlari Yapar (%10)","Burda listelenen hastaliklar disinda da hastalik yapabilir"],
  Hastaliklar: [{
    Name: "Pnomoni"
  }, {
    Name: "Idrar Yolu Enfeksiyonu"
  }, {
    Name: "Yara Enfeksiyonu"
  }, {
    Name: "Septisemi",
  }, {
    Name: "Menenjit"
  }],
  Resim : ["image@Agarda@images/Klebsiella_Pneumoniae_01.png",
            "image@Mikroskopta@images/klebsiella_pneumoniae_mikroskop.jpg"],
  
});
Bakteriler.push({
  AileAdi: "Enterobacteriaceae",
  CinsAdi: "Klebsiella",
  TurAdi: "pneumoniae",
  SubTur: "ozaenae",
  
  Gram: "Negative",
  Shape:  "Basil",
  Solunum: "Aerob_Ve_Fakultatif_Anaerob",
  Enzimler: ["Katalaz","Sakkaroz","Mannitol"],
  Hareket: "Hareketsiz",
  Antijenler: ["O", "K"],
  KulturOrtami: [{
    Name: "MacConkey Agar",
    Gorunus: "Mukoid",
    Aciklama: ["48 saatte olusur"]
  }],
  Direnc : "Vankomisin",
  Duyarlilik : "Kolistin",
  Aciklama : "Burda Yeterince Bilgi Henuz Yok",
  Resim: "image@Agarda@images/klebsiella_ozaenae/agar.jpg",
});
Bakteriler.push({
  AileAdi: "Enterobacteriaceae",
  CinsAdi: "Klebsiella",
  TurAdi: "granulomatis",
  
  Gram: "Negative",
  Shape:  "Basil",
  Enzimler: ["Sakkaroz","Mannitol"],
  Hareket: "Hareketsiz",
  Antijenler: ["O", "K"],
  KulturOrtami: [{
    Name: "Monosit Kultur Sistemi",
    Aciklama: ["Hucresiz Ortamda Uretilemez"],
  }],
  Aciklama : ["Cinsel Yolla Bulasir","Burda Yeterince Bilgi Henuz Yok"],
});
Bakteriler.push({
  AileAdi: "Enterobacteriaceae",
  CinsAdi: "Klebsiella",
  TurAdi: "variicola",
  
  Gram: "Negative",
  Shape:  "Basil",
  Solunum: "Aerob_Ve_Fakultatif_Anaerob",
  Enzimler: ["Katalaz","Laktoz","Ureaz","Sakkaroz","Mannitol"],
  Hareket: "Hareketsiz",
  Antijenler: ["O","K"],
  KulturOrtami: [{
    Name: "MacConkey Agar",
    Gorunus: "Mukoid",
    Aciklama: "Laktoz Fermente Eder"
  }],
  Direnc : "Vankomisin",
  Duyarlilik : "Kolistin",
  Aciklama : "Burda Yeterince Bilgi Henuz Yok",
});
Bakteriler.push({
  AileAdi: "Enterobacteriaceae",
  CinsAdi: "Klebsiella",
  TurAdi: "oxytoca",
  
  Gram: "Negative",
  Shape:  "Basil",
  Solunum: "Fakultatif_Anaerob",
  Enzimler: ["Katalaz","Laktoz","Ureaz","Indol","Sakkaroz","Mannitol"],
  Hareket: "Hareketsiz",
  Antijenler: ["O", "K"],
  KulturOrtami: [{
    Name: "MacConkey Agar",
    Gorunus: "Mukoid",
    Aciklama: "Laktoz Fermente Eder"
  }],
  Direnc : "Vankomisin",
  Duyarlilik : "Kolistin",
  Aciklama : "Burda Yeterince Bilgi Henuz Yok",
});

//Morganella
Bakteriler.push({
  AileAdi: "Enterobacteriaceae",
  CinsAdi: "Morganella",
  TurAdi: "morganii",
  Gram: "Negative",
  Shape:  "Basil",
  Solunum: "Fakultatif_Anaerob",
  Enzimler: ["Katalaz","Fenilalanin Deaminaz","Indol","Ureaz","Beta Hemoliz"],
  Hareket: "Hareketli",
  Antijenler: ["O","H"],
  KulturOrtami: [{
    Name: "MacConkey Agar",
  }],
  Direnc : ["Vankomisin","Kolistin"],
  VirualanFaktorler: [{Name: "Flagella", Aciklama: "Peritrichous"}],
  //Aciklama : [],
});

//Proteus
Bakteriler.push({
  AileAdi: "Enterobacteriaceae",
  CinsAdi: "Proteus",
  TurAdi: "mirabilis",
  Gram: "Negative",
  Shape:  "Basil",
  Solunum: "Fakultatif_Anaerob",
  Enzimler: ["Katalaz","Ureaz","H2S","Fenilalanin Deaminaz", "Hemolizin"],
  Hareket: "Hareketli",
  Antijenler: ["O","H"],
  KulturOrtami: [{
    Name: "MacConkey Agar",
    Aciklama: "Kolay Urer"
  }],
  Direnc : ["Vankomisin","Kolistin"],
  VirualanFaktorler: [{Name: "Flagella", Aciklama: "Peritrichous"}],
  Aciklama : ["Normal Florada Bulunur"],
});
Bakteriler.push({
  AileAdi: "Enterobacteriaceae",
  CinsAdi: "Proteus",
  TurAdi: "vulgaris",
  Gram: "Negative",
  Shape:  "Basil",
  Solunum: "Fakultatif_Anaerob",
  Enzimler: ["Katalaz","Ureaz","H2S","Fenilalanin Deaminaz","Indol", "Hemolizin"],
  Hareket: "Hareketli",
  Antijenler: ["O","H"],
  KulturOrtami: [{
    Name: "MacConkey Agar",
    Aciklama: "Kolay Urer"
  }],
  Direnc : ["Vankomisin","Kolistin"],
  VirualanFaktorler: [{Name: "Flagella", Aciklama: "Peritrichous"}],
  Aciklama : ["Normal Florada Bulunur"],
});

//Salmonella
Bakteriler.push({
  AileAdi: "Enterobacteriaceae",
  CinsAdi: "Salmonella",
  TurAdi: "typhi",
  Gram: "Negative",
  Shape:  "Basil",
  Solunum: "Fakultatif_Anaerob",
  Enzimler: ["Katalaz","H2S"], //baska enzim olabilir
  Hareket: "Hareketli",
  //Antijenler: [],
  KulturOrtami: [{
    Name: "MacConkey Agar",
    Gorunus: ["Soluk"],
    Aciklama: ["Baska agarlarda var eklenicektir"],
  }],
  Direnc : ["Vankomisin"],
  Duyarlilik: ["Kolistin"],
  VirualanFaktorler: [{Name: "Flagella", Aciklama: "Peritrichous"}],
  //Aciklama : [],
});

//Serratia
Bakteriler.push({
  AileAdi: "Enterobacteriaceae",
  CinsAdi: "Serratia",
  TurAdi: "marcescens",
  
  Gram: "Negative",
  Shape:  "Kokobasil",
  Solunum: "Fakultatif_Anaerob",
  Enzimler: ["Katalaz","DNAaz","Lipaz","Gelatinaz"],
  Hareket: "Hareketli",
  Antijenler: ["H" , "O"],
  KulturOrtami: [{
    Name: "MacConkey Agar",
    Aciklama: "Laktoz Fermente Etmez"
  }],
  Direnc : ["Vankomisin","Kolistin"],
  VirualanFaktorler: {Name: "Flagella", Aciklama: "Peritrichous"},
  Aciklama : [{Name:"Kirmizi Pigment", Aciklama: ["Tum suslari uretmeyebilir","Pembe Pigment uretebilir"]},"Burda Yeterince Bilgi Henuz Yok","Bazi Turlerin Kapsulu olabilir"],
});
Bakteriler.push({
  AileAdi: "Enterobacteriaceae",
  CinsAdi: "Serratia",
  TurAdi: "rubidaea",
  
  Gram: "Negative",
  Shape:  "Kokobasil",
  Solunum: "Fakultatif_Anaerob",
  Enzimler: ["Katalaz","Laktoz","Dnaz","Lipaz","Gelatinaz"],
  Hareket: "Hareketli",
  Antijenler: ["H" , "O"],
  KulturOrtami: [{
    Name: "MacConkey Agar",
    Aciklama: "Laktoz Fermente Eder"
  }],
  Direnc : ["Vankomisin","Kolistin"],
  VirualanFaktorler: {Name: "Flagella", Aciklama: "Peritrichous"},
  Aciklama : ["Kirmizi Pigment","Firsatci Enfeksiyon Yapabilir","Burda Yeterince Bilgi Henuz Yok"],
});//Serratia//Serratia//Serratia

//Shigella
Bakteriler.push({
  AileAdi: "Enterobacteriaceae",
  CinsAdi: "Shigella",
  TurAdi: "flexneri",
  Gram: "Negative",
  Shape:  "Basil",
  Solunum: "Fakultatif_Anaerob",
  Enzimler: ["Katalaz"],
  Hareket: "Hareketsiz",
  //Antijenler: [],
  KulturOrtami: [{
    Name: "MacConkey Agar",
    Gorunus: ["Soluk"],
  //  Aciklama: []
  }],
  Direnc : ["Vankomisin"],
  Duyarlilik: ["Kolistin"],
  //VirualanFaktorler: [],
  //Aciklama : [],
});

//Yersinia
Bakteriler.push({
  AileAdi: "Enterobacteriaceae",
  CinsAdi : "Yersinia",
  TurAdi : "pestis",
  
  Gram : "Negative",
  Shape : "Kokobasil",
  Hareket: "Hareketsiz",
  Aciklama : ["Kutupsal Boyanma","Kucuk"],
  Vektor : "Kemirici Piresi",
  Hastaliklar : [{
    Name : "Bubonik Veba",
    Belirtiler : ["Ates", "Lenf Bezi Sismesi","Agri", "Fistulize Gangliyon"],
    Aciklama : ["Olumcul", "Yuksek ates ve sisligin ani basladigi tek infeksiyon"],
  }, {
    Name : "Akciger Vebasi",
    Belirtiler : ["Oksuruk", "Nefes Darligi", "Siyanoz", "Balgam", "Kanli Balgam"],
    Aciklama : ["Primer : Solunum yoluyla bulasma\nSekonder : Bubonik Vebanin akcigere ulasmasi"],
  }, {
    Name : "Veba septisemisi, menenjit",
    Belirtiler : ["Ates", "Bulanti", "Kusma", "Bilinc Kaybi"],
    Aciklama : ["Olumcul"]
  }],
  Antijenler : ["VW", "F1"],
  Bulasma : ["Pire Isirmasi", "Solunum Yolu"],
  Solunum : "Fakultatif_Anaerob",
  KulturOrtami : {
    Name : "Bircok Kultur",
    Gorunus : "Sahanda Yumurta" //blacklist
  },
  Duyarlilik : [
    "Streptomisin", "Gentamisin", "Tetrasiklin",
    "Doksisiklin", "Siprofloksasin", "Kloramfenikol"
  ],
  
});
Bakteriler.push({
  AileAdi: "Enterobacteriaceae",
  CinsAdi : "Yersinia",
  TurAdi : "enterocolitica",
  
  Gram : "Negative",
  Shape : "Basil",
  Solunum : "Aerob_Ve_Fakultatif_Anaerob",
  Hareket: ["Hareketsiz","Hareketli"],
  Aciklama : ["Sogukta Urer (+4°C)","22°C de Hareketli", "Kan Bankalarinda Depolanan Kanda Cogalabilir",
                "Tedavide Antibiyoterapi onerilmez, Gerekmesi yada Septisemi Disinda"],
  Enzimler : "Ureaz",
  Antijenler : ["O", "H", "WH"],
  Hastaliklar : [{
    Name : "Gastroenterit",
    Belirtiler : ["Ates", "Kusma", "Ishal", "Karin Agrisi"],
  }, {
    Name : "Mezenterik Lenf Adenit"
  }],
  KulturOrtami : [{
    Name : "CIN Agar",
    Gorunus : "Bogagozu Koloni",
  }, "Kanli Agar"],
  Duyarlilik : ["Tetrasiklin", "3.Kusak Sefalosporin", "Gentamisin", "TMP-SMX", "Kloramfenikol"],
  Bulasma : ["Su", "Oral", "Hasta", "Kontamine Besin"],
  
});
