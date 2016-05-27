"use strict";

var te = te || {};

(function ($) {
    te.post = function (options) {
        /// <summary>
        ///     Perform an asynchronous HTTP post.
        /// </summary>
        /// <param name="options" type="Object">
        ///     A set of key/value pairs that configure the Ajax request. All settings are optional. A default can be set for any option with $.ajaxSetup(). See jQuery.ajax( settings ) below for a complete list of all settings.
        /// </param>

        var defaultOptions = {
            type: 'POST', 
            data: {},
            traditional: true,
            contentType: "application/json; charset=utf-8"
        };

        var opts = $.extend({}, defaultOptions, options);
        opts.data = JSON.stringify(opts.data);

        var request = $.ajax(opts);

        request.fail(function(jqXHR, textStatus, errorThrown) {
            console.log("AJAX Error");
            console.log(opts);
            console.log(jqXHR);
            console.log(textStatus);
            console.log(errorThrown);
//            try {
//                var err = $.parseJSON(jqXHR.responseText);
//                alert("Error: " + err.Message);
//            } catch (err) {
//                alert("Unknown error");
//                console.log(jqXHR);
//                console.log(err);
//            }
        });

        return request;
    };

    te.get = function (options) {
        /// <summary>
        ///     Perform an asynchronous HTTP post.
        /// </summary>
        /// <param name="options" type="Object">
        ///     A set of key/value pairs that configure the Ajax request. All settings are optional. A default can be set for any option with $.ajaxSetup(). See jQuery.ajax( settings ) below for a complete list of all settings.
        /// </param>

        var defaultOptions = {
            type: 'GET',
            data: {},
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            cache: false
    };

        var opts = $.extend({}, defaultOptions, options);

        var request = $.ajax(opts);

        request.fail(function(jqXHR, textStatus, errorThrown) {
            console.log("AJAX Error");
            console.log(opts);
            console.log(jqXHR);
            console.log(textStatus);
            console.log(errorThrown);
//            try {
//                var err = $.parseJSON(jqXHR.responseText);
//                alert("Error: " + err.Message);
//            } catch (err) {
//                alert("Unknown error");
//                console.log(jqXHR);
//                console.log(err);
//            }
        });

        return request;
    };
})(jQuery);

(function ($) {
    $.QueryString = (function (a) {
        if (a == "") return {};
        var b = {};
        for (var i = 0; i < a.length; ++i) {
            var p = a[i].split('=');
            if (p.length != 2) continue;
            b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
        }
        return b;
    })(window.location.search.substr(1).split('&'));
})(jQuery);
