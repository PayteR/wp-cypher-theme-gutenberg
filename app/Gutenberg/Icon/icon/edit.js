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
	TextControl,
} = wp.components;

const {
	Fragment,
	Component
} = wp.element;

const {
	BlockAlignmentToolbar,
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
class IconBlock extends Component {

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
			iconPaddingTop,
			iconPaddingRight,
			iconPaddingBottom,
			iconPaddingLeft,
			iconMarginTop,
			iconMarginBottom,
			iconClassName,
			buttonAlign,
		} = attributes;


		const containerClasses = classnames(className, `cypher-icon`, {
			['has-text-color']: textColor.color,
			['has-background']: backgroundColor.color,
			[`has-text-${textAlign}`]: textAlign === 'left' || textAlign === 'right',
			[`has-text-centered`]: textAlign === 'center',
			[`is-block`]: buttonAlign === 'full',
			[backgroundColor.class]: backgroundColor.class,
			[textColor.class]: textColor.class,
			[fontSize.class]: fontSize.class,
			['has-pl-' + iconPaddingLeft]: !isNaN(iconPaddingLeft),
			['has-pr-' + iconPaddingRight]: !isNaN(iconPaddingRight),
			['has-pb-' + iconPaddingBottom]: !isNaN(iconPaddingBottom),
			['has-pt-' + iconPaddingTop]: !isNaN(iconPaddingTop),
			['has-mt-' + iconMarginTop]: !isNaN(iconMarginTop),
			['has-mb-' + iconMarginBottom]: !isNaN(iconMarginBottom),
		});
		const classes = classnames(iconClassName);

		const styles = {
			backgroundColor: backgroundColor.class ? undefined : backgroundColor.color,
			color: textColor.class ? undefined : textColor.color,
			fontSize: fontSize && fontSize.size ? fontSize.size + 'px' : undefined,
			textAlign: textAlign ? textAlign : undefined,
		};

		return (
			<Fragment>
				<BlockControls>
					<BlockAlignmentToolbar
						value={buttonAlign}
						onChange={buttonAlign => setAttributes({buttonAlign})}
						controls={['left', 'full']}
					/>
					<AlignmentToolbar
						value={textAlign}
						onChange={(nextTextAlign) => {
							setAttributes({textAlign: nextTextAlign});
						}}
					/>
				</BlockControls>
				<InspectorControls key="inspector">
					<PanelBody title={__('Icon Options')} initialOpen={true}>
						<TextControl
							label="Icon class name"
							value={iconClassName}
							onChange={(value) => setAttributes({iconClassName: value})}
						/>
						<RangeControl
							label={__('Padding Top')}
							value={iconPaddingTop}
							onChange={(value) => setAttributes({iconPaddingTop: value})}
							min={0}
							max={6}
							step={1}
						/>

						<RangeControl
							label={__('Padding Bottom')}
							value={iconPaddingBottom}
							onChange={(value) => setAttributes({iconPaddingBottom: value})}
							min={0}
							max={6}
							step={1}
						/>

						<RangeControl
							label={__('Padding Left')}
							value={iconPaddingLeft}
							onChange={(value) => setAttributes({iconPaddingLeft: value})}
							min={0}
							max={6}
							step={1}
						/>

						<RangeControl
							label={__('Padding Right')}
							value={iconPaddingRight}
							onChange={(value) => setAttributes({iconPaddingRight: value})}
							min={0}
							max={6}
							step={1}
						/>

						<RangeControl
							label={__('Margin Top')}
							value={iconMarginTop}
							onChange={(value) => setAttributes({iconMarginTop: value})}
							min={0}
							max={6}
							step={1}
						/>

						<RangeControl
							label={__('Margin Bottom')}
							value={iconMarginBottom}
							onChange={(value) => setAttributes({iconMarginBottom: value})}
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
				<span className={containerClasses} style={styles}>
					<i className={classes}>
						i
					</i>
				</span>
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
)(IconBlock);
