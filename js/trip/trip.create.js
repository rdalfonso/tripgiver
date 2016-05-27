
var dp1, dp2;

$(document).ready(function () {
alert('ddd');
	dp1 = $('#startdategroup').datepicker().data('datepicker');
    dp2 = $('#enddategroup').datepicker().data('datepicker');
	
});


function isValidDate(date) {
    var matches = /^(\d{2})[-\/](\d{2})[-\/](\d{4})$/.exec(date);
    if (matches == null) return false;
    var d = matches[2];
    var m = matches[1] - 1;
    var y = matches[3];
    var composedDate = new Date(y, m, d);
    return composedDate.getDate() == d && composedDate.getMonth() == m && composedDate.getFullYear() == y;
}
