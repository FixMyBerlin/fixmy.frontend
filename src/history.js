import { createBrowserHistory } from 'history';

const history = createBrowserHistory({ basename: process.env.BASE_NAME });

export default history;
