export default function themeSwitcher(this: JQuery<Document>) {
  if ($(this).attr("id") === "sun") {
    $(this).hide();
    $("svg#moon").show();
    $("#logo").css("background-color", "red");
    $("body").toggleClass("theme-dark");
  } else {
    $(this).hide();
    $("svg#sun").show();
    $("#logo").css("background-color", "rgba(0, 0, 0, 0)");
    $("body").toggleClass("theme-dark");
  }
}
