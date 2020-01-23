<?php
	include("dbAccess.php");
?>

<?php
	$dbconn = new DatabaseConnection("localhost", "adminON", "adminON", "opennotes");

	$result = $dbconn->query("SELECT user_id, username, password FROM users WHERE username ='". $_POST['username']."'");

	// If successful, the return will result only 1 row of data
	$row = $result->fetch_assoc();

	$results = array();
	$results['status'] = 500;
	$results['cookie'] = '';

	// Check whether the result yields not null
	if ($result->num_rows > 0){
		if (strcmp($row['password'], $_POST['password']) == 0){
			// Set cookie and cache
			$results['status'] = 200;
			$results['cookie'] = md5($row['user_id'].$row['password'].$row['username']);

			// Insert the cookies into DB
		$queryString = "UPDATE users SET cookie = '".$results['cookie']."' WHERE user_id = '";
		$queryString .= $row['user_id'];
		$queryString .= "' AND password = '";
		$queryString .= $row['password'];
		$queryString .= "'";
		$dbconn->query($queryString);

		}
		else{
			// invalid password given username
			$results['status'] = 401;
		}
	}
	else{
		// Not found given username and password
		$results['status'] = 404;
	}
	$results = json_encode($results);
	echo $results;

?>