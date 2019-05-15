/**
 * External dependencies
 */
import classnames from 'classnames';
import {
	setColorObject,
	setFontSizeObject
} from "./../../utils/utils";

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
	IconButton,
	TextControl,
	ColorPaletteControl,
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
	ColorPalette,
} = wp.editor;

const {getComputedStyle} = window;


const applyFallbackStyles = withFallbackStyles((node, ownProps) => {
	const {textColor, backgroundColor, fontSize, customFontSize} = ownProps.attributes;
	const editableNode = node.querySelector('[contenteditable="true"]');
	//verify if editableNode is available, before using getComputedStyle.
	const computedStyles = editableNode ? getComputedStyle(editableNode) : null;

	return {
		fallbackBackgroundColor: backgroundColor || !computedStyles ? undefined : computedStyles.backgroundColor,
		fallbackTextColor: textColor || !computedStyles ? undefined : computedStyles.color,
		fallbackFontSize: fontSize || customFontSize || !computedStyles ? undefined : parseInt(computedStyles.fontSize) || undefined,
	};
});

/**
 * Allowed blocks constant is passed to InnerBlocks precisely as specified here.
 * The contents of the array should never change.
 * The array should contain the name of each block that is allowed.
 * In columns block, the only block we allow is 'cypher/column'.
 *
 * @constant
 * @type {string[]}
 */
class MediaBlock extends Component {

	constructor() {
		super(...arguments);
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
			setBackgroundColor
		} = this.props;

		let {
			textAlign,
			mediaPaddingTop,
			mediaPaddingRight,
			mediaPaddingBottom,
			mediaPaddingLeft,
			mediaMarginTop,
			mediaMarginBottom,
			iconLeftClass,
			iconRightClass,
			iconLeftColor,
			iconLeftFontSize,
			iconRightColor,
			iconRightFontSize,
		} = attributes;



		const classes = classnames(className, `media`, {
			['has-text-color']: textColor.color,
			['has-background']: backgroundColor.color,
			[`has-text-${textAlign}`]: textAlign === 'left' || textAlign === 'right',
			[`has-text-centered`]: textAlign === 'center',
			[backgroundColor.class]: backgroundColor.class,
			[textColor.class]: textColor.class,
			[fontSize.class]: fontSize.class,
			['has-pl-' + mediaPaddingLeft]: !isNaN(mediaPaddingLeft),
			['has-pr-' + mediaPaddingRight]: !isNaN(mediaPaddingRight),
			['has-pb-' + mediaPaddingBottom]: !isNaN(mediaPaddingBottom),
			['has-pt-' + mediaPaddingTop]: !isNaN(mediaPaddingTop),
			['has-mt-' + mediaMarginTop]: !isNaN(mediaMarginTop),
			['has-mb-' + mediaMarginBottom]: !isNaN(mediaMarginBottom),
			['has-icon']: iconLeftClass || iconRightClass,
			['has-icon-left']: iconLeftClass,
			['has-icon-right']: iconRightClass,
		});

		const styles = {
			backgroundColor: backgroundColor.class ? undefined : backgroundColor.color,
			color: textColor.class ? undefined : textColor.color,
			fontSize: fontSize && fontSize.size ? fontSize.size + 'px' : undefined,
			textAlign: textAlign ? textAlign : undefined,
		};

		iconLeftColor = setColorObject(iconLeftColor);
		iconRightColor = setColorObject(iconRightColor);
		iconLeftFontSize = setFontSizeObject(iconLeftFontSize);
		iconRightFontSize = setFontSizeObject(iconRightFontSize);

		const classesLeft = classnames("media-left", {
			['has-text-color']: iconLeftColor.color,
			[iconLeftColor.class]: iconLeftColor.class,
			[iconLeftFontSize.class]: iconLeftFontSize.class,
		});

		const stylesLeft = {
			color: iconLeftColor.class ? undefined : iconLeftColor.color,
			fontSize: !iconLeftFontSize.class && iconLeftFontSize.size ? iconLeftFontSize.size + 'px' : undefined,
		};

		const classesRight = classnames("media-right", {
			['has-text-color']: iconLeftColor.color,
			[iconRightColor.class]: iconRightColor.class,
			[iconRightFontSize.class]: iconRightFontSize.class,
		});

		const stylesRight = {
			color: iconRightColor.class ? undefined : iconRightColor.color,
			fontSize: !iconRightFontSize.class && iconRightFontSize.size ? iconRightFontSize.size + 'px' : undefined,
		};


