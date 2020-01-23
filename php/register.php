<?php
	include("dbAccess.php");
?>

<?php
	$dbconn = new DatabaseConnection("localhost", "adminON", "adminON", "opennotes");

	/* 	CHECK what type of request
		1 -> validation
		2 -> submission

		Check what attribute if VALIDATION
	*/
	$form = array();
	$form['status'] = 200;
	if ($_POST["request_code"] == 1){
		$type = "";

		if ($_POST["type"] == "username"){$type = "username";}
		else if ($_POST["type"] == "email"){$type = "email";}
		else {
			$form['status'] = 404;
			$form = json_encode($form);
			echo $form;
			exit();
		}

		$result = $dbconn->query("SELECT username FROM users WHERE ".$type." = '".$_POST['attribute']."'");

		$row = $result->fetch_assoc();

		if ($result->num_rows > 0){
			$form['status'] = 409;
		}
		$form = json_encode($form);
		echo $form;
	}
	else if ($_POST["request_code"] == 0){
		$result = $dbconn->query("INSERT INTO users (username, email, password) VALUES ('".$_POST['username']."', '".$_POST['email']."', '".$_POST['password']."');");

		if ($result == false){
			$form['status'] = 500;
		}
		$form = json_encode($form);
		echo $form;

	}
?>