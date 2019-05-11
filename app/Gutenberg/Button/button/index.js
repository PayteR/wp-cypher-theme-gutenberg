/**
 * BLOCK: Atomic Blocks button
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
	buttonMarginLeft: {
		type: 'number',
	},
	buttonMarginRight: {
		type: 'number',
	},
	buttonMarginTop: {
		type: 'number',
	},
	buttonMarginBottom: {
		type: 'number',
	},
	buttonAlign: {
		type: 'string',
		default: 'left',
	},
	textAlign: {
		type: "string"
	},
	buttonColor: {
		type: "string",
		default: 'is-primary',
	},
	buttonOutlined: {
		type: "boolean",
		default: false,
	},
	buttonInverted: {
		type: "boolean",
		default: false,
	},
	buttonRounded: {
		type: "boolean",
		default: false,
	},
	buttonDisabled: {
		type: "boolean",
		default: false,
	},
	buttonSize: {
		type: "string",
	},
	iconBeforeClass: {
		type: "string",
	},
	iconAfterClass: {
		type: "string",
	},
	textColor: {
		type: "string"
	},
	fontSize: {
		type: 'string',
	},
	buttonText: {
		type: 'string',
	},
	buttonUrl: {
		type: 'string',
	},
};

wp.domReady(function () {
	wp.blocks.unregisterBlockType('core/button');
});

// Register the block
registerBlockType( 'cypher/button', {
	title: __( 'Button', 'cypher' ),
	description: __( 'Add a button block to wrap several blocks in a parent button.', 'cypher' ),
	category: 'layout',
	keywords: [
		__( 'button', 'cypher' ),
		__( 'section', 'cypher' ),
		__( 'atomic', 'cypher' ),
	],

	attributes: blockAttributes,

	// Render the block components
	edit,

	// Save the attributes and markup
	save,

	icon,

} );
