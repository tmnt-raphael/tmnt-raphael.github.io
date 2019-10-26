document.getElementById("calculate_button").addEventListener("click", doCalculations);

function doCalculations() {
  var variablePF = getVariablePF();
  console.log(variablePF);
  setVariablePF();
  var a = sanitizeInput(document.getElementById('entry_price').value);
  var b = sanitizeInput(document.getElementById('exit_price').value);
  var decimalLength = getDecimalLength(a,b);
  a *= Math.pow(10,decimalLength);
  a = Math.round(a)
  b *= Math.pow(10,decimalLength);
  b = Math.round(b)
  var e = a+(b-a)*variablePF;//*0.6;
  var f = b+(b-a)/2;
  var g = a-(b-a);
  a /= Math.pow(10,decimalLength);
  b /= Math.pow(10,decimalLength);
  e /= Math.pow(10,decimalLength);
  f /= Math.pow(10,decimalLength);
  g /= Math.pow(10,decimalLength);

  var c = sanitizeInput(document.getElementById('tick_size').value);
  var d = sanitizeInput(document.getElementById('dollars_per_tick').value);

  document.getElementById("0%_profit_price").innerHTML = a;
  document.getElementById("60%_profit_price").innerHTML = e;
  document.getElementById("100%_profit_price").innerHTML = b;
  document.getElementById("150%_profit_price").innerHTML = f;
  document.getElementById("-100%_profit_price").innerHTML = g;

  if (document.getElementById('tick_size').value != null &&
    document.getElementById('tick_size').value != "" &&
    document.getElementById('dollars_per_tick').value != null &&
    document.getElementById('dollars_per_tick').value != "") {
    var profit60 = Math.abs(e-a)*d/c;
    document.getElementById("60%_profit").innerHTML = "$" + profit60.toFixed(2);
    var profit100 = Math.abs((a-b)*d/c);
    document.getElementById("100%_profit").innerHTML = "$" + profit100.toFixed(2);
    var profit150 = Math.abs((a-f)*d/c);
    document.getElementById("150%_profit").innerHTML = "$" + profit150.toFixed(2);
    var profitNeg100 = -1*Math.abs((a-g)*d/c);
    var profitNeg100String = profitNeg100.toFixed(2).toString();
    document.getElementById("-100%_profit").innerHTML ="$" + profitNeg100String;
  } else {
    document.getElementById("60%_profit").innerHTML = '';
    document.getElementById("100%_profit").innerHTML = '';
    document.getElementById("150%_profit").innerHTML = '';
    document.getElementById("-100%_profit").innerHTML = '';
  }
}

function sanitizeVariablePF(variablePF) {
  var result = variablePF.trim();
  result = result.replace(/[^0-9]+?$/, "");

  if(isNaN(result) === true || result === '') {return 60};

  return result;
}

function getVariablePF() {
  var variablePF = document.getElementById("variable_pf").value;
  variablePF = sanitizeVariablePF(variablePF);

  // covert from percent to decimal number
  variablePF /= 100;

  return variablePF;
}

function setVariablePF() {
  var valueToSet = Math.round(getVariablePF()*100) + "%";

  // set in UI
  document.getElementById("variable_pf").value = valueToSet;

  // set in browser cache
  localStorage.setItem("variablePF", valueToSet);
}

function getDecimalLength(a,b) {
  var a = a.toString(10);
  var b = b.toString(10);
  var decimalLength = 0;
  if (a.split('.')[1]) {
    decimalLength = Math.max(decimalLength,a.split('.')[1].length);
  }
  if (b.split('.')[1]) {
    decimalLength = Math.max(decimalLength,b.split('.')[1].length);
  }
  var result = decimalLength + 1;
  return result;
}

function sanitizeInput(input) {
  if(input === null || input === '') {return input;}
  input = input.trim();
  if(input[0] === '$') {
    input = input.substr(1);
  }
  return input;
}

var input1 = document.getElementById("entry_price");
input1.addEventListener("keyup", runCalculateButton);

var input2 = document.getElementById("exit_price");
input2.addEventListener("keyup", runCalculateButton);

var input3 = document.getElementById("tick_size");
input3.addEventListener("keyup", runCalculateButton);

var input4 = document.getElementById("dollars_per_tick");
input4.addEventListener("keyup", runCalculateButton);

var input5 = document.getElementById("variable_pf");
input5.addEventListener("keyup", runCalculateButton);

// check browser cache for variable profit factor
if(localStorage.getItem("variablePF") !== null) {
  input5.value = localStorage.getItem("variablePF");
}

function runCalculateButton(event) {
  event.preventDefault();
  if (event.keyCode === 13) {
    document.getElementById("calculate_button").click();
  }
}
