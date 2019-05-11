/**
 * BLOCK: Atomic Blocks Divider
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
	dividerText: {
		type: 'string',
	},
	dividerWidth: {
		type: 'number',
	},
	dividerPaddingTop: {
		type: 'number',
	},
	dividerPaddingRight: {
		type: 'number',
	},
	dividerPaddingBottom: {
		type: 'number',
	},
	dividerPaddingLeft: {
		type: 'number',
	},
	dividerMarginTop: {
		type: 'number',
	},
	dividerMarginBottom: {
		type: 'number',
	},
	backgroundColor: {
		type: "string"
	},
	textColor: {
		type: "string"
	},
	fontSize: {
		type: 'string',
	},
};



// Register the block
registerBlockType( 'cypher/divider', {
	title: __( 'Divider', 'cypher' ),
	description: __( 'Add a divider block to wrap several blocks in a parent divider.', 'cypher' ),
	category: 'layout',
	keywords: [
		__( 'separator', 'cypher' ),
		__( 'divider', 'cypher' ),
	],

	attributes: blockAttributes,

	icon,

	// Render the block components
	edit,

	// Save the attributes and markup
	save,

} );
