> The Project is in mode: **TODO**. It's part from Front-End module at Software University.
>> Public defense is successful 11/04/2021.

# ReactJS Project

## Theme: Animated pizza restaurant "Master"
## Type: E-commerce site


Design and implement a web application using:
 * React.js: "17.0.2";
 * Redux: "4.0.5";
 * React-redux: "7.2.3";
 * Prop-Types: "15.7.2; /PizzaProduct component/
 * Redux-thunk: "2.3.0";

It's used service for back-end Firebase - **valid Realtime Database until 2021/04/28**

### 1. Application Structure
## 1.1. Private part (available for registered and login users, authentication is create via Redux).
> Application is have options for *register* for new users and *signin* for existing user in users database.
The first step is *validating form input and handling errors* /AuthControl component/ and the second is Firebase Authentication. 
You could be able to register (data is storage in Firebase). 
You could be use *signin* option if you have registration yet.
After user is authenticated (signin) user data it's save in LocalStorage, and if he use logout - data is remove from LocalStorage. 
You could be *logout* with one user, and login with another.
On Authentication page is valible option to switch between **Signin** and **Register** form.

The check for these validation rules will be applied when the user try entried value in input field.
If any of the fields is not valid it's show an error using the javascript alert function
Example: alert(‘Please enter a valid email’)
For the name and email validation rules it's used Regular Expressions.
If all of the fields are valid the user will be redirected to the home page-  **PizzaCreator** component and could be create custom animated pizza with products using the button for increase and decrease that amount. Validation via CreatePizzaControl/s components.
When the custom pizza is done, the user have a choice to be continued with preview order summary component or canceled and change products. If he continued to finish his order, he must to fill in the form before send Order. 
The ContactData component is with custom validation too. Data for ContactData and order content are sent in Realtime Database, Firebase.

## 1.2. Public part (accessible without authentication).
Part of public access is **AboutUs** component with short information and funny animation.
When user is wihout authentication could see and create custom pizza **PizzaCreator** with optional products **PizzaProduct**, 
but can't make order and can't send order. Every component have custom validation.
When user try to creat a animated pizza is with restriction - redirect to **Authentication** form.
