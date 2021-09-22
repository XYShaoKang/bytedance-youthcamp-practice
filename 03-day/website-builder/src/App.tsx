import React from 'react'
import { useImmer } from 'use-immer'

import s from './App.module.css'
import Sidebar from './Sidebar'
import EditPanel, { Row } from './EditPanel'

function App() {
  const [data, updateData] = useImmer<Row[]>([])

  return (
    <div className={s.container}>
      <Sidebar updateData={updateData}></Sidebar>
      <EditPanel data={data}></EditPanel>
    </div>
  )
}

export default App
