/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
const {__} = wp.i18n;

const {
	compose,
	withState,
} = wp.compose;

const {
	PanelBody,
	RangeControl,
	withFallbackStyles,
} = wp.components;

const {
	Fragment,
	Component
} = wp.element;

const {
	InspectorControls,
	InnerBlocks,
	BlockControls,
	BlockVerticalAlignmentToolbar,
	AlignmentToolbar,
	PanelColorSettings,
	ContrastChecker,
	FontSizePicker,
	withFontSizes,
	withColors,
} = wp.editor;

const { getComputedStyle } = window;

const {withSelect, withDispatch} = wp.data;

const applyFallbackStyles = withFallbackStyles( ( node, ownProps ) => {
	const { textColor, backgroundColor, fontSize, customFontSize } = ownProps.attributes;
	const editableNode = node.querySelector( '[contenteditable="true"]' );
	//verify if editableNode is available, before using getComputedStyle.
	const computedStyles = editableNode ? getComputedStyle( editableNode ) : null;

	return {
		fallbackBackgroundColor: backgroundColor || ! computedStyles ? undefined : computedStyles.backgroundColor,
		fallbackTextColor: textColor || ! computedStyles ? undefined : computedStyles.color,
		fallbackFontSize: fontSize || customFontSize || ! computedStyles ? undefined : parseInt( computedStyles.fontSize ) || undefined,
	};
} );

class ColumnBlock extends Component {

	constructor() {
		super( ...arguments );
	}

	render() {
		const {
			attributes,
			setAttributes,
			className,
			fallbackFontSize,
			fallbackBackgroundColor,
			fallbackTextColor,
			textColor,
			backgroundColor,
			fontSize,
			setFontSize,
			setTextColor,
			setBackgroundColor,
		} = this.props;

		const {
			textAlign,
		} = attributes;

		const classes = classnames( className, `column`, {
			[ 'has-text-color' ]: textColor.color,
			[ 'has-background' ]: backgroundColor.color,
			[ `has-text-${ textAlign }` ]: textAlign === 'left' || textAlign === 'right',
			[ `has-text-centered` ]: textAlign === 'center',
			[ backgroundColor.class ]: backgroundColor.class,
			[ textColor.class ]: textColor.class,
			[ fontSize.class ]: fontSize.class,
		} );

		const styles = {
			backgroundColor: backgroundColor.class ? undefined : backgroundColor.color,
			color: textColor.class ? undefined : textColor.color,
			fontSize: fontSize && fontSize.size ? fontSize.size + 'px' : undefined,
		};

	return (
		<Fragment>
			<BlockControls>
				<AlignmentToolbar
					value={ textAlign }
					onChange={ ( nextTextAlign ) => {
						setAttributes( { textAlign: nextTextAlign } );
					} }
				/>
				{/*<BlockVerticalAlignmentToolbar*/}
				{/*value={ verticalAlignment }*/}
				{/*onChange={ alignment => {*/}
				{/*updateAlignment( alignment );*/}
				{/*} }*/}
				{/*/>*/}
			</BlockControls>
			<InspectorControls>
				<PanelBody title={ __( 'Text Settings' ) } className="blocks-font-size">
					<FontSizePicker
						fallbackFontSize={ fallbackFontSize }
						value={ fontSize.size }
						onChange={ setFontSize }
					/>
				</PanelBody>
				<PanelColorSettings
					title={ __( 'Color Settings' ) }
					initialOpen={ false }
					colorSettings={ [
						{
							value: backgroundColor.color,
							onChange: setBackgroundColor,
							label: __( 'Background Color' ),
						},
						{
							value: textColor.color,
							onChange: setTextColor,
							label: __( 'Text Color' ),
						},
					] }
				>
					<ContrastChecker
						{ ...{
							textColor: textColor.color,
							backgroundColor: backgroundColor.color,
							fallbackTextColor,
							fallbackBackgroundColor,
						} }
						fontSize={ fontSize.size }
					/>
				</PanelColorSettings>
			</InspectorControls>
			<div className={ classes } style={styles}>
				<InnerBlocks templateLock={ false } />
			</div>
		</Fragment>
	);
}
}

export default compose(
	withColors( 'backgroundColor', { textColor: 'color' } ),
	withFontSizes( 'fontSize' ),
	/**
	 * Selects the child column Blocks for this parent Column
	 */
	applyFallbackStyles,

	withSelect( ( select, { clientId } ) => {
		const { getBlockRootClientId } = select( 'core/editor' );

		return {
			parentColumnsBlockClientId: getBlockRootClientId( clientId ),
		};
	} ),
	withDispatch( ( dispatch, { clientId, parentColumnsBlockClientId } ) => {
		return {
			updateAlignment( alignment ) {
				// Update self...
				dispatch( 'core/editor' ).updateBlockAttributes( clientId, {
					verticalAlignment: alignment,
				} );

				// Reset Parent Columns Block
				dispatch( 'core/editor' ).updateBlockAttributes( parentColumnsBlockClientId, {
					verticalAlignment: null,
				} );
			},
		};
	} )
)( ColumnBlock );
