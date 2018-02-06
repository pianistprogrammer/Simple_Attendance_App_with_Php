
  
$('#gname').bind('keyup change',function(){
    if(this.value.length > 0){
      $('#number').show();
}
else {
    $('#number').hide();
}
});

