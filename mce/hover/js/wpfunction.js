WP_HOVER ={
	DEBUG:1,
    index:[],
    listhoverlet:[],
    listcategory:[],
    listcategory1:[],
    listcategory11:[],
    listcategory12:[],
    finallyurl:'',
    finallyurl1:'',
    selected_word:'',
    _replace:false,
    linkData:[],
    currentData:[],
    text: '',
	
	
    init: function(_word) {

		var word = (_word.length ===0 )? '': window.decodeURIComponent(_word);
     	WP_HOVER.hideRefresh();

		var temp =  _word.replace(/[^a-zA-Z0-9'" ]+/g,'');

		var _text = document.getElementById('selectedword');

		var _beforeTextLen = _text.value.length;

		_text.value = temp;

		var activeEditor = ("undefined" == typeof tinyMCE)? parent.window.tinyMCE.activeEditor:tinyMCE.activeEditor;
		var str = activeEditor.getContent();
		WP_HOVER.linkDatas = ( !parent.window.parent.window.WP_HOVER.previousHoverlets)?[]: parent.window.parent.window.WP_HOVER.previousHoverlets;
	
		if(WP_HOVER.linkDatas.length>0){
		    if(_word!=''){
				WP_HOVER.show_previous_hoverlets(document.getElementById('selectedword').value);
		    }
		    else{
		    	WP_HOVER.show_previous_hoverlets(document.getElementById('selectedword').value);
		    }
		}
    },
	
    show_previous_hoverlets: function(_word){
	
		var linkDatas =	parent.window.WP_HOVER.previousHoverlets;
	
		var used_hoverlets = document.getElementById('used_hoverlets');
		var usethis_btn = document.createElement("input");  
			usethis_btn.setAttribute("type", 'button');  
			usethis_btn.name = 'usethis';
			usethis_btn.value = 'Use This';
			usethis_btn.className = 'usebutton';
		var div_radio=document.createElement("div");  
		div_radio.id='divradio';
		div_radio.cssText='display:none';
		used_hoverlets.appendChild(div_radio);
		for(var i=0;i< linkDatas.length ; i++){
			//add a chkbox and its events
			//Create an input type radio button dynamically.  
			var radio_btn = document.createElement("input");  
			radio_btn.setAttribute("type", 'radio');  
			radio_btn.name = 'usedbtn';
			radio_btn.linkData = linkDatas[i];
			radio_btn.linkData.kw = (_word)? _word : linkDatas[i].kw;
			radio_btn.onclick=function(e){
				document.getElementById('divradio').linkData=this.linkData;
			};
		
			//add the label
			var _txt = document.createElement('span');
			_txt.style.cssText='cursor:pointer;margin:3px;';
			//_txt.innerHTML = '<a href="">' + linkDatas[i].title + '</a><br>';
			_txt.innerHTML = linkDatas[i].title;
			
			//a parent row
			if(document.getElementById('u'+linkDatas[i].name) == null){

				var _row = document.createElement('div');
				_row.id = 'u'+linkDatas[i].name;
				_row.appendChild(radio_btn);
				_row.appendChild(_txt);

				used_hoverlets.appendChild(_row);
		
				YAHOO.util.Event.addListener(usethis_btn,'click', function(e){
					//when clicked simulate the "use this" button being clicked
					//refresh_hoverlet(_btn.linkData);
					var _link = WP_HOVER.convert_linkData_to(document.getElementById('divradio').linkData,"url");
					if(_word=='' && document.getElementById('selectedword').value!=''){	
						WP_HOVER.keywordHover2(document.getElementById('selectedword').value,_link);
					}else{
						if(document.getElementById('selectedword').value!=''){
							WP_HOVER.keywordHover2(_word,_link);
						}
					}
		
					if(document.getElementById('keywordtext').value!=''){
						WP_HOVER.keywordHover();
					}
		
			
					WP_HOVER.hide_popup();
				
				});	    
			}
		}
		used_hoverlets.appendChild(usethis_btn);
    },
    convert_linkData_to:function(linkData,Option){

		WP_HOVER.finallyurl1='http://'+linkData.event+'.hover.in/hoverlet/'+linkData.nick+'/'+linkData.name;
		var encodedKw=linkData.kw.split('/');
		var kw1='';
		if(encodedKw.length>1){
			for(var i=0;i<encodedKw.length;i++){
				var temp=window.encodeURIComponent(encodedKw[i]);
				kw1=kw1+temp+'/';
			}
		kw1=kw1.substring(0,kw1.length-1);
		}else{
			kw1= WP_HOVER.trim( linkData.kw );
		}
	
		var _link='';
		switch(Option){
		case "url":
			_link='http://'
			+linkData.event
			+'.hover.in/hoverlet/'
			+linkData.nick
			+'/'+linkData.name
			+'/'+kw1;
			
			break;
		}
		return _link;
    },
    
    createHtmlLink:function(){
		var finalurl='aaaa';
		var selectedvalue='aaa';
		if(finalurl!='undefined') {
		    var ed = tinyMCEPopup.editor;
			var e, b;
			var editor = tinyMCE.activeEditor;
			var oRange = editor.selection.getRng();
			var content = editor.getContent(({ format : 'text' }));		

			tinyMCEPopup.restoreSelection();
			e = ed.dom.getParent(ed.selection.getNode(), 'A');
	
			if (selectedvalue=='') {
				tinyMCEPopup.close();
				if (e) {
					tinyMCEPopup.execCommand("mceBeginUndoLevel");
					b = ed.selection.getBookmark();
					ed.dom.remove(e, 1);
					ed.selection.moveToBookmark(b);
					tinyMCEPopup.execCommand("mceEndUndoLevel");
					tinyMCEPopup.close();
					return;
				}
			}else{
			}		

			tinyMCEPopup.execCommand("mceBeginUndoLevel");
			var selectedContent=document.getElementById('selectedword').value;
		  
			if (e == null) {
		
				if(WP_HOVER._replace){
					if(selectedContent!=''){			
						WP_HOVER.keywordHover1(selectedContent);
					}
				}
				else{
					//replace_word_with_link(selectedContent,finallyurl)
				   //tinyMCE.activeEditor.selection.setContent(document.getElementById('selectedword').value);
				   //tinyMCEPopup.execCommand("CreateLink", false, WP_HOVER.finallyurl, {skip_undo : 1});
				   if(selectedContent!=''){			

					   var strtest=tinyMCE.activeEditor.getContent();
   				       var newstr   = WP_HOVER.replaceRegex( strtest, selectedContent,'<a href=\"'+WP_HOVER.finallyurl+'\">'+document.getElementById('selectedword').value+'</a>' );
					   //tinyMCE.activeEditor.setContent(strtest.replace(document.getElementById('selectedword').value,'<a href=\"'+WP_HOVER.finallyurl+'\">'+document.getElementById('selectedword').value+'</a>'));
					   tinyMCE.activeEditor.setContent(newstr);

				   }
				}
				if(document.getElementById('keywordtext').value!=''){
					WP_HOVER.keywordHover();
				}
		
		
			}
			
			tinyMCEPopup.execCommand("mceEndUndoLevel");
			WP_HOVER.hide_popup();
		}    
    },
    
    hide_popup:function(){
		tinyMCEPopup.close();
    },
    
    
    showRefresh:function() {
		document.getElementById('refresh').style.display='';
    },
    
    hideRefresh:function(){
		document.getElementById('refresh').style.display='none';
    },
    
    dynamic:function(url) {
		var x = document.createElement("script");
		x.setAttribute("type","text/javascript");
		x.setAttribute("src", url);
		document.getElementsByTagName("head")[0].appendChild(x);
    },
    
    returnUrl:function() {
		var	url = "http://api.hover.in/public/hoverlet/community.yaws?callback=WP_HOVER.community_callback";
		return(url);
    },
    
    community_callback:function(Obj) {
	

	for(var i=0;i<Obj.length;i++){
        WP_HOVER.listcategory[i]=Obj[i].category;
	}
	for(var i = 0; i < WP_HOVER.listcategory.length; i++){
            var xx = true;
            var ArrayVal = WP_HOVER.listcategory[i];
            for(var j = i+1; j < WP_HOVER.listcategory.length; j++){
				if(WP_HOVER.listcategory[j] == ArrayVal) 
					xx = false;
				}
	    
       	    if(xx == true)
				WP_HOVER.listcategory1.push(ArrayVal)
	}
	//The following code for sorting community by no of hoverlets
	var List={};
	for(var i = 0; i < WP_HOVER.listcategory1.length; i++) {
            List[WP_HOVER.listcategory1[i]] = 0;
	}
	
	for(var i=0;i<Obj.length;i++){
            List[Obj[i].nick]++;
	}   
	
	for(var i = WP_HOVER.listcategory1.length;i>1; i--) {
	    for(var j = 0; j < i-1; j++){
			if(List[WP_HOVER.listcategory1[j]]<List[WP_HOVER.listcategory1[j+1]]){
    	        var temp=WP_HOVER.listcategory1[j];
                WP_HOVER.listcategory1[j]=WP_HOVER.listcategory1[j+1];
                WP_HOVER.listcategory1[j+1]=temp;
			} 
        }
	}   
	
	for(var i = 0; i < WP_HOVER.listcategory1.length; i++) {
            var ollist=document.createElement("ol");
	    ollist.id='oc'+WP_HOVER.listcategory1[i];
	    var category=document.createElement("div"); 
	    category.id='c'+WP_HOVER.listcategory1[i];
	    category.appendChild(ollist);
            var category1=document.createElement("div"); 
	
			var _b = WP_HOVER.listcategory1[i].toLowerCase(), reg = new RegExp(' & ',"mig");
			var img_bg_class = 'cat_'+ _b.replace(reg,'_');
			//console.log( 'div.'+img_bg_class +'\n{\n /* '+ WP_HOVER.listcategory1[i] +'*/\nbackground-scroll:0px 0px;\n}');
			//console.log( 'div:hover.'+img_bg_class +'\n{\n /* '+ WP_HOVER.listcategory1[i] +'*/\nbackground-scroll:0px 0px;\n}');
            category1.className="accordionButton hoverlet_cat_default "+img_bg_class;
            category1.innerHTML='<h2>'+WP_HOVER.listcategory1[i]+'</h2>';
	    
            document.getElementById('wrapper1').appendChild(category1);
           var category2=document.createElement("div"); 
	    
            category2.className="accordionContent";	
	    
            document.getElementById('wrapper1').appendChild(category2);
	    category2.appendChild(category);
	}
	
	
	for(var i=0;i<Obj.length;i++){        
    	    var x=document.createElement("li");
	    
	    x.className="item";
	    x.title=Obj[i].nick+'/'+Obj[i].name;
	    var x1=document.createElement("div");
	    x1.className='test123';
	    
	    x1.innerHTML=Base64.decode(Obj[i].title);
		//var x3=document.createElement("div");
	    //x3.className='test12';
	    //x3.innerHTML='by '+Obj[i].nick;
	    var x2=document.createElement("div");
	    x2.innerHTML='by '+Obj[i].nick;	
	    x2.className='x3class';
	    
	    x.appendChild(x1);
	    
	    var _nick = Obj[i].nick;
	    var _name = Obj[i].name;
	    var _title = Obj[i].name+' by '+Obj[i].nick;
	    x.linkData = { nick:_nick, name:_name, title:_title } ;
	    x.onclick= function(e){
		WP_HOVER.showRefresh();
		WP_HOVER.refresh_hoverlet(this.linkData);
	    };
	    
	    var y = document.createElement("img");
	    y.src=Obj[i].thumb;
	    y.title= _title;
	    y.alt = _title;
	    y.width="100";
	    
	    x2.appendChild(y);
	    //x.appendChild(x3);
	    x.appendChild(x2);
	    
	    
	    document.getElementById('oc'+Obj[i].category).appendChild(x);
	    
	}
	
	WP_HOVER.accordian();
	WP_HOVER.carousel1();
	
	
    },
    
    
    refresh_kw:function(){
		WP_HOVER.refresh_hoverlet(WP_HOVER.currentData);
    },
    
    refresh_hoverlet:function(Data){
		WP_HOVER.currentData= Data;
	
		document.getElementById('newform').style.display='none';
		document.getElementById('helpbutton').style.display='';
		document.getElementById('hide').style.display='block';
	
		document.getElementById('use').style.display='';
	
		var radio=document.getElementsByName('r1');
		var eventName='';
		for (var ii = 0; ii < radio.length; ii++){
		        if (radio[ii].checked){
					eventName=radio[ii].value;
		        }
		}
		WP_HOVER.currentData.event = eventName;
		WP_HOVER.currentData.kw = document.getElementById('selectedword').value;
		WP_HOVER.finallyurl = WP_HOVER.convert_linkData_to(WP_HOVER.currentData,"url");
		var _if = document.createElement('iframe');

		_if.src = WP_HOVER.finallyurl+'?site='+ window.encodeURIComponent(WP_HOVER.blogname);var _w = 100,_h=330;
		var _div = document.getElementById('previewhoverlet');
	
		var _div1=document.getElementById('mainform');
		_div1.style.display='none';
		_div.style.display="";
		_if.style.cssText='position:relative;top:0px;left:0px;width:'+_w+'%;height:'+_h	+'px;border:0px';
		_div.innerHTML='';		
		_div.appendChild(_if);
		parent.window.WP_HOVER.previousHoverlets.push(WP_HOVER.currentData);
    },
    
    
    

    carousel1:function(){
		for(var i = 0; i < WP_HOVER.listcategory1.length; i++) {
			var aa='c'+WP_HOVER.listcategory1[i];
			    aa    = new YAHOO.widget.Carousel('c'+WP_HOVER.listcategory1[i], {
					animation: { speed: 0.5 }
			    });
			
			aa.render(); 
			aa.show();   
			
		}
    },
    accordian:function(){
		$('div.accordionButton').click(function() {
			
			$('div.accordionContent').slideUp('normal');	
			$(this).next().slideDown('normal');
		});	
		$("div.accordionContent").hide();
    },
    keywordHover:function(){
	   var keywordt=document.getElementById('keywordtext').value;
       var keywordarray=keywordt.split(",");
       var activeEditor = tinyMCE.activeEditor;
       var oldstr = activeEditor.getContent(), newstr=oldstr;
       for(var i=0;i<keywordarray.length;i++){
			var _word = WP_HOVER.trim(keywordarray[i]);
			var encodedKw=_word.split('/');
			var _final_word=_word,j=0;
			if(encodedKw.length>1){
				for(;j<encodedKw.length;j++){
					var temp=window.encodeURIComponent(encodedKw[j]);
					_final_word+=temp+'/';
				}
				if(j>0){
					_final_word=_final_word.substring(0,_final_word.length-1);
				}
			}
			var _link='<a href=\"'+WP_HOVER.finallyurl1+'/'+_final_word+'\">'+_word+'</a>';
			
			newstr = WP_HOVER.replaceRegex( newstr, _final_word , _link);
       }
	   activeEditor.setContent(newstr);
    },
    
	replaceRegex: function (oldstr,_word, _link ) {
		var div = document.createElement('div');
		div.innerHTML = oldstr;
		WP_HOVER.findAndReplace(_word,_link,div);
		var newstr = div.innerHTML;
		return newstr;
	},

    check1:function(){
	
		if(document.getElementById('keywordtext').style.display=='none'){
			document.getElementById('keywordtext').style.display='';
		}else {
			
			document.getElementById('keywordtext').style.display='none';
		}
    },
 
    check2:function(){
		if(WP_HOVER._replace){
			WP_HOVER._replace=false;
		}else{   
			WP_HOVER._replace=true;
		}
    },

	trim: function(_word){
		return _word.replace(/^\s+/, '').replace(/\s+$/, '');
	},

    //when replace all is checked
    keywordHover1:function(_word){
		//var keywordt=parent.window.tinyMCE.activeEditor.selection.getContent({format:text});
		_word = WP_HOVER.trim(_word);
		var activeEditor = tinyMCE.activeEditor;
		var str = activeEditor.getContent();
		var encodedKw=_word.split('/');
		var _final_word=_word,j=0;
		if(encodedKw.length>1){
				for(;j<encodedKw.length;j++){
					var temp=window.encodeURIComponent(encodedKw[j]);
					_final_word+=temp+'/';
				}
				if(j>0){
					_final_word=_final_word.substring(0,_final_word.length-1);
				}
			}
		var _link='<a href=\"'+WP_HOVER.finallyurl+'\">'+_word+'</a>';
		
		var newstr   = WP_HOVER.replaceRegex( str, _word, _link);
		
		activeEditor.setContent(newstr);   
    },

	findAndReplace: function(searchText, replacement, searchNode) {
		if (!searchText || typeof replacement === "undefined") {
			return;
		}
		var regex = typeof searchText === "string" ? new RegExp("([ ]+)*"+searchText+"([ ]+)*", "gim") : searchText, childNodes = (searchNode || document.body).childNodes, cnLength = childNodes.length, excludes = "html,head,style,title,link,meta,script,object,iframe,a,font,embed,object";
		while (cnLength--) {
		    var currentNode = childNodes[cnLength];
		    if (currentNode.nodeType === 1 &&
		        (excludes + ",").indexOf(currentNode.nodeName.toLowerCase() + ",") === -1) {
		        arguments.callee(searchText, replacement, currentNode);
		    }
		    if (currentNode.nodeType !== 3 || !regex.test(currentNode.data)) {
		        continue;
		    }
		    var parent = currentNode.parentNode, frag = function () {var html = currentNode.data.replace(regex,function(){var rep;var pre = (arguments[1])?arguments[1]:'',post = (arguments[2])?arguments[2]:'';rep =pre.replace(' ','&nbsp;')+ replacement+post.replace(' ','&nbsp;');return rep;}), wrap = document.createElement("div"), frag = document.createDocumentFragment();wrap.innerHTML = html;while (wrap.firstChild) {frag.appendChild(wrap.firstChild);}return frag;}();
		    parent.insertBefore(frag, currentNode);
		    parent.removeChild(currentNode);
    	}
	},

    keywordHover2:function(_word,_link){
		//var keywordt=parent.window.tinyMCE.activeEditor.selection.getContent({format:text});
		var activeEditor = tinyMCE.activeEditor;
		var str = activeEditor.getContent();
		var encodedKw=_word.split('/');
		var kw1='';
		if(encodedKw.length>1){
			var i=0;
			for(;i<encodedKw.length;i++){
				var temp=window.encodeURIComponent(encodedKw[i]);
				kw1=kw1+temp+'/';
			}
			kw1=kw1.substring(0,kw1.length-1);
		}else{
			kw1= _word.replace(new RegExp('[ ]',"mig"),'&nbsp;');
		}
		var _link='<a href=\"'+_link+'\">'+kw1+'</a>';
		
		var newstr   = WP_HOVER.replaceRegex( str, _word, _link);
		activeEditor.setContent(newstr);   
    },
	log: function(msg){
		if(!WP_HOVER.DEBUG){
			return;
		}
		if("undefined" == typeof console){
			console = {log: function(_msg){
				alert(_msg);
				}
			};
		}
	}
};

var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(input){var output="";var chr1,chr2,chr3,enc1,enc2,enc3,enc4;var i=0;input=Base64._utf8_encode(input);while(i<input.length){chr1=input.charCodeAt(i++);chr2=input.charCodeAt(i++);chr3=input.charCodeAt(i++);enc1=chr1>>2;enc2=((chr1&3)<<4)|(chr2>>4);enc3=((chr2&15)<<2)|(chr3>>6);enc4=chr3&63;if(isNaN(chr2)){enc3=enc4=64;}else if(isNaN(chr3)){enc4=64;}output=output+this._keyStr.charAt(enc1)+this._keyStr.charAt(enc2)+this._keyStr.charAt(enc3)+this._keyStr.charAt(enc4);}return output;},decode:function(input){var output="";var chr1,chr2,chr3;var enc1,enc2,enc3,enc4;var i=0;input=input.replace(/[^A-Za-z0-9\+\/\=]/g,"");while(i<input.length){enc1=this._keyStr.indexOf(input.charAt(i++));enc2=this._keyStr.indexOf(input.charAt(i++));enc3=this._keyStr.indexOf(input.charAt(i++));enc4=this._keyStr.indexOf(input.charAt(i++));chr1=(enc1<<2)|(enc2>>4);chr2=((enc2&15)<<4)|(enc3>>2);chr3=((enc3&3)<<6)|enc4;output=output+String.fromCharCode(chr1);if(enc3!=64){output=output+String.fromCharCode(chr2);}if(enc4!=64){output=output+String.fromCharCode(chr3);}}output=Base64._utf8_decode(output);return output;},_utf8_encode:function(string){string=string.replace(/\r\n/g,"\n");var utftext="";for(var n=0;n<string.length;n++){var c=string.charCodeAt(n);if(c<128){utftext+=String.fromCharCode(c);}else if((c>127)&&(c<2048)){utftext+=String.fromCharCode((c>>6)|192);utftext+=String.fromCharCode((c&63)|128);}else{utftext+=String.fromCharCode((c>>12)|224);utftext+=String.fromCharCode(((c>>6)&63)|128);utftext+=String.fromCharCode((c&63)|128);}}return utftext;},_utf8_decode:function(utftext){var string="";var i=0;var c=c1=c2=0;while(i<utftext.length){c=utftext.charCodeAt(i);if(c<128){string+=String.fromCharCode(c);i++;}else if((c>191)&&(c<224)){c2=utftext.charCodeAt(i+1);string+=String.fromCharCode(((c&31)<<6)|(c2&63));i+=2;}else{c2=utftext.charCodeAt(i+1);c3=utftext.charCodeAt(i+2);string+=String.fromCharCode(((c&15)<<12)|((c2&63)<<6)|(c3&63));i+=3;}}return string;}};


(function(){
    var tabView = new YAHOO.widget.TabView('demo');
})();

jQuery(document).ready(
    function(){
    	var findParent = function(_window){
    		return parent.window;
    	};
    		
		var _parent= ( "undefined" == typeof parent.window.WP_HOVER) ? parent.window.parent.window : parent.window;
		_parent.WP_HOVER.previousHoverlets= ( "undefined" == typeof _parent.WP_HOVER.previousHoverlets ) ? [] : _parent.WP_HOVER.previousHoverlets;
	  	var _word = window.decodeURIComponent(_parent.WP_HOVER.word);
		WP_HOVER.init(_word);
		WP_HOVER.dynamic(WP_HOVER.returnUrl());
    });
