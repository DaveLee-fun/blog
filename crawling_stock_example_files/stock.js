function comma(num){
    var num = parseInt(num);
    var regexp = /\B(?=(\d{3})+(?!\d))/g;
    return num.toString().replace(regexp, ',');
}
function numberPad(n, width) {
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;
}

function checkCss(status){
    let obj = {'rate_css' : '' , 'rate_icon' : '' , 'rate_icon2' : ''}
    if (status == '1' || status == '2'){
        obj.rate_css = 'is_plus';
        obj.rate_icon = 'up';
    }
    else if (status == '4' || status == '5'){
        obj.rate_css = 'is_minus';
        obj.rate_icon = 'down';
    }
    return obj;
}

function changeTime(time){
    return time.substring(0,2) + ':' + time.substring(4,6) + ':' + time.substring(6,8);
}

function moreNewsContents(s_idx, page){
    $.ajax({
        type: "GET",
        url: "/news/moreNewsContents",
        data: {'s_idx' : s_idx, 'page' : page},
        dataType: "json",
        success: function(result) {
            if(result.status == 'success'){
                $('#news_contents').append(result.news_html);
                $('#more_news_contents').empty();
                $('#more_news_contents').html(result.news_next_button);
            }

        }
    });
}

function moreInvestContents(category, page){
    var search_string = $('input[type=search]').val();

    $.ajax({
        type: "GET",
        url: "/invest/moreInvestContents",
        data: {'category' : category, 'page' : page, 'search_string' : search_string},
        dataType: "json",
        success: function(result) {
            if(result.status == 'success'){
                $('#invest_contents').append(result.invest_html);
                $('#invest_contents_button').empty();
                $('#invest_contents_button').html(result.invest_next_button);
            }

        }
    });
}
