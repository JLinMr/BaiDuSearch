/*----------------------------------------------
                                               -
Glume                                          -
                                               -
Date: 2020/12/4                                -
                                               -
https://bsgun.cn                               -
                                               -
-----------------------------------------------*/
var suggestContainer = document.getElementsByClassName("suggest")[0];
				var searchInput = document.getElementsByClassName("search-input-text")[0];
				var bgDiv = document.getElementsByClassName("bgDiv")[0];
				var searchResult = document.getElementById("search-result");
				function clearContent() {
					var size = searchResult.childNodes.length;
					for(var i = size - 1; i >= 0; i--) {
						searchResult.removeChild(searchResult.childNodes[i]);
					}
				};
				function jumpPage() {
					window.open(`https://www.baidu.com/s?word=${encodeURI(searchInput.value)}`);
				}
				bgDiv.addEventListener("click", function(e) {
					if(e.target.nodeName.toLowerCase() === 'li') {
						var keywords = e.target.innerText;
						searchInput.value = keywords;
						jumpPage();
					} else if(e.target.id === 'btn') {
						jumpPage();
					}
				}, false);
				var i = 0;
				var flag = 1;
				bgDiv.addEventListener("keydown", function(e) {
					var size = searchResult.childNodes.length;
					if(e.keyCode === 13) {
						jumpPage();
					};
					if(e.keyCode === 40) {
						if(flag === 0) {
							i = i + 2;
						}
						flag = 1;
						e.preventDefault();
						if(i >= size) {
							i = 0;
						}
						if(i < size) {
							searchInput.value = searchResult.childNodes[i++].innerText;
						}
					};
					if(e.keyCode === 38) {
						if(flag === 1) {
							i = i - 2;
						}
						flag = 0;
						e.preventDefault();
						if(i < 0) {
							i = size - 1;
						}
						if(i > -1) {
							searchInput.value = searchResult.childNodes[i--].innerText;
						}
					};
				}, false);
				document.onclick = () => clearContent()
		console.clear();

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
