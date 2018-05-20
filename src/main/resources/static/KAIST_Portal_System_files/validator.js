if ( ! window.enview )
    window.enview = new Object();
	
if ( ! window.enview.util )
    window.enview.util = new Object();
	
enview.util.Validator = function () {  }
enview.util.Validator.prototype =
{
	validate : function(dataStructure, form)
	{
		var isValid = true;
		//alert("dataStructure.length=" + dataStructure.length);
		for(var i=0; i<dataStructure.length; i++) {
			var validations = dataStructure[i].validation.split(",");
			//alert("validations.length=" + validations.length);
			for(var j=0; j<validations.length; j++) {
				//var methodStr = "validate"+validations[j];
				//alert("methodStr=" + methodStr);
				//var method = eval( "(portalValidator.validate"+validations[j]+")" );
				//method(dataStructure[i], form);
				//this.validateRequired(dataStructure[i], form);
				//alert("method=" + validations[j]);
				switch( validations[j] ) {
					case 'Required' :
						isValid = this.validateRequired(dataStructure[i], form);
						break;
					case 'MinLength' :
						isValid = this.validateMinLength(dataStructure[i], form);
						break;
					case 'MaxLength' :
						isValid = this.validateMaxLength(dataStructure[i], form);
						break;
					case 'Mask' :
						isValid = this.validateMask(dataStructure[i], form);
						break;
					case 'Byte' :
						isValid = this.validateByte(dataStructure[i], form);
						break;
					case 'Short' :
						isValid = this.validateShort(dataStructure[i], form);
						break;
					case 'Integer' :
						isValid = this.validateInteger(dataStructure[i], form);
						break;
					case 'Float' :
						isValid = this.validateFloat(dataStructure[i], form);
						break;
					case 'Date' :
						isValid = this.validateDate(dataStructure[i], form);
						break;
					case 'IntRange' :
						isValid = this.validateIntRange(dataStructure[i], form);
						break;
					case 'FloatRange' :
						isValid = this.validateFloatRange(dataStructure[i], form);
						break;
					case 'CreditCard' :
						isValid = this.validateCreditCard(dataStructure[i], form);
						break;
					case 'Email' :
						isValid = this.validateEmail(dataStructure[i], form);
						break;
					case 'IhIdNum' :
						isValid = this.validateIhIdNum(dataStructure[i], form);
						break;
					case 'Korean' :
						isValid = this.validateKorean(dataStructure[i], form);
						break;
				}
				if( isValid == false ) return false;
			}
		}
	},
	/* ?꾩닔媛?泥댄겕 */
	validateRequired : function(data, form) 
	{
		var isValid = true;
		//alert("data.fieldName=" + data.fieldName + ", form=" + form);
		var field = form[data.fieldName];
		//alert("data.fieldName=" + data.fieldName + ", field=" + field);
		if (field.type == 'text' ||
			field.type == 'textarea' ||
			field.type == 'file' ||
			field.type == 'select-one' ||
			field.type == 'radio' ||
			field.type == 'password') {
			
			var value = '';
			// get field's value
			if (field.type == "select-one") {
				var si = field.selectedIndex;
				if (si >= 0) {
					value = field.options[si].value;
				}
			} else {
				value = field.value;
			}
			
			if (this.trim(value).length == 0) {
			
				field.focus();
				var fieldName = (field.getAttribute("label") != null) ? field.getAttribute("label") : data.fieldName; 
				// portalPage.getMessageResource('pt.ev.property.' + ((data.labelName) ? data.labelName : data.fieldName));
				var msg = portalPage.getMessageResourceByParam('ev.error.validation.required', fieldName);
				alert( msg );
				isValid = false;
			}
		}
		return isValid;
	},
	// Trim whitespace from left and right sides of s.
	trim : function(s) 
	{
		return s.replace( /^\s*/, "" ).replace( /\s*$/, "" );
	},
	/* 理쒖냼 湲몄씠 泥댄겕 */
	validateMinLength : function(data, form) 
	{
		var isValid = true;
		var field = form[data.fieldName];
			
		if (field.type == 'text' ||
			field.type == 'textarea') {
			
			var iMin = parseInt(data.minlength);
			if ((this.trim(field.value).length > 0) && (field.value.length < iMin)) {
				field.focus();
				var fieldName = (field.getAttribute("label") != null) ? field.getAttribute("label") : data.fieldName; 
				//var fieldName = portalPage.getMessageResource('pt.ev.property.' + ((data.labelName) ? data.labelName : data.fieldName));
				var msg = portalPage.getMessageResourceByParam('ev.error.validation.minlength', fieldName);
				alert( msg );
				isValid = false;
			}
		}
		return isValid;
	},
	/* 理쒕? 湲몄씠 泥댄겕 */
	validateMaxLength : function(data, form) 
	{
		//alert("data=" + data + ", form=" + form);
		var isValid = true;
		var field = form[data.fieldName];
			
		if (field.type == 'text' ||
			field.type == 'textarea') {
				
			var iMax = parseInt(data.maxlength);
			if (field.value.length > iMax) {
				field.focus();
				var fieldName = (field.getAttribute("label") != null) ? field.getAttribute("label") : data.fieldName; 
				//var fieldName = portalPage.getMessageResource('pt.ev.property.' + ((data.labelName) ? data.labelName : data.fieldName));
				var msg = portalPage.getMessageResourceByParam('ev.error.validation.maxlength', fieldName);
				alert( msg );
				isValid = false;
			}
		}
		return isValid;
	},
	/* ?뺢퇋??泥댄겕 */
	validateMask : function(data, form) 
	{
		var isValid = true;
		var field = form[data.fieldName];
			
		if ((field.type == 'text' || 
			 field.type == 'textarea') && 
			 (field.value.length > 0)) {
			
			if (!this.matchPattern(field.value, data.mask)) {
				field.focus();
				var fieldName = (field.getAttribute("label") != null) ? field.getAttribute("label") : data.fieldName; 
				//var fieldName = portalPage.getMessageResource('pt.ev.property.' + ((data.labelName) ? data.labelName : data.fieldName));
				var msg = portalPage.getMessageResourceByParam('ev.error.validation.mask', fieldName);
				alert( msg );
				isValid = false;
			}
		}
		return isValid;
	},
	matchPattern : function(value, mask) 
	{
	   return mask.exec(value);
	},
	/* Byte??泥댄겕 */
	validateByte : function(data, form) 
	{
		var bValid = true;
		var field = form[data.fieldName];
			
		if (field.type == 'text' ||
			field.type == 'textarea' ||
			field.type == 'select-one' ||
			field.type == 'radio') {

			var value = '';
			// get field's value
			if (field.type == "select-one") {
				var si = field.selectedIndex;
				if (si >= 0) {
					value = field.options[si].value;
				}
			} else {
				value = field.value;
			}
			
			if (value.length > 0) {
				if (!this.isAllDigits(value)) {
					bValid = false;
					field.focus();
					var fieldName = (field.getAttribute("label") != null) ? field.getAttribute("label") : data.fieldName; 
					//var fieldName = portalPage.getMessageResource('pt.ev.property.' + ((data.labelName) ? data.labelName : data.fieldName));
					var msg = portalPage.getMessageResourceByParam('ev.error.validation.byte', fieldName);
					alert( msg );
				} else {

					var iValue = parseInt(value);
					if (isNaN(iValue) || !(iValue >= -128 && iValue <= 127)) {
						field.focus();
						var fieldName = (field.getAttribute("label") != null) ? field.getAttribute("label") : data.fieldName; 
						//var fieldName = portalPage.getMessageResource('pt.ev.property.' + ((data.labelName) ? data.labelName : data.fieldName));
						var msg = portalPage.getMessageResourceByParam('ev.error.validation.byte', fieldName);
						alert( msg );
						bValid = false;
					}
				}
			}
		}
		return bValid;
	},
	/* Short??泥댄겕 */
	validateShort : function(data, form) 
	{
		var bValid = true;
		var field = form[data.fieldName];
		//alert("data.fieldName=" + data.fieldName + ", form=" + form);
		if (field.type == 'text' ||
			field.type == 'textarea' ||
			field.type == 'select-one' ||
			field.type == 'radio') {
			
			var value = '';
			// get field's value
			if (field.type == "select-one") {
				var si = field.selectedIndex;
				if (si >= 0) {
					value = field.options[si].value;
				}
			} else {
				value = field.value;
			}
			
			if (value.length > 0) {
				if (!this.isAllDigits(value)) {
					bValid = false;
					field.focus();
					var fieldName = (field.getAttribute("label") != null) ? field.getAttribute("label") : data.fieldName; 
					//var fieldName = portalPage.getMessageResource('pt.ev.property.' + ((data.labelName) ? data.labelName : data.fieldName));
					var msg = portalPage.getMessageResourceByParam('ev.error.validation.short', fieldName);
					alert( msg );

				} else {
			
					var iValue = parseInt(value);
					if (isNaN(iValue) || !(iValue >= -32768 && iValue <= 32767)) {
						field.focus();
						var fieldName = (field.getAttribute("label") != null) ? field.getAttribute("label") : data.fieldName; 
						//var fieldName = portalPage.getMessageResource('pt.ev.property.' + data.fieldName);
						var msg = portalPage.getMessageResourceByParam('ev.error.validation.short', fieldName);
						alert( msg );
						bValid = false;
					}
			   }
		   }
		}
		return bValid;
	},
	/* Integer??泥댄겕 */
	validateInteger : function(data, form) 
	{
		var bValid = true;
		var field = form[data.fieldName];

		if (field.type == 'text' ||
			field.type == 'textarea' ||
			field.type == 'select-one' ||
			field.type == 'radio') {
			
			var value = '';
			// get field's value
			if (field.type == "select-one") {
				var si = field.selectedIndex;
				if (si >= 0) {
					value = field.options[si].value;
				}
			} else {
				value = field.value;
			}
			
			if (value.length > 0) {
			
				if (!this.isAllDigits(value)) {
					bValid = false;
					field.focus();
					var fieldName = (field.getAttribute("label") != null) ? field.getAttribute("label") : data.fieldName; 
					//var fieldName = portalPage.getMessageResource('pt.ev.property.' + ((data.labelName) ? data.labelName : data.fieldName));
					var msg = portalPage.getMessageResourceByParam('ev.error.validation.integer', fieldName);
					alert( msg );
					
				} else {
					var iValue = parseInt(value);
					if (isNaN(iValue) || !(iValue >= -2147483648 && iValue <= 2147483647)) {
						field.focus();
						var fieldName = (field.getAttribute("label") != null) ? field.getAttribute("label") : data.fieldName; 
						//var fieldName = portalPage.getMessageResource('pt.ev.property.' + ((data.labelName) ? data.labelName : data.fieldName));
						var msg = portalPage.getMessageResourceByParam('ev.error.validation.integer', fieldName);
						alert( msg );
						bValid = false;
				   }
			   }
		   }
		}
		return bValid;
	},
	isAllDigits : function(argvalue) 
	{
		argvalue = argvalue.toString();
		var validChars = "0123456789";
		var startFrom = 0;
		if (argvalue.substring(0, 2) == "0x") {
		   validChars = "0123456789abcdefABCDEF";
		   startFrom = 2;
		} else if (argvalue.charAt(0) == "0") {
		   validChars = "01234567";
		   startFrom = 1;
		} else if (argvalue.charAt(0) == "-") {
			startFrom = 1;
		}
		
		for (var n = startFrom; n < argvalue.length; n++) {
			if (validChars.indexOf(argvalue.substring(n, n+1)) == -1) return false;
		}
		return true;
	},
	/* Float??泥댄겕 */
	validateFloat : function(data, form) 
	{
		var bValid = true;
		var field = form[data.fieldName];
			
		if (field.type == 'text' ||
			field.type == 'textarea' ||
			field.type == 'select-one' ||
			field.type == 'radio') {
			
			var value = '';
			// get field's value
			if (field.type == "select-one") {
				var si = field.selectedIndex;
				if (si >= 0) {
					value = field.options[si].value;
				}
			} else {
				value = field.value;
			}
			
			if (value.length > 0) {
				// remove '.' before checking digits
				var tempArray = value.split('.');
				var joinedString= tempArray.join('');

				if (!this.isAllDigits(joinedString)) {
					bValid = false;
					field.focus();
					var fieldName = (field.getAttribute("label") != null) ? field.getAttribute("label") : data.fieldName; 
					//var fieldName = portalPage.getMessageResource('pt.ev.property.' + ((data.labelName) ? data.labelName : data.fieldName));
					var msg = portalPage.getMessageResourceByParam('ev.error.validation.float', fieldName);
					alert( msg );

				} else {
					var iValue = parseFloat(value);
					if (isNaN(iValue)) {
						field.focus();
						var fieldName = (field.getAttribute("label") != null) ? field.getAttribute("label") : data.fieldName; 
						//var fieldName = portalPage.getMessageResource('pt.ev.property.' + ((data.labelName) ? data.labelName : data.fieldName));
						var msg = portalPage.getMessageResourceByParam('ev.error.validation.float', fieldName);
						alert( msg );
						bValid = false;
					}
				}
			}
		}
		return bValid;
	},
	/* Date??泥댄겕 */
	validateDate : function(data, form) 
	{
	   var bValid = true;
	   var field = form[data.fieldName];
	   var datePattern = data.datePatternStrict;
	   if ((field.type == 'text' ||
			field.type == 'textarea') &&
		   (value.length > 0) &&
		   (datePattern.length > 0)) {
		 var MONTH = "MM";
		 var DAY = "dd";
		 var YEAR = "yyyy";
		 var orderMonth = datePattern.indexOf(MONTH);
		 var orderDay = datePattern.indexOf(DAY);
		 var orderYear = datePattern.indexOf(YEAR);
		 if ((orderDay < orderYear && orderDay > orderMonth)) {
			 var iDelim1 = orderMonth + MONTH.length;
			 var iDelim2 = orderDay + DAY.length;
			 var delim1 = datePattern.substring(iDelim1, iDelim1 + 1);
			 var delim2 = datePattern.substring(iDelim2, iDelim2 + 1);
			 if (iDelim1 == orderDay && iDelim2 == orderYear) {
				dateRegexp = new RegExp("^(\\d{2})(\\d{2})(\\d{4})$");
			 } else if (iDelim1 == orderDay) {
				dateRegexp = new RegExp("^(\\d{2})(\\d{2})[" + delim2 + "](\\d{4})$");
			 } else if (iDelim2 == orderYear) {
				dateRegexp = new RegExp("^(\\d{2})[" + delim1 + "](\\d{2})(\\d{4})$");
			 } else {
				dateRegexp = new RegExp("^(\\d{2})[" + delim1 + "](\\d{2})[" + delim2 + "](\\d{4})$");
			 }
			 var matched = dateRegexp.exec(value);
			 if(matched != null) {
				if (!this.isValidDate(matched[2], matched[1], matched[3])) {
					field.focus();
					var fieldName = (field.getAttribute("label") != null) ? field.getAttribute("label") : data.fieldName; 
					//var fieldName = portalPage.getMessageResource('pt.ev.property.' + ((data.labelName) ? data.labelName : data.fieldName));
					var msg = portalPage.getMessageResourceByParam('ev.error.validation.date', fieldName);
					alert( msg );
				    bValid =  false;
				}
			 } else {
				field.focus();
				var fieldName = (field.getAttribute("label") != null) ? field.getAttribute("label") : data.fieldName; 
				//var fieldName = portalPage.getMessageResource('pt.ev.property.' + ((data.labelName) ? data.labelName : data.fieldName));
				var msg = portalPage.getMessageResourceByParam('ev.error.validation.date', fieldName);
				alert( msg );
				bValid =  false;
			 }
		 } else if ((orderMonth < orderYear && orderMonth > orderDay)) {
			 var iDelim1 = orderDay + DAY.length;
			 var iDelim2 = orderMonth + MONTH.length;
			 var delim1 = datePattern.substring(iDelim1, iDelim1 + 1);
			 var delim2 = datePattern.substring(iDelim2, iDelim2 + 1);
			 if (iDelim1 == orderMonth && iDelim2 == orderYear) {
				 dateRegexp = new RegExp("^(\\d{2})(\\d{2})(\\d{4})$");
			 } else if (iDelim1 == orderMonth) {
				 dateRegexp = new RegExp("^(\\d{2})(\\d{2})[" + delim2 + "](\\d{4})$");
			 } else if (iDelim2 == orderYear) {
				 dateRegexp = new RegExp("^(\\d{2})[" + delim1 + "](\\d{2})(\\d{4})$");
			 } else {
				 dateRegexp = new RegExp("^(\\d{2})[" + delim1 + "](\\d{2})[" + delim2 + "](\\d{4})$");
			 }
			 var matched = dateRegexp.exec(value);
			 if(matched != null) {
				 if (!this.isValidDate(matched[1], matched[2], matched[3])) {
					field.focus();
					var fieldName = (field.getAttribute("label") != null) ? field.getAttribute("label") : data.fieldName; 
					//var fieldName = portalPage.getMessageResource('pt.ev.property.' + ((data.labelName) ? data.labelName : data.fieldName));
					var msg = portalPage.getMessageResourceByParam('ev.error.validation.date', fieldName);
					alert( msg );
				    bValid =  false;
				  }
			 } else {
				 field.focus();
				 var fieldName = (field.getAttribute("label") != null) ? field.getAttribute("label") : data.fieldName; 
				 //var fieldName = portalPage.getMessageResource('pt.ev.property.' + ((data.labelName) ? data.labelName : data.fieldName));
				 var msg = portalPage.getMessageResourceByParam('ev.error.validation.date', fieldName);
				 alert( msg );
				 bValid =  false;
			 }
		 } else if ((orderMonth > orderYear && orderMonth < orderDay)) {
			 var iDelim1 = orderYear + YEAR.length;
			 var iDelim2 = orderMonth + MONTH.length;
			 var delim1 = datePattern.substring(iDelim1, iDelim1 + 1);
			 var delim2 = datePattern.substring(iDelim2, iDelim2 + 1);
			 if (iDelim1 == orderMonth && iDelim2 == orderDay) {
				 dateRegexp = new RegExp("^(\\d{4})(\\d{2})(\\d{2})$");
			 } else if (iDelim1 == orderMonth) {
				 dateRegexp = new RegExp("^(\\d{4})(\\d{2})[" + delim2 + "](\\d{2})$");
			 } else if (iDelim2 == orderDay) {
				 dateRegexp = new RegExp("^(\\d{4})[" + delim1 + "](\\d{2})(\\d{2})$");
			 } else {
				 dateRegexp = new RegExp("^(\\d{4})[" + delim1 + "](\\d{2})[" + delim2 + "](\\d{2})$");
			 }
			 var matched = dateRegexp.exec(value);
			 if(matched != null) {
				 if (!this.isValidDate(matched[3], matched[2], matched[1])) {
					 field.focus();
					 var fieldName = (field.getAttribute("label") != null) ? field.getAttribute("label") : data.fieldName; 
					 //var fieldName = portalPage.getMessageResource('pt.ev.property.' + ((data.labelName) ? data.labelName : data.fieldName));
					 var msg = portalPage.getMessageResourceByParam('ev.error.validation.date', fieldName);
					 alert( msg );
					 bValid =  false;
				  }
			  } else {
				  field.focus();
				  var fieldName = (field.getAttribute("label") != null) ? field.getAttribute("label") : data.fieldName; 
				  //var fieldName = portalPage.getMessageResource('pt.ev.property.' + ((data.labelName) ? data.labelName : data.fieldName));
				  var msg = portalPage.getMessageResourceByParam('ev.error.validation.date', fieldName);
				  alert( msg );
				  bValid =  false;
			  }
		 } else {
			 field.focus();
			 var fieldName = (field.getAttribute("label") != null) ? field.getAttribute("label") : data.fieldName; 
			 //var fieldName = portalPage.getMessageResource('pt.ev.property.' + ((data.labelName) ? data.labelName : data.fieldName));
			 var msg = portalPage.getMessageResourceByParam('ev.error.validation.date', fieldName);
			 alert( msg );
			 bValid =  false;
		 }
	  }
	   return bValid;
	},
	isValidDate : function(day, month, year) 
	{
		if (month < 1 || month > 12) {
			return false;
		}
		if (day < 1 || day > 31) {
			return false;
		}
		if ((month == 4 || month == 6 || month == 9 || month == 11) &&
			(day == 31)) {
			return false;
		}
		if (month == 2) {
			var leap = (year % 4 == 0 &&
					   (year % 100 != 0 || year % 400 == 0));
			if (day>29 || (day == 29 && !leap)) {
				return false;
			}
		}
		return true;
	},
	/* int??踰붿쐞 泥댄겕 */
	validateIntRange : function(data, form) 
	{
		var isValid = true;
		var field = form[data.fieldName];
			
		if ((field.type == 'text' ||
			 field.type == 'textarea') &&
			(field.value.length > 0)) {
			
			var iMin = parseInt(data.min);
			var iMax = parseInt(data.max);
			var iValue = parseInt(field.value);
			if (!(iValue >= iMin && iValue <= iMax)) {
				field.focus();
				var fieldName = (field.getAttribute("label") != null) ? field.getAttribute("label") : data.fieldName; 
				//var fieldName = portalPage.getMessageResource('pt.ev.property.' + ((data.labelName) ? data.labelName : data.fieldName));
				var msg = portalPage.getMessageResourceByParam('ev.error.validation.intRange', fieldName);
				alert( msg );
				isValid = false;
			}
		}
		return isValid;
	},
	/* Float??踰붿쐞泥댄겕 */
	validateFloatRange : function(data, form) 
	{
		var isValid = true;
		var field = form[data.fieldName];
			
		if ((field.type == 'text' ||
			 field.type == 'textarea') &&
			(field.value.length > 0)) {
			
			var fMin = parseFloat(data.min);
			var fMax = parseFloat(data.max);
			var fValue = parseFloat(field.value);
			if (!(fValue >= fMin && fValue <= fMax)) {
				field.focus();
				var fieldName = (field.getAttribute("label") != null) ? field.getAttribute("label") : data.fieldName; 
				//var fieldName = portalPage.getMessageResource('pt.ev.property.' + ((data.labelName) ? data.labelName : data.fieldName));
				var msg = portalPage.getMessageResourceByParam('ev.error.validation.floatRange', fieldName);
				alert( msg );
				isValid = false;
			}
		}
		return isValid;
	},
	/* ?좎슜移대뱶踰덊샇泥댄겕 */
	validateCreditCard : function(data, form) 
	{
		var bValid = true;
		var field = form[data.fieldName];
		if ((field.type == 'text' ||
			 field.type == 'textarea') &&
			(field.value.length > 0)) {
			if (!this.luhnCheck(field.value)) {
				field.focus();
				var fieldName = (field.getAttribute("label") != null) ? field.getAttribute("label") : data.fieldName; 
				//var fieldName = portalPage.getMessageResource('pt.ev.property.' + ((data.labelName) ? data.labelName : data.fieldName));
				var msg = portalPage.getMessageResourceByParam('ev.error.validation.creditCard', fieldName);
				alert( msg );
				bValid = false;
			}
		}
		return bValid;
	},
	/**
	 * Reference: http://www.ling.nwu.edu/~sburke/pub/luhn_lib.pl
	 */
	luhnCheck : function(cardNumber) 
	{
		if (this.isLuhnNum(cardNumber)) {
			var no_digit = cardNumber.length;
			var oddoeven = no_digit & 1;
			var sum = 0;
			for (var count = 0; count < no_digit; count++) {
				var digit = parseInt(cardNumber.charAt(count));
				if (!((count & 1) ^ oddoeven)) {
					digit *= 2;
					if (digit > 9) digit -= 9;
				};
				sum += digit;
			};
			if (sum == 0) return false;
			if (sum % 10 == 0) return true;
		};
		return false;
	},
	isLuhnNum : function(argvalue) 
	{
		argvalue = argvalue.toString();
		if (argvalue.length == 0) {
			return false;
		}
		for (var n = 0; n < argvalue.length; n++) {
			if ((argvalue.substring(n, n+1) < "0") ||
				(argvalue.substring(n,n+1) > "9")) {
				return false;
			}
		}
		return true;
	},
	/* Email泥댄겕 */
	validateEmail : function(data, form) 
	{
		var bValid = true;
		var field = form[data.fieldName];
		if ((field.type == 'text' ||
			 field.type == 'textarea') &&
			(field.value.length > 0)) {
			if (!this.checkEmail(field.value)) {
				field.focus();
				var fieldName = (field.getAttribute("label") != null) ? field.getAttribute("label") : data.fieldName; 
				//var fieldName = portalPage.getMessageResource('pt.ev.property.' + ((data.labelName) ? data.labelName : data.fieldName));
				var msg = portalPage.getMessageResourceByParam('ev.error.validation.email', fieldName);
				alert( msg );
				bValid = false;
			}
		}
		return bValid;
	},
	/**
	 * Reference: Sandeep V. Tamhankar (stamhankar@hotmail.com),
	 * http://javascript.internet.com
	 */
	checkEmail : function (emailStr) 
	{
	   if (emailStr.length == 0) {
		   return true;
	   }
	   var emailPat=/^(.+)@(.+)$/;
	   var specialChars="\\(\\)<>@,;:\\\\\\\"\\.\\[\\]";
	   var validChars="\[^\\s" + specialChars + "\]";
	   var quotedUser="(\"[^\"]*\")";
	   var ipDomainPat=/^(\d{1,3})[.](\d{1,3})[.](\d{1,3})[.](\d{1,3})$/;
	   var atom=validChars + '+';
	   var word="(" + atom + "|" + quotedUser + ")";
	   var userPat=new RegExp("^" + word + "(\\." + word + ")*$");
	   var domainPat=new RegExp("^" + atom + "(\\." + atom + ")*$");
	   var matchArray=emailStr.match(emailPat);
	   if (matchArray == null) {
		   return false;
	   }
	   var user=matchArray[1];
	   var domain=matchArray[2];
	   if (user.match(userPat) == null) {
		   return false;
	   }
	   var IPArray = domain.match(ipDomainPat);
	   if (IPArray != null) {
		   for (var i = 1; i <= 4; i++) {
			  if (IPArray[i] > 255) {
				 return false;
			  }
		   }
		   return true;
	   }
	   var domainArray=domain.match(domainPat);
	   if (domainArray == null) {
		   return false;
	   }
	   var atomPat=new RegExp(atom,"g");
	   var domArr=domain.match(atomPat);
	   var len=domArr.length;
	   if ((domArr[domArr.length-1].length < 2) ||
		   (domArr[domArr.length-1].length > 3)) {
		   return false;
	   }
	   if (len < 2) {
		   return false;
	   }
	   return true;
	},
	/* 二쇰??깅줉踰덊샇 validation. */ 
	validateIhIdNum : function(data, form) 
	{
		var bValid = true;
		var field = form[data.fieldName];
		if (field.type == 'text' ||
			field.type == 'hidden' ||
			field.type == 'textarea') {
			if (this.trim(field.value).length==0 || !this.checkIhIdNum(field.value)) {
				form[data.fieldName + '1'].select();
				var fieldName = (field.getAttribute("label") != null) ? field.getAttribute("label") : data.fieldName; 
				//var fieldName = portalPage.getMessageResource('pt.ev.property.' + ((data.labelName) ? data.labelName : data.fieldName));
				var msg = portalPage.getMessageResourceByParam('ev.error.validation.ssn', fieldName);
				alert( msg );
				bValid = false;
			}
		}
		return bValid;
	},
	/**
	 * Reference: JS Guide
	 * http://jsguide.net/ver2/articles/frame.php?artnum=002
	 */             
	checkIhIdNum : function(ihidnum)
	{	
		fmt = /^\d{6}[123456]\d{6}$/;
		if(!fmt.test(ihidnum)){
			return false;
		}
		var genCode = ihidnum.charAt(7);
		
		switch(genCode){
			case 9: case 0: {
				birthYear = "18";
			} break;
			case 1: case 2: {
				birthYear = "19";
			} break;
			case 3: case 4: {
				birthYear = "20";
			} break;
			case 5: case 6: {
				birthYear = "19";
			} break;
			case 7: case 8: {
				birthYear = "20";
			} break;
			default : birthYear = "00"; break;
		}
		birthYear += ihidnum.substr(0, 2);
		birthMonth = ihidnum.substr(2, 2) - 1;
		birthDate = ihidnum.substr(4, 2);
		birth = new Date(birthYear, birthMonth, birthDate);
		
		if( birth.getYear() % 100 != ihidnum.substr(0, 2) ||
			birth.getMonth() != birthMonth ||
			birth.getDate() != birthDate) {
			return false;
		}
		
		var arrDivide = [2, 3, 4, 5, 6, 7, 8, 9, 2, 3, 4, 5];            	
		var checkdigit = 0;            	
		for(var i=0;i<ihidnum.length-1;i++){
			checkdigit += parseInt(ihidnum.charAt(i)) * parseInt(arrDivide[i]);
		}
		checkdigit = (11 - (checkdigit%11))%10;
		if(checkdigit != ihidnum.charAt(12)){
			return false;
		}else{
			return true;
		}
	},
	
	validateKorean : function(data, form)
	{
		var bValid = true;
		var field = form[data.fieldName];             	
		if (field.type == 'text' || field.type == 'textarea') {
			if (this.trim(field.value).length==0 || !this.checkKorean(field.value)) {
				field.focus();
				var fieldName = (field.getAttribute("label") != null) ? field.getAttribute("label") : data.fieldName; 
				//var fieldName = portalPage.getMessageResource('pt.ev.property.' + ((data.labelName) ? data.labelName : data.fieldName));
				var msg = portalPage.getMessageResourceByParam('ev.error.validation.korean', fieldName);
				alert( msg );
				bValid = false;
			}
		}
		return bValid;
	},
	checkKorean : function(koreanStr)
	{          		
		for(var i=0;i<koreanStr.length;i++){
			var koreanChar = koreanStr.charCodeAt(i);
			if( !( 0xAC00 <= koreanChar && koreanChar <= 0xD7A3 ) && !( 0x3131 <= koreanChar && koreanChar <= 0x318E ) ) { 
				return false;
			}
		}
		return true;
	}
}
