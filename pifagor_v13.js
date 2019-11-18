function login() {
	var licenseKey = document.getElementById('inputLicenseKey').value;
	if("nbea31" == licenseKey || "1" == licenseKey) {
		document.getElementById('inputLicenseKey').value = "";
		// setCookie('licenseKey', licenseKey, {secure: true, 'max-age': 3600});
		setCookie('licenseKey', licenseKey, 3);
		document.getElementById("inputLicenseKey").innerHtml = "";
		document.getElementById("loginError").style.display = "none";
		document.getElementById("pifagorLogin").style.display = "none";
		document.getElementById("pifagorBody").style.display = "";
	} else {
		document.getElementById("loginError").style.display = "";
	}
}

function logout() {
	deleteCookie('licenseKey');
	document.getElementById("pifagorLogin").style.display = "";
	document.getElementById("pifagorBody").style.display = "none";
}

var deleteCookie = function(name) {
    document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
};

function checkCookie() {
	var licenseKey = getCookie("licenseKey");
	if(licenseKey) {
		document.getElementById("pifagorLogin").style.display = "none";
		document.getElementById("pifagorBody").style.display = "";
	} else {
		document.getElementById("pifagorLogin").style.display = "";
		document.getElementById("pifagorBody").style.display = "none";
	}
}

function getCookie(name) {
	let matches = document.cookie.match(new RegExp(
		"(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
	));
	return matches ? decodeURIComponent(matches[1]) : undefined;
}

function setCookie(name, value, days)
{
	if (days)
	{
		var date = new Date();
		date.setTime(date.getTime()+days*24*60*60*1000); // ) removed
		var expires = "; expires=" + date.toGMTString(); // + added
	}
	else
		var expires = "";
	document.cookie = name+"=" + value+expires + ";path=/"; // + and " added
}

function setCookieOld(name, value, options) {
	// options = {
	//     path: '/',
	//     // при необходимости добавьте другие значения по умолчанию
	//     options
	// };

	options.expires = new Date();

	if (options.expires.toUTCString) {
		options.expires = options.expires.toUTCString();
	}

	let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

	for (let optionKey in options) {
		updatedCookie += "; " + optionKey;
		let optionValue = options[optionKey];
		if (optionValue !== true) {
			updatedCookie += "=" + optionValue;
		}
	}

	document.cookie = updatedCookie;
}

function deleteCookie(name) {
	setCookie(name, "", {
		'max-age': -1
	})
}

function loadHistory (select) {
	var selectedOption = select.options[select.selectedIndex];
	if(selectedOption && selectedOption.value) {
		var el = document.getElementById('myTextarea');
		el.value = el.value + selectedOption.value;
		// var pifagorHistoryObj = JSON.parse(window.localStorage.getItem('pifagorHistory'));
		// if(pifagorHistoryObj[selectedOption]) {
		//     var el = document.getElementById('myTextarea');
		//     el.value = el.value + pifagorHistoryObj[selectedOption];
		// }
	}
}

function fillHistorySelectElement() {
	var select = document.getElementById("selectForHistory");
	if(select.options.length > 1) {
		for(var i = 1; i < select.options.length; i++) {
			select.remove(i);
		}
	}

	var pifagorHistoryObj = JSON.parse(window.localStorage.getItem('pifagorHistory'));

	if(pifagorHistoryObj && Object.keys(pifagorHistoryObj) && Object.keys(pifagorHistoryObj).length > 0) {
		for(var i = 0; i < Object.keys(pifagorHistoryObj).length; i++) {
			var key = Object.keys(pifagorHistoryObj)[i];
			select.options[i+1] = new Option(key, pifagorHistoryObj[key]);
		}
	}

}

