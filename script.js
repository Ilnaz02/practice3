function getHistory(){
  return document.getElementById("display-value").innerText;
}
function printHistory(num){
  document.getElementById("display-value").innerText=num;
}
function getOutput(){
  return document.getElementById("input-value").innerText;
}
function printOutput(num){
  if(num==""){
    document.getElementById("input-value").innerText=num;
  }
  else{
    document.getElementById("input-value").innerText=getFormattedNumber(num);
  } 
}
function getFormattedNumber(num){
  if(num=="-"){
    return "";
  }
  var n = Number(num);
  var value = n.toLocaleString("en");
  return value;
}
function reverseNumberFormat(num){
  return Number(num.replace(/,/g,''));
}

var memoryValue;

var operator = document.getElementsByClassName("operator");
for(var i =0;i<operator.length;i++){
  operator[i].addEventListener('click',function(){
    if(this.id=="clear"){
      printHistory("");
      printOutput("");
    }
    else if(this.id=="backspace"){
      var output=reverseNumberFormat(getOutput()).toString();
      if(output){
        output= output.substring(0,output.length-1);
        printOutput(output);
      }
    }
    else if(this.id=="addtoMemory") {
      memoryValue = document.getElementById("input-value").innerText;
    }
    else if(this.id=="recallFromMemory") {
      document.getElementById("input-value").innerText = memoryValue;
    }
    else{
      var output=getOutput();
      var history=getHistory();
      if(output==""&&history!=""){ //Если первое пустое, а второе нет
         if(isNaN(history[history.length-1])){ //и если последнее значение не число
          history= history.substring(0,history.length-1);//то всё значение будет равно history
        }
      }
      if(output!="" || history!="") { //Если первое или второе окно не пустое
        output= output==""?output:reverseNumberFormat(output);//то, output будет равно либо пустоте или недавно введённое число
        history=history+output;//history равен себе плюс output
        if(this.id=="equal"){
          var result=eval(history);
          printOutput(result);
          printHistory("");
        }
        else{
          history=history+this.id;
          printHistory(history);
          printOutput("");
        }
      }
    }
    
  });
}
var number = document.getElementsByClassName("number");
for(var i =0;i<number.length;i++){
  number[i].addEventListener('click',function(){
    var output=reverseNumberFormat(getOutput());
    if(output!=NaN){
      output=output+this.id;
      printOutput(output);
    }
  });
}