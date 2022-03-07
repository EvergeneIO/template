import themeSwitcher from "./utils/theme_switch";

$(function () {
  $("#preloader").hide(500);
  $("svg#sun,svg#moon").on("click", themeSwitcher);
});
