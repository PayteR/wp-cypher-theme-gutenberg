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
	TextControl,
} = wp.components;

const {
	Fragment,
	Component
} = wp.element;

const {
	InspectorControls,
	InnerBlocks,
	BlockControls,
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
import {getTimelineTemplate} from './utils';


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
 * In timeline block, the only block we allow is 'cypher/item'.
 *
 * @constant
 * @type {string[]}
 */
const ALLOWED_BLOCKS = ['cypher/item'];

class TimelineBlock extends Component {

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
			timelineItems,
			textAlign,
			centered,
			timelinePaddingTop,
			timelinePaddingRight,
			timelinePaddingBottom,
			timelinePaddingLeft,
			timelineMarginTop,
			timelineMarginBottom,
			headerBefore,
			headerAfter,
		} = attributes;


		const classes = classnames( className, `timeline`, {
			['has-text-color']: textColor.color,
			['has-background']: backgroundColor.color,
			[`has-text-${textAlign}`]: textAlign === 'left' || textAlign === 'right',
			[`has-text-centered`]: textAlign === 'center',
			[backgroundColor.class]: backgroundColor.class,
			[textColor.class]: textColor.class,
			[fontSize.class]: fontSize.class,
			['is-centered']: centered,
			['has-pl-' + timelinePaddingLeft]: !isNaN(timelinePaddingLeft),
			['has-pr-' + timelinePaddingRight]: !isNaN(timelinePaddingRight),
			['has-pb-' + timelinePaddingBottom]: !isNaN(timelinePaddingBottom),
			['has-pt-' + timelinePaddingTop]: !isNaN(timelinePaddingTop),
			['has-mt-' + timelineMarginTop]: !isNaN(timelineMarginTop),
			['has-mb-' + timelineMarginBottom]: !isNaN(timelineMarginBottom),
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
				</BlockControls>
				<InspectorControls>
					<PanelBody>
						<TextControl
							label="Header before"
							value={ headerBefore }
							onChange={ ( value ) => setAttributes( { headerBefore: value } ) }
							onMouseoput
						/>
						<TextControl
							label="Header after"
							value={ headerAfter }
							onChange={ ( value ) => setAttributes( { headerAfter: value } ) }
							onMouseoput
						/>
					</PanelBody>
					<PanelBody>
						<RangeControl
							label={ __( 'Timeline items' ) }
							value={ timelineItems }
							onChange={ ( nextTimeline ) => {
								setAttributes( {
									timelineItems: nextTimeline,
								} );
							} }
							min={ 1 }
							max={ 12 }
						/>
						<ToggleControl
							label={ __( 'centered' ) }
							checked={ centered }
							onChange={ ( centeredNext ) => { setAttributes( { centered: centeredNext } ) } }
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
					<PanelBody title={__('Container Options')} initialOpen={false}>
						<RangeControl
							label={__('Padding Top')}
							value={timelinePaddingTop}
							onChange={(value) => {
								console.log(value)
								setAttributes({timelinePaddingTop: value})
							}}
							min={0}
							max={6}
							step={1}
						/>

						<RangeControl
							label={__('Padding Bottom')}
							value={timelinePaddingBottom}
							onChange={(value) => setAttributes({timelinePaddingBottom: value})}
							min={0}
							max={6}
							step={1}
						/>

						<RangeControl
							label={__('Padding Left')}
							value={timelinePaddingLeft}
							onChange={(value) => setAttributes({timelinePaddingLeft: value})}
							min={0}
							max={6}
							step={1}
						/>

						<RangeControl
							label={__('Padding Right')}
							value={timelinePaddingRight}
							onChange={(value) => setAttributes({timelinePaddingRight: value})}
							min={0}
							max={6}
							step={1}
						/>

						<RangeControl
							label={__('Margin Top')}
							value={timelineMarginTop}
							onChange={(value) => setAttributes({timelineMarginTop: value})}
							min={0}
							max={6}
							step={1}
						/>

						<RangeControl
							label={__('Margin Bottom')}
							value={timelineMarginBottom}
							onChange={(value) => setAttributes({timelineMarginBottom: value})}
							min={0}
							max={6}
							step={1}
						/>
					</PanelBody>
				</InspectorControls>
				<div className={ classes } style={styles}>
					{ headerBefore && (
					<header className="timeline-header">
						<span className="tag is-medium is-primary">{ headerBefore }</span>
					</header>
					)}
					<InnerBlocks
						template={ getTimelineTemplate( timelineItems ) }
						templateLock="all"
						allowedBlocks={ ALLOWED_BLOCKS } />
					{ headerAfter && (
						<header className="timeline-header">
							<span className="tag is-medium is-primary">{ headerAfter }</span>
						</header>
					)}
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
	 * Selects the child item Blocks for this parent Item
	 */
	applyFallbackStyles,

	withSelect( ( select, { clientId } ) => {
		const { getBlocksByClientId } = select( 'core/editor' );
		const block = getBlocksByClientId( clientId )[ 0 ];

		return {
			childTimeline: block ? block.innerBlocks : DEFAULT_EMPTY_ARRAY,
		};
	} ),

	withDispatch( ( dispatch, { clientId, childTimeline } ) => {
		return {
			/**
			 * Update all child item Blocks with a new
			 * vertical alignment setting based on whatever
			 * alignment is passed in. This allows change to parent
			 * to overide anything set on a individual item basis
			 *
			 * @param  {string} alignment the vertical alignment setting
			 */

		};
	} ),
)( TimelineBlock );
