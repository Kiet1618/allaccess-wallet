import { GlobalStyles } from "./styles/global.css";
import Router from "./router";
import { store } from './store/store'
import { Provider } from 'react-redux'
const App = () => {

  return (

    <Provider store={store}>
      <Router />
    </Provider>
  );
}

export default App;
