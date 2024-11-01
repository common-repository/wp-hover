<?php

	if(file_exists('../../../../../wp-config.php')){
		require( '../../../../../wp-config.php' );
	}
/**
 * This file will create a button GUI to create a hoverlet, when you click on the button inside visual tabs.
 * This program will give a GUI which will consist of three buttons onclick, onhover
 * and on right click. It will also have two tabs 
 * it also have two tabs myhoverlet and community tab.
 * when you click on my hoverlet you will see the message 'to register'
 * In the second tab, when you click you will be seeing with some related aricle 
 * You have to select any of the article and then you will see the link on your text. 
 * <p>
 * Input: the user has to select some text and then click on the button
 * which will give user to select some pictures as what he wants to see in hoverlets
 * <p>
 * Output: It will create a hoverlet when you post the article.
 * <p>
 * @author hover.
 * 
 */
?>         
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>    
  <head> 
	  <script src="jquery.js" type="text/javascript"></script>
    <script src="main.js" type="text/javascript"></script>
   	<meta http-equiv="content-type" content="text/html;charset=utf-8"/>      
    <title>wp-hover</title>             
    <link rel="stylesheet" type="text/css" href="css/wphover.css"/>             
	  <script type="text/javascript" src="js/wphover.js"></script>             
	  <script type="text/javascript" src="js/wpfunction.js"></script>
	  <script type="text/javascript">
	  WP_HOVER.blogname= '<?php echo get_bloginfo('url');?>';
	  </script>                               
  </head>         
<body class="yui-skin-sam">  
  <div id ="step1">
	  <h5>
	    <img src="img/keyword.png" style="margin-left:10px;margin-right:10px"/>Step1 : Selected Keyword 
	  </h5>  
	  <div id="getcontent">Add content for Keywords : 
	    <input type="text" id="selectedword"/> 
		  <input type="button" id="refresh" value="refresh" onclick="WP_HOVER.refresh_kw();"/>
		  <a class="tooltip" title="Enter a tag for getting related content"><img src="img/help.png"/></a>
	  </div>
	  <br>
	   
	   <div id="checkbox1">
	     <input type="checkbox" name="mybox" value="2" onclick="WP_HOVER.check1();"/>
		 <div id="check2">Add additional keywords
		   <input type="text" id="keywordtext" style="display:none" size="30"/>
		 </div>
	     <input type="checkbox" name="mybox" value="1" onclick="WP_HOVER.check2();"/>
		 <div id="check1">Tag all post occurences</div>
	   </div>
       </div><br>
    	 <div id="newform">

			<h5>
		       <img src="img/event-icon.png" style="margin-left:10px;margin-right:10px"/>Step2 : Choose an Event 
			   <a class="tooltip" title="Whether hoverlets should appear on click or on hover"><img src="img/help.png"/></a>
		    </h5>	       

      		<div id="radiocontent">	 	           
      		   Choose when an hoverlet should show up        
      		</div>	     

      		<div id="radiooption">
				<input type="radio" name="r1" value="onhover" style="margin-left:10px;" checked="true"/>On-hover 	       
				<input type="radio" name="r1" value="onclick" style="margin-left:83px;"/>On-click 	       
      		</div>
    	</div>  
    	<br>  
    	<div id="mainform">
			<h5>
				<img src="img/window.png" style="margin-left:10px;margin-right:10px"/>Step3 : Choose content for hoverlets 
				<a class="tooltip" title="Click on categories to show related hoverlets"> <img src="img/help.png"/></a>
			</h5>	     
      		
			<div id="hoverletcontent">
				Click on categories to show related content	     
      		</div>	     
      		
			<div id="dialogContainer">	        
        		<div id='hd1' class="hd"></div>	        
        		<div class="bd">	           
					<div id="demo" class="yui-navset">  	             
						<ul class="yui-nav"> 
							<li class="selected">
                				<a href="#tabrich3" onClick="WP_HOVER.hideRefresh();">Community</a>
							</li>  	  
              				
							<li >
                				<a href="#tabrich2" onClick="WP_HOVER.hideRefresh();">About</a>
							</li>	
							<li >
								<a href="#tabrich4" onClick="WP_HOVER.hideRefresh();">Used Hoverlets</a>
							</li>	           			           
            			</ul>             	             
            			<div class="yui-content"> 
							<div id="tabrich3">		                  
								<div id="wrapper1">
                                                       
		          				   
								</div>	                
               				</div>  		 		              
           					<div id="tabrich2">wp-hover is a wordpress plugin that is provided by 
								<a href="http://hover.in">hover.in</a>. 
								<div align="center"><br><br>
									<a href="http://hover.in">
										<img src="http://cluster.hover.in/img/logo/logo.gif" style="border:0px;text-decoration:none;"/>
										</a>
								</div><br><br>
It is world’s first publisher driven in-text Content & Ad delivery platform.<br><br>Till date, in-text technology has been primarily used only to display contextual ads – mostly automated without any publisher control. However, with hover.in, publishers can create and customize the content appearing within the hover bubble (hoverlet). <br><br>A hoverlet is what we call a <i>hovering widget</i>. To create your own hoverlets, more themes, features & advanced statistics on usage - sign up for a beta account at <a href="http://hover.in">hover.in</a>. <BR><BR> We would also love to hear your feedback, feature requests as well as bug reports. You get get in touch with us at <a href="mailto:wordpress@hover.in"> wordpress@hover.in</a>, follow us <a href="http://twitter.com/hoverin">on twitter</a>, and visit <a href="http://hover.in/category/blog/">the hover.in blog</a> or the <a href="http://developers.hover.in">developer blog</a> for more exciting updates from the hover.in team.
              			</div>
						<div id="tabrich4">		                  
							<div id="used_hoverlets">
								This area will show recently used hoverlets while composing this post.<BR>
							</div>
                		</div>  		 		                      
       				</div>  	          
           		</div>	           	       
       		</div>      
       	</div>   
	</div>

   <div id="previewhoverlet" style="display:none;height:350px"> </div>  
	<div id="usehide">  
      <input type="button" id="use" value="Use This" onclick="WP_HOVER.createHtmlLink();" style="display:none"/>  
      <input type="button" 
		id='hide' 
		value="Hide This" 
		onClick="WP_HOVER.hideRefresh();document.getElementById ('previewhoverlet').style.display='none'; document.getElementById('mainform').style.display='';document.getElementById('helpbutton').style.display='none';document.getElementById('newform').style.display='';this.style.display='none';document.getElementById('use').style.display='none';"  
		style="display:none"/>                  
		<br>
	</div>
	<div id="helpbutton" style="display:none">
	<br>
	<div id="help1">
		Click on Use This to get hoverlet or click on Hide This to go previous page</div>
	</div>
	  <script>
	  
	 
	  </script>
  </body>
</html>
<?php ?>
