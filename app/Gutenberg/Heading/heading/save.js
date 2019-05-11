/**
 * External dependencies
 */
import classnames from 'classnames';
import {getColorClassName, getFontSizeClass} from "../../utils/utils";

/**
 * WordPress dependencies
 */
const {
	InnerBlocks,
	RichText,
} = wp.editor;

export default function save({attributes}) {
	const {
		className,

		textColor,
		backgroundColor,
		fontSize,

		customBackgroundColor,
		customTextColor,
		customFontSize,

		textAlign,
		headingMarginTop,
		headingMarginBottom,
		content,
		level,
		fontFamily
	} = attributes;
	const tagName = 'h' + level;

	const textClass = getColorClassName( 'color', textColor );
	const backgroundClass = getColorClassName( 'background-color', backgroundColor );
	const fontSizeClass = getFontSizeClass( fontSize );

	const classesContainer = classnames(className, `title`, {
		'has-text-color': textColor || customTextColor,
		'has-background': backgroundColor || customBackgroundColor,
		[`is-${level}`]: level,
		[`has-text-${textAlign}`]: textAlign === 'left' || textAlign === 'right',
		[`has-text-centered`]: textAlign === 'center',
		[fontSizeClass]: fontSizeClass,
		[textClass]: textClass,
		[backgroundClass]: backgroundClass,
		[fontFamily]: fontFamily,

		['has-mt-' + headingMarginTop]: !isNaN(headingMarginTop),
		['has-mb-' + headingMarginBottom]: !isNaN(headingMarginBottom),
	});

	const styles = {
		backgroundColor: backgroundClass ? undefined : customBackgroundColor,
		color: textClass ? undefined : customTextColor,
		fontSize: fontSize ? undefined : customFontSize,
		textAlign: textAlign ? textAlign : undefined,
	};
	return (
		<RichText.Content
			tagName={ tagName }
			style={ styles }
			className={ classesContainer }
			value={ content }
		/>
	);
}
