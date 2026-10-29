/**
 * Constants defining the on-disk format of tldraw markdown documents.
 */
export const FILE_EXTENSION = '.md'
export const FRONTMATTER_KEY = 'tldrawc-file'
export const TLDATA_DELIMITER_START = '!!!_START_OF_TLDRAWC_DATA__DO_NOT_CHANGE_THIS_PHRASE_!!!'
export const TLDATA_DELIMITER_END = '!!!_END_OF_TLDRAWC_DATA__DO_NOT_CHANGE_THIS_PHRASE_!!!'
/**
 * The extension used by tldraw offline. A `.tldraw` file is an archive holding a SQLite database
 * and its assets, not the JSON a `.tldr` file holds, so none of our parsing can read one.
 */
export const TLDRAW_OFFLINE_FILE_EXTENSION = '.tldraw'
export const TLDRAW_OFFLINE_UNSUPPORTED_TITLE = 'Can’t open .tldraw files yet'

/**
 * The extension of raw tldrawc documents. Kept distinct from tldraw's own `.tldr` so that the
 * official plugin and this one never claim the same files.
 */
export const TLDRAWC_FILE_EXTENSION = '.tldrc'
