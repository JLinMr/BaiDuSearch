/*----------------------------------------------
                                               -
JLin                                           -
                                               -
Date: 2021/03/17                               -
                                               -
update：2023/10/13                             -
                                               -
https://www.bsgun.cn 【写作不易】              -
                                               -
看见这个我希望你能够留下我信息                 -
                                               -
-----------------------------------------------*/
var suggestContainer = document.getElementsByClassName("suggest")[0];
var searchInput = document.getElementsByClassName("search-input-text")[0];
var bgDiv = document.getElementsByClassName("bgDiv")[0];
var searchResult = document.getElementById("search-result");

// 清除建议框内容
function clearContent() {
    var size = searchResult.childNodes.length;
    for (var i = size - 1; i >= 0; i--) {
        searchResult.removeChild(searchResult.childNodes[i]);
    }
};

var timer = null;
// 注册输入框键盘抬起事件
searchInput.onkeyup = function(e) {
    suggestContainer.style.display = "block";
    // 如果输入框内容为空 清除内容且无需跨域请求
    if (this.value.length === 0) {
        clearContent();
        return;
    }
    if (this.timer) {
        clearTimeout(this.timer);
    }
    if (e.keyCode !== 40 && e.keyCode !== 38) {
        // 函数节流优化
        this.timer = setTimeout(() => {
            // 创建script标签JSONP跨域
            var script = document.createElement("script");
            script.src = "https://www.baidu.com/su?&wd=" + encodeURI(this.value.trim()) +
                "&p=3&cb=handleSuggestion";
            document.body.appendChild(script);
        }, 130)
    }

};

// 回调函数处理返回值
function handleSuggestion(res) {
    // 清空之前的数据！！
    clearContent();
    var result = res.s;
    // 截取前六个搜索建议项
    if (result.length > 4) {
        result = result.slice(0, 6)
    }
    for (let i = 0; i < result.length; i++) {
        // 动态创建li标签
        var liObj = document.createElement("li");
        liObj.innerHTML = result[i];
        searchResult.appendChild(liObj);
    }
    // 自执行匿名函数--删除用于跨域的script标签
    (function() {
        var s = document.querySelectorAll('script');
        for (var i = 1, len = s.length; i < len; i++) {
            document.body.removeChild(s[i]);
        }
    })()
}


function jumpPage() {
    window.open(`https://www.baidu.com/s?word=${encodeURI(searchInput.value)}`);
}

// 事件委托 点击li标签或者点击搜索按钮跳转到百度搜索页面
bgDiv.addEventListener("click", function(e) {
    if (e.target.nodeName.toLowerCase() === 'li') {
        var keywords = e.target.innerText;
        searchInput.value = keywords;
        jumpPage();
    } else if (e.target.id === 'btn') {
        jumpPage();
    }
}, false);

var i = 0;
var flag = 1;

// 事件委托 监听键盘事件
bgDiv.addEventListener("keydown", function(e) {
    var size = searchResult.childNodes.length;
    if (e.keyCode === 13) {
        jumpPage();
    };
    // 键盘向下事件
    if (e.keyCode === 40) {
        if (flag === 0) {
            i = i + 2;
        }
        flag = 1;
        e.preventDefault();
        if (i >= size) {
            i = 0;
        }
        if (i < size) {
            searchInput.value = searchResult.childNodes[i++].innerText;
        }
    };
    // 键盘向上事件
    if (e.keyCode === 38) {
        if (flag === 1) {
            i = i - 2;
        }
        flag = 0;
        e.preventDefault();
        if (i < 0) {
            i = size - 1;
        }
        if (i > -1) {
            searchInput.value = searchResult.childNodes[i--].innerText;
        }
    };
}, false);

// 点击页面任何其他地方 搜索结果框消失
document.onclick = () => clearContent();

(function() {
    window.onclick = function(event) {
        var heart = document.createElement("b");
        heart.onselectstart = new Function('event.returnValue=false');
        document.body.appendChild(heart).innerHTML = "HU💖HU";
        heart.style.cssText = "position: fixed;left:-100%;";
        var f = 16,
            x = event.clientX - f / 2,
            y = event.clientY - f,
            c = randomColor(),
            a = 1,
            s = 1.2;
        var timer = setInterval(function() {
            if (a <= 0) {
                document.body.removeChild(heart);
                clearInterval(timer);
            } else {
                heart.style.cssText = "font-size:16px;cursor: default;position: fixed;color:" + c + ";left:" + x + "px;top:" + y + "px;opacity:" + a + ";transform:scale(" + s + ");";
                y--;
                a -= 0.016;
                s += 0.002;
            }
        }, 12)
    }

    function randomColor() {
        return "rgb(" + (~~(Math.random() * 255)) + "," + (~~(Math.random() * 255)) + "," + (~~(Math.random() * 255)) + ")";
    }
}())
