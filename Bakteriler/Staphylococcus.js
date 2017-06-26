//Staphylococcus
Bakteriler.push({
  AileAdi: "Staphylococcaceae",
  CinsAdi: "Staphylococcus",
  TurAdi: "aureus",
  Gram: "Positive",
  Shape:  Aciklamali("Stafilokok","Uzum Salkimi Goruntusu"),
  Solunum: "Fakultatif_Anaerob",
  Enzimler: ["Katalaz","Beta Hemoliz","Staphaurex","Koagulaz","DNAaz"],
  Hareket: "Hareketsiz",
  //Antijenler: [],
  KulturOrtami: [{
    Name: "Kanli Agar",
    Gorunus: ["Beta Hemoliz Yapar"],
    //Aciklama: []
  }, {
    Name: "Basit Besiyeri",
  }, {
    Name: "MacConkey Agar",
  }],
  //Direnc : [],
  //Duyarlilik: [],
  //VirualanFaktorler: [],
  Aciklama : ["Altin Sarisi Pigmenti Vardir","Sporsuz Bakteriler Icinde En Dayaniklilarindandir","Henuz Yeterli Bilgi Yok"],
});
