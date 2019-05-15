/**
 * BLOCK: Atomic Blocks List
 */

// Import block dependencies and components
import edit from './edit';
import save from './save';
import icon from './icon';
import transforms from './transforms';

// Components
const { __ } = wp.i18n;

// Register block
const { registerBlockType } = wp.blocks;

const blockAttributes = {
	listColumnsCount: {
		type: 'number',
		default: 1
	},
	listPaddingTop: {
		type: 'number',
	},
	listPaddingRight: {
		type: 'number',
	},
	listPaddingBottom: {
		type: 'number',
	},
	listPaddingLeft: {
		type: 'number',
	},
	listMarginTop: {
		type: 'number',
	},
	listMarginBottom: {
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
	ordered: {
		type: "boolean",
		default: false
	},
	values: {
		type: "string",
		source: "html",
		selector: "ol,ul",
		multiline: "li",
		default: ""
	},
};



// Register the block
registerBlockType( 'cypher/list', {
	title: __( 'List Cypher', 'cypher' ),
	description: __( 'Create a bulleted or numbered list.', 'cypher' ),
	category: 'common',
	keywords: [ __( 'bullet list' ), __( 'ordered list' ), __( 'numbered list' ) ],

	transforms,

	attributes: blockAttributes,

	merge( attributes, attributesToMerge ) {
		const { values } = attributesToMerge;

		if ( ! values || values === '<li></li>' ) {
			return attributes;
		}

		return {
			...attributes,
			values: attributes.values + values,
		};
	},

	// Render the block components
	edit,

	// Save the attributes and markup
	save,

	icon,

} );
