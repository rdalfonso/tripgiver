"use strict";

var te = te || {};

$(document).ready(function () {
    te.colorbox = function (url, w, h) {
        $.colorbox({
            href: url,
            width: w + 'px',
            height: h + 'px',
            iframe: true,
            overlayClose: false,
            escKey: false,
            transition: 'none'
        });
    };

    te.confirm = function (text, yescallback, nocallback) {
        $('#ok-button').off('click').on('click', function () {
            $('#confirm-modal').modal('hide');
            yescallback();
        });
        $('#cancel-button').show().off('click').on('click', function () {
            $('#confirm-modal').modal('hide');
            if (typeof nocallback !== "undefined") {
                nocallback();
            }
        });

        var dialog = $('#confirm-modal');
        $('.balloon-message', dialog).html(text);
        dialog.modal('show');
    };

    te.mustConfirm = function (text, yescallback) {
        var dialog = $('#confirm-modal');

        if (!yescallback) {
            yescallback = function () {
                dialog.modal('hide');
            };
        }
        $('#ok-button').off('click').on('click', yescallback);
        $('#cancel-button').hide().off('click');

        $('.balloon-message', dialog).html(text);
        dialog.modal('show');
    };

    te.balloon = function (type, message, time, callback) {
        if ($("#colorbox").css("display") === "block") {
            console.log("Appears to be a modal blocking this popup, exiting now.");
            return;
        }
        
        var balloon = $('#balloon-modal');
        var typeClass;
        var typeIcon;

        switch (type) {
            case 'alert':
                typeClass = 'warning';
                typeIcon = 'circle_exclamation_mark';
                break;
            case 'info':
                typeClass = 'info';
                typeIcon = 'circle_info';
                break;
            case 'success':
                typeClass = 'success';
                typeIcon = 'circle_ok';
                break;
            default:
                typeClass = '';
                typeIcon = '';
                break;
        }

        balloon.removeClass('warning info success').addClass(typeClass);
        $('.balloon-message', balloon).removeClass('warning info success').addClass(typeClass).html(message);
        $('.balloon-icon', balloon).removeClass('circle_exclamation_mark circle_info circle_ok').addClass(typeIcon);
        
        balloon.modal('show');
        
        setTimeout(function () {
            balloon.modal('hide');
            if (typeof callback !== 'undefined') {
                callback();
            }
        }, time);
    };
});
