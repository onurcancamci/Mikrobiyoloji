

let idInd = {};
for(let B of Bakteriler) {
  let id = GetBakteriID(B);
  if(typeof idInd[id] === "undefined") {
    idInd[id] = true;
  } else {
    alert(`Bakteri ${id} daha once ekli`);
  }
}






















