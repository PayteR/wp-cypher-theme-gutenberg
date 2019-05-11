
import { kebabCase } from 'lodash';

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