function saveAsImg() {


	var copycontent = document.getElementById('copycontent');

	//html2canvas(copycontent).then(canvas => {
	//	document.body.appendChild(canvas)
	//});

	//document.body.style.background = "#ccc";

	html2canvas(copycontent, {
		backgroundColor: null,
		//backgroundColor:'#ffffff',
		//background: "#00FF00",
		//	allowTaint: true,
		onrendered: function (canvas) {
			theCanvas = canvas;
			//document.body.appendChild(canvas);

			//var dataURL = canvas.toDataURL();

			//canvas.style.backgroundColor = 'rgba(158, 167, 184, 0.2)';

			var url = canvas.toDataURL("image/jpeg");

			var aux = document.createElement("a");
			aux.setAttribute("href", url);
			aux.setAttribute("download", "pifagor");
			//aux.setAttribute("onfocus", "document.execCommand('selectAll',false,null)");
			document.body.appendChild(aux);
			aux.click();
			aux.remove();

			/*
		  $("<a>", {
			href: url,
			download: "fileName"
		  })
		  .on("click", function() {$(this).remove()})
		  .appendTo("body")[0].click()
		  */

			/*
								var aux = document.createElement("div");
								aux.setAttribute("contentEditable", true);
								aux.innerHTML = dataURL;
								aux.setAttribute("onfocus", "document.execCommand('selectAll',false,null)");
								document.body.appendChild(aux);
								aux.focus();
								document.execCommand("copy");
								document.body.removeChild(aux);
								*/

			// Convert and download as image
			//Canvas2Image.saveAsJPEG(canvas);
			//$("#img-out").append(canvas);
			// Clean up
			//document.body.removeChild(canvas);
		}
	});
}

function clearPifagorTables() {
	var divTalbes = document.getElementById('tables');
	//alert(divTalbes);
	while (divTalbes.firstChild) {
		divTalbes.removeChild(divTalbes.firstChild);
	}
}

function handleFileSelectClear(evt) {
	document.getElementById("files").value = "";
	document.getElementById("folder").value = "";
}


function clearDates() {
	document.getElementById('myTextarea').value = "";
	clearPifagorTables();
	document.getElementById("resultMsg").innerHTML = "";
	document.getElementById("resultMsg").style.display = "none";
	document.getElementById("resultError").innerHTML = "";
	document.getElementById("resultError").style.display = "none";
}

function clearFilter() {
	document.getElementById('filter').value = "";
	document.getElementById('filterAbsent').value = "";
	document.getElementById('filterName').value = "";
	document.getElementById('filterSoulLevel').value = "";
	document.getElementById('filterDay').value = "";
	document.getElementById('filterMonth').value = "";
	document.getElementById('filterYear').value = "";
	document.getElementById('filterStolb1').value = "";
	document.getElementById('filterStolb2').value = "";
	document.getElementById('filterFlowUp').value = "";
	document.getElementById('filterFlowDown').value = "";
	document.getElementById('filterFlowUpBool').checked = "checked";
	document.getElementById('filterFlowDownBool').checked = "checked";
	document.getElementById('filterFlowEqualsBool').checked = "checked";
	document.getElementById('filterShowOnlyDigits').value = "";
	document.getElementById('filterPsyType1').checked = "checked";
	document.getElementById('filterPsyType2').checked = "checked";
	document.getElementById('filterPsyType3').checked = "checked";
	document.getElementById('filterHideAdditionalDigits').checked = "checked";
	document.getElementById('filterHideNames').checked = "";
	document.getElementById('filterHideBirthdays').checked = "";
	document.getElementById('filterHideAge').checked = "";
	clearPifagorTables();
	document.getElementById("resultMsg").innerHTML = "";
	document.getElementById("resultMsg").style.display = "none";
	document.getElementById("resultError").innerHTML = "";
	document.getElementById("resultError").style.display = "none";
}

function handleFileSelect(evt) {
	var files = evt.target.files; // FileList object

	var result = "";
	logMessages = [];

	// Loop through the FileList and render image files as thumbnails.
	for (var i = 0, f; f = files[i]; i++) {

		if (f.type != 'text/plain') {
			continue;
		}

		console.log(f.name);

		var reader = new FileReader();

		// Closure to capture the file information.
		reader.onload = (function (theFile) {
			return function (e) {
				// Render thumbnail.
				//console.log(e.target.result);

				console.log(e.target.result);

				//logMessages.push("Начало конвертации...");

				var el = document.getElementById('myTextarea');
				el.value = el.value + e.target.result;

				//alert(el.getElementsByClassName('MsoTableGrid').length);
				/*
				try {

					var tables = el.getElementsByClassName('MsoTableGrid');

					logMessages.push("tables length:" + tables.length);
					document.getElementById("log").value = logMessages.join("\n");

					for(var i = 0; i < tables.length; i++) {

					  try {

						  var table = tables[i];

						  result = result + getDataFromTable(table, 0, 0);
						  result = result + getDataFromTable(table, 1, 6);

					  } catch(e) {
						  logMessages.push('Ошибка первый уровень ' + e.name + ":" + e.message + " stack: " + e.stack);
						  document.getElementById("log").value = logMessages.join("\n");
					  }
					}

				} catch(e) {
				  logMessages.push('Ошибка второй уровень ' + e.name + ":" + e.message + " stack: " + e.stack);
				  document.getElementById("log").value = logMessages.join("\n");
				}

				document.getElementById("result").value = result;
				document.getElementById("log").value = logMessages.join("\n");
				console.log(result);
				*/

				//document.getElementById("files").value = "";
			};
		})(f);

		// Read in the image file as a data URL.
		//reader.readAsText(f,['cP1251']);
		reader.readAsText(f, 'cP1251');
	}
}

