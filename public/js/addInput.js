function addInput(divName){
  var newdiv = document.createElement('div');
  newdiv.innerHTML = 
        "<input type='text' id='answerField' name='question[answer]' placeholder= 'answer' autocomplete:'off'>";
  document.getElementById(divName).appendChild(newdiv);

}
