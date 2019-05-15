/**
 * BLOCK: Atomic Blocks Icon
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
	iconClassName: {
		type: "string",
		default: "fa fa-check"
	},
	iconPaddingTop: {
		type: 'number',
	},
	iconPaddingRight: {
		type: 'number',
	},
	iconPaddingBottom: {
		type: 'number',
	},
	iconPaddingLeft: {
		type: 'number',
	},
	iconMarginTop: {
		type: 'number',
	},
	iconMarginBottom: {
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
};

wp.domReady(function () {
	// wp.blocks.unregisterBlockType('core/button');
});


// Register the block
registerBlockType( 'cypher/icon', {
	title: __( 'Icon', 'cypher' ),
	description: __( 'Add a icon block to wrap several blocks in a parent icon.', 'cypher' ),
	icon: "info",
	category: 'layout',
	keywords: [
		__( 'icon', 'cypher' ),
		__( 'section', 'cypher' ),
		__( 'atomic', 'cypher' ),
	],

	attributes: blockAttributes,

	// getEditWrapperProps( { iconWidth } ) {
	// 	if ( 'left' === iconWidth || 'right' === iconWidth || 'full' === iconWidth ) {
	// 		return { 'data-align': iconWidth };
	// 	}
	// },

	// Render the block components
	edit,

	// Save the attributes and markup
	save,

} );
