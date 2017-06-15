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
  TurAdi : "Pestis",
  
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
  TurAdi : "Enterocolitica",
  
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
  TurAdi: "Pneumoniae",
  SubTur: "pneumoniae",
  
  Gram: "Negative",
  Shape:  "Basil",
  Solunum: "Fakultatif_Anaerob",
  Enzimler: ["Laktaz","Ureaz","Sitrat","VP?","Katalaz"],
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
  TurAdi: "Pneumoniae",
  SubTur: "ozaenae",
  
  Gram: "Negative",
  Shape:  "Basil",
  Solunum: "Aerob_Ve_Fakultatif_Anaerob",
  Enzimler: ["Katalaz"],
  Hareket: "Hareketsiz",
  Kapsul: "Kapsullu",
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
  TurAdi: "Granulomatis",
  
  Gram: "Negative",
  Shape:  "Basil",
  Kapsul: "Kapsullu",
  Hareket: "Hareketsiz",
  KulturOrtami: [{
    Name: "Monosit Kultur Sistemi",
    Aciklama: ["Hucresiz Ortamda Uretilemez"],
  }],
  Aciklama : ["Cinsel Yolla Bulasir","Burda Yeterince Bilgi Henuz Yok"],
});
Bakteriler.push({
  AileAdi: "Enterobacteriaceae",
  CinsAdi: "Klebsiella",
  TurAdi: "Variicola",
  
  Gram: "Negative",
  Shape:  "Basil",
  Solunum: "Aerob_Ve_Fakultatif_Anaerob",
  Enzimler: ["Katalaz","Laktaz","Ureaz"],
  Hareket: "Hareketsiz",
  Kapsul: "Kapsullu",
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
  TurAdi: "Oxytoca",
  
  Gram: "Negative",
  Shape:  "Basil",
  Solunum: "Fakultatif_Anaerob",
  Enzimler: ["Katalaz","Laktaz","Ureaz","Tryptophanase"],
  Hareket: "Hareketsiz",
  Kapsul: "Kapsullu",
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
  TurAdi: "Aerogenes",
  
  Gram: "Negative",
  Shape:  "Basil",
  Solunum: "Fakultatif_Anaerob",
  Enzimler: ["Katalaz","Laktaz","Ornitin Dekarboksilaz"],
  Hareket: "Hareketli",
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
  TurAdi: "Cloacae",
  
  Gram: "Negative",
  Shape:  "Basil",
  Solunum: "Fakultatif_Anaerob",
  Enzimler: ["Katalaz","Laktaz","Ornitin Dekarboksilaz",{Name: "Ureaz", Aciklama:"65%"}],
  Hareket: "Hareketli",
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
  TurAdi: "Marcescens",
  
  Gram: "Negative",
  Shape:  "Kokobasil",
  Solunum: "Fakultatif_Anaerob",
  Enzimler: ["Katalaz","Dnaz","Lipaz","Gelatinaz"],
  Hareket: "Hareketli",
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
  TurAdi: "Rubidaea",
  
  Gram: "Negative",
  Shape:  "Kokobasil",
  Solunum: "Fakultatif_Anaerob",
  Enzimler: ["Katalaz","Laktaz","Dnaz","Lipaz","Gelatinaz"],
  Hareket: "Hareketli",
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
  TurAdi: "Koseri",
  
  Gram: "Negative",
  Shape:  "Basil",
  Solunum: "Aerob_Ve_Fakultatif_Anaerob",
  Enzimler: ["Katalaz","Laktaz","Tryptophanase"],
  Hareket: "Hareketli",
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
  TurAdi: "Freundii",
  
  Gram: "Negative",
  Shape:  "Basil",
  Solunum: "Fakultatif_Anaerob",
  Enzimler: ["Katalaz","Laktaz"],
  Hareket: "Hareketli",
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
  TurAdi: "Prowazekii",
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
  TurAdi: "Typhi",
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
  TurAdi: "Rickettsii",
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
















