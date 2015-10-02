/**
 * Created by zhoub on 2015/9/26.
 */
define(['jquery', 'bootstrap'], function ($) {
   var login = {};
    login.userID='';
    login.init = function () {
        $("#login_login_btn").on("click", function () {
            var personName = $("#login_username").val().trim(),
                personPass = md5($("#login_password").val().trim()),
                personImg = "img/index.jpg";
            if(personName && personPass) {
                var ref = new Wilddog("http://xb_chatroom.wilddogio.com/user");
                ref.on("value", function (data) {
                    var data_main = data.val(),value,flag =0 ;
                    if(data_main != null) {
                        for ( value in data_main) {
                            console.log(data_main[value]);
                            if (data_main[value].personName == personName && data_main[value].personPass == personPass) {
                                flag = 1;
                                login.login(personName,value);
                                break;
                            } else if(data_main[value].personName == personName && data_main[value].personPass != personPass){
                                flag = 2;

                            }
                        }
                        if(flag == 2){
                            var msg_main = $("#login_msg");
                            msg_main.find(".login_msg_main").html("账号或者密码错误");
                            msg_main.show();
                        }else if(flag == 0){
                            login.register(personName, personPass, personImg)
                        }
                    }else{

                        login.register(personName, personPass, personImg)
                    }

                });

            }else{
                var msg_main = $("#login_msg");
                msg_main.find(".login_msg_main").html("按照要求输入账号和密码");
                msg_main.show();

            }
        });
       /* $("#login_register_btn").on("click", function () {
            $(".login_login").addClass("animation");
            $(".login_register").fadeIn();
        })*/
    };
    login.login = function (personName,userID){
        console.log(personName);
        $.post("server/login.php",{type:'token',username: personName},function (data) {
            localStorage.setItem('token', data);
            localStorage.setItem('username',personName);
            localStorage.setItem('userID', userID);
            window.location.href='index.html'
        }, 'json');
        var ref = new Wilddog("http://xb_chatroom.wilddogio.com/user/"+userID);
        ref.update({
            personStatus:'1'
        })
    };
    login.register = function (personName, personPass, personImg) {
        var ref = new Wilddog("http://xb_chatroom.wilddogio.com/user");
        ref.push({
            personName:personName,
            personPass:personPass,
            personImg:personImg,
            personStatus:'0'
        });
        login.userID = ref.key();
    };
    return login;
});