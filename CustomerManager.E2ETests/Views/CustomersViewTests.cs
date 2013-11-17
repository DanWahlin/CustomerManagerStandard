using System;

using NUnit.Framework;
using OpenQA.Selenium;
using Protractor;
using CustomerManager.E2ETests.PageObjects;

namespace CustomerManager.E2ETests
{
    public class CustomersViewTests
    {
        private IWebDriver driver;

        [SetUp]
        public void SetUp()
        {
            // Using NuGet Package 'PhantomJS' (Headless browser testing for build servers)
            //driver = new OpenQA.Selenium.PhantomJS.PhantomJSDriver();

            // Using NuGet Package 'WebDriver.ChromeDriver.win32'
            driver = new OpenQA.Selenium.Chrome.ChromeDriver();

            driver.Manage().Timeouts().SetScriptTimeout(TimeSpan.FromSeconds(30));
        }

        [TearDown]
        public void TearDown()
        {
            driver.Quit();
        }

        [Test]
        public void CardViewByDefault()
        {
            var ngDriver = new NgWebDriver(driver);
            ngDriver.Navigate().GoToUrl("http://localhost:58000/#/customers");

            var customersPage = new CustomersPage(ngDriver);

            Assert.IsTrue(customersPage.IsCardViewSelected());
        }

        [Test]
        public void SwitchToListView()
        {
            var ngDriver = new NgWebDriver(driver);
            ngDriver.Navigate().GoToUrl("http://localhost:58000/#/customers");

            var customersPage = new CustomersPage(ngDriver);
            customersPage.SwitchToListView();

            Assert.IsTrue(customersPage.IsListViewSelected());
        }

        [Test]
        public void ShowTop10Customers()
        {
            var ngDriver = new NgWebDriver(driver);
            ngDriver.Navigate().GoToUrl("http://localhost:58000/#/customers");

            var customersPage = new CustomersPage(ngDriver);
            Assert.AreEqual(10, customersPage.GetCustomersCount());

            IWebElement footer = ngDriver.FindElement(NgBy.Binding("totalRecords"));
            Assert.AreEqual("Showing 10 of 23 total customers", footer.Text);
        }

        [Test]
        public void ShouldFilter()
        {
            var ngDriver = new NgWebDriver(driver);
            ngDriver.Navigate().GoToUrl("http://localhost:58000/#/customers");

            var customersPage = new CustomersPage(ngDriver);

            Assert.AreEqual(4, customersPage.Filter("Wahlin").GetCustomersCount()); // Fail!
        }

        [Test]
        public void ShowCustomerOrders()
        {
            var ngDriver = new NgWebDriver(driver);
            ngDriver.Navigate().GoToUrl("http://localhost:58000/#/customers");

            var customerOrdersPage = new CustomersPage(ngDriver).GoToCustomerOrders(2);

            Assert.AreEqual("Dan Wahlin", customerOrdersPage.GetCustomerName());
            Assert.AreEqual(5, customerOrdersPage.GetOrdersCount());
        }

        // etc.

        // Examples using mocked backend (See 'Support' folder)

        [Test]
        public void NoCustomersOnCardView()
        {
            NgMockE2EModule mockModule = new NgMockE2EModule(@"
$httpBackend.whenGET(/^\/app\/partials\//).passThrough();

$httpBackend.whenGET(/^\/app\/views\//).passThrough();

$httpBackend.whenGET('\/api/dataservice/customersSummary?$top=10&$skip=0').respond(
// status
200,
// body
[],
// headers
{
    'X-InlineCount': 0
}
);"
                );

            var ngDriver = new NgWebDriver(driver, mockModule);
            ngDriver.Navigate().GoToUrl("http://localhost:58000/#/customers");

            var customersPage = new CustomersPage(ngDriver);
            Assert.AreEqual(0, customersPage.GetCustomersCount());
            Assert.AreEqual("No customers found", customersPage.GetFooterText());
        }

        [Test]
        public void DeleteCustomerOnCardView()
        {
            NgMockE2EModule mockModule = new NgMockE2EModule(@"
$httpBackend.whenGET(/^\/app\/partials\//).passThrough();

$httpBackend.whenGET(/^\/app\/views\//).passThrough();

$httpBackend.whenGET('\/api/dataservice/customersSummary?$top=10&$skip=0').respond(
// status
200,
// body
[
    { 
        id:1, 
        firstName:'Marcus',
        lastName:'HighTower',
        city:'Phoenix',
        state: {
            id:1,
            abbreviation:'AZ',
            name:' Arizona'
        },
        orderCount:6,
        gender:'Male'
    },
    {
        id:2,
        firstName:'Dan',
        lastName:'Wahlin',
        city:'Chandler',
        state:{
            id:1,
            abbreviation:'AZ',
            name:' Arizona'
        },
        orderCount:5,
        gender:'Male'
    }
],
// headers
{
    'X-InlineCount': 2
}
);"
                );

            var ngDriver = new NgWebDriver(driver, mockModule);
            ngDriver.Navigate().GoToUrl("http://localhost:58000/#/customers");

            var customersPage = new CustomersPage(ngDriver);
            Assert.AreEqual(2, customersPage.GetCustomersCount());
            Assert.AreEqual("Showing 2 of 2 total customers", customersPage.GetFooterText());

            // Delete Dan (sorry...)
            customersPage.DeleteCustomer(2).ConfirmDelete();

            Assert.AreEqual(1, customersPage.GetCustomersCount());
            Assert.AreEqual("Showing 1 of 1 total customers", customersPage.GetFooterText()); // Fail!
        }

        // etc.
    }
}
