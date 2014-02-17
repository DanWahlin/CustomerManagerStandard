using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using OpenQA.Selenium;
using Protractor;

namespace CustomerManager.E2ETests.PageObjects
{
    // Page Object that represents the Customer orders view
    public class CustomerOrdersPage
    {
        NgWebDriver ngDriver;

        public CustomerOrdersPage(NgWebDriver driver)
        {
            ngDriver = driver;

            if (!ngDriver.Url.Contains("#/customerorders/"))
            {
                throw new InvalidOperationException("This is not the customer orders page");
            }
        }

        // Actions

        // Accessors

        public string GetCustomerName()
        {
            return ngDriver.FindElement(NgBy.Binding("customer.firstName")).Text;
        }

        public int GetOrdersCount()
        {
            return ngDriver.FindElements(NgBy.Repeater("order in customer.orders")).Count;
        }

        // etc.
    }
}
