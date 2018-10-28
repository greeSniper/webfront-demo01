/**
 * Created by tangzhe on 2018-07-08.
 */
/**
 * 获取指定标签对象
 * @param id 标签的id属性值
 * @returns {Element}根据id属性值返回指定标签对象
 */
function my$(id) {
    return document.getElementById(id);
}

/**
 * 获取元素的文本内容
 * @param element 任意元素
 * @returns {*} 任意元素中的文本内容
 */
function getInnerText(element) {
    if (typeof element.textContent == "undefined") {
        return element.innerText;
    } else {
        return element.textContent;
    }
}

/**
 * 设置元素的文本内容
 * @param element 任意元素
 * @param text 文本内容
 */
function setInnerText(element, text) {
    if (typeof element.textContent == "undefined") {
        element.innerText = text;
    } else {
        element.textContent = text;
    }
}

/**
 * 格式化日期
 * @param dt 日期对象
 * @returns {string} 返回值是格式化的字符串日期
 */
function getDates(dt) {
    //存储时间的字符串
    var str = "";
    //获取年
    var year = dt.getFullYear();
    //获取月
    var month = dt.getMonth() + 1;
    //获取日
    var day = dt.getDate();
    //获取小时
    var hour = dt.getHours();
    //获取分钟
    var min = dt.getMinutes();
    //获取秒
    var sec = dt.getSeconds();
    month = month < 10 ? "0" + month : month;
    day = day < 10 ? "0" + day : day;
    hour = hour < 10 ? "0" + hour : hour;
    min = min < 10 ? "0" + min : min;
    sec = sec < 10 ? "0" + sec : sec;
    str = year + "年" + month + "月" + day + "日 " + hour + ":" + min + ":" + sec;
    return str;
}

/**
 * 获取父级元素中的最后一个子元素
 * @param element 父级元素
 * @returns {*} 最后一个子元素
 */
function getLastElement(element) {
    if (element.lastElementChild) {
        return element.lastElementChild;
    } else {
        var node = element.lastChild;
        while (node && node.nodeType != 1) {
            node = node.previousSibling;
        }
        return node;
    }
}

/**
 * 获取某个元素的前一个兄弟元素
 * @param element 某个元素
 * @returns {*} 前一个兄弟元素
 */
function getPreviousElement(element) {
    if (element.previousElementSibling) {
        return element.previousElementSibling
    } else {
        var node = element.previousSibling;
        while (node && node.nodeType != 1) {
            node = node.previousSibling;
        }
        return node;
    }
}

/**
 * 获取某个元素的后一个兄弟元素
 * @param element 某个元素
 * @returns {*} 后一个兄弟元素
 */
function getNextElement(element) {
    if (element.nextElementSibling) {
        return element.nextElementSibling
    } else {
        var node = element.nextSibling;
        while (node && node.nodeType != 1) {
            node = node.nextSibling;
        }
        return node;
    }
}

/**
 * 获取某个元素的所有兄弟元素
 * @param element 某个元素
 * @returns {Array} 兄弟元素
 */
function getSiblings(element) {
    if (!element) {
        return;
    }
    var elements = [];
    var ele = element.previousSibling;
    while (ele) {
        if (ele.nodeType === 1) {
            elements.push(ele);
        }
        ele = ele.previousSibling;
    }
    ele = element.nextSibling;
    while (ele) {
        if (ele.nodeType === 1) {
            elements.push(ele);

        }
        ele = ele.nextSibling;
    }
    return elements;
}

/**
 * 返回当前浏览器是什么类型的浏览器
 */
function userBrowser(){
    var browserName = navigator.userAgent.toLowerCase();
    if(/msie/i.test(browserName) && !/opera/.test(browserName)){
        console.log("IE");
    }else if(/firefox/i.test(browserName)){
        console.log("Firefox");
    }else if(/chrome/i.test(browserName) && /webkit/i.test(browserName) && /mozilla/i.test(browserName)){
        console.log("Chrome");
    }else if(/opera/i.test(browserName)){
        console.log("Opera");
    }else if(/webkit/i.test(browserName) &&!(/chrome/i.test(browserName) && /webkit/i.test(browserName) && /mozilla/i.test(browserName))){
        console.log("Safari");
    }else{
        console.log("不知道什么鬼!");
    }
}

/**
 * 为任意一个元素绑定事件:元素,事件类型,事件处理函数
 */
