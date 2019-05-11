/**
 * BLOCK: Atomic Blocks Container
 */

// Import block dependencies and components
import edit from './edit';
import save from './save';

// Components
const { __ } = wp.i18n;

// Register block
const { registerBlockType } = wp.blocks;

const blockAttributes = {
	containerPaddingTop: {
		type: 'number',
	},
	containerPaddingRight: {
		type: 'number',
	},
	containerPaddingBottom: {
		type: 'number',
	},
	containerPaddingLeft: {
		type: 'number',
	},
	containerMarginTop: {
		type: 'number',
	},
	containerMarginBottom: {
		type: 'number',
	},
	fontFamily: {
		type: 'string',
	},
	containerWidth: {
		type: 'string',
		default: 'center',
	},
	containerMaxWidth: {
		type: 'number',
	},
	containerImgURL: {
		type: 'string',
		source: 'attribute',
		attribute: 'src',
		selector: 'img',
	},
	containerImgID: {
		type: 'number',
	},
	containerImgFit: {
		type: 'string',
		default: 'cover',
	},
	containerImgAlt: {
		type: 'string',
		source: 'attribute',
		attribute: 'alt',
		selector: 'img',
	},
	containerDimRatio: {
		type: 'number',
		default: 100,
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



// Register the block
registerBlockType( 'cypher/container', {
	title: __( 'Container', 'cypher' ),
	description: __( 'Add a container block to wrap several blocks in a parent container.', 'cypher' ),
	icon: 'editor-table',
	category: 'layout',
	keywords: [
		__( 'container', 'cypher' ),
		__( 'section', 'cypher' ),
		__( 'atomic', 'cypher' ),
	],

	getEditWrapperProps( { containerWidth } ) {
		if ( 'wide' === containerWidth || 'full' === containerWidth ) {
			return { 'data-align': containerWidth };
		}
	},

	attributes: blockAttributes,

	// getEditWrapperProps( { containerWidth } ) {
	// 	if ( 'left' === containerWidth || 'right' === containerWidth || 'full' === containerWidth ) {
	// 		return { 'data-align': containerWidth };
	// 	}
	// },

	// Render the block components
	edit,

	// Save the attributes and markup
	save,

} );
