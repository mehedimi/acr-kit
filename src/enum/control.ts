export const Control = {
  ADD_BEFORE: 1,
  ADD_AFTER: 2,
  MOVE_UP: 3,
  MOVE_DOWN: 4,
  EDIT: 5,
  DELETE: 6,
} as const

export type ControlAction = (typeof Control)[keyof typeof Control]

export type ControlData = {
  action: ControlAction
  name: 'acr:action'
  index: number
}
