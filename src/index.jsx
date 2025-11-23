// import React from 'react'
import './assets/style/main.css'

// import ReactDOM from 'react-dom/client'
// import { App } from './RootCmp'

// ReactDOM.createRoot(document.getElementById('root')).render(<App />)
import React from 'react'
import ReactDOM from 'react-dom/client'

import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'


import { store } from '../store/store'
import { App } from './RootCmp'

// import './assets/styles/main.css'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
	<Provider store={store}>
		<Router>
			<App />
		</Router>
	</Provider>
)
