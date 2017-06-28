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
