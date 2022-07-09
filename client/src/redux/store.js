import { composeWithDevTools } from '@redux-devtools/extension';
import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import reducers from './reducers/rootReducer';

const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));

const DataProvider = ({ children }) => {
	return <Provider store={store}>{children}</Provider>;
};

export default DataProvider;
