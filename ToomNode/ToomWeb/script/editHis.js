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
                var hisUrl = getParameterByName('his_num')
                console.log(hisUrl);
                $.get("https://toombike.kku.ac.th/selecthis?his_num=" + encodeURIComponent(hisUrl), function(json){
                    var card = '';
                    var count = 0;
                    var data = json['Data']
                    
                    if ( data == 'No data Found..') {
                        card += '<p>ไม่มีข้อมูลของลูกค้าท่านนี้</p>';
                    } else {
                        for (var i = 0; i < 1; i++) {
                            count++;

                            var phoneNum = data[i].cus_phone
                            var phone2 = phoneNum.split('+66');
                            var phone3 = phone2[1];

                            var dateData = data[i].his_date;
                            var dateSplit = dateData.split('T', 1);

                            var pickUp
                            var process
                            var finish

                            if (data[i].status == 'แจ้งซ่อม') {
                                pickUp = 'checked="checked"'
                                process = ''
                                finish = ''
                            } else if (data[i].status == 'กำลังดำเนินการ') {
                                pickUp = ''
                                process = 'checked="checked"'
                                finish = ''
                            } else if (data[i].status == 'เสร็จสิ้น') {
                                pickUp = ''
                                process = ''
                                finish = 'checked="checked"'
                            } else {
                                pickUp = 'checked="checked"'
                                process = ''
                                finish = ''
                            }
    
                            card += '<div class="card" id="his' + data[i].his_num + '" >' +
                                '<span><p>' + dateSplit + ' ' + data[i].his_time + '</p></span><hr>' +
                                '<table class="cardTable"><tr>' + 
                                '<td class="numberTd" align="center"></td>' +
                                '<td class="cardTd"><ul><li>' + data[i].cus_name + '</li><li>' + data[i].cus_phone + '</li><li>'  + data[i].cus_email + '</li></ul></td>' +
                                '<td class="cardTd"><ul><li>' + data[i].bike_licence + '</li><li>' + data[i].bike_brand + '</li><li>'  + data[i].bike_model + '</li><li>'  + data[i].bike_color + '</li></ul></td></tr></table>' +
                                '<span class="headSpan"><p>สถานที่</p></span><hr>' + 
                                '<p><a href="reGeocoding.html?lat=' + data[i].lat + '&lng=' + data[i].lng + '">แสดงบนแผนที่' + '</a></p>' +
                                '<span class="headSpan"><p>แก้ไขสถานะ</p></span><hr>' + 
                                '<form action="">' +
                                '<input type="radio" name="status" class="radioStatus" id="pickUp" ' + pickUp + ' value="แจ้งซ่อม">แจ้งซ่อม<br>' + 
                                '<input type="radio" name="status" class="radioStatus" id="process" ' + process + ' value="กำลังดำเนินการ">กำลังดำเนินการ<br>' +
                                '<input type="radio" name="status" class="radioStatus" id="finish" ' + finish + ' value="เสร็จสิ้น">เสร็จสิ้น<br>' +
                                '</form>' +
                                '<span class="headSpan"><p>แก้ไขรายละเอียดการแจ้งซ่อม</p></span><hr>' + 
                                '<textarea id="textarea">' + data[i].detail + '</textarea>' +
                                '<span class="headSpan"><p>แก้ไขราคาการซ่อม</p></span><hr>' + 
                                '<form><input id="price" type=number step=1 value="' + data[i].price + '"/></form>' +
                                '<from id="canSub">' +
                                '<input id="cancel" type="submit" value="ยกเลิก" onclick="goBack()">' +
                                '<input id="submit" type="submit" value="ยืนยันการแก้ไข" onclick="updateSubmit(' + data[i].his_num + ', \'' + data[i].bike_licence + '\', ' + data[i].lat + ', ' + data[i].lng + ')">' +
                                '<from>' +
                                '</div>';                        
                        }
                    }
                    
                    $('#cardView').html(card);
                });
            };

            function updateSubmit(his_num, number, lat, lng,) {
                var his_num = his_num
                var number = number
                var lat = lat
                var lng = lng
                var detail = $('#textarea').val();
                var price = $('#price').val();
                var status = $(".radioStatus:checked").val();

                data = {
                    "his_num" : his_num,
                    "number" : number,
                    "lat" : lat,
                    "lng" : lng,
                    "detail" : detail,
                    "price" : price,
                    "status" : status
                }

                $.ajax({  
                    url: 'https://toombike.kku.ac.th/put/history',  
                    type: 'PUT',  
                    dataType: 'json',  
                    data: data,  
                    success: function (data, textStatus, xhr) {  
                        alert('ดำเนินการแก้ไขสำเร็จ');
                        jump(status)
                    },  
                    error: function (xhr, textStatus, errorThrown) {  
                        alert('การแก้ไขล้มเหลว โปรดตรวจสอบว่าลูกค้าเป็นเจ้าของรถจักรยานยนต์หรือไม่');  
                    }  
                });
            }

            function jump(status) {
                if (status == 'แจ้งซ่อม') {
                    window.location.href = "phone.html";
                } else if (status == 'กำลังดำเนินการ') {
                    window.location.href = "process.html";
                } else if (status == 'เสร็จสิ้น') {
                    window.location.href = "finish.html";
                } else {
                    window.location.href = "phone.html";
                }
            }

            function goBack() {
                window.history.back();
            }

            function getParameterByName(name, url) {
                if (!url) url = window.location.href;
                name = name.replace(/[\[\]]/g, '\\$&');
                var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
                    results = regex.exec(url);
                if (!results) return null;
                if (!results[2]) return '';
                return decodeURIComponent(results[2].replace(/\+/g, ' '));
            }
            
            