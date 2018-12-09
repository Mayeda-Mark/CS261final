function select() {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
    	if (this.readyState == 4 && this.status == 200) {
       		var parse = JSON.parse(xhttp.responseText);
       		var state = "State: <select id=\"stateInfo\" style=\"border: outset;\" onchange=\"stateInsurance();\"><option value = \"\">- Select -</option>"
       		for(var i = 0; i < parse.length; i++) {
       			state += "<option value= \"" + parse[i].rate + "\">" + parse[i].state + "</option>";
       		}
       		state += "</select>"
       		document.getElementById('stateSelect').innerHTML = state;
    	}
	};
	xhttp.open("GET", "interest.json", true);
	xhttp.send();
}

function stateInsurance() {
  var rate = document.getElementById('stateInfo').value;
  document.getElementById('interest').value = rate;
}

function DPPrecentChange() {
  if (document.getElementById('principle')) {
    var amnt = document.getElementById('DPAmnt').value;
    var principle = document.getElementById('principle').value;
    document.getElementById('DPPcnt').value = (amnt / principle) * 100;
  }
}

function DPAmntChange() {
  if (document.getElementById('principle')) {
  var principle = document.getElementById('principle').value;
    var placeholder = document.getElementById('DPPcnt').value;
    var pcnt = document.getElementById('DPPcnt').value * .001;
    document.getElementById('DPAmnt').value = principle * pcnt;
  }
}

function makeTable() {

  var table = "<button type='button' onclick='closeTable();'>Close</button><table><tr><th>Period</th><th>Beginning Principle</th><th>Interest Paid</th><th>Principle Paid</th><th>Remaining</th></tr>";
  var principle = parseFloat(document.getElementById('principle').value);
  var interest = parseFloat(document.getElementById('interest').value) / 100;
  var downPayment = parseFloat(document.getElementById('DPAmnt').value);
  var length = parseInt(document.getElementById('length').value);
  var remaining = principle - downPayment;
  var mInterest = interest / 12;
  var periods = length * 12;
  var innerParenth =  Math.pow((1 + mInterest), periods);
  var monthly = (remaining * ((mInterest * innerParenth) / (innerParenth - 1)));
  for(var i = 0; i < length * 12; i++) {
    var interestPay = mInterest * remaining;
    var payOnPrinciple = monthly - interestPay;
    var a = remaining.toFixed(2);
    var b = monthly.toFixed(2);
    var c = interestPay.toFixed(2);
    var d = payOnPrinciple.toFixed(2);

    table += "<tr><td>" + (i + 1); 
    table += "</td><td>$" + a;
    table += "</td><td>$" + c;
    table += "</td><td>$" + d;
    remaining -= (monthly - interestPay);
    var a = remaining.toFixed(2);
    table += "</td><td>$" + a;
    table += "</td></tr>";
  }
  table += "</table>";
  document.getElementById('tableFill').innerHTML = table;
  document.getElementById('tableFill').style.visibility = 'visible';
  document.getElementById('tableFill').style.opacity = 1;
}

function closeTable() {
  document.getElementById('tableFill').style.visibility = 'hidden';
  document.getElementById('tableFill').style.opacity = 0;
}

function calculate() {
  var principle = parseFloat(document.getElementById('principle').value);
  var interest = parseFloat(document.getElementById('interest').value) / 100;
  var downPayment = parseFloat(document.getElementById('DPAmnt').value);
  var length = parseInt(document.getElementById('length').value);
  var remaining = principle - downPayment;
  var mInterest = interest / 12;
  var periods = length * 12;
  var innerParenth =  Math.pow((1 + mInterest), periods);
  var monthly = (remaining * ((mInterest * innerParenth) / (innerParenth - 1)));
    var b = monthly.toFixed(2);
  document.getElementById('monthly').innerHTML = "Monthly Payment: $" + b;
}

function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}

window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {

    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}