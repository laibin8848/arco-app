import React, { useEffect, useState } from "react";
import request from '../../utils/request';

interface CaptchaProps {
  captchaReady: Function;
}

const Captcha: React.FC<CaptchaProps> = ({
  captchaReady
}: CaptchaProps) => {
  const [captcha, setCaptcha] = useState('')

  const getCaptcha = () => {
    request.get('/admin-backend/login/captcha').then(res=> {
      captchaReady(res.data.checkKey)
      setCaptcha(res.data.captchaBase64)
    })
  }

  useEffect(()=> {
    getCaptcha()
  }, [])

  return (
    <img onClick={getCaptcha} style={{height: '30px', width: '100px', marginLeft: '4px', cursor: 'pointer', float: 'right'}} src={captcha} />
  )
}

export default Captcha;
