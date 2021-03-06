Set up database:
migrate
post to sets '/seed'
post to cards '/seed'



# Express Boilerplate!

This is a boilerplate project used for starting new projects!

## Set up

Complete the following steps to start a new project (NEW-PROJECT-NAME):

1. Clone this repository to your local machine `git clone BOILERPLATE-URL NEW-PROJECTS-NAME`
2. `cd` into the cloned repository
3. Make a fresh start of the git history for this project with `rm -rf .git && git init`
4. Install the node dependencies `npm install`
5. Move the example Environment file to `.env` that will be ignored by git and read by the express server `mv example.env .env`
6. Edit the contents of the `package.json` to use NEW-PROJECT-NAME instead of `"name": "express-boilerplate",`

## Scripts

Start the application `npm start`

Start nodemon for the application `npm run dev`

Run the tests `npm test`

## Deploying

When your new project is ready for deployment, add a new Heroku application with `heroku create`. This will make a new git remote called "heroku" and you can then `npm run deploy` which will push to this remote's master branch.

## Cloning
After cloning from github:

rm -rf .git && git init
Now you have no previous commits in the test-project for a fresh git project.

Now install the npm dependencies npm install.

Move the example environment file by running mv example.env .env.

The final step would be to open the new project in your editor and edit the package.json:

  {
-   "name": "express-boilerplate",
+   "name": "test-project",
    "version": "0.0.1",