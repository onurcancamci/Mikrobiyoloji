//Pseudomonas
Bakteriler.push({
  AileAdi: "Pseudomonadaceae",
  CinsAdi: "Pseudomonas",
  TurAdi: "aeruginosa",
  Gram: "Negative",
  Shape:  "Basil",
  Solunum: "Aerob",
  Enzimler: ["Katalaz","Oksidaz","Beta Hemoliz"],
  Hareket: "Hareketli",
  //Antijenler: [],
  KulturOrtami: [{
    Name: "MacConkey Agar",
    Gorunus: ["Sari Yesil"],
    //Aciklama: []
  }],
  Direnc : ["C390","Vankomisin"],
  Duyarlilik: ["Kolistin","Kotrimoksazol"],
  VirualanFaktorler: [Aciklamali("Flagella","Unipolar")],
  Aciklama : ["Fluoresent Grup","Firsatci Patojendirler"],
});