var validatePhone = function(phone, phoneid) {
	console.log(phone, phone.length);
	if(phone.length != 10) {
		$("#" + phoneid).css("border","1px solid red");
		return false;
	} else {
		$("#" + phoneid).css("border","1px solid #ccc");
		return true;
	}
}

var validate = function(phone, phoneid) {
	return validatePhone(phone, phoneid);
}

var sendData = function(id) {
	if(id == 2){
		var phone = $("#phone2").val();
		var phoneid = "phone2";
		var status = "status2";
		var success = "success2";
		var failure = "failure2";
	} else {
		var phone = $("#phone").val();
		var phoneid = "phone";
		var status = "status";
		var success = "success";
		var failure = "failure";
	}
	
	if(validate(phone, phoneid)) {
		$("." + status).css("display", "block");
		// $("#subscribe").css("disabled", "disabled");

		$.ajax({
			  method: "POST",
			  url: "http://staging0.getgenieapp.com/api/v1/phonesignup",
			  data: {
			  	"phone": phone
			  }
			})
			  .done(function( msg ) {
			  	// $("#subscribe").css("disabled", "false");
			  	$("." + status).css("display", "none");
			  	$("." + failure).css("display", "none");
			    $("." + success).css("display", "block");
			    $("#" + phoneid).val("");
			  })
			  .fail(function(msg) {
			  	// $("#subscribe").css("disabled", "false");
			  	$("." + status).css("display", "none");
			  	$("." + success).css("display", "none");
			  	$("." + failure).css("display", "block");
			  });
	}
}