function showHideAdditionalDigits() {
	hadMode = hadMode == 0 ? 1 : 0;
	calcPifagors();
}

function showHideAge() {
	calcPifagors();
}

function showHideNames() {
	hideNamesMode = hideNamesMode == 0 ? 1 : 0;
	calcPifagors();
}

function changeNumberMatrixInRow() {
	var matrixInRow = document.getElementById('2MatrixInRow').checked;
	tablesMatrixStyle = matrixInRow ? "form-group col-md-6" : "form-group col-md-4";
	calcPifagors();
}

function showHideBirthdays() {
	hideBirthdaysMode = hideBirthdaysMode == 0 ? 1 : 0;
	calcPifagors();
}

function enterPressed(e) {
	//See notes about 'which' and 'key'
	if (e.keyCode == 13) {
		calcPifagors();
		return false;
	}
}

function parseDate(str) {
	var dateParts = str.split(".");
	if (dateParts.length != 3)
		return null;
	var year = dateParts[2];
	var month = dateParts[1];
	var day = dateParts[0];

	if (isNaN(day) || isNaN(month) || isNaN(year))
		return null;

	var result = new Date(year, (month - 1), day);
	if (result == null)
		return null;
	if (result.getDate() != day)
		return null;
	if (result.getMonth() != (month - 1))
		return null;
	if (result.getFullYear() != year)
		return null;

	return result;
}

function repeats(str, count) {
	return Array(count + 1).join(str);
}

