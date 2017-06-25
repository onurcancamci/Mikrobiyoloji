



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


