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

export default function save( { attributes } ) {
	const {
		className,
		textColor,
		backgroundColor,
		fontSize,
		textAlign,
		timelineWidth,
		customBackgroundColor,
		customTextColor,
		customFontSize,
		position,
	} = attributes;

	const textClass = getColorClassName( 'color', textColor );
	const backgroundClass = getColorClassName( 'background-color', backgroundColor );
	const fontSizeClass = getFontSizeClass( fontSize );

	const classes = classnames( className, `timeline-item`, {
		'has-text-color': textColor || customTextColor,
		'has-background': backgroundColor || customBackgroundColor,
		[textClass]: textClass,
		[backgroundClass]: backgroundClass,
		[fontSizeClass]: fontSizeClass,
		[position]: position,
		[`has-width-${timelineWidth}`]: timelineWidth,
		[`has-text-${ textAlign }`]: textAlign === 'left' || textAlign === 'right',
		[`has-text-centered`]: textAlign === 'center',
	} );

	const styles = {
		backgroundColor: backgroundClass ? undefined : customBackgroundColor,
		color: textClass ? undefined : customTextColor,
		fontSize: fontSize ? undefined : customFontSize,
		textAlign: textAlign ? textAlign : undefined,
	};

	return (
		<div className={ classes } style={styles}>
			<div className="timeline-marker is-primary">
			</div>
			<div className="timeline-content">
				<div className="timeline-wrap">
					<InnerBlocks.Content />
				</div>
			</div>
		</div>
	);
}
