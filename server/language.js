




//true false
let IndexFieldFilter = function (field, path) {
  if(Debug) {
    return true;
  }
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
let S2ENG = function (text) {

  if(Array.isArray(text)) {
  let arr = [];  
  for(let t of text) {
    arr.push(_S2ENG(t));
  }
  return arr;
    
  } else {
    return _S2ENG(text);
  }
  
  
}
let _S2ENG = function (text) {
  let ntext = "";
  for(let k = 0; k < text.length; k++) {
    if(text[k] == "ç") ntext += "c";
    else if(text[k] == "ö") ntext += "o";
    else if(text[k] == "ğ") ntext += "g";
    else if(text[k] == "ü") ntext += "u";
    else if(text[k] == "ş") ntext += "s";
    else if(text[k] == "ı") ntext += "i";
    else ntext += text[k];
  }
  return ntext;
}

let Dil = {
  Turkce : { 
    [`image`] : `Resim`,
    [`CinsAdi`] : `Cins`,
    [`Yersinia`] : `#`,
    [`TurAdi`] : `Tür`,
    [`AileAdi`]: `Aile`,
    [`Pestis`] : `#`,
    [`Gram`] : `#`,
    [`SubTur`]: `Alt Tür`,
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
    [`Enzimler`] : `Enzimler Ve Testler`,
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
let Sozluk = function (kelime, multiLanguage = false, language = "Turkce", Debug = false) {
  if(multiLanguage) {
    let arr = [];
    for(dict in Dil) {
      if(dict[0] == "_") continue;
      if((typeof dict[kelime] == "undefined" || dict[kelime] == "#" || Debug) && arr.findIndex(x => x == kelime) == -1) {
        arr.push(kelime);
      } else {
        arr.push(dict[kelime]);
      }
    }
    return arr;
  }
  let Dict = Dil[language];
  if(typeof Dict[kelime] == "undefined" || Dict[kelime] == "#" || Debug) {
    return kelime;
  }
  return Dict[kelime];
}
Dil._Sozluk = Sozluk;


//ya Array
//ya {Genelleme:[], ...}
let Genelleme = {
  ["Gentamisin"] : ["Antibiyotik", "Aminoglikozid", "Gentamisin"],
  ["K"] : {
    Aciklama: ["Kapsul Antijeni"],
  },
  [`Bircok Kultur`]: [`MacConkey Agar`,`Bircok Kultur`],
  [`Akdeniz Atesi`]: {
    [`Es Anlamli`]: [`Marsilya Atesi`, `Boutonneuse Fever`]
  },
}




module.exports = {Dil, Genelleme, S2ENG};









































