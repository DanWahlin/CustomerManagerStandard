using System;

using NUnit.Framework;
using OpenQA.Selenium;
using Protractor;

namespace CustomerManager.E2ETests
{
    public class IndexTests
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
        public void CustomersViewByDefault()
        {
            IWebDriver ngDriver = new NgWebDriver(driver);
            ngDriver.Navigate().GoToUrl("http://localhost:58000/");

            // Assert default view is 'customers'
            Assert.IsTrue(ngDriver.Url.EndsWith("#/customers"));
        }
    }
}
