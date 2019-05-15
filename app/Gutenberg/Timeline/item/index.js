/**
 * WordPress dependencies
 */
const {__} = wp.i18n;

/**
 * Internal dependencies
 */
import edit from './edit';
import save from './save';


// Register the block
wp.blocks.registerBlockType('cypher/timeline-item', {
	title: __('Item', 'cypher'),
	description: __('Add a timeline block to wrap several blocks in a parent timeline.', 'cypher'),
	parent: [ 'cypher/timeline' ],
	icon: "backup",
	category: "common",
	attributes: {
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
		position: {
			type: "string",
			default: "is-left"
		},
	},
	supports: {
		align: [ ],
	},
	keywords: [
		__('timeline', 'cypher'),
		__('section', 'cypher'),
		__('atomic', 'cypher'),
	],
	edit,
	save
});
