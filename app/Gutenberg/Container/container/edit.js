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
class ContainerBlock extends Component {

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
			containerWidth,
			containerPaddingTop,
			containerPaddingRight,
			containerPaddingBottom,
			containerPaddingLeft,
			containerMarginTop,
			containerMarginBottom,
			containerMaxWidth,
			containerDimRatio,
			containerImgURL,
			containerImgID,
			containerImgFit,
		} = attributes;


		const classes = classnames(className, `container`, {
			['has-text-color']: textColor.color,
			['has-background']: backgroundColor.color,
			[`has-text-${textAlign}`]: textAlign === 'left' || textAlign === 'right',
			[`has-text-centered`]: textAlign === 'center',
			[backgroundColor.class]: backgroundColor.class,
			[textColor.class]: textColor.class,
			[fontSize.class]: fontSize.class,
			[`has-width-${containerWidth}`]: containerWidth,
			['has-background-image']: !!containerImgURL,
			['has-pl-' + containerPaddingLeft]: !isNaN(containerPaddingLeft),
			['has-pr-' + containerPaddingRight]: !isNaN(containerPaddingRight),
			['has-pb-' + containerPaddingBottom]: !isNaN(containerPaddingBottom),
			['has-pt-' + containerPaddingTop]: !isNaN(containerPaddingTop),
			['has-mt-' + containerMarginTop]: !isNaN(containerMarginTop),
			['has-mb-' + containerMarginBottom]: !isNaN(containerMarginBottom),
		});

		const styles = {
			backgroundColor: backgroundColor.class ? undefined : backgroundColor.color,
			color: textColor.class ? undefined : textColor.color,
			fontSize: fontSize && fontSize.size ? fontSize.size + 'px' : undefined,
			textAlign: textAlign ? textAlign : undefined,
			maxWidth: containerMaxWidth ? `${containerMaxWidth}px` : undefined,
		};


		return (
			<Fragment>
				<BlockControls>
					<BlockAlignmentToolbar
						value={containerWidth}
						onChange={containerWidth => setAttributes({containerWidth})}
						controls={['center', 'wide', 'full']}
					/>
					<AlignmentToolbar
						value={textAlign}
						onChange={(nextTextAlign) => {
							setAttributes({textAlign: nextTextAlign});
						}}
					/>
				</BlockControls>
				<InspectorControls key="inspector">
					<PanelBody title={__('Container Options')} initialOpen={true}>
						<RangeControl
							label={__('Padding Top')}
							value={containerPaddingTop}
							onChange={(value) => setAttributes({containerPaddingTop: value})}
							min={0}
							max={6}
							step={1}
						/>

						<RangeControl
							label={__('Padding Bottom')}
							value={containerPaddingBottom}
							onChange={(value) => setAttributes({containerPaddingBottom: value})}
							min={0}
							max={6}
							step={1}
						/>

						<RangeControl
							label={__('Padding Left')}
							value={containerPaddingLeft}
							onChange={(value) => setAttributes({containerPaddingLeft: value})}
							min={0}
							max={6}
							step={1}
						/>

						<RangeControl
							label={__('Padding Right')}
							value={containerPaddingRight}
							onChange={(value) => setAttributes({containerPaddingRight: value})}
							min={0}
							max={6}
							step={1}
						/>

						<RangeControl
							label={__('Margin Top')}
							value={containerMarginTop}
							onChange={(value) => setAttributes({containerMarginTop: value})}
							min={0}
							max={6}
							step={1}
						/>

						<RangeControl
							label={__('Margin Bottom')}
							value={containerMarginBottom}
							onChange={(value) => setAttributes({containerMarginBottom: value})}
							min={0}
							max={6}
							step={1}
						/>

						<RangeControl
							label={__('Inside Container Max Width (px)')}
							value={containerMaxWidth}
							onChange={(value) => setAttributes({containerMaxWidth: value})}
							min={500}
							max={1600}
							step={1}
						/>
					</PanelBody>

					<PanelBody title={__('Background Options')} initialOpen={false}>
						<p>{__('Select a background image:')}</p>
						<MediaUpload
							onSelect={img => {
								setAttributes({
									containerImgID: img.id,
									containerImgURL: img.url,
									containerImgAlt: img.alt,
								});
							}}
							type="image"
							value={containerImgID}
							render={({open}) => (
								<div>
									<IconButton
										className="container-inspector-media"
										label={__('Edit image')}
										icon="format-image"
										onClick={open}
									>
										{__('Select Image')}
									</IconButton>

									{containerImgURL && !!containerImgURL.length && (
										<IconButton
											className="container-inspector-media"
											label={__('Remove Image')}
											icon="dismiss"
											onClick={() => {
												setAttributes({
													containerImgID: null,
													containerImgURL: null,
													containerImgAlt: null,
												});
											}}
										>
											{__('Remove')}
										</IconButton>
									)}
								</div>
							)}
						>
						</MediaUpload>

						{containerImgURL && !!containerImgURL.length && (
							<RangeControl
								label={__('Image Opacity')}
								value={containerDimRatio}
								onChange={(value) => setAttributes({containerDimRatio: value})}
								min={1}
								max={100}
								step={1}
							/>
						)}

						{containerImgURL && !!containerImgURL.length && (
							<SelectControl
								label={__('Background image fit')}
								selected={containerImgFit}
								value={containerImgFit}
								onChange={(value) => setAttributes({containerImgFit: value})}
								options={[
									{label: __('cover'), value: 'cover'},
									{label: __('contain'), value: 'contain'},
									{label: __('fill'), value: 'fill'},
									{label: __('scale-down'), value: 'scale-down'},
								]}
							/>
						)}
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
					{containerImgURL && !!containerImgURL.length && (
						<img
							style={
								{'opacity': dimImageToStyle(containerDimRatio)}
							}
							className={classnames(
								'image',
								'is-fit-' + containerImgFit
							)}
							src={containerImgURL}
						/>
					)}
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
)(ContainerBlock);
