<?php
    include_once($_SERVER['DOCUMENT_ROOT']."wordpress/wp-config.php");
	include_once($_SERVER['DOCUMENT_ROOT']."wordpress/wp-load.php");
	include_once($_SERVER['DOCUMENT_ROOT']."wordpress/wp-includes/wp-db.php");
	function check(){
		global $wpdb, $tableposts;
		$table_name = $wpdb->prefix . "toggle1";
		$insert="select * from ".$table_name;
    
        $info=$wpdb->get_row($insert,ARRAY_A);
		$time_table1=$info['site'];
		if($time_table1!="false")
			return true;
		else
			return false;
}
?>

