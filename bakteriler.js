let Bakteriler = [];

//obje name kisminda obje kullanma
//obje name kisminda array kullanma

/*
Zorunlu Alanlar
CinsAdi
TurAdi
Gram
Shape
Solunum
Hareket

*/

/*
Yazmak yerine bos birak: 
Kapsulsuz
*/
//°C

let Aciklamali = function (Name, Aciklama) {
  return {Name,Aciklama};
}




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
  Kapsul: "Kapsullu",
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
  Resim : ["image@Agarda@images/Klebsiella_Pneumoniae_01.png","image@Mikroskopta@images/klebsiella_pneumoniae_mikroskop.jpg"],
  
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
  Kapsul: "Kapsullu",
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
  Kapsul: "Kapsullu",
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
  Kapsul: "Kapsullu",
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
  Kapsul: "Kapsullu",
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

//Serratia
Bakteriler.push({
  AileAdi: "Enterobacteriaceae",
  CinsAdi: "Serratia",
  TurAdi: "marcescens",
  
  Gram: "Negative",
  Shape:  "Kokobasil",
  Solunum: "Fakultatif_Anaerob",
  Enzimler: ["Katalaz","Dnaz","Lipaz","Gelatinaz"],
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
});

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
  VirualanFaktorler: {Name: "Flagella", Aciklama: "Peritrichous"},
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
  VirualanFaktorler: {Name: "Flagella", Aciklama: "Peritrichous"},
  Aciklama : ["Karbon kaynagi olarak sadece Sitrat kullanabilir","Normal Floarada Bulunur",
  "Azot Dongusunde Onemli","Vucut direnci dusuk kisilerde ve premature bebeklerde enfeksiyon",
  "En onemli Citrobacter","Burda Yeterince Bilgi Henuz Yok"],
});


