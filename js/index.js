define(['chat','wildDog'], function(chat) {
    var  index = {};
    index.content = $(".index_rightChatRoom_home");
    index.init = function () {
        var nowDate = new Date();
        index.content.append('<div class="divide_main"><div></div> <span>'+nowDate.toLocaleString()+'</span> <div></div> </div>');
    };
    index.getLast = function (roomName) {
        if(roomName){
            var ref = new Wilddog("http://xb_chatroom.wilddogio.com/chat/"+roomName);
            ref.on("value", function (data) {
                var user = ref.root().child("user/"+data.personID);
                var box = new chat({
                    personUrl:data.personID,
                    personName:user.personName,
                    personImg:user.personImg,
                    chatTime:data.chatTime,
                    chatContent:data.chatContent
                });
                box.render({
                    container:  index.content
                })
            })
        }
    };
    return index;
});