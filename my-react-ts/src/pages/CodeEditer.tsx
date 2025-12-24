import React, { use, useState } from 'react'
import Editer from '../componets/Editer'
const CodeEditer = () => {
    const [Code,setCode]=useState('')
  return (
    <div>
      <Editer  value={Code} onchange={setCode} />
    </div>
  )
}

export default CodeEditer
