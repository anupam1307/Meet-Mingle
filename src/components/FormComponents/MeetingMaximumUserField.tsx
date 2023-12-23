import { EuiFieldNumber, EuiFormRow } from '@elastic/eui'
import React from 'react'

export default function MeetingMaximumUserField({value,setValue}:{
    value:number,setValue:React.Dispatch<React.SetStateAction<number>>;
}) {
  return (
    <EuiFormRow label="Maximum People">
        <EuiFieldNumber placeholder="Maximum People" min={1} max={50} value={value} onChange={(e) => setValue(+e.target.value) }/>
    </EuiFormRow>
  )
}
