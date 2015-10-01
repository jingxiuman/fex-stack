define(['chat','zepto','jquery','leftNav','header','bootstrap'], function(chat,zepto,$,leftNav,headerBox) {
    var  index = {};
    index.content = zepto(".index_rightChatRoom_home");
    index.init = function () {
        index.isLogin();
    };
    index.initIndex = function () {
        var nowDate = new Date();
        index.content.append('<div class="divide_main"><div></div> <span>'+nowDate.toLocaleString()+'</span> <div></div> </div>');
        index.initHeader();
        index.input();
        index.leftNav();
        index.getLast();
       // $.trigger("reload");
        zepto(document.body).on("reload", function () {
            index.getLast();
            index.input();
            index.initHeader();
            console.log("yes")
        })
    };
    index.leftNav = function () {
        //初始化聊天的房间
        var chatroom = localStorage.getItem("chatroom") || 'default';
        localStorage.setItem("chatroom", chatroom);
        var leftNavBox = new leftNav();
        leftNavBox.render({
            container:zepto("#index_leftNav")
        })
    };
    index.getLast = function () {
        var roomName = localStorage.getItem('Chatroom') || "default";

            var ref = new Wilddog("http://xb_chatroom.wilddogio.com/chat/"+roomName);
            ref.on("child_added", function (data) {
                var data_main = data.val(),
                    data_time = new Date(data_main.chatTime);
                var user = new Wilddog("http://xb_chatroom.wilddogio.com/user/"+data_main.personId);
                    user.on('value', function (user_data) {
                        user_data =user_data.val();
                        var selfId = localStorage.getItem("userID"),flag = 0;
                        if(selfId == data_main.personId ){
                            flag = 1;
                        }
                        var box = new chat({
                            //personUrl:data.personID,
                            personUrl: '',
                            personName:user_data.personName || '',
                            personImg:user_data.personImg ||'',
                            chatTime:data_time.toLocaleString(),
                            chatContent:data.val().chatContent,
                            isSelf:flag
                        });

                        box.render({
                            container:  index.content
                        })
                    });
            })

    };
    index.input = function () {
        $(".btn_send").on("click", function () {
            var content = $("#content_input").val().trim();
            var nowTime = new Date();
             var chatRoom = localStorage.getItem('ChatRoom') || "default";
            //var chatRoom = 'default';
            console.log(chatRoom);
            if(chatRoom ){
                console.log(content+"---"+ chatRoom);
                var qw = new Wilddog("http://xb_chatroom.wilddogio.com/chat/"+chatRoom);
                var personId = localStorage.getItem('userID') || '';
                qw.push({
                    chatTime: nowTime.getTime(),
                    chatContent: content,
                    personId: personId
                })
            }

        });
    };
    index.isLogin = function () {
       var token = localStorage.getItem('token') || '',
           userName = localStorage.getItem('username') || '';
        $.post('../server/api.php',{token:token,username:userName}, function (data) {
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
    index.initHeader = function () {
        var header_main = new headerBox.header();
        header_main.render({
            container:zepto("#index_header")
        });
       // var header_add = new headerBox.add();
        //header_add.render({
        //    container:zepto(".index_rightNotice")
        //})
    };
    return index;
});