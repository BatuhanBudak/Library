export const customFormValidation = (() => {
  const forms = document.querySelectorAll(".validate");
  for (var i = 0; i < forms.length; i++) {
    forms[i].setAttribute("novalidate", true);
  }

  let hasError = function (field) {
    if (
      field.disabled ||
      field.type === "file" ||
      field.type === "reset" ||
      field.type === "submit" ||
      field.type === "button"
    )
      return;

    let validity = field.validity;

    if (field.id === "readPages") {
      if (
        Number(document.getElementById("totalPages").value) <
        Number(field.value)
      ) {
        return "Read pages cannot be bigger than the total pages";
      }
      if (validity.valid) return;
    }
    if (field.id === "edit-book-readPages") {
      if (
        Number(document.getElementById("edit-book-totalPages").value) <
        Number(field.value)
      ) {
        return "Read pages cannot be bigger than the total pages";
      }
      if (validity.valid) return;
    }

    if (validity.valid) return;

    // If field is required and empty
    if (validity.valueMissing) return "Please fill out this field.";

    if (validity.tooShort)
      return (
        "Please lengthen this text to " +
        field.getAttribute("minLength") +
        " characters or more. You are currently using " +
        field.value.length +
        " characters."
      );

    // If too long
    if (validity.tooLong)
      return (
        "Please short this text to no more than " +
        field.getAttribute("maxLength") +
        " characters. You are currently using " +
        field.value.length +
        " characters."
      );

    // If number input isn't a number
    if (validity.badInput) return "Please enter a number.";

    // If a number field is over the max
    if (validity.rangeOverflow)
      return (
        "Please select a value that is no more than " +
        field.getAttribute("max") +
        "."
      );

    // If a number field is below the min
    if (validity.rangeUnderflow)
      return (
        "Please select a value that is no less than " +
        field.getAttribute("min") +
        "."
      );

    // If pattern doesn't match
    if (validity.patternMismatch) return "Please match the requested format.";

    // If all else fails, return a generic catchall error
    return "The value you entered for this field is invalid.";
  };

  const showError = function (field, error) {
    // Add error class to field
    field.classList.add("error");

    // Get field id or name
    let id = field.id || field.name;
    if (!id) return;

    // Check if error message field already exists
    // If not, create one
    let message = field.form.querySelector(".error-message#error-for-" + id);
    if (!message) {
      message = document.createElement("div");
      message.className = "error-message";
      message.id = "error-for-" + id;
      field.parentNode.insertBefore(message, field.nextSibling);
    }

    // Add ARIA role to the field
    field.setAttribute("aria-describedby", "error-for-" + id);

    // Update error message
    message.textContent = error;

    // Show error message
    message.style.display = "block";
    message.style.visibility = "visible";
  };

  const removeError = function (field) {
    // Remove error class to field
    field.classList.remove("error");

    // Remove ARIA role from the field
    field.removeAttribute("aria-describedby");

    // Get field id or name
    let id = field.id || field.name;
    if (!id) return;

    // Check if an error message is in the DOM
    let message = field.form.querySelector(
      ".error-message#error-for-" + id + ""
    );
    if (!message) return;

    // If so, hide it
    message.textContent = "";
    message.style.display = "none";
    message.style.visibility = "hidden";
  };

  const checkForErrors = (form) => {
    // Get all of the form elements
    let fields = form.elements;

    // Validate each field
    // Store the first field with an error to a variable so we can bring it into focus later
    let error, hasErrors;
    for (let i = 0; i < fields.length; i++) {
      error = hasError(fields[i]);
      if (error) {
        showError(fields[i], error);
        if (!hasErrors) {
          hasErrors = fields[i];
        }
      }
    }
    return hasErrors;
  };

  document.addEventListener(
    "blur",
    function (event) {
      if (!event.target.form) return;
      if (!event.target.form.classList.contains("validate")) return;

      // Validate the field
      let error = hasError(event.target);

      if (error) {
        showError(event.target, error);
        return;
      }
      removeError(event.target);
    },
    true
  );
  return { hasError, showError, checkForErrors };
})();
