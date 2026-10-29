import { TLDataDocument, TLDataDocumentStore, TldrawPluginMetaData } from './document'
import { TLStore, createTLStore } from 'tldraw'
import { pluginShapeUtils } from 'src/tldraw/math'

export function processInitialData(initialData: TLDataDocument): TLDataDocumentStore {
	const {
		meta,
		store,
	}: {
		meta: TldrawPluginMetaData
		store: TLStore
	} = (() => {
		if (initialData.store) {
			return initialData
		}

		return {
			meta: initialData.meta,
			store: createTLStore({
				shapeUtils: pluginShapeUtils,
				initialData: initialData.raw,
			}),
		}
	})()

	return { meta, store }
}
