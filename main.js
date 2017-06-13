let mobilecheck = function() {
  var check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
};
let ifMobile = mobilecheck();
if (!Array.prototype.last){
    Array.prototype.last = function(){
        return this[this.length - 1];
    };
};

if ('addEventListener' in document) {
	document.addEventListener('DOMContentLoaded', function() {
		FastClick.attach(document.body);
	}, false);
}


let BottomPanelButtonActive = false;
let BottomPanelButton = function () {
  let panel = document.querySelector("#bottomPanel");
  if(!BottomPanelButtonActive) {
    //panel.style.top = 0;
    setTimeout(function () {
      panel.style.transform = "translateY(-100%)";
      panel.style.webkitTransform = "translateY(-100%)";
    }, 10);
    panel.style.display = "block";
  } else {
    panel.style.transform = "translateY(0)";
    panel.style.webkitTransform = "translateY(0)";
    setTimeout(function () {
      panel.style.display = "none";
    }, 200);
    
  }
  BottomPanelButtonActive = !BottomPanelButtonActive;
}



let leftPanelActive = false;
let leftPanelId;
let leftPanelBtn;
let leftPanelAnimating = false;
let ToggleBacteria = function(id,btn) {
  if(ifMobile) {//for mobile only
    if(leftPanelAnimating) return;
    if(!leftPanelActive) {
      leftPanelId = id;
      leftPanelBtn = btn;
      
      let B = Bakteriler.find(x => x.FamilyName == id.split("-")[0] && x.DiffName == id.split("-")[1]);
      
      let content = B._content;
      /*let content = document.createElement("div");
      content.className = "bakteri-content";
      for(field in B) {
        if(field == "HTML" || field[0] == "_") {
          continue;
        }
        let fieldInfoCard = GetInfoCard();
        let socket = GetInfoField(field + ": ");
        UnWrapField(B[field], socket);
        fieldInfoCard.appendChild(socket);
        content.appendChild(fieldInfoCard);
      }*/
      
      
      
      let lp = document.querySelector("#leftPanel");
      document.querySelector("#leftPanelSpan").innerText = B.FamilyName + " " + B.DiffName;
      lp.appendChild(content);
      lp.style.display = "block";
      setTimeout(function () {
        lp.style.transform = "translateX(101%)";
        lp.style.webkitTransform = "translateX(101%)";
        
      }, 10);
      
    } else {
      let lp = document.querySelector("#leftPanel");
      leftPanelAnimating = true;
      lp.style.transform = "translateX(0)";
      lp.style.webkitTransform = "translateX(0)";
      setTimeout(function () {
        let lp = document.querySelector("#leftPanel");
        lp.style.display = "none";
        document.querySelector("#invisiblePanel").appendChild(lp.querySelector(".bakteri-content"));
        leftPanelAnimating = false;
      }, 200);
    }
    leftPanelActive = !leftPanelActive;
  }
  
}






let GetInfoField = function (text, color = "blue-grey") {
  let card = document.createElement("div");
  card.className = `${color}-text text-darken-3 card-field`;
  card.innerText = text;
  return card;
}
let GetInfoCard = function (color = "grey", shade = "lighten-3") {
  let card = document.createElement("div");
  card.className = `card-panel ${color} ${shade} infoCard`;
  return card;
}
let GetTextCard = function (text, color = "orange") {
  let card = document.createElement("div");
  card.className = "card-panel grey lighten-4 textCard";
  card.innerHTML += `<span class="` + color + `-text text-darken-3">${text}</span>`;
  //console.log(`<span class="` + color + `-text text-darken-3">${text}</span>`);
  return card;
}
let GetSpan = function (text, color = "blue-grey") {
  let span = document.createElement("span");
  span.innerText = text;
  span.className = `${color}-text text-darken-3`;
  return span;
}








// B nin icine HTML i ekle
//{Name = "Yersinia", Bakteriler : [B,B,B], HTML : <>}
let Families = [];
let AddBacteriaToDisplay = function (B) {
  let btnHtml = `<div class="col s6" >
    <div class="card-panel aile-bakteri blue-grey darken-1" id="${B.FamilyName + "-" + B.DiffName}" onclick="ToggleBacteria(this.id,this)">
      <span class="white-text aile-bakteri-text">${B.FamilyName[0]}. ${B.DiffName}</span>
    </div>
  </div>`;
  
  let foundFamily = Families.find(x => x.Name == B.FamilyName);
  if(!foundFamily) {
    foundFamily = CreateFamily(B.FamilyName);
    let rowHtml = '<div class="row aile-row"></div>';
    foundFamily.HTML.innerHTML += rowHtml;
  }
  let row = foundFamily.HTML.querySelector(".row");
  row.innerHTML += btnHtml;
  B._HTML = `${B.FamilyName + "-" + B.DiffName}`;
  foundFamily.Bakteriler.push(B);
  
}


