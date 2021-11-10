import React, { memo, useState, useEffect } from 'react';
import { Button, Tree } from '@arco-design/web-react';
import { IconPlus, IconDelete } from '@arco-design/web-react/icon';
import data from './tree.json';
import MenuForm from './form';
import useOpenModal from '../../hooks/useOpenModal';

function MenuTree(props) {
  const [treeList, setTreeList] = useState([]);

  useEffect(()=> {
    setTreeList(data?.data);
  }, []);

  const generatorTreeNodes = (treeData) => {
    return treeData.map((item) => {
      const { children, id, menuName } = item;
      return (
        <Tree.Node key={id} title={menuName}>
          {children ? generatorTreeNodes(item.children) : null}
        </Tree.Node>
      );
    });
  };

  return(
    <>
      {
        props.editable && (
          <div style={{textAlign: 'right', marginBottom: '10px'}}>
            <Button type="primary" onClick={()=> {useOpenModal(MenuForm, {})}}>添加顶级菜单</Button>
          </div>
        )
      }
      <Tree
        {...props}
        renderExtra={(node) => {
          return (
            <>
              <IconPlus
                style={{position: 'absolute', right: '26px', top: '10', color: '#3370ff'}}
                onClick={() => {
                  console.log('node', node)
                }}
              />
              <IconDelete
                style={{position: 'absolute', right: '8px', top: '10', color: 'red'}}
                onClick={() => {
                }}
              />
            </>
          )
        }}
      >
        {generatorTreeNodes(treeList)}
      </Tree>
    </>
  )
}

export default memo(MenuTree);