//Rickettsia
Bakteriler.push({
  AileAdi: "Rickettsiaceae",
  CinsAdi: "Rickettsia",
  TurAdi: "prowazekii",
  Gram: "Negative",
  Shape:  {Name: "Basil", Aciklama: ["Pleomorfik","Gram Boyasi Ile Zayif Boyanir","Giemsa Ile Iyi Boyanir"]},
  Solunum: "Aerob",
  Hareket: "Hareketsiz",
  Duyarlilik: ["Kloramfenikol","Tetrasiklin"],
  Bulasma: ["Artropodlar"],
  Vektor: {Name:"Insan Vucut Bitleri", Kaynak:"Insan"},
  Hastaliklar: [{Name:"Epidemik Tifus",
                Aciklama: ["Diger isimleri: Klasik Tifus, Bit Tifusu, Lekeli Humma","Letalite 40% i bulabilir","Kulucka 1 hafta"],
                Belirtiler: [{Name:"Bas Agrisi", Aciklama:"Ani Baslar"}, 
                              {Name:"Ates", Aciklama: "Hizla 40°C a cikar ve dusmez"},
                              {Name:"Dokuntu",Aciklama:["5. Gunde Aksiller bolge ve Govdenin ust kisminda","El ayasi, Ayak tabani ve Yuz haric tum vucutta","Basinca Kaybolmaz"]}]}, 
                {Name:"Brill-Zinsser Hastaligi",Aciklama:"Onceden R. prowazekii infeksiyonu gecirmis kisilerde yillar sonra gelisen, hafif epidemik tifus bulgulu hastalik"}],
  
  Aciklama : ["Tifus Grubu","Zorunlu Hucre Ici Parazit","RNA ve DNA Vardir","Enzim Sistemleri Vardir",
                "Yasam Sikluslari Memelilerde Ve Artropodlarda","Dis Ortam Kosullarina Duyarlilar",
                "Weil-Felix genellikle Negatiftir", 
                 {Name:"Asi var", Aciklama:"Sadece Risk Gruplarina"}],
  
});
Bakteriler.push({
  AileAdi: "Rickettsiaceae",
  CinsAdi: "Rickettsia",
  TurAdi: "typhi",
  Gram: "Negative",
  Shape:  {Name: "Basil", Aciklama: ["Pleomorfik","Gram Boyasi Ile Zayif Boyanir","Giemsa Ile Iyi Boyanir"]},
  Solunum: "Aerob",
  Hareket: "Hareketsiz",
  Duyarlilik: ["Kloramfenikol","Tetrasiklin"],
  Bulasma: ["Artropodlar"],
  Vektor: {Name:"Pire", Kaynak:"Sican"},
  Hastaliklar: {Name:"Murine Typhus",Aciklama:"Belirtileri Epidemik Tifuse Benzer Ama Dokuntu El Ayasi, Ayak Tabani ve Yuzde de Gorulur"},
  Aciklama : ["Tifus Grubu","Zorunlu Hucre Ici Parazit","RNA ve DNA Vardir","Enzim Sistemleri Vardir",
                "Yasam Sikluslari Memelilerde Ve Artropodlarda","Dis Ortam Kosullarina Duyarlilar"],
});
Bakteriler.push({
  AileAdi: "Rickettsiaceae",
  CinsAdi: "Rickettsia",
  TurAdi: "rickettsii",
  Gram: "Negative",
  Shape:  {Name: "Kokobasil", Aciklama: ["Gram Boyasi Ile Zayif Boyanir","Giemsa Ile Iyi Boyanir"]},
  Solunum: "Aerob",
  Hareket: "Hareketsiz",
  Duyarlilik: ["Doksisiklin","Kinolonlar"],
  Bulasma: ["Artropodlar"],
  Vektor: {Name:"Kene", Kaynak:["Infekte Kemirgenler","Keneler"]},
  Hastaliklar: {Name:"Kayalik Daglar Benekli Atesi",
                Belirtiler: ["Ates","Titreme","Eklem Agrisi","Kas Agiris","Gucsuzluk","Dokuntuler",
                                Aciklamali("Bas Agrisi","Siddetli"),Aciklamali("Lenfadenopati","Bolgesel"),
                                Aciklamali("Nebde Dokusu",["Isirik Bolgesinde","Siyah Benek-Tache Noir"])],
                Aciklama:"Infeksiyon Cesitli Organlari Tutabilir, Bu Sebeple Farkli Bulgular Yapabilir"},
  Aciklama : ["Benekli Ates Grubu","Zorunlu Hucre Ici Parazit","En Patojenik Rickettsia Turu","RNA ve DNA Vardir","Enzim Sistemleri Vardir",
                "Yasam Sikluslari Memelilerde Ve Artropodlarda","Dis Ortam Kosullarina Duyarlilar"],
});
Bakteriler.push({
  AileAdi: "Rickettsiaceae",
  CinsAdi: "Rickettsia",
  TurAdi: "akari",
  Gram: "Negative",
  Shape:  {Name: "Kokobasil", Aciklama: ["Gram Boyasi Ile Zayif Boyanir","Giemsa Ile Iyi Boyanir"]},
  Solunum: "Aerob",
  Hareket: "Hareketsiz",
  Duyarlilik: ["Doksisiklin","Kinolonlar"],
  Bulasma: ["Artropodlar"],
  Vektor: {Name:"Akarlar", Kaynak:["Infekte Kemirgenler"]},
  Hastaliklar: {Name:"Rickettsia Cicegi",
                Belirtiler:["Ates","Dokuntuler"],
                Aciklama:["Infeksiyon Cesitli Organlari Tutabilir, Bu Sebeple Farkli Bulgular Yapabilir","Hafif Gecirilen Bir Hastaliktir"]},
  Aciklama : ["Benekli Ates Grubu","Zorunlu Hucre Ici Parazit","En Patojenik Rickettsia Turu","RNA ve DNA Vardir","Enzim Sistemleri Vardir",
                "Yasam Sikluslari Memelilerde Ve Artropodlarda","Dis Ortam Kosullarina Duyarlilar","Weil-Felix Negatiftir"],
});
Bakteriler.push({
  AileAdi: "Rickettsiaceae",
  CinsAdi: "Rickettsia",
  TurAdi: "conorii",
  Gram: "Negative",
  Shape:  {Name: "Kokobasil", Aciklama: ["Gram Boyasi Ile Zayif Boyanir","Giemsa Ile Iyi Boyanir"]},
  Solunum: "Aerob",
  Hareket: "Hareketsiz",
  Duyarlilik: ["Doksisiklin","Kinolonlar"],
  Bulasma: ["Artropodlar"],
  Vektor: {Name:"Keneler", Kaynak:["Infekte Kemirgenler",{Name:"Kopekler",Aciklama:"Bazen"}]},
  Hastaliklar: {Name:"Akdeniz Atesi",
                Belirtiler: ["Ates","Dokuntuler"],
                Aciklama:["Selim Bir Hastalik","Endemiktir"]},
  Aciklama : ["Benekli Ates Grubu","Zorunlu Hucre Ici Parazit","En Patojenik Rickettsia Turu","RNA ve DNA Vardir","Enzim Sistemleri Vardir",
                "Yasam Sikluslari Memelilerde Ve Artropodlarda","Dis Ortam Kosullarina Duyarlilar","Weil-Felix Negatiftir"],
});

