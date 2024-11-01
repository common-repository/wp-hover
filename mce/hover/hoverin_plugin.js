 WP_HOVER = {};
(function() {
	// Load plugin specific language pack
	tinymce.PluginManager.requireLangPack('hover');
	tinymce.create('tinymce.plugins.AddScript', {
		/**
		 * Initializes the plugin, this will be executed after the plugin has been created.
		 * This call is done before the editor instance has finished it's initialization so use the onInit event
		 * of the editor instance to intercept that event.
		 *
		 * @param {tinymce.Editor} ed Editor instance that the plugin is initialized in.
		 * @param {string} url Absolute URL to where the plugin is located.
		 */
		init : function(ed, url) {
			var windowname = url+"/hoverin_box.php";
			ed.addCommand('mcehoverCmd', function() {
				WP_HOVER.word = parent.window.tinyMCE.activeEditor.selection.getContent({format:"text"});
				ed.windowManager.open({
					file : windowname,
					width : 520 + ed.getLang('hover.delta_width', 0)+'px',
					height : 540 + ed.getLang('hover.delta_height', 0)+'px',
					inline : 1
				}, {
					plugin_url : url 
					// Plugin absolute URL
				});//end ed.windowManager function
			});//end ed.addCommand Function

			var imgUrl = url + '/img/hover.gif';
			
			ed.addButton('version1', {
				title : 'wp-hover',
				cmd : 'mcehoverCmd',
				image : imgUrl
			});

			ed.onNodeChange.add(function(ed, cm, n) {
				cm.setActive('buttonbine', n.nodeName == 'IMG');
			});// end ed.onNodeChange

		},

		/**
		 * Creates control instances based in the incomming name. This method is normally not
		 * needed since the addButton method of the tinymce.Editor class is a more easy way of adding buttons
		 * but you sometimes need to create more complex controls like listboxes, split buttons etc then this
		 * method can be used to create those.
		 *
		 * @param {String} n Name of the control to create.
		 * @param {tinymce.ControlManager} cm Control manager to use inorder to create new control.
		 * @return {tinymce.ui.Control} New control instance or null if no control was created.
		 */
		createControl : function(n, cm) {
			return null;
		},

		/**
		 * Returns information about the plugin as a name/value array.
		 * The current keys are longname, author, authorurl, infourl and version.
		 *
		 * @return {Object} Name/value array containing information about the plugin.
		 */
		getInfo : function() {
			return {
				longname : "Hover Technology",
				author : 'hover.in',
				authorurl : 'http://hover.in/',
				infourl : 'http://developers.hover.in/blog',
				version : "1.1.0"
			};
		}
	});

	// Register plugin
	tinymce.PluginManager.add('version1', tinymce.plugins.AddScript);
})();
