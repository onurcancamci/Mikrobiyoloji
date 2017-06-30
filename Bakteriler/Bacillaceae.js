//Bacilius
Bakteriler.push({
  AileAdi: "Bacillaceae",
  CinsAdi: "Bacillus",
  TurAdi: "anthracis",
  Gram: "Positive",
  Shape:  "Basil",
  Solunum: "Aerob_Ve_Fakultatif_Anaerob",
  Enzimler: ["Katalaz"],
  Hareket: "Hareketsiz",
  Antijenler: ["K"],
  KulturOrtami: [{
    Name: "Jeloz Besiyeri",
    Gorunus: ["R tipi"],
    Aciklama: "Kapsullu olanlarda mukoid gorunum"
  }],
  Duyarlilik: ["Penisilin","Vankomisin","Lesitinaz"],
  VirualanFaktorler: ["Endospor"],
  Hastaliklar: [{
    Name: "Deri Sarbonu",
  }, {
    Name: "Akciger Sarbonu",
  }],
  Aciklama : ["Sadece virulan suslarin kapsulu var"],
});
Bakteriler.push({
  AileAdi: "Bacillaceae",
  CinsAdi: "Bacillus",
  TurAdi: "cereus",
  Gram: "Positive",
  Shape:  "Basil",
  Solunum: "Aerob_Ve_Fakultatif_Anaerob",
  Enzimler: ["Katalaz","Beta Hemoliz","Beta Laktamaz"],
  Hareket: "Hareketli",
  //Antijenler: [""],
  KulturOrtami: [{
    Name: "Jeloz Besiyeri",
    Gorunus: ["S tipi"],
    Aciklama: ["Ilk izolasyonda kanli besiyeri"]
  }],
  Direnc : ["Penisilin"],
  Duyarlilik: ["Vankomisin","Lesitinaz"],
  VirualanFaktorler: ["Endospor"],
  Aciklama : ["Jelatin hidrolizi yapar","Fenil Etil Alkolde Urer","Findik Fareleri Icin Patojen Degil"],
});