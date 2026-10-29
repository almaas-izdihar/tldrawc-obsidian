import { defaultShapeUtils } from 'tldraw'
import { MathShapeUtil } from './MathShapeUtil'
import { MathTool } from './MathTool'

export { MathShapeUtil } from './MathShapeUtil'
export { MathTool } from './MathTool'
export type { MathShape } from './MathShape'

/** All shape utils the plugin's editors and stores know about. */
export const pluginShapeUtils = [...defaultShapeUtils, MathShapeUtil] as const
export const pluginTools = [MathTool] as const
