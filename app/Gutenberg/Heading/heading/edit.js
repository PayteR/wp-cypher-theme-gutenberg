/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import HeadingToolbar from './heading-toolbar';
// import HeadingEdit from './edit.native';

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
	IconHeading,
	Heading,
	Dashicon,
	ToggleControl,
	TextControl,
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
	RichText,
	URLInput,
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
class HeadingBlock extends Component {

	constructor() {
		super(...arguments);
	}

	render() {
		const {
			attributes,
			setAttributes,
			mergeBlocks,
			insertBlocksAfter,
			onReplace,
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
			headingMarginTop,
			headingMarginBottom,
			content,
			level,
			placeholder,
			fontFamily
		} = attributes;
		const tagName = 'h' + level;

		const classesContainer = classnames(className, `title`, {
			[`is-${level}`]: level,
			['has-text-color']: textColor.color,
			['has-background']: backgroundColor.color,
			[`has-text-${textAlign}`]: textAlign === 'left' || textAlign === 'right',
			[`has-text-centered`]: textAlign === 'center',
			[backgroundColor.class]: backgroundColor.class,
			[textColor.class]: textColor.class,
			[fontSize.class]: fontSize.class,
			[fontFamily]: fontFamily,

			['has-mt-' + headingMarginTop]: !isNaN(headingMarginTop),
			['has-mb-' + headingMarginBottom]: !isNaN(headingMarginBottom),
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
					<HeadingToolbar minLevel={ 2 } maxLevel={ 5 } selectedLevel={ level } onChange={ ( newLevel ) => setAttributes( { level: newLevel } ) } />
				</BlockControls>
				<InspectorControls>
					<PanelBody title={ __( 'Heading Settings' ) }>
						<p>{ __( 'Level' ) }</p>
						<HeadingToolbar minLevel={ 1 } maxLevel={ 7 } selectedLevel={ level } onChange={ ( newLevel ) => setAttributes( { level: newLevel } ) } />
						<p>{ __( 'Text Alignment' ) }</p>
						<AlignmentToolbar
							value={ textAlign }
							onChange={ ( nextAlign ) => {
								setAttributes( { textAlign: nextAlign } );
							} }
						/>
						<SelectControl
							label={ __( 'Font family' ) }
							value={ fontFamily }
							onChange={ ( fontFamilyNext ) => { setAttributes( { fontFamily: fontFamilyNext } ) } }
							options={ [
								{ value: '', label: 'default' },
								{ value: 'is-family-primary', label: 'primary' },
								{ value: 'is-family-secondary', label: 'secondary' },
							] }
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
					<PanelBody title={__('Margin Options')} initialOpen={true}>
						<RangeControl
							label={__('Margin Top')}
							value={headingMarginTop}
							onChange={(value) => setAttributes({headingMarginTop: value})}
							min={0}
							max={6}
							step={1}
						/>

						<RangeControl
							label={__('Margin Bottom')}
							value={headingMarginBottom}
							onChange={(value) => setAttributes({headingMarginBottom: value})}
							min={0}
							max={6}
							step={1}
						/>
					</PanelBody>
				</InspectorControls>
				<RichText
					identifier="content"
					wrapperClassName="wp-block-heading"
					tagName={ tagName }
					value={ content }
					onChange={ ( value ) => setAttributes( { content: value } ) }
					onMerge={ mergeBlocks }
					unstableOnSplit={
						insertBlocksAfter ?
							( before, after, ...blocks ) => {
								setAttributes( { content: before } );
								insertBlocksAfter( [
									...blocks,
									createBlock( 'core/paragraph', { content: after } ),
								] );
							} :
							undefined
					}
					onRemove={ () => onReplace( [] ) }
					style={ styles }
					className={ classesContainer }
					placeholder={ placeholder || __( 'Write heading…' ) }
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
)(HeadingBlock);
