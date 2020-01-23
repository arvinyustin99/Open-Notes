<?php
	session_start();
	// destroy cookie here
	session_destroy();
	header('Location: ../html/login.html');
	exit(1);
?>