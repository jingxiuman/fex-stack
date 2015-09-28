/**
 * Created by zhoub on 2015/9/28.
 */
define(['FFF'], function (FFF) {
    var F = FFF.FFF,
        Widght = F.Widget;

    function left(){
        Widght.apply(this,arguments)
    }

    left.ATTRS = {
        boundingBox:{
            value:'<div class="index_leftNav"></div>'
        },
        chatAdmin:{
            value:''
        },
        chatRoomName:{
            value:''
        },
        onlineNum:{
            value:'0'
        }
    };
    
    F.extend(left, Widght,{
        initialize: function () {
            var admin = localStorage.getItem("username"),that = this;
            var roomName = localStorage.getItem("chatroom");
            that.setChatAdmin(admin);
            that.setChatRoomName(roomName);
            console.log("leftNAV")

        },
        renderUI: function () {
            var that = this;
            var box_main = that.getBoundingBox();
            box_main.append(' <div class="index_roomName"><div>'+that.getChatRoomName()+'<span class="caret"></span></div> ' +
                '<div class="index_roomInfo"> <img src="img/index.jpg" class=" img-circle" alt="span"/>'+that.getChatAdmin()+
                '<span class="onlineStatus online  pull-right"></span> </div> </div>');
            var indexRoomPerson = '<div class="index_roomPerson"><div>Online person<span class="glyphicon glyphicon-user person_num pull-right ">'+that.getOnlineNum()+'</span></div>';
            var ref_online = new Wilddog("http://xb_chatroom.wilddogio.com/user");
            ref_online.on('value', function (data) {
                var data_main = data.val(),value;
                for(value in data_main){
                    if(data_main[value].personStatus == 1){
                        that.setOnlineNum(+that.getOnlineNum() +1);
                        indexRoomPerson +='<div class="index_roomInfo"><img src="'+data_main[value].personImg+'" class=" img-circle" alt="span"/>' +
                            data_main[value].personName+'<span class="onlineStatus online  pull-right"></span> </div>'
                    }
                }
            });
            indexRoomPerson +='</div>';
            box_main.append(indexRoomPerson);

        }
    });


    return left;
});