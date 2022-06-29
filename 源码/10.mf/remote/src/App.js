import React from 'react'
import NewsList from './NewsList';
const RemoteSliders = React.lazy(() => import('remote/Sliders'));
const App = () => {
  return (
    <div>
      <h2>本地组件NewsList</h2>
      <NewsList />
      <React.Suspense fallback="loading Sliders">
        <RemoteSliders />
      </React.Suspense>
     </div>
   )
}
export default App;