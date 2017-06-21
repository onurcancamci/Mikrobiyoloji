



ConstructIndex();
for(let B of Bakteriler) {
  AddBacteriaToDisplay(B);//sadece isimler ve aileler
  BakteriRouterSearch(B);
}

ConstructBottomPanel();
IndexFamilies();
PremakeLeftPanel();

if(HaveNotification) {
  document.querySelector("#notificationCircle").style.display = "block";
}



FilterRuleQueExec();

//asd
//SozlukBuilderStart();












