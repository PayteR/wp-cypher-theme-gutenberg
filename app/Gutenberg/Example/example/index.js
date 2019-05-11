/**
 * BLOCK: Atomic Blocks Example
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
	examplePaddingTop: {
		type: 'number',
	},
	examplePaddingRight: {
		type: 'number',
	},
	examplePaddingBottom: {
		type: 'number',
	},
	examplePaddingLeft: {
		type: 'number',
	},
	exampleMarginTop: {
		type: 'number',
	},
	exampleMarginBottom: {
		type: 'number',
	},
	textAlign: {
		"type": "string"
	},
	backgroundColor: {
		"type": "string"
	},
	textColor: {
		"type": "string"
	},
	fontSize: {
		type: 'string',
	},
};

wp.domReady(function () {
	// wp.blocks.unregisterBlockType('core/button');
});


// Register the block
registerBlockType( 'cypher/example', {
	title: __( 'Example', 'cypher' ),
	description: __( 'Add a example block to wrap several blocks in a parent example.', 'cypher' ),
	category: 'layout',
	keywords: [
		__( 'example', 'cypher' ),
		__( 'section', 'cypher' ),
		__( 'atomic', 'cypher' ),
	],

	attributes: blockAttributes,

	// getEditWrapperProps( { exampleWidth } ) {
	// 	if ( 'left' === exampleWidth || 'right' === exampleWidth || 'full' === exampleWidth ) {
	// 		return { 'data-align': exampleWidth };
	// 	}
	// },
	icon,

	// Render the block components
	edit,

	// Save the attributes and markup
	save,

} );
