




for(let B of Bakteriler) {
  BakteriRouter(B);
  AddBacteriaToDisplay(B);//sadece isimler ve aileler
  BakteriRouterSearch(B);
}

IndexResolver(TheIndex);
IndexFamilies();
PremakeLeftPanel();

if(HaveNotification) {
  document.querySelector("#notificationCircle").style.display = "block";
}

if(Debug) {
  document.querySelector("#titleText").innerText += " (Debug)";
}

FilterRuleQueExec();

//asd
//SozlukBuilderStart();












