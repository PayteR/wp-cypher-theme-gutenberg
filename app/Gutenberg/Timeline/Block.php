<?php

namespace Cypher\Gutenberg\Timeline;

use Cypher\Gutenberg\BlockAbstract;

/**
 * Exists just to get absolute path in config for this package
 *
 * @author Peter "PayteR" Gašparík
 * https://github.com/PayteR
 * @copyright 2019
 *
 * Class Cypher
 * @package Cypher
 */
class Block extends BlockAbstract {
    /**
     * Load all translations for our plugin from the MO file.
     */

    /**
     * Registers all block assets so that they can be enqueued through Gutenberg in
     * the corresponding context.
     *
     * Passes translations to JavaScript.
     */
    static function init() {
        if ( !is_gutenberg_loaded() ) {
            // Gutenberg is not loaded
            return;
        }

        self::enqueue(
            'cypher/timeline',
            self::javascript(__FILE__),
            ['wp-blocks', 'wp-i18n', 'wp-element', 'wp-data', 'wp-compose', 'wp-components', 'wp-editor']
        );

        register_block_type( 'cypher/timeline', array(
            'editor_script' => 'cypher/timeline',
        ) );
    }
}

