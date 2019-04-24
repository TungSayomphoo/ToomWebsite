function detectLogin() {
    $.get("https://toombike.kku.ac.th/home", function(json){
        var text
        var data = json
        if ( data.loggedin == 'true') {
            userLogin = data.user
            text = '<span class="glyphicon glyphicon-user"></span> ' + data.user
            $('#username').html(text)
        } else {
            window.location.replace("https://toombike.kku.ac.th/loginPlease.html");
        }
    });
}

function logout() {
    $.get("https://toombike.kku.ac.th/logout", function(json){
        alert('คุณได้ออกจากระบบแล้ว')
        window.location.replace("https://toombike.kku.ac.th/");
    });
}