function calcPifagor(dataBirthday, personName) {

	var result = {
		personName: '',
		day: '',
		month: '',
		year: '',
		A: '',
		age: '',
		B: '',
		V: '',
		G: '',
		D: '',
		E: '',
		count1: 0,
		count2: 0,
		count3: 0,
		count4: 0,
		count5: 0,
		count6: 0,
		count7: 0,
		count8: 0,
		count9: 0,
		stolb1: 0,
		stolb2: 0,
		flowUp: 0,
		flowDown: 0,
		flowEquals: false,
		psyType: 0,
		errors: []
	};

	result.id = uuidv4();
	
	if(!personName) {
		personName = "";
	}
	result.personName = personName;

	var errMsg = dataBirthday + " не корректная дата рождения (Пример 26.05.1799;Пушкин)";

	var birthDateParsed = parseDate(dataBirthday);
	if (birthDateParsed == null) {
		result.errors.push(errMsg);
		return result;
	}

	var dataBirthdaySplited = dataBirthday.split(".");

	if (dataBirthdaySplited.length != 3) {
		result.errors.push(errMsg);
		return result;
	}

	var day = dataBirthdaySplited[0];
	if (day.length == 1) {
		day = "0" + day;
	} else if (day.length != 2) {
		result.errors.push(errMsg);
		return result;
	}

	var dayInt = parseInt(day);
	var day1 = parseInt(day.charAt(0));
	var day2 = parseInt(day.charAt(1));

	var month = dataBirthdaySplited[1];
	if (month.length == 1) {
		month = "0" + month;
	} else if (month.length != 2) {
		result.errors.push(errMsg);
		return result;
	}
	var monthInt = parseInt(month);
	var month1 = parseInt(month.charAt(0));
	var month2 = parseInt(month.charAt(1));

	var year = dataBirthdaySplited[2];
	if (year.length != 4) {
		result.errors.push(errMsg);
		return result;
	}
	var yearInt = parseInt(year);
	var year1 = parseInt(year.charAt(0));
	var year2 = parseInt(year.charAt(1));
	var year3 = parseInt(year.charAt(2));
	var year4 = parseInt(year.charAt(3));

	var A = dayInt + monthInt + year1 + year2 + year3 + year4;
	if (A > 59) {
		var AStr = A.toString();
		var A1 = parseInt(AStr.charAt(0));
		var A2 = parseInt(AStr.charAt(1));
		A = A1 + A2;
	}

	var B = day1 + day2 + month1 + month2 + year1 + year2 + year3 + year4;

	var V = B;
	if (B > 9) {
		var BStr = B.toString();
		var B1 = parseInt(BStr.charAt(0));
		var B2 = parseInt(BStr.charAt(1));
		V = B1 + B2;
	}

	var G;
	if (yearInt >= 1900 && yearInt < 2000) {
		G = -2;
	} else if (yearInt >= 2000) {
		G = +19;
	} else if (yearInt >= 1700 && yearInt < 1900) {
		G = +29;
	} else {
		result.errors.push(dataBirthday + " Данный год не расчитать. Доступный год с 1700 и позже");
		return result;
	}

	var D = B + G;

	var E = D;
	if (E > 9) {
		var DStr = D.toString();
		var D1 = parseInt(DStr.charAt(0));
		var D2 = parseInt(DStr.charAt(1));
		E = D1 + D2;
	}

	var commonStr = day + month + year + B + V + G + D + E;

	var count1 = (commonStr.match(/1/g) || []).length;
	var count2 = (commonStr.match(/2/g) || []).length;
	var count3 = (commonStr.match(/3/g) || []).length;
	var count4 = (commonStr.match(/4/g) || []).length;
	var count5 = (commonStr.match(/5/g) || []).length;
	var count6 = (commonStr.match(/6/g) || []).length;
	var count7 = (commonStr.match(/7/g) || []).length;
	var count8 = (commonStr.match(/8/g) || []).length;
	var count9 = (commonStr.match(/9/g) || []).length;

	var stolb1 = count1 * 1 + count2 * 2 + count3 * 3;
	var stolb2 = count4 * 4 + count5 * 5 + count6 * 6;

	var flowUp = count3 + count5 + count7;
	var flowDown = count1 + count5 + count9;
	var flowEquals = flowUp == flowDown;

	// calculate psy type
	var psyType = 0;
	if (count1 > count2) {
		psyType = 1;
	} else if (count1 < count2) {
		psyType = 2;
	} else if (count1 == count2) {
		psyType = 3;
	}

	result.day = day;
	result.month = month;
	result.year = year;
	result.A = A; //'А=' + A;
	result.age = calculate_age(birthDateParsed); //'age=' + age;
	result.B = B; //'Б=' + B;
	result.V = V; //'В=' + V;
	result.G = G; //'Г=' + G;
	result.D = D; //'Д=' + D;
	result.E = E; //'Е=' + E;
	result.count1 = count1;
	result.count2 = count2;
	result.count3 = count3;
	result.count4 = count4;
	result.count5 = count5;
	result.count6 = count6;
	result.count7 = count7;
	result.count8 = count8;
	result.count9 = count9;
	result.stolb1 = stolb1;
	result.stolb2 = stolb2;
	result.flowUp = flowUp;
	result.flowDown = flowDown;
	result.flowEquals = flowEquals;
	result.psyType = psyType;

	return result;
}

function calculate_age(dob) { 
	var diff_ms = Date.now() - dob.getTime();
	var age_dt = new Date(diff_ms); 
  
	return Math.abs(age_dt.getUTCFullYear() - 1970);
}

function showAD(result) {
	return hadMode == 0 ? result : '';
}

function showAge(result) {
	return document.getElementById('filterHideAge').checked ? '' : result;
}

function showName(result) {
	return hideNamesMode == 0 ? result : '';
}

function showBirthdays(result) {
	return hideBirthdaysMode == 0 ? result : '';
}

function showDigits(digit) {

	var filterShowOnlyDigits = document.getElementById("filterShowOnlyDigits").value.trim();

	if (digit && digit.length > 0 && filterShowOnlyDigits && filterShowOnlyDigits.length > 0) {
		if (filterShowOnlyDigits.indexOf(digit.charAt(0)) < 0) {
			return "";
		}
	}

	return digit;
}


function setData(table, rowIndex, cellIndex, val) {
	table.rows[rowIndex].cells[cellIndex].getElementsByTagName('o:p')[0].innerHTML = val;
}

