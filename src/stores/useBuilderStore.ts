import { defineStore } from 'pinia'
import type { AnyElement, ElementType, Template } from '@/types/builder.ts'
import { Control, type ControlAction } from '@/enum/control.ts'
import { elements } from '@/stores/elements.ts'
type Action = { action: ControlAction; index: number }
export const useBuilderStore = defineStore('builder', {
  state(): Template & { action?: Action } {
    return {
      style: {},
      elements: [],
      action: undefined,
    }
  },

  actions: {
    setTemplate(template: Template) {
      this.$patch((state) => {
        state.style = template.style
        state.elements = template.elements
      })
    },

    deleteElement(index: number) {
      this.elements.splice(index, 1)
    },
    moveElement(from: number, to: number) {
      if (to < 0 || to >= this.elements.length) {
        return
      }
      this.$patch((state) => {
        const element: AnyElement = state.elements.splice(from, 1)[0] as AnyElement
        state.elements.splice(to, 0, element)
      })
    },

    setAction(action: ControlAction, index: number) {
      this.action = { action, index }
    },

    closeAction() {
      this.action = undefined
    },

    addElement(element: ElementType) {
      if (!this.action) {
        return
      }

      const elValue = elements.find((el) => el.type === element)

      if (!elValue) {
        return
      }

      this.$patch((store) => {
        if (store.action?.action === Control.ADD_BEFORE) {
          this.elements.splice(store.action.index, 0, elValue)
        } else {
          this.elements.splice((store.action?.index as number) + 1, 0, elValue)
        }

        ;(store.action as Action).action = Control.EDIT
      })
    },
  },

  getters: {
    currentElement(): AnyElement | undefined {
      if (!this.action) {
        return
      }

      return this.elements[this.action.index]
    },
  },
})
