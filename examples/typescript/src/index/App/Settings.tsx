import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCogs } from '@fortawesome/free-solid-svg-icons/faCogs';
import * as React from 'react';
import { FormEvent } from 'react';
import { BottomModal, ModalTitle, ModalCloseTarget } from 'react-spring-modal';
import { StateProps } from '../shared/types';
import './Settings/Settings.css';

export function Settings({ state, setState }: StateProps) {
  const usingTypeScript = localStorage.getItem('use-typescript');
  const monster = localStorage.getItem('monster');

  function handleSubmit(event: FormEvent) {
    const formData = new FormData(event.target as HTMLFormElement);
    if (window.localStorage) {
      localStorage.setItem('use-typescript', formData.get('use-typescript') as string);
      localStorage.setItem('monster', formData.get('monster') as string);
    }

    setState({ type: 'idle' });
  }

  function close() {
    setState({ type: 'idle' });
  }

  return (
    <>
      <button
        className="Settings__open-button circle-icon-button"
        title="Open settings"
        aria-label="Open settings"
        onClick={() => setState({ type: 'settings' })}
      >
        <FontAwesomeIcon icon={faCogs} />
      </button>

      <BottomModal contentProps={{ className: 'Settings' }} isOpen={state.type === 'settings'} onDismiss={close}>
        <ModalTitle>Settings</ModalTitle>
        <p>Modify your settings here and make this site your own.</p>

        <form className="Settings__form Form" onSubmit={handleSubmit}>
          <div>
            <input
              type="checkbox"
              id="use-typescript-input"
              name="use-typescript"
              defaultChecked={usingTypeScript === 'on'}
            />
            <label htmlFor="use-typescript-input">Use TypeScript</label>
          </div>

          <fieldset>
            <legend>Choose your monster:</legend>

            <input type="radio" id="kraken" name="monster" value="kraken" defaultChecked={monster === 'kraken'} />
            <label htmlFor="kraken">Kraken</label>
            <br />

            <input
              type="radio"
              id="sasquatch"
              name="monster"
              value="sasquatch"
              defaultChecked={monster === 'sasquatch'}
            />
            <label htmlFor="sasquatch">Sasquatch</label>
            <br />

            <input type="radio" id="mothman" name="monster" value="mothman" defaultChecked={monster === 'mothman'} />
            <label htmlFor="mothman">Mothman</label>
          </fieldset>

          <section className="Form__actions">
            <button type="submit">Save</button>
            <ModalCloseTarget>
              <button type="button">Cancel</button>
            </ModalCloseTarget>
          </section>
        </form>
      </BottomModal>
    </>
  );
}
