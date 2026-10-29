import { TLShape } from 'tldraw'

declare module 'tldraw' {
	interface TLGlobalShapePropsMap {
		math: {
			w: number
			h: number
			/** Raw LaTeX source, rendered with KaTeX. */
			latex: string
		}
	}
}

export type MathShape = TLShape<'math'>
