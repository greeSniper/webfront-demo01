var mp3 = "mp3/a.mp3";
var peekFlag = true;
var markFlag = true;

var data = [];
var delArr = [];

$.ajax({
    url: "data/wushiyin.json",
    type: "GET",
    dataType: "json",
    success: function(res) {
        data = res.data;
        data.splice(0, 1);
    }
});

$('#peek').click(function () {
    if (peekFlag) {
        peekFlag = false;
        $('.word-pre').css('opacity', '1');
        $('.roma').css('opacity', '1');
        $('#peek').text('隐藏');
        $('.mark1').css('opacity', '1');
        $('.mark2').css('opacity', '1');
        $('.mark3').css('opacity', '1');
    } else {
        peekFlag = true;
        $('.word-pre').css('opacity', '0');
        $('.roma').css('opacity', '0');
        $('#peek').text('偷看');
        $('.mark1').css('opacity', '0');
        $('.mark2').css('opacity', '0');
        $('.mark3').css('opacity', '0');
    }

    if (markFlag) {
        $('.mark1').html('片假名');
        $('.mark2').html('平假名');
    } else {
        $('.mark1').html('平假名');
        $('.mark2').html('片假名');
    }
});

$('#next').click(function () {
    var index = Math.floor(Math.random()*data.length);
    var flag = Math.floor(Math.random()*2);
    var obj = data[index];
    // 删除这一轮已经学习过的五十音
    data.splice(index, 1);
    if (data.length === 0) {
        $.ajax({
            url: "data/wushiyin.json",
            type: "GET",
            dataType: "json",
            success: function(res) {
                data = res.data;
                // 删除太简单的五十音
                delArr.forEach(function (item, index) {
                    for (var i=0; i<data.length; i++) {
                        var obj = data[i];
                        if (obj.roma === item) {
                            data.splice(i, 1);
                            if (data.length === 0) {
                                alert('都学完了哦，请确认重新开始学习！');
                                delArr = [];
                                $.ajax({
                                    url: "data/wushiyin.json",
                                    type: "GET",
                                    dataType: "json",
                                    success: function(res) {
                                        data = res.data;
                                    }
                                });
                            }
                            break;
                        }
                    }
                });
            }
        });
    }
    if (flag === 0) {
        $('.word').html(obj.kana);
        $('.word-pre').html(obj.katakana);
        markFlag = true;
    } else {
        $('.word').html(obj.katakana);
        $('.word-pre').html(obj.kana);
        markFlag = false;
    }
    $('.roma').html(obj.roma);
    mp3 = obj.mp3;
    $('.word-pre').css('opacity', '0');
    $('.roma').css('opacity', '0');
    peekFlag = true;
    $('#peek').text('偷看');

    if (markFlag) {
        $('.mark1').html('片假名');
        $('.mark2').html('平假名');
    } else {
        $('.mark1').html('平假名');
        $('.mark2').html('片假名');
    }
    $('.mark1').css('opacity', '0');
    $('.mark2').css('opacity', '0');
    $('.mark3').css('opacity', '0');
});

$('#read').click(function () {
    var audio = new Audio(mp3);
    audio.play();
});

$('.easy').click(function () {
    var onOff = confirm("点击确定下一轮就不会出现了哦？");
    if (onOff) {
        var roma = $('.roma').html();
        var flag = true;
        delArr.forEach(function (item, index) {
            if (roma === item) {
                flag = false;
            }
        });
        if (flag) {
            delArr.push(roma);
        }
    }
});
