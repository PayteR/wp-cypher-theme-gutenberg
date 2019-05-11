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
	SelectControl,
	ToggleControl,
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


/**
 * Internal dependencies
 */
import {getColumnsTemplate} from './utils';


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

/**
 * Allowed blocks constant is passed to InnerBlocks precisely as specified here.
 * The contents of the array should never change.
 * The array should contain the name of each block that is allowed.
 * In columns block, the only block we allow is 'cypher/column'.
 *
 * @constant
 * @type {string[]}
 */
const ALLOWED_BLOCKS = ['cypher/column'];

class ColumnsBlock extends Component {

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
			updateAlignment
		} = this.props;

		const {
			gap,
			columns,
			textAlign,
			breakpoint,
			vcentered,
			centered,
			multiline
		} = attributes;


		const classes = classnames( className, `columns`, {
			['has-text-color']: textColor.color,
			['has-background']: backgroundColor.color,
			[`has-text-${textAlign}`]: textAlign === 'left' || textAlign === 'right',
			[`has-text-centered`]: textAlign === 'center',
			[breakpoint]: breakpoint,
			[`is-variable is-${gap}`]: gap,
			[backgroundColor.class]: backgroundColor.class,
			[textColor.class]: textColor.class,
			[fontSize.class]: fontSize.class,
			['is-vcentered']: vcentered,
			['is-centered']: centered,
			['is-multiline']: multiline,
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
					<PanelBody>
						<RangeControl
							label={ __( 'Columns' ) }
							value={ columns }
							onChange={ ( nextColumns ) => {
								setAttributes( {
									columns: nextColumns,
								} );
							} }
							min={ 1 }
							max={ 12 }
						/>
						<SelectControl
							label={ __( 'Breakpoint' ) }
							value={ breakpoint } // e.g: value = [ 'a', 'c' ]
							onChange={ ( breakpointNext ) => { setAttributes( { breakpoint: breakpointNext } ) } }
							options={ [
								{ value: '', label: 'default' },
								{ value: 'is-mobile', label: 'mobile' },
								{ value: 'is-small', label: 'small' },
								{ value: 'is-tablet', label: 'tablet' },
								{ value: 'is-desktop', label: 'desktop' },
							] }
						/>
						<RangeControl
							label={ __( 'Gap' ) }
							value={ gap }
							onChange={ ( nextGap ) => {
								setAttributes( {
									gap: nextGap,
								} );
							} }
							min={ 0 }
							max={ 8 }
						/>
						<ToggleControl
							label={ __( 'vcentered' ) }
							checked={ vcentered }
							onChange={ ( vcenteredNext ) => { setAttributes( { vcentered: vcenteredNext } ) } }
						/>
						<ToggleControl
							label={ __( 'centered' ) }
							checked={ centered }
							onChange={ ( centeredNext ) => { setAttributes( { centered: centeredNext } ) } }
						/>
						<ToggleControl
							label={ __( 'multiline' ) }
							checked={ multiline }
							onChange={ ( multilineNext ) => { setAttributes( { multiline: multilineNext } ) } }
						/>
					</PanelBody>
					<PanelBody
						title={ __( 'Text Settings' ) }
						className="blocks-font-size"
						initialOpen={ false }
					>
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
					<InnerBlocks
						template={ getColumnsTemplate( columns ) }
						templateLock="all"
						allowedBlocks={ ALLOWED_BLOCKS } />
				</div>
			</Fragment>
		);
	}
}

const DEFAULT_EMPTY_ARRAY = [];

export default compose(
	withColors( 'backgroundColor', { textColor: 'color' } ),
	withFontSizes( 'fontSize' ),
	/**
	 * Selects the child column Blocks for this parent Column
	 */
	applyFallbackStyles,

	withSelect( ( select, { clientId } ) => {
		const { getBlocksByClientId } = select( 'core/editor' );
		const block = getBlocksByClientId( clientId )[ 0 ];

		return {
			childColumns: block ? block.innerBlocks : DEFAULT_EMPTY_ARRAY,
		};
	} ),

	withDispatch( ( dispatch, { clientId, childColumns } ) => {
		return {
			/**
			 * Update all child column Blocks with a new
			 * vertical alignment setting based on whatever
			 * alignment is passed in. This allows change to parent
			 * to overide anything set on a individual column basis
			 *
			 * @param  {string} alignment the vertical alignment setting
			 */
			updateAlignment( alignment ) {
				// Update self...
				dispatch( 'core/editor' ).updateBlockAttributes( clientId, {
					verticalAlignment: alignment,
				} );

				// Update all child Column Blocks to match
				childColumns.forEach( ( childColumn ) => {
					dispatch( 'core/editor' ).updateBlockAttributes( childColumn.clientId, {
						verticalAlignment: alignment,
					} );
				} );
			},
		};
	} ),
)( ColumnsBlock );
