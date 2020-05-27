$(function () {
  $.ajax({
    url: window.BigNew.user_info,
    dataType: "json",
    /* //发送请求前的一个回调函数 ，传递请求头
        beforeSend:function(xhr){
            xhr.setRequestHeader('Authorization',localStorage.getItem('linbai'))
        }, */
    // 请求出现错误时，会调用error函数进行处理
    /* error:function(err){
            console.log(err)
            // Forbidden 被禁止的 表示token已过期
            if(err.statusText == 'Forbidden'){ 
                alert(err.responseJSON.msg)
                location.href='./login.html'
            }
        } */
    success: function (result) {
      console.log(result);
      if (result.code == 200) {
          $(".user_info > span").html("欢迎你&nbsp&nbsp&nbsp"+result.data.nickname);
          $('.user_info > img').attr('src', result.data.userPic)
          $('.user_center_link > img').attr('src', result.data.userPic)
      }
    },
  });
    $('.level01').on('click', function () {
        $(this).addClass('active').siblings().removeClass('active')
        if ($(this).next().hasClass('level02')) {
            $(this).next().slideToggle()
            $(this).find('b').toggleClass('rotate0')
        } else {
            $('.level02').slideUp()
            $('.level01').find('b').removeClass('rotate0')
            $('.level02 > li').removeClass('active')
        }
    })
    $('.level02 li').on('click', function () {
        $(this).addClass('active').siblings().removeClass('active')
    })
    $('.logout').on('click', function () {
        localStorage.removeItem('linbai')
        window.location.href = './login.html'
    })
});
