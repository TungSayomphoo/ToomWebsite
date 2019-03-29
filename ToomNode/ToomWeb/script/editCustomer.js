var googleAPIKey = 'AIzaSyAJF7RaWrEIV1MA18HlXowsuTxiEjg6fE8';

            createCard();

            window.onscroll = function() {scrollFunction()};
            function scrollFunction() {
                if (document.body.scrollTop > 6 || document.documentElement.scrollTop > 6) {
                    document.querySelector(".header").style.fontSize = "6px";
                    //document.querySelector("#headLogo").style.height = "0px";
                    //document.querySelector("#headLogo").style.width = "0px";
                } else {
                    document.querySelector(".header").style.fontSize = "12px";
                    //document.querySelector("#headLogo").style.height = "200px";
                    //document.querySelector("#headLogo").style.width = "200px";
                }
            }

            /* When the user clicks on the button, 
            toggle between hiding and showing the dropdown content */
            function myFunction() {
                document.getElementById("myDropdown").classList.toggle("show");
            }
  
            // Close the dropdown if the user clicks outside of it
            window.onclick = function(event) {
                if (!event.target.matches('.dropbtn')) {
                    var dropdowns = document.getElementsByClassName("dropdown-content");
                    var i;
                    for (i = 0; i < dropdowns.length; i++) {
                        var openDropdown = dropdowns[i];
                        if (openDropdown.classList.contains('show')) {
                            openDropdown.classList.remove('show');
                        }
                    }
                }
            }

            function createCard() {
                var phoneUrl = getParameterByName('phone')
                console.log(phoneUrl);
                $.get("https://toombike.kku.ac.th/user?phone=" + encodeURIComponent(phoneUrl), function(json){
                    var card = '';
                    var count = 0;
                    var data = json['Data']
                    
                    if ( data == 'No data Found..') {
                        card += '<p>ไม่มีข้อมูลของลูกค้าท่านนี้</p>';
                    } else {
                        for (var i = 0; i < 1; i++) {
                            count++;
    
                            /*card += '<div class="card" id="his' + data[i].cus_phone + '">' +
                                '<table class="cardTable">' + 
                                '<tr><td align="right">เบอร์โทรศัพท์ : </td><td><input type="text" class="userEdit" value="' + data[i].cus_phone + '"></td></tr>' +
                                '<tr><td align="right">ชื่อลูกค้า : </td><td><input type="text" class="userEdit" value="' + data[i].cus_name + '"></td></tr>' +
                                '<tr><td align="right">อีเมล : </td><td><input type="text" class="userEdit" value="' + data[i].cus_email + '"></td></tr>' +
                                '</table></div>'; */
                                
                            card += '<div class="card" id="his' + data[i].cus_phone + '">' +
                                '<table class="cardTable">' + 
                                '<tr><td align="right">เบอร์โทรศัพท์ : </td><td>' + data[i].cus_phone + '</td></tr>' +
                                '<tr><td align="right">ชื่อลูกค้า : </td><td>' + data[i].cus_name + '</td></tr>' +
                                '<tr><td align="right">อีเมล : </td><td>' + data[i].cus_email + '</td></tr>' +
                                '</table></div>';
                        }
                    }
                    
                    $('#cardView').html(card);
                });

                $.get("https://toombike.kku.ac.th/user/bike?phone=" + encodeURIComponent(phoneUrl) , function(json){
                    var card = '';
                    var count = 0;
                    var data = json['Data']
                    
                    if ( data == 'No data Found..') {
                        card += '<p>ไม่มีข้อมูลรถจักรยานยนต์ของลูกค้าท่านนี้</p>';
                    } else {
                        for (var i = 0; i < data.length; i++) {
                            count++;
    
                            card += '<div class="card">' +
                                '<span><p>หมายเลขลขทะเบียน : ' + data[i].bike_licence + '</p></span><hr>' +
                                '<table class="cardUser"><tr>' + 
                                '<td class="cardTd" align="right">ยี่ห้อ : </td><td class="cardTd">' + data[i].bike_brand + '</td>' +
                                '<td class="cardTd" align="right">รุ่น : </td><td class="cardTd">' + data[i].bike_model + '</td>' +
                                '<td class="cardTd" align="right">สี : </td><td class="cardTd">' + data[i].bike_color + '</td>' +
                                '</tr></table></div>';                            
                        }
                    }
                    
                    $('#cardView').append(card);
                });
            };

            function getParameterByName(name, url) {
                if (!url) url = window.location.href;
                name = name.replace(/[\[\]]/g, '\\$&');
                var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
                  results = regex.exec(url);
                if (!results) return null;
                if (!results[2]) return '';
                return decodeURIComponent(results[2].replace(/\+/g, ' '));
              }