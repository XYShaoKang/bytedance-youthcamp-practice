import React, { FC, useRef, useState } from 'react'
import { Updater } from 'use-immer'

import { Row } from './EditPanel'
import s from './Sidebar.module.css'
import useDrag from './useDrag'

interface SidebarProps {
  updateData: Updater<Row[]>
}
const Sidebar: FC<SidebarProps> = ({ updateData }) => {
  const dragType = useRef<string>()
  const upHandle = (e: MouseEvent) => {
    let cur = document.elementFromPoint(e.clientX, e.clientY)

    while (
      cur instanceof HTMLElement &&
      cur.dataset['acceptType'] !== dragType.current
    ) {
      cur = cur.parentElement
    }

    if (!cur || !(cur instanceof HTMLElement)) return

    if (dragType.current === 'row') {
      updateData((data) => {
        data.push({ type: 'row', cols: [] })
      })
    }
    if (dragType.current === 'col') {
      const rowIndex = Number(cur.dataset['row'])
      updateData((data) => {
        data[rowIndex].cols.push({ type: 'col', children: [] })
      })
    }
    if (dragType.current === 'btn') {
      const colIndex = Number(cur.dataset['col'])
      const rowIndex = Number(cur.parentElement?.dataset['row'])
      updateData((data) => {
        data[rowIndex].cols[colIndex].children.push({
          type: 'btn',
          content: '按钮',
        })
      })
    }
  }
  const { point, mouseDownHandle, isDragging } = useDrag({ onUp: upHandle })

  const createMouseDownHandle = (type: string) => {
    return (e: React.MouseEvent) => {
      dragType.current = type
      mouseDownHandle(e)
    }
  }

  return (
    <div className={s.sidebar}>
      <span className={s.item} onMouseDown={createMouseDownHandle('row')}>
        Row
      </span>
      <span className={s.item} onMouseDown={createMouseDownHandle('col')}>
        Col
      </span>
      <span className={s.item} onMouseDown={createMouseDownHandle('btn')}>
        Button
      </span>
      {isDragging && (
        <div
          className={s.dragable}
          style={{
            left: point.startX,
            top: point.startY,
            transform: `translate(${point.x + 10}px, ${point.y + 10}px)`,
          }}
        ></div>
      )}
    </div>
  )
}

export default Sidebar
