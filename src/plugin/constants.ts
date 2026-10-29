/**
 * Plugin-level constants: registered view types, pane targets, icons, and
 * save-delay bounds.
 */
export type PaneTarget = (typeof PANE_TARGETS)[number]
export type ViewType = (typeof VIEW_TYPES)[number]
/**
 * For `.md` and `.tldr` ending files.
 */
export const VIEW_TYPE_TLDRAW = 'tldrawc-view' // custom view type

export const VIEW_TYPE_TLDRAW_READ_ONLY = 'tldrawc-read-only' // custom view type
/**
 * For `.tldraw` ending files. Deliberately left out of {@link VIEW_TYPES}, since it isn't a mode
 * the user can switch a document into — it only exists to explain why we can't open the file.
 */
export const VIEW_TYPE_TLDRAW_OFFLINE = 'tldrawc-offline' // custom view type
export const VIEW_TYPE_MARKDOWN = 'markdown' // NOT ACTUALLY A CUSTOM VIEW TYPE, its built in from obsidian
export const VIEW_TYPES = [
	VIEW_TYPE_MARKDOWN,
	VIEW_TYPE_TLDRAW,
	VIEW_TYPE_TLDRAW_READ_ONLY,
] as const
export const PANE_TARGETS = ['new-window', 'new-tab', 'current-tab', 'split-tab'] as const

export const isValidViewType = (str: string): str is ViewType => {
	return (VIEW_TYPES as readonly string[]).includes(str)
}

export const RIBBON_NEW_FILE = 'Create new tldrawc drawing'

export const DEFAULT_SAVE_DELAY = 500 // in ms
export const MIN_SAVE_DELAY = 250 // in ms
export const MAX_SAVE_DELAY = 3_600_000 // in ms

export const TLDRAW_ICON_NAME = 'tldrawc-icon'
export const TLDRAW_ICON = `<path fill-rule="evenodd" clip-rule="evenodd" d="M18 0H82A18 18 0 0 1 100 18V82A18 18 0 0 1 82 100H18A18 18 0 0 1 0 82V18A18 18 0 0 1 18 0ZM27.5 33A8.5 8.5 0 1 0 44.5 33A8.5 8.5 0 1 0 27.5 33ZM36 49.5A8.5 8.5 0 0 1 44.26 60C43 70 37 76 27 77C31 73 32 68 29.7 63.5A8.5 8.5 0 0 1 36 49.5ZM53 53H58.5L63 62L70 33H83V40H75L66 73L57 60H53Z" fill="currentColor"/>
`

export const MARKDOWN_ICON_NAME = 'tldrawc-markdown-icon'
export const MARKDOWN_ICON = `<path d="M14 72.5V27.5L29 42.5L44 27.5V72.5" stroke="currentColor" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/><path d="M59 57.5L74 72.5M74 72.5L89 57.5M74 72.5V27.5" stroke="currentColor" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>`
