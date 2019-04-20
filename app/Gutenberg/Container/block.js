/**
 * BLOCK: Atomic Blocks Container
 */

// Import block dependencies and components
import classnames from 'classnames';
import Inspector from './components/inspector';
import Container from './components/container';

// Components
const { __ } = wp.i18n;

// Extend component
const { Component } = wp.element;

// Register block
const { registerBlockType } = wp.blocks;

// Register editor components
const {
	AlignmentToolbar,
	BlockControls,
	BlockAlignmentToolbar,
	MediaUpload,
	RichText,
	InnerBlocks,
} = wp.editor;

// Register components
const {
	Button,
	withFallbackStyles,
	IconButton,
	Dashicon,
	withState,
	Toolbar,
} = wp.components;

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
	containerWidth: {
		type: 'string',
		default: 'center',
	},
	containerMaxWidth: {
		type: 'number',
	},
	containerBackgroundColor: {
		type: 'string',
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
};

class ABContainerBlock extends Component {

	render() {

		// Setup the attributes
		const {
			attributes: {
				containerPaddingTop,
				containerPaddingRight,
				containerPaddingBottom,
				containerPaddingLeft,
				containerMarginTop,
				containerMarginBottom,
				containerWidth,
				containerMaxWidth,
				containerBackgroundColor,
				containerImgURL,
				containerImgFit,
				containerImgID,
				containerImgAlt,
				containerDimRatio,
			},
			attributes,
			isSelected,
			editable,
			className,
			setAttributes
		} = this.props;

		const onSelectImage = img => {
			setAttributes( {
				containerImgID: img.id,
				containerImgURL: img.url,
				containerImgAlt: img.alt,
			} );
		};

		return [
			// Show the alignment toolbar on focus
			<BlockControls>
				<BlockAlignmentToolbar
					value={ containerWidth }
					onChange={ containerWidth => setAttributes( { containerWidth } ) }
					controls={ [ 'center', 'wide', 'full' ] }
				/>
			</BlockControls>,
			// Show the block controls on focus
			<Inspector
				{ ...{ setAttributes, ...this.props } }
			/>,
			// Show the container markup in the editor
			<Container { ...this.props }>
				{ containerImgURL && !! containerImgURL.length && (
					<img
						style={
							{'opacity': dimImageToStyle(containerDimRatio)}
						}
						className={ classnames(
							'image',
							'is-fit-' + containerImgFit
						) }
						src={ containerImgURL }
						alt={ containerImgAlt }
					/>
				) }
				<InnerBlocks />
			</Container>
		];
	}
}

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

	attributes: blockAttributes,

	getEditWrapperProps( { containerWidth } ) {
		if ( 'left' === containerWidth || 'right' === containerWidth || 'full' === containerWidth ) {
			return { 'data-align': containerWidth };
		}
	},

	// Render the block components
	edit: ABContainerBlock,

	// Save the attributes and markup
	save: function( props ) {

		// Setup the attributes
		const {
			containerPaddingTop,
			containerPaddingRight,
			containerPaddingBottom,
			containerPaddingLeft,
			containerMarginTop,
			containerMarginBottom,
			containerWidth,
			containerMaxWidth,
			containerBackgroundColor,
			containerImgURL,
			containerImgID,
			containerImgAlt,
			containerDimRatio,
			containerImgFit,
		} = props.attributes;


		// Save the block markup for the front end
		return (
			<Container { ...props }>
					{ containerImgURL && !! containerImgURL.length && (
						<img
							style={
								{'opacity': dimImageToStyle(containerDimRatio)}
							}
							className={ classnames(
								'image',
								'is-fit-' + containerImgFit
							) }
							src={ containerImgURL }
							alt={ containerImgAlt }
						/>
					) }
					<InnerBlocks.Content />
			</Container>
		);
	},

} );

function dimRatioToClass( ratio ) {
	return ( ratio === 0 || ratio === 50 ) ?
		null :
		'has-background-dim-' + ( 10 * Math.round( ratio / 10 ) );
}

function dimImageToStyle( ratio ) {
	return ( ratio === 0 ||  isNaN(ratio) || ratio === 100 ) ?
		null : ratio / 100;
}

function backgroundImageStyles( url ) {
	return url ?
		{ backgroundImage: `url(${ url })` } :
		undefined;
}
