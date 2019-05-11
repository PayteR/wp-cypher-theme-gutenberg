/**
 * External dependencies
 */
import classnames from 'classnames';
import {dimImageToStyle} from "./../../utils/utils";

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
} = wp.components;

const {
	Fragment,
	Component
} = wp.element;

const {
	BlockAlignmentToolbar,
	InspectorControls,
	InnerBlocks,
	BlockControls,
	AlignmentToolbar,
	PanelColorSettings,
	ContrastChecker,
	FontSizePicker,
	withFontSizes,
	withColors,
	MediaUpload,
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
class ExampleBlock extends Component {

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

		const {
			textAlign,
			examplePaddingTop,
			examplePaddingRight,
			examplePaddingBottom,
			examplePaddingLeft,
			exampleMarginTop,
			exampleMarginBottom,
		} = attributes;


		const classes = classnames(className, `example`, {
			['has-text-color']: textColor.color,
			['has-background']: backgroundColor.color,
			[`has-text-${textAlign}`]: textAlign === 'left' || textAlign === 'right',
			[`has-text-centered`]: textAlign === 'center',
			[backgroundColor.class]: backgroundColor.class,
			[textColor.class]: textColor.class,
			[fontSize.class]: fontSize.class,
			['has-pl-' + examplePaddingLeft]: !isNaN(examplePaddingLeft),
			['has-pr-' + examplePaddingRight]: !isNaN(examplePaddingRight),
			['has-pb-' + examplePaddingBottom]: !isNaN(examplePaddingBottom),
			['has-pt-' + examplePaddingTop]: !isNaN(examplePaddingTop),
			['has-mt-' + exampleMarginTop]: !isNaN(exampleMarginTop),
			['has-mb-' + exampleMarginBottom]: !isNaN(exampleMarginBottom),
		});

		const styles = {
			backgroundColor: backgroundColor.class ? undefined : backgroundColor.color,
			color: textColor.class ? undefined : textColor.color,
			fontSize: fontSize && fontSize.size ? fontSize.size + 'px' : undefined,
			textAlign: textAlign ? textAlign : undefined,
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
					<PanelBody title={__('Example Options')} initialOpen={true}>
						<RangeControl
							label={__('Padding Top')}
							value={examplePaddingTop}
							onChange={(value) => setAttributes({examplePaddingTop: value})}
							min={0}
							max={6}
							step={1}
						/>

						<RangeControl
							label={__('Padding Bottom')}
							value={examplePaddingBottom}
							onChange={(value) => setAttributes({examplePaddingBottom: value})}
							min={0}
							max={6}
							step={1}
						/>

						<RangeControl
							label={__('Padding Left')}
							value={examplePaddingLeft}
							onChange={(value) => setAttributes({examplePaddingLeft: value})}
							min={0}
							max={6}
							step={1}
						/>

						<RangeControl
							label={__('Padding Right')}
							value={examplePaddingRight}
							onChange={(value) => setAttributes({examplePaddingRight: value})}
							min={0}
							max={6}
							step={1}
						/>

						<RangeControl
							label={__('Margin Top')}
							value={exampleMarginTop}
							onChange={(value) => setAttributes({exampleMarginTop: value})}
							min={0}
							max={6}
							step={1}
						/>

						<RangeControl
							label={__('Margin Bottom')}
							value={exampleMarginBottom}
							onChange={(value) => setAttributes({exampleMarginBottom: value})}
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
					<InnerBlocks/>
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
)(ExampleBlock);