function addEventListener(element, type, fn) {
    if(element.addEventListener){
        element.addEventListener(type, fn, false);
    }else if(element.attachEvent){
        element.attachEvent("on" + type, fn);
    }else{
        element["on"+type] = fn;
    }
}

/**
 * 为任意的一个元素解绑某个事件:元素,事件类型,事件处理函数
 */
function removeEventListener(element, type, fn) {
    if(element.removeEventListener){
        element.removeEventListener(type, fn, false);
    }else if(element.detachEvent){
        element.detachEvent("on" + type, fn);
    }else{
        element["on"+type] = null;
    }
}

/**
 * 获取页面向上或者向左卷曲出去的距离的值
 * @returns {{left: number, top: number}}
 */
function getScroll() {
    return {
        left: window.pageXOffset | document.documentElement.offsetLeft | document.body.offsetLeft | 0,
        top : window.pageYOffset | document.documentElement.offsetTop | document.body.offsetTop | 0
    };
}

/**
 * 获取任意一个元素的任意一个样式属性的值
 * @param element 元素
 * @param attr 属性
 * @returns {string} 属性值
 */
function getStyle(element, attr) {
    // 判断浏览器是否支持这个方法
    return window.getComputedStyle ? window.getComputedStyle(element,null)[attr] : element.currentStyle[attr];
}

/**
 * 动画函数
 * @param element 元素
 * @param json {width: 200, height: 200, left: 100, opacity: 0.2}
 * @param fn 回调函数
 */
function animate(element, json, fn) {
    clearInterval(element.timeId);
    element.timeId = setInterval(function () {
        var flag = true;
        // 遍历json对象中的每个属性以及属性对应的目标值
        for (var attr in json) {
            if (attr == "opacity") { // 判断这个属性attr中是不是opacity
                // 获取元素的当前的透明度, 当前的透明度放大100倍
                var current = getStyle(element, attr) * 100;
                // 目标的透明度放大100倍
                var target = json[attr] * 100;
                var step = (target - current) / 10;
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                current += step; // 移动后的值
                element.style[attr] = current / 100;
            } else if (attr == "zIndex") { // 判断这个属性attr中是不是zIndex
                // 层级改变就是直接改变这个属性的值
                element.style[attr] = json[attr];
            } else { // 普通的属性
                // 获取元素这个属性的当前的值
                var current = parseInt(getStyle(element, attr));
                // 当前的属性对应的目标值
                var target = json[attr];
                // 移动的步数
                var step = (target - current) / 10;
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                current += step; // 移动后的值
                element.style[attr] = current + "px";
            }
            // 是否到达目标
            if (current != target) {
                flag = false;
            }
        }
        if (flag) {
            // 清理定时器
            clearInterval(element.timeId);
            // 所有的属性到达目标才能使用这个函数, 前提是用户传入了这个函数
            if (fn) {
                fn();
            }
        }
        // 测试代码
        //console.log("目标:" + target + ",当前:" + current + ",每次的移动步数:" + step);
    }, 20);
}

/**
 * 兼容代码，图片跟着鼠标飞
 */
var evt = {
    /**
     * window.event和事件参数对象e的兼容
     */
    getEvent: function (e) {
        return e || window.event;
    },
    /**
     * 可视区域的横坐标的兼容代码
     */
    getClientX: function (e) {
        return this.getEvent(e).clientX;
    },
    /**
     * 可视区域的纵坐标的兼容代码
     */
    getClientY: function (e) {
        return this.getEvent(e).clientY;
    },
    /**
     * 页面向左卷曲出去的横坐标
     */
    getScrollLeft: function () {
        return window.pageXOffset||document.body.scrollLeft||document.documentElement.scrollLeft||0;
    },
    /**
     * 页面向上卷曲出去的纵坐标
     */
    getScrollTop: function () {
        return window.pageYOffset||document.body.scrollTop||document.documentElement.scrollTop||0;
    },
    /**
     * 相对于页面的横坐标(pageX或者是clientX+scrollLeft)
     */
    getPageX: function (e) {
        return this.getEvent(e).pageX ? this.getEvent(e).pageX : this.getClientX(e)+this.getScrollLeft();
    },
    /**
     * 相对于页面的纵坐标(pageY或者是clientY+scrollTop)
     */
    getPageY: function (e) {
        return this.getEvent(e).pageY ? this.getEvent(e).pageY : this.getClientY(e)+this.getScrollTop();
    }
};
