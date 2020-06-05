			/*
				execScript("tmp=asc(\"" + s + "\")", "vbscript");
		        tmp = 65536 + tmp;
		        var py = "";
		        if (tmp >= 45217 && tmp <= 45252) {
		            py = "A"
		        } else if (tmp >= 45253 && tmp <= 45760) {
		            py = "B"
		        } else if (tmp >= 45761 && tmp <= 46317) {
		            py = "C"
		        } else if (tmp >= 46318 && tmp <= 46825) {
		            py = "D"
		        } else if (tmp >= 46826 && tmp <= 47009) {
		            py = "E"
		        } else if (tmp >= 47010 && tmp <= 47296) {
		            py = "F"
		        } else if ((tmp >= 47297 && tmp <= 47613) || (tmp == 63193)) {
		            py = "G"
		        } else if (tmp >= 47614 && tmp <= 48118) {
		            py = "H"
		        } else if (tmp >= 48119 && tmp <= 49061) {
		            py = "J"
		        } else if (tmp >= 49062 && tmp <= 49323) {
		            py = "K"
		        } else if (tmp >= 49324 && tmp <= 49895) {
		            py = "L"
		        } else if (tmp >= 49896 && tmp <= 50370) {
		            py = "M"
		        } else if (tmp >= 50371 && tmp <= 50613) {
		            py = "N"
		        } else if (tmp >= 50614 && tmp <= 50621) {
		            py = "O"
		        } else if (tmp >= 50622 && tmp <= 50905) {
		            py = "P"
		        } else if (tmp >= 50906 && tmp <= 51386) {
		            py = "Q"
		        } else if (tmp >= 51387 && tmp <= 51445) {
		            py = "R"
		        } else if (tmp >= 51446 && tmp <= 52217) {
		            py = "S"
		        } else if (tmp >= 52218 && tmp <= 52697) {
		            py = "T"
		        } else if (tmp >= 52698 && tmp <= 52979) {
		            py = "W"
		        } else if (tmp >= 52980 && tmp <= 53688) {
		            py = "X"
		        } else if (tmp >= 53689 && tmp <= 54480) {
		            py = "Y"
		        } else if (tmp >= 54481 && tmp <= 62289) {
		            py = "Z"
		        } else {
		            py = s.charAt(0);
		        }
		        */
/*
items: ["source", "|", "undo", "redo", "|", "preview", "print", "template", 
"code", "cut", "copy", "paste", "plainpaste", "wordpaste",
2."|", "justifyleft", "justifycenter", "justifyright", "justifyfull", 
"insertorderedlist", "insertunorderedlist", "indent", "outdent", "subscript",
 "superscript", "clearhtml", "quickformat", "selectall", "|", "fullscreen", 
 "/", "formatblock", "fontname", "fontsize", "|", "forecolor", "hilitecolor",
  "bold", "italic", "underline", "strikethrough", "lineheight", "removeformat",
   "|", "image", "multiimage", "flash", "media", "insertfile", "table", "hr", 
   "emoticons",  "baidumap", "pagebreak", "anchor", "link", "unlink", "|", "about"]

这个items所配置的就是kindeditor编辑器所有的工具栏菜单项。我们可以在这里统一修改保留自己想要的几个菜单即可。另外这对每一个菜单code所表示的含义进行一个说明：

source：表示可以切换编辑器的编辑模式进入源代码HTML查看模式；

undo：表示后退，也就是我们常用的CTRL+Z快捷键功能；

redo：表示前进，也就是我们常用的CTRL+Y快捷键功能；

preview：表示预览，点击可以提前预览编辑器内的内容所展示的效果。

print：表示打印编辑器内的内容。

template：表示可以插入编辑器内的模板窗体；

code：表示可以插入代码段；

cut：表示剪切；

copy：表示复制，如同CTRL+C；

paste：表示粘贴，如同CTRL+V；

plainpaste：表示粘贴为无格式文本，主要是用于比如想赋值其他有HTML格式的纯文本进入编辑器，可以先在这里面进行HTML标签的过滤；

wordpaste：表示从WORD内粘贴；

justifyleft：表示选中文本居左；

justifycenter：表示选中文本居中；

justifyright：表示选中文本居右；

justifyfull：表示两端对齐；

insertorderedlist：表示编号（1、2、3）；

insertunorderedlist：表示项目符号；

indent：表示增加缩进；

outdent：表示减少缩进；

subscript：表示下标；如同：X2

superscript：表示上标；如同：X2

clearhtml：表示清除HTML标签；

quickformat：表示快速排版；

selectall：表示全选；

fullscreen：表示全屏；

formatblock：表示段落；

fontname：表示字体；

fontsize：表示文字大小；

forecolor：表示文字颜色；

hilitecolor：表示文字背景色；

bold：表示文字加粗；

italic：表示文字斜体；

underline：表示给文字追加下划线；

strikethrough：表示给文字追加删除线；

lineheight：表示调整行距；

removeformat：表示删除选中段的格式；

image：表示单个上传图片；

multiimage：表示批量上传图片；

flash：表示插入flash；

media：表示插入音视频文件；

insertfile：表示插入文件；

table：表示插入表格；

hr：表示插入横线；

emoticons：表示插入表情；

baidumap：表示插入地图；

pagebreak：表示插入分页符；

anchor：表示插入锚点；

link：表示插入超链接；

unlink：表示取消超级链接；一般和link配合出现；

about：表示关于kindeditor编辑器的信息；





invalidImg : "请输入有效的URL地址。\n只允许jpg,gif,bmp,png格式。",
invalidMedia : "请输入有效的URL地址。\n只允许swf,flv,mp3,wav,wma,wmv,mid,avi,mpg,asf,rm,rmvb格式。",
invalidWidth : "宽度必须为数字。",
invalidHeight : "高度必须为数字。",
invalidBorder : "边框必须为数字。",
invalidUrl : "请输入有效的URL地址。",
invalidRows : '行数为必选项，只允许输入大于0的数字。',
invalidCols : '列数为必选项，只允许输入大于0的数字。',
invalidPadding : '边距必须为数字。',
invalidSpacing : '间距必须为数字。',
invalidBorder : '边框必须为数字。',
pleaseInput : "请输入内容。",
invalidJson : '服务器发生故障。',
cutError : '您的浏览器安全设置不允许使用剪切操作，请使用快捷键(Ctrl+X)来完成。',
copyError : '您的浏览器安全设置不允许使用复制操作，请使用快捷键(Ctrl+C)来完成。',
pasteError : '您的浏览器安全设置不允许使用粘贴操作，请使用快捷键(Ctrl+V)来完成。'
*/