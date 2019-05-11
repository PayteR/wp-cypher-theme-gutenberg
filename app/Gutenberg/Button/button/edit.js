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
	IconButton,
	Button,
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
	const {textColor, buttonColor, fontSize, customFontSize} = ownProps.attributes;
	const editableNode = node.querySelector('[contenteditable="true"]');
	//verify if editableNode is available, before using getComputedStyle.
	const computedStyles = editableNode ? getComputedStyle(editableNode) : null;

	return {
		fallbackbuttonColor: buttonColor || !computedStyles ? undefined : computedStyles.buttonColor,
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
class ButtonBlock extends Component {

	constructor() {
		super(...arguments);
	}

	render() {
		const {
			attributes,
			setAttributes,
			className,
			isSelected,
		} = this.props;

		const {
			buttonText,
			buttonColor,
			buttonAlign,
			buttonSize,
			buttonOutlined,
			buttonInverted,
			buttonRounded,
			textAlign,
			buttonUrl,
			buttonMarginLeft,
			buttonMarginRight,
			buttonMarginTop,
			buttonMarginBottom,
			iconBeforeClass,
			iconAfterClass,
		} = attributes;

		const classesContainer = classnames(className, `button`, {
			[`has-text-${textAlign}`]: textAlign === 'left' || textAlign === 'right',
			[`has-text-centered`]: textAlign === 'center',
			[buttonColor]: buttonColor,
			[buttonSize]: buttonSize,

			[`is-outlined`]: buttonOutlined,
			[`is-inverted`]: buttonInverted,
			[`is-rounded`]: buttonRounded,
			[`is-block`]: buttonAlign === 'full',

			['has-ml-' + buttonMarginLeft]: !isNaN(buttonMarginLeft),
			['has-mr-' + buttonMarginRight]: !isNaN(buttonMarginRight),
			['has-mt-' + buttonMarginTop]: !isNaN(buttonMarginTop),
			['has-mb-' + buttonMarginBottom]: !isNaN(buttonMarginBottom),
		});

		const styles = {
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
					<SelectControl
						label={ __( 'Color' ) }
						value={ buttonColor } // e.g: value = [ 'a', 'c' ]
						onChange={ ( buttonColorNext ) => { setAttributes( { buttonColor: buttonColorNext } ) } }
						options={ [
							{ value: 'is-primary', label: 'primary' },
							{ value: 'is-secondary', label: 'secondary' },
							{ value: 'is-link', label: 'link' },
							{ value: 'is-info', label: 'info' },
							{ value: 'is-success', label: 'success' },
							{ value: 'is-warning', label: 'warning' },
							{ value: 'is-danger', label: 'danger' },
							{ value: 'is-white', label: 'white' },
							{ value: 'is-light', label: 'light' },
							{ value: 'is-dark', label: 'dark' },
							{ value: 'is-black', label: 'black' },
							{ value: 'is-text', label: 'text' },
						] }
					/>
					<SelectControl
						label={ __( 'Button size' ) }
						value={ buttonSize }
						onChange={ ( buttonSizeNext ) => { setAttributes( { buttonSize: buttonSizeNext } ) } }
						options={ [
							{ value: '', label: 'default' },
							{ value: 'is-small', label: 'small' },
							{ value: 'is-normal', label: 'normal' },
							{ value: 'is-medium', label: 'medium' },
							{ value: 'is-large', label: 'large' },
						] }
					/>
					<ToggleControl
						label={ __( 'Is outlined' ) }
						checked={ buttonOutlined }
						onChange={ ( buttonOutlinedNext ) => { setAttributes( { buttonOutlined: buttonOutlinedNext } ) } }
					/>
					<ToggleControl
						label={ __( 'Is inverted' ) }
						checked={ buttonInverted }
						onChange={ ( buttonInvertedNext ) => { setAttributes( { buttonInverted: buttonInvertedNext } ) } }
					/>
					<ToggleControl
						label={ __( 'Is rounded' ) }
						checked={ buttonRounded }
						onChange={ ( buttonRoundedNext ) => { setAttributes( { buttonRounded: buttonRoundedNext } ) } }
					/>
					{/*<ToggleControl*/}
						{/*label={ __( 'Is disabled' ) }*/}
						{/*checked={ buttonDisabled }*/}
						{/*onChange={ ( buttonDisabledNext ) => { setAttributes( { buttonDisabled: buttonDisabledNext } ) } }*/}
					{/*/>*/}
					<PanelBody title={__('Icons')} initialOpen={true}>
						<TextControl
							label="Icon class before"
							value={ iconBeforeClass }
							onChange={ ( iconBeforeClassNext ) => setAttributes( { iconBeforeClass: iconBeforeClassNext } ) }
						/>
						<TextControl
							label="Icon class after"
							value={ iconAfterClass }
							onChange={ ( iconAfterClassNext ) => setAttributes( { iconAfterClass: iconAfterClassNext } ) }
						/>
					</PanelBody>
					<PanelBody title={__('Button Options')} initialOpen={true}>
						<RangeControl
							label={__('Margin Left')}
							value={buttonMarginLeft}
							onChange={(value) => setAttributes({buttonMarginLeft: value})}
							min={0}
							max={6}
							step={1}
						/>
						<RangeControl
							label={__('Margin Right')}
							value={buttonMarginRight}
							onChange={(value) => setAttributes({buttonMarginRight: value})}
							min={0}
							max={6}
							step={1}
						/>
						<RangeControl
							label={__('Margin Top')}
							value={buttonMarginTop}
							onChange={(value) => setAttributes({buttonMarginTop: value})}
							min={0}
							max={6}
							step={1}
						/>

						<RangeControl
							label={__('Margin Bottom')}
							value={buttonMarginBottom}
							onChange={(value) => setAttributes({buttonMarginBottom: value})}
							min={0}
							max={6}
							step={1}
						/>
					</PanelBody>
				</InspectorControls>
				<div
					style={ {
						// textAlign: buttonAlign,
					} }
					className={ classesContainer }
				>
					{ iconBeforeClass && (
						<span className="icon">
							<i className={iconBeforeClass}></i>
						</span>
					)}
					<RichText
						tagName="span"
						placeholder={ __( 'Button text...', 'cypher' ) }
						keepPlaceholderOnFocus
						value={ buttonText }
						formattingControls={ [] }
						// className={ classes }
						// style={ styles }
						onChange={ (value) => setAttributes( { buttonText: value } ) }
					/>
					{ iconAfterClass && (
						<span className="icon">
							<i className={iconAfterClass}></i>
						</span>
					)}
					{ this.props.children }
				</div>
				{ isSelected && (
				<form
					key="form-link"
					className={ `blocks-button__inline-link button-${buttonAlign}`}
					onSubmit={ event => event.preventDefault() }
					style={ {
						textAlign: buttonAlign,
					} }
				>
					<Dashicon icon={ 'admin-links' } />
					<URLInput
						className="button-url"
						value={ buttonUrl }
						onChange={ ( value ) => setAttributes( { buttonUrl: value } ) }
					/>
					<IconButton
						icon="editor-break"
						label={ __( 'Apply', 'cypher' ) }
						type="submit"
					/>
				</form>
				) }
			</Fragment>
		);
	}
}

export default compose(
	withColors('buttonColor', {textColor: 'color'}),
	withFontSizes('fontSize'),
	/**
	 * Selects the child column Blocks for this parent Column
	 */
	applyFallbackStyles,
)(ButtonBlock);
