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


// Register the block
wp.blocks.registerBlockType('cypher/column', {
	title: __('Column', 'cypher'),
	description: __('Add a columns block to wrap several blocks in a parent columns.', 'cypher'),
	parent: [ 'cypher/columns' ],
	category: "common",
	attributes: {
		verticalAlignment: {
			type: "string"
		},
		gridSpace: {
			type: "number"
		},
		gridOffset: {
			type: "number"
		},
		isNarrow: {
			type: "boolean"
		}
	},
	supports: {
		align: [ ],
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
