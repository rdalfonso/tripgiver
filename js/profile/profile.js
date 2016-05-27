

$(document).ready(function () {

	$("#signin").hide();

   $("input[id='btnSearch']").click(function(e){
		var idClicked = e.target.id;
		SearchButtonClick(idClicked);
	});
	
	$("img[id='btnSignUp']").click(function(e){
		var idClicked = e.target.id;
		SignupButtonClick(idClicked);
	});
	
	$("a[id='btnSignIn']").click(function(e){
		var idClicked = e.target.id;
		SignInButtonClick(idClicked);
	});
	
});

function SearchButtonClick(idClicked) {
    alert(idClicked + ' was clicked' + $("#txtSearch").val());
}

function SignupButtonClick(idClicked) {
    alert(idClicked + ' was clicked');
}

function SignInButtonClick(idClicked) {
    var ishidden = $("#signin").is(":visible");
	if(ishidden) {
		$("#signin").hide();
	} else {
		$("#signin").show();
	}
}

function onDeleteButtonClick() {
    var templateid = $(this).data('id');
    te.confirm('Delete this Template?', function () {
        hub.server.deleteTemplate(templateid).done(function(response) {
            if (response.Success == false) {
                te.balloon('alert', response.Message, 3000);
            } else {
                te.balloon('success', 'The template has been deleted.', 2000);
                GetTemplates();
            }
        });
    });
}

function onTemplatesUpdated() {
    te.balloon('alert', 'Templates have been updated.', 2000);
    GetTemplates();
}

function onTemplateDeleted(msg) {
    if (msg.ConnectionId == $.connection.hub.id) { return; }

    te.balloon('alert', 'A template has been deleted.', 2000);
    GetTemplates();
}

function onTemplateAdded(msg) {
    if (msg.ConnectionId == $.connection.hub.id) { return; }
    
    te.balloon('alert', 'A template has been added.', 2000);
    GetTemplates();
}

function GetTemplates() {
    te.get({ url: '/Template/GetTemplates', dataType: 'html' }).done(function(response) {
        $('#TemplateTable tbody').empty().append(response);
    });
}

function onTournamentsChanged() {
    te.get({ url: '/Template/Sort', dataType: 'html', data: { orderby: "TemplateName", isAscending: true} }).done(function (data) {
        $('#tblTemplatesViewAll').empty();
        $("#tblTemplatesViewAll").html(data);
    });
}

function ShowTemplateDetails() {
    te.colorbox('/Template/Details/' + $(this).data('id'), 905, 540);
}