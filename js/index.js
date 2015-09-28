define(['chat','zepto','jquery', 'bootstrap','leftNav'], function(chat,zepto,$,leftNavBox) {
    var  index = {};
    index.content = zepto(".index_rightChatRoom_home");
    index.init = function () {
        index.isLogin();
    };
    index.initIndex = function () {
        var nowDate = new Date();
        index.content.append('<div class="divide_main"><div></div> <span>'+nowDate.toLocaleString()+'</span> <div></div> </div>');
        index.input();
        index.leftNav();
        index.getLast();
    };
    index.leftNav = function () {
        //初始化聊天的房间
        var chatroom = localStorage.getItem("chatroom") || 'default';
        localStorage.setItem("chatroom", chatroom);
        var leftNavBox = new leftNavBox();
        leftNavBox.render({
            container:zepto("#index_leftNav")
        })
    };
    index.getLast = function () {
        var roomName = sessionStorage.getItem('ChatRoom') || "default";
        if(roomName){
            var ref = new Wilddog("http://xb_chatroom.wilddogio.com/chat/"+roomName);
            ref.on("child_added", function (data) {
                //var user = ref.root().child("user/"+data.personID);
                var user={personName:'admin',personImg:'img/index.jpg'};
                //console.log(data.val());
                var data_main = data.val(),
                    data_time = new Date(data_main.chatTime);
                var box = new chat({
                    //personUrl:data.personID,
                    personUrl: '',
                    personName:user.personName,
                    personImg:user.personImg,
                    chatTime:data_time.toLocaleString(),
                    chatContent:data.val().chatContent
                });

                box.render({
                    container:  index.content
                })
            })
        }
    };
    index.input = function () {
        $(".btn_send").on("click", function () {
            var content = $("#content_input").val().trim();
            var nowTime = new Date();
             var chatRoom = sessionStorage.getItem('ChatRoom') || "default";
            //var chatRoom = 'default';
            console.log(chatRoom);
            if(chatRoom ){
                console.log(content+"---"+ chatRoom);
                var qw = new Wilddog("http://xb_chatroom.wilddogio.com/chat/"+chatRoom);

                qw.push({
                    chatTime: nowTime.getTime(),
                    chatContent: content,
                    personId: '12'
                })
            }

        });
    };
    index.isLogin = function () {
       var token = localStorage.getItem('token') || '',
           userName = localStorage.getItem('username') || '';
        $.post('server/api.php',{token:token,username:userName}, function (data) {
            //console.log(data.code);
            if(data.code == 200){
                index.initIndex();
            }else if(data.code == 100){
                console.log(1);
                index.loginError()
            }else if(data.code == 300){
                console.log(2);
                index.loginError()
            }
        },'json')


    };
    index.loginError = function () {
        var msg_main = $("#loginTimeOut");
        msg_main.find("#msg_title").html("重新登陆");
        msg_main.find(".msg_main").html("可能没有登陆或者登陆失效了，重新登录");
        msg_main.modal({
            'show':true,
            'keyboard':false,
            'backdrop':'static'
        });
        msg_main.find("#msg_btn").on("click", function () {
            window.location="login.html"
        })
    };
    return index;
});