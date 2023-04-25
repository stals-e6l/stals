# stals 

Student Accommodation and Lodging System

## Getting started

1. Install ```nvm``` to manage Node.js versions. Refer to this [link](https://www.freecodecamp.org/news/node-version-manager-nvm-install-guide/) to download.

2. To verify that you have downloaded ```nvm```, type ```nvm --version```. This should print your version.

4. Inside the ```stals``` directory, type the command ```nvm use```. You should see the result ```Now using node v18.15.0 (npm v9.5.0)```.

3. You are now good to go!

## Additional setup
1. Please install MongoDB using this [link](https://www.mongodb.com/docs/manual/administration/install-community/).
2. Follow the steps correctly. Use the guide based on the recommended OS.
3. To verify that the MongoDB is installed, run the command ```mongosh```.


## For backend devs

1. Go inside the ```backend``` directory. 
2. Install dependencies using the command ```npm install```.
3. If you are using Windows, use ```npm run dev:windows``` to start the development server.
4. Else, use ```npm run dev```.

## For frontend devs
1. Go inside the ```frontend``` directory. 
2. Install dependencies using the command ```npm install```.
3. Run the client server using ```npm run dev```.

## For database devs
1. Follow the instructions for both ```backend``` and ```frontend``` devs.
2. Access the client link to start testing the application!

## What's the dev process?
1. Go to our [repository](https://github.com/stals-e6l/stals).
2. Go to the Issues page.
3. Find the ticket you are assigned with. You should be able to see the details of the ticket.
4. In the right panel of the detail page of the ticket, under Development, you should see a link button ```Create a branch```. Click it.
5. A popup should show up. Now, click the green button to continue creating a branch.
6. Copy the git commands given to you.
7. In your terminal, paste the commands. This should change your current branch to your ticket branch.
8. Start developing!

## What to do when you already completed your ticket?
1. Publish your ticket branch.
2. In Github, create a Pull Request using your recently published ticket branch.
3. Make sure to add the issue number of your ticket, summary, and reviewers. Usually, the reviewers are your team lead and the project manager.
4. PM and/or Team Leads will review your code.
5. If they have comments, resolved it.
6. If they approve it, merge it to the ```main``` branch.

## Commit cheatsheet
- Make smaller commits.
- Use ```chore: [message]``` if the commit is related to removing unused lines of code or any changes that doesn't affect the codebase.
- Use ```feat: [message]``` if you are implementing a new feature.
- Use ```refactor: [message]``` if you are improving an existing implementation/feature/
- Use ```fix: [message]``` if you are addressing bugs.
- Or for full details, you can follow this [cheatsheet](https://www.conventionalcommits.org/en/v1.0.0/).