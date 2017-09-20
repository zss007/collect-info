/**
 * Created by Administrator on 2017/9/20.
 */
// 空函数
var empty = function () {
};

// 显示提示信息
var showMessage = function (msg, type) {
    var dom;
    if (type === 'success') {
        dom = $('#toast-success');
        $('#success-content').text(msg);
    } else {
        dom = $('#toast-info');
        $('#info-content').text(msg);
    }
    dom.show();
    setTimeout(function () {
        dom.hide();
    }, 2000);
};

// 提交信息
function submitInfo(event) {
    var formData = {
        "name": $('input[name="name"]').val(),
        "orderDinner": $('input[name="orderDinner"]:checked').val(),
        "orderBus": $('input[name="orderBus"]:checked').val(),
        "time": $('input[name="time"]').val()
    };
    var formMap = {
        "name": "'姓名'",
        "orderDinner": "'是否订餐'",
        "orderBus": "'是否坐班车'",
        "time": "'加班时段'"
    };
    for (var key in formData) {
        if (!formData[key]) {
            showMessage('请填写' + formMap[key] + '选项！', 'info');
            return;
        }
    }
    event = event || window.event;
    event.preventDefault();
    $('#loadingToast').show();
    $.ajax({
        type: 'post',
        url: 'http://10.1.23.140:3001/',
        data: formData,
        timeout: 2000,
        success: function (res) {
            $('#loadingToast').hide();
            submitInfo = empty;
            $('#submit-btn').addClass('disable').text('已提交');
            if (res === 'success') {
                showMessage('提交成功', 'success');
            }else {
                showMessage('重复提交', 'info');
            }
        }
    });
}