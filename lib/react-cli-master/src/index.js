import dva from 'dva'

import router from 'router'
import history from 'utils/history'

import homeModel from 'model/home'
const app = dva({
    history: history,
});
app.model(homeModel)
app.router(router)
app.start('#root')