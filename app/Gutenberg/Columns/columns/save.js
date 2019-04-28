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
		containerWidth,
		customBackgroundColor,
		customTextColor,
		customFontSize,
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
		[`has-width-${containerWidth}`]: containerWidth,
		[`has-text-${textAlign}`]: textAlign === 'left' || textAlign === 'right',
		[`has-text-centered`]: textAlign === 'center',
		[breakpoint]: breakpoint,
		[`is-variable is-${gap}`]: gap,
		['is-vcentered']: vcentered,
		['is-centered']: centered,
		['is-multiline']: multiline,
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