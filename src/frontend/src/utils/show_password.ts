export default function showPassword(this: JQuery<Document>) {
  if ($(this).attr("id") === "on") {
    $("svg#on").hide();
    $("svg#off").show();
  } else {
    $("svg#off").hide();
    $("svg#on").show();
  }
  $("input.password").attr("type", $("input#password").attr("type") === "password" ? "text" : "password");
}
