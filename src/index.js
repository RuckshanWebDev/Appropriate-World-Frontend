import './style.css'
import ReactDOM from 'react-dom/client'
import store from './store'
import App from './App'
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const root = ReactDOM.createRoot(document.querySelector('#root'))

root.render(
    <Provider store={store} >
        <ToastContainer position="top-center"
            pauseOnFocusLoss={false}
            autoClose={1000}
            hideProgressBar={true}
        >
        </ToastContainer  >
        <App />
    </Provider>
)