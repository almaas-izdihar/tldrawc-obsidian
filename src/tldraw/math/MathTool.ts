import { createShapeId, StateNode } from 'tldraw'
import { MathShape } from './MathShape'

/**
 * Click on the canvas to place an equation and start editing its LaTeX source.
 */
export class MathTool extends StateNode {
	static override id = 'math'

	override onEnter() {
		this.editor.setCursor({ type: 'cross', rotation: 0 })
	}

	override onPointerDown() {
		const { editor } = this
		const point = editor.inputs.getCurrentPagePoint()
		const id = createShapeId()
		editor.createShape<MathShape>({
			id,
			type: 'math',
			x: point.x - 120,
			y: point.y - 40,
			props: { latex: '' },
		})
		editor.setSelectedShapes([id])
		editor.setEditingShape(id)
		editor.setCurrentTool('select.editing_shape')
	}

	override onCancel() {
		this.editor.setCurrentTool('select')
	}
}
