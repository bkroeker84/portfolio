/*
 * Handles the submit event of the survey form
 *
 * param e  A reference to the submit event
 * return   True if no validation errors; False if the form has validation errors
 */
function validate(e) {
	//	Hides all error elements on the page
	hideAllErrors();

	//	Determine if the form has errors
	if (formHasErrors()) {
		// 	Prevents the form from submitting
		e.preventDefault();
		return false;
	}
	return true;
}

/*
 * Does all the error checking for the form.
 *
 * return True if an error was found; False if no errors were found.
 */
function formHasErrors(){
    let hasErrors = false;
    let requiredFields = ["name", "phone", "email", "comments"];

    for (let i = 0; i < requiredFields.length; i++){
        let currentField = document.getElementById(requiredFields[i]);

        if(!formFieldHasInput(currentField)){
            document.getElementById(requiredFields[i] + "_error").style.display = "block";

            if (!hasErrors){
                currentField.focus();
                currentField.select();

                hasErrors = true;
            }
        }

        if (currentField == document.getElementById("phone") && formFieldHasInput(currentField)){

            console.log("Current field: " + requiredFields[i]);
            if (!isValidPhoneNumber(currentField.value)){
                document.getElementById(requiredFields[i] + "format_error").style.display = "block";

                if (!hasErrors){
                    currentField.focus();
                    currentField.select();
    
                    hasErrors = true;
                }
            }
        }

        if (currentField == document.getElementById("email") && formFieldHasInput(currentField)){
            console.log("Current field: " + currentField);
            console.log("Field ID: " + currentField.id);
            if (!isValidEmail(currentField.value)){
                document.getElementById(requiredFields[i] + "format_error").style.display = "block";

                if (!hasErrors){
                    currentField.focus();
                    currentField.select();
    
                    hasErrors = true;
                }
            }
        }
    }

    return hasErrors;
}

/*
 * Checks whether the specified phone number is valid.
 * param phoneNumber The phone number to validate.
 * return True if the phone number is valid; Otherwise, false.
 */
function isValidPhoneNumber(phoneNumber){
    let regex = new RegExp(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4}$/);

    phoneNumber = trim(phoneNumber);

    return regex.test(phoneNumber);
}

/*
 * Checks whether the specified email is valid.
 * param email The email to validate.
 * return True if the email is valid; Otherwise, false.
 */
function isValidEmail(email){
    let emailPattern = new RegExp(/^[\w\W]+@[\w\W]+\.[\w\W]{2,}$/);

    email = trim(email);

	return emailPattern.test(email);
}

/*
 * Handles the reset event for the form.
 *
 * param e A reference to the reset event
 * return  True allows the reset to happen; False prevents
 *         the browser from resetting the form.
 */
function resetForm(e) {
	// Confirm that the user wants to reset the form.
	if (confirm('Clear survey?')) {
		// Ensure all error fields are hidden
		hideAllErrors();

		// Set focus to the first text field on the page
		document.getElementById("name").focus();

		// When using onReset="resetForm()" in markup, returning true will allow
		// the form to reset
		return true;
	}

	// Prevents the form from resetting
	e.preventDefault();

	// When using onReset="resetForm()" in markup, returning false would prevent
	// the form from resetting
	return false;
}

/*
 * Resets (hides) all of the error messages on the page.
 */
function hideAllErrors() {
	let errorTags = document.getElementsByClassName("error");

	for(let i = 0; i < errorTags.length; i++){
		errorTags[i].style.display = "none";
	}
}

/*
 * Determines if a text field element has input
 *
 * param   fieldElement A text field input element object
 * return  True if the field contains input; False if nothing entered
 */
function formFieldHasInput(fieldElement) {
	let hasInput = true;
    console.log(fieldElement);
	// Check if the text field has a value
	if (fieldElement.value == null || trim(fieldElement.value) == "") {
		// Invalid entry
		hasInput = !hasInput;
	}

	// Valid entry
	return hasInput;
}

/*
 * Removes white space from a string value.
 *
 * Return a string with leading and trailing white space removed.
 */
function trim(str){
	return str.replace(/^\s+|\s+$/g, "");
}

/**
 * Handles the load event of the document.
 */
function load() {
	// Add event listener for the form submit
	document.getElementById("contact_form").addEventListener("submit", validate);

	// Reset the form using the default browser reset
	// This is done to ensure the radio buttons are unchecked when the page is refreshed
	// This line of code must be done before attaching the event listener for the customer reset
	document.getElementById("contact_form").reset();

	// Add event listener for our custom form submit function
	document.getElementById("contact_form").addEventListener("reset", resetForm);
}

document.addEventListener("DOMContentLoaded", load);