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
	RichText,
} = wp.editor;

export default function save({attributes}) {
	const {
		className,
		textColor,
		backgroundColor,
		fontSize,
		textAlign,
		listColumnsCount,
		listPaddingTop,
		listPaddingRight,
		listPaddingBottom,
		listPaddingLeft,
		listMarginTop,
		listMarginBottom,
		ordered,
		values,
		customBackgroundColor,
		customTextColor,
		customFontSize,
	} = attributes;

	const tagName = ordered ? 'ol' : 'ul';
	const textClass = getColorClassName( 'color', textColor );
	const backgroundClass = getColorClassName( 'background-color', backgroundColor );
	const fontSizeClass = getFontSizeClass( fontSize );

	const classes = classnames( className, 'cypher-list', {
		'has-text-color': textColor || customTextColor,
		'has-background': backgroundColor || customBackgroundColor,
		[fontSizeClass]: fontSizeClass,
		[textClass]: textClass,
		[backgroundClass]: backgroundClass,
		[`has-text-${ textAlign }`]: textAlign === 'left' || textAlign === 'right',
		[`has-text-centered`]: textAlign === 'center',
		['has-column-count-' + listColumnsCount]: !isNaN(listColumnsCount) && listColumnsCount > 1,
		['has-pl-' + listPaddingLeft]: !isNaN(listPaddingLeft),
		['has-pr-' + listPaddingRight]: !isNaN(listPaddingRight),
		['has-pb-' + listPaddingBottom]: !isNaN(listPaddingBottom),
		['has-pt-' + listPaddingTop]: !isNaN(listPaddingTop),
		['has-mt-' + listMarginTop]: !isNaN(listMarginTop),
		['has-mb-' + listMarginBottom]: !isNaN(listMarginBottom),
	} );

	const styles = {
		backgroundColor: backgroundClass ? undefined : customBackgroundColor,
		color: textClass ? undefined : customTextColor,
		fontSize: fontSize ? undefined : customFontSize,
		textAlign: textAlign ? textAlign : undefined,
	};

	return (
		<RichText.Content
			style={ styles }
			className={ classes }
			tagName={ tagName }
			value={ values }
			multiline="li"
		/>
	);
}
