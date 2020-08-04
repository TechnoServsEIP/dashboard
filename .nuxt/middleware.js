const middleware = {}

middleware['auth'] = require('../middleware/auth.js')
middleware['auth'] = middleware['auth'].default || middleware['auth']

middleware['dashboard'] = require('../middleware/dashboard.js')
middleware['dashboard'] = middleware['dashboard'].default || middleware['dashboard']

export default middleware
