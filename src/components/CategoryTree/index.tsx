import React, { memo, useState, useEffect } from 'react';
import { Button, Tree, Modal, Spin, Empty, TreeSelect } from '@arco-design/web-react';
import { IconPlus, IconDelete, IconEdit } from '@arco-design/web-react/icon';
import MenuForm from './form';
import useOpenModal from '../../hooks/useOpenModal';
import { listCategoryTree, deleteCategory } from '../../services/category';

const generatorTreeNodes = (treeData) => {
  return treeData.map((item) => {
    const { children, id, categoryName } = item;
    const restProps = { dataRef: item };
    return (
      <Tree.Node key={id} title={categoryName} {...restProps}>
        {children ? generatorTreeNodes(item.children) : null}
      </Tree.Node>
    );
  });
};

export function CategoryTreeSelect(props) {
  const [treeList, setTreeList] = useState([]);
  const [val, setVal] = useState(props.defaultValue);

  useEffect(()=> {
    listCategoryTree().then(res=> {setTreeList(res.data)});
  }, []);

  function onChange(val) {
    props.onChange(val)
    setVal(val)
  }

  return (
    <TreeSelect treeData={treeList} onChange={onChange} value={val} fieldNames={{ key: 'id', title: 'categoryName' }} />
  )
};

function CategoryTree(props) {
  const [treeList, setTreeList] = useState([]);
  const [treeLoading, setTreeLoading] = useState(true);

  function fetchMenuList() {
    listCategoryTree().then(res=> {
      setTreeLoading(false);
      setTreeList(res.data || []);
    });
  }

  useEffect(()=> {
    fetchMenuList();
  }, []);

  function onDelete(id = '') {
    Modal.confirm({
      title: '确定继续操作？',
      onOk: ()=> {
        deleteCategory(id).then(()=> {
          fetchMenuList();
        });
      }
    });
  }
  if(treeLoading) {
    return (
      <div style={{textAlign: 'center',padding: '10px'}}>
        <Spin dot size={12} />
      </div>
    )
  }

  return(
    <>
      {
        props.editable && (
          <div style={{marginBottom: '10px'}}>
            <Button type="primary" onClick={()=> {useOpenModal(MenuForm, { detail: { parentId: 0 }, onOk: fetchMenuList })}}>添加分类</Button>
          </div>
        )
      }
      {
        treeList.length ?
          <Tree
            {...props}
            renderExtra={(node: any) => {
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
                      useOpenModal(MenuForm, { detail: { parentId: node.dataRef.id }, onOk: fetchMenuList })
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
        : <Empty />
      }
    </>
  )
}

export default memo(CategoryTree);
