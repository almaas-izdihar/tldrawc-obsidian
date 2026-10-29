import katex from 'katex'
import * as React from 'react'
import {
	BaseBoxShapeUtil,
	HTMLContainer,
	RecordProps,
	T,
	useEditor,
	useValue,
} from 'tldraw'
import { MathShape } from './MathShape'

const PADDING = 16
const MIN_W = 48
const MIN_H = 40

function renderLatex(latex: string) {
	return katex.renderToString(latex, {
		throwOnError: false,
		displayMode: true,
		output: 'htmlAndMathml',
	})
}

function MathShapeView({ shape }: { shape: MathShape }) {
	const editor = useEditor()
	const { latex, w, h } = shape.props
	const isEditing = useValue('isEditing', () => editor.getEditingShapeId() === shape.id, [
		editor,
		shape.id,
	])
	const contentRef = React.useRef<HTMLDivElement>(null)
	const inputRef = React.useRef<HTMLTextAreaElement>(null)
	// Only a blur that follows a real focus may end the edit. The browser moves focus to the canvas
	// right after the pointerdown that started the edit, which would otherwise close it at once.
	const hasHadFocusRef = React.useRef(false)
	const html = React.useMemo(() => renderLatex(latex || '\\text{double-click to edit}'), [latex])

	// Fit the shape to its rendered equation when the source changes, so that it doesn't need to
	// be resized by hand. Resizing afterwards is still respected until the source changes again.
	React.useLayoutEffect(() => {
		if (isEditing || editor.getIsReadonly()) return
		const el = contentRef.current
		if (!el) return
		const nextW = Math.max(MIN_W, Math.ceil(el.scrollWidth) + PADDING * 2)
		const nextH = Math.max(MIN_H, Math.ceil(el.scrollHeight) + PADDING * 2)
		if (Math.abs(nextW - w) < 2 && Math.abs(nextH - h) < 2) return
		editor.updateShape<MathShape>({
			id: shape.id,
			type: 'math',
			props: { w: nextW, h: nextH },
		})
		// eslint-disable-next-line @eslint-react/exhaustive-deps
	}, [latex, isEditing])

	React.useEffect(() => {
		if (!isEditing) {
			hasHadFocusRef.current = false
			return
		}
		const timeout = window.setTimeout(() => {
			inputRef.current?.focus()
			inputRef.current?.select()
		}, 80)
		return () => window.clearTimeout(timeout)
	}, [isEditing])

	return (
		<HTMLContainer
			id={shape.id}
			style={{
				width: w,
				height: h,
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				overflow: 'visible',
				pointerEvents: 'all',
				color: 'var(--tl-color-text, currentColor)',
			}}
		>
			<div
				ref={contentRef}
				style={{ display: 'inline-block', whiteSpace: 'nowrap', opacity: latex ? 1 : 0.4 }}
				// KaTeX output is generated from the LaTeX source by KaTeX itself with `trust` off.
				// eslint-disable-next-line @eslint-react/dom-no-dangerously-set-innerhtml
				dangerouslySetInnerHTML={{ __html: html }}
			/>
			{isEditing && (
				<textarea
					ref={inputRef}
					spellCheck={false}
					value={latex}
					placeholder="LaTeX, e.g. \frac{x^2}{2}"
					onChange={(e) =>
						editor.updateShape<MathShape>({
							id: shape.id,
							type: 'math',
							props: { latex: e.currentTarget.value },
						})
					}
					onPointerDown={(e) => e.stopPropagation()}
					onKeyDown={(e) => {
						e.stopPropagation()
						if (e.key === 'Escape' || (e.key === 'Enter' && !e.shiftKey)) {
							e.preventDefault()
							editor.setEditingShape(null)
						}
					}}
					onFocus={() => {
						hasHadFocusRef.current = true
					}}
					onBlur={() => {
						if (hasHadFocusRef.current) editor.setEditingShape(null)
					}}
					style={{
						position: 'absolute',
						top: h + 8,
						left: '50%',
						transform: 'translateX(-50%)',
						width: Math.max(w, 280),
						minHeight: 56,
						padding: 8,
						font: '14px var(--font-monospace, monospace)',
						color: 'var(--color-text, inherit)',
						background: 'var(--color-panel, #fff)',
						border: '1px solid var(--color-muted-2, #ccc)',
						borderRadius: 8,
						boxShadow: 'var(--shadow-2, 0 2px 8px rgba(0,0,0,.2))',
						resize: 'none',
						pointerEvents: 'all',
					}}
				/>
			)}
		</HTMLContainer>
	)
}

export class MathShapeUtil extends BaseBoxShapeUtil<MathShape> {
	static override type = 'math' as const
	static override props: RecordProps<MathShape> = {
		w: T.number,
		h: T.number,
		latex: T.string,
	}

	override getDefaultProps(): MathShape['props'] {
		return { w: 240, h: 80, latex: '' }
	}

	override canEdit() {
		return true
	}

	override component(shape: MathShape) {
		return <MathShapeView shape={shape} />
	}

	override getIndicatorPath(shape: MathShape) {
		const path = new Path2D()
		path.rect(0, 0, shape.props.w, shape.props.h)
		return path
	}
}