function fillData(result, colInx1, colIndx2) {

	var pifagorTableId = result.id;

	var rowIndex = 1;
	var pifagorTableId = pifagorTablePrefix + pifagorTableId;
	//console.log(document.getElementById(pifagorTableId));
	// var table = document.getElementById(pifagorTableId).getElementsByClassName("MsoTableGrid")[0];
	var table = document.getElementById(pifagorTableId);
	//console.log(table.rows[rowIndex].cells[0].getElementsByTagName('o:p')[0])

	setData(table, 0, 0 + colInx1, showName(result.personName));

	// 1 row
	//table.rows[rowIndex].cells[0].innerHTML = result.day;
	setData(table, rowIndex, 0 + colIndx2, showBirthdays(result.day));
	setData(table, rowIndex, 1 + colIndx2, showBirthdays(result.month));
	setData(table, rowIndex, 2 + colIndx2, showBirthdays(result.year));
	setData(table, rowIndex, 3 + colIndx2, result.A); //'А=' + A;
	setData(table, rowIndex, 5 + colIndx2, showAge(result.age)); //'age=' + age;

	// 2 row
	rowIndex++;
	setData(table, rowIndex, 3 + colIndx2, showAD(result.B)); //'Б=' + B;
	setData(table, rowIndex, 4 + colIndx2, showAD(result.V)); //'В=' + V;

	// 3 row
	rowIndex++;
	setData(table, rowIndex, 0 + colIndx2, showDigits(repeats("1", result.count1)));
	setData(table, rowIndex, 1 + colIndx2, showDigits(repeats("4", result.count4)));
	setData(table, rowIndex, 2 + colIndx2, showDigits(repeats("7", result.count7)));
	setData(table, rowIndex, 3 + colIndx2, showAD(result.G > 0 ? "+" + result.G : result.G));//'Г=' + G;
	setData(table, rowIndex, 4 + colIndx2, showAD(result.D)); //'Д=' + D;
	setData(table, rowIndex, 5 + colIndx2, showAD(result.E)); //'Е=' + E;

	// 4 row
	rowIndex++;
	setData(table, rowIndex, 0 + colIndx2, showDigits(repeats("2", result.count2)));
	setData(table, rowIndex, 1 + colIndx2, showDigits(repeats("5", result.count5)));
	setData(table, rowIndex, 2 + colIndx2, showDigits(repeats("8", result.count8)));

	// 5 row
	rowIndex++;
	setData(table, rowIndex, 0 + colIndx2, showDigits(repeats("3", result.count3)));
	setData(table, rowIndex, 1 + colIndx2, showDigits(repeats("6", result.count6)));
	setData(table, rowIndex, 2 + colIndx2, showDigits(repeats("9", result.count9)));
	setData(table, rowIndex, 4 + colIndx2, result.stolb1);
	setData(table, rowIndex, 5 + colIndx2, result.stolb2);
}

function uuidv4() {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
		var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
		return v.toString(16);
	});
}

function getFilterData(result) {

	var filterResult = {
		'digits': [],
		'digitsAbsent': [],
		'names': [],
		'soulLevels': [],
		'days': [],
		'months': [],
		'years': [],
		'stolb1s': [],
		'stolb2s': [],
		'flowUp': [],
		'flowDown': [],
		'flowUpBool': true,
		'flowDownBool': true,
		'flowEquals': true,
		'showOnlyDigits': [],
		'psyType1': true,
		'psyType2': true,
		'psyType3': true,
	};

	if(!document.getElementById("filter")) {
		return filterResult;
	}
	
	fillFilterResult("filter", filterResult.digits);
	fillFilterResult("filterAbsent", filterResult.digitsAbsent);
	fillFilterResult("filterName", filterResult.names);
	fillFilterResult("filterSoulLevel", filterResult.soulLevels);
	fillFilterResult("filterDay", filterResult.days);
	fillFilterResult("filterMonth", filterResult.months);
	fillFilterResult("filterYear", filterResult.years);
	fillFilterResult("filterStolb1", filterResult.stolb1s);
	fillFilterResult("filterStolb2", filterResult.stolb2s);
	fillFilterResult("filterFlowUp", filterResult.flowUp);
	fillFilterResult("filterFlowDown", filterResult.flowDown);
	fillFilterResult("filterShowOnlyDigits", filterResult.showOnlyDigits);

	filterResult.flowUpBool = document.getElementById('filterFlowUpBool').checked;
	filterResult.flowDownBool = document.getElementById('filterFlowDownBool').checked;
	filterResult.flowEquals = document.getElementById('filterFlowEqualsBool').checked;

	filterResult.psyType1 = document.getElementById('filterPsyType1').checked;
	filterResult.psyType2 = document.getElementById('filterPsyType2').checked;
	filterResult.psyType3 = document.getElementById('filterPsyType3').checked;

	console.log(filterResult);

	return filterResult;
}

