/**
 * Hello World: Step 1
 *
 * Simple block, renders and saves the same content without interactivity.
 *
 * Using inline styles - no external stylesheet needed.  Not recommended
 * because all of these styles will appear in `post_content`.
 */
(function (blocks, i18n, element) {
  var el = element.createElement;
  var __ = i18n.__;

  var blockStyle = {
    backgroundColor: '#900',
    color: '#fff',
    padding: '20px',
  };

  console.log(wp.blocks)

  blocks.registerBlockType('cypher/container', {
    title: __('Container', 'cypher'),
    icon: 'universal-access-alt',
    category: 'layout',
    attributes: {
      content: {
        type: 'string',
      },
      color: {
        type: 'string',
      },
    },
    edit: function (props) {
      return el(
        'div',
        {
          style: blockStyle,
          className: 'container',
          value: 'value test',
        },
        'Hello World, step 1 (from the editor).'
      );
    },
    save: function (props) {
      return el(
        'div',
        {
          style: blockStyle,
          className: 'container',
          value: 'value test',
        },
        'Hello World, step 1 (from the editor).'
      );
    },
  });


  // blocks.registerBlockType('cypher/container', {
  //   title: __('Container', 'cypher'),
  //   icon: 'universal-access-alt',
  //   category: 'layout',
  //   edit: function (props) {
  //     return el(blocks.RichText, {
  //       tagName: 'p',
  //       className: props.className,
  //       value: props.attributes.content,
  //       onChange: function (newContent) {
  //         props.setAttributes({content: newContent});
  //       },
  //     }, 'test');
  //   },
  //   save: function () {
  //     return el(
  //       'p',
  //       {style: blockStyle},
  //       'Hello World, step 1 (from the frontend).'
  //     );
  //   },
  // });
}(
  window.wp.blocks,
  window.wp.i18n,
  window.wp.element
));
