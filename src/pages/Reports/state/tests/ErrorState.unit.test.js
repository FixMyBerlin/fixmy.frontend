import reducer, * as actions from '../ErrorState';

const initialState = {
  message: null,
  proceedButtonText: null,
  proceedButtonCallback: null
};

describe('error reducer', () => {
  it('returs the initial state for an empty action', () => {
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
          proceedButtonText: null,
          proceedButtonCallback: null
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
        proceedButtonText: null,
        proceedButtonCallback: null
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
        proceedButtonText: LABEL,
        proceedButtonCallback: FUNC
      }))
    ).toEqual(
      {
        message: MESSAGE,
        proceedButtonText: LABEL,
        proceedButtonCallback: FUNC
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
        proceedButtonText: LABEL,
        proceedButtonCallback: FUNC
      }))
    ).toEqual(
      {
        message: MESSAGE,
        proceedButtonText: LABEL,
        proceedButtonCallback: FUNC
      }
    );
  });

  it('removes an error', () => {
    expect(
      reducer(undefined, actions.removeError())
    ).toMatchObject(initialState);
  });
});
