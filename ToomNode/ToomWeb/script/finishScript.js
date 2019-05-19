var googleAPIKey = 'AIzaSyAJF7RaWrEIV1MA18HlXowsuTxiEjg6fE8';

            $(document).ready(function () {  
                $('[data-toggle="tooltip"]').tooltip(); 
                $("#search_button").click(function () {  
                    var search_val =  $('[name="search"]').val();
                    searchCard(search_val);
                });  
                $("#phone_search_button").click(function () { 
                    var search_val =  $('[name="phone_search"]').val(); 
                    searchCard(search_val);
                });  
            });

            function createCard() {
                $.get("https://www.toombike.com/allhis/status?status=เสร็จสิ้น", function(json){
                    var card = ''
                    var phone = ''
                    var count = 0;
                    var data = json['Data']
                    if ( data == 'No data Found..') {
                        card += '<p class="pNodata">ไม่มีประวัติการแจ้งซ่อมในขณะนี้</p>';
                        phone += '<p class="pNodata">ไม่มีประวัติการแจ้งซ่อมในขณะนี้</p>';
                    } else {
                        card += '<table class="table table-hover table-striped"><thead><tr>' +
                                '<th>วันเวลา</th>' +
                                '<th>ข้อมูลลูกค้า</th>' +
                                '<th>ข้อมูลรถจักรยานยนต์</th>' +
                                '<th>ข้อมูลการแจ้งซ่อม</th></tr>' +
                                '<th></th></tr></thead>';

                        phone += '<table class="table2 table-hover table-striped">'
                            
                        for (var i = 0; i < data.length; i++) {
                            count++;
                            var dateData = data[i].his_date;
                             var dateSplittest = dateData.split('T');
                            var dateSplit2 = dateSplittest[0].split('-');
                            
                            /*card += '<div class="card" id="his' + data[i].his_num + '"  onclick="editDetail(0' + data[i].his_num + ')">' +
                                '<span><p>' + dateSplit2[2] + ' ' + getMonth(dateSplit2[1]) + ' พ.ศ. ' + getBE(dateSplit2[0]) + ' ' + data[i].his_time + '</p></span><hr>' +
                                '<table class="cardTable"><tr>' + 
                                '<td class="numberTd" align="center"></td>' +
                                '<td class="cardTd"><ul><li>' + data[i].cus_name + '</li><li>'  + data[i].cus_phone + '</li><li>'  + data[i].cus_email + '</li></ul></td>' +
                                '<td class="cardTd"><ul><li>' + data[i].bike_licence + '</li><li>' + data[i].bike_brand + '</li><li>'  + data[i].bike_model + '</li><li>'  + data[i].bike_color + '</li></ul></td>' +
                                '<td class="cardTd">' + data[i].status + '</td></tr>' +
                                '<tr><td>สถานที่ : </td><td><p><a href="reGeocoding.html?lat=' + data[i].lat + '&lng=' + data[i].lng + '">แสดงบนแผนที่' + '</a></p></td></tr>' + 
                                '<tr><td>รายละเอียด : </td><td>' + data[i].detail + '</td>' +
                                '<td>ราคาซ่อม : </td><td>' + data[i].price + '</td></tr></table></div>';*/
                            
                            /*card += '<div class="card" id="his' + data[i].his_num + '"  onclick="editDetail(0' + data[i].his_num + ')">' +
                                '<table class="cardTable"><tr>' + 
                                '<td class="numberTd" align="center">' + dateSplit2[2] + ' ' + getMonth(dateSplit2[1]) + ' พ.ศ. ' + getBE(dateSplit2[0]) + '<br>' + data[i].his_time + '</td>' +
                                '<td class="cardTd"><ul><li>' + data[i].cus_name + '</li><li>'  + data[i].cus_phone + '</li></ul></td>' +
                                '<td class="cardTd"><ul><li>' + data[i].bike_licence + '</li><li>' + data[i].bike_brand + '</li><li>'  + data[i].bike_model + '</li><li>'  + data[i].bike_color + '</li></ul></td>' +
                                '<td class="cardTd">' + data[i].status + '</td></tr>' +
                                '</table></div>';*/

                            /*card += '<div class="card" id="his' + data[i].his_num + '"  onclick="editDetail(0' + data[i].his_num + ')">' +
                                '<span><p>' + dateSplit2[2] + ' ' + getMonth(dateSplit2[1]) + ' พ.ศ. ' + getBE(dateSplit2[0]) + ' ' + data[i].his_time + '</p></span><hr>' +
                                '<table class="cardTable"><tr>' + 
                                '<td><ul><li>' + data[i].cus_name + '</li><li>'  + data[i].cus_phone + '</li></ul></td>' +
                                '<td><ul><li>' + data[i].bike_licence + '</li><li>' + data[i].bike_brand + '</li><li>'  + data[i].bike_model + '</li><li>'  + data[i].bike_color + '</li></ul></td></tr>' +
                                '<tr><td>สถานะ : </td><td class="cardTd">' + data[i].status + '</td></tr>' +
                                '<tr><td>สถานที่ : </td><td><p><a href="reGeocoding.html?lat=' + data[i].lat + '&lng=' + data[i].lng + '">แสดงบนแผนที่' + '</a></p></td></tr>' +
                                '<tr><td>รายละเอียด : </td><td>' + data[i].detail + '</td></tr>' +
                                '<tr><td>ราคาซ่อม : </td><td>' + data[i].price + '</td></tr>' +
                                '</table></div>';*/

                            card += '<tr id="tr' + data[i].his_num + '">' +
                                    '<td><ul><li>วันที่ : ' + dateSplit2[2] + ' ' + getMonth(dateSplit2[1]) + ' พ.ศ. ' + getBE(dateSplit2[0]) + '</li><li>เวลา : ' + data[i].his_time + '</li></ul></td>' +
                                    '<td><ul><li>เบอร์โทรศัพท์ : ' + data[i].cus_phone + '</li><li>ชื่อลูกค้า : ' + data[i].cus_name + '</li><li>อีเมล : ' + data[i].cus_email + '</li></ul></td>' +
                                    '<td><ul><li>เลขทะเบียนรถ : ' + data[i].bike_licence + '</li><li>ยี่ห้อ : ' + data[i].bike_brand + '</li><li>รุ่น : ' + data[i].bike_model + '</li><li>สี : ' + data[i].bike_color + '</li></ul></td>' +
                                    '<td><ul><li>สถานะ : ' + data[i].status + '</li><li>รายละเอียด : ' + data[i].detail + '</li><li>ราคา : ' + data[i].price + '</li><li>สถานที่ : <a id="lat' + data[i].lat + 'lng' + data[i].lng + '" href="pubnubGeo.html?lat=' + data[i].lat + '&lng=' + data[i].lng + '"><i class="glyphicon glyphicon-map-marker"></i> แสดงบนแผนที่' + ' </a></li></ul></td>' +
                                    '<td><a id="td' + data[i].his_num + '" onClick="editDetail(this, \'' + data[i].status + '\', \'' + data[i].detail + '\', \'' + data[i].price + '\'); return false;" href="fallback.html"><i class="glyphicon glyphicon-pencil"></i> แก้ไขการแจ้งซ่อม </a><hr><hr></td>' +
                                    '</tr>'

                            phone += '<td class="reqTd">' + 
                                    '<tr> <th>วันเวลา</th>            <td><ul><li>วันที่ : ' + dateSplit2[2] + ' ' + getMonth(dateSplit2[1]) + ' พ.ศ. ' + getBE(dateSplit2[0]) + '</li><li>เวลา : ' + data[i].his_time + '</li></ul></td></tr>' +
                                    '<tr> <th>ข้อมูลลูกค้า</th>         <td><ul><li>เบอร์โทรศัพท์ : ' + data[i].cus_phone + '</li><li>ชื่อลูกค้า : ' + data[i].cus_name + '</li><li>อีเมล : ' + data[i].cus_email + '</li></ul></td></tr>' +
                                    '<tr> <th>ข้อมูลรถจักรยานยนต์</th>  <td><ul><li>เลขทะเบียนรถ : ' + data[i].bike_licence + '</li><li>ยี่ห้อ : ' + data[i].bike_brand + '</li><li>รุ่น : ' + data[i].bike_model + '</li><li>สี : ' + data[i].bike_color + '</li></ul></td></tr>' +
                                    '<tr id="reqTr' + data[i].his_num + '" > <th>ข้อมูลการแจ้งซ่อม</th>    <td><ul><li>สถานะ : ' + data[i].status + '</li><li>รายละเอียด : ' + data[i].detail + '</li><li>ราคา : ' + data[i].price + '</li><li>สถานที่ : <a id="lat' + data[i].lat + 'lng' + data[i].lng + '" href="pubnubGeo.html?lat=' + data[i].lat + '&lng=' + data[i].lng + '"><i class="glyphicon glyphicon-map-marker"></i> แสดงบนแผนที่' + ' </a></li></ul></td></tr>' +
                                    '<tr id="editTr' + data[i].his_num + '" > <th></th>                  <td><a id="td' + data[i].his_num + '" onClick="editDetailPhone(this, \'' + data[i].status + '\', \'' + data[i].detail + '\', \'' + data[i].price + '\'); return false;" href="fallback.html"><i class="glyphicon glyphicon-pencil"></i> แก้ไขการแจ้งซ่อม </a><hr><hr></td></tr>' +
                                    '</td>'
                        }
                        card += '</table>'
                        phone += '</table>'
                    }
                    
                    $('#cardView').html(card);
                    $('#phoneView').html(phone);
                });
            };

            function searchCard(search_val) {
                $.get("https://www.toombike.com/search/history?search=" + search_val + "&status=เสร็จสิ้น", function(json){
                    var card = ''
                    var phone = ''
                    var count = 0;
                    var data = json['Data']
                    if ( data == 'No data Found..') {
                        card += '<p class="pNodata">ไม่มีประวัติการแจ้งซ่อมในขณะนี้</p>';
                        phone += '<p class="pNodata">ไม่มีประวัติการแจ้งซ่อมในขณะนี้</p>';
                    } else {
                        card += '<table class="table table-hover table-striped"><thead><tr>' +
                                '<th>วันเวลา</th>' +
                                '<th>ข้อมูลลูกค้า</th>' +
                                '<th>ข้อมูลรถจักรยานยนต์</th>' +
                                '<th>ข้อมูลการแจ้งซ่อม</th></tr>' +
                                '<th></th></tr></thead>';

                        phone += '<table class="table2 table-hover table-striped">'
                            
                        for (var i = 0; i < data.length; i++) {
                            count++;
                            var dateData = data[i].his_date;
                             var dateSplittest = dateData.split('T');
                            var dateSplit2 = dateSplittest[0].split('-');
                            
                            /*card += '<div class="card" id="his' + data[i].his_num + '"  onclick="editDetail(0' + data[i].his_num + ')">' +
                                '<span><p>' + dateSplit2[2] + ' ' + getMonth(dateSplit2[1]) + ' พ.ศ. ' + getBE(dateSplit2[0]) + ' ' + data[i].his_time + '</p></span><hr>' +
                                '<table class="cardTable"><tr>' + 
                                '<td class="numberTd" align="center"></td>' +
                                '<td class="cardTd"><ul><li>' + data[i].cus_name + '</li><li>'  + data[i].cus_phone + '</li><li>'  + data[i].cus_email + '</li></ul></td>' +
                                '<td class="cardTd"><ul><li>' + data[i].bike_licence + '</li><li>' + data[i].bike_brand + '</li><li>'  + data[i].bike_model + '</li><li>'  + data[i].bike_color + '</li></ul></td>' +
                                '<td class="cardTd">' + data[i].status + '</td></tr>' +
                                '<tr><td>สถานที่ : </td><td><p><a href="reGeocoding.html?lat=' + data[i].lat + '&lng=' + data[i].lng + '">แสดงบนแผนที่' + '</a></p></td></tr>' + 
                                '<tr><td>รายละเอียด : </td><td>' + data[i].detail + '</td>' +
                                '<td>ราคาซ่อม : </td><td>' + data[i].price + '</td></tr></table></div>';*/
                            
                            /*card += '<div class="card" id="his' + data[i].his_num + '"  onclick="editDetail(0' + data[i].his_num + ')">' +
                                '<table class="cardTable"><tr>' + 
                                '<td class="numberTd" align="center">' + dateSplit2[2] + ' ' + getMonth(dateSplit2[1]) + ' พ.ศ. ' + getBE(dateSplit2[0]) + '<br>' + data[i].his_time + '</td>' +
                                '<td class="cardTd"><ul><li>' + data[i].cus_name + '</li><li>'  + data[i].cus_phone + '</li></ul></td>' +
                                '<td class="cardTd"><ul><li>' + data[i].bike_licence + '</li><li>' + data[i].bike_brand + '</li><li>'  + data[i].bike_model + '</li><li>'  + data[i].bike_color + '</li></ul></td>' +
                                '<td class="cardTd">' + data[i].status + '</td></tr>' +
                                '</table></div>';*/

                            /*card += '<div class="card" id="his' + data[i].his_num + '"  onclick="editDetail(0' + data[i].his_num + ')">' +
                                '<span><p>' + dateSplit2[2] + ' ' + getMonth(dateSplit2[1]) + ' พ.ศ. ' + getBE(dateSplit2[0]) + ' ' + data[i].his_time + '</p></span><hr>' +
                                '<table class="cardTable"><tr>' + 
                                '<td><ul><li>' + data[i].cus_name + '</li><li>'  + data[i].cus_phone + '</li></ul></td>' +
                                '<td><ul><li>' + data[i].bike_licence + '</li><li>' + data[i].bike_brand + '</li><li>'  + data[i].bike_model + '</li><li>'  + data[i].bike_color + '</li></ul></td></tr>' +
                                '<tr><td>สถานะ : </td><td class="cardTd">' + data[i].status + '</td></tr>' +
                                '<tr><td>สถานที่ : </td><td><p><a href="reGeocoding.html?lat=' + data[i].lat + '&lng=' + data[i].lng + '">แสดงบนแผนที่' + '</a></p></td></tr>' +
                                '<tr><td>รายละเอียด : </td><td>' + data[i].detail + '</td></tr>' +
                                '<tr><td>ราคาซ่อม : </td><td>' + data[i].price + '</td></tr>' +
                                '</table></div>';*/

                            card += '<tr id="tr' + data[i].his_num + '">' +
                                    '<td><ul><li>วันที่ : ' + dateSplit2[2] + ' ' + getMonth(dateSplit2[1]) + ' พ.ศ. ' + getBE(dateSplit2[0]) + '</li><li>เวลา : ' + data[i].his_time + '</li></ul></td>' +
                                    '<td><ul><li>เบอร์โทรศัพท์ : ' + data[i].cus_phone + '</li><li>ชื่อลูกค้า : ' + data[i].cus_name + '</li><li>อีเมล : ' + data[i].cus_email + '</li></ul></td>' +
                                    '<td><ul><li>เลขทะเบียนรถ : ' + data[i].bike_licence + '</li><li>ยี่ห้อ : ' + data[i].bike_brand + '</li><li>รุ่น : ' + data[i].bike_model + '</li><li>สี : ' + data[i].bike_color + '</li></ul></td>' +
                                    '<td><ul><li>สถานะ : ' + data[i].status + '</li><li>รายละเอียด : ' + data[i].detail + '</li><li>ราคา : ' + data[i].price + '</li><li>สถานที่ : <a id="lat' + data[i].lat + 'lng' + data[i].lng + '" href="pubnubGeo.html?lat=' + data[i].lat + '&lng=' + data[i].lng + '"><i class="glyphicon glyphicon-map-marker"></i> แสดงบนแผนที่' + ' </a></li></ul></td>' +
                                    '<td><a id="td' + data[i].his_num + '" onClick="editDetail(this, \'' + data[i].status + '\', \'' + data[i].detail + '\', \'' + data[i].price + '\'); return false;" href="fallback.html"><i class="glyphicon glyphicon-pencil"></i> แก้ไขการแจ้งซ่อม </a><hr><hr></td>' +
                                    '</tr>'

                            phone += '<td class="reqTd">' + 
                                    '<tr> <th>วันเวลา</th>            <td><ul><li>วันที่ : ' + dateSplit2[2] + ' ' + getMonth(dateSplit2[1]) + ' พ.ศ. ' + getBE(dateSplit2[0]) + '</li><li>เวลา : ' + data[i].his_time + '</li></ul></td></tr>' +
                                    '<tr> <th>ข้อมูลลูกค้า</th>         <td><ul><li>เบอร์โทรศัพท์ : ' + data[i].cus_phone + '</li><li>ชื่อลูกค้า : ' + data[i].cus_name + '</li><li>อีเมล : ' + data[i].cus_email + '</li></ul></td></tr>' +
                                    '<tr> <th>ข้อมูลรถจักรยานยนต์</th>  <td><ul><li>เลขทะเบียนรถ : ' + data[i].bike_licence + '</li><li>ยี่ห้อ : ' + data[i].bike_brand + '</li><li>รุ่น : ' + data[i].bike_model + '</li><li>สี : ' + data[i].bike_color + '</li></ul></td></tr>' +
                                    '<tr id="reqTr' + data[i].his_num + '" > <th>ข้อมูลการแจ้งซ่อม</th>    <td><ul><li>สถานะ : ' + data[i].status + '</li><li>รายละเอียด : ' + data[i].detail + '</li><li>ราคา : ' + data[i].price + '</li><li>สถานที่ : <a id="lat' + data[i].lat + 'lng' + data[i].lng + '" href="pubnubGeo.html?lat=' + data[i].lat + '&lng=' + data[i].lng + '"><i class="glyphicon glyphicon-map-marker"></i> แสดงบนแผนที่' + ' </a></li></ul></td></tr>' +
                                    '<tr id="editTr' + data[i].his_num + '" > <th></th>                  <td><a id="td' + data[i].his_num + '" onClick="editDetailPhone(this, \'' + data[i].status + '\', \'' + data[i].detail + '\', \'' + data[i].price + '\'); return false;" href="fallback.html"><i class="glyphicon glyphicon-pencil"></i> แก้ไขการแจ้งซ่อม </a><hr><hr></td></tr>' +
                                    '</td>'
                        }
                        card += '</table>'
                        phone += '</table>'
                    }
                    
                    $('#cardView').html(card);
                    $('#phoneView').html(phone);
                });
            };

            function editDetail(e, status, detail, price) {
                var tdId = $(e).attr('id');
                var tdIdSplit = tdId.split('td');
                var his_id = tdIdSplit[1];
                var trId = 'tr' + his_id;
                
                var statusLi = $('#' + trId).find('li')[9]
                var detailLi = $('#' + trId).find('li')[10]
                var priceLi = $('#' + trId).find('li')[11]
                var infoTd = $('#' + trId).find('td')[3]
                var editTd = $('#' + trId).find('td')[4]

                var pickUp
                var process
                var finish

                if (status == 'แจ้งซ่อม') {
                    pickUp = 'checked="checked"'
                    process = ''
                    finish = ''
                } else if (status == 'กำลังดำเนินการ') {
                    pickUp = ''
                    process = 'checked="checked"'
                    finish = ''
                } else if (status == 'เสร็จสิ้น') {
                    pickUp = ''
                    process = ''
                    finish = 'checked="checked"'
                } else {
                    pickUp = 'checked="checked"'
                    process = ''
                    finish = ''
                }

                var statusHandle =  '<label for="radio">สถานะ :</label>' +
                                    '<form action="">' +
                                    '<input type="radio" name="status" class="radioStatus' + his_id + '" id="pickUp" ' + pickUp + ' value="แจ้งซ่อม"><span id="grayDot"></span> แจ้งซ่อม<br>' + 
                                    '<input type="radio" name="status" class="radioStatus' + his_id + '" id="process" ' + process + ' value="กำลังดำเนินการ"><span id="yellowDot"></span> กำลังดำเนินการ<br>' +
                                    '<input type="radio" name="status" class="radioStatus' + his_id + '" id="finish" ' + finish + ' value="เสร็จสิ้น"><span id="greenDot"></span> เสร็จสิ้น<br>' +
                                    '</form>'
                $(statusLi).html(statusHandle);

                var detailHandle =  '<div class="form-group">' +
                                    '<label for="textarea">รายละเอียด :</label>' +
                                    '<textarea class="form-control" rows="5" id="textarea' + his_id + '">' + detail + '</textarea>' +
                                    '</div>'
                $(detailLi).html(detailHandle);

                var priceHandle =   '<div class="form-group">' +
                                    '<label for="price">ราคา :</label>' +
                                    '<input type=number step=1 class="form-control" id="price' + his_id + '" value="' + price + '" min="0">' +
                                    '</div>'
                $(priceLi).html(priceHandle);

                var infoTdHandle =  '<from class="cancelB">' +
                                    '<input id="cancel" type="submit" class="btn" value="ยกเลิก" onclick="cancelSubmit(' + his_id + ')">' +
                                    '<from>' +
                                    '<from class="submitB">' +
                                    '<input id="submit' + his_id + '" type="submit" class="btn btn-success" value="ยืนยันการแก้ไข" onclick="updateSubmit(' + his_id + ')">' +
                                    '<from>'
                                    
                $(infoTd).append(infoTdHandle);

                var editTdHandle =  '<p class="disable">กำลังแก้ไขการแจ้งซ่อม</p><hr><hr>'
                $(editTd).html(editTdHandle);               
            }

            function editDetailPhone(e, status, detail, price) {
                var tdId = $(e).attr('id');
                var tdIdSplit = tdId.split('td');
                var his_id = tdIdSplit[1];
                
                var statusLi = $('#reqTr' + his_id).find('li')[0]
                var detailLi = $('#reqTr' + his_id).find('li')[1]
                var priceLi = $('#reqTr' + his_id).find('li')[2]
                var infoTd = $('#reqTr' + his_id).find('td')[0]
                var editTd = $('#editTr' + his_id).find('td')[0]

                var pickUp
                var process
                var finish

                if (status == 'แจ้งซ่อม') {
                    pickUp = 'checked="checked"'
                    process = ''
                    finish = ''
                } else if (status == 'กำลังดำเนินการ') {
                    pickUp = ''
                    process = 'checked="checked"'
                    finish = ''
                } else if (status == 'เสร็จสิ้น') {
                    pickUp = ''
                    process = ''
                    finish = 'checked="checked"'
                } else {
                    pickUp = 'checked="checked"'
                    process = ''
                    finish = ''
                }

                var statusHandle =  '<label for="radio">สถานะ :</label>' +
                                    '<form action="">' +
                                    '<input type="radio" name="status" class="radioStatus' + his_id + '" id="pickUp" ' + pickUp + ' value="แจ้งซ่อม"><span id="grayDot"></span> แจ้งซ่อม<br>' + 
                                    '<input type="radio" name="status" class="radioStatus' + his_id + '" id="process" ' + process + ' value="กำลังดำเนินการ"><span id="yellowDot"></span> กำลังดำเนินการ<br>' +
                                    '<input type="radio" name="status" class="radioStatus' + his_id + '" id="finish" ' + finish + ' value="เสร็จสิ้น"><span id="greenDot"></span> เสร็จสิ้น<br>' +
                                    '</form>'
                $(statusLi).html(statusHandle);

                var detailHandle =  '<div class="form-group">' +
                                    '<label for="textarea">รายละเอียด :</label>' +
                                    '<textarea class="form-control" rows="5" id="textarea' + his_id + '">' + detail + '</textarea>' +
                                    '</div>'
                $(detailLi).html(detailHandle);

                var priceHandle =   '<div class="form-group">' +
                                    '<label for="price">ราคา :</label>' +
                                    '<input type=number step=1 class="form-control" id="price' + his_id + '" value="' + price + '" min="0">' +
                                    '</div>'
                $(priceLi).html(priceHandle);

                var infoTdHandle =  '<from class="cancelB">' +
                                    '<input id="cancel" type="submit" class="btn" value="ยกเลิก" onclick="cancelSubmitPhone(' + his_id + ')">' +
                                    '<from>' +
                                    '<from class="submitB">' +
                                    '<input id="submit' + his_id + '" type="submit" class="btn btn-success" value="ยืนยันการแก้ไข" onclick="updateSubmit(' + his_id + ')">' +
                                    '<from>'
                                    
                $(infoTd).append(infoTdHandle);

                var editTdHandle =  '<p class="disable">กำลังแก้ไขการแจ้งซ่อม</p><hr><hr>'
                $(editTd).html(editTdHandle);              
            }

            function updateSubmit(his_num) {
                var tr = $('#tr' + his_num)
                var li = tr.find('li')

                var numberLi = tr.find('li')[5]
                var numberSplit = $(numberLi).text().split('เลขทะเบียนรถ : ')
                var number = numberSplit[1]

                var latLngA = tr.find('a')[0]
                var latLngSplit = $(latLngA).attr('id');
                var latSplit = latLngSplit.split('lat')
                var lngSplit = latSplit[1].split('lng')
                var lat = lngSplit[0]
                var lng = lngSplit[1]

                var detail = $('#textarea' + his_num).val();
                var price = $('#price' + his_num).val();
                var priceCheck = parseInt(price)
                if (priceCheck < 0) {
                    price = '0'
                }
                var status = $(".radioStatus" + his_num + ":checked").val();

                //console.log(detail + ' ' + price + ' ' + status)

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
                    url: 'https://www.toombike.com/put/history',  
                    type: 'PUT',  
                    dataType: 'json',  
                    data: data,  
                    success: function (data, textStatus, xhr) {  
                        if (priceCheck < 0) {
                            alert('ดำเนินการแก้ไขสำเร็จ *หมายเหตุ : ราคาที่เป็นจำนวนลบจะไม่ถูกบันทึก');
                            reload_page()
                        } else {
                            alert('ดำเนินการแก้ไขสำเร็จ');
                            reload_page()
                        }
                    },  
                    error: function (xhr, textStatus, errorThrown) {  
                        alert('การแก้ไขล้มเหลว โปรดตรวจสอบว่าลูกค้าเป็นเจ้าของรถจักรยานยนต์หรือไม่');  
                    }  
                });
            }
            
            function cancelSubmit(his_num) {
                var tr = $('#tr' + his_num)
                var li = tr.find('td')
                var infoTd = tr.find('td')[3]
                var editTd = tr.find('td')[4]

                $.get("https://www.toombike.com/selecthis?his_num=" + his_num , function(json){
                    var card = '';
                    var editTdHander = '';
                    var count = 0;
                    var data = json['Data']
                    if ( data == 'No data Found..') {
                        card += '<p class="pNodata">ไม่มีประวัติการแจ้งซ่อมในขณะนี้</p>';
                    } else {
                        for (var i = 0; i < 1; i++) {
                            count++;
                            var dateData = data[i].his_date;
                             var dateSplittest = dateData.split('T');
                            var dateSplit2 = dateSplittest[0].split('-');

                            card += '<ul><li>สถานะ : ' + data[i].status + '</li><li>รายละเอียด : ' + data[i].detail + '</li><li>ราคา : ' + data[i].price + '</li><li>สถานที่ : <a id="lat' + data[i].lat + 'lng' + data[i].lng + '" href="pubnubGeo.html?lat=' + data[i].lat + '&lng=' + data[i].lng + '"><i class="glyphicon glyphicon-map-marker"></i>แสดงบนแผนที่' + ' </a></li></ul>'
                            editTdHander += '<a id="td' + data[i].his_num + '" onClick="editDetail(this, \'' + data[i].status + '\', \'' + data[i].detail + '\', \'' + data[i].price + '\'); return false;" href="fallback.html"><i class="glyphicon glyphicon-pencil"></i> แก้ไขการแจ้งซ่อม </a><hr><hr>'
                        }
                    }
                    $(infoTd).html(card);
                    $(editTd).html(editTdHander);
                });
            }  

            function cancelSubmitPhone(his_num) {
                var infoTd = $('#reqTr' + his_num).find('td')[0]
                var editTd = $('#editTr' + his_num).find('td')[0]

                $.get("https://www.toombike.com/selecthis?his_num=" + his_num , function(json){
                    var card = '';
                    var editTdHander = '';
                    var count = 0;
                    var data = json['Data']
                    if ( data == 'No data Found..') {
                        card += '<p class="pNodata">ไม่มีประวัติการแจ้งซ่อมในขณะนี้</p>';
                    } else {
                        for (var i = 0; i < 1; i++) {
                            count++;
                            var dateData = data[i].his_date;
                             var dateSplittest = dateData.split('T');
                            var dateSplit2 = dateSplittest[0].split('-');

                            card += '<ul><li>สถานะ : ' + data[i].status + '</li><li>รายละเอียด : ' + data[i].detail + '</li><li>ราคา : ' + data[i].price + '</li><li>สถานที่ : <a id="lat' + data[i].lat + 'lng' + data[i].lng + '" href="pubnubGeo.html?lat=' + data[i].lat + '&lng=' + data[i].lng + '"><i class="glyphicon glyphicon-map-marker"></i>แสดงบนแผนที่' + ' </a></li></ul>'
                            editTdHander += '<a id="td' + data[i].his_num + '" onClick="editDetailPhone(this, \'' + data[i].status + '\', \'' + data[i].detail + '\', \'' + data[i].price + '\'); return false;" href="fallback.html"><i class="glyphicon glyphicon-pencil"></i> แก้ไขการแจ้งซ่อม </a><hr><hr>'
                        }
                    }
                    $(infoTd).html(card);
                    $(editTd).html(editTdHander);
                });
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