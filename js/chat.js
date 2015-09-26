/**
 * Created by benbentime on 2015/9/23.
 */
define(['FFF', 'zepto', 'fastclick'], function(FFF, $, fc) {
    fc.attach(document.body);
    var F = FFF.FFF;
    var Widget = F.Widget;
    function chatBody (){
        Widget.apply(this,arguments);
    }

    chatBody.ATTRS = {
        boundingBox:{
            value:$('<div class="media chat_main"><div class="chat_content"></div></div>')
        },
        personUrl:{
            value:''
        },
        personImg:{
            value:''
        },
        personName:{
            value:''
        },
        chatTime:{
            value:''
        },
        chatContent:{
            value:''
        },
        chatID:{
            value:''
        }
    };

    F.extend(chatBody, Widget, {
        initialize: function(data){
            var that = this;
            that.setPersonUrl(data.personUrl);
            that.setPersonImg(data.personImg);
            that.setPersonName(data.personName);
            that.setChatTime(data.chatTime);
            that.setChatContent(data.chatContent);
            that.setChatID(data.chatID);
        },
        renderUI: function(){
            var that =this;
            var box = that.getBoundingBox().find(".chat_content");

            box.append('<div class="media-left"><a href="'+that.getPersonUrl()+'"> ' +
                '<img class="media-object chat_img" src="'+that.getPersonImg()+'" alt="'+that.getPersonName()+'"></a> </div>');
            box.append('<div class="media-body">' +
                '<h5 class="media-heading chat_name">'+that.getPersonName()+' <small>'+that.getChatTime()+'</small><a href="#" class="chat_del">删除</a></h5>'+that.getChatContent()+'</div>')
        },
        bindUI: function(){
            var that = this;
            var box = that.getBoundingBox();
            box.find('.chat_del').on('click', function () {
                var chatRoom = sessionStorage.getItem('ChatRoom');
                var chatID = that.getChatID();
                if(chatRoom && chatID){
                    var ref = new Wilddog("http://xb_chatroom.wilddogio.com/chat/"+chatRoom+"/"+ chatID);
                    ref.remove();
                }
            })
        }


    });

    return chatBody;
});