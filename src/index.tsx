import React, { useState, useEffect } from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { ConfigProvider } from '@arco-design/web-react';
import zhCN from '@arco-design/web-react/es/locale/zh-CN';
import enUS from '@arco-design/web-react/es/locale/en-US';
import ReactDOM from 'react-dom';
import { Router, Switch, Route } from 'react-router-dom';
import request from './utils/request';
import rootReducer from './redux';
import history from './history';
import PageLayout from './layout/page-layout';
import { GlobalContext } from './context';
import './style/index.less';
// import './mock';
import Login from './pages/login';
import checkLogin from './utils/checkLogin';

const store = createStore(rootReducer);

// function DebuggerChild(){
//   const [count, setcount] = useState(0);
//   return (
//     <span style={{width: 200, height: 200, background: 'red',float: 'left'}} onClick={()=> {setcount(Math.random())}}>
//       DebuggerChild{count}
//     </span>
//   )
// }

// function Debugger() {
//   return (
//     <div>
//       <span style={{width: 200 , background: '#ccc',float: 'left'}}>
//         debugger
//         <DebuggerChild />
//       </span>
//     </div>
//   )
// }

function Index() {
  const localeName = localStorage.getItem('arco-lang') || 'zh-CN';

  if (!localStorage.getItem('arco-lang')) {
    localStorage.setItem('arco-lang', localeName);
  }

  const [locale, setLocale] = useState();

  async function fetchLocale(ln?: string) {
    const locale = (await import(`./locale/${ln || localeName}`)).default;
    setLocale(locale);
  }

  function getArcoLocale() {
    switch (localeName) {
      case 'zh-CN':
        return zhCN;
      case 'en-US':
        return enUS;
      default:
        return zhCN;
    }
  }

  function fetchUserInfo(userId) {
    request.get(`/admin-backend/sys/user/getById/${userId}`).then((res) => {
      store.dispatch({
        type: 'update-userInfo',
        payload: { userInfo: res.data },
      });
    });
  }

  useEffect(() => {
    fetchLocale();
  }, []);

  useEffect(() => {
    const userId = checkLogin();
    if (userId !== '') {
      fetchUserInfo(userId);
    } else {
      history.push('/user/login');
    }
  }, []);

  const contextValue = {
    locale,
  };

  return locale ? (
    <Router history={history}>
      <ConfigProvider locale={getArcoLocale()}>
        <Provider store={store}>
          <GlobalContext.Provider value={contextValue}>
            <Switch>
              <Route path="/user/login" component={Login} />
              <Route path="/" component={PageLayout} />
            </Switch>
          </GlobalContext.Provider>
        </Provider>
      </ConfigProvider>
    </Router>
  ) : null;
}

ReactDOM.render(<Index />, document.getElementById('root'));
