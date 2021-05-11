function toggleHeader() {
    $('header > div.nav-container, header > div > div > .search, header > div > .social').toggle();
    $('header > div > .toggler').toggle();
    // headerPadding();
}

// function headerPadding() {
//     $('body').css('padding-top', $('body>header').height() + 40);
// }

function addComment(f) {
    var $form = $(f);

    $.cookie('comments_name', $('#comments_name', f).val());
    $.cookie('comments_email', $('#comments_email', f).val());

    $.post(f.action, $form.serialize(), function(r) {
        console.log(r)
        if(r.added) {
            $form.closest('.comments-form').html('<div class="alert alert-info">Twój komentarz został dodany</div> <div class="alert alert-warning">Komentarz będzie widoczny po zatwierdzeniu przez moderatora</div>');
        } else {
            alert(r.err)
        }
    }).fail(function(err){
        response = err.responseJSON;
        alert(response.err)
    });
}


function saveFormToCookie(){
    if ($('#enable_autoload:checked').length) {
        var data = $('.container form').serialize();
        console.log("saving form: ", data);
        $.cookie('form_data', data);
    }
}

function restoreFormFromCookie(){
    $('.container form').deserialize($.cookie('form_data'));
}

function monitorForm() {
    saveFormToCookie();
    setTimeout(monitorForm, 10000);
}

function gotoTop() {
    $('body,html').animate({ scrollTop: 0 }, 800);
}

function imgPinOnZszywka(selector, url, description) {
    'use strict';
    var file = url;
    var title = description;
    var type = '6';
    var size = 'width:35px;height:33px;';
    var current = window.src === location.href ? document.referrer || location.href : location.href;
    var url ='http://zszywka.pl/widget.html?type=6&title='+(encodeURIComponent(title))+'&source_file_url='+(encodeURIComponent(file))+'&source_url='+(encodeURIComponent(current));
    $(selector).append('<div class="zszywka_widget"><iframe src="'+url+'" style="'+size+'border:none;overflow:hidden;margin:0;padding:0;" frameborder="0" border="0"></iframe></div>');
}



$(function(){

    if (!$.cookie('visit')) {
        $('#facebookLike').modal();
    }

    $('a.lightbox, .lb').lightBox({
        fixedNavigation:true,
        imageLoading:  '/img/lightbox-ico-loading.gif',
        imageBtnClose: '/img/lightbox-btn-close.gif',
        imageBtnPrev:  '/img/lightbox-btn-prev.gif',
        imageBtnNext:  '/img/lightbox-btn-next.gif'
    });

    if($.cookie('comments_name')) {
        $('[name="comments[name]"]').val($.cookie('comments_name'));
        $('[name="comments[email]"]').val($.cookie('comments_email'));
    }

    $(window).scroll(function(){
        var $scroller = $('.goto-top');
        if($(this).scrollTop()>=100){
            $scroller.show();
        } else {
            $scroller.hide();
        }
    });

    Socialite.load($('.social-buttons'));
});

var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-33692563-4']);
_gaq.push(['_trackPageview']);

(function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();


var app = angular.module('myApp', [], function($interpolateProvider) {
    $interpolateProvider.startSymbol('[[');
    $interpolateProvider.endSymbol(']]');
});
