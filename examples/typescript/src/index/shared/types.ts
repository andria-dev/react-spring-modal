import * as React from 'react';

export interface State {
  type: string;
  [s: string]: any;
}

export interface StateProps {
  state: State;
  setState: React.Dispatch<React.SetStateAction<State>>;
}
