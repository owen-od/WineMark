# WineMark point of interest project 
This project is a point of interest (POI) web application developed for assignment 1, and then adapted as the back end for assignment 2, in the full stack web development module of the Higher Diploma in Computer Science in SETU. 

The web application is built using node.js(v.16.13.2) and hapi.js (v.20.2.1). Bulma and the handlebars templating engine are used on the front end. 

The application is currently deployed with Heroku at the following URL: [https://winemark.herokuapp.com/](https://winemark.herokuapp.com/)

## Explore the project locally
Clone the project with the command: `git clone https://github.com/owen-od/WineMark`

In your project directory, run the following command: `npm install`

Open the project in your code editor (e.g. VS Code/Webstorm)

Create a file called `.env` in your project directory (as a peer of ‘src’)

Your `.env` file should look like the below:

```
COOKIE_NAME=entername
COOKIE_PASSWORD=enterpassword
db=mongodb://localhost/winemark
cloudinary_name=entername
cloudinary_key=enterkey
cloudinary_secret=entersecret
CLIENT_ID=enterid
CLIENT_SECRET=entersecret

```
We will also have to change the server connection in server.js. It currently looks like this:

```
const server = Hapi.server({
    port: process.env.PORT || 3000,
    routes: { cors: true },
  });
```

Change it to this:
```
const server = Hapi.server({
  port: 3000,
  host: 'localhost',
  routes: { cors: true },
});
```
Then uncomment `process.exit(1)` in the below (also in server.js)
```
const result = dotenv.config();
if (result.error) {
  console.log(result.error.message);
  // process.exit(1);
}
```

Now run the command `npm run dev` in the project directory and the project should be available at the below URL [http://localhost:3000/](http://localhost:3000/)

Note that no test data will be loaded when the application runs. However, some seed data is available when the application launches if line 30 in connect.j (in the mongo folder) is uncommented. Alternatively, if the ‘Placemark Model tests’ and ‘Region Model Tests’ are run some test data will be available to the user ‘maggie@simpson.com’ (password ‘secret’). 

Also note that the above will require you to have mongodb set up locally. If you do not, the web application can also be used with the use of the json data store. To switch to this, change the db.init call in the server.js file from `db.init(“mongo”)` to `db.init(“json”)`. 

## API
A sample API is also available for the application with endpoints for users, placemarks and regions.  This is documented with the Open API specification and can be found at the following URL: [https://winemark.herokuapp.com/documentation#](https://winemark.herokuapp.com/documentation#). If the application is deployed locally, the following URL may also be used: [http://localhost:3000/documentation#](http://localhost:3000/documentation#)


## Svelte front end
The Svelte front end that consumes the API is currently deployed here [https://wine-mark-svelte-owen-od.vercel.app/](https://wine-mark-svelte-owen-od.vercel.app/). The project repo is here [https://github.com/owen-od/WineMark-Svelte](https://github.com/owen-od/WineMark-Svelte)


## Contact
Contact me at 20095405@mail.wit.ie

