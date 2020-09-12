# Sprint Challenge Instructions

**Read these instructions carefully. Understand exactly what is expected _before_ starting this Sprint Challenge.**

This challenge allows you to practice the concepts and techniques learned over the past sprint and apply them in a concrete project. This sprint explored **how to build web services based on the REST (REpresentational State Transfer) architectural style**. During this sprint, you studied **Node.js and Express, server side routing, how to write Express middleware and how to deploy an API to Heroku**. In your challenge this week, you will demonstrate your mastery of these skills by **designing and creating a web API to manage the following resources: `Projects` and `Actions`**.

This is an individual assessment. All work must be your own. Your challenge score is a measure of your ability to work independently using the material covered through this sprint. You need to demonstrate proficiency in the concepts and objectives introduced and practiced in preceding days.

You are not allowed to collaborate during the sprint challenge. However, you are encouraged to follow the twenty-minute rule and seek support from your TL if you need direction.

_You have **three hours** to complete this challenge. Plan your time accordingly._

## Introduction

In meeting the minimum viable product (MVP) specifications listed below, your project should provide an API that has Create, Read, Update and Delete (CRUD) functionality for both `projects` and `actions`.

### Database Schemas

The description of the structure and extra information about each _resource_ stored in the included database (`./data/lambda.db3`) is listed below.

#### Projects

| Field       | Data Type | Metadata                                                                    |
| ----------- | --------- | --------------------------------------------------------------------------- |
| id          | number    | no need to provide it when creating projects, the database will generate it |
| name        | string    | required.                                                                   |
| description | string    | required.                                                                   |
| completed   | boolean   | used to indicate if the project has been completed, not required            |

#### Actions

| Field       | Data Type | Metadata                                                                                         |
| ----------- | --------- | ------------------------------------------------------------------------------------------------ |
| id          | number    | no need to provide it when creating posts, the database will automatically generate it.          |
| project_id  | number    | required, must be the id of an existing project.                                                 |
| description | string    | up to 128 characters long, required.                                                             |
| notes       | string    | no size limit, required. Used to record additional notes or requirements to complete the action. |
| completed   | boolean   | used to indicate if the action has been completed, not required                                  |

### Database Persistence Helpers

The `/data/helpers` folder includes files you can use to manage the persistence of _project_ and _action_ data. These files are `projectModel.js` and `actionModel.js`. Both files publish the following api, which you can use to store, modify and retrieve each resource:

**All these helper methods return a promise. Remember to use .then().catch() or async/await.**

- `get()`: resolves to an array of all the resources contained in the database. If you pass an `id` to this method it will return the resource with that id if one is found.
- `insert()`: calling insert passing it a resource object will add it to the database and return the newly created resource.
- `update()`: accepts two arguments, the first is the `id` of the resource to update, and the second is an object with the `changes` to apply. It returns the updated resource. If a resource with the provided `id` is not found, the method returns `null`.
- `remove()`: the remove method accepts an `id` as it's first parameter and, upon successfully deleting the resource from the database, returns the number of records deleted.

The `projectModel.js` helper includes an extra method called `getProjectActions()` that takes a _project id_ as it's only argument and returns a list of all the _actions_ for the _project_.

We have provided test data for all the resources.

### Commits

Commit your code regularly and meaningfully. This helps both you (in case you ever need to return to old code for any number of reasons) and your team lead as the evaluate your solution.

## Interview Questions

Be prepared to demonstrate your understanding of this week's concepts by answering questions on the following topics. You might prepare by writing down your own answers before hand.

1. The core features of Node.js and Express and why they are useful.
   Node is a javascript runtime, based on the V8 JS engine, which allows us to run code written in JS outside of the browser. This is most useful because it allows us to write code for the server in JS, instead of a completely different language like PHP, Python, Java, etc. Express is a framework designed to simplify writing Node Servers. Some of it's chief features are the ability to easily set up route handlers,and to apply middleware functions to requests before responding.

2. Understand and explain the use of Middleware?
   Middleware is a function that is run between the server receiving a request and sending a response. It has access to both the Request and Response objects, and it can be chained (in the order you want it to run) with other middleware. It can modify the Request in whatever way you need it to, before passing it on to the next middleware function, till eventually express sends back a response. In express, middleware can be supplied to a specific route by calling server.use() and passing in the route and the middleware function, or by calling the MW directly within a route handler. Middleware is chained in the order that it is invoked.

