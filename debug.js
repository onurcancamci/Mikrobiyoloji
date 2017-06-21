

DebugEnabled.push(() => {
  ConstructIndex();
  ConstructBottomPanel();
  document.querySelector("#filterCategoryIndex1").style.display = "none";
  document.querySelector("#filterCategoryIndex2").style.display = "none";
});
DebugDisabled.push(() => {
  ConstructIndex();
  ConstructBottomPanel();
  document.querySelector("#filterCategoryIndex1").style.display = "block";
  document.querySelector("#filterCategoryIndex2").style.display = "block";
});

























