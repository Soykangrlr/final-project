
import './App.css';

import AppPages from './pages';
import  { Toaster } from 'react-hot-toast'
import store from './redux'
import { Provider } from 'react-redux'

function App() {
  return (
    <Provider store={store} >
      <Toaster position="top-center"/>
    <div className="App">
     <AppPages/>
    </div>
    </Provider>
  );
}

export default App;
