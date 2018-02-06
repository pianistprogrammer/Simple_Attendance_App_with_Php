<?php
 	require_once("Rest.inc.php");
	
	class API extends REST {
	
		public $data = "";
		
		const DB_SERVER = "127.0.0.1";
		const DB_USER = "root";
		const DB_PASSWORD = "";
		const DB = "dlbcreport";

		private $db = NULL;
		private $mysqli = NULL;
		public function __construct(){
			parent::__construct();				// Init parent contructor
			$this->dbConnect();					// Initiate Database connection
		}
		
		/*
		 *  Connect to Database
		*/
		private function dbConnect(){
			$this->mysqli = new mysqli(self::DB_SERVER, self::DB_USER, self::DB_PASSWORD, self::DB);
		}
		
		/*
		 * Dynmically call the method based on the query string
		 */
		public function processApi(){
			$func = strtolower(trim(str_replace("/","",$_REQUEST['x'])));
			if((int)method_exists($this,$func) > 0)
				$this->$func();
			else
				$this->response('',404); // If the method not exist with in this class "Page not found".
		}
		 
		private function getAverageDistrictReport()
		{
			if($this->get_request_method() != "GET"){
				$this->response('',406);
			}
			$monthId = $_GET['monthId'];
			$districtId = $_GET['districtId'];		
			$query="SELECT  DistrictName, min(SwsChildren+SwsAdult) AS minsws, max(SwsChildren+SwsAdult) AS maxsws, round(avg(SwsChildren)) AS swsAverageChildren, round(avg(MbsChildren)) AS mbsAverageChildren, round(avg(TretsChildren)) AS tretsAverageChildren, round(avg(SwsAdult)) AS swsAverageAdult, round(avg(MbsAdult)) AS mbsAverageAdult, round(avg(TretsAdult)) AS tretsAverageAdult  FROM churchattendance WHERE MonthId = $monthId AND DistrictId = $districtId GROUP BY DistrictName";
			$r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);
			
			$hcfquery="SELECT DISTINCT DistrictName, TypeName, round(avg(Members)) AS avgTotal FROM hcf WHERE MonthId = $monthId GROUP BY TypeId, DistrictId";
			$rhcf = $this->mysqli->query($hcfquery) or die($this->mysqli->error.__LINE__);
 
 			$result = array();
 			if($r->num_rows > 0){
				
				while($row = $r->fetch_assoc()){
					$result['churchattendance'][] = $row;
				}
				 
			}
			if($rhcf->num_rows > 0){
				
				while($row = $rhcf->fetch_assoc()){
					$result['hcfattendance'][] = $row;
				}
				 
			}
			if(count($result)> 0){
				
				$this->response($this->json($result), 200); // send user details
				 
			}
			// $this->response('',204); 
			// if($r->num_rows > 0){
			// 	$result = array();
			// 	while($row = $r->fetch_assoc()){
			// 		$result[] = $row;
			// 	}
			// 	$this->response($this->json($result), 200); // send user details
			// }
			// $this->response('',204); 
 			 
		}
		private function getAverageGroupReport()
		{
			if($this->get_request_method() != "GET"){
				$this->response('',406);
			}
			$monthId = $_GET['monthId'];
			$groupId = $_GET['groupId'];		
			$query="SELECT  DistrictName, min(SwsChildren+SwsAdult) AS minsws, max(SwsChildren+SwsAdult) AS maxsws, round(avg(SwsChildren)) AS swsAverageChildren, round(avg(MbsChildren)) AS mbsAverageChildren, round(avg(TretsChildren)) AS tretsAverageChildren, round(avg(SwsAdult)) AS swsAverageAdult, round(avg(MbsAdult)) AS mbsAverageAdult, round(avg(TretsAdult)) AS tretsAverageAdult  FROM churchattendance WHERE GroupId = $groupId AND MonthId = $monthId GROUP BY DistrictName";
			$r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);
			
			$hcfquery="SELECT DISTINCT DistrictName, TypeName, round(avg(Members)) AS avgTotal FROM hcf WHERE MonthId = $monthId GROUP BY TypeId, DistrictId";
			$rhcf = $this->mysqli->query($hcfquery) or die($this->mysqli->error.__LINE__);
 
 			$result = array();
 			if($r->num_rows > 0){
				
				while($row = $r->fetch_assoc()){
					$result['churchattendance'][] = $row;
				}
				 
			}
			if($rhcf->num_rows > 0){
				
				while($row = $rhcf->fetch_assoc()){
					$result['hcfattendance'][] = $row;
				}
				 
			}
			if(count($result)> 0){
				
				$this->response($this->json($result), 200); // send user details
				 
			}
			$this->response('',204); 
 			 
 			 
		}
		private function getAverageHcfReport()
		{
			if($this->get_request_method() != "GET"){
				$this->response('',406);
			}
			$query="SELECT  DistrictName, min(SwsChildren+SwsAdult) AS minsws, max(SwsChildren+SwsAdult) AS maxsws, round(avg(SwsChildren)) AS swsAverageChildren, round(avg(MbsChildren)) AS mbsAverageChildren, round(avg(TretsChildren)) AS tretsAverageChildren, round(avg(SwsAdult)) AS swsAverageAdult, round(avg(MbsAdult)) AS mbsAverageAdult, round(avg(TretsAdult)) AS tretsAverageAdult  FROM churchattendance  WHERE GroupId = 2 AND MonthId=1 GROUP BY DistrictName";

			 
			 
			$r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);
 
 			if($r->num_rows > 0){
				$result = array();
				while($row = $r->fetch_assoc()){
					$result[] = $row;
				}
				$this->response($this->json($result), 200); // send user details
			}
			$this->response('',204); 
 			 
		}						
		private function login(){
			$this->PostTest();
			$email = $this->_request['email'];		
			$password = $this->_request['password'];
			if(!empty($email) and !empty($password)){
				if(filter_var($email, FILTER_VALIDATE_EMAIL)){
					$query="SELECT id, username, email FROM users WHERE email = '$email' AND password = '".md5($password)."' LIMIT 1";
					$r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);

					if($r->num_rows > 0) {
						$result = $r->fetch_assoc();	
						// If success everythig is good send header as "OK" and user details
						$this->response($this->json($result), 200);
					}
					$this->response('', 204);	// If no records "No Content" status
				}
			}
			
			$error = array('status' => "Failed", "msg" => "Invalid Email address or Password");
			$this->response($this->json($error), 400);
		}

		
		private function getAttendance(){	
			if($this->get_request_method() != "GET"){
				$this->response('',406);
			}
			$query="SELECT distinct c.id, c.ogroupId, c.ogroupName, c.groupId, c.groupName, c.districtId, c.districtName , c.monthId, c.monthName, c.weekId, c.weekName, c.swsChildren, c.mbsChildren, c.tretsChildren, c.swsAdult, c.mbsAdult, c.tretsAdult,  c.total FROM churchattendance c order by c.id desc";
			$r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);

			if($r->num_rows > 0){
				$result = array();
				while($row = $r->fetch_assoc()){
					$result[] = $row;
				}
				$this->response($this->json($result), 200); // send user details
			}
			$this->response('',204);	// If no records "No Content" status
		}
		private function getHcf(){	
			if($this->get_request_method() != "GET"){
				$this->response('',406);
			}
			$query="SELECT distinct c.id, c.ogroupId, c.ogroupName, c.groupId, c.groupName, c.districtId, c.districtName , c.monthId, c.monthName, c.weekId, c.weekName, c.zoneId, c.typeId, c.zoneName, c.sws, c.mbs, c.trets, c.members, c.visitors,  c.total FROM hcf c order by c.id desc";
			$r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);

			if($r->num_rows > 0){
				$result = array();
				while($row = $r->fetch_assoc()){
					$result[] = $row;
				}
				$this->response($this->json($result), 200); // send user details
			}
			$this->response('',204);	// If no records "No Content" status
		}
		 
		
		private function insertAttendance(){
			$this->PostTest();

			$attendance = json_decode(file_get_contents("php://input"),true);
			$column_names = array('ogroupId', 'ogroupName', 'groupId','groupName', 'districtId', 'districtName',  'monthId', 'monthName', 'weekId', 'weekName', 'swsChildren','mbsChildren', 'tretsChildren', 'swsAdult', 'mbsAdult', 'tretsAdult', 'total');
			$keys = array_keys($attendance);
			$columns = '';
			$values = '';
			foreach($column_names as $desired_key){ // Check the customer received. If blank insert blank into the array.
			   if(!in_array($desired_key, $keys)) {
			   		$$desired_key = '';
				}else{
					$$desired_key = $attendance[$desired_key];
				}
				$columns = $columns.$desired_key.',';
				$values = $values."'".$$desired_key."',";
			}
			$query = "SELECT districtId, monthId,weekId FROM churchattendance WHERE districtId = '$attendance[districtId]'AND monthId = '$attendance[monthId]' AND weekId = '$attendance[weekId]'";
			$result = $this->mysqli->query($query);
			$count = mysqli_num_rows($result);
			if($count != 0){

				$error = array('status' => "Error", "msg" => "This Data has been recorded already", "data" => $attendance);
				$this->response($this->json($error),200);
			}
			else{
				$query = "INSERT INTO churchattendance(".trim($columns,',').") VALUES(".trim($values,',').")";
					if(!empty($attendance)){
						$r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);
						$success = array('status' => "Success", "msg" => "Attendance Created Successfully", "data" => $attendance);
						$this->response($this->json($success),200);
					}else
						$this->response('',204);	//"No Content" status
			}
			
		}
		private function inserthcf(){
			$this->PostTest();

			$hcf = json_decode(file_get_contents("php://input"),true);
			$column_names = array('ogroupId', 'ogroupName', 'groupId','groupName', 'districtId', 'districtName',  'monthId', 'monthName', 'weekId', 'weekName', 'zoneId','zoneName','typeId','typeName','sws','mbs', 'trets', 'members', 'visitors', 'total');
			$keys = array_keys($hcf);
			$columns = '';
			$values = '';
			foreach($column_names as $desired_key){ // Check the customer received. If blank insert blank into the array.
			   if(!in_array($desired_key, $keys)) {
			   		$$desired_key = '';
				}else{
					$$desired_key = $hcf[$desired_key];
				}
				$columns = $columns.$desired_key.',';
				$values = $values."'".$$desired_key."',";
			}
			$query = "SELECT districtId,monthId,weekId,zoneId,typeId FROM churchattendance WHERE districtId = '$attendance[districtId]'AND monthId = '$attendance[monthId]' AND weekId = '$attendance[weekId]' AND zoneId = '$attendance[zoneId]' AND typeId = '$attendance[typeId]'";
			$result = $this->mysqli->query($query);
			$count = mysqli_num_rows($result);
			if($count != 0){

				$error = array('status' => "Error", "msg" => "This Data has been recorded already", "data" => $attendance);
				$this->response($this->json($error),200);
			}
			else{
				$query = "INSERT INTO hcf(".trim($columns,',').") VALUES(".trim($values,',').")";
				if(!empty($hcf)){
					$r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);
					$success = array('status' => "Success", "msg" => "Hcf report Created Successfully", "data" => $hcf);
					$this->response($this->json($success),200);
				}else
					$this->response('',204);	//"No Content" status
			}
			
		}
		private function register(){
			$this->PostTest();

			$user = json_decode(file_get_contents("php://input"),true);

			$column_names = array('email', 'username', 'phoneNumber', 'password');
			$user['password'] = md5($user['password']);
			$keys = array_keys($user);
			$columns = '';
			$values = '';
			foreach($column_names as $desired_key){ // Check the user received. If blank insert blank into the array.
			   if(!in_array($desired_key, $keys)) {
			   		$$desired_key = '';
				}else{
					$$desired_key = $user[$desired_key];
				}
				$columns = $columns.$desired_key.',';
				$values = $values."'".$$desired_key."',";
			}
			 
			$query = "SELECT email FROM users WHERE email = '$user[email]'";
			$result = $this->mysqli->query($query);
			$count = mysqli_num_rows($result);
			if($count != 0){

				$error = array('status' => "Error", "msg" => "Email already exists", "data" => $user);
				$this->response($this->json($error),200);
			}
			else{
				if(!empty($user)){
						$query = "INSERT INTO users(".trim($columns,',').") VALUES(".trim($values,',').")";

						//$query = "INSERT INTO users(email, phoneNumber, password, username)";
						$r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);
						$success = array('status' => "Success", "msg" => "Account Created Successfully", "data" => $user);
						$this->response($this->json($success),200);
					}
				else{
						// $error = array('status' => "Error", "msg" => "Email already exists", "data" => $user);
						$this->response('',204);
					}
					 
				}
			}
		
		private function updateEnrty(){
			$this->PostTest();
			$customer = json_decode(file_get_contents("php://input"),true);
			$id = (int)$customer['id'];
			$column_names = array('customerName', 'email', 'city','state', 'address', 'country');
			$keys = array_keys($customer['customer']);
			$columns = '';
			$values = '';
			foreach($column_names as $desired_key){ // Check the customer received. If key does not exist, insert blank into the array.
			   if(!in_array($desired_key, $keys)) {
			   		$$desired_key = '';
				}else{
					$$desired_key = $customer['customer'][$desired_key];
				}
				$columns = $columns.$desired_key."='".$$desired_key."',";
			}
			$query = "UPDATE angularcode_customers SET ".trim($columns,',')." WHERE customerNumber=$id";
			if(!empty($customer)){
				$r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);
				$success = array('status' => "Success", "msg" => "Customer ".$id." Updated Successfully.", "data" => $customer);
				$this->response($this->json($success),200);
			}else
				$this->response('',204);	// "No Content" status
		}
		
		private function deleteCustomer(){
			if($this->get_request_method() != "DELETE"){
				$this->response('',406);
			}
			$id = (int)$this->_request['id'];
			if($id > 0){				
				$query="DELETE FROM angularcode_customers WHERE customerNumber = $id";
				$r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);
				$success = array('status' => "Success", "msg" => "Successfully deleted one record.");
				$this->response($this->json($success),200);
			}else
				$this->response('',204);	// If no records "No Content" status
		}
		
		/*
		 *	Encode array into JSON
		*/
		private function json($data){
			if(is_array($data)){
				return json_encode($data);
			}
		}

		private function PostTest()
		{
			if ($this->get_request_method() != "POST") {
				$this->response('', 406);
			}
		}
	}
	
	// Initiiate Library
	
	$api = new API;
	$api->processApi();
?>