//coxiella
Bakteriler.push({
  AileAdi: "Coxiellaceae",
  CinsAdi: "Coxiella",
  TurAdi: "burnetii",
  Gram: "Negative",
  Shape:  {Name: "Kokobasil", Aciklama: ["Gram Boyasi Ile Zayif Boyanir","Giemsa Ile Iyi Boyanir"]},
  Solunum: "Aerob",
  Hareket: "Hareketsiz",
  KulturOrtami: [{
    Name: "Axenic Culture"
  }],
  Hastaliklar: {
    Name: "Q Atesi",
    Belirtiler: ["Ates","Bas Agrisi","Eklem Agrisi","Oksuruk","Dokuntu","Menenjit Bulgulari"],
    Aciklama: ["Tum Dunyada Yaygin","Insanda Akut Veya Kronik(5%)","Genelde Ciftlik Hayvanlarindan Kaynaklanir",
                "Cok Bulasici","Lab: Trombositopeni, KC Enzimlerinde Yukselme, Eritrosit Sedimentasyonda Yukselme"],
                
  },
  Bulasma: ["Hava","Damlacik","Oral","Kene"],
  VirualanFaktorler: "Endospor",
  Aciklama : ["Zorunlu Hucre Ici","Fagolizozomlarda Yasar","Cevre Sartlarina Cok Direnclidir"],
});

//Bartonella
Bakteriler.push({
  AileAdi: "Bartonellaceae",
  CinsAdi: "Bartonella",
  TurAdi: "quintana",
  Gram: "Negative",
  Shape:  "Basil",
  Solunum: "Aerob",
  Hareket: "Hareketli",
  KulturOrtami: [{
    Name: "Axenic Culture"
  }],
  Hastaliklar: [{
    Name: "Siper Atesi",
    Belirtiler: [Aciklamali("Ates",["5 Gunde Bir Yukselir","Ani Ates"]),Aciklamali("Agri","Post Orbital, Tibia Ustunde ve Uzun Kemiklerde"),
                  Aciklamali("Dokuntuler","Ozellikle Govdede")],
    Aciklama: ["2-3 Hafta Kulucka","Olum Bildirilmemistir"]
  },{
    Name: "Basiller Anjiyomatosis",
    Belirtiler: "Lezyon",
    Aciklama: ["Ozellikle Immunyetmezlikli Hastalarda Gorulur","Ic Organlarda da Gorulebilir","Lezyonlar Papul, Nodul, Tumoral Olusum Sirasini izler"]
  }],
  Vektor: "Insan Vucut Biti",
  VirualanFaktorler: [Aciklamali("Flagella","Unipolar")],
  Aciklama : ["Zorunlu Hucre Ici Degildir","Dunya Geneli Yaygindir"],
});
Bakteriler.push({
  AileAdi: "Bartonellaceae",
  CinsAdi: "Bartonella",
  TurAdi: "henselae",
  Gram: "Negative",
  Shape:  "Basil",
  Solunum: "Aerob",
  Hareket: Aciklamali("Hareketli","Titreyerek Hareket Ettigine Dair Veri Var"),
  KulturOrtami: [{
    Name: "Axenic Culture"
  }],
  Hastaliklar: [{
    Name: "Kedi Tirmigi Hastaligi",
    Belirtiler: ["Lenfadenopati","Ates"],
    Aciklama: ["Kedi Tirmalamasiyla Bulasir","Lenfanjit Gorulmez"]
  },{
    Name: "Basiller Anjiyomatosis",
    Belirtiler: "Lezyon",
    Aciklama: ["Ozellikle Immunyetmezlikli Hastalarda Gorulur","Ic Organlarda da Gorulebilir","Lezyonlar Papul, Nodul, Tumoral Olusum Sirasini izler"]
  }],
  Aciklama : ["Zorunlu Hucre Ici Degildir","Dunya Geneli Yaygindir"],
});
//B. Baciliformis Ekle


