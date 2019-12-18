document.getElementById("form_button").addEventListener("click", submitLogin, false);

function submitLogin(){
	var xmlHTTP = new XMLHttpRequest();
	xmlHTTP.open("POST", "../php/login.php", true);
	var form = new FormData();
	form.append("username", document.getElementsByName("username")[0].value);
	form.append("password", document.getElementsByName("password")[0].value);
	/*console.log(form.get("username"));
	console.log(form.get("password"));*/
	xmlHTTP.send(form);

	var result = "";

	xmlHTTP.onload = function(){
		result = JSON.parse(xmlHTTP.responseText);
	}
}