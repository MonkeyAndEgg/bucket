# Bucket
A simple online shopping website. This is a MEAN application, which is built by using mongodb, express, angular and node.

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

## Testing
You can run some provided unit tests by following command:
```bash
npm run test
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.
