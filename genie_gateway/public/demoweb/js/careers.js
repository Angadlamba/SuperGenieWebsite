var changeCategory = function(id) {
	$(".category").css("display", "none");
	$(".toplink").css("border", "none");
	$(".toplink_" + id).css("border-bottom", "4px solid #26ACED");
	$("#" + id).css("display", "block");
};

var jqUpdateSize = function () {
	var width = $(window).width();
	console.log(width);

	if(width < 680) {
		$(".toplink_customersuccess a").text('Operations');
	} else {
		$(".toplink_customersuccess a").text('Customer Success');
	}
}

$(document).ready(jqUpdateSize);    // When the page first loads
$(window).resize(jqUpdateSize);     // When the browser changes size