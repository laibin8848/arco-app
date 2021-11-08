import React from 'react';
import { Modal } from '@arco-design/web-react';

export default (props) => {
  return (
    <Modal {...props}>
      {props.children}
    </Modal>
  );
};