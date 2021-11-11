import React, { useEffect, useState } from "react";
import { Select } from '@arco-design/web-react';
import { allRoleList } from '../../services/roles';

export default function RoleSelecter(props) {
  const [roles, setRoles] = useState([])
  const { defaultValue, onChange, mode } = props;

  useEffect(()=> {
    allRoleList().then(res=> {
      setRoles(res.data);
    })
  }, [])

  return (
    <Select mode={mode} defaultValue={defaultValue} onChange={onChange}>
      {
        roles.map(item=> {
          return (<Select.Option key={item.id} value={item.id}>{item.roleName}</Select.Option>)
        })
      }
    </Select>
  )
}
