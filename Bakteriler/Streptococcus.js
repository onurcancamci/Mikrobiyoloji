//Streptococcus
Bakteriler.push({
  AileAdi: "Streptococcaceae",
  CinsAdi: "Streptococcus",
  TurAdi: "pyogenes",
  Gram: "Positive",
  Shape:  "Streptokok",
  Solunum: "Fakultatif_Anaerob",
  Enzimler: ["Beta Hemoliz","Pyrase"],
  Hareket: "Hareketsiz",
  Antijenler: ["Hucre Duvarinda A"],
  KulturOrtami: [{
    Name: "Kanli Agar",
    Gorunus: ["Beta Hemoliz"],
    //Aciklama: []
  }],
  //Direnc : [],
  Duyarlilik: ["Vankomisin", "Penisilin"],
  //VirualanFaktorler: [],
  Aciklama : ["Pyojenik Grup"],
});
Bakteriler.push({
  AileAdi: "Streptococcaceae",
  CinsAdi: "Streptococcus",
  TurAdi: "pneumoniae",
  Gram: "Positive",
  Shape:  "Diplokok",
  Solunum: "Fakultatif_Anaerob",
  Enzimler: ["Safrada Erir",Aciklamali("Alfa Hemoliz","Anaerobik Ortamda"),Aciklamali("Beta Hemoliz",["Aerobik Ortamda","?"])],
  Hareket: "Hareketsiz",
  //Antijenler: [],
  KulturOrtami: [{
    Name: "Kanli Agar",
    Gorunus: ["Alfa Hemoliz"],
    //Aciklama: []
  }],
  //Direnc : [],
  Duyarlilik: ["Optokin","Vankomisin"],
  //VirualanFaktorler: [],
  //Aciklama : [],
});