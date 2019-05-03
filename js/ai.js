document.getElementById("calculate_button").addEventListener("click", doCalculations);

function doCalculations() {
  var a = sanitizeInput(document.getElementById('entry_price').value);
  var b = sanitizeInput(document.getElementById('exit_price').value);
  var decimalLength = getDecimalLength(a,b);
  a *= Math.pow(10,decimalLength);
  a = Math.round(a)
  b *= Math.pow(10,decimalLength);
  b = Math.round(b)
  var e = (a+b)/2;;
  var f = b+(b-a)/2;
  var g = a-2*(b-a);
  a /= Math.pow(10,decimalLength);
  b /= Math.pow(10,decimalLength);
  e /= Math.pow(10,decimalLength);
  f /= Math.pow(10,decimalLength);
  g /= Math.pow(10,decimalLength);

  var c = sanitizeInput(document.getElementById('tick_size').value);
  var d = sanitizeInput(document.getElementById('price_per_tick').value);

  document.getElementById("0%_profit_price").innerHTML = a;
  document.getElementById("midpoint_price").innerHTML = e;
  document.getElementById("100%_profit_price").innerHTML = b;
  document.getElementById("150%_profit_price").innerHTML = f;
  document.getElementById("-200%_profit_price").innerHTML = g;

  if (document.getElementById('tick_size').value != null &&
    document.getElementById('tick_size').value != "" &&
    document.getElementById('price_per_tick').value != null &&
    document.getElementById('price_per_tick').value != "") {
    var profit50 = (e-Math.min(a,b))*d/c;
    document.getElementById("50%_profit").innerHTML = "$" + profit50.toFixed(2);
    var profit100 = Math.abs((a-b)*d/c);
    document.getElementById("100%_profit").innerHTML = "$" + profit100.toFixed(2);
    var profit150 = Math.abs((a-f)*d/c);
    document.getElementById("150%_profit").innerHTML = "$" + profit150.toFixed(2);
    var profit200 = -1*Math.abs((a-g)*d/c);
    var profit200String = profit200.toFixed(2).toString();
    document.getElementById("-200%_profit").innerHTML ="$" + profit200String;
  } else {
    document.getElementById("50%_profit").innerHTML = '';
    document.getElementById("100%_profit").innerHTML = '';
    document.getElementById("150%_profit").innerHTML = '';
    document.getElementById("-200%_profit").innerHTML = '';
  }
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

var input4 = document.getElementById("price_per_tick");
input4.addEventListener("keyup", runCalculateButton);

function runCalculateButton(event) {
  event.preventDefault();
  if (event.keyCode === 13) {
    document.getElementById("calculate_button").click();
  }
}
