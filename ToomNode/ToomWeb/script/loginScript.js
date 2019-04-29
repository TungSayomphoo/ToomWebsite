$(document).ready(function () {  
    $("#submit").click(function () {  
        var userVal =  $('#username').val();
        var passVal =  $('#password').val();
        console.log(userVal + ' , ' + passVal)
        login(userVal, passVal)
    });  
});

function login(user, pass) {
    var text
    var data = {
        "username" : user,
        "password" : pass
    }

    $.ajax({  
        url: 'https://toombike.kku.ac.th/auth',
        //url: 'http://localhost/auth',  
        type: 'POST',  
        dataType: 'json',  
        data: data,  
        success: function (data, textStatus, xhr) {  
            if (data.status == 'success') {
                window.location.replace("https://toombike.kku.ac.th/phone.html");
                //window.location.replace("http://localhost/phone.html");
            } else if (data.status == 'incorrect') {
                text = '<div class="alert alert-danger"><strong>username</strong> หรือ <strong>password</strong> ไม่ถูกต้อง'
                $('#login-trigger').html(text)
            } else if (data.status == 'novalue') {
                text = '<div class="alert alert-danger">กรุณากรอก <strong>username</strong> และ <strong>password</strong>'
                $('#login-trigger').html(text)
            }
        },  
        error: function (xhr, textStatus, errorThrown) {  
            text = '<div class="alert alert-danger"><strong>Server</strong> ล้มเหลวโปรดลองใหม่ในภายหลัง'
                $('#login-trigger').html(text)
        }  
    });
}