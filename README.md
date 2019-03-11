## How to Run Application

1. Open CMD on root folder(~/betr-lend-app/)
2. npm install
3. npm start


This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

### `Root Application Index.js`
##  `Components`

All the Resuable component for Load Calculator are in this folder
1. RightSlide : This display  The monthly amount  and Interest Rate.
                These are  PureComponent and Parent application is passing all props to this component.

2. SliderAmount : This is slider for Amount . Initial configuration are provided by the Parant as props.
                  This is also PureComponent.Slider is binded to even for onchange to the props function provided by Parent Component
3. SliderDuration : This is slider for Duration . Initial configuration are provided by the Parant as                         props.This is also PureComponent. Slider is binded to even for onchange to the props function provided by Parent Component.

4. Loan Calculator : This Main container for the resuable component. This component is listening to the event from its child component and also make API call for calculating the interest rate and monthly installment. 

##  `Services`
5. API : This is service layer , where Axios libarary has been use for making all HTTP calls. Wrapper has been written here to for all post and get call.


##  `Config`
5. Configuration : This is configuration file where all initial configuration attributes for intializing the slider and application is maintained.


##  `Constants`
5. Constant : This is constant file where all constants are declared that can be used across the application.