3. The basic principles of the REST architectural style.
   A: Uniform Interfaces - Like a contract between the server and the client. Confidence that when the client accesses a certain URI, it will get back the expected resource, in the same way you expect your mail to be delivered to the same mailbox every day. ie. going to '/api/posts' should always return a list of posts, '/api/posts/id' should return posts specific to that id, etc. If there is a server issue, it should send back a clear error message.
   B: Statelessness - All requests can stand on their own, and order doesn't matter. ie. Asking of someone "Where does Jim Live? How old is he?". The second question relies on the first to understand who "he" is, this would be equivalent to making a request to get a users ID, and then making another request for that user ID without providing it again.
   C: Client-Server Model - The client shouldn't need to be concerned with how data is stored, or what database is used. The server needs to handle the task of retrieving the data correctly from the database, and send back the data the client is expecting, in the correct format.
   D: Layered Architecture - Each layer (client, middleware/server, database) only need be concerned with interacting with the layers next to it. If you change the database, this might effect the way that the server interacts with it, but it shouldn't effect the client.
   E: Caching - GET, PUT, and DELETE requests should be idempotent (repeatedly executing the same request will not change the state of the resources on the server)- POST, however, is not- repeatedly POSTing would add the resource multiple times.
   F: Code on demand - This constraint is optional, and rarely adhered to. The API will send back additional javascript code with the data that allows the client to use said code to operate on data.

4. Understand and explain the use of Express Routers.
   Express Routers allow us to break up router handlers in to different files for the sake of readability and maintainability. Instead of having all your routes in one gigantic server, each router can be passed to the server (as middleware), and accessed based on the base URL supplied. For Example, if you invoked server.use('/api/posts', postRouter), all requests to [host]/api/posts would use the route handlers in postRouter.

5. Describe tooling used to manually test the correctness of an API.
   To manually test an API without a front end, you can use a program like Postman or Insomnia. These are essentially like browsers, but they allow us to set the request method (a regular browser sends everything as a GET request), set a request body, apply headers, etc.

You are expected to be able to answer questions in these areas. Your responses contribute to your Sprint Challenge grade.

## Instructions

### Task 1: Project Set Up

- [ ] Create a forked copy of this project
- [ ] Add your team lead as collaborator on Github
- [ ] Clone your OWN version of the repository (Not Lambda's by mistake!)
- [ ] Create a new branch: git checkout -b `<firstName-lastName>`.
- [ ] Implement the project on your newly created `<firstName-lastName>` branch, committing changes regularly
- [ ] Push commits: git push origin `<firstName-lastName>`

### Task 2: Project Requirements

Your finished project must include all of the following requirements:

#### NPM Scripts

- [ ] An _npm script_ named _"server"_ that uses `nodemon`to run the API server.
- [ ] Use _nodemon_ as a development time dependency only that is not deployed to production.
- [ ] An _npm script_ named _"start"_ that uses `node` to run the API server.

#### Build an API

- [ ] Design and build endpoints for performing CRUD operations on _projects_ and _actions_. When adding an action, make sure the `project_id` provided belongs to an existing `project`. If you try to add an action with an `id` of 3 and there is no project with that `id` the database will return an error.
- [ ] Add an endpoint for retrieving the list of actions for a project.
- [ ] Use an HTTP client like `postman` or `insomnia` to test the API's endpoints.
- [ ] Use Express Routers to organize the API's code.

In your solution, it is essential that you follow best practices and produce clean and professional results. You will be scored on your adherence to proper code style and good organization. Schedule time to review, refine, and assess your work and perform basic professional polishing including spell-checking and grammar-checking on your work. It is better to submit a challenge that meets MVP than one that attempts too much and does not.

### Task 3: Stretch Goals

After finishing your required elements, you can push your work further. These goals may or may not be things you have learned in this module but they build on the material you just studied. Time allowing, stretch your limits and see if you can deliver on the following optional goals:

- [ ] Deploy the API to Heroku.
- [ ] Configure the API to support environment variables.
- [ ] Use middleware for validation of incoming data.

## Submission format

Follow these steps for completing your project.

- [ ] Submit a Pull-Request to merge <firstName-lastName> Branch into master (student's Repo). **Please don't merge your own pull request**
- [ ] Add your team lead as a reviewer on the pull-request
- [ ] Your team lead will count the project as complete after receiving your pull-request
