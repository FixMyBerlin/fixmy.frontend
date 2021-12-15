const debug = require('debug');

const log = debug('mock:IntersectionObserver');

const intersectionObserverMock = () => ({
  disconnect: () => log('called disconnect'),
  observe: () => log('called observe'),
  unobserve: () => log('called unobserve'),
});

window.IntersectionObserver = jest
  .fn()
  .mockImplementation(intersectionObserverMock);
