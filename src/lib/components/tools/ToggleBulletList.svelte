<script>
  import { classNames } from '$lib/util';
  import { wrapInList } from 'prosemirror-schema-list';

  export let editorView;
  export let editorState;

  $: schema = editorState?.schema;
  $: disabled = !editorState || !schema || !wrapInList(schema.nodes.bullet_list)(editorView.state);

  function handleClick() {
    if (disabled || !editorView) return;
    wrapInList(schema.nodes.bullet_list)(editorState, editorView.dispatch);
    editorView.focus();
  }
</script>

<button
  on:click={handleClick}
  {disabled}
  class={classNames('disabled:opacity-30 rounded-full p-2 sm:mx-1 hover:bg-gray-100')}
>
  <slot />
</button>
