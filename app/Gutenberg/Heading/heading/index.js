/**
 * BLOCK: Atomic Blocks heading
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
	headingMarginTop: {
		type: 'number',
	},
	headingMarginBottom: {
		type: 'number',
	},
	content: {
		type: "string",
		source: "html",
		selector: "h1,h2,h3,h4,h5,h6",
		default: ""
	},
	level: {
		type: "number",
		default: 2
	},
	placeholder: {
		type: "string"
	},
	textAlign: {
		type: "string"
	},
	fontFamily: {
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
	// wp.blocks.unregisterBlockType('core/heading');
});

// Register the block
registerBlockType( 'cypher/heading', {
	title: __( 'Heading Cypher', 'cypher' ),
	description: __( 'Add a heading block to wrap several blocks in a parent heading.', 'cypher' ),
	category: 'common',
	keywords: [
		__( 'heading', 'cypher' ),
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
