document.getElementById("calculate_button").addEventListener("click", doCalculations);

function doCalculations() {
  var a = document.getElementById('entry_price').value;
  var b = document.getElementById('exit_price').value;
  var decimalLength = getDecimalLength(a,b);
  a *= Math.pow(10,decimalLength);
  b *= Math.pow(10,decimalLength);
  var c = (Math.max(a,b)-Math.min(a,b))/2+Math.min(a,b);
  a /= Math.pow(10,decimalLength);
  b /= Math.pow(10,decimalLength);
  c /= Math.pow(10,decimalLength);

  var d = document.getElementById('tick_size').value;
  var e = document.getElementById('price_per_tick').value;

  document.getElementById("midpoint_price").innerHTML = c;

  if (document.getElementById('tick_size').value != null &&
    document.getElementById('tick_size').value != "" &&
    document.getElementById('price_per_tick').value != null &&
    document.getElementById('price_per_tick').value != "") {
    var profit50 = (c-Math.min(a,b))/d*e;
    document.getElementById("50%_profit").innerHTML = "$" + profit50.toFixed(2);
    var profit100 = Math.abs((a-b)/d*e);
    document.getElementById("100%_profit").innerHTML = "$" + profit100.toFixed(2);
  }
}

function getDecimalLength(a,b){
  var a = a.toString(10);
  var b = b.toString(10);
  var decimalLength = 0;
  if (a.split('.')[1]) {
    decimalLength = Math.max(decimalLength,a.split('.')[1].length);
  }
  if (b.split('.')[1]) {
    decimalLength = Math.max(decimalLength,b.split('.')[1].length);
  }
  return decimalLength+1;
}