<?php
	class DatabaseConnection{
		private $username;
		private $password;
		private $dbname;
		private $servername;
		private $conn;

		public function __construct($servername, $username, $pass, $db){
			$this->username = $username;
			$this->pass = $password;
			$this->servername = $servername;
			$this->dbname = $db;

			$this->conn = new PDO("pgsql:host=".$this->servername."; dbname=".$this->dbname, $this->username, $this->password);
			$this->conn->set_charset('UTF-8');

			if ($this->conn->connect_error){
				die("Connection failed: " . $this->conn->connect_error);
			}
		}

		public function __destruct(){
			$this->conn->close();
		}

		function query($queryString){
			return $this->conn->query($queryString);
		}
	}

?>