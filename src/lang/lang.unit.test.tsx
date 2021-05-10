import debug from 'debug';
import {
  MessageFormatError,
  ReactIntlErrorCode,
  MissingTranslationError,
} from 'react-intl';

import config from '~/config';

import errorHandler from './errorHandler';

jest.mock('~/config');
jest.mock('debug', () => {
  const mockClients = {};
  const debugClient = (name) => {
    if (!mockClients[name]) mockClients[name] = jest.fn();
    return mockClients[name];
  };
  return jest.fn((name) => {
    return debugClient(name);
  });
});

describe('errorHandler', () => {
  const logger: any = debug('fmc:intl');

  beforeEach(() => {
    // Clear all instances and calls to constructor and all methods:
    logger.mockClear();
  });
  it('logs intl error messages', () => {
    errorHandler(new MessageFormatError('test', 'de'));
    expect(logger.mock.calls[0][0]).toEqual('%O');
    expect(logger.mock.calls[0][1].code).toEqual(
      ReactIntlErrorCode.FORMAT_ERROR
    );
    expect(logger.mock.calls[0][1].message).toMatch('test');
  });

  it('logs missing translation messages when config is set', () => {
    config.intl.logMissingTranslations = true;
    errorHandler(new MissingTranslationError({ id: 'missing' }, 'de'));
    expect(logger.mock.calls).toHaveLength(1);
  });

  it('does not log missing translation messages when config is set', () => {
    config.intl.logMissingTranslations = false;
    errorHandler(new MissingTranslationError({ id: 'missing' }, 'de'));
    expect(logger.mock.calls).toHaveLength(0);
  });
});
