/**
 * External dependencies
 */
import classnames from 'classnames';
import {
	dimImageToStyle,
	getColorClassName,
	getFontSizeClass
} from "./../../utils/utils";

/**
 * WordPress dependencies
 */
const {
	InnerBlocks,
} = wp.editor;

export default function save({attributes}) {
	const {
		className,
		textColor,
		backgroundColor,
		fontSize,
		dividerPaddingTop,
		dividerPaddingRight,
		dividerPaddingBottom,
		dividerPaddingLeft,
		dividerMarginTop,
		dividerMarginBottom,
		dropCap,
		customBackgroundColor,
		customTextColor,
		customFontSize,
		dividerWidth,
		dividerText,
	} = attributes;

	const textClass = getColorClassName( 'color', textColor );
	const backgroundClass = getColorClassName( 'background-color', backgroundColor );
	const fontSizeClass = getFontSizeClass( fontSize );

	const classes = classnames( className, `is-divider`, {
		'has-text-color': textColor || customTextColor,
		'has-background': backgroundColor || customBackgroundColor,
		'has-drop-cap': dropCap,
		[fontSizeClass]: fontSizeClass,
		[textClass]: textClass,
		[backgroundClass]: backgroundClass,
		['has-pl-' + dividerPaddingLeft]: !isNaN(dividerPaddingLeft),
		['has-pr-' + dividerPaddingRight]: !isNaN(dividerPaddingRight),
		['has-pb-' + dividerPaddingBottom]: !isNaN(dividerPaddingBottom),
		['has-pt-' + dividerPaddingTop]: !isNaN(dividerPaddingTop),
		['has-mt-' + dividerMarginTop]: !isNaN(dividerMarginTop),
		['has-mb-' + dividerMarginBottom]: !isNaN(dividerMarginBottom),
	} );

	const styles = {
		backgroundColor: backgroundClass ? undefined : customBackgroundColor,
		color: textClass ? undefined : customTextColor,
		fontSize: fontSize ? undefined : customFontSize,
		borderWidth: dividerWidth ? dividerWidth : undefined,
	};

	return (
		<div className={ classes } style={ styles } data-content={dividerText ? dividerText : null}/>
	);
}
