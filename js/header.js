/**
 * Created by zhoub on 2015/9/30.
 */
define(['FFF','zepto'], function (FFF, $) {
    var F = FFF.FFF,
        Widget = F.Widget;

    function header (){
        Widget.apply(this, arguments);
    }

    header.ATTRS = {
        boundingBox :{
            value: $('<div class="btn-group index_header"></div>')
        },
        chatRoom:{
            value:''
        },
        currentRoom:{
            value:''
        }
    };

    F.extend(header, Widget,{
        initialize: function (){
            var that = this;
            var roomName = [];
            var room = localStorage.getItem("chatroom") || '';
            that.setCurrentRoom(room);
            var ref = new Wilddog("http://xb_chatroom.wilddogio.com/chat");
            ref.on('child_added', function (data) {
                roomName.push(data.key());
                //console.log(data.key())
                console.log(roomName)
            });
            that.setChatRoom(roomName);
            setTimeout(function () {
                console.log(that.getChatRoom())
            },1000)


        },
        renderUI: function () {
            var that = this;
            setTimeout(function () {
                var box = that.getBoundingBox();
                var RoomBox = that.getChatRoom();
                //选择聊天室
                var currentBox = '<button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' +
                    that.getCurrentRoom()+' <span class="caret"></span></button>';
                box.append(currentBox);
                var roomList = ' <ul class="dropdown-menu">';
                RoomBox.forEach(function (value, i) {
                    roomList += '<li><a href="#" class="roomChange" data-num="'+i+'">'+value+'</a></li>';
                });
                roomList+='</ul>';
                box.append(roomList);
                //添加聊天室
                var addChat = '';
                box.append(addChat)
            },1000)

        },
        bindUI: function () {
            var that =this;
            setTimeout(function () {
                $(".roomChange").on("click", function () {
                    var type = $(this).attr("data-num");
                    console.log(type);
                    localStorage.setItem("chatroom",that.getChatRoom()[type]);
                    $(".index_rightChatRoom_home").html('');
                    $(document.body).trigger("reload");
                    return false;
                })
            },1000)

        }
    });

    function addChat(){
        Widget.apply(this, arguments);
    }

    addChat.ATTRS = {
        boundingBox:{
            value:$('<div class="form-group"> <div class="input-group">' +
                '<input type="text" class="form-control" id="addChatRoom" placeholder="输入一个名称"></div> </div> ' +
                '<button type="button" class="btn btn-primary" id="addChatRoom_btn">提交</button>')
        }
    };

    F.extend(addChat, Widget,{
        initialize: function(){

        },
        bindUI: function () {
            var that =  this;
            var box = that.getBoundingBox();
            box.find("#addChatRoom_btn").on("click", function () {
                var value = $("#addChatRoom").val();
                console.log(value)
                localStorage.setItem("chatroom", value);

            })
        }
    });
    return {
        header:header,
        add:addChat
    };
});