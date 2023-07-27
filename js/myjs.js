var articleHua = document.querySelectorAll(".huaBun");
var articleTai = document.querySelectorAll(".taiBun");
function myFunction (){
  var x = document.getElementById("hua").checked;
  if(x){
    for(var i=0; i<articleHua.length; i++){
      articleHua[i].style.display="block";
    }
    for(var i=0; i<articleTai.length; i++){
      articleTai[i].style.display="none";
    }
  }else{
    for(var i=0; i<articleHua.length; i++){
      articleHua[i].style.display="none";
    }
    for(var i=0; i<articleTai.length; i++){
      articleTai[i].style.display="block";
    }
  }
}