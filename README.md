# Bucket
A simple online shopping website. This is a MEAN application, which is built by using mongodb, express, angular and node.

![screenshot_1](https://user-images.githubusercontent.com/19787326/149854832-088b7c32-a232-4c67-b04f-fdc986819120.PNG)

![screenshot_2](https://user-images.githubusercontent.com/19787326/149854855-d3dbc1ba-0970-4bfe-aea9-3edaa3162eae.PNG)

![screenshot_3](https://user-images.githubusercontent.com/19787326/149854873-8a4649fa-7cd7-411b-ae53-fc7dc0059181.PNG)


## Getting Started
### For frondend
- Install dependencies first
```bash
npm install
```
- Start the application
```bash
npm start
```

### For backend
- Install dependencies first
- Need to create a file '.env' which includes following configuration:
```bash
JWT_KEY={{ your json web token key here }} // used for authentication
PORT=3000   // my BE port is 3000 but you can choose any other port number you want
MONGO_URL= {{ the url to your mongodb }}
STRIPE_KEY= {{ your secret key from your stripe account }}
USER= {{ your contact email address }} // will be used when sending the reset password mail to users
PASS= {{ your contact email password }}
HOST=smtp.gmail.com // i used gmail account so this is smpt for gmail, and this is used for sending reset password email too
RESET_BASE_URL=http://localhost:4200 // this will be the base url when the user gets the reset password link 
```
- Start the server
```bash
npm start
```
- Create a normal account through UI or DB and then transfer it to admin account. For now, the user are not able to create admin account on UI, the only way to create that account is to go to your mongodb and set the `isAdmin` field of the normal account from false (by default) to true. Only admin account is able to add/remove products

## Testing
You can run some provided unit tests by following command:
```bash
npm run test
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.


## Trouble Shooting
If you encounter error when sending reset password email, you probably need to turn on some settings for your mailbox. For example, gmail will need to allow less secure apps
to send emails: https://stackoverflow.com/questions/59188483/error-invalid-login-535-5-7-8-username-and-password-not-accepted
