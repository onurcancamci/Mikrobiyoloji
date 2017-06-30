
//bu dosya sayfaya ekli degildir is yapmaz
//yazim olarak hatalidir sadece kopyala yapistir amaclidir

Bakteriler.push({
  AileAdi: "",
  CinsAdi: "",
  TurAdi: "",
  Gram: "Negative","Positive",
  Shape:  "Basil","Kokobasil","Kok","Spiral","Diplokok","Streptokok","Stafilokok",//baska olanlar eklenir
  
  
  Solunum: "Fakultatif_Anaerob","Aerob_Ve_Fakultatif_Anaerob","Anaerob","Aerob",
  
  Enzimler: "Katalaz","Oksidaz","Laktoz","Beta Hemoliz","Alfa Hemoliz","Beta Laktamaz","Indol",
            "Lesitinaz","CAMP","Ornitin Dekarboksilaz","Ureaz","Mannitol","Hemolizin"
            
  Hareket: "Hareketli","Hareketsiz",
  
  Antijenler: "O","H","S","K","P","VW","F1","WH",
  
  KulturOrtami: [{
    Name: "MacConkey Agar","Jeloz Besiyeri","Axenic Culture","Asdown Agar","Kanli Agar",
            "Loeffler Besiyeri","Cukulatali Agar","Monosit Kultur Sistemi","Basit Besiyeri",
            "Bircok Kultur","CIN Agar",
    Gorunus: [],
    Aciklama: []
  }],
  Direnc : "Vankomisin","Kolistin","Penisilin","Lesitinaz",... //cok var
  Duyarlilik: [],
  VirualanFaktorler: "Fimbriya","Endospor","Flagella","Toksin","Endotoksin","Sideroforlar","Pili",
                      Aciklamali("Flagella","Unipolar"),Aciklamali("Flagella","Peritrichous"),
  Aciklama : [],
});

Bakteriler.push({
  AileAdi: "",
  CinsAdi: "",
  TurAdi: "",
  Gram: "",
  Shape:  "",
  Solunum: "",
  Enzimler: [],
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


















