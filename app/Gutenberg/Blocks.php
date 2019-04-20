<?php

namespace Cypher\Gutenberg;


/**
 * PHP version 7.1
 *
 * @author Peter "PayteR" Gašparík
 * https://github.com/PayteR
 * @copyright 2019
 *
 */

class Blocks
{
    /**
     * Theme customizer
     */
    public static function accordion()
    {
        add_action( 'enqueue_block_editor_assets', [\Cypher\Gutenberg\Accordion\Block::class, 'init'] );
    }
    /**
     * Theme customizer
     */
    public static function container()
    {
        add_action( 'enqueue_block_editor_assets', [\Cypher\Gutenberg\Container\Block::class, 'init'] );
    }
    /**
     * Theme customizer
     */
    public static function hero()
    {
        add_action( 'enqueue_block_editor_assets', [\Cypher\Gutenberg\Hero\Block::class, 'init'] );
    }
}
