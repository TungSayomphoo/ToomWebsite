var googleAPIKey = 'AIzaSyAJF7RaWrEIV1MA18HlXowsuTxiEjg6fE8';

            detectLogin()
            createCard();

            $(document).ready(function () {  
                $('[data-toggle="tooltip"]').tooltip(); 
                $("#search_button").click(function () {  
                    var search_val =  $('[name="search"]').val();
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
                        card += '<table class="table table-hover table-striped"><thead><tr>' +
                                '<th>ข้อมูลลูกค้า</th>' +
                                '<th>ข้อมูลรถจักรยานยนต์</th>' +
                                '<th></th></tr></thead>';
                        for (var i = 0; i < data.length; i++) {
                            /*var phoneNum = data[i].cus_phone
                            var phone2 = phoneNum.split('+66');
                            var phone3 = phone2[1];*/
                            //console.log(data[i].cus_phone)
    
                            card += '<tr id="tr' + data[i].cus_phone + '">' +
                                    '<td><ul><li>เบอร์โทรศัพท์ : ' + data[i].cus_phone + '</li><li>ชื่อลูกค้า : ' + data[i].cus_name + '</li><li>อีเมล : ' + data[i].cus_email + '</li></ul></td>' +
                                    '<td id="user' + data[i].cus_phone + '"></td>' +
                                    '<td><a class="addDelete" id="' + data[i].cus_phone + '" onClick="addBikeConsole(this); return false;" href="fallback.html"><i class="glyphicon glyphicon-pencil"></i> เพิ่มลดรถจักรยานยนต์ </a></td>' +
                                    '</tr>'
                            
                            $.get("https://toombike.kku.ac.th/user/bike?phone=" + encodeURIComponent(data[i].cus_phone) , function(json){
                                var card2 = ''
                                var cusData = json['Data']
                                var userData = json['user']
                                var cusphone3 = userData[0].cus_phone
                                var count = 0
                                //console.log(cusphone3)

                                if ( cusData == 'No data Found..') {
                                    card2 += '<p>ไม่มีรถจักรยานยนต์</p>'
                                } else {
                                    card2 += '</ul>'
                                    for (var j = 0; j < cusData.length; j++) { 
                                        /*var cusphone = cusData[j].cus_phone
                                        var cusphone2 = cusphone.split('+66');*/

                                        card2 +=    '<li id="user' + cusphone3 + 'bike' + count + '">หมายเลขทะเบียน : ' + cusData[j].bike_licence + 
                                                    '<br>ยี่ห้อ : ' + cusData[j].bike_brand + 
                                                    '<br>รุ่น : ' + cusData[j].bike_model + 
                                                    '<br>สี : ' + cusData[j].bike_color + 
                                                    '<br><a id="' + cusphone3 + 'bike' + count + '" onclick="editDetail(this, \'' + cusData[j].bike_licence + '\', \'' + cusData[j].bike_brand + '\', \'' + cusData[j].bike_model + '\', \'' + cusData[j].bike_color + '\')"><i class="glyphicon glyphicon-pencil"></i> แก้ไขข้อมูลรถจักรยานยนต์ </a>' +
                                                    '</li><br>'
                                        count++
                                    }
                                    card2 += '</ul>'
                                }
                                $('#user' +  cusphone3).append(card2);
                            });
                        }
                        card += '</table>'
                    }
                    $('#cusphoneView').html(card);
                });
            };

            function searchCard(search_val) {
                console.log(search_val)
                $.get("https://toombike.kku.ac.th/search/user?search=" + search_val, function(json){
                    var card = '';
                    var preData = ''
                    var currentData = ''
                    var data = json['Data']
                    if ( data == 'No data Found..') {
                        card += '<p>ไม่มีประวัติการแจ้งซ่อมในขณะนี้</p>';
                    } else {
                        card += '<table class="table table-hover table-striped"><thead><tr>' +
                                '<th>ข้อมูลลูกค้า</th>' +
                                '<th>ข้อมูลรถจักรยานยนต์</th>' +
                                '<th></th></tr></thead>';
                        for (var i = 0; i < data.length; i++) {
                            currentData = data[i].cus_phone
                            if (preData == currentData) {
                                preData = data[i].cus_phone
                                console.log(preData + ':' + currentData)
                            } else {
                                card += '<tr id="tr' + data[i].cus_phone + '">' +
                                '<td><ul><li>เบอร์โทรศัพท์ : ' + data[i].cus_phone + '</li><li>ชื่อลูกค้า : ' + data[i].cus_name + '</li><li>อีเมล : ' + data[i].cus_email + '</li></ul></td>' +
                                '<td id="user' + data[i].cus_phone + '"></td>' +
                                '<td><a class="addDelete" id="' + data[i].cus_phone + '" onClick="addBikeConsole(this); return false;" href="fallback.html"><i class="glyphicon glyphicon-pencil"></i> เพิ่มลดรถจักรยานยนต์ </a></td>' +
                                '</tr>'
                        
                                $.get("https://toombike.kku.ac.th/user/bike?phone=" + encodeURIComponent(data[i].cus_phone) , function(json){
                                    var card2 = ''
                                    var cusData = json['Data']
                                    var userData = json['user']
                                    var cusphone3 = userData[0].cus_phone
                                    var count = 0
                                    //console.log(cusphone3)

                                    if ( cusData == 'No data Found..') {
                                        card2 += '<p>ไม่มีรถจักรยานยนต์</p>'
                                    } else {
                                        card2 += '</ul>'
                                        for (var j = 0; j < cusData.length; j++) { 
                                            /*var cusphone = cusData[j].cus_phone
                                            var cusphone2 = cusphone.split('+66');*/

                                            card2 +=    '<li id="user' + cusphone3 + 'bike' + count + '">หมายเลขทะเบียน : ' + cusData[j].bike_licence + 
                                                        '<br>ยี่ห้อ : ' + cusData[j].bike_brand + 
                                                        '<br>รุ่น : ' + cusData[j].bike_model + 
                                                        '<br>สี : ' + cusData[j].bike_color + 
                                                        '<br><a id="' + cusphone3 + 'bike' + count + '" onclick="editDetail(this, \'' + cusData[j].bike_licence + '\', \'' + cusData[j].bike_brand + '\', \'' + cusData[j].bike_model + '\', \'' + cusData[j].bike_color + '\'); return false;" href="fallback.html"><i class="glyphicon glyphicon-pencil"></i> แก้ไขข้อมูลรถจักรยานยนต์ </a>' +
                                                        '</li><br>'
                                            count++
                                        }
                                        card2 += '</ul>'
                                    }
                                    $('#user' +  cusphone3).append(card2);
                                });
                                preData = data[i].cus_phone
                                console.log(preData + ':' + currentData)
                            }
                            /*var phoneNum = data[i].cus_phone
                            var phone2 = phoneNum.split('+66');
                            var phone3 = phone2[1];*/
                            //console.log(data[i].cus_phone)
    
                           
                        }
                        card += '</table>'
                    }
                    $('#cusphoneView').html(card);
                });
            };

            function editDetail(e, licence, brand, model, color) {
                var aId = $(e).attr('id');
                var liId = 'user' + aId;
                var li = $('#' + liId)

                var liHandle =  'หมายเลขทะเบียน : ' + licence +
                                '<br>ยี่ห้อ : <input type=text class="form-control" id="brand' + aId +'" value="' + brand + '">' +
                                '<br>รุ่น : <input type=text class="form-control" id="model' + aId +'" value="' + model + '">' +
                                '<br>สี : <input type=text class="form-control" id="color' + aId +'" value="' + color + '">' +
                                '<br><from class="cancelB">' +
                                    '<input id="' + aId + '" type="submit" class="btn" value="ยกเลิก" onclick="cancelDetail(this, \'' + licence + '\', \'' + brand + '\', \'' + model + '\', \'' + color + '\')">' +
                                    '<from>' +
                                    '<from class="submitB">' +
                                    '<input id="' + aId + '" type="submit" class="btn btn-success" value="ยืนยันการแก้ไข" onclick="submitDetail(this, \'' + licence + '\')">' +
                                    '<from>'
                $(li).html(liHandle);

                //console.log(li)
                               
            }

            function cancelDetail(e, licence, brand, model, color) {
                var aId = $(e).attr('id');
                var liId = 'user' + aId;
                var li = $('#' + liId)

                var liHandle =  'หมายเลขทะเบียน : ' + licence + 
                                '<br>ยี่ห้อ : ' + brand + 
                                '<br>รุ่น : ' + model + 
                                '<br>สี : ' + color + 
                                '<br><a id="' + aId + '" onclick="editDetail(this, \'' + licence + '\', \'' + brand + '\', \'' + model + '\', \'' + color + '\')"><i class="glyphicon glyphicon-pencil"> แก้ไขข้อมูลรถจักรยานยนต์ </i></a>'
                $(li).html(liHandle);

                //console.log(li)
                               
            }

            function submitDetail(e, licence) {
                var aId = $(e).attr('id');
                var liId = 'user' + aId;
                var li = $('#' + liId)

                //var licence = $('#licence' + aId).val()
                var brand = $('#brand' + aId).val()
                var model = $('#model' + aId).val()
                var color = $('#color' + aId).val()

                data = {
                    "number" : licence,
                    "brand" : brand,
                    "model" : model,
                    "color" : color
                }

                $.ajax({  
                    url: 'https://toombike.kku.ac.th/update/bike',  
                    type: 'PUT',  
                    dataType: 'json',  
                    data: data,  
                    success: function (data, textStatus, xhr) {  
                        alert('ดำเนินการแก้ไขสำเร็จ\n รถจักรยานยน เลขทะเบียน : ' + licence + '\n ยี่ห้อ : '  + brand + '\n รุ่น : '  + model + '\n สี : '  + color );
                        reload_page()
                    },  
                    error: function (xhr, textStatus, errorThrown) {  
                        alert('การแก้ไขล้มเหลว โปรดตรวจสอบว่าลูกค้าเป็นเจ้าของรถจักรยานยนต์หรือไม่');  
                    }  
                });

                console.log(licence + ' ' + brand + ' ' + model + ' ' + color)
                               
            }

            function addBikeConsole(e) {
                var aId = $(e).attr('id');
                var liId = 'user' + aId;
                var li = $('#' + liId)

                $(e).attr('onClick',"cancelBikeConsole(this); return false;");
                $(e).attr('class',"backAddDelete");
                $(e).html('<i class="glyphicon glyphicon-share-alt"></i> ย้อนกลับ');

                $.get("https://toombike.kku.ac.th/user/bike?phone=" + encodeURIComponent(aId) , function(json){
                    var card2 = ''
                    var cusData = json['Data']
                    var userData = json['user']
                    var cusphone3 = userData[0].cus_phone
                    var count = 0
                    //console.log(cusphone3)

                    if ( cusData == 'No data Found..') {
                        card2 +=    '<ul><li>' +
                                    '<br>หมายเลขทะเบียน : <input type=text class="form-control" id="addLicence' + aId + 'bike' + count +'" value="" placeholder="Ex : กข 123 ขอนแก่น">' +
                                    '<br>ยี่ห้อ : <input type=text class="form-control" id="addBrand' + aId + 'bike' + count +'" value="" placeholder="Ex : honda yamaha">' +
                                    '<br>รุ่น : <input type=text class="form-control" id="addModel' + aId + 'bike' + count +'" value="" placeholder="Ex : click scoopy">' +
                                    '<br>สี : <input type=text class="form-control" id="addColor' + aId + 'bike' + count +'" value="" placeholder="Ex : ดำ แดง เหลือง">' +
                                    '<br><a class="add" id="' + cusphone3 + 'bike' + count + '" onclick="addBike(this)"><i class="glyphicon glyphicon-plus"></i> เพิ่มรถจักรยานยนต์</a>' +
                                    '</li></ul>'
                    } else {
                        card2 += '</ul>'
                        for (var j = 0; j < cusData.length; j++) { 

                            card2 +=    '<li id="user' + cusphone3 + 'bike' + count + '">หมายเลขทะเบียน : ' + cusData[j].bike_licence + 
                                        '<br>ยี่ห้อ : ' + cusData[j].bike_brand + 
                                        '<br>รุ่น : ' + cusData[j].bike_model + 
                                        '<br>สี : ' + cusData[j].bike_color + 
                                        '<br><a class="delete" id="' + cusphone3 + 'bike' + count + '" onclick="deleteBike(this)"><i class="glyphicon glyphicon-minus"></i> ลบรถจักรยานยนต์</a>' +
                                        '</li><br>'
                            count++
                        }
                        card2 +=    '<li>' +
                                    '<br>หมายเลขทะเบียน : <input type=text class="form-control" id="addLicence' + aId + 'bike' + count +'" value="" placeholder="Ex : กข 123 ขอนแก่น">' +
                                    '<br>ยี่ห้อ : <input type=text class="form-control" id="addBrand' + aId + 'bike' + count +'" value="" placeholder="Ex : honda yamaha">' +
                                    '<br>รุ่น : <input type=text class="form-control" id="addModel' + aId + 'bike' + count +'" value="" placeholder="Ex : click scoopy">' +
                                    '<br>สี : <input type=text class="form-control" id="addColor' + aId + 'bike' + count +'" value="" placeholder="Ex : ดำ แดง เหลือง">' +
                                    '<br><a class="add" id="' + cusphone3 + 'bike' + count + '" onclick="addBike(this)"><i class="glyphicon glyphicon-plus"></i> เพิ่มรถจักรยานยนต์</a>' +
                                    '</li></ul>'
                    }
                    $('#user' +  cusphone3).html(card2);
                });

                console.log(li)
            }

            function cancelBikeConsole(e) {
                var aId = $(e).attr('id');
                var liId = 'user' + aId;
                var li = $('#' + liId)

                $(e).attr('onClick',"addBikeConsole(this); return false;");
                $(e).attr('class',"addDelete");
                $(e).html('<i class="glyphicon glyphicon-pencil"></i> เพิ่มลดรถจักรยานยนต์');

                $.get("https://toombike.kku.ac.th/user/bike?phone=" + encodeURIComponent(aId) , function(json){
                    var card2 = ''
                    var cusData = json['Data']
                    var userData = json['user']
                    var cusphone3 = userData[0].cus_phone
                    var count = 0
                    //console.log(cusphone3)

                    if ( cusData == 'No data Found..') {
                        card2 += '<p>ไม่มีรถจักรยานยนต์</p>'
                    } else {
                        card2 += '</ul>'
                        for (var j = 0; j < cusData.length; j++) { 
                        
                        card2 +=    '<li id="user' + cusphone3 + 'bike' + count + '">หมายเลขทะเบียน : ' + cusData[j].bike_licence + 
                                    '<br>ยี่ห้อ : ' + cusData[j].bike_brand + 
                                    '<br>รุ่น : ' + cusData[j].bike_model + 
                                    '<br>สี : ' + cusData[j].bike_color + 
                                    '<br><a id="' + cusphone3 + 'bike' + count + '" onclick="editDetail(this, \'' + cusData[j].bike_licence + '\', \'' + cusData[j].bike_brand + '\', \'' + cusData[j].bike_model + '\', \'' + cusData[j].bike_color + '\')"><i class="glyphicon glyphicon-pencil"></i> แก้ไขข้อมูลรถจักรยานยนต์ </a>' +
                                    '</li><br>'
                        count++
                    }
                        card2 += '</ul>'
                    }
                    $('#user' +  cusphone3).html(card2);
                });
            }

            function deleteBike(e) {
                var aId = $(e).attr('id');
                var liId = 'user' + aId;
                var li = $('#' + liId)
                var text = li.text()

                var splitphone = aId.split('bike');
                var phone = splitphone[0]

                var splitlicence = text.split('หมายเลขทะเบียน : ');
                var splitlicence2 = splitlicence[1].split('ยี่ห้อ : ');
                var licence = splitlicence2[0]

                data = {
                    "phone" : phone,
                    "number" : licence
                }

                $.ajax({  
                    url: 'https://toombike.kku.ac.th/delete/bike',  
                    type: 'DELETE',  
                    dataType: 'json',  
                    data: data,  
                    success: function (data, textStatus, xhr) {  
                        alert('ดำเนินการแก้ไขสำเร็จ\n ลบรถจักรยานยน หมายเลขทะเบียน : ' + licence + '\n เจ้าของเบอร์โทรศัพท์ : ' + phone );
                        reload_page()
                    },  
                    error: function (xhr, textStatus, errorThrown) {  
                        alert('การแก้ไขล้มเหลว โปรดตรวจสอบว่าลูกค้าเป็นเจ้าของรถจักรยานยนต์หรือไม่');  
                    }  
                });
            }

            function addBike(e) {
                var aId = $(e).attr('id');
                var liId = 'user' + aId;
                var li = $('#' + liId)

                var splitphone = aId.split('bike');
                var phone = splitphone[0]

                var licence = $('#addLicence' + aId).val()
                var brand = $('#addBrand' + aId).val()
                var model = $('#addModel' + aId).val()
                var color = $('#addColor' + aId).val()

                data = {
                    "phone" : phone,
                    "number" : licence,
                    "brand" : brand,
                    "model" : model,
                    "color" : color
                }

                $.ajax({  
                    url: 'https://toombike.kku.ac.th/insert/bike',  
                    type: 'POST',  
                    dataType: 'json',  
                    data: data,  
                    success: function (data, textStatus, xhr) {  
                        alert('ดำเนินการแก้ไขสำเร็จ\n เพิ่มรถจักรยานยน หมายเลขทะเบียน : ' + licence + '\n เจ้าของเบอร์โทรศัพท์ : ' + phone );
                        reload_page()
                    },  
                    error: function (xhr, textStatus, errorThrown) {  
                        alert('การแก้ไขล้มเหลว โปรดตรวจสอบว่าลูกค้าเป็นเจ้าของรถจักรยานยนต์หรือไม่');  
                    }  
                });

                console.log(phone + ' ' + licence + ' ' + brand + ' ' + model + ' ' + color )
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