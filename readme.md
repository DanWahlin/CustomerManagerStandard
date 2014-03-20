Customer Manager with AngularJS
===============

If you’re new to AngularJS check out my [AngularJS in 60-ish Minutes](http://weblogs.asp.net/dwahlin/archive/2013/04/12/video-tutorial-angularjs-fundamentals-in-60-ish-minutes.aspx) video tutorial or download the [free eBook](http://weblogs.asp.net/dwahlin/archive/2013/07/30/angularjs-in-60-ish-minutes-the-ebook.aspx). Also check out [The AngularJS Magazine](http://flip.it/bdyUX) for up-to-date information on using AngularJS to build Single Page Applications (SPAs).

![Customer Management App](https://raw2.github.com/DanWahlin/CustomerManagerStandard/master/CustomerManager/Content/images/customerApp.png)

This is the standard Customer Manager application. To view a version of the application that has custom routing visit [https://github.com/DanWahlin/CustomerManager](https://github.com/DanWahlin/CustomerManager).
This application demonstrates:

* A complete application with read-only and editable data
* Using AngularJS with $http in a factory to access a backend RESTful service
* Using BreezeJS in a factory to access a backend RESTful Service
* Techniques for showing multiple views of data (card view and list view)
* Custom filters for filtering customer and product data
* A custom directive to ensure unique values in a form for email 
* A custom directive that intercepts $http and jQuery XHR requests (in case either are used) and displays a loading dialog
* Form validation using AngularJS
* Provides login and authentication functionality (currently client-side only - plan to add server-side part too which is absolutely required in a "real" app)

The factories can be switched by changing the app/services/config useBreeze setting to true.

The AngularJS portion of the app is structured using the following folders:

![Customer Management App Structure](https://raw2.github.com/DanWahlin/CustomerManagerStandard/master/CustomerManager/Content/images/appFolders.png)

## Requirements:

###If you're using Visual Studio and .NET:

The following is required to support the backend services:

* Visual Studio 2012 Web Express (free version) or higher - http://www.microsoft.com/visualstudio/eng/products/visual-studio-express-products#product-express-summary

* ASP.NET MVC and Web API are used for the back-end services along with Entity Framework for database access (included if you have VS 2012 express installed)

To get started, double-click the CustomerManager.sln file located at the root of the CustomerManager repository. Once the solution loads press F5 to run the project.


###If you're using Node.js/Express/MongoDB

If you don't already have Node.js on your machine install it from http://nodejs.org. You'll also need to install MongoDB from http://www.mongodb.org if you don't have it already and get it configured and running using the instructions on their site.

In the CustomerManager directory execute 'npm install' to install Express, MongoDB and Mongoose (package.json).

Load sample data into MongoDB by performing the following steps:

* Execute 'mongod' to start the MongoDB daemon
* Navigate to the CustomerManager/server directory (the one that has initMongoData.js in it)
* Execute 'mongo' to start the MongoDB shell
* Enter the following in the mongo shell to load the data seed file:
 * use CustomerManager
 * load("initMongoData.js")

Start the Node/Express server:
* Navigate to the CustomerManager/server directory
* Execute 'node app.js'

View the application at http://localhost:3000

Thanks to [Tony Quinn](https://github.com/tonyq) for contributing the initial Node.js/MongoDB code!

## E2E tests using Protractor:

_E2E tests using Protractor for .NET, and Selenium's WebDriver wrapper for Angular_

Tests are written with [NUnit](http://nunit.org/) but feel free to change it.
(Tests use `http://localhost:58000/` so make sure IIS Express is running the app)

There are several ways to execute these tests:

* Using NUnit TestAdapter for Visual Studio 2012/2013 from the [NUnitTestAdapter](https://www.nuget.org/packages/NUnitTestAdapter) NuGet package.
* Using Visual Studio extensions like [ReSharper](http://www.jetbrains.com/resharper/) or [TestDriven.net](http://www.testdriven.net/).
* Using the command line or GUI provided by the [NUnit.Runners](https://www.nuget.org/packages/NUnit.Runners) NuGet package.

Thanks to [Bruno Baia](https://github.com/bbaia) for the contribution!