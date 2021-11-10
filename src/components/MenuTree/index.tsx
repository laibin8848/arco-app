import React, { memo, useState, useEffect } from 'react';
import { Button, Tree, Message, Modal } from '@arco-design/web-react';
import { IconPlus, IconDelete, IconEmpty, IconEdit } from '@arco-design/web-react/icon';
import MenuForm from './form';
import useOpenModal from '../../hooks/useOpenModal';
import { getMenuTree, deleteMenu } from '../../services/menus';

function MenuTree(props) {
  const [treeList, setTreeList] = useState([]);

  function fetchMenuList() {
    getMenuTree().then(res=> {
      Message.success('菜单数据刷新……');
      setTreeList(res.data || []);
    });
  }

  useEffect(()=> {
    fetchMenuList();
  }, []);

  const generatorTreeNodes = (treeData) => {
    return treeData.map((item) => {
      const { children, id, menuName } = item;
      return (
        <Tree.Node key={id} title={menuName} dataRef={item}>
          {children ? generatorTreeNodes(item.children) : null}
        </Tree.Node>
      );
    });
  };

  function onDelete(id = '') {
    Modal.confirm({
      title: '确定继续操作？',
      onOk: ()=> {
        deleteMenu(id).then(()=> {
          fetchMenuList();
        });
      }
    });
  }

  return(
    <>
      {
        props.editable && (
          <div style={{textAlign: 'right', marginBottom: '10px'}}>
            <Button type="primary" onClick={()=> {useOpenModal(MenuForm, { detail: { parentId: 0 }, onOk: fetchMenuList })}}>添加顶级菜单</Button>
          </div>
        )
      }
      {
        treeList.length ?
          <Tree
            {...props}
            renderExtra={(node) => {
              if(!props.editable) return null;
              return (
                <>
                  <IconEdit
                    style={{position: 'absolute', right: '52px', top: '10', color: '#3370ff'}}
                    onClick={() => {
                      useOpenModal(MenuForm, { detail: node.dataRef, onOk: fetchMenuList })
                    }}
                  />
                  <IconPlus
                    style={{position: 'absolute', right: '30px', top: '10', color: '#3370ff'}}
                    onClick={() => {
                      useOpenModal(MenuForm, { detail: { parentId: node.dataRef.id, onOk: fetchMenuList } })
                    }}
                  />
                  <IconDelete
                    style={{position: 'absolute', right: '8px', top: '10', color: 'red'}}
                    onClick={() => {
                      onDelete(node.dataRef.id);
                    }}
                  />
                </>
              )
            }}
          >
            {generatorTreeNodes(treeList)}
          </Tree>
        :
            (
              <div style={{textAlign: 'center'}}>
                暂无数据~<br />
                <IconEmpty style={{fontSize: 58}} />
              </div>
            )
      }
    </>
  )
}

export default memo(MenuTree);
