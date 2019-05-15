
import { kebabCase, find } from 'lodash';

const { select } = wp.data;
const {
	getColorObjectByColorValue,
} = wp.editor;

export const dimImageToStyle = (ratio) => {
	return ( ratio === 0 || isNaN(ratio) || ratio === 100 ) ?
		null : ratio / 100;
}

export function getColorClassName(colorContextName, colorSlug) {
	if (!colorContextName || !colorSlug) {
		return;
	}

	return "has-".concat(kebabCase(colorSlug), "-").concat(colorContextName);
}

export function getFontSizeClass(fontSizeSlug) {
	if (!fontSizeSlug) {
		return;
	}

	return "has-".concat(kebabCase(fontSizeSlug), "-font-size");
}

// Truncate excerpt
export function truncate(str, no_words) {
	return str.split(" ").splice(0,no_words).join(" ");
}

export function slugify(text, separator = "-") {
	return kebabCase(text, separator);
}

export function nl2br(text) {
	text = text.split('\n').map((item, key) => {
		return <span key={key}>{item}<br/></span>
	});
	return text;
}

export function setColorObject(color = null, colorContextName = 'color') {
	if(color && typeof color === 'object') {
		return color;
	}

	const settings = select( 'core/editor' ).getEditorSettings();
	const colorObject = getColorObjectByColorValue( settings.colors, color );
	let ret = {
		name: null,
		slug: null,
		color: color,
		class: null,
	};
	if( colorObject ) {
		ret.name = colorObject.name;
		ret.slug = colorObject.slug;
		ret.class = getColorClassName(colorContextName, colorObject.slug);
	}
	return ret;
}

export function getFontSizeObjectBySizeValue(fontSizes, size) {
	return find(fontSizes, {
		size: size
	});
}

export function setFontSizeObject(size = null) {
	if(size && typeof size === 'object') {
		return size;
	}

	const settings = select( 'core/editor' ).getEditorSettings();
	const fontSizeObject = getFontSizeObjectBySizeValue( settings.fontSizes, size );
	let ret = {
		name: null,
		slug: null,
		size: size,
		class: null,
	};
	if( fontSizeObject ) {
		ret.name = fontSizeObject.name;
		ret.slug = fontSizeObject.slug;
		ret.class = getFontSizeClass(fontSizeObject.slug);
	}
	return ret;
}
