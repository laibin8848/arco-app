import { useState, useEffect } from 'react';
import request from '../utils/request';

function useTableQuery(url, params) {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const { current } = params;
    const postData = { ...params, pageNo: current }
    setLoading(true);
    request.post(url, postData).then((res) => {
      setData(res.data);
      setLoading(false);
    }).catch(() => {
      setLoading(false);
    })
  }, [url, params]);

  return { loading, data }
}

export function useTableQueryGet(url, params) {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const { current } = params;
    const postData = { ...params, pageNo: current }
    setLoading(true);
    request.get(url, { params: postData }).then((res) => {
      setData(res.data);
      setLoading(false);
    }).catch(() => {
      setLoading(false);
    })
  }, [url, params]);

  return { loading, data }
}

export default useTableQuery;
