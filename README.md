> The Project is in mode: **TODO**. It's part from Front-End module at Software University.
>> Public defense is forthcoming 11/04/2021 or 12/04/2021.
# ReactJS Project

## Theme: Animated pizza restaurant "Master"
## Type: E-commerce site


Design and implement a web application using:
 * React.js: "17.0.2";
 * Redux: "4.0.5";
 * React-redux: "7.2.3";
 * Prop-Types: "15.7.2; 
 * Redux-thunk: "2.3.0";

It's used service for back-end Firebase - **valid Realtime Database until 2021/04/28**

### 1. Application Structure
## 1.1. Private part (available for registered and login users, authentication is create via Redux).
> Instead of saving user in state on register, you save the user in Redux. You could be able to register (all users saved in redux) more then one user. You can login with any of the registered users. You can logout with one user, and login with another.
On login page is valible option to button to redirect to Register.
And on Register  is valible option to button to redirect to Login.
Authenticated (logged-in) it's save user data in LocalStorage.

The **RegisterControl** component have 4 fields with the following validation rules:
* Name - Must contain minimum 2 characters maximum 20 characters. Can only contain
Alphanumeric characters;
*  Email - Must be a valid email;
* Password - Must contain a minimum of 6 characters and maximum of 20 characters
* Repeat Password - Must match the Password field;

The check for these validation rules will be applied when the user clicks the “SIGN UP”
button.
If any of the fields is not valid it's show an error using the javascript alert function
Example: alert(‘Please enter a valid email’)
For the name and email validation rules it's used Regular Expressions.
If all of the fields are valid the user will be redirected to the LoginControl component.
All data is save (name, email, password) in the Global State.

The **LoginControl** component have 2 fields with the following validation rules:
* Email - Must match the email the user entered on the register page;
* Password - Must match he password the user entered on the register page;

The validation checks will be done when the user click LOGIN.
If the validation fails use the same alert(‘Invalid Credentials’) to display the error.

## 1.2. Public part (accessible without authentication).
When user is wihout authentication could see and create custom pizza /PizzaCreator.js/ with chosen products /PizzaProduct.js/, 
but can't fill form for order /ConatctForm.js/ and can't send order /Checkout.js/.
Every action, when user try to creat a animated pizza is under control - CreatPizzaControl.js and CreatPizzaControls.js.
