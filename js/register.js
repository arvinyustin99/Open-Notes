var wrongEmail = document.getElementById("wrong_email");
var wrongUser = document.getElementById("wrong_user");
var wrongPass = document.getElementById("wrong_msg");

var wrongRePass = document.getElementById("wrong_repass");

var inputEmail = document.getElementsByName("inputEmail")[0];
var inputUsername = document.getElementsByName("inputUsername")[0];
var inputRePass = document.getElementById("inputRePassword");
var inputPass = document.getElementById("inputPassword");

var accepted = true;

function validateUser(type, attr, border, acc){
	var xmlHTTP = new XMLHttpRequest();
	xmlHTTP.open("POST", "../php/register.php", true);
	var form = new FormData();
	form.append("request_code", 1);
	form.append("type", type);
	form.append("attribute", attr);

	xmlHTTP.send(form);
	var result = "";
	// response from back-end
	xmlHTTP.onload = function(){
		result = JSON.parse(xmlHTTP.responseText);
		
		if (result['status'] != 200) {
			border.style.borderColor = "#FF3232";
			acc = acc & false;
		}
	}
}


function validatePassword(acc){
	if (inputPass.value.length < 8 || inputPass.value.length > 20){
		inputPass.style.borderColor = "#FF3232";
		acc = acc & false;
	}
}

function validateRetypePassword(acc){
	if (inputPass.value != inputRePass.value){
		inputRePass.style.borderColor = "#FF3232";
		acc = acc & false;
	}
}

function submitRegister(doc, loc){
	inputPass.style.borderColor = "#DDDDDD";
	inputRePass.style.borderColor = "#DDDDDD";
	inputEmail.style.borderColor = "#DDDDDD";
	inputUsername.style.borderColor = "#DDDDDD";
	accepted = true;
	validateUser("email", inputEmail.value, inputEmail, accepted);
	validateUser("username", inputUsername.value, inputUsername, accepted);
	validatePassword(accepted);
	validateRetypePassword(accepted);
	if (accepted){
		var xmlHTTP = new XMLHttpRequest();
		xmlHTTP.open("POST", "../php/register.php", true);
		var form = new FormData();
		form.append("request_code", 0);
		form.append("email", document.getElementsByName("inputEmail")[0].value);
		form.append("username", document.getElementsByName("inputUsername")[0].value);
		form.append("password", document.getElementsByName("inputPassword")[0].value);

		xmlHTTP.send(form);

		//response from back-end
		xmlHTTP.onload = function(){
			var result = JSON.parse(xmlHTTP.responseText);
			if (result['status'] == 200){
				loc.href = "home.html";
			}
			else{
				loc.href = "register.html";
			}
		}
	}

}
