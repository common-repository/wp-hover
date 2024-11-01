<?php
/* Plugin Name:wp-hover
* Plugin URI: http://hover.in
* Description:wp-hover makes it easy to add images, videos, maps, media, and other rich hoverlets, to keep readers engaged on your blog.
* Author: <a href="http://hover.in">hover.in</a>
* version: 0.1.3
* @email: support@hover.in          
*/
/* This class defines the two global variable $plug and $ table_name.
* $plug defines an array.
*/

class AddScript {
	var $plug = array();
   	var $table_name = "wp_hoverin";
	var $plug1 = array("abc");
	var $wpversion;

	var $folder = '/wp-content/plugins/wp-hover';
	var $fullfolderurl ;
	
	//this is a constructor and is called when the object of the class is created.
   	function __construct(){

		global $wp_db_version;
		
		if ( $wp_db_version > 6124 ) {
			$this->wpversion = 2.5;
		}else{
			$this->wpversion = 2.1;
		}

		$this->fullfolderurl = get_bloginfo('wpurl') . $this->folder . '/';

		if ( $this->wpversion >= 2.5 ) {			add_filter( 'mce_external_plugins', array(&$this, 'mce_external_plugins'), 999 );			add_filter( 'mce_buttons', array(&$this, 'mce_buttons'), 999 );
		}
	}
	
	// TinyMCE integration hooks
	function mce_external_plugins( $plugins ) {
		// WordPress 2.5
		$plugins['version1'] = get_bloginfo('wpurl') . $this->folder . '/mce/hover/hoverin_plugin.js';
		return $plugins;
	}
	function mce_buttons($buttons) {
		array_push($buttons,'version1');
		return $buttons;
	}
	
	function mce_plugins($plugins) {
		// WordPress 2.1 less than 2.5
		array_push($plugins, 'version1');
		return $plugins;
	}
	
   	function hover_footer(){
	   	$getdata = "select * from wp_hoverin";
	   	global $wpdb;
   		$info = $wpdb->get_row($getdata,ARRAY_A);
		$event = $info['event'];
   		$theme=$info['theme'];
   		$linkstyle=urlencode($info['linkstyle']);
   		$check=$info['radio'];
    	$domain ="start.hover.in";
        $type=$info['type'];
        if($event=="false"){
	        if($type=="starter"){
	            echo "<script src=\"http://". $domain. "/script\" id=\"hi_client\" type=\"text/javascript\"></script>";
            }else{
	            echo "<script src=\"http://". $domain."/script\" id=\"hi_client\" type=\"text/javascript\"></script>";
            }
       }else{
	       if($type=='starter'){
	           echo "<script id=\"hi_client\" src=\"http://". $domain . "/script.yaws?DBG=1&theme=".$theme."&linkstyle=".$linkstyle."\"
type=\"text/javascript\"></script>";
           }else
           		echo "<script src=\"http://". $domain ."/script\" id=\"hi_client\" type=\"text/javascript\"></script>";
       }
       echo "\n";
   	}

   	function wp_hoverin_init(){
   	}
	/* 
	 * This function will dynamically generate options inside select html element after checking the value of event.
         * Inthis function it will also check for wp_hoverin table if it is there it will write the data into 
         * that if it is not there it will create the table of name wp_hoverin.
	 */
  	
	function wp_hoverin_activate(){
    	}

	function wp_hoverin_adminMenu(){
	}

	function write_edit_config(){
    	$insert="select * from ".$table_name;
    	$info=$wpdb->get_row($insert,ARRAY_A);
    	$time_table1=$info['site'];
    	if($time_table1!==""){
			echo "<script type=\"javascript\">var name=false;var email=false;var site=false;</script>";
    	}else{
			echo "<script type=\"javascript\">var name=true;var email=true;var site=true;</script>";
    		}
	}
		// this will print the html form and inside that form it will create textfield.
	function print_form(){
?>
		<form name="configform" method="post" action="<?php echo $_SERVER['REQUEST_URI'];?>">
	      <h1>Plugin Configuration</h1>
	      <div class="formLabel">Max Hover Keywords&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	
    		<input type="text" name="event" class="formSelect" style="padding: 2px; width: 170px; font-size: 11px;" value="<?php echo $event;?>">
	 	  </div><br/>	
	      <div class="formLabel">Theme &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
	
<?php
	}
	
	function print_select(){
?>
		<select name="theme" id="hi_list_theme" class="formSelect" style="padding: 2px; width: 170px; font-size: 11px;" type="text">
<?php 
	}
	
	function close_print_select(){
?>
		</select>
	  </div><br/>
      <div class="formLabel">Link Style &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
	    <select name="linkstyle" id="hi_list_linkstyle" class="formSelect" style="padding: 2px; width: 170px; font-size: 11px;" type="text">
<?php
	}
	function close_form(){
?>
		</select>
      </div><br>
	       
		&nbsp;&nbsp;&nbsp;<input type="radio" name="radio" value="enabled" checked="true"> Enable
		&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="radio" name="radio" value="disabled"> Disable
									 
		<br><br><input type="submit" value="Save">
	</form>

<?php
	}
	
} //class close
	$obj = &new AddScript;
	add_action('wp_footer', array($obj, 'hover_footer'));
	add_action('admin_init',array($obj, 'wp_hoverin_init'));
	add_option('map_mce_plugins' , array($obj,$map_mce_plugins), '','no');
?>
