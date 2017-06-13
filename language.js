


let IndexFieldFilterObj = {
  ["Name"] : false,
  ["Aciklama"] : false,
  //["DiffName"] : false,
  
};
let IndexPathFilterObj = {
  
  
};
let DisplayLanguage = "Turkce";//Turkce


//true false
let IndexFieldFilter = function (field, path) {
  let fieldPass = true;
  let pathPass = true;
  if(field == undefined || typeof IndexFieldFilterObj[field] == "undefined") {
    fieldPass = true;
  } else {
    fieldPass = IndexFieldFilterObj[field];
  }
  if(path == undefined || typeof IndexPathFilterObj[path] == "undefined") {
    pathPass = true;
  } else {
    pathPass = IndexPathFilterObj[path];
  }
  return fieldPass && pathPass;
}


let Dil = {
  Turkce : { 
    [`FamilyName`] : `Aile`,
    [`Yersinia`] : `#`,
    [`DiffName`] : `İsim`,
    [`Pestis`] : `#`,
    [`Gram`] : `#`,
    [`Negative`] : `Negatif`,
    [`Shape`] : `Şekli`,
    [`Kokobasil`] : `#`,
    [`Aciklama`] : `Açıklama`,
    [`Kutupsal Boyanma`] : `#`,
    [`Kucuk`] : `Küçük`,
    [`Vektor`] : `#`,
    [`Kemirici Piresi`] : `#`,
    [`Hastaliklar`] : `Hastalıklar`,
    [`Bubonik Veba`] : `#`,
    [`Name`] : `Isim`,
    [`Belirtiler`] : `#`,
    [`Ates`] : `Ateş`,
    [`Lenf Bezi Sismesi`] : `Lenf Bezi Şişmesi`,
    [`Agri`] : `Ağrı`,
    [`Fistulize Gangliyon`] : `Fistülize Gangliyon`,
    [`Olumcul`] : `Ölümcül`,
    [`Yuksek ates ve sisligin ani basladigi tek infeksiyon`] : `#`,
    [`Akciger Vebasi`] : `Akciğer Vebasi`,
    [`Oksuruk`] : `Öksürük`,
    [`Nefes Darligi`] : `Nefes Darlığı`,
    [`Siyanoz`] : `#`,
    [`Balgam`] : `#`,
    [`Kanli Balgam`] : `Kanlı Balgam`,
    [`Primer : Solunum yoluyla bulasma\nSekonder : Bubonik Vebanin akcigere ulasmasi`] : `#`,
    [`Veba septisemisi, menenjit`] : `#`,
    [`Bulanti`] : `Bulantı`,
    [`Kusma`] : `#`,
    [`Bilinc Kaybi`] : `Bilinç Kaybı`,
    [`Antijenler`] : `#`,
    [`VW`] : `#`,
    [`F1`] : `#`,
    [`Bulasma`] : `Bulaşma`,
    [`Pire Isirmasi`] : `Pire Isırması`,
    [`Solunum Yolu`] : `#`,
    [`Solunum`] : `#`,
    [`Fakultatif_Anaerob`] : `Fakültatif Anaerob`,
    [`KulturOrtami`] : `Kültür Ortamı`,
    [`Bircok Kultur`] : `Birçok Kültür`,
    [`Gorunus`] : `Görünüş`,
    [`Sahanda Yumurta`] : `#`,
    [`Duyarlilik`] : `Duyarlılık`,
    [`Streptomisin`] : `#`,
    [`Gentamisin`] : `#`,
    [`Tetrasiklin`] : `#`,
    [`Doksisiklin`] : `#`,
    [`Siprofloksasin`] : `#`,
    [`Kloramfenikol`] : `#`,
    [`Tedavi`] : `#`,
    [`Antibiyotik`] : `#`,
    [`Enterocolitica`] : `#`,
    [`Basil`] : `Çomak`,
    [`Aerob_Ve_Fakultatif_Anaerob`] : `Aerob Ve Fakültatif Anaerob`,
    [`Sogukta Urer (+4°C)`] : `#`,
    [`22°C de Hareketli`] : `#`,
    [`Kan Bankalarinda Depolanan Kanda Cogalabilir`] : `#`,
    [`Tedavide Antibiyoterapi onerilmez, Gerekmesi yada Septisemi Disinda`] : `#`,
    [`Enzimler`] : `#`,
    [`Ureaz`] : `#`,
    [`O`] : `#`,
    [`H`] : `#`,
    [`WH`] : `#`,
    [`Gastroenterit`] : `#`,
    [`Ishal`] : `Ishal`,
    [`Karin Agrisi`] : `Karın Ağrısı`,
    [`Mezenterik Lenf Adenit`] : `#`,
    [`CIN Agar`] : `#`,
    [`Bogagozu Koloni`] : `#`,
    [`Kanli Agar`] : `Kanlı Agar`,
    [`3.Kusak Sefalosporin`] : `#`,
    [`TMP-SMX`] : `#`,
    [`Su`] : `#`,
    [`Oral`] : `#`,
    [`Hasta`] : `#`,
    [`Kontamine Besin`] : `#`,
  } 
}
let Dict = Dil[DisplayLanguage];
let Sozluk = function (kelime) {
  if(typeof Dict[kelime] == "undefined" || Dict[kelime] == "#") {
    return kelime;
  }
  return Dict[kelime];
}



//ya Array
//ya {Genelleme:[], ...}
let Genelleme = {
  ["Gentamisin"] : ["Antibiyotik", "Aminoglikozid", "Gentamisin"],
  ["K"] : {
    Aciklama: ["Kapsul Antijeni"]
  }
}


















let SBS; //bitince sonuna } ekle
let NDict = {};
let SozlukBuild = function (kelime) {
  if(!SBS) {
    SBS = `${DisplayLanguage} : { \n`;
  }
  if(typeof NDict[kelime] != "undefined") {
    return;
  }
  if(typeof Dict[kelime] != "undefined") {
    SBS += `[\`${kelime}\`] : \`${Dict[kelime]}\`,\n`;
    NDict[kelime] = Dict[kelime];
  } else {
    let sonuc = prompt(kelime,"#");
    NDict[kelime] = sonuc;
    SBS += `[\`${kelime}\`] : \`${sonuc}\`,\n`;
  }
}



























