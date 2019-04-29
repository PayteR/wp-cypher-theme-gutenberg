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
        add_action( 'enqueue_block_editor_assets', [Accordion\Block::class, 'init'] );
    }

    /**
     * Theme customizer
     */
    public static function button()
    {
        add_action( 'enqueue_block_editor_assets', [Button\Block::class, 'init'] );
    }

    /**
     * Theme customizer
     */
    public static function container()
    {
        add_action( 'enqueue_block_editor_assets', [Container\Block::class, 'init'] );
    }

    /**
     * Theme customizer
     */
    public static function columns()
    {
        add_action( 'enqueue_block_editor_assets', [Columns\Block::class, 'init'] );
    }

    /**
     * Theme customizer
     */
    public static function hero()
    {
        add_action( 'enqueue_block_editor_assets', [Hero\Block::class, 'init'] );
    }
}
