/** 
 * 限制输入框只能输入数字(JQuery插件) 
 *  
 * @author Johnson 
 * 
 * @example $("#amount").numeral() 
 * 
 * @example $("#amount").numeral(4) or $("#amount").numeral({'scale': 4}) 
 * 
 * @example $(".x-amount").numeral() 
 **/  
$.fn.numeral = function() {       
    var args = arguments;  
    var json = typeof(args[0]) == "object";   
    var scale = json ? args[0].scale : args[0];  
    scale = scale || 0;  
    $(this).css("ime-mode", "disabled");  
    var keys = new Array(8, 9, 35, 36, 37, 38, 39, 40, 46);  
    this.bind("keydown",function(e) {  
        e = window.event || e;  
        var code = e.which || e.keyCode;      
        if (e.shiftKey) {  
            return false;  
        }  
        var idx = Array.indexOf(keys, code);  
        if (idx != -1) {  
            return true;  
        }  
        var value = this.value;           
        if (code == 190 || code == 110) {  
            if (scale == 0 || value.indexOf(".") != -1) {  
                return false;  
            }  
            return true;  
  
        } else {  
            if ((code >= 48 && code <= 57) || (code >= 96 && code <= 105))  {                     
                if (scale > 0 && value.indexOf(".") != -1) {                   
                    var reg = new RegExp("^[0-9]+(\.[0-9]{0," + (scale - 1) + "})?$");    
                    var selText = getSelection();                         
                    if (selText != value && !reg.test(value)) {                       
                        return false;  
                    }                             
                }  
                return true;  
            }  
            return false;  
        }  
    });  
    this.bind("blur", function() {  
        if (this.value.lastIndexOf(".") == (this.value.length - 1)) {  
            this.value = this.value.substr(0, this.value.length - 1);  
        } else if (isNaN(this.value)) {  
            this.value = "";  
        } else {  
            var value = this.value;  
            if (scale > 0 && value.indexOf(".") != -1) {                   
                var reg = new RegExp("^[0-9]+(\.[0-9]{0," + scale + "})?$");                              
                if (!reg.test(value)) {                   
                    this.value = format(value, scale);  
                }  
            }  
        }  
    });  
    this.bind("paste", function() {           
        var s = window.clipboardData.getData('text');  
        if (!/\D/.test(s));  
        value = s.replace(/^0*/, '');  
        return false;  
    });  
    this.bind("dragenter", function() {  
        return false;  
    });  
    var format = function(value, scale){  
        return Math.round(value * Math.pow(10, scale)) / Math.pow(10, scale);  
    }         
    var getSelection = function(){        
        if (window.getSelection) {  
            return window.getSelection();  
        }   
        if (document.selection) {  
            return document.selection.createRange().text;  
        }  
        return "";  
    };  
    Array.indexOf = function(array, value) {  
        for (var i = 0; i < array.length; i++) {  
            if (value == array[i]) {  
                return i;  
            }  
        }  
        return -1;  
    }  
};  