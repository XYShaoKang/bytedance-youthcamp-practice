export interface GestureEvent extends CustomEvent {
  startX: number
  startY: number
  clientX: number
  clientY: number
  stop: () => void
}

declare global {
  interface ElementEventMap {
    start: GestureEvent
    panstart: GestureEvent
    pan: GestureEvent
    panend: GestureEvent
    pressstart: GestureEvent
    presscencel: GestureEvent
    pressend: GestureEvent
    tap: GestureEvent
    end: GestureEvent
  }
}
