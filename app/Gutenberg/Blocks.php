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
    public static function heading()
    {
        add_action( 'enqueue_block_editor_assets', [Heading\Block::class, 'init'] );
    }

    /**
     * Theme customizer
     */
    public static function list()
    {
        add_action( 'enqueue_block_editor_assets', [ListC\Block::class, 'init'] );
    }

    /**
     * Theme customizer
     */
    public static function divider()
    {
        add_action( 'enqueue_block_editor_assets', [Divider\Block::class, 'init'] );
    }

    /**
     * Theme customizer
     */
    public static function icon()
    {
        add_action( 'enqueue_block_editor_assets', [Icon\Block::class, 'init'] );
    }

    /**
     * Theme customizer
     */
    public static function posts()
    {
        add_action( 'enqueue_block_editor_assets', [Posts\Block::class, 'init'] );
        add_action( 'init', [Posts\Block::class, 'register_block_type'] );
    }

    /**
     * Theme customizer
     */
    public static function hero()
    {
        add_action( 'enqueue_block_editor_assets', [Hero\Block::class, 'init'] );
    }
}
