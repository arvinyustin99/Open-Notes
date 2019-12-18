<?php
	include("dbAccess.php");
?>

<?php
	$dbconn = new DatabaseAccess("localhost", "postgres", "postgres", "opennotes");

	$result = $dbconn->query("SELECT user_id, username, password FROM users WHERE username ='". $_POST['username']."'");
?>
	$_POST['username']
	$_POST['password']
	<?php
	// If successful, the return will result only 1 row of data
	$row = $result->fetch_assoc();

	$results = array();
	$results['status'] = 500;
	$results['cookie'] = '';

	// Check whether the result yields not null
	if ($result->num_rows > 0){
		if (strcmp($result['password'], $_POST['password']) == 0){
			// Set cookie and cache
			$results['status'] = 200;
			$results['cookie'] = md5($results['user_id'].$results['password'].$results['username']);

			// Insert the cookies into DB
		$queryString = "INSERT INTO users (cookie) VALUES (".$results['cookie'].") WHERE user_id = '";
		$queryString .= $result['user_id'];
		$queryString .= "' AND password = '";
		$queryString .= $result['password'];
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