//Acinetobacter
Bakteriler.push({
  AileAdi: "Moraxellaceae",
  CinsAdi: "Acinetobacter",
  TurAdi: "baumannii",
  Gram: "Negative",
  Shape:  "Kokobasil",
  Solunum: "Aerob",
  Enzimler: ["Katalaz"],
  Hareket: "Hareketli",
  Antijenler: ["K"],
  KulturOrtami: [{
    Name: "MacConkey Agar",
    //Gorunus: [],
    //Aciklama: []
  }],
  Direnc : ["Vankomisin","Penisilin","1. Kusak Sefalosporin","2. Kusak Sefalosporin","Florokinolon"],
  Duyarlilik: ["Kolistin"],
  VirualanFaktorler: [Aciklamali("Fimbriya","Polar Fimbriya")],
  Aciklama : ["Saglikli Insanlarda 25% Ihtimalle Deride, 7% Ihtimalle Bogazda Bulunur"],
});