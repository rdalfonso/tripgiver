"use strict";

function RedirectHome() {
    parent.window.location.href = '/Tournament';
}

function ReloadSelf() {
    window.location.href = window.location.href;
}

function IsGoodTournament() {
    if (tournamentId == 0) {
        te.mustConfirm('This tournament no longer exists.', RedirectHome);
        return false;
    }

    return true;
}

(function ($) {
    $.fn.bootstrapFileInput = function (opts) {
        var url = opts.url;
        var success = opts.success ? opts.success : function () { };

        var cssHtml = '<style>' +
            '.file-input-wrapper { overflow: hidden; position: relative; cursor: pointer; z-index: 1; }' +
            '.file-input-wrapper input[type=file], .file-input-wrapper input[type=file]:focus, .file-input-wrapper input[type=file]:hover { position: absolute; top: 0; left: 0; cursor: pointer; opacity: 0; filter: alpha(opacity=0); z-index: 99; outline: 0; }' +
            '.file-input-name { margin-left: 8px; }' +
            '</style>';
        $('link[rel=stylesheet]').eq(0).before(cssHtml);

        return this.each(function(i, elem) {

            var $elem = $(elem);
            $elem.wrap('<form><a class="file-input-wrapper btn btn-primary"></a></form>');
            $elem.parent().append('<span class="glyphicons folder_open" style="margin-right: 10px;"></span>Browse');
            $elem.parent().after('<span id="filename"></span><span id="fileprogress"></span>');

            $elem.on('change', function() {
                var files = this.files;
                var lastloaded = 0;

                var fileTypes = $(this).data('filetypes').split(',');
                var foundOkFile = false;
                for (var j = 0; j < fileTypes.length; j++) {
                    if (files[0].name.toLowerCase().indexOf('.' + fileTypes[j]) > -1) {
                        foundOkFile = true;
                        break;
                    }
                }

                if (!foundOkFile) {
                    te.balloon('alert', 'Unrecognized file extension.', 1500);
                    return;
                }

                var formData = new FormData($(this).closest('form').get(0));

                $('#filename').text('Uploading ' + files[0].name + ' - ');

                $.ajax({
                    url: url,
                    type: 'POST',
                    xhr: function() {
                        var myXhr = $.ajaxSettings.xhr();
                        if (myXhr.upload) {
                            myXhr.upload.addEventListener('progress', function(event) {
                                if (event.lengthComputable) {
                                    lastloaded = event.loaded > lastloaded ? event.loaded : lastloaded;
                                    var complete = (lastloaded / event.total * 100 | 0);
                                    $('#fileprogress').text(complete + '%');
                                }
                            });
                        }
                        return myXhr;
                    },
                    data: formData,
                    cache: false,
                    contentType: false,
                    processData: false,
                    error: function(jqXHR, textStatus, errorThrown) {
                        alert("Error!");
                        console.log(jqXHR);
                        console.log(textStatus);
                        console.log(errorThrown);
                    }
                }).done(success);
            });
        });
    };
})(jQuery);

(function($) {
    $.fn.disableButton = function(text, title) {
        return this.each(function() {
            var $ele = $(this);
            if (!$ele.parent().hasClass('tip')) {
                $ele.wrap('<div class="tip" style="display:inline-block;"></div>');
            }

            $ele.parent().attr('title', title);

            $ele.attr('data-originaltext', $ele.text());

            if (text) {
                $ele.contents().filter(isTextNode).last().replaceWith(text);
            }

            $ele.addClass('disabled');
        });
    };
    $.fn.enableButton = function() {
        return this.each(function() {
            var $ele = $(this);
            if ($ele.parent().hasClass('tip')) {
                $ele.parent().attr('title', '');
            }
            $ele.removeClass('disabled');

            if ($ele.attr('data-originaltext')) {
                $ele.contents().filter(isTextNode).last().replaceWith($ele.data('originaltext'));
            }
        });
    };

    function isTextNode() {
        return (this.nodeType === 3);
    }
})(jQuery);

(function ($) {
    $.fn.teTableSort = function (options) {
        var settings = $.extend({
            'sorturl': '/',
            'isAscending':true,
            'sortColumn':'',
            'additionalParameters' : {}
        }, options);

        return this.each(function() {
            var table = $(this);
            $(this).find('thead a').on('click', function(e) {
                var newAdditionalParameters = $.extend({ }, settings.additionalParameters);
                
                $.each(newAdditionalParameters, function(key, value) {
                    if (typeof value === "function") {
                        newAdditionalParameters[key] = value();
                    }
                });

                table.mask();
                e.preventDefault();
                
                var orderby = $(this).data('orderby');

                $(this).closest('thead').find('.up_arrow, .down_arrow').removeClass('up_arrow').removeClass('down_arrow');

                //change up and down arrow order
                var isAscendingBool = !settings.isAscending;
                var arrowIcon = (isAscendingBool) ? "up_arrow" : "down_arrow";

                if (settings.sortColumn != orderby) {
                    isAscendingBool = true;
                    settings.sortColumn = orderby;
                }
                settings.isAscending = isAscendingBool;

                var queryObject = $.extend({
                    'orderby': orderby, 
                    'isAscending': isAscendingBool
                }, newAdditionalParameters);

                $(this).closest('th').find('a').after('<span class="glyphicons ' + arrowIcon + '"></span>');
                
                te.post({ url : settings.sorturl, data : queryObject, dataType : 'html'}).done(function (data) {
                    table.find('tbody').empty().append(data);
                    table.unmask();
                });
            });
        });
    };
})(jQuery);

function HandleEnter(evt, fn) {
    if (evt.which || evt.keyCode) {
        if ((evt.which == 13) || (evt.keyCode == 13)) {
            fn();
            return false;
        }
    }

    return true;
}

function Buttonize() {
    var isAuth = ($('#isAuth').val() == 'true');
    if ($('#isAuth').length && !isAuth) {
        $('.Restricted').addClass('disabled');
        $('select, input').attr('disabled', 'disabled');
    }
}

(function ($) {
    $.fn.hasUnicode = function (isSignText) {
        var foundUnicode = false;

        this.each(function () {
            if (isSignText) {
                if (/[^\u0020-\u007e|\n]/.test($(this).val())) {
                    foundUnicode = true;
                }
            } else {
                if (/[^A-Za-z0-9 '"\-_*()@#$&!]/.test($(this).val())) {
                    foundUnicode = true;
                }
            }
        });
        return foundUnicode;
    };
})(jQuery);

function CloseModal() {
    parent.$.colorbox.close();
}