function fillFilterResult(elementId, array) {
	var filterElement = document.getElementById(elementId).value;
	if (filterElement) {
		filterElement = filterElement.trim();
		var filterSplitted = filterElement.split(",");
		for (var i = 0; i < filterSplitted.length; i++) {
			var val = filterSplitted[i].trim();
			array.push(val);
		}
	}
}

function between(x, min, max) {
	return x >= min && x <= max;
}

function isApplicableForFilter(filter, pifagorResult) {

	var result = true;
	
	if(!filter) {
		return result;
	}

	if (filter.digits && filter.digits.length > 0) {

		var filterOriginal = document.getElementById("filter").value;

		if (
			(filterOriginal.indexOf("1") < 0 || isApplicableDataForDigits(filter.digits, repeats("1", pifagorResult.count1))) &&
			(filterOriginal.indexOf("2") < 0 || isApplicableDataForDigits(filter.digits, repeats("2", pifagorResult.count2))) &&
			(filterOriginal.indexOf("3") < 0 || isApplicableDataForDigits(filter.digits, repeats("3", pifagorResult.count3))) &&
			(filterOriginal.indexOf("4") < 0 || isApplicableDataForDigits(filter.digits, repeats("4", pifagorResult.count4))) &&
			(filterOriginal.indexOf("5") < 0 || isApplicableDataForDigits(filter.digits, repeats("5", pifagorResult.count5))) &&
			(filterOriginal.indexOf("6") < 0 || isApplicableDataForDigits(filter.digits, repeats("6", pifagorResult.count6))) &&
			(filterOriginal.indexOf("7") < 0 || isApplicableDataForDigits(filter.digits, repeats("7", pifagorResult.count7))) &&
			(filterOriginal.indexOf("8") < 0 || isApplicableDataForDigits(filter.digits, repeats("8", pifagorResult.count8))) &&
			(filterOriginal.indexOf("9") < 0 || isApplicableDataForDigits(filter.digits, repeats("9", pifagorResult.count9)))
		) {
			result = true;
		} else {
			//result = false;
			return false;
		}
	}

	if (filter.digitsAbsent && filter.digitsAbsent.length > 0) {

		var filterOriginal = document.getElementById("filterAbsent").value;

		if (
			(filterOriginal.indexOf("1") < 0 || pifagorResult.count1 <= 0) &&
			(filterOriginal.indexOf("2") < 0 || pifagorResult.count2 <= 0) &&
			(filterOriginal.indexOf("3") < 0 || pifagorResult.count3 <= 0) &&
			(filterOriginal.indexOf("4") < 0 || pifagorResult.count4 <= 0) &&
			(filterOriginal.indexOf("5") < 0 || pifagorResult.count5 <= 0) &&
			(filterOriginal.indexOf("6") < 0 || pifagorResult.count6 <= 0) &&
			(filterOriginal.indexOf("7") < 0 || pifagorResult.count7 <= 0) &&
			(filterOriginal.indexOf("8") < 0 || pifagorResult.count8 <= 0) &&
			(filterOriginal.indexOf("9") < 0 || pifagorResult.count9 <= 0)
		) {
			result = true;
		} else {
			//result = false;
			return false;
		}
	}

	if (filter.names && filter.names.length > 0) {

		var searchResultForName = false;
		for (var i = 0; i < filter.names.length; i++) {
			if (pifagorResult.personName.toLowerCase().indexOf(filter.names[i].toLowerCase()) > -1) {
				searchResultForName = true;
				break;
			}
		}

		if (searchResultForName == false) {
			return false;
		}
	}

	if (!isApplicableData(filter.soulLevels, pifagorResult.A)) {
		return false;
	}

	if (!isApplicableData(filter.days, pifagorResult.day)) {
		return false;
	}

	if (!isApplicableData(filter.months, pifagorResult.month)) {
		return false;
	}

	if (!isApplicableData(filter.years, pifagorResult.year)) {
		return false;
	}

	if (!isApplicableData(filter.stolb1s, pifagorResult.stolb1)) {
		return false;
	}

	if (!isApplicableData(filter.stolb2s, pifagorResult.stolb2)) {
		return false;
	}

	if (!isApplicableData(filter.flowUp, pifagorResult.flowUp)) {
		return false;
	}

	if (!isApplicableData(filter.flowDown, pifagorResult.flowDown)) {
		return false;
	}

	if (filter.flowUpBool == false && pifagorResult.flowUp > pifagorResult.flowDown) {
		return false;
	}

	if (filter.flowDownBool == false && pifagorResult.flowDown > pifagorResult.flowUp) {
		return false;
	}

	if (filter.flowEquals == false && pifagorResult.flowUp == pifagorResult.flowDown) {
		return false;
	}

	if (filter.psyType1 == false && pifagorResult.psyType == 1) {
		return false;
	}

	if (filter.psyType2 == false && pifagorResult.psyType == 2) {
		return false;
	}

	if (filter.psyType3 == false && pifagorResult.psyType == 3) {
		return false;
	}

	return result;
}

