var userLogin
detectLogin()
hideNavbar()

function detectLogin() {
    $.get("https://www.toombike.com/home", function(json){
        var text,text2
        var data = json
        if ( data.loggedin == 'true') {
            userLogin = data.user
            text = '<span class="glyphicon glyphicon-user"></span> ' + data.user
            text2 = '<span class="glyphicon glyphicon-user"></span> ' + data.user + ' <span class="caret">'
            $('#username').html(text)
            $('#username2').html(text2)
        } else {
            window.location.replace("https://www.toombike.com/loginPlease.html");
        }
    });

    /*$.get("http://localhost/home", function(json){
        var text,text2
        var data = json
        if ( data.loggedin == 'true') {
            userLogin = data.user
            text = '<span class="glyphicon glyphicon-user"></span> ' + data.user
            text2 = '<span class="glyphicon glyphicon-user"></span> ' + data.user + ' <span class="caret">'
            $('#username').html(text)
            $('#username2').html(text2)
        } else {
            window.location.replace("http://localhost/loginPlease.html");
        }
    });*/
}

function logout() {
    $.get("https://www.toombike.com/logout", function(json){
        alert('คุณได้ออกจากระบบแล้ว')
        window.location.replace("https://www.toombike.com/");
    });

    /*$.get("http://localhost/logout", function(json){
        alert('คุณได้ออกจากระบบแล้ว')
        window.location.replace("http://localhost/");
    });*/
}

function hideNavbar() {
    var prevScrollpos = window.pageYOffset;
    window.onscroll = function() {
        var currentScrollPos = window.pageYOffset;
        if (prevScrollpos > currentScrollPos) {
            document.querySelector('.navbar2').style.top = "0";
        } else {
            document.querySelector('.navbar2').style.top = "-100px";
        }
        prevScrollpos = currentScrollPos;
    }
}