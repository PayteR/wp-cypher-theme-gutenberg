<?php
/**
 * PHP version 7.1
 *
 * @author Peter "PayteR" Gašparík
 * https://github.com/PayteR
 * @copyright 2019
 *
 */

namespace Cypher\Gutenberg;


class BlockAbstract
{
    /**
     * @param $name
     * @param $data
     * @param array $deps
     */
    public static function enqueue($name, $data, $deps = [])
    {
        wp_register_script( $name, '', $deps, '', true );
        wp_enqueue_script( $name );
        wp_add_inline_script($name, $data);
    }

    /**
     * @param string $__file__ insert here __FILE__ always
     * @param string $filename
     * @return false|string
     */
    public static function javascript($__file__, $filename = 'block.js')
    {
        return file_get_contents(plugin_dir_path( $__file__ ) . $filename);
    }

    public static function isGutengergActive()
    {
        global $current_screen;
        if (!$current_screen) {
            return false;
        }

        return ( method_exists($current_screen, 'is_block_editor') && $current_screen->is_block_editor() );
    }
}
