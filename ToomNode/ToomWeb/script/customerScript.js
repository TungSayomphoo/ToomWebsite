var googleAPIKey = 'AIzaSyAJF7RaWrEIV1MA18HlXowsuTxiEjg6fE8';

            createCard();

            $(document).ready(function () {  
                $("#search_button").click(function () {  
                    var search_val =  $('#search').val();
                    searchCard(search_val);
                    console.log(search_val)  
                });  
            });

            function createCard() {
                $.get("https://toombike.kku.ac.th/alluser", function(json){
                    var card = '';
                    var data = json['Data']
                    if ( data == 'No data Found..') {
                        card += '<p>ไม่มีประวัติการแจ้งซ่อมในขณะนี้</p>';
                    } else {
                        for (var i = 0; i < data.length; i++) {
                            /*var phoneNum = data[i].cus_phone
                            var phone2 = phoneNum.split('+66');
                            var phone3 = phone2[1];*/
                            //console.log(data[i].cus_phone)
    
                            card += '<div class="card" id="user' + data[i].cus_phone + '"  onclick="editDetail(\'' + data[i].cus_phone + '\')">' +
                                '<table class="cardUser"><tr>' + 
                                '<td class="cardTd" align="center">' + data[i].cus_phone + '</td>' +
                                '<td class="cardTd" align="center">' + data[i].cus_name+ '</td>' +
                                '<td class="cardTd" align="center">' + data[i].cus_email + '</td>' +
                                '</tr></table>' +
                                '<table class="cardUserPhone">' + 
                                '<tr><td align="right">เบอร์โทรศัพท์ : </td><td>' + data[i].cus_phone + '</td></tr>' +
                                '<tr><td align="right">ชื่อลูกค้า : </td><td>' + data[i].cus_name+ '</td></tr>' +
                                '<tr><td align="right">อีเมล : </td><td>' + data[i].cus_email + '</td></tr>' +
                                '</table><hr></div>';
                            
                            $.get("https://toombike.kku.ac.th/user/bike?phone=" + encodeURIComponent(data[i].cus_phone) , function(json){
                                var card2 = '<ul>'
                                var cusData = json['Data']
                                var userData = json['user']
                                var cusphone3 = userData[0].cus_phone
                                //console.log(cusphone3)

                                if ( cusData == 'No data Found..') {
                                    card2 += '<li>ไม่มีรถจักรยานยนต์</li></ul>'
                                } else {
                                    for (var j = 0; j < cusData.length; j++) { 
                                        /*var cusphone = cusData[j].cus_phone
                                        var cusphone2 = cusphone.split('+66');*/

                                        card2 += '<li>หมายเลขทะเบียน : ' + cusData[j].bike_licence + ' <br>ยี่ห้อ : ' + cusData[j].bike_brand + ' <br>รุ่น : ' + cusData[j].bike_model + ' <br>สี : ' + cusData[j].bike_color + '</li><br>'
                                    }
                                    card2 += '</ul>'
                                }
                                $('#user' +  cusphone3).append(card2);
                            });
                        }
                    }
                    
                    $('#cardView').html(card);
                });
            };

            function searchCard(search_val) {
                $.get("https://toombike.kku.ac.th/search/user?search=" + search_val, function(json){
                    var card = '';
                    var data = json['Data']
                    if ( data == 'No data Found..') {
                        card += '<p>ไม่มีประวัติการแจ้งซ่อมในขณะนี้</p>';
                    } else {
                        for (var i = 0; i < 1; i++) {
                            /*var phoneNum = data[i].cus_phone
                            var phone2 = phoneNum.split('+66');
                            var phone3 = phone2[1];*/
                            //console.log(data[i].cus_phone)
    
                            card += '<div class="card" id="user' + data[i].cus_phone + '"  onclick="editDetail(\'' + data[i].cus_phone + '\')">' +
                                '<table class="cardUser"><tr>' + 
                                '<td class="cardTd" align="center">' + data[i].cus_phone + '</td>' +
                                '<td class="cardTd" align="center">' + data[i].cus_name+ '</td>' +
                                '<td class="cardTd" align="center">' + data[i].cus_email + '</td>' +
                                '</tr></table>' +
                                '<table class="cardUserPhone">' + 
                                '<tr><td align="right">เบอร์โทรศัพท์ : </td><td>' + data[i].cus_phone + '</td></tr>' +
                                '<tr><td align="right">ชื่อลูกค้า : </td><td>' + data[i].cus_name+ '</td></tr>' +
                                '<tr><td align="right">อีเมล : </td><td>' + data[i].cus_email + '</td></tr>' +
                                '</table><hr></div>';
                            
                            $.get("https://toombike.kku.ac.th/user/bike?phone=" + encodeURIComponent(data[i].cus_phone) , function(json){
                                var card2 = '<ul>'
                                var cusData = json['Data']
                                var userData = json['user']
                                var cusphone3 = userData[0].cus_phone
                                //console.log(cusphone3)

                                if ( cusData == 'No data Found..') {
                                    card2 += '<li>ไม่มีรถจักรยานยนต์</li></ul>'
                                } else {
                                    for (var j = 0; j < cusData.length; j++) { 
                                        /*var cusphone = cusData[j].cus_phone
                                        var cusphone2 = cusphone.split('+66');*/

                                        card2 += '<li>หมายเลขทะเบียน : ' + cusData[j].bike_licence + ' <br>ยี่ห้อ : ' + cusData[j].bike_brand + ' <br>รุ่น : ' + cusData[j].bike_model + ' <br>สี : ' + cusData[j].bike_color + '</li><br>'
                                    }
                                    card2 += '</ul>'
                                }
                                $('#user' +  cusphone3).append(card2);
                            });
                        }
                    }
                    
                    $('#cardView').html(card);
                });
            };

            function editDetail(phone) {
                window.location.href = "editCustomer.html?phone=" + phone;
            }

            function reload_page() {
                window.location.reload();
            }

            function getAddr(lat, lng) {
                var addr
                $.get("https://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + "," + lng + "&key=" + googleAPIKey, function(json){
                    var results = json['results']
                    console.log(results[0].formatted_address)
                    addr = results[0].formatted_address;
                    return addr
                });
                return addr
            };