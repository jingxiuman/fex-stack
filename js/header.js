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
        chatRoomName:{
            value:[]
        }
    };

    F.extend(header, Widget,{
        initialize: function (){

        },
        renderUI: function () {

        }
    })
});