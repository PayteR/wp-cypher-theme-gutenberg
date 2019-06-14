/**
 * BLOCK: Atomic Blocks Accordion Block
 */

// Import block dependencies and components
import Inspector from './components/inspector';
import Accordion from './components/accordion';
const { slugify } = require('./../utils/utils');

// Components
const { __ } = wp.i18n;

// Extend component
const { Component } = wp.element;

// Register block
const {
	registerBlockType,
	createBlock,
} = wp.blocks;

// Register editor components
const {
	RichText,
	AlignmentToolbar,
	BlockControls,
	BlockAlignmentToolbar,
	InnerBlocks,
} = wp.editor;

// Register components
const {
	Button,
	withFallbackStyles,
	IconButton,
	Dashicon,
} = wp.components;

const blockAttributes = {
	accordionTitle: {
		type: 'array',
		selector: '.accordion-heading',
		source: 'children',
	},
	accordionText: {
		type: 'array',
		selector: '.accordion-text',
		source: 'children',
	},
	accordionAlignment: {
		type: 'string',
	},
	accordionFontSize: {
		type: 'number',
	},
	accordionOpen: {
		type: 'boolean',
		default: false
	},
	accordionHrefHash: {
		type: 'string',
		default: ""
	},
};

class AccordionBlock extends Component {

	render() {

		// Setup the attributes
		const { attributes: { accordionTitle, accordionText, accordionAlignment, accordionFontSize, accordionOpen }, isSelected, className, setAttributes } = this.props;

		return [
			// Show the block alignment controls on focus
			<BlockControls key="controls">
				<AlignmentToolbar
					value={ accordionAlignment }
					onChange={ ( value ) => this.props.setAttributes( { accordionAlignment: value } ) }
				/>
			</BlockControls>,
			// Show the block controls on focus
			<Inspector
				{ ...this.props }
			/>,
			// Show the button markup in the editor
			<Accordion { ...this.props }>
				<RichText
					tagName="p"
					placeholder={ __( 'Accordion Title', 'cypher' ) }
					value={ accordionTitle }
					className="accordion-heading"
					onChange={ ( value ) => this.props.setAttributes( { accordionTitle: value } ) }
				/>

				<div className="accordion-body content">
					<InnerBlocks />
				</div>
			</Accordion>
		];
	}
}

// Register the block
registerBlockType( 'cypher/accordion', {
	title: __( 'Accordion', 'cypher' ),
	description: __( 'Add accordion block with a title and text.', 'cypher' ),
	icon: 'editor-ul',
	category: 'layout',
	keywords: [
		__( 'accordion', 'cypher' ),
		__( 'list', 'cypher' ),
		__( 'atomic', 'cypher' ),
	],
	attributes: blockAttributes,

	// Render the block components
	edit: AccordionBlock,

	// Save the attributes and markup
	save: function( props ) {

		// Setup the attributes
		const {
			accordionTitle,
			accordionText,
			accordionAlignment,
			accordionFontSize,
			accordionOpen,
			accordionHrefHash
		} = props.attributes;

		let hrefHash = (accordionHrefHash ? slugify(accordionHrefHash) : slugify(accordionTitle));

		// Save the block markup for the front end
		return (
			<Accordion { ...props }>
				<a href={'#' + hrefHash} className="accordion-heading">
					<RichText.Content
						value={ accordionTitle }
					/>
				</a>
				<div className="accordion-body">
					<InnerBlocks.Content />
				</div>
			</Accordion>
		);
	},
} );
