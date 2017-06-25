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