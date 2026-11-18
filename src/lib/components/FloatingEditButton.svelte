<script>
  import { currentUser, isEditing } from '$lib/stores.js';
  import { showEditMenu } from '$lib/stores-edit.js';

  function openEditMenu() {
    showEditMenu.set(true);
  }
</script>

{#if $currentUser && !$isEditing}
  <button on:click={openEditMenu} class="floating-edit-btn" aria-label="Edit page">
    ✏️ Edit
  </button>
{/if}

<style>
  .floating-edit-btn {
    position: fixed;
    top: 16px;
    right: 16px;
    z-index: 9999;

    padding: 8px 14px;
    font-size: 13px;
    font-weight: 600;

    border-radius: 999px;
    border: 1px solid rgba(255, 255, 255, 0.25);

    background: rgba(20, 20, 20, 0.65);
    backdrop-filter: blur(10px);

    color: white;
    cursor: pointer;
  }

  .floating-edit-btn:hover {
    background: rgba(20, 20, 20, 0.85);
  }
</style>