function isApplicableData(dataArray, dataVal) {

	if (dataArray && dataArray.length > 0) {
		try {
			var searchResult = false;
			for (var i = 0; i < dataArray.length; i++) {
				var filterDataItem = dataArray[i];
				var filterDataItemSplitted = filterDataItem.split("-");
				var minLevel = parseInt(filterDataItemSplitted[0]);
				var maxLevel = parseInt(filterDataItemSplitted.length >= 2 ? filterDataItemSplitted[1] : filterDataItemSplitted[0]);
				var dataValInt = parseInt(dataVal);

				if (between(dataValInt, minLevel, maxLevel)) {
					searchResult = true;
					break;
				}
			}

			if (searchResult == false) {
				return false;
			}
		} catch (err) {
			console.log("Что-то не верно в фильтре" + err);
			return true;
		}
	}

	return true;
}

function isApplicableDataForDigits(dataArray, dataVal) {

	if (dataArray && dataArray.length > 0) {
		try {
			var searchResult = false;
			for (var i = 0; i < dataArray.length; i++) {
				var filterDataItem = dataArray[i];
				if (filterDataItem.indexOf(dataVal.substr(0, 1)) < 0) {
					continue;
				}
				var filterDataItemSplitted = filterDataItem.split("-");
				var minLevel = parseInt(filterDataItemSplitted[0].length);
				var maxLevel = parseInt(filterDataItemSplitted.length >= 2 ? filterDataItemSplitted[1].length : filterDataItemSplitted[0].length);
				var dataValInt = parseInt(dataVal.length);

				if (between(dataValInt, minLevel, maxLevel)) {
					searchResult = true;
					break;
				}
			}

			if (searchResult == false) {
				return false;
			}
		} catch (err) {
			console.log("Что-то не верно в фильтре" + err);
			return true;
		}
	}

	return true;
}

function calcPifagors_v1() {
	var date_birthday = document.getElementById("date_birthday").value;
	var people_name = document.getElementById("people_name").value;
	hadMode = 0;
	calcPifagorsBase([date_birthday + ";" + people_name]);
}

function calcPifagors_v2() {
	hadMode = 0;
	var dataBirthdays = document.getElementById("myTextarea").value.split('\n');
	calcPifagorsBase(dataBirthdays);
}

function calcPifagors() {
	var dataBirthdays = document.getElementById("myTextarea").value.split('\n');
	calcPifagorsBase(dataBirthdays);
}

