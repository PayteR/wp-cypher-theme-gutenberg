/**
 * WordPress dependencies
 */
const {__} = wp.i18n;

/**
 * Internal dependencies
 */
import edit from './edit';
import save from './save';

wp.domReady(function () {
	wp.blocks.unregisterBlockType('core/timeline');
});


// Register the block
wp.blocks.registerBlockType('cypher/timeline', {
	title: __('Timeline', 'cypher'),
	description: __('Add a timeline block to wrap several blocks in a parent timeline.', 'cypher'),
	category: "layout",
	icon: "backup",
	attributes: {
		timelineItems: {
			type: "number",
			default: 2
		},
		headerBefore: {
			type: "string"
		},
		headerAfter: {
			type: "string"
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
		centered: {
			type: "boolean",
		},
		timelinePaddingTop: {
			type: 'number',
		},
		timelinePaddingRight: {
			type: 'number',
		},
		timelinePaddingBottom: {
			type: 'number',
		},
		timelinePaddingLeft: {
			type: 'number',
		},
		timelineMarginTop: {
			type: 'number',
		},
		timelineMarginBottom: {
			type: 'number',
		},
	},
	supports: {
		align: [ ],
		html: false,
	},
	keywords: [
		__('timeline', 'cypher'),
		__('section', 'cypher'),
		__('atomic', 'cypher'),
	],
	edit,
	save
});


