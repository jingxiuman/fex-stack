define(['chat'], function(chat) {
    var  index = {};
    index.content = $(".index_rightChatRoom_home");
    index.init = function () {
        var nowDate = new Date();

      index.content.append('<div class="divide_main"><div></div> <span>'+nowDate.toLocaleString()+'</span> <div></div> </div>');
    };
    return index;
});