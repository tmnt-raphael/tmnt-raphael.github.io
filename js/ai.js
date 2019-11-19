document.getElementById("calculate_button").addEventListener("click", doCalculations);

function doCalculations() {
  var variablePF = getVariablePF();
  console.log(variablePF);
  setVariablePF();
  var a = sanitizeInput(document.getElementById('entry_price').value);
  var b = sanitizeInput(document.getElementById('exit_price').value);
  if(a === '' && b === '') { return; }

  var decimalLength = Math.max(getDecimalLength(a,b), getDecimalLength(variablePF, variablePF));

  var temp = [a, b, variablePF];
  for (var i = 0; i < temp.length; i++) {
    Math.max(decimalLength, getDecimalLength(temp[i]));
  }
  decimalLength += 2

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

  document.getElementById("profit_price_0").innerHTML = a;
  document.getElementById("profit_price_60").innerHTML = e;
  document.getElementById("profit_price_100").innerHTML = b;
  document.getElementById("profit_price_150").innerHTML = f;
  document.getElementById("profit_price_-100").innerHTML = g;

  if (document.getElementById('tick_size').value != null &&
    document.getElementById('tick_size').value != "" &&
    document.getElementById('dollars_per_tick').value != null &&
    document.getElementById('dollars_per_tick').value != "") {
    var profit60 = /*Math.abs(e-a)*/(b-a)*variablePF*d/c;

    var variableProfitTag = document.getElementById("profit_60");
    if(darkMode === true) {
      if(profit60 < 0) {
        variableProfitTag.classList.add("dark-theme-red");
        variableProfitTag.classList.remove("dark-theme-green");
      } else if(profit60 > 0) {
        variableProfitTag.classList.add("dark-theme-green");
        variableProfitTag.classList.remove("dark-theme-red");
      } else {
        variableProfitTag.classList.remove("dark-theme-red");
        variableProfitTag.classList.remove("dark-theme-green");
      }
    } else {
      if(profit60 < 0) {
        variableProfitTag.classList.add("light-theme-red");
        variableProfitTag.classList.remove("light-theme-green");
      } else if(profit60 > 0) {
        variableProfitTag.classList.add("light-theme-green");
        variableProfitTag.classList.remove("light-theme-red");
      } else {
        variableProfitTag.classList.remove("light-theme-red");
        variableProfitTag.classList.remove("light-theme-green");
      }
    }

    document.getElementById("profit_60").innerHTML = "$" + profit60.toFixed(2);

    var profit100 = Math.abs((a-b)*d/c);
    document.getElementById("profit_100").innerHTML = "$" + profit100.toFixed(2);
    var profit150 = Math.abs((a-f)*d/c);
    document.getElementById("profit_150").innerHTML = "$" + profit150.toFixed(2);
    var profitNeg100 = -1*Math.abs((a-g)*d/c);
    var profitNeg100String = profitNeg100.toFixed(2).toString();
    document.getElementById("profit_-100").innerHTML ="$" + profitNeg100String;
  } else {
    document.getElementById("profit_60").innerHTML = '';
    document.getElementById("profit_100").innerHTML = '';
    document.getElementById("profit_150").innerHTML = '';
    document.getElementById("profit_-100").innerHTML = '';
  }
}

function sanitizeVariablePF(variablePF) {
  var result = variablePF.trim();
  result = result.replace(/[^0-9-]+?$/, "");

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
  var valueToSet = getVariablePF()*100 + "%";

  // set in UI
  document.getElementById("variable_pf").value = valueToSet;

  // set in browser cache
  localStorage.setItem("variablePF", valueToSet);
}

function getDecimalLength(a) {
  var a = a.toString(10);
  var decimalLength = 0;
  if (a.split('.')[1]) {
    decimalLength = Math.max(decimalLength, a.split('.')[1].length);
  }
  return decimalLength;
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
