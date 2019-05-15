/**
 * BLOCK: Atomic Blocks Media
 */

// Import block dependencies and components
import edit from './edit';
import save from './save';
import icon from './icon';

// Components
const { __ } = wp.i18n;

// Register block
const { registerBlockType } = wp.blocks;

const blockAttributes = {
	mediaPaddingTop: {
		type: 'number',
	},
	mediaPaddingRight: {
		type: 'number',
	},
	mediaPaddingBottom: {
		type: 'number',
	},
	mediaPaddingLeft: {
		type: 'number',
	},
	mediaMarginTop: {
		type: 'number',
	},
	mediaMarginBottom: {
		type: 'number',
	},
	textAlign: {
		type: "string"
	},
	backgroundColor: {
		type: "string"
	},
	customBackgroundColor: {
		"type": "string"
	},
	textColor: {
		type: "string"
	},
	customTextColor: {
		"type": "string"
	},
	fontSize: {
		type: 'string',
	},
	customFontSize: {
		"type": "number"
	},
	iconLeftClass: {
		type: "string",
	},
	iconLeftFontSize: {
		type: "object"
	},
	iconLeftColor: {
		type: "string"
	},
	iconRightClass: {
		type: "string",
	},
	iconRightFontSize: {
		type: "object"
	},
	iconRightColor: {
		type: "string"
	},
};

wp.domReady(function () {
	wp.blocks.unregisterBlockType('core/media-text');
});


// Register the block
registerBlockType( 'cypher/media', {
	title: __( 'Media', 'cypher' ),
	description: __( 'Add a media block to wrap several blocks in a parent media.', 'cypher' ),
	category: 'layout',
	keywords: [
		__( 'media', 'cypher' ),
		__( 'section', 'cypher' ),
		__( 'atomic', 'cypher' ),
	],

	attributes: blockAttributes,

	// getEditWrapperProps( { mediaWidth } ) {
	// 	if ( 'left' === mediaWidth || 'right' === mediaWidth || 'full' === mediaWidth ) {
	// 		return { 'data-align': mediaWidth };
	// 	}
	// },
	icon,

	// Render the block components
	edit,

	// Save the attributes and markup
	save,

} );
