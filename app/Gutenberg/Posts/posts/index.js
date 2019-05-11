/**
 * BLOCK: Cypher Posts
 */

// Import block dependencies and components
import edit from './edit';
import icon from './icon';

// Components
const { __ } = wp.i18n;

// Register block
const { registerBlockType } = wp.blocks;

wp.domReady(function () {
	// wp.blocks.unregisterBlockType('core/button');
});


// Register the block
registerBlockType( 'cypher/posts', {
	title: __( 'Posts', 'cypher' ),
	description: __( 'Add a posts block to wrap several blocks in a parent posts.', 'cypher' ),
	category: 'layout',
	keywords: [
		__( 'posts', 'cypher' ),
		__( 'section', 'cypher' ),
		__( 'atomic', 'cypher' ),
	],

	icon,

	edit,

	// Render via PHP
	save() {
		return null;
	},

} );
