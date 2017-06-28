//Burkholderia
Bakteriler.push({
  AileAdi: "Burkholderiaceae",
  CinsAdi: "Burkholderia",
  TurAdi: "pseudomallei",
  Gram: "Negative",
  Shape:  "Basil",
  Solunum: "Aerob",
  Enzimler: ["Katalaz","Oksidaz"],
  Hareket: "Hareketli",
  //Antijenler: [],
  KulturOrtami: [{
    Name: "Asdown Agar",
    Gorunus: ["Cornflower Head Morphology"],
    Aciklama: ["Secici Agar"]
  }, {
    Name: "MacConkey Agar",
  }],
  Direnc : ["Kolistin"],
  //Duyarlilik: [],
  VirualanFaktorler: [Aciklamali("Fimbriya","Polar Fimbriya")],
  //Aciklama : [],
});