function calcPifagorsBase(dataBirthdays) {
	document.getElementById("resultMsg").value = "";

	clearPifagorTables();

	var countRows = 0;
	var countBirthdays = 0;
	var countCalculatedBirthdaysWithErrors = 0;
	var countCalculatedBirthdaysWithoutErrors = 0;
	var countFiltered = 0;

	var errors = [];
	//var dataBirthdays = document.getElementById("myTextarea").value.split('\n');

	/*
	if(!window.localStorage.getItem('pifagorHistory')) {
		window.localStorage.setItem('pifagorHistory', JSON.stringify({}))
	}

	var pifagorHistoryObj = JSON.parse(window.localStorage.getItem('pifagorHistory'));
	pifagorHistoryObj[new Date()] = document.getElementById("myTextarea").value;
	window.localStorage.setItem('pifagorHistory', JSON.stringify(pifagorHistoryObj))

	fillHistorySelectElement();
	*/

	var filter = getFilterData();
	var currentTableId = undefined;
	countRows = dataBirthdays.length;
	for (var i = 0; i < dataBirthdays.length; i++) {
		if (dataBirthdays[i] && dataBirthdays[i].trim()) {
			countBirthdays++;
			dataBirthday = dataBirthdays[i].trim();
			dataBirthdayArray = dataBirthday.split(";");
			var result = calcPifagor(dataBirthdayArray[0], dataBirthdayArray[1]);
			if (result.errors.length > 0) {
				countCalculatedBirthdaysWithErrors++;
				errors.push(result.errors);
			} else {
				countCalculatedBirthdaysWithoutErrors++;
				if (isApplicableForFilter(filter, result)) {
					countFiltered++;
					if (currentTableId == undefined) {
						currentTableId = result.id;
						generatePifagorTable(result.id);
						currentTableId = undefined;
						fillData(result, 0, 0);
					} else {
						result.id = currentTableId;
						currentTableId = undefined;
						fillData(result, 1, 6);
					}
				}
			}
		}
	}

	/*
	if(errors.length > 0) {
		alert(errors);
	}
	*/

	//var resultMsg = "Количество не пустых строк: " + countBirthdays + " количество ошибок:" + countCalculatedBirthdaysWithErrors + " количество без ошибок:" + countCalculatedBirthdaysWithoutErrors + " количество отфильтровано и показано:" + countFiltered;

	var resultMsg = "Количество: человек: " + countBirthdays + " / ошибок: " + countCalculatedBirthdaysWithErrors + " / без ошибок: " + countCalculatedBirthdaysWithoutErrors + " / отфильтровано и показано: " + countFiltered;

	if(countBirthdays && countBirthdays > 0) {
		document.getElementById("resultMsg").innerHTML = resultMsg;
		document.getElementById("resultMsg").style.display = "";
	} else {
		document.getElementById("resultMsg").innerHTML = "";
		document.getElementById("resultMsg").style.display = "none";
	}

	if(errors.length > 0) {
		document.getElementById("resultError").innerHTML = errors;
		document.getElementById("resultError").style.display = "";
	} else {
		document.getElementById("resultError").innerHTML = "";
		document.getElementById("resultError").style.display = "none";
	}

}

function SelectContent(el) {
	var aux = document.createElement("div");
	aux.setAttribute("contentEditable", true);
	aux.innerHTML = document.getElementById("copycontent").innerHTML;
	aux.setAttribute("onfocus", "document.execCommand('selectAll',false,null)");
	document.body.appendChild(aux);
	aux.focus();
	document.execCommand("copy");
	document.body.removeChild(aux);
}

function generatePifagorTable(index) {
	var myTable = document.getElementById("tmpl");
	var myClone = myTable.cloneNode(true);
	//myClone.style.display = "inline-block";
	myClone.style.display = "";
	myClone.id = pifagorTablePrefix + index;
	var tables = document.getElementById("tables");

	var aux = document.createElement("div");
	//aux.setAttribute("class", "form-group col-md-4");
	aux.setAttribute("class", tablesMatrixStyle);
	aux.appendChild(myClone);

	tables.appendChild(aux);
}


var pifagorTablePrefix = 'pifagorTable_';

var hadMode = 1; //0 - show, 1 - hide
var hideNamesMode = 0; //0 - show, 1 - hide
var hideBirthdaysMode = 0; //0 - show, 1 - hide
var tablesMatrixStyle = "form-group col-md-4";

function init() {

	if(document.getElementById('files')) {
		document.getElementById('files').addEventListener('click', handleFileSelectClear, false);
		document.getElementById('files').addEventListener('change', handleFileSelect, false);
	}

	if(document.getElementById('folder')) {
		document.getElementById('folder').addEventListener('click', handleFileSelectClear, false);
		document.getElementById('folder').addEventListener('change', handleFileSelect, false);
	}

	window.addEventListener('keydown', function (e) {
		if (e.ctrlKey && e.keyCode == 13) {
			// Ctrl + enter pressed
			calcPifagors();
			return false;
		}
	});
	
	var myTable = document.getElementById("tmpl");
    myTable.style.display = "none";

    //calcPifagors();
    checkCookie();
    //window.localStorage.clear();
    //fillHistorySelectElement();
}