//Ehrlichia Anaplasma Neorickettsia ekle


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
    Name: "MacConkey",
  }],
  Direnc : ["Vankomisin","Kolistin"],
  VirualanFaktorler: [{Name: "Flagella", Aciklama: "Peritrichous"}],
  //Aciklama : [],
});

//Providencia Ekle


//Corynebacterium
Bakteriler.push({
  AileAdi: "Corynebacteriaceae",
  CinsAdi: "Corynebacterium",
  TurAdi: "diphtheria",
  Gram: "Positive",
  Shape:  "Basil",
  Solunum: "Aerob",
  Enzimler: ["Katalaz","Beta Hemoliz"],
  Hareket: "Hareketsiz",
  KulturOrtami: [{
    Name: "Kanli Agar",
    //Aciklama: []
  }, {
    Name: "Loeffler besiyeri",
    Aciklama: ["C. diphtheria icin secicidir","Tellurit Icerir"],
  }],
  Duyarlilik: ["Vankomisin"],
  Aciklama : ["Biyotipleri Alfa Hemoliz veya Beta Hemoliz Yapabilir","Bogaz Dokusunda Kolonize Olur","Invaze Olmaz","Dolasima Gecmez","Elek Testi","Toksin Sentezi ve Salgisi Icin Lizojenik Beta Fajina Sahip Olmasi Gerekir"],
});

//Listeria
Bakteriler.push({
  AileAdi: "Listeriaceae",
  CinsAdi: "Listeria",
  TurAdi: "monocytogenes",
  Gram: "Positive",
  Shape:  "Basil",
  Solunum: "Fakultatif_Anaerob",
  Enzimler: ["Katalaz","CAMP","Eskulin Hidroliz","Beta Hemoliz"],
  Hareket: [Aciklamali("Hareketli","22-28°C"),Aciklamali("Hareketsiz","37°C")],
  Antijenler: ["O","H"],
  KulturOrtami: [{
    Name: "Kanli Agar",
    Aciklama: ["Beta Hemoliz"]
  }],
  Duyarlilik: ["Vankomisin","Penisilin"],
  Bulasma: ["Kontamine Peynir Sebze","Transplasental","Dogum"],
  Aciklama : ["Listeria Turlerinden Sadece L. monocytogenes ve L. ivanovii Patojeniktir"],
});


/*
Bakteriler.push({
  AileAdi: "",
  CinsAdi: "",
  TurAdi: "",
  Gram: "",
  Shape:  "",
  Solunum: "",
  Enzimler: [],
  Hareket: "",
  Antijenler: [],
  KulturOrtami: [{
    Name: "",
    Gorunus: [],
    Aciklama: []
  }],
  Direnc : [],
  Duyarlilik: [],
  VirualanFaktorler: [],
  Aciklama : [],
});


*/
/*
Bakteriler.sort((a, b) => {
  let a1 = a.CinsAdi.toLowerCase();
  let b1 = b.CinsAdi.toLowerCase();
  if(a1 < b1) return -1;
  if(a1 > b1) return 1;
  if(a1 == b1) {
    if(typeof a.SubTur !== "undefined") {
      if(typeof b.SubTur !== "undefined") {
        return 0;
      } else {
        return -1;
      }
    }
    if(typeof b.SubTur !== "undefined") {
      if(typeof a.SubTur !== "undefined") {
        return 0;
      } else {
        return 1;
      }
    }
  }
});

*/
















