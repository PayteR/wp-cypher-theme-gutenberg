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
		containerPaddingTop,
		containerPaddingRight,
		containerPaddingBottom,
		containerPaddingLeft,
		containerMarginTop,
		containerMarginBottom,
		containerMaxWidth,
		containerDimRatio,
		containerImgURL,
		containerImgID,
		containerImgAlt,
		containerImgFit,
		containerWidth,
		dropCap,
		customBackgroundColor,
		customTextColor,
		customFontSize,
		direction,
	} = attributes;

	console.log(
		textAlign,
	);

	const textClass = getColorClassName( 'color', textColor );
	const backgroundClass = getColorClassName( 'background-color', backgroundColor );
	const fontSizeClass = getFontSizeClass( fontSize );

	const classes = classnames( className, `container`, {
		'has-text-color': textColor || customTextColor,
		'has-background': backgroundColor || customBackgroundColor,
		'has-drop-cap': dropCap,
		[fontSizeClass]: fontSizeClass,
		[textClass]: textClass,
		[backgroundClass]: backgroundClass,
		[`has-width-${containerWidth}`]: containerWidth,
		[`has-text-${ textAlign }`]: textAlign === 'left' || textAlign === 'right',
		[`has-text-centered`]: textAlign === 'center',
		['has-background-image']: !!containerImgURL,
		['has-pl-' + containerPaddingLeft]: !isNaN(containerPaddingLeft),
		['has-pr-' + containerPaddingRight]: !isNaN(containerPaddingRight),
		['has-pb-' + containerPaddingBottom]: !isNaN(containerPaddingBottom),
		['has-pt-' + containerPaddingTop]: !isNaN(containerPaddingTop),
		['has-mt-' + containerMarginTop]: !isNaN(containerMarginTop),
		['has-mb-' + containerMarginBottom]: !isNaN(containerMarginBottom),
	} );

	const styles = {
		backgroundColor: backgroundClass ? undefined : customBackgroundColor,
		color: textClass ? undefined : customTextColor,
		fontSize: fontSize ? undefined : customFontSize,
		textAlign: textAlign ? textAlign : undefined,
		maxWidth: containerMaxWidth ? `${containerMaxWidth}px` : undefined,
	};

	return (
		<div className={ classes } style={styles}>
			{ containerImgURL && !! containerImgURL.length && (
				<img
					style={
						{'opacity': dimImageToStyle(containerDimRatio)}
					}
					className={ classnames(
						'image',
						'is-fit-' + containerImgFit
					) }
					src={ containerImgURL }
					alt={ containerImgAlt }
				/>
			) }
			<InnerBlocks.Content />
		</div>
	);
}
