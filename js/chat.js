/**
 * Created by benbentime on 2015/9/23.
 */
require(['FFF', 'zepto', 'fastclick'], function(FFF, $, fc) {
    fc.attach(document.body);
    var F = FFF.FFF;
    var Widght = F.Widget;
    function chatBody (){
        widget.apply(this,arguments);
    }

    chatBody.ATTRS = {
        boundingBox:{
            value:$(' <div class="media chat_main"> </div>')
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

    F.extend(chatBody, Widght, {
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
            var box = that.getBoundingBox();
            box.append('<div class="media-left"><a href="'+that.getPersonUrl()+'"> ' +
                '<img class="media-object chat_img" src="'+that.getPersonImg+'" alt="'+that.getPersonName()+'"></a> </div>');
            box.append('<div class="media-body">' +
                '<h3 class="media-heading">'+that.getPersonName()+' <small>'+that.getChatTime()+'</small><a href="#" class="chat_del">删除</a></h3>'+that.getChatContent()+'</div>')
        },
        bindUI: function(){
            var that = this;
            var box = that.getBoundingBox();
            box.find('.chat_del').on('click', function () {
                
            })
        }


    });

    return chatBody;
});