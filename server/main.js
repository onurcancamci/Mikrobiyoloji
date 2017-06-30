
let {Loader, Bus} = require("./helpers.js");
let {Core} = require("./core.js");
let {Dil,Genelleme} = require("./language.js");

Loader.LoadBakteriler();
let core = new Core(Bakteriler, Genelleme, Dil, ["CinsAdi", "TurAdi", "SubTur"]);

Bus.Open();








