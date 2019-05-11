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
		textAlign,
		examplePaddingTop,
		examplePaddingRight,
		examplePaddingBottom,
		examplePaddingLeft,
		exampleMarginTop,
		exampleMarginBottom,
		dropCap,
		customBackgroundColor,
		customTextColor,
		customFontSize,
		direction,
	} = attributes;

	const textClass = getColorClassName( 'color', textColor );
	const backgroundClass = getColorClassName( 'background-color', backgroundColor );
	const fontSizeClass = getFontSizeClass( fontSize );

	const classes = classnames( className, `example`, {
		'has-text-color': textColor || customTextColor,
		'has-background': backgroundColor || customBackgroundColor,
		'has-drop-cap': dropCap,
		[fontSizeClass]: fontSizeClass,
		[textClass]: textClass,
		[backgroundClass]: backgroundClass,
		[`has-text-${ textAlign }`]: textAlign === 'left' || textAlign === 'right',
		[`has-text-centered`]: textAlign === 'center',
		['has-pl-' + examplePaddingLeft]: !isNaN(examplePaddingLeft),
		['has-pr-' + examplePaddingRight]: !isNaN(examplePaddingRight),
		['has-pb-' + examplePaddingBottom]: !isNaN(examplePaddingBottom),
		['has-pt-' + examplePaddingTop]: !isNaN(examplePaddingTop),
		['has-mt-' + exampleMarginTop]: !isNaN(exampleMarginTop),
		['has-mb-' + exampleMarginBottom]: !isNaN(exampleMarginBottom),
	} );

	const styles = {
		backgroundColor: backgroundClass ? undefined : customBackgroundColor,
		color: textClass ? undefined : customTextColor,
		fontSize: fontSize ? undefined : customFontSize,
		textAlign: textAlign ? textAlign : undefined,
	};

	return (
		<div className={ classes } style={styles}>
			<InnerBlocks.Content />
		</div>
	);
}
