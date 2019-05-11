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
		iconPaddingTop,
		iconPaddingRight,
		iconPaddingBottom,
		iconPaddingLeft,
		iconMarginTop,
		iconMarginBottom,
		dropCap,
		customBackgroundColor,
		customTextColor,
		customFontSize,
		buttonAlign,
		iconClassName,
	} = attributes;

	const textClass = getColorClassName( 'color', textColor );
	const backgroundClass = getColorClassName( 'background-color', backgroundColor );
	const fontSizeClass = getFontSizeClass( fontSize );

	const containerClasses = classnames( className, `cypher-icon`, {
		'has-text-color': textColor || customTextColor,
		'has-background': backgroundColor || customBackgroundColor,
		'has-drop-cap': dropCap,
		[fontSizeClass]: fontSizeClass,
		[textClass]: textClass,
		[backgroundClass]: backgroundClass,
		[`has-text-${ textAlign }`]: textAlign === 'left' || textAlign === 'right',
		[`has-text-centered`]: textAlign === 'center',
		[`is-block`]: buttonAlign === 'full',
		['has-pl-' + iconPaddingLeft]: !isNaN(iconPaddingLeft),
		['has-pr-' + iconPaddingRight]: !isNaN(iconPaddingRight),
		['has-pb-' + iconPaddingBottom]: !isNaN(iconPaddingBottom),
		['has-pt-' + iconPaddingTop]: !isNaN(iconPaddingTop),
		['has-mt-' + iconMarginTop]: !isNaN(iconMarginTop),
		['has-mb-' + iconMarginBottom]: !isNaN(iconMarginBottom),
	} );

	const styles = {
		backgroundColor: backgroundClass ? undefined : customBackgroundColor,
		color: textClass ? undefined : customTextColor,
		fontSize: fontSize ? undefined : customFontSize,
		textAlign: textAlign ? textAlign : undefined,
	};

	const classes = classnames(iconClassName);

	return (
		<span className={containerClasses} style={styles}>
			<i className={classes}>

			</i>
		</span>
	);
}
