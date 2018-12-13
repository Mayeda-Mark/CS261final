var isMonthly = false;

function header() {
  var text = "<div class='dropdown'><button onclick='myFunction();' class='dropbtn'>Menu</button><span class='bar'>Mortgage-Tron 5000</span><div id='myDropdown' class='dropdown-content'><a href='mortgage.html'>Home</a><a href='aboutMortgage.html'>About Mortgages</a><a href='aboutApp.html'>About the App</a><a href='disclaimer.html'>Disclaimer</a></div></div>"
  document.getElementById('header').innerHTML = text;
}

function storeLocal() {
  localStorage.setItem("principle", document.getElementById("principle").value);
  localStorage.setItem("length", document.getElementById("length").value);
  localStorage.setItem("DPAmnt", document.getElementById("DPAmnt").value);
  localStorage.setItem("DPPcnt", document.getElementById("DPPcnt").value);
  localStorage.setItem("interest", document.getElementById("interest").value);
}

function getLocal() {
  document.getElementById("principle").value = localStorage.getItem("principle");
  document.getElementById("length").value = localStorage.getItem("length");
  document.getElementById("DPAmnt").value = localStorage.getItem("DPAmnt");
  document.getElementById("DPPcnt").value = localStorage.getItem("DPPcnt");
  document.getElementById("interest").value = localStorage.getItem("interest");
}

function resetMonthly() {
  isMonthly = false;
  document.getElementById.innerHTML = "";
}

function select() {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
    	if (this.readyState == 4 && this.status == 200) {
       		var parse = JSON.parse(xhttp.responseText);
       		var state = "State: <select id=\"stateInfo\" style=\"border: outset;\" onchange=\"stateInsurance(); resetMonthly();\" \"storeLocal();\"><option value = \"\">- Select -</option>"
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
    var x = (amnt / principle) * 100;
    var n = x.toFixed(3);
    document.getElementById('DPPcnt').value = n;
  }
}

function DPAmntChange() {
  if (document.getElementById('principle')) {
  var principle = document.getElementById('principle').value;
    var placeholder = document.getElementById('DPPcnt').value;
    var pcnt = document.getElementById('DPPcnt').value * .001;
    var x = principle * pcnt;
    var y = x.toFixed(2);
    document.getElementById('DPAmnt').value = y;
  }
}

function makeTable() {

  var table = "<button type='button' class='btn' onclick='closeTable();'>Close</button><table><tr><th>Period</th><th>Beginning Principle</th><th>Interest Paid</th><th>Principle Paid</th><th>Remaining</th></tr>";
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
  setTimeout(eraseTable, 1000);
}

function eraseTable() {
  document.getElementById('tableFill').innerHTML = "";
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

  if (!isMonthly) {
    document.getElementById('monthly').innerHTML = "";
    var para = document.createElement("P");
    var text = document.createTextNode("Monthly Payment: $" + b);
    para.appendChild(text);
    document.getElementById('monthly').appendChild(para);
    isMonthly = true;
  }
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