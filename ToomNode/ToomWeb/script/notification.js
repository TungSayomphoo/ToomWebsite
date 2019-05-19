function searchHisNum(sHisnum, notiId) {

    firebase.database().ref('notification/' + notiId).update({
        read: "readed"
    });

    //addReadNoti(notiId)

    notification()
    
    $.get("https://www.toombike.com/selecthis?his_num=" + sHisnum , function(json){
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
                var price = data[i].price

                if (price == 0) {
                    price = 'ยังไม่กำหนดราคา'
                }

                card += '<tr id="tr' + data[i].his_num + '">' +
                        '<td><ul><li>วันที่ : ' + dateSplit2[2] + ' ' + getMonth(dateSplit2[1]) + ' พ.ศ. ' + getBE(dateSplit2[0]) + '</li><li>เวลา : ' + data[i].his_time + '</li></ul></td>' +
                        '<td><ul><li>เบอร์โทรศัพท์ : ' + data[i].cus_phone + '</li><li>ชื่อลูกค้า : ' + data[i].cus_name + '</li><li>อีเมล : ' + data[i].cus_email + '</li></ul></td>' +
                        '<td><ul><li>เลขทะเบียนรถ : ' + data[i].bike_licence + '</li><li>ยี่ห้อ : ' + data[i].bike_brand + '</li><li>รุ่น : ' + data[i].bike_model + '</li><li>สี : ' + data[i].bike_color + '</li></ul></td>' +
                        '<td><ul><li>สถานะ : ' + data[i].status + '</li><li>รายละเอียด : ' + data[i].detail + '</li><li>ราคา : ' + price + '</li><li>สถานที่ : <a id="lat' + data[i].lat + 'lng' + data[i].lng + '" href="pubnubGeo.html?lat=' + data[i].lat + '&lng=' + data[i].lng + '"><i class="glyphicon glyphicon-map-marker"></i> แสดงบนแผนที่' + ' </a></li></ul></td>' +
                        '<td><a id="td' + data[i].his_num + '" onClick="editDetail(this, \'' + data[i].status + '\', \'' + data[i].detail + '\', \'' + data[i].price + '\'); return false;" href="fallback.html"><i class="glyphicon glyphicon-pencil"></i> แก้ไขการแจ้งซ่อม </a><hr><hr></td>' +
                        '</tr>'

                phone += '<td class="reqTd">' + 
                        '<tr> <th>วันเวลา</th>            <td><ul><li>วันที่ : ' + dateSplit2[2] + ' ' + getMonth(dateSplit2[1]) + ' พ.ศ. ' + getBE(dateSplit2[0]) + '</li><li>เวลา : ' + data[i].his_time + '</li></ul></td></tr>' +
                        '<tr> <th>ข้อมูลลูกค้า</th>         <td><ul><li>เบอร์โทรศัพท์ : ' + data[i].cus_phone + '</li><li>ชื่อลูกค้า : ' + data[i].cus_name + '</li><li>อีเมล : ' + data[i].cus_email + '</li></ul></td></tr>' +
                        '<tr> <th>ข้อมูลรถจักรยานยนต์</th>  <td><ul><li>เลขทะเบียนรถ : ' + data[i].bike_licence + '</li><li>ยี่ห้อ : ' + data[i].bike_brand + '</li><li>รุ่น : ' + data[i].bike_model + '</li><li>สี : ' + data[i].bike_color + '</li></ul></td></tr>' +
                        '<tr id="reqTr' + data[i].his_num + '" > <th>ข้อมูลการแจ้งซ่อม</th>    <td><ul><li>สถานะ : ' + data[i].status + '</li><li>รายละเอียด : ' + data[i].detail + '</li><li>ราคา : ' + price + '</li><li>สถานที่ : <a id="lat' + data[i].lat + 'lng' + data[i].lng + '" href="pubnubGeo.html?lat=' + data[i].lat + '&lng=' + data[i].lng + '"><i class="glyphicon glyphicon-map-marker"></i> แสดงบนแผนที่' + ' </a></li></ul></td></tr>' +
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

function notification() {
    $.get("https://www.toombike.com/allhis", function(json){
        var data = json['Data']
        var his_numAr = []

        if ( data == 'No data Found..') {

        } else {
            for (var i = 0; i < data.length; i++) {
                his_numAr[i] = data[i].his_num
            }
        }
        //console.log(his_numAr)
        var databaseRef = firebase.database().ref('notification/');
        var text, his_num, detail, sign, addr, lat, lng, read, notiId, userRead = ''
        var notiLi = ''

        databaseRef.once('value',function(snapshot) {
            var noticount = 0
            snapshot.forEach(function(childSnapshot) {
                var childKey = childSnapshot.key;
                var childData = childSnapshot.val();

                notiId = childKey
                his_num = childData.hisNum
                detail = childData.textNoti
                sign = childData.sign
                /*lat = childData.location.lat
                lng = childData.location.lng*/
                read = childData.read
                text += childKey + ' : ' + detail + ' : ' + his_num + '\n'

                for (var j = 0; j < his_numAr.length; j++) {
                    if(his_numAr[j] == his_num) {
                        if (read == 'false') {
                            noticount++
                            notiLi += '<li class="list-group-item"><a onClick="searchHisNum(' + his_num + ',\'' + notiId + '\'); return false;" href="fallback.html"> รายละเอียด : ' + detail + ' <span class="label label-danger">ใหม่</span></a></li>'
                        } else if (read == 'readed') {
                            notiLi += '<li class="list-group-item"><a onClick="searchHisNum(' + his_num + ',\'' + notiId + '\'); return false;" href="fallback.html"> รายละเอียด : ' + detail + ' <span class="label label-default">ดูแล้ว</span></a></li>'
                        }
                    }
                }
        
                /*$.get("https://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + "," + lng + "&key=" + googleAPIKey, function(json){
                    var results = json['results']
                    addr = results[0].formatted_address
                    notiLi += '<li><a onClick="searchHisNum(' + his_num + '); return false;" href="fallback.html">à¸«à¸¡à¸²à¸¢à¹€à¸¥à¸‚à¸—à¸°à¹€à¸šà¸µà¸¢à¸™ : ' + sign + ' à¸£à¸²à¸¢à¸¥à¸°à¹€à¸­à¸µà¸¢à¸” : ' + detail + ' à¸ªà¸–à¸²à¸™à¸—à¸µà¹ˆ : ' + addr + '</a></li>'
                });*/
            })
            //console.log(text + '\n' + noticount)
            if (noticount == 0) {
                notiLi += '<li class="list-group-item disabled"><a href="#">ไม่มีการแจ้งเตือนใหม่</a></li>'
                //notiLi += '<li class="list-group-item disabled"><a onClick="clearNoti2(); return false;" href="fallback.html">à¹„à¸¡à¹ˆà¸¡à¸µà¸à¸²à¸£à¹à¸ˆà¹‰à¸‡à¹€à¸•à¸·à¸­à¸™à¹ƒà¸«à¸¡à¹ˆ</a></li>'
            } else {
                notiLi += '<li class="list-group-item list-group-item-danger"><a onClick="clearNoti(); return false;" href="fallback.html">ลบการแจ้งเตือนที่อ่านแล้วทั้งหมด <span class="glyphicon glyphicon-trash"></span></a></li>'
            }

            $('#notiBadge').text('การแจ้งเตือนใหม่ ' + noticount)
            $('#notiMenu').html(notiLi)
            $('#notiBadge2').text('การแจ้งเตือนใหม่ ' + noticount)
            $('#notiMenu2').html(notiLi)
        })
    });    
}


function clearNoti() {
    var databaseRef = firebase.database().ref('notification/');
    var userReadRef = firebase.database().ref('currentlocation/' + userLogin + '/readedNoti');
    var userDeleteRef = firebase.database().ref('currentlocation/' + userLogin + '/readedNoti');
    var read, notiId = ''
    var notiLi = ''

    /*userReadRef.once('value',function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            var readKey = childSnapshot.key;
            var readData = childSnapshot.val();

            console.log(readData)

            userDeleteRef.once('value',function(snapshot) {
                snapshot.forEach(function(childSnapshot) {
                    var deleteKey = childSnapshot.key;
                    var deleteData = childSnapshot.val();

                    console.log(deleteKey)
                })
            })

            notiId = childKey
            read = childData.read
            if (read == 'readed') {
                firebase.database().ref('notification/' + notiId).update({
                    read: "deleted"
                });
            }
        })
    })*/
    databaseRef.once('value',function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            var childKey = childSnapshot.key;
            var childData = childSnapshot.val();

            notiId = childKey
            read = childData.read
            if (read == 'readed') {
                firebase.database().ref('notification/' + notiId).update({
                    read: "deleted"
                });
            }
        })
    })
    notiLi += '<li class="list-group-item disabled"><a href="#">กำลังทำการลบการแจ้งเตือน... </a></li>'
    $('#notiMenu').html(notiLi)
    $('#notiMenu2').html(notiLi)
    window.setTimeout(notification, 3000)
}

function clearNoti2() {
    var databaseRef = firebase.database().ref('notification/');
    var userReadRef = firebase.database().ref('currentlocation/' + userLogin + '/readedNoti');
    var userDeleteRef = firebase.database().ref('currentlocation/' + userLogin + '/readedNoti');
    var read, notiId = ''
    var notiLi = ''

    databaseRef.once('value',function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            var childKey = childSnapshot.key;
            var childData = childSnapshot.val();

            notiId = childKey
            read = childData.read
            if (read == 'deleted') {
                firebase.database().ref('notification/' + notiId).update({
                    read: "readed"
                });
            }
        })
    })
    notiLi += '<li class="list-group-item disabled"><a href="#">กำลังทำการเพิ่มการแจ้งเตือน... </a></li>'
    $('#notiMenu').html(notiLi)
    $('#notiMenu2').html(notiLi)
    window.setTimeout(notification, 3000)
}

function addReadNoti(notiId) {
    firebase.database().ref('notification/' + notiId + '/user/' + userLogin).set({
        username: userLogin,
        status: 'read',
    });
}