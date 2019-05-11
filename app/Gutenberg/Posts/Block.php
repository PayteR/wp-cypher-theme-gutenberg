<?php

namespace Cypher\Gutenberg\Posts;

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
class Block extends BlockAbstract
{
    /**
     * Load all translations for our plugin from the MO file.
     */

    /**
     * Registers all block assets so that they can be enqueued through Gutenberg in
     * the corresponding context.
     *
     * Passes translations to JavaScript.
     */
    static function init()
    {
        if (!is_gutenberg_loaded()) {
            // Gutenberg is not loaded
            return;
        }

        self::enqueue('cypher/posts', self::javascript(__FILE__),
            ['wp-blocks', 'wp-i18n', 'wp-element', 'wp-components', 'wp-editor']);
    }

    static function register_block_type()
    {
        register_block_type('cypher/posts', [
            'attributes' => [
                'categories' => [
                    'type' => 'string',
                ],
                'className' => [
                    'type' => 'string',
                ],
                'postsToShow' => [
                    'type' => 'number',
                    'default' => 6,
                ],
                'displayPostDate' => [
                    'type' => 'boolean',
                    'default' => true,
                ],
                'displayPostExcerpt' => [
                    'type' => 'boolean',
                    'default' => true,
                ],
                'displayPostAuthor' => [
                    'type' => 'boolean',
                    'default' => true,
                ],
                'displayPostImage' => [
                    'type' => 'boolean',
                    'default' => true,
                ],
                'displayPostLink' => [
                    'type' => 'boolean',
                    'default' => true,
                ],
                'displayPostTitle' => [
                    'type' => 'boolean',
                    'default' => true,
                ],
                'displaySectionTitle' => [
                    'type' => 'boolean',
                    'default' => false,
                ],
                'postTitleTag' => [
                    'type' => 'string',
                    'default' => 'h3',
                ],
                'postLayout' => [
                    'type' => 'string',
                    'default' => 'grid',
                ],
                'columns' => [
                    'type' => 'number',
                    'default' => 2,
                ],
                'align' => [
                    'type' => 'string',
                    'default' => 'center',
                ],
                'width' => [
                    'type' => 'string',
                    'default' => 'wide',
                ],
                'order' => [
                    'type' => 'string',
                    'default' => 'desc',
                ],
                'orderBy' => [
                    'type' => 'string',
                    'default' => 'date',
                ],
                'imageCrop' => [
                    'type' => 'string',
                    'default' => 'landscape',
                ],
                'readMoreText' => [
                    'type' => 'string',
                    'default' => 'Continue Reading',
                ],
                'offset' => [
                    'type' => 'number',
                    'default' => 0,
                ],
                'excerptLength' => [
                    'type' => 'number',
                    'default' => 55,
                ],
                'postType' => [
                    'type' => 'string',
                    'default' => 'post',
                ],
                'sectionTag' => [
                    'type' => 'string',
                    'default' => 'section',
                ],
                'sectionTitle' => [
                    'type' => 'string',
                ],
                'sectionTitleTag' => [
                    'type' => 'string',
                    'default' => 'h2',
                ],
            ],
            'render_callback' => [Block::class, 'render'],
        ]);
    }


