using System;

using NUnit.Framework;
using OpenQA.Selenium;
using Protractor;

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
            IWebDriver ngDriver = new NgWebDriver(driver);
            ngDriver.Navigate().GoToUrl("http://localhost:58000/#/customers");

            // Assert 'card view' is selected
            Assert.IsTrue(ngDriver.FindElement(By.ClassName("cardContainer")).Displayed);
            Assert.IsFalse(ngDriver.FindElement(By.ClassName("gridContainer")).Displayed);
        }

        [Test]
        public void SwitchToListView()
        {
            IWebDriver ngDriver = new NgWebDriver(driver);
            ngDriver.Navigate().GoToUrl("http://localhost:58000/#/customers");

            IWebElement listViewMenu = ngDriver.FindElement(By.XPath("//ul//li[contains(.,'List View')]"));
            Assert.IsFalse(listViewMenu.GetAttribute("class").Contains("active"));
            listViewMenu.Click();

            // Assert 'list view' is selected
            Assert.IsTrue(listViewMenu.GetAttribute("class").Contains("active"));
            Assert.IsFalse(ngDriver.FindElement(By.ClassName("cardContainer")).Displayed);
            Assert.IsTrue(ngDriver.FindElement(By.ClassName("gridContainer")).Displayed);
        }

        [Test]
        public void ShowTop10Customers()
        {
            IWebDriver ngDriver = new NgWebDriver(driver);
            ngDriver.Navigate().GoToUrl("http://localhost:58000/#/customers");

            IWebElement cardElement = ngDriver.FindElement(By.ClassName("cardContainer"));
            var customers = cardElement.FindElements(NgBy.Repeater("customer in filteredCustomers"));
            Assert.AreEqual(10, customers.Count);

            IWebElement footer = ngDriver.FindElement(NgBy.Binding("totalRecords"));
            Assert.AreEqual("Showing 10 of 23 total customers", footer.Text);
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

            var cardElement = ngDriver.FindElement(By.ClassName("cardContainer"));
            Assert.AreEqual(0, cardElement.FindElements(NgBy.Repeater("customer in filteredCustomers")).Count);

            Assert.IsTrue(ngDriver.FindElement(By.XPath("//h4[contains(.,'No customers found')]")).Displayed);
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
            
            var cardElement = ngDriver.FindElement(By.ClassName("cardContainer"));

            var footer = ngDriver.FindElement(NgBy.Binding("totalRecords"));
            Assert.AreEqual("Showing 2 of 2 total customers", footer.Text);

            var customers = cardElement.FindElements(NgBy.Repeater("customer in filteredCustomers"));
            Assert.AreEqual(2, customers.Count);

            // Delete Dan (sorry...)
            foreach (var customer in customers)
            {
                if ((long)customer.Evaluate("customer.id") == 2)
                {
                    // Close card
                    customer.FindElement(By.ClassName("cardClose")).Click();
                    // Popup to confirm
                    ngDriver.FindElement(By.XPath("//button[contains(.,'Delete Customer')]")).Click();
                    break;
                }
            }

            Assert.AreEqual(1, cardElement.FindElements(NgBy.Repeater("customer in filteredCustomers")).Count);
            Assert.AreEqual("Showing 1 of 1 total customers", footer.Text); // Fail!
        }

        // etc.
    }
}
