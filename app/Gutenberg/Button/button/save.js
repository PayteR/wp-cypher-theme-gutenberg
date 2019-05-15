/**
 * External dependencies
 */
import classnames from 'classnames';

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
		buttonText,
		buttonColor,
		buttonAlign,
		buttonSize,
		buttonOutlined,
		buttonInverted,
		buttonRounded,
		textAlign,
		buttonUrl,
		buttonMarginLeft,
		buttonMarginRight,
		buttonMarginTop,
		buttonMarginBottom,
		iconBeforeClass,
		iconAfterClass,
	} = attributes;

	const classes = classnames(className, `button`, {
		[`has-text-${textAlign}`]: textAlign === 'left' || textAlign === 'right',
		[`has-text-centered`]: textAlign === 'center',
		[buttonColor]: buttonColor,
		[buttonSize]: buttonSize,

		[`is-outlined`]: buttonOutlined,
		[`is-inverted`]: buttonInverted,
		[`is-rounded`]: buttonRounded,
		[`is-block`]: buttonAlign === 'full',

		['has-ml-' + buttonMarginLeft]: !isNaN(buttonMarginLeft),
		['has-mr-' + buttonMarginRight]: !isNaN(buttonMarginRight),
		['has-mt-' + buttonMarginTop]: !isNaN(buttonMarginTop),
		['has-mb-' + buttonMarginBottom]: !isNaN(buttonMarginBottom),
	});

	return (
		<a href={buttonUrl} className={classes}>
			{ iconBeforeClass && (
				<span className="icon">
					<i className={iconBeforeClass}></i>
				</span>
			)}
			<span className="button-inner">{buttonText}</span>
			{ iconAfterClass && (
				<span className="icon">
					<i className={iconAfterClass}></i>
				</span>
			)}
		</a>
	);
}
