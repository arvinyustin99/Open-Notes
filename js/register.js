var wrongEmail = document.getElementById("wrong_email");
var wrongUser = document.getElementById("wrong_user");
var wrongPass = document.getElementById("wrong_msg");

var wrongRePass = document.getElementById("wrong_repass");

var inputEmail = document.getElementsByName("inputEmail")[0];
var inputUsername = document.getElementsByName("inputUsername")[0];
var inputRePass = document.getElementById("inputRePassword");
var inputPass = document.getElementById("inputPassword");

function validateUser(attr){
	var xmlHTTP = new XMLHttpRequest();
	xmlHTTP.open("POST", "../php/register.php", true);
	var form = new FormData();
	form.append("request_code", 1);
	form.append("attribute", attr);
	form.append("username", document.getElementsByName("inputUsername")[0].value);

	xmlHTTP.send(form);

	// response from back-end

}


function validatePassword(){
	return (inputPass.value.length > 8 && inputPass.value.length < 20);
}

function validateRetypePassword(){
	return (inputPass === inputRePass);
}

function submitRegister(doc, loc){
	inputPass.style.borderColor = "#DDDDDD";
	inputRePass.style.borderColor = "#DDDDDD";
	inputEmail.style.borderColor = "#DDDDDD";
	inputUsername.style.borderColor = "#DDDDDD";

	
	if (!validatePassword()){
		inputPass.style.borderColor = "#FF3232";
		alert("password length must be more than 8");
	}
	else if (!validateRetypePassword()){
		inputRePass.style.borderColor = "#FF3232";
		alert("password mismatch");
	}
	else{

		var xmlHTTP = new XMLHttpRequest();
		xmlHTTP.open("POST", "../php/register.php", true);
		var form = new FormData();
		form.append("request_code", 0);
		form.append("email", document.getElementsByName("inputEmail")[0].value);
		form.append("username", document.getElementsByName("inputUsername")[0].value);
		form.append("password", document.getElementsByName("inputPassword")[0].value);

		xmlHTTP.send(form);

		//response from back-end
	}

}
