## Running the application
Make sure to have all the prerequisites from https://reactnative.dev/docs/environment-setup?guide=native.

1. Run `npm ci` in root folder
2. Run `npx pod-install ios`
3. Run `npx react-native start`
4. Follow instructions in terminal to run on ios or android


## Testing the application
Run `npm run test`


##
Future improvements and general comments
- As I’m not too familiar with the React Native ecosystem I have used packages that seem to be the most official. Might be better alternatives out there.
- Improve error handling structure, in terms of creating types for different error codes from the API and such, and also try/catching closer to the origin and centralise the different error states in redux.
- The solution for detecting poor internet connection feels kind of naive and not fine tuned. I would look at it as a first draft. Interested to hear how you typically solve it.
- Component testing should be done. I skipped this since I’m not familiar with react native component testing. Did a few unit tests of service code, though.
- Optimise persistence. Right now there is lots of unused data that is persisted. Could be optimised to only save data that is actually used in the views.
- Better typing of redux store and split into several files if more than one reducer. I also discovered that createStore is deprecated in favour of redux toolkit. Since I’m not familiar with redux toolkit I decided to use the deprecated createStore for now, but would probably use redux toolkit in the future.
- Error handling of persisting data. My idea was to dispatch an error action in the persistFavourites middleware, but I ran into some problems with that and decided to leave it for now. Maybe something to discuss with you.
- It was fun! I have many questions and thoughts that I hope to be able to share with you.
