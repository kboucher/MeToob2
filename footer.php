﻿    </div>    <footer class="clearfix">        <div id="footer-wrap">            <div class="copyright">&copy; <?php echo date("Y"); ?> <a href="http://www.divitreemedia.com/">DiviTree Media</a>. All rights reserved.</div>            <nav id="FooterNavigation">                <?php wp_nav_menu( array( 'theme_location' => 'footer-menu' ) ); ?>            </nav>        </div>    </footer></div><div id="script-block">    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>    <script>window.jQuery || document.write('<script src="<?php echo get_bloginfo( 'url' ); ?>/wp-content/themes/metoob2/js/jquery-1.7.1.min.js"><\/script>')</script>    <script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.16/jquery-ui.min.js"></script>    <script src="<?php echo get_bloginfo( 'url' ); ?>/wp-content/themes/metoob2/js/json2.js"></script>    <script src="<?php echo get_bloginfo( 'url' ); ?>/wp-content/themes/metoob2/js/utils.debug.js"></script>    <script src="<?php echo get_bloginfo( 'url' ); ?>/wp-content/themes/metoob2/js/metoob.debug.js"></script>    <script src="<?php echo get_bloginfo( 'url' ); ?>/wp-content/themes/metoob2/js/plugins.js"></script>    <!-- end scripts -->    <!-- Asynchronous Google Analytics snippet. Change UA-XXXXX-X to be your site's ID.    mathiasbynens.be/notes/async-analytics-snippet -->    <!--<script>        var _gaq=[['_setAccount','UA-XXXXX-X'],['_trackPageview']];        (function(d,t){var g=d.createElement(t),s=d.getElementsByTagName(t)[0];            g.src=('https:'==location.protocol?'//ssl':'//www')+'.google-analytics.com/ga.js';            s.parentNode.insertBefore(g,s)}(document,'script'));    </script>--></div><?php	wp_footer();?></body></html>