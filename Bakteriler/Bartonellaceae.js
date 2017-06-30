//Bartonella
Bakteriler.push({
  AileAdi: "Bartonellaceae",
  CinsAdi: "Bartonella",
  TurAdi: "quintana",
  Gram: "Negative",
  Shape:  "Basil",
  Solunum: "Aerob",
  Hareket: "Hareketli",
  KulturOrtami: [{
    Name: "Axenic Culture"
  }],
  Hastaliklar: [{
    Name: "Siper Atesi",
    Belirtiler: [Aciklamali("Ates",["5 Gunde Bir Yukselir","Ani Ates"]),Aciklamali("Agri","Post Orbital, Tibia Ustunde ve Uzun Kemiklerde"),
                  Aciklamali("Dokuntuler","Ozellikle Govdede")],
    Aciklama: ["2-3 Hafta Kulucka","Olum Bildirilmemistir"]
  },{
    Name: "Basiller Anjiyomatosis",
    Belirtiler: "Lezyon",
    Aciklama: ["Ozellikle Immunyetmezlikli Hastalarda Gorulur","Ic Organlarda da Gorulebilir","Lezyonlar Papul, Nodul, Tumoral Olusum Sirasini izler"]
  }],
  Vektor: "Insan Vucut Biti",
  VirualanFaktorler: [Aciklamali("Flagella","Unipolar")],
  Aciklama : ["Zorunlu Hucre Ici Degildir","Dunya Geneli Yaygindir"],
});
Bakteriler.push({
  AileAdi: "Bartonellaceae",
  CinsAdi: "Bartonella",
  TurAdi: "henselae",
  Gram: "Negative",
  Shape:  "Basil",
  Solunum: "Aerob",
  Hareket: Aciklamali("Hareketli","Titreyerek Hareket Ettigine Dair Veri Var"),
  KulturOrtami: [{
    Name: "Axenic Culture"
  }],
  Hastaliklar: [{
    Name: "Kedi Tirmigi Hastaligi",
    Belirtiler: ["Lenfadenopati","Ates"],
    Aciklama: ["Kedi Tirmalamasiyla Bulasir","Lenfanjit Gorulmez"]
  },{
    Name: "Basiller Anjiyomatosis",
    Belirtiler: "Lezyon",
    Aciklama: ["Ozellikle Immunyetmezlikli Hastalarda Gorulur","Ic Organlarda da Gorulebilir","Lezyonlar Papul, Nodul, Tumoral Olusum Sirasini izler"]
  }],
  Aciklama : ["Zorunlu Hucre Ici Degildir","Dunya Geneli Yaygindir"],
});