app.controller('entryCtrl', function ($scope, $rootScope, $location, $routeParams, services, $http, $filter) {
  $scope.attendance  = {};
  $scope.allattendance = [];
  function getAll(){

        $http.get("/attendance/services/getattendance").success(function (data) {
            $scope.allattendance = data

        })
    }
  getAll();
  
function getAverageDistrictReport() {
     $scope.ogroupId = $scope.filter.ogroupId;
     $scope.groupId = $scope.filter.groupId;
     $scope.districtId = $scope.filter.districtId;
     $scope.monthId = $scope.filter.monthId;
     if($scope.ogroupId === undefined ){
      toastr.error("Select an old group first");
     }
      else if ($scope.groupId === undefined){
      toastr.error("Select a group");
     }
     else if ($scope.districtId === undefined){
      toastr.error("Select a district");
     }
     else if ($scope.monthId === undefined){
      toastr.error("Select a month");
     }
     else{
       $http.get("/attendance/services/getAverageDistrictReport?monthId="+$scope.monthId+"&districtId="+$scope.districtId).success(function (data) {
            //$scope.groupreports = data;
            $scope.districtreports = data.churchattendance;
            var hcfAttendance = data.hcfattendance;
            angular.forEach($scope.districtreports, function(item) {
              for (var i = hcfAttendance.length - 1; i >= 0; i--) {
                if (hcfAttendance[i].DistrictName === item.DistrictName) {
                  if (hcfAttendance[i].TypeName==='Men') {
                    item.hcfMen = hcfAttendance[i].avgTotal;
                  }
                  if (hcfAttendance[i].TypeName==='Women') {
                    item.hcfWomen = hcfAttendance[i].avgTotal; 
                  }
                  if (hcfAttendance[i].TypeName==='Youths') {
                    item.hcfYouths = hcfAttendance[i].avgTotal; 
                  }
                  if (hcfAttendance[i].TypeName==='Children') {
                    item.hcfChildren = hcfAttendance[i].avgTotal; 
                  }
                }
              }
            })
            $scope.items = $scope.districtreports;
           
        })
     }
     
     // else{

     //   $http.get("/attendance/services/getAverageDistrictReport?monthId="+$scope.monthId+"&districtId="+$scope.districtId).success(function (data) {
     //        $scope.districtreports = data;

     //    })
     // }
     
}
function getAverageGroupReport() {
     $scope.ogroupId = $scope.filter.ogroupId;
     $scope.groupId = $scope.filter.groupId;
     $scope.districtId = $scope.filter.districtId;
     $scope.monthId = $scope.filter.monthId;
     if($scope.ogroupId === undefined ){
      toastr.error("Select an old group first");
     }
      else if ($scope.groupId === undefined){
      toastr.error("Select a group");
     }
      
     else if ($scope.monthId === undefined){
      toastr.error("Select a month");
     }
     
     else{
       $http.get("/attendance/services/getAverageGroupReport?monthId="+$scope.monthId+"&groupId="+$scope.groupId).success(function (data) {
            //$scope.groupreports = data;
            $scope.groupreports = data.churchattendance;
            var hcfAttendance = data.hcfattendance;
            angular.forEach($scope.groupreports, function(item) {
              for (var i = hcfAttendance.length - 1; i >= 0; i--) {
                if (hcfAttendance[i].DistrictName === item.DistrictName) {
                  if (hcfAttendance[i].TypeName==='Men') {
                    item.hcfMen = hcfAttendance[i].avgTotal;
                  }
                  if (hcfAttendance[i].TypeName==='Women') {
                    item.hcfWomen = hcfAttendance[i].avgTotal; 
                  }
                  if (hcfAttendance[i].TypeName==='Youths') {
                    item.hcfYouths = hcfAttendance[i].avgTotal; 
                  }
                  if (hcfAttendance[i].TypeName==='Children') {
                    item.hcfChildren = hcfAttendance[i].avgTotal; 
                  }
                }
              }
            })
            $scope.items = $scope.groupreports;
           
        })
     }
     
}

$scope.printReport = function() {
    document.getElementById("printbutton").style.display = "none";
    //document.getElementsByClassName("btn").style.display = "none";
    var css = '@page { size: portrait; }',
    head = document.head || document.getElementsByTagName('head')[0],
    style = document.createElement('style');
    style.type = 'text/css';
    style.media = 'print';

    if (style.styleSheet){
      style.styleSheet.cssText = css;
    } 
    else{
      style.appendChild(document.createTextNode(css));
    }

    head.appendChild(style);

    window.print();
   
    
}  
 $scope.filter = {};
  $scope.oldgroups = [
    {id:1, name:"Old Ikorodu"},
    {id:2, name:"Old Ketu"}
  ]
 
function oldgroupChanged(){
 
  $scope.groups = [];
     if ($scope.filter.ogroupId){
      $scope.groups = [
        {id:1, oldgroupId:1, name:"Maya"},
        {id:2, oldgroupId:1, name:"Oke-otaona"},
        {id:3, oldgroupId:1, name:"Oniflower"},
        {id:4, oldgroupId:1, name:"Agunfoye"},
        {id:5, oldgroupId:2, name:"Ketu"},
        {id:6, oldgroupId:2, name:"Ile-ile"},
        {id:7, oldgroupId:2, name:"Kosofe"}
      ];
    $scope.groups = $filter('filter')($scope.groups, {oldgroupId:$scope.filter.ogroupId});
     
    $scope.oldgroup = $filter('filter')($scope.oldgroups, {id:$scope.filter.ogroupId})[0];
    $scope.oldgroupname = $scope.oldgroup.name;   
  }

}
function groupChanged(){
 
  $scope.districts = [];
     if ($scope.filter.groupId){
      $scope.districts = [
        {id:1, oldgroupId:1, groupId:1, name:"Maya"},
        {id:2, oldgroupId:1, groupId:2, name:"Sabo"},
        {id:3, oldgroupId:1, groupId:2, name:"Oke-otaona"},
        {id:4, oldgroupId:2, groupId:3, name:"Charity"},
        {id:5, oldgroupId:2, groupId:4, name:"Agunfoye"},
        {id:6, oldgroupId:2, groupId:3, name:"Peace"}

         
      ];
    $scope.districts = $filter('filter')($scope.districts, {groupId:$scope.filter.groupId});
    
    $scope.group = $filter('filter')($scope.groups, {id:$scope.filter.groupId})[0];
    $scope.groupname = $scope.group.name;
     
  }
 
}
function districtChanged(){
 
  $scope.zones = [];
     if ($scope.filter.districtId){
      $scope.zones = [
        {id:1, oldgroupId:1, groupId:2, districtId:2, name:"Ore-meji"},
        {id:2, oldgroupId:1, groupId:2, districtId:2,name:"Lowcost"}       
      ];
    $scope.zones = $filter('filter')($scope.zones, {districtId:$scope.filter.districtId});
    $scope.district = $filter('filter')($scope.districts, {id:$scope.filter.districtId})[0];
    $scope.districtname = $scope.district.name;
  
    
  }
 
}
function zoneChanged(){
  $scope.zone = $filter('filter')($scope.zones, {id:$scope.filter.zoneId})[0];
    $scope.zonename = $scope.zone.name;
}
function monthChanged(){
  $scope.month = $filter('filter')($scope.months, {id:$scope.filter.monthId})[0];
    $scope.monthname = $scope.month.name;


}
function weekChanged(){
  $scope.week = $filter('filter')($scope.weeks, {id:$scope.filter.weekId})[0];
    $scope.weekname = $scope.week.name;
  
}
$scope.oldgroupChanged = function () {
   oldgroupChanged();
    groupChanged();
    districtChanged();
    monthChanged();
    weekChanged();
    console.log($scope.filter.monthId);
 
}
$scope.getAverageDistrictReport = function () {

    getAverageDistrictReport();
}
$scope.getAverageGroupReport = function () {

    getAverageGroupReport();
}
$scope.zoneChanged = function  () {
 zoneChanged();
 }
$scope.weeks = [
  {id:1, name:"week1"},
  {id:2, name:"week2"},
  {id:3, name:"week3"},
  {id:4, name:"week4"},
  {id:5, name:"week5"}

];
$scope.types = [
  {id:1, name:"Men"},
  {id:2, name:"Women"},
  {id:3, name:"Youths"},
  {id:4, name:"Children"}
 ];
$scope.months = [
      {id:1, name:"January"},
      {id:2, name:"February"},
      {id:3, name:"March"},
      {id:4, name:"April"},
      {id:5, name:"May"},
      {id:6, name:"June"},
      {id:7, name:"July"},
      {id:8, name:"August"},
      {id:9, name:"September"},
      {id:10, name:"October"},
      {id:11, name:"November"},
      {id:12, name:"December"}
]
$scope.submitAttendance = function (attendance) {
 
var adultTotal = $scope.attendance.swsAdult + $scope.attendance.mbsAdult + $scope.attendance.tretsAdult;
$scope.attendance.total = adultTotal;
var childrenTotal = $scope.attendance.swsChildren + $scope.attendance.mbsChildren + $scope.attendance.tretsChildren;
$scope.attendance.groupId = $scope.filter.groupId;
$scope.attendance.ogroupId = $scope.filter.ogroupId;
$scope.attendance.districtId = $scope.filter.districtId;
$scope.attendance.monthId = $scope.filter.monthId;
$scope.attendance.weekId = $scope.filter.weekId;
$scope.attendance.groupName = $scope.groupname;
$scope.attendance.ogroupName = $scope.oldgroupname;
$scope.attendance.districtName = $scope.districtname;
$scope.attendance.monthName = $scope.monthname;
$scope.attendance.weekName = $scope.weekname;
//console.log(attendance);
    if($scope.attendance.ogroupId === undefined ){
      toastr.error("Select an old group first");
     }
      else if ($scope.attendance.groupId === undefined){
      toastr.error("Select a group");
     }
     else if ($scope.attendance.districtId === undefined){
      toastr.error("Select a district");
     }
     else if ($scope.attendance.monthId === undefined){
      toastr.error("Select a month");
     }
      else if ($scope.attendance.weekId === undefined){
      toastr.error("Select the week");
     }
     else if ($scope.attendance.swsChildren == null || $scope.attendance.mbsChildren == null || 
      $scope.attendance.tretsChildren == null || $scope.attendance.swsAdult == null || 
      $scope.attendance.mbsAdult == null || $scope.attendance.tretsAdult == null
      ){
      toastr.error("Please enter the data")
     }
     else{
       if (confirm("Are you certain about this details you are about to submit?")== true){
            $http.post("/attendance/services/insertAttendance", $scope.attendance).success(function (data) {
              if (data.msg === "Attendance Created Successfully"){
                toastr.success(data.msg);
              }
              if (data.msg === "This Data has been recorded already"){
                toastr.error(data.msg);
              }
              $scope.attendance = "";
              $scope.filter = "";
             }).error(function (response) {
              
             toastr.error("An error has occured");
           });
       }
        
     }

            
}
 
});