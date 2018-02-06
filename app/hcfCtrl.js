 app.controller('hcfCtrl', function ($scope, $rootScope, $location, $routeParams, services, $http, $filter) {
  $scope.attendance = {};  
 $scope.filter = {};
 $scope.allhcf = [];
     function getAll(){

        $http.get("/attendance/services/gethcf").success(function (data) {
            $scope.allhcf = data

        })
    }
     function getAverageHcfReport(){

        $http.get("/attendance/services/getAverageHcfReport").success(function (data) {
            $scope.allhcfreports = data

        })
    }
    getAll();
    getAverageHcfReport();
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
        {id:2, oldgroupId:1, groupId:2, districtId:2,name:"Lowcost"},
        {id:3, oldgroupId:1, groupId:2, districtId:3, name:"Estate"},
        {id:4, oldgroupId:1, groupId:2, districtId:3,name:"Grammar school"}        
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
function typeChanged(){
  $scope.type = $filter('filter')($scope.types, {id:$scope.filter.typeId})[0];
  $scope.typename = $scope.type.name;
  
  
}
$scope.oldgroupChanged = function () {
   oldgroupChanged();
    groupChanged();
    districtChanged();
    monthChanged();
    weekChanged();
}
$scope.zoneChanged = function  () {
  zoneChanged();

}
$scope.typeChanged = function(){
  typeChanged();
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

$scope.submitFellowshipReport = function (attendance) {
  var hcfTotal = $scope.attendance.visitors + $scope.attendance.members;
  $scope.attendance.total = hcfTotal;
  $scope.attendance.groupId = $scope.filter.groupId;
  $scope.attendance.ogroupId = $scope.filter.ogroupId;
  $scope.attendance.districtId = $scope.filter.districtId;
  $scope.attendance.monthId = $scope.filter.monthId;
  $scope.attendance.weekId = $scope.filter.weekId;
  $scope.attendance.zoneId = $scope.filter.zoneId;
  $scope.attendance.typeId = $scope.filter.typeId;
  $scope.attendance.groupName = $scope.groupname;
  $scope.attendance.ogroupName = $scope.oldgroupname;
  $scope.attendance.districtName = $scope.districtname;
  $scope.attendance.monthName = $scope.monthname;
  $scope.attendance.weekName = $scope.weekname;
  $scope.attendance.zoneName = $scope.zonename;
  $scope.attendance.typeName = $scope.typename;

if($scope.attendance.ogroupId === undefined ){
      toastr.error("Select an old group first");
     }
      else if ($scope.attendance.groupId === undefined){
      toastr.error("Select a Group");
     }
     else if ($scope.attendance.districtId === undefined){
      toastr.error("Select a District");
     }
     else if ($scope.attendance.zoneId === undefined){
      toastr.error("Select a Zone");
     }
     else if ($scope.attendance.monthId === undefined){
      toastr.error("Select a Month");
     }
     else if ($scope.attendance.typeId === undefined){
      toastr.error("Select a Type");
     }
      else if ($scope.attendance.weekId === undefined){
      toastr.error("Select the Week");
     }
     else if ($scope.attendance.sws == null || $scope.attendance.mbs == null || 
      $scope.attendance.members == null || $scope.attendance.trets == null || 
      $scope.attendance.visitors == null ){
      toastr.error("Please enter the data")
     }  
     else{
          if (confirm("Are you certain about this details you are about to submit?")== true){
                   $http.post("/attendance/services/inserthcf", $scope.attendance).success(function (data) {
                    if (data.msg === "Hcf report Created Successfully"){
                      toastr.success(data.msg);
                    }
                    if (data.msg === "This Data has been recorded already"){
                      toastr.error(data.msg);
                    }
                    $scope.attendance = "";
                    $scope.filter = "";
                    })
                   .error(function (response) {
                      toastr.error("An error has occured");
             });
          }
          else {

          }
        
     }
 
            
}
 
});