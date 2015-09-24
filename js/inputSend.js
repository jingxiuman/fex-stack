/**
 * Created by benbentime on 2015/9/24.
 */
defind(['FFF', 'zepto', 'fastclick','wildDog'], function (FFF, $, fc) {
    fc.attach(document.body);
    var F = FFF.FFF;
    //var Widght = F.Widget;

    function input(){
        //Widght.apply(this, arguments);
    }

    input.ATTRS={
        content:{
            value:''
        }
    };

    F.extend(input, base, {
        render: function () {
            $("")
        }
    });


    return input;
});