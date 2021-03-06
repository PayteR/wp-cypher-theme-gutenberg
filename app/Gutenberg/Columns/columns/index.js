/**
 * WordPress dependencies
 */
const {__} = wp.i18n;

/**
 * Internal dependencies
 */
import edit from './edit';
import icon from './icon';
import save from './save';

wp.domReady(function () {
	wp.blocks.unregisterBlockType('core/columns');
});


// Register the block
wp.blocks.registerBlockType('cypher/columns', {
	title: __('Columns', 'cypher'),
	description: __('Add a columns block to wrap several blocks in a parent columns.', 'cypher'),
	category: "layout",
	attributes: {
		columns: {
			type: "number",
			default: 2
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
		verticalAlignment: {
			type: "string"
		},
		breakpoint: {
			type: "string",
		},
		gap: {
			type: "number",
		},
		vcentered: {
			type: "boolean",
		},
		centered: {
			type: "boolean",
		},
		multiline: {
			type: "boolean",
		},
		columnsPaddingTop: {
			type: 'number',
		},
		columnsPaddingRight: {
			type: 'number',
		},
		columnsPaddingBottom: {
			type: 'number',
		},
		columnsPaddingLeft: {
			type: 'number',
		},
		columnsMarginTop: {
			type: 'number',
		},
		columnsMarginBottom: {
			type: 'number',
		},
	},
	supports: {
		align: [ ],
		html: false,
	},
	keywords: [
		__('columns', 'cypher'),
		__('section', 'cypher'),
		__('atomic', 'cypher'),
	],
	icon,
	edit,
	save
});


