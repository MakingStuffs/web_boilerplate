# Making Stuffs Boilerplate

A simple boilerplate I made to to speed up the process of starting a project using webpack, express, custom elements, SCSS and EJS templates.

Out of the box it should spin up a coming soon page with default logos and a hero slider which uses the custom element API. 

In order for the boiler plate to work correctly you will need to create the following files in your project's root directory, they are not included for security purposes: 

* An environment file named .env with attributes for: *SSL_CERT*, *SSL_KEY*, *SSL_PW*, *PORT*, *DOMAIN*

* An SSL certificate with the filename *cert.cert*

* An SSL Key with the filename *key.key*

* An exclude list with the filename *exclude.lst*

## Default Commands

The following commands can be executed in your terminal window:

`npm run dev` - Spins up a dev server with express which is available on the *PORT* specified in your .env file

`npm run prod` - Outputs a bundled package to a folder named *dist*. Warning this will delete any folder named *dist* which exists in the root directory

`npm run zip` - Compresses the contents of the *dist* folder. Warning this will delete any zip file named *dist* within the root directory

`npm run ssl` - Create an SSL certificate and corresponding key which will be emitted to the project's root directory with the password you specify.