    static function render($attributes)
    {
        $categories = isset($attributes['categories']) ? $attributes['categories'] : '';

        /* Setup the query */
        $grid_query = new \WP_Query(array(
            'posts_per_page' => $attributes['postsToShow'],
            'post_status' => 'publish',
            'order' => $attributes['order'],
            'orderby' => $attributes['orderBy'],
            'cat' => $categories,
            'offset' => $attributes['offset'],
            'post_type' => $attributes['postType'],
            'ignore_sticky_posts' => 1,
        ));

        $post_grid_markup = '';

        /* Start the loop */
        if ($grid_query->have_posts()) {

            while ($grid_query->have_posts()) {
                $grid_query->the_post();

                /* Setup the post ID */
                $post_id = get_the_ID();

                /* Setup the featured image ID */
                $post_thumb_id = get_post_thumbnail_id($post_id);

                /* Setup the post classes */
                $post_classes = 'cypher-post-grid-item';

                /* Add sticky class */
                if (is_sticky($post_id)) {
                    $post_classes .= ' sticky';
                } else {
                    $post_classes .= null;
                }

                /* Join classes together */
                $post_classes = join(' ', get_post_class($post_classes, $post_id));

                /* Start the markup for the post */
                $post_grid_markup .= sprintf('<article id="post-%1$s" class="%2$s">', esc_attr($post_id),
                    esc_attr($post_classes));

                /* Get the featured image */
                if (isset($attributes['displayPostImage']) && $attributes['displayPostImage'] && $post_thumb_id) {

                    /* Get the orientation class */
                    if ($attributes['imageCrop'] === 'landscape') {
                        $post_thumb_size = 'cypher-post-grid-landscape';
                    } else {
                        $post_thumb_size = 'cypher-post-grid-square';
                    }

                    /* Get the alt text */
                    $alt = get_post_meta($post_thumb_id, '_wp_attachment_image_alt', true);

                    /* Output the featured image */
                    $post_grid_markup .= sprintf('<div class="cypher-post-grid-image"><a href="%1$s" rel="bookmark" aria-hidden="true" tabindex="-1">%2$s</a></div>',
                        esc_url(get_permalink($post_id)), wp_get_attachment_image($post_thumb_id, $post_thumb_size));
                }

                /* Wrap the text content */
                $post_grid_markup .= sprintf('<div class="cypher-post-grid-text">');

                $post_grid_markup .= sprintf('<header class="cypher-post-grid-header">');

                /* Get the post title */
                $title = get_the_title($post_id);

                if (!$title) {
                    $title = __('Untitled', 'cypher');
                }

                if (isset($attributes['displayPostTitle']) && $attributes['displayPostTitle']) {

                    if (isset($attributes['postTitleTag'])) {
                        $post_title_tag = $attributes['postTitleTag'];
                    } else {
                        $post_title_tag = 'h2';
                    }

                    $post_grid_markup .= sprintf('<%3$s class="cypher-post-grid-title"><a href="%1$s" rel="bookmark">%2$s</a></%3$s>',
                        esc_url(get_permalink($post_id)), esc_html($title), esc_attr($post_title_tag));
                }

                if (isset($attributes['postType']) && $attributes['postType'] === 'post') {
                    /* Wrap the byline content */
                    $post_grid_markup .= sprintf('<div class="cypher-post-grid-byline">');

                    /* Get the post author */
                    if (isset($attributes['displayPostAuthor']) && $attributes['displayPostAuthor']) {
                        $post_grid_markup .= sprintf('<div class="cypher-post-grid-author" itemprop="author" itemtype="https://schema.org/Person"><a class="cypher-text-link" href="%2$s" itemprop="url" rel="author"><span itemprop="name">%1$s</span></a></div>',
                            esc_html(get_the_author_meta('display_name', get_the_author_meta('ID'))),
                            esc_html(get_author_posts_url(get_the_author_meta('ID'))));
                    }

                    /* Get the post date */
                    if (isset($attributes['displayPostDate']) && $attributes['displayPostDate']) {
                        $post_grid_markup .= sprintf('<time datetime="%1$s" class="cypher-post-grid-date" itemprop="datePublished">%2$s</time>',
                            esc_attr(get_the_date('c', $post_id)), esc_html(get_the_date('', $post_id)));
                    }

                    /* Close the byline content */
                    $post_grid_markup .= sprintf('</div>');
                }

                /* Close the header content */
                $post_grid_markup .= sprintf('</header>');

                /* Wrap the excerpt content */
                $post_grid_markup .= sprintf('<div class="cypher-post-grid-excerpt">');

                /* Get the excerpt */

                // phpcs:ignore WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedHooknameFound, PEAR.Functions.FunctionCallSignature.ContentAfterOpenBracket
                $excerpt = apply_filters('the_excerpt', get_post_field('post_excerpt', $post_id, 'display'));

                if (empty($excerpt) && isset($attributes['excerptLength'])) {
                    // phpcs:ignore WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedHooknameFound, PEAR.Functions.FunctionCallSignature.ContentAfterOpenBracket  -- Running the_excerpt directly, Previous rule doesn't take without the_excerpt being moved up a line
                    $excerpt = apply_filters('the_excerpt', wp_trim_words(preg_replace(array(
                        '/\<figcaption>.*\<\/figcaption>/',
                        '/\[caption.*\[\/caption\]/',
                    ), '', get_the_content()), $attributes['excerptLength']));
                }

                if (!$excerpt) {
                    $excerpt = null;
                }

                if (isset($attributes['displayPostExcerpt']) && $attributes['displayPostExcerpt']) {
                    $post_grid_markup .= wp_kses_post($excerpt);
                }

                /* Get the read more link */
                if (isset($attributes['displayPostLink']) && $attributes['displayPostLink']) {
                    $post_grid_markup .= sprintf('<p><a class="cypher-post-grid-more-link cypher-text-link" href="%1$s" rel="bookmark">%2$s <span class="screen-reader-text">%3$s</span></a></p>',
                        esc_url(get_permalink($post_id)), esc_html($attributes['readMoreText']), esc_html($title));
                }

                /* Close the excerpt content */
                $post_grid_markup .= sprintf('</div>');

                /* Close the text content */
                $post_grid_markup .= sprintf('</div>');

                /* Close the post */
                $post_grid_markup .= "</article>\n";
            }

            /* Restore original post data */
            wp_reset_postdata();

            /* Build the block classes */
            $class = "cypher-post-grid featured{$attributes['postType']} align{$attributes['align']}";

            if (isset($attributes['className'])) {
                $class .= ' ' . $attributes['className'];
            }

            /* Layout orientation class */
            $grid_class = 'cypher-post-grid-items';

            if (isset($attributes['postLayout']) && 'list' === $attributes['postLayout']) {
                $grid_class .= ' is-list';
            } else {
                $grid_class .= ' is-grid';
            }

            /* Grid columns class */
            if (isset($attributes['columns']) && 'grid' === $attributes['postLayout']) {
                $grid_class .= ' columns-' . $attributes['columns'];
            }

            /* Post grid section title */
            if (isset($attributes['displaySectionTitle']) && $attributes['displaySectionTitle'] && !empty($attributes['sectionTitle'])) {
                if (isset($attributes['sectionTitleTag'])) {
                    $section_title_tag = $attributes['sectionTitleTag'];
                } else {
                    $section_title_tag = 'h2';
                }

                $section_title = '<' . esc_attr($section_title_tag) . '>' . esc_html($attributes['sectionTitle']) . '</' . esc_attr($section_title_tag) . '>';
            } else {
                $section_title = null;
            }

            /* Post grid section tag */
            if (isset($attributes['sectionTag'])) {
                $section_tag = $attributes['sectionTag'];
            } else {
                $section_tag = 'section';
            }

            /* Output the post markup */
            $block_content = sprintf('<%1$s class="%2$s">%3$s<div class="%4$s">%5$s</div></%1$s>', $section_tag,
                esc_attr($class), $section_title, esc_attr($grid_class), $post_grid_markup);

            return $block_content;
        }
    }


}

