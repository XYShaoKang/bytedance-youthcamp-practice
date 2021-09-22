import React, { useState } from 'react'

interface UseDragOptionType {
  onUp?: (e: MouseEvent) => void
  onDown?: (e: React.MouseEvent) => void
  onMove?: (e: MouseEvent) => void
}

interface UseDarg {
  (option?: UseDragOptionType): {
    point: {
      x: number
      y: number
      startX: number
      startY: number
    }
    mouseDownHandle: React.MouseEventHandler<Element>
    isDragging: boolean
  }
}

const useDrag: UseDarg = ({ onUp, onDown, onMove } = {}) => {
  const [point, setPoint] = useState({ x: 0, y: 0, startX: 0, startY: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const moveHandle = (e: MouseEvent) => {
    onMove?.(e)

    setPoint(({ startX, startY }) => ({
      startX,
      startY,
      x: e.clientX - startX,
      y: e.clientY - startY,
    }))
  }

  const upHandle = (e: MouseEvent) => {
    onUp?.(e)

    document.removeEventListener('mousemove', moveHandle)
    document.removeEventListener('mouseup', upHandle)
    setIsDragging(false)
  }

  const mouseDownHandle: React.MouseEventHandler = (e) => {
    onDown?.(e)

    setPoint(({ x, y }) => ({ x, y, startX: e.clientX, startY: e.clientY }))
    document.addEventListener('mousemove', moveHandle)
    document.addEventListener('mouseup', upHandle)
    setIsDragging(true)
  }
  return { point, mouseDownHandle, isDragging }
}

export default useDrag
