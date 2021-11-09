import { useState, useEffect } from 'react';
import request from '../utils/request';

function useTableQuery(url, params) {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    request.get(url, { params }).then((res) => {
        setData(res.data);
        setLoading(false);
    }).catch(() => {
      setLoading(false);
    })
  }, [url, params]);

  return { loading, data }
}

export default useTableQuery;
