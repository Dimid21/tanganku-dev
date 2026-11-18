<script>
  import { toggleMark } from 'prosemirror-commands';
  import { markActive } from '$lib/editor/prosemirrorUtil';
  import { classNames } from '$lib/util';

  export let editorView;
  export let editorState;
  export let type;

  $: schema = editorState?.schema;
  $: markType = schema?.marks?.[type];

  $: command = markType ? toggleMark(markType) : null;
  $: disabled = !editorState || !markType || !command || !command(editorState, null);
  $: active = editorState && markType ? markActive(markType)(editorState) : false;

  function handleClick() {
    if (disabled || !editorView) return;
    command(editorState, editorView.dispatch, editorView);
    editorView.focus();
  }
</script>

<button
  on:click={handleClick}
  {disabled}
  class={classNames(
    active ? 'bg-gray-900 text-white' : 'hover:bg-gray-100',
    'sm:mx-1 rounded-full p-2 disabled:opacity-30'
  )}
>
  <slot />
</button>
