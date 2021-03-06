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
} = wp.editor;

export default function save({attributes}) {
	const {
		className,
		textColor,
		backgroundColor,
		fontSize,
		textAlign,
		breakpoint,
		gap,
		vcentered,
		centered,
		multiline,
		columnsWidth,
		customBackgroundColor,
		customTextColor,
		customFontSize,
		columnsPaddingTop,
		columnsPaddingRight,
		columnsPaddingBottom,
		columnsPaddingLeft,
		columnsMarginTop,
		columnsMarginBottom,
	} = attributes;

	const textClass = getColorClassName('color', textColor);
	const backgroundClass = getColorClassName('background-color', backgroundColor);
	const fontSizeClass = getFontSizeClass(fontSize);

	const classes = classnames(className, `columns`, {
		'has-text-color': textColor || customTextColor,
		'has-background': backgroundColor || customBackgroundColor,
		[textClass]: textClass,
		[backgroundClass]: backgroundClass,
		[fontSizeClass]: fontSizeClass,
		[`has-width-${columnsWidth}`]: columnsWidth,
		[`has-text-${textAlign}`]: textAlign === 'left' || textAlign === 'right',
		[`has-text-centered`]: textAlign === 'center',
		[breakpoint]: breakpoint,
		[`is-variable is-${gap}`]: gap,
		['is-vcentered']: vcentered,
		['is-centered']: centered,
		['is-multiline']: multiline,
		['has-pl-' + columnsPaddingLeft]: !isNaN(columnsPaddingLeft),
		['has-pr-' + columnsPaddingRight]: !isNaN(columnsPaddingRight),
		['has-pb-' + columnsPaddingBottom]: !isNaN(columnsPaddingBottom),
		['has-pt-' + columnsPaddingTop]: !isNaN(columnsPaddingTop),
		['has-mt-' + columnsMarginTop]: !isNaN(columnsMarginTop),
		['has-mb-' + columnsMarginBottom]: !isNaN(columnsMarginBottom),
	});

	const styles = {
		backgroundColor: backgroundClass ? undefined : customBackgroundColor,
		color: textClass ? undefined : customTextColor,
		fontSize: fontSize ? undefined : customFontSize,
		textAlign: textAlign ? textAlign : undefined,
	};

	return (
		<div className={classes} style={styles}>
			<InnerBlocks.Content/>
		</div>
	);
}
