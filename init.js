




for(let B of Bakteriler) {
  BakteriRouter(B);
  AddBacteriaToDisplay(B);//sadece isimler ve aileler
  BakteriRouterSearch(B);
}

IndexResolver(TheIndex);

PremakeLeftPanel();

if(HaveNotification) {
  document.querySelector("#notificationCircle").style.display = "block";
}


//SozlukBuilderStart();












