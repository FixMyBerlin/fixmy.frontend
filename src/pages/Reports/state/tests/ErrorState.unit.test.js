import reducer, { actions } from '../ErrorState';

const initialState = {
  message: null,
  proceedMessage: null,
  proceedFunc: null
};

describe('ErrorState reducer and actions', () => {
  it('returns the initial state for an empty action', () => {
    expect(reducer(undefined, {}))
    .toMatchObject(initialState);
  });

  it('adds an error with a default message ' +
    'with no further details about the error', () => {
      expect(
        reducer(undefined, actions.addError())
      ).toEqual(
        {
          message: 'Ein Fehler ist aufgetreten',
          proceedMessage: null,
          proceedFunc: null
        }
      );
    });

  it('adds an error with a custom message', () => {
    const MESSAGE = 'Standortsuche fehlgeschlagen';
    expect(
      reducer(undefined, actions.addError({
        message: MESSAGE
      }))
    ).toEqual(
      {
        message: MESSAGE,
        proceedMessage: null,
        proceedFunc: null
      }
    );
  });

  it('adds an error with a custom ProceedButton spec', () => {
    const MESSAGE = 'Standortsuche fehlgeschlagen';
    const LABEL = 'Ort erneut eingeben';
    const FUNC = () => 1 + 2;
    expect(
      reducer(undefined, actions.addError({
        message: MESSAGE,
        proceedMessage: LABEL,
        proceedFunc: FUNC
      }))
    ).toEqual(
      {
        message: MESSAGE,
        proceedMessage: LABEL,
        proceedFunc: FUNC
      }
    );
  });

  it('removes an error', () => {
    expect(
      reducer({ message: 'some error' }, actions.removeError())
    ).toMatchObject(initialState);
  });
});
