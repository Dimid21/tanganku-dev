import { writable } from 'svelte/store';

/**
 * UI gate sebelum masuk edit mode
 * (modal "Edit page")
 */
export const showEditMenu = writable(false);
