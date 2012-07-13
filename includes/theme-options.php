<?php

//Global options setup
add_action('init','metoob_global_options');
function metoob_global_options(){
	// Populate options in array for use in theme
	global $metoob_options;
	$metoob_options = get_option('metoob_options');
}

add_action('admin_menu', 'theme_admin_add_page');
function theme_admin_add_page() {
	add_theme_page('MeToob Settings Page', 'MeToob Settings', 'manage_options', 'meToobOptions', 'metoob_options_page');
}

function metoob_options_page() {
    echo "<h2>MeToob Settings</h2>";
    echo "<form id=\"MeToobOptionsForm\" action=\"/\">";
    echo "<fieldset>";
    echo "<label for=\"\">";
    echo "</fieldset>";
    echo "</form>";
}


//Stylesheets Reader
/*
$alt_stylesheet_path = TEMPLATEPATH . '/styles/';
$alt_stylesheets = array();

if ( is_dir($alt_stylesheet_path) ) {
    if ($alt_stylesheet_dir == opendir($alt_stylesheet_path) ) { 
        while ( ($alt_stylesheet_file = readdir($alt_stylesheet_dir)) !== false ) {
            if(stristr($alt_stylesheet_file, ".css") !== false) {
                $alt_stylesheets[] = $alt_stylesheet_file;
            }
        }    
    }
}

$options[] = array( "name" => "Theme Stylesheet",
					"desc" => "Select your themes alternative color scheme.",
					"id" => $shortname."_alt_stylesheet",
					"std" => "default.css",
					"type" => "select",
					"options" => $alt_stylesheets);
*/
?>
