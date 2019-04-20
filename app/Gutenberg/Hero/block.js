/**
 * BLOCK: my-block
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

// <div style="background-color:#900;color:#fff;padding:20px" class="wp-block-cypher-container container has-width-fullwidth" value="value test">Hello World, step 1 (from the editor).</div>
const {__} = wp.i18n; // Import __() from wp.i18n
const {registerBlockType} = wp.blocks; // Import registerBlockType() from wp.blocks
const {
	RichText,
	AlignmentToolbar,
	BlockControls,
} = wp.editor;

/**
 * Register: aa Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType('cypher/hero', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __('Hero', 'cypher'), // Block title.
	icon: 'universal-access-alt', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'layout', // Block category — Group blocks together based on common traits E.g. common, formatting,
	// layout widgets, embed.
	keywords: [],

	attributes: {
		className: 'hero',
		content: {
			type: 'array',
			source: 'children',
			selector: 'p',
		},
		alignment: {
			type: 'string',
			default: 'none',
		},
	},

	/**
	 * The edit function describes the structure of your block in the context of the editor.
	 * This represents what the editor will render when the block is used.
	 *
	 * The "edit" property must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 */
	edit: ( props ) => {
		const {
			attributes: {
				content,
				alignment,
			},
			className,
		} = props;

		const onChangeContent = ( newContent ) => {
			props.setAttributes( { content: newContent } );
		};

		const onChangeAlignment = ( newAlignment ) => {
			props.setAttributes( { alignment: newAlignment === undefined ? 'none' : newAlignment } );
		};

		return (
			<div>
				{
					<BlockControls>
						<AlignmentToolbar
							value={ alignment }
							onChange={ onChangeAlignment }
						/>
					</BlockControls>
				}
				<RichText
					className={ className }
					style={ { textAlign: alignment } }
					tagName="p"
					onChange={ onChangeContent }
					value={ content }
				/>
			</div>
		);
	},
	save: ( props ) => {
		return (
			<RichText.Content
				className={ `gutenberg-examples-align-${ props.attributes.alignment }` }
				tagName="p"
				value={ props.attributes.content }
			/>
		);
	},
});
