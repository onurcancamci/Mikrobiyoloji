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
  //GecmistekiIlaclar: ["onur","goktug"],
  Aciklama : ["Listeria Turlerinden Sadece L. monocytogenes ve L. ivanovii Patojeniktir"],
});


Bakteriler.push({
  AileAdi: "Listeriaceae",
  CinsAdi: "Listeria",
  TurAdi: "ivanovii",
  Gram: "Positive",
  Shape:  "Basil",
  Solunum: "Fakultatif_Anaerob",
  Enzimler: ["Beta Hemoliz","Katalaz"],
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