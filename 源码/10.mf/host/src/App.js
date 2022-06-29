import React from 'react'
import Sliders from './Sliders';
const RemoteNewsList = React.lazy(() => import('remote/NewsList'));
const App = () => {
  return (
    <div>
      <h2>本地组件Sliders</h2>
      <Sliders />
      <h2>远程组件RemoteNewsList</h2>
      <React.Suspense fallback="loading NewsList">
        <RemoteNewsList/>
      </React.Suspense>
     </div>
   )
}
export default App;