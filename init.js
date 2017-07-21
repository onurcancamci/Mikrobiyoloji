



ConstructIndex(); //non ui
for(let B of Bakteriler) {
  AddBacteriaToDisplay(B);//sadece isimler ve aileler //only ui with variables
  BakteriRouterSearch(B); //non ui +
}

ConstructBottomPanel(); //only ui with variables
IndexFamilies(); //non ui
PremakeLeftPanel(); //only ui

if(HaveNotification) {
  document.querySelector("#notificationCircle").style.display = "block";
}



FilterRuleQueExec(); //sayi vs icin //non ui

//asd
//SozlukBuilderStart();












