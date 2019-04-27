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
     * Will clean up blocks
     * @param array $cypher_allowed_block_types
     */
//    public static function allowed_blocks($cypher_allowed_block_types = [])
//    {
//        $cypher_allowed_block_types = array_merge($cypher_allowed_block_types, [
//            'core/paragraph',
//            'core/image',
//            'core/heading',
//            'core/list',
//            'core/quote',
//            'core/heading',
//            'core/file',
//            'core/video',
//            'core/table',
//            'core/freeform',
//            'core/html',
//            'core/pullquote',
//            'core/media-text',
//            'core/more',
//            'core/nextpage',
//            'core/separator',
//            'core/spacer',
//            'core/shortcode',
//            'core/archives',
//            'core/categories',
//            'core/latest-comments',
//            'core/latest-posts',
//            'core/embed',
//            'core-embed/twitter',
//            'core-embed/youtube',
//            'core-embed/facebook',
//            'core-embed/instagram',
//            'core-embed/wordpress',
//            'core-embed/soundcloud',
//            'core-embed/spotify',
//            'core-embed/flickr',
//            'core-embed/vimeo',
//        ]);
//
//        add_filter( 'allowed_block_types', function($block_types) use ($cypher_allowed_block_types) {
//            if(is_array($block_types)) {
//                $cypher_allowed_block_types = $block_types;
//            }
//            return $cypher_allowed_block_types;
//        } );
//    }


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
