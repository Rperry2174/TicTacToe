# TicTacToe
Tic Tac Toe

# Run locally
`npx react-native run-ios`

# Link fonts
`react-native link`

# Instructions
`https://github.com/GeekyAnts/NativeBase/issues/928`

# run server.js
`node server.js`

# run two simulators at the same time
https://stackoverflow.com/questions/38099010/running-multiple-ios-simulators-with-react-native
```
cd /Applications/Xcode.app/Contents/Developer/Applications
open -n Simulator.app
# Click "Ok" when you get "Unable to boot device in current state"
# Change simulator to be different than first simulator (e.g. Hardware -> Device -> iPhone 6s)
cd <react-native project>
npx react-native run-ios --simulator "iPhone XS"
```
