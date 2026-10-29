import { createShapeId, PageRecordType } from 'tldraw'
import { describe, expect, it } from 'vitest'
import { createRawTldrawFile } from 'src/plugin/document/tldraw-file'
import { migrateTldrawFileDataIfNecessary } from 'src/plugin/document/migrate/tl-data-to-tlstore'
import { pluginShapeUtils } from 'src/tldraw/math'
import { createTLStore } from 'tldraw'

describe('math shape', () => {
	it('survives a serialize/parse round trip with its LaTeX intact', () => {
		const store = createTLStore({ shapeUtils: pluginShapeUtils })
		const id = createShapeId()
		const page = PageRecordType.create({ name: 'Page 1', index: 'a1' as never })
		const pageId = page.id
		store.put([
			page,
			{
				id,
				typeName: 'shape',
				type: 'math',
				parentId: pageId,
				index: 'a1',
				x: 10,
				y: 20,
				rotation: 0,
				isLocked: false,
				opacity: 1,
				meta: {},
				props: { w: 240, h: 80, latex: '\\frac{x^2}{2}' },
			} as never,
		])

		const raw = createRawTldrawFile(store)
		const restored = migrateTldrawFileDataIfNecessary(raw)
		const shape = restored.get(id) as { type: string; props: { latex: string } } | undefined

		expect(shape?.type).toBe('math')
		expect(shape?.props.latex).toBe('\\frac{x^2}{2}')
	})
})
