import React, { createContext } from "react";

const initialEntryState = {
  entries: [
    {
      date: "2021-08-01",
      duration: 10,
      rating: 5,
      text: "I felt great after this meditation",
    },
    {
      date: "2021-08-04",
      duration: 10,
      rating: 5,
      text: "This meditation was a bit hit or miss but we move. Let's make this a long text to see how it looks",
      type: "unguided",
    },
  ],
};

const entryContextWrapper = (component) => ({
  ...initialEntryState,
  addEntry: (entry) => {
    initialEntryState.entries.push(entry);
    component?.setState({ context: entryContextWrapper(component) });
  },
});

export const EntryContext = createContext(entryContextWrapper());

export class EntryContextProvider extends React.Component {
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
