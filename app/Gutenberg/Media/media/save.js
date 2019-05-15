/**
 * External dependencies
 */
import classnames from 'classnames';
import {
	getColorClassName,
	setColorObject,
	getFontSizeClass,
	setFontSizeObject,
} from "./../../utils/utils";

/**
 * WordPress dependencies
 */
const {
	InnerBlocks,
} = wp.editor;

export default function save({attributes}) {
	let {
		className,
		textColor,
		backgroundColor,
		fontSize,
		textAlign,
		mediaPaddingTop,
		mediaPaddingRight,
		mediaPaddingBottom,
		mediaPaddingLeft,
		mediaMarginTop,
		mediaMarginBottom,
		dropCap,
		customBackgroundColor,
		customTextColor,
		customFontSize,
		iconLeftClass,
		iconRightClass,
		iconLeftColor,
		iconRightColor,
		iconLeftFontSize,
		iconRightFontSize,
	} = attributes;

	const textClass = getColorClassName( 'color', textColor );
	const backgroundClass = getColorClassName( 'background-color', backgroundColor );
	const fontSizeClass = getFontSizeClass( fontSize );

	const classes = classnames( className, `media`, {
		'has-text-color': textColor || customTextColor,
		'has-background': backgroundColor || customBackgroundColor,
		'has-drop-cap': dropCap,
		[fontSizeClass]: fontSizeClass,
		[textClass]: textClass,
		[backgroundClass]: backgroundClass,
		[`has-text-${ textAlign }`]: textAlign === 'left' || textAlign === 'right',
		[`has-text-centered`]: textAlign === 'center',
		['has-pl-' + mediaPaddingLeft]: !isNaN(mediaPaddingLeft),
		['has-pr-' + mediaPaddingRight]: !isNaN(mediaPaddingRight),
		['has-pb-' + mediaPaddingBottom]: !isNaN(mediaPaddingBottom),
		['has-pt-' + mediaPaddingTop]: !isNaN(mediaPaddingTop),
		['has-mt-' + mediaMarginTop]: !isNaN(mediaMarginTop),
		['has-mb-' + mediaMarginBottom]: !isNaN(mediaMarginBottom),
		['has-icon']: iconLeftClass || iconRightClass,
		['has-icon-left']: iconLeftClass,
		['has-icon-right']: iconRightClass,
	} );

	const styles = {
		backgroundColor: backgroundClass ? undefined : customBackgroundColor,
		color: textClass ? undefined : customTextColor,
		fontSize: fontSize ? undefined : customFontSize,
		textAlign: textAlign ? textAlign : undefined,
	};


	iconLeftColor = setColorObject(iconLeftColor);
	iconRightColor = setColorObject(iconRightColor);
	iconLeftFontSize = setFontSizeObject(iconLeftFontSize);
	iconRightFontSize = setFontSizeObject(iconRightFontSize);

	const classesLeft = classnames("media-left", {
		['has-text-color']: iconLeftColor.color,
		[iconLeftColor.class]: iconLeftColor.class,
		[iconLeftFontSize.class]: iconLeftFontSize.class,
	});

	const stylesLeft = {
		color: iconLeftColor.class ? undefined : iconLeftColor.color,
		fontSize: !iconLeftFontSize.class && iconLeftFontSize.size ? iconLeftFontSize.size + 'px' : undefined,
	};

	const classesRight = classnames("media-right", {
		['has-text-color']: iconLeftColor.color,
		[iconRightColor.class]: iconRightColor.class,
		[iconRightFontSize.class]: iconRightFontSize.class,
	});

	const stylesRight = {
		color: iconRightColor.class ? undefined : iconRightColor.color,
		fontSize: !iconRightFontSize.class && iconRightFontSize.size ? iconRightFontSize.size + 'px' : undefined,
	};



	return (
		<div className={ classes } style={styles}>
			{ iconLeftClass && (
				<div className={classesLeft} style={stylesLeft}>
							<span className="icon">
								<i className={iconLeftClass}></i>
							</span>
				</div>
			)}
			<div class="media-content">
				<InnerBlocks.Content />
			</div>
			{ iconRightClass && (
				<div className={classesRight} style={stylesRight}>
							<span className="icon">
								<i className={iconRightClass}></i>
							</span>
				</div>
			)}
		</div>
	);
}
