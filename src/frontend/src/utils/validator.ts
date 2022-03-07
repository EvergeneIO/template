export default function validator(this: JQuery<Document>) {
  const regex =
    $(this).attr("id") === "username"
      ? /^(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/
      : /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  let message;
  const button = $("button#submit");

  if (!$(this).val()) {
    button.addClass("disabled, cursor-not-allowed");
    $(this).addClass("is-invalid");
    return toastr["error"](`${$(this).attr("name")} is required`, "Error");
  }

  if (typeof $(this).val() !== "string") {
    button.addClass("disabled, cursor-not-allowed");
    $(this).addClass("is-invalid");
    return toastr["error"](`${$(this).attr("name")} has an invalid type`, "Error");
  }

  $(this).attr("id") === "username"
    ? (message = "username may only contain [A-Z, a-z, 0-9, _, .], the ending may not be [_ or .]")
    : null;
  $(this).attr("id") === "email" ? (message = "email is not a valid email") : null;
  if ($(this).attr("id") === "username" || $(this).attr("id") === "email") {
    if (!regex.test($(this).val().toString())) {
      button.addClass("disabled, cursor-not-allowed");
      $(this).addClass("is-invalid");
      return toastr["error"](message, "Error");
    }
  }

  if ($(this).attr("id") === "username") {
    if ($(this).val().toString().length < 3 || $(this).val().toString().length > 32) {
      button.addClass("disabled, cursor-not-allowed");
      $(this).addClass("is-invalid");
      return toastr["error"](`${$(this).attr("name")} characters length must be between 3-32`, "Error");
    }
  }

  if ($(this).attr("id") === "password") {
    if ($(this).val().toString().length < 8 || $(this).val().toString().length > 63) {
      button.addClass("disabled, cursor-not-allowed");
      $(this).addClass("is-invalid");
      return toastr["error"](`${$(this).attr("name")} characters length must be between 8-63`, "Error");
    }
  }

  if ($(this).attr("id") === "checkPassword") {
    if ($(this).val() !== $("input#password").val()) {
      button.addClass("disabled, cursor-not-allowed");
      $(this).addClass("is-invalid");
      return toastr["error"](`passwords do not match`, "Error");
    }
  }

  button.removeClass("disabled, cursor-not-allowed");
  $(this).removeClass("is-invalid");
  $(this).addClass("is-valid");
}
