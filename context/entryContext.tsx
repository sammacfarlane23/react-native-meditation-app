import React, { createContext, useContext } from "react";

export interface Entry {
  date: string;
  duration: number;
  text: string;
}

const initialEntryState = {
  entries: [
    {
      date: "2021-08-01",
      duration: 600,
      text: "I felt great after this meditation",
    },
    {
      date: "2021-08-04",
      duration: 600,
      text: "This meditation was a bit hit or miss but we move. Let's make this a long text to see how it looks",
    },
  ],
};

const entryContextWrapper = (component: any) => ({
  ...initialEntryState,
  addEntry: (entry: Entry) => {
    initialEntryState.entries.push(entry);
    component?.setState({ context: entryContextWrapper(component) });
  },
});

export const EntryContext = createContext(entryContextWrapper(null as any));

type EntryContextProviderProps = {
  children: React.ReactNode;
};

type EntryContextProviderState = {
  context: ReturnType<typeof entryContextWrapper>;
};

export class EntryContextProvider extends React.Component<
  EntryContextProviderProps,
  EntryContextProviderState
> {
  state = {
    context: entryContextWrapper(this),
  };

  render() {
    return (
      <EntryContext.Provider value={this.state.context}>
        {this.props.children}
      </EntryContext.Provider>
    );
  }
}

export const useEntryContext = () => {
  const entryContext = useContext(EntryContext);
  return entryContext;
};