		return (
			<Fragment>
				<BlockControls>
					<AlignmentToolbar
						value={textAlign}
						onChange={(nextTextAlign) => {
							setAttributes({textAlign: nextTextAlign});
						}}
					/>
				</BlockControls>
				<InspectorControls key="inspector">
					<PanelBody title={__('Icons')} initialOpen={true}>
						<TextControl
							label="Icon left class"
							value={ iconLeftClass }
							onChange={ ( iconLeftClassNext ) => setAttributes( { iconLeftClass: iconLeftClassNext } ) }
						/>
						<FontSizePicker
							value={iconLeftFontSize.size}
							onChange={ ( value ) => {
								setAttributes( { iconLeftFontSize: setFontSizeObject(value) } )
							} }
						/>
						<ColorPalette
							color={ iconLeftColor.color }
							onChange={ ( value ) => {
								setAttributes( { iconLeftColor: setColorObject(value) } )
							} }
							disableAlpha
						/>
						<TextControl
							label="Icon class after"
							value={ iconRightClass }
							onChange={ ( iconRightClassNext ) => setAttributes( { iconRightClass: iconRightClassNext } ) }
						/>
						<FontSizePicker
							value={iconRightFontSize.size}
							onChange={ ( value ) => {
								setAttributes( { iconRightFontSize: setFontSizeObject(value) } )
							} }
						/>
						<ColorPalette
							label="Icon right class"
							color={ iconRightColor.color }
							onChange={ ( value ) => {
								setAttributes( { iconRightColor: setColorObject(value) } )
							} }
							disableAlpha
						/>
					</PanelBody>
					<PanelBody title={__('Media Options')} initialOpen={true}>
						<RangeControl
							label={__('Padding Top')}
							value={mediaPaddingTop}
							onChange={(value) => setAttributes({mediaPaddingTop: value})}
							min={0}
							max={6}
							step={1}
						/>

						<RangeControl
							label={__('Padding Bottom')}
							value={mediaPaddingBottom}
							onChange={(value) => setAttributes({mediaPaddingBottom: value})}
							min={0}
							max={6}
							step={1}
						/>

						<RangeControl
							label={__('Padding Left')}
							value={mediaPaddingLeft}
							onChange={(value) => setAttributes({mediaPaddingLeft: value})}
							min={0}
							max={6}
							step={1}
						/>

						<RangeControl
							label={__('Padding Right')}
							value={mediaPaddingRight}
							onChange={(value) => setAttributes({mediaPaddingRight: value})}
							min={0}
							max={6}
							step={1}
						/>

						<RangeControl
							label={__('Margin Top')}
							value={mediaMarginTop}
							onChange={(value) => setAttributes({mediaMarginTop: value})}
							min={0}
							max={6}
							step={1}
						/>

						<RangeControl
							label={__('Margin Bottom')}
							value={mediaMarginBottom}
							onChange={(value) => setAttributes({mediaMarginBottom: value})}
							min={0}
							max={6}
							step={1}
						/>
					</PanelBody>

					<PanelBody title={__('Text Settings')} className="blocks-font-size">
						<FontSizePicker
							fallbackFontSize={fallbackFontSize}
							value={fontSize.size}
							onChange={setFontSize}
						/>
					</PanelBody>
					<PanelColorSettings
						title={__('Color Settings')}
						initialOpen={false}
						colorSettings={[
							{
								value: backgroundColor.color,
								onChange: setBackgroundColor,
								label: __('Background Color'),
							},
							{
								value: textColor.color,
								onChange: setTextColor,
								label: __('Text Color'),
							},
						]}
					>
						<ContrastChecker
							{...{
								textColor: textColor.color,
								backgroundColor: backgroundColor.color,
								fallbackTextColor,
								fallbackBackgroundColor,
							}}
							fontSize={fontSize.size}
						/>
					</PanelColorSettings>
				</InspectorControls>
				<div className={classes} style={styles}>
					{ iconLeftClass && (
						<div className={classesLeft} style={stylesLeft}>
							<span className="icon">
								<i className={iconLeftClass}></i>
							</span>
						</div>
					)}
					<div class="media-content">
						<InnerBlocks/>
					</div>
					{ iconRightClass && (
						<div className={classesRight} style={stylesRight}>
							<span className="icon">
								<i className={iconRightClass}></i>
							</span>
						</div>
					)}
				</div>
			</Fragment>
		);
	}
}

export default compose(
	withColors('backgroundColor', {textColor: 'color'}),
	withFontSizes('fontSize'),
	/**
	 * Selects the child column Blocks for this parent Column
	 */
	applyFallbackStyles,
)(MediaBlock);
