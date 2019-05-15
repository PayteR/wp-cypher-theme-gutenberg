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
} = wp.compose;

const {
	PanelBody,
	RangeControl,
	withFallbackStyles,
	TextControl,
} = wp.components;

const {
	Fragment,
	Component
} = wp.element;

const {
	InspectorControls,
	BlockControls,
	AlignmentToolbar,
	PanelColorSettings,
	ContrastChecker,
	FontSizePicker,
	withFontSizes,
	withColors,
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
class DividerBlock extends Component {

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
			dividerText,
			dividerWidth,
			dividerPaddingTop,
			dividerPaddingRight,
			dividerPaddingBottom,
			dividerPaddingLeft,
			dividerMarginTop,
			dividerMarginBottom,
		} = attributes;


		const classes = classnames(className, `is-divider`, {
			['has-text-color']: textColor.color,
			['has-background']: backgroundColor.color,
			[textColor.class]: textColor.class,
			[fontSize.class]: fontSize.class,
			['has-pl-' + dividerPaddingLeft]: !isNaN(dividerPaddingLeft),
			['has-pr-' + dividerPaddingRight]: !isNaN(dividerPaddingRight),
			['has-pb-' + dividerPaddingBottom]: !isNaN(dividerPaddingBottom),
			['has-pt-' + dividerPaddingTop]: !isNaN(dividerPaddingTop),
			['has-mt-' + dividerMarginTop]: !isNaN(dividerMarginTop),
			['has-mb-' + dividerMarginBottom]: !isNaN(dividerMarginBottom),
		});

		const styles = {
			borderColor: backgroundColor.color ? backgroundColor.color : undefined,
			color: textColor.color ? textColor.color : undefined,
			fontSize: fontSize && fontSize.size ? fontSize.size + 'px' : undefined,
			borderWidth: !isNaN(dividerWidth) ? dividerWidth : undefined,
		};


		return (
			<Fragment>
				<InspectorControls key="inspector">
					<PanelBody title={__('Divider Options')} initialOpen={true}>
						<TextControl
							label="Divider text"
							value={dividerText}
							onChange={(value) => setAttributes({dividerText: value})}
						/>
						<RangeControl
							label={__('Width')}
							value={dividerWidth}
							onChange={(value) => setAttributes({dividerWidth: value})}
							min={0}
							max={20}
							step={1}
						/>
						<RangeControl
							label={__('Padding Top')}
							value={dividerPaddingTop}
							onChange={(value) => setAttributes({dividerPaddingTop: value})}
							min={0}
							max={6}
							step={1}
						/>

						<RangeControl
							label={__('Padding Bottom')}
							value={dividerPaddingBottom}
							onChange={(value) => setAttributes({dividerPaddingBottom: value})}
							min={0}
							max={6}
							step={1}
						/>

						<RangeControl
							label={__('Padding Left')}
							value={dividerPaddingLeft}
							onChange={(value) => setAttributes({dividerPaddingLeft: value})}
							min={0}
							max={6}
							step={1}
						/>

						<RangeControl
							label={__('Padding Right')}
							value={dividerPaddingRight}
							onChange={(value) => setAttributes({dividerPaddingRight: value})}
							min={0}
							max={6}
							step={1}
						/>

						<RangeControl
							label={__('Margin Top')}
							value={dividerMarginTop}
							onChange={(value) => setAttributes({dividerMarginTop: value})}
							min={0}
							max={6}
							step={1}
						/>

						<RangeControl
							label={__('Margin Bottom')}
							value={dividerMarginBottom}
							onChange={(value) => setAttributes({dividerMarginBottom: value})}
							min={0}
							max={6}
							step={1}
						/>
					</PanelBody>

					{/*<PanelBody title={__('Text Settings')} className="blocks-font-size">*/}
						{/*<FontSizePicker*/}
							{/*fallbackFontSize={fallbackFontSize}*/}
							{/*value={fontSize.size}*/}
							{/*onChange={setFontSize}*/}
						{/*/>*/}
					{/*</PanelBody>*/}
					<PanelColorSettings
						title={__('Color Settings')}
						initialOpen={false}
						colorSettings={[
							{
								value: backgroundColor.color,
								onChange: setBackgroundColor,
								label: __('Background Color'),
							},
							// {
							// 	value: textColor.color,
							// 	onChange: setTextColor,
							// 	label: __('Text Color'),
							// },
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
				<div className={classes} style={styles} data-content={dividerText ? dividerText : null}>
					&nbsp;
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
)(DividerBlock);
