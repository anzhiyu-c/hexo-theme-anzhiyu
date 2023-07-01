/*
** HTML accesskey辅助增强脚本
** 作用包括：
** 1. 统一IE浏览器和其它浏览器的快捷访问行为；
** 2. 增加单独accesskey属性值对应按键按下的focus行为；
** 3. 增加accesskey生效的前置键按下的提示行为，例如window上Alt键提示，Mac下的Alt + control组合提示等；
** 4. 增加shift + '?'(keyCode=191)键的提示行为支持；
** MIT
*/

(function (doc, win) {
	// 操作系统和浏览器设备检测
	var ua = navigator.userAgent;
	
	var syetem = 'windows';
	
	if (/Mac\sOS\sX/i.test(ua)) {
		syetem = 'mac';
	}
	
	// 浏览器判断
	var browser = 'chrome';
	if (typeof doc.mozFullScreen != 'undefined') {
		browser = 'moz';
	} else if (typeof doc.msHidden != 'undefined' || typeof doc.hidden == 'undefined') {
		browser = 'ie';
	}
	
	// 快捷键组合
	var keyPrefix = ({
		windows: (browser == 'moz'? {
			ctrlKey: false,
			altKey: true,
			shiftKey: true
		}: {
			ctrlKey: false,
			altKey: true,
			shiftKey: false
		}),
		mac: {
			ctrlKey: true,
			altKey: true,
			shiftKey: false
		} 
	})[syetem];
	
	// 获取字符Unicode值方法
	var U = function(a, b) {
		if (!a) return "";
		for (var b = b || "x", c = "", d = 0, e; d < a.length; d += 1) a.charCodeAt(d) >= 55296 && a.charCodeAt(d) <= 56319 ? (e = (65536 + 1024 * (Number(a.charCodeAt(d)) - 55296) + Number(a.charCodeAt(d + 1)) - 56320).toString(16), d += 1) : e = a.charCodeAt(d).toString(16),
		c += b + e;
		return c.substr(b.length)
	};
	
	// 提示当前元素快捷键的方法
	var timerTips = null;
	var tips = function (arrEles) {
		// 已经显示中，忽略
		if (doc.hasTipsShow) {
			return;	
		}
		// 页面的滚动高度
		var scrollTop = doc.documentElement.scrollTop || doc.body.scrollTop;
		var scrollLeft = doc.documentElement.scrollLeft || doc.body.scrollLeft;
		
		// 遍历创建提示元素
		arrEles.forEach(function (ele) {
			
			// 如果元素隐藏，也忽略
			if (ele.clientHeight * ele.clientWidth == 0) {
				return;	
			}
			
			var accesskey = ele.getAttribute('accesskey');
			var arrAccesskey = [];
			for (var key in keyPrefix) {
				if (keyPrefix[key]) {
					arrAccesskey.push(key);
				}
			}
			arrAccesskey.push(accesskey);
			
			// 当前元素相对于文档的偏移
			var bounding = ele.getBoundingClientRect();

			// 创建tips提示元素
			var div = document.createElement('div');
			div.className = 'AK_Tips';
			div.setAttribute('style', 'position:fixed;top:'+ (bounding.top) +'px;left:'+ (bounding.left + scrollLeft) +'px;z-index:9999;font-family:consolas,"Liberation Mono",courier,monospace;font-size:12px;border-radius:8px;color:#fff;background:rgba(0,0,0,.75);opacity:0.8;line-height:13px;padding:3px 3px;user-select: none;pointer-events: none;');
			div.innerHTML = arrAccesskey.map(function (key) {
				return '<kbd style="font-family:inherit;">'+ key.replace('Key', '') +'</kbd>';	
			}).join('+');
			
			document.body.appendChild(div);
			
			div.fromTarget = ele;
		});
		
		// 标记，避免重复生成
		doc.hasTipsShow = true;
		
		// 一段时间隐藏
		timerTips = setTimeout(function () {
			removeTips();	
		}, 3000);
	};
	// 隐藏tips
	var removeTips = function () {
		clearTimeout(timerTips);
		// 移除所有的快捷键提示
		var elesTips = doc.querySelectorAll('.AK_Tips');
		[].slice.call(elesTips).forEach(function (ele) {
			if (ele.fromTarget) {
				ele.fromTarget.hasTipsShow = null;
			}
			doc.body.removeChild(ele);
		});
		doc.hasTipsShow = null;
	};
	
	if (doc.addEventListener) {
		// IE9+
		doc.addEventListener('keydown', function (event) {
			// 当前元素是否是可输入的input或者textarea
			var isTargetInputable = false;
			var eleTarget = event.target || doc.activeElement;
			var tagName = eleTarget.tagName.toLowerCase();
			if (tagName == 'textarea' || (tagName == 'input' && /checkbox|radio|select|file|button|image|hidden/.test(eleTarget.type) == false)) {
				isTargetInputable = true;
			}
			
			// 遍历所有设置了accesskey的符合HTML4.0.1规范的元素
			// 包括<a>, <area>, <button>, <input>, <label>, <legend>以及<textarea>
			var elesOwnAccesskey = doc.querySelectorAll('a[accesskey],area[accesskey],button[accesskey],input[accesskey],label[accesskey],legend[accesskey],textarea[accesskey]');
			if (elesOwnAccesskey.length == 0) {
				return;	
			}
			// 对象列表转换成数组
			var arrElesOwnAccesskey = [].slice.call(elesOwnAccesskey);
			// 进行遍历
			var arrAcceeekey = arrElesOwnAccesskey.map(function (ele) {
				return ele.getAttribute('accesskey');
			});
			// windows下图下直接event.key就是按下的键对于的内容，但OS X系统却没有key属性，有的是event.keyIdentifier，表示字符的Unicode值
			// 根据这个判断按键是否有对应的匹配
			var indexMatch = -1;
			arrAcceeekey.forEach(function (accesskey, index) {
				if ((event.key && event.key == accesskey) || (event.keyIdentifier && parseInt(event.keyIdentifier.toLowerCase().replace('u+', ''), 16) == parseInt(U(accesskey), 16))) {
					indexMatch = index;
					return false;
				}
			});
			
			// 1. 单独按下某个键的匹配支持
			if (event.altKey == false && event.shiftKey == false && event.ctrlKey == false) {
				if (isTargetInputable) {
					return;	
				}				
				// focus高亮
				if (arrElesOwnAccesskey[indexMatch]) {
					arrElesOwnAccesskey[indexMatch].focus();
					// 阻止内容输入
					event.preventDefault();
				}
			// 2. shift + '?'(keyCode=191)键的提示行为支持
			} else if (event.altKey == false && event.shiftKey == true && event.ctrlKey == false) {
				if (event.keyCode == 191 && !isTargetInputable) {
					doc.hasTipsShow? removeTips(): tips(arrElesOwnAccesskey);
				}
			// 3. 增加accesskey生效的前置键按下的提示行为
			} else if (event.altKey == keyPrefix.altKey && event.shiftKey == keyPrefix.shiftKey && event.ctrlKey == keyPrefix.ctrlKey) {				
				if (indexMatch == -1) {
					event.preventDefault();
					doc.hasTipsShow? removeTips(): tips(arrElesOwnAccesskey);
				} else {
					removeTips();	
				}
				
				// 4. IE浏览器和其他浏览器行为一致的处理
				if (browser == 'ie' && arrElesOwnAccesskey[indexMatch] && !isTargetInputable) {
					// click行为触发
					arrElesOwnAccesskey[indexMatch].click();
				}
			}
		});
		doc.addEventListener('mousedown', function (event) {
			removeTips();
		});
	}	
})(document, window);