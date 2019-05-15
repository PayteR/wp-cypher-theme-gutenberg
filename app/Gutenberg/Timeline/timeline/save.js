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
		centered,
		timelineWidth,
		customBackgroundColor,
		customTextColor,
		customFontSize,
		timelinePaddingTop,
		timelinePaddingRight,
		timelinePaddingBottom,
		timelinePaddingLeft,
		timelineMarginTop,
		timelineMarginBottom,
		headerBefore,
		headerAfter,
	} = attributes;

	const textClass = getColorClassName('color', textColor);
	const backgroundClass = getColorClassName('background-color', backgroundColor);
	const fontSizeClass = getFontSizeClass(fontSize);

	const classes = classnames(className, `timeline`, {
		'has-text-color': textColor || customTextColor,
		'has-background': backgroundColor || customBackgroundColor,
		[textClass]: textClass,
		[backgroundClass]: backgroundClass,
		[fontSizeClass]: fontSizeClass,
		[`has-width-${timelineWidth}`]: timelineWidth,
		[`has-text-${textAlign}`]: textAlign === 'left' || textAlign === 'right',
		[`has-text-centered`]: textAlign === 'center',
		['is-centered']: centered,
		['has-pl-' + timelinePaddingLeft]: !isNaN(timelinePaddingLeft),
		['has-pr-' + timelinePaddingRight]: !isNaN(timelinePaddingRight),
		['has-pb-' + timelinePaddingBottom]: !isNaN(timelinePaddingBottom),
		['has-pt-' + timelinePaddingTop]: !isNaN(timelinePaddingTop),
		['has-mt-' + timelineMarginTop]: !isNaN(timelineMarginTop),
		['has-mb-' + timelineMarginBottom]: !isNaN(timelineMarginBottom),
	});

	const styles = {
		backgroundColor: backgroundClass ? undefined : customBackgroundColor,
		color: textClass ? undefined : customTextColor,
		fontSize: fontSize ? undefined : customFontSize,
		textAlign: textAlign ? textAlign : undefined,
	};

	return (
		<div className={classes} style={styles}>
			{ headerBefore && (
				<header className="timeline-header">
					<span className="tag is-medium is-primary">{ headerBefore }</span>
				</header>
			)}
			<InnerBlocks.Content/>
			{ headerAfter && (
				<header className="timeline-header">
					<span className="tag is-medium is-primary">{ headerAfter }</span>
				</header>
			)}
		</div>
	);
}