let CreateFamily = function (FamilyName) {
  let fHtml = `<div class="card-panel aile-panel grey lighten-3">
                   <div class="blue-grey-text text-darken-3 aile-isim">${FamilyName}</div>
               </div>`;
  let bp = document.querySelector("#bakteriPaneli");
  bp.innerHTML += fHtml;
  let family = {
    Name : FamilyName,
    Bakteriler : [],
    HTML : bp.querySelectorAll(".aile-panel")[bp.querySelectorAll(".aile-panel").length - 1]
  };
  Families.push(family);
  return family;
}



//filter menusu icin
let AddCategory = function (name) {
  let categoryDiv = document.createElement("div");
  categoryDiv.className = "card-panel grey lighten-4 filter-category";
  let nname = "";
  let names = name.split("-");
  for(n of names) {
    nname += Sozluk(n) + " - ";
  }
  nname = nname.slice(0,nname.length - 3);
  categoryDiv.innerText = nname + ":";
  let fec = document.createElement("div");
  fec.className = "filterElemanContainer";
  categoryDiv.appendChild(fec);
  
  document.querySelector("#filterCategoryContainer").appendChild(categoryDiv);
  
  return fec;
  
}
let AddEleman = function (name, socket, fieldName) {
  let div = document.createElement("div");
  div.className = "card-panel 0 orange-text text-darken-3 grey lighten-5";
  div.innerText = Sozluk(name);
  div.id = fieldName + "-" + name;
  div.onclick = function () {
    let status = this.className.split(" ")[1];
    status = parseInt(status);
    status = (status + 1) % 3;
    if(status == 0) {
      this.className = `card-panel ${status} orange-text text-darken-3 grey lighten-5`;
    } else if(status == 1) {
      this.className = `card-panel ${status} white-text green darken-2`;
    } else {
      this.className = `card-panel ${status} white-text red darken-4`;
    }
    FilterRule(this.id, status);
    
  }
  socket.appendChild(div);
  return div;
}

let ChangeStringAt = function(all, index, newstr) {
  let newall = "";
  all.split(" ").map((e,i,arr) => {
    if(i != index) {
      newall += e + " ";
    } else {
      newall += newstr + " ";
    }
  });
  newall.trim();
  return newall;
}
let StringRemoveAt = function(all, index) {
  let newall = "";
  all.split("-").map((e,i,arr) => {
    if(i != index) {
      newall += e;
    }
    if(i != arr.length - 1 && (index == arr.length - 1 && i != arr.length - 2 )) {
      newall += "-";
    }
  });
  newall.trim();
  return newall;
}
let StringRemoveLast = function(all) {
  return StringRemoveAt(all,all.split("-").length - 1);
}


let RightMenuActive = false;
let ToggleRightMenu = function () {
  let rm = document.querySelector("#rightPanel");
  if(!RightMenuActive) {
    rm.style.display = "block";
    setTimeout(function () {
      rm.style.transform = "translateX(-100%)";
      rm.style.webkitTransform = "translateX(-100%)";
    }, 10);
  } else {
    rm.style.transform = "translateX(0)";
    rm.style.webkitTransform = "translateX(0)";
    setTimeout(function () {
      rm.style.display = "none";
    }, 200);
  }
  RightMenuActive = !RightMenuActive;
}



document.querySelector("#searchBakteri").addEventListener("input", function (e) {
  let text = StringIngAlfabe(e.target.value).toLowerCase();
  for(B of Bakteriler) {
    //console.log(SearchIndex[B.FamilyName + "-" + B.DiffName]);
    if(SearchIndex[B.FamilyName + "-" + B.DiffName].findIndex((e,i,arr) => {
      if(e.includes(text)) {
        //console.log(e);
        return true;
      }
    }) == -1) {
      document.querySelector(`#${B._HTML}`).parentElement.style.display = "none";
    } else {
      document.querySelector(`#${B._HTML}`).parentElement.style.display = "block";
    }
  }
});





/*


document.addEventListener("touchmove", function(event){
    event.preventDefault();
});

let scrollingDivs = document.getElementsByClassName('scroll');

for(let scrollingDiv of scrollingDivs) {
  scrollingDiv.addEventListener('touchmove', function(event){
      event.stopPropagation();
  });
}*/













