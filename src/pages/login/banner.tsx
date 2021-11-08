import { Carousel } from '@arco-design/web-react';
import React from 'react';
import bannerImage from '../../assets/login-banner.png';

import styles from './style/index.module.less';

export default function LoginBannber() {
  const data = [
    {
      slogan: '物联网设备管理平台',
      subSlogan: '物联网（ IoT ，Internet of things ）即“万物相连的互联网”',
      image: bannerImage,
    },
  ];
  return (
    <Carousel className={styles.carousel} animation="fade">
      {data.map((item, index) => (
        <div key={`${index}`}>
          <div className={styles['carousel-item']}>
            <div className={styles['carousel-title']}>{item.slogan}</div>
            <div className={styles['carousel-sub-title']}>{item.subSlogan}</div>
            <img className={styles['carousel-image']} src={item.image} />
          </div>
        </div>
      ))}
    </Carousel>
  );
}
