"use strict";

var te = te || {};
te.signalr = {};

$(document).ready(function () {
    te.signalr = {
        hub: $.connection.tournamentHub,
        start: function() {
            return $.connection.hub.start();
        }
    };

    /*$.connection.hub.connectionSlow(function() {
    notifyUserOfConnectionProblem(); // Your function to notify user.
    });
    Handle the reconnecting event to display a message when SignalR is aware of a disconnection and is going into reconnecting mode.

    $.connection.hub.reconnecting(function() {
        notifyUserOfTryingToReconnect(); // Your function to notify user.
    });*/

    $.connection.hub.stateChanged(function (change) {
        if (change.newState === $.signalR.connectionState.reconnecting) {
            $('#networkkaput').show();
        }
        else if (change.newState === $.signalR.connectionState.connected) {
            $('#networkkaput').hide();
        }
    });

    $.connection.hub.disconnected(function () {
        setTimeout(function () {
            $.connection.hub.start();
        }, 5000); // Restart connection after 5 seconds.
    });

    $.connection.hub.logging = true;
    $.connection.hub.received(function (data) { console.log(data); });
});
