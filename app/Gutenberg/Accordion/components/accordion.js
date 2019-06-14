/**
 * Accordion Wrapper
 */

// Setup the block
const { Component } = wp.element;

const { slugify } = require('./../../utils/utils');

// Import block dependencies and components
import classnames from 'classnames';

/**
 * Create a Accordion wrapper Component
 */
export default class Accordion extends Component {

	constructor( props ) {
		super( ...arguments );
	}

	render() {

		// Setup the attributes
		const {
			accordionTitle,
			accordionText,
			accordionAlignment,
			accordionFontSize,
			accordionHrefHash
		} = this.props.attributes;


		let hrefHash = (accordionHrefHash ? slugify(accordionHrefHash) : slugify(accordionTitle));

		return (	
			<div id={ hrefHash }
				style={ {
					
				} }
				className={ classnames(
					this.props.className,
					accordionAlignment,
					'accordion'
				) }
			>
				{ this.props.children }
			</div>
		);
	}
}
