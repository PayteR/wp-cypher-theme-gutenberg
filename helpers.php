<?php

/**
 * Check if gutenberg editor si currently loaded and visible
 * It must be called in admin after 'enqueue_block_editor_assets' action
 *
 * @return bool
 */
if(!function_exists('is_gutenberg_loaded')) {
    function is_gutenberg_loaded()
    {
        if(!is_admin() || !function_exists('get_current_screen')) {
            return false;
        }

        global $current_screen;

        if ( method_exists( $current_screen, 'is_block_editor' ) &&
            $current_screen->is_block_editor()
        ) {
            // Gutenberg page on 5+.
            return true;
        }

        return false;
    }
}

