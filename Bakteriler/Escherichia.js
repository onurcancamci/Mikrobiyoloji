//Escherichia
Bakteriler.push({
  AileAdi: "Enterobacteriaceae",
  CinsAdi: "Escherichia",
  TurAdi: "coli",
  Gram: "Negative",
  Shape:  "Basil",
  Solunum: "Fakultatif_Anaerob",
  Enzimler: ["Indol","Katalaz","Mannitol","Hemolizin",Aciklamali("Laktoz","Salmonella Ve Shigella dan ayirir"),Aciklamali("Sakkaroz","Bazen")],
  Hareket: ["Hareketli","Hareketsiz"],
  //?Kapsul: Aciklamali("Kapsullu","Bazilari"),
  Antijenler: ["O","K","H","P"],
  KulturOrtami: [{
    Name: "MacConkey Agar",
    Gorunus: ["S tipi"],
    Aciklama: ["Kapsullu olanlar M tipi"]
  }],
  Direnc : "Vankomisin",
  Duyarlilik: "Kolistin",
  VirualanFaktorler: ["Endotoksin",{Name: "Flagella", Aciklama: "Peritrichous"}],
  Hastaliklar: [{
    Name: "Idrar Yolu Enfeksiyonu",
  }, {
    Name: "Barsak Enfeksiyonlari",
  }, {
    Name: "Septisemi",
  }, {
    Name: "Menenjit",
  }, {
    Name: "Pnomoni",
  }],
  Aciklama : ["Normal Florada Bulunur","Nitrat Reduksiyonu Yapar","Bazi suslari kapsullu olabilir"],
});
