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
	createBlock,
} = wp.blocks;

const {
	InspectorControls,
	BlockControls,
	AlignmentToolbar,
	PanelColorSettings,
	ContrastChecker,
	FontSizePicker,
	withFontSizes,
	withColors,
	RichText
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
class ListBlock extends Component {

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
			setBackgroundColor,
			insertBlocksAfter,
			mergeBlocks,
			onReplace,
		} = this.props;

		const {
			textAlign,
			listPaddingTop,
			listPaddingRight,
			listPaddingBottom,
			listPaddingLeft,
			listMarginTop,
			listMarginBottom,
			ordered,
			values,
			listColumnsCount,
		} = attributes;


		const classes = classnames(className, 'cypher-list', {
			['has-text-color']: textColor.color,
			['has-background']: backgroundColor.color,
			[`has-text-${textAlign}`]: textAlign === 'left' || textAlign === 'right',
			[`has-text-centered`]: textAlign === 'center',
			[backgroundColor.class]: backgroundColor.class,
			[textColor.class]: textColor.class,
			[fontSize.class]: fontSize.class,
			['has-column-count-' + listColumnsCount]: !isNaN(listColumnsCount) && listColumnsCount > 1,
			['has-pl-' + listPaddingLeft]: !isNaN(listPaddingLeft),
			['has-pr-' + listPaddingRight]: !isNaN(listPaddingRight),
			['has-pb-' + listPaddingBottom]: !isNaN(listPaddingBottom),
			['has-pt-' + listPaddingTop]: !isNaN(listPaddingTop),
			['has-mt-' + listMarginTop]: !isNaN(listMarginTop),
			['has-mb-' + listMarginBottom]: !isNaN(listMarginBottom),
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
					<PanelBody title={__('List Options')} initialOpen={true}>
						<RangeControl
							label={__('Columns count')}
							value={listColumnsCount}
							onChange={(value) => setAttributes({listColumnsCount: value})}
							min={1}
							max={5}
							step={1}
						/>

						<RangeControl
							label={__('Padding Top')}
							value={listPaddingTop}
							onChange={(value) => setAttributes({listPaddingTop: value})}
							min={0}
							max={6}
							step={1}
						/>

						<RangeControl
							label={__('Padding Bottom')}
							value={listPaddingBottom}
							onChange={(value) => setAttributes({listPaddingBottom: value})}
							min={0}
							max={6}
							step={1}
						/>

						<RangeControl
							label={__('Padding Left')}
							value={listPaddingLeft}
							onChange={(value) => setAttributes({listPaddingLeft: value})}
							min={0}
							max={6}
							step={1}
						/>

						<RangeControl
							label={__('Padding Right')}
							value={listPaddingRight}
							onChange={(value) => setAttributes({listPaddingRight: value})}
							min={0}
							max={6}
							step={1}
						/>

						<RangeControl
							label={__('Margin Top')}
							value={listMarginTop}
							onChange={(value) => setAttributes({listMarginTop: value})}
							min={0}
							max={6}
							step={1}
						/>

						<RangeControl
							label={__('Margin Bottom')}
							value={listMarginBottom}
							onChange={(value) => setAttributes({listMarginBottom: value})}
							min={0}
							max={6}
							step={1}
						/>
					</PanelBody>
				</InspectorControls>
				<RichText
					identifier="values"
					multiline="li"
					tagName={ ordered ? 'ol' : 'ul' }
					onChange={ ( nextValues ) => {
						console.log(nextValues, 'insertBlocksAfter');
						setAttributes( { values: nextValues } )
					} }
					value={ values }
					wrapperClassName="block-library-list"
					className={ classes }
					style={ styles }
					placeholder={ __( 'Write list…' ) }
					onMerge={ mergeBlocks }
					unstableOnSplit={
						insertBlocksAfter ?
							( before, after, ...blocks ) => {

								if ( ! blocks.length ) {
									blocks.push( createBlock( 'core/paragraph' ) );
								}


								if ( after !== '<li></li>' ) {
									blocks.push( createBlock( 'cypher/list', {
										ordered,
										values: after,
									} ) );
								}

								setAttributes( { values: before } );
								insertBlocksAfter( blocks );
							} :
							undefined
					}
					onRemove={ () => onReplace( [] ) }
					onTagNameChange={ ( tag ) => setAttributes( { ordered: tag === 'ol' } ) }
				/>
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
)(ListBlock);
