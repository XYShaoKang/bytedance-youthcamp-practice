import React, { FC } from 'react'
import s from './EditPanel.module.css'

type Btn = {
  type: 'btn'
  content: string
}
type Col = {
  type: 'col'
  children: Btn[]
}

export type Row = {
  type: 'row'
  cols: Col[]
}

interface EditPanelProps {
  data: Row[]
}

function renderData(data: Array<Row | Col | Btn>) {
  return data.map((d, i) => {
    switch (d.type) {
      case 'row':
        return (
          <div
            key={'row' + i}
            data-accept-type="col"
            data-row={i}
            className={s.row}
          >
            {renderData(d.cols)}
          </div>
        )
      case 'col':
        return (
          <div
            key={'col' + i}
            data-accept-type="btn"
            data-col={i}
            className={s.col}
          >
            {renderData(d.children)}
          </div>
        )
      case 'btn':
        return (
          <button key={'btn' + i} data-btn={i}>
            {d.content}
          </button>
        )
      default:
        break
    }
  })
}

const EditPanel: FC<EditPanelProps> = ({ data }) => {
  return (
    <div className={s.editpanel} data-accept-type="row">
      {renderData(data)}
    </div>
  )
}

export default EditPanel
