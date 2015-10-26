// RFC822 version
var validateEmail = function(email) {
	var sQtext = '[^\\x0d\\x22\\x5c\\x80-\\xff]';
	var sDtext = '[^\\x0d\\x5b-\\x5d\\x80-\\xff]';
	var sAtom = '[^\\x00-\\x20\\x22\\x28\\x29\\x2c\\x2e\\x3a-\\x3c\\x3e\\x40\\x5b-\\x5d\\x7f-\\xff]+';
	var sQuotedPair = '\\x5c[\\x00-\\x7f]';
	var sDomainLiteral = '\\x5b(' + sDtext + '|' + sQuotedPair + ')*\\x5d';
	var sQuotedString = '\\x22(' + sQtext + '|' + sQuotedPair + ')*\\x22';
	var sDomain_ref = sAtom;
	var sSubDomain = '(' + sDomain_ref + '|' + sDomainLiteral + ')';
	var sWord = '(' + sAtom + '|' + sQuotedString + ')';
	var sDomain = sSubDomain + '(\\x2e' + sSubDomain + ')*';
	var sLocalPart = sWord + '(\\x2e' + sWord + ')*';
	var sAddrSpec = sLocalPart + '\\x40' + sDomain; // complete RFC822 email address spec
	var sValidEmail = '^' + sAddrSpec + '$'; // as whole string

	var reValidEmail = new RegExp(sValidEmail);
	console.log(reValidEmail, reValidEmail.test(email));
	if (reValidEmail.test(email)) {
		$("#email").css("border","1px solid #ccc");
		return true;
	} else {
		$("#email").css("border","1px solid red");
		return false;
	}
}

var validatePhone = function(phone) {
	console.log(phone, phone.length);
	if(phone.length != 10) {
		$("#phone").css("border","1px solid red");
		return false;
	} else {
		$("#phone").css("border","1px solid #ccc");
		return true;
	}
}

var validateBusiness = function(business) {
	// Name is required.
	console.log(business, business.length);
	if(business.length < 1) {
		$("#business").css("border","1px solid red");
		return false;
	} else {
		$("#business").css("border","1px solid #ccc");
		return true;
	}
}

var validateName = function(name) {
	// Name is required.
	console.log(name, name.length);
	if(name.length < 1) {
		$("#name").css("border","1px solid red");
		return false;
	} else {
		$("#name").css("border","1px solid #ccc");
		return true;
	}
}

var validate = function(name, phone, email, business) {
	return validateName(name) && validateEmail(email) && validatePhone(phone) && validateBusiness(business);
}

var sendData = function() {
	var name = $("#name").val();
	var phone = $("#phone").val();
	var email = $("#email").val();
	var business = $("#business").val();

	if(validate(name, phone, email, business)) {
		$(".status").css("display", "block");
		$("#submit").css("disabled", "disabled");

		$.ajax({
			  method: "POST",
			  url: "http://staging0.getgenieapp.com/api/v1/partnerwithus",
			  data: {
			  	"name": name,
			  	"phone": phone,
			  	"email": email,
			  	"business": business
			  }
			})
			  .done(function( msg ) {
			  	$("#submit").css("disabled", "false");
			  	$(".status").css("display", "none");
			  	$(".failure").css("display", "none");
			    $(".success").css("display", "block");
			    $("#name").val("");
			    $("#phone").val("");
				$("#email").val("");
				$("#business").val("");
			  })
			  .fail(function(msg) {
			  	$("#submit").css("disabled", "false");
			  	$(".status").css("display", "none");
			  	$(".success").css("display", "none");
			  	$(".failure").css("display", "block");
			  });
	}
}