 
<!DOCTYPE html>
<html ng-app="myApp" lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="css/bootstrap.min.css">
    <link rel="stylesheet" type="text/css" href="css/w3.css">
    <link rel="stylesheet" type="text/css" href="css/main.css">
    <link href="dist/toastr.css" rel="stylesheet">
    <title>Attendance Application</title>
</head>
<body>

<nav class="navbar navbar-inverse" zclass="w3-main" id="main">

  <div class="container-fluid">

    <!-- Brand and toggle get grouped for better mobile display -->
    <div class="navbar-header">

      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>

     <a class="navbar-brand" href="#/">Weekly Report Record</a><!-- <button class="w3-button w3-teal w3-xlarge" onclick="w3_open()">&#9776;</button>
 -->
    </div>

    <!-- Collect the nav links, forms, and other content for toggling -->
    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
      
     
      <ul class="nav navbar-nav navbar-right">
        
        <li><a href="#/">Church Attendance</a></li>
        <li><a href="#/hcf">House Caring Fellowship</a></li>
        <li><a href="#/report">District Report</a></li>
        <li><a href="#/groupreport">Group Report</a></li>
        <li><a href="#">Profile</a></li>
        
      </ul>
    </div><!-- /.navbar-collapse -->
  </div><!-- /.container-fluid -->

</nav>

 
<div class="container">
 
    <div ng-view="" id="ng-view"></div>
   
</div>
</div>
 
<script src="js/jquery-2.1.3.js"></script>
<script src="js/bootstrap.min.js"></script>
<script src="js/angular.min.js"></script>
<!-- <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.4/angular.min.js"></script>
 --><script src="js/angular-route.min.js"></script>
<script src="js/toastr.js"></script>
<script src="app/app.js"></script>     
<script src="app/entryCtrl.js"></script>
<script src="app/hcfCtrl.js"></script>
<script src="app/UserCtrl.js"></script>         
</body>
 
</html>