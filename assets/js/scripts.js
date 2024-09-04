/*var onWebChat={ar:[], set: function(a,b){if (typeof onWebChat_==='undefined'){this.ar.
    push([a,b]);}else{onWebChat_.set(a,b);}},get:function(a){return(onWebChat_.get(a));},
    w:(function(){ var ga=document.createElement('script'); ga.type = 'text/javascript';
    ga.async=1;ga.src=('https:'==document.location.protocol?'https:':'http:') + 
    '//www.onwebchat.com/clientchat/5e06cb2139c647d564b12ee1cad41a23';var s=
    document.getElementsByTagName('script')[0];s.parentNode.insertBefore(ga,s);})()}*/

$.fn.serializeObject = function() {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name]) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};
$(function () {

    toastr.options = {
        "closeButton": false,
        "debug": false,
        "newestOnTop": false,
        "progressBar": false,
        "positionClass": "toast-top-right",
        "preventDuplicates": false,
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "1000",
        "timeOut": "5000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
      }
    var form = ".ajax-contact";
    var invalidCls = "is-invalid";
    var $email = '[name="email"]';
    var $validation =
        '[name="name"],[name="email"],[name="subject"],[name="number"],[name="message"]'; // Must be use (,) without any space
    var formMessages = $(".form-messages");

    function sendContact() {
        var formData = $(form).serialize();
        var valid;
        valid = validateContact();
        if (valid) {
            console.log($(form).attr("action"));
            jQuery
                .ajax({
                    //url: $(form).attr("action"),
                    url: 'sendmail',
                    data: formData,
                    type: "POST",
                })
                .done(function (response) {
                    // Make sure that the formMessages div has the 'success' class.
                    formMessages.removeClass("error");
                    formMessages.addClass("success");
                    // Set the message text.
                    formMessages.text(response);
                    // Clear the form.
                    $(
                        form +
                        ' input:not([type="submit"]),' +
                        form +
                        " textarea"
                    ).val("");
                })
                .fail(function (data) {
                    // Make sure that the formMessages div has the 'error' class.
                    formMessages.removeClass("success");
                    formMessages.addClass("error");
                    // Set the message text.
                    if (data.responseText !== "") {
                        //formMessages.html(data.responseText);
                        toastr.success('request successfully submitted');
                    } else {
                        //formMessages.html("Oops! An error occured and your message could not be sent.");
                        toastr.error("Oops! An error occured and your message could not be sent.");
                    }
                });
        }
    }

     function sendContact(id) {
    $('[name=subject').attr('disabled', false);
        //var formData = $('#' + id).serialize();
        //var formData = $('#' + id).formToJson();
        var formData = $('#' + id).serializeObject();
        console.log(formData);

    $('[name=subject').attr('disabled', true);
        var valid;
        valid = validateContact();
        if (valid) {
            jQuery
                .ajax({
                    //url: $(form).attr("action"),
                    url: 'sendmail',
                    data: JSON.stringify(formData),
                    type: "POST",
                    contentType: 'application/json',
                })
                .done(function (response) {
                    // Make sure that the formMessages div has the 'success' class.
                    formMessages.removeClass("error");
                    formMessages.addClass("success");
                    // Set the message text.
                    formMessages.text(response);
                    // Clear the form.
                    $(
                        form +
                        ' input:not([type="submit"]),' +
                        form +
                        " textarea"
                    ).val("");
                })
                .fail(function (data) {
                    // Make sure that the formMessages div has the 'error' class.
                    formMessages.removeClass("success");
                    formMessages.addClass("error");
                    // Set the message text.
                    if (data.responseText !== "") {
                        //formMessages.html(data.responseText);
                        toastr.success('request successfully submitted');
                    } else {
                        //formMessages.html( "Oops! An error occured and your message could not be sent." );
                        toastr.error("Oops! An error occured and your message could not be sent.");
                    }
                });
        }
    }

    function validateContact() {
        var valid = true;
        var formInput;

        function unvalid($validation) {
            $validation = $validation.split(",");
            for (var i = 0; i < $validation.length; i++) {
                formInput = form + " " + $validation[i];
                if (!$(formInput).val()) {
                    $(formInput).addClass(invalidCls);
                    valid = false;
                } else {
                    $(formInput).removeClass(invalidCls);
                    valid = true;
                }
            }
        }
        unvalid($validation);

        if (
            !$($email).val() ||
            !$($email)
                .val()
                .match(/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/)
        ) {
            $($email).addClass(invalidCls);
            valid = false;
        } else {
            $($email).removeClass(invalidCls);
            valid = true;
        }
        return valid;
    }

    $(form).on("submit", function (element) {
        element.preventDefault();
        console.log($(this).attr('id'))
        sendContact($(this).attr('id'));
    });


    $('.searchAutoComplete').autoComplete({
        resolverSettings: {
            url: 'data/regddc.json'
        },
        minLength: 2,
        events: {
            search: function (qry, callback) {
                // let's do a custom ajax call
                $.ajax(
                    'data/regddc.json',
                    {
                        data: { 'qry': qry }
                    }
                ).done(function (res) {
                    var result = res.filter(word => word.toLowerCase().includes(qry.toLowerCase()));
                    callback(result)
                });
            }
        }
    });

    $('#subscribe').click(function(e){
        toastr.options = {
            "closeButton": true,
            "debug": false,
            "newestOnTop": true,
            "progressBar": true,
            "positionClass": "toast-top-right",
            "preventDuplicates": false,
            "onclick": null,
            "showDuration": "300",
            "hideDuration": "1000",
            "timeOut": "5000",
            "extendedTimeOut": "1000",
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "fadeIn",
            "hideMethod": "fadeOut"
        };
        var email_addr = $('[name=search').val();
        var formData = {
            email: email_addr
        }
        jQuery
        .ajax({
            //url: $(form).attr("action"),
            url: 'subscribe',
            data: formData,
            type: "POST",
        })
        .done(function (response) {
            // Make sure that the formMessages div has the 'success' class.
            console.log('message sent');

            toastr.success('email sent to ' + email_addr + ' successfully');
            $('[name=search').val('');
        })
        .fail(function (data) {
            // Make sure that the formMessages div has the 'error' class.
            toastr.error('error sending email to ' + email_addr + '');
          
        });
    })

    $('.btn-search').click(function(e){
        var input = $('#search').val();
        console.log(input)
        window.location.href = 'search.html?q='+ input;
    })


})
