using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using OpenQA.Selenium;
using Protractor;

namespace CustomerManager.E2ETests.PageObjects
{
    // Page Object that represents the Customers view
    public class CustomersPage
    {
        NgWebDriver ngDriver;

        NgWebElement cardViewButtonElement;
        NgWebElement listViewButtonElement;
        NgWebElement cardViewElement;
        NgWebElement listViewElement;

        public CustomersPage(NgWebDriver driver)
        {
            ngDriver = driver;

            if (!ngDriver.Url.EndsWith("#/customers"))
            {
                throw new InvalidOperationException("This is not the customers page");
            }

            cardViewButtonElement = ngDriver.FindElement(By.XPath("//ul[@class='nav']//li[contains(.,'Card View')]"));
            cardViewElement = ngDriver.FindElement(By.ClassName("cardContainer"));
            listViewButtonElement = ngDriver.FindElement(By.XPath("//ul[@class='nav']//li[contains(.,'List View')]"));
            listViewElement = ngDriver.FindElement(By.ClassName("gridContainer"));
        }

        // Actions

        public CustomersPage SwitchToListView()
        {
            listViewButtonElement.Click();
            return this;
        }

        public CustomersPage SwitchToCardView()
        {
            cardViewButtonElement.Click();
            return this;
        }

        public CustomersPage DeleteCustomer(int customerId)
        {
            var viewElement = IsCardViewSelected() ? cardViewElement : listViewElement;
            foreach (var customer in viewElement.FindElements(NgBy.Repeater("customer in filteredCustomers")))
            {
                if ((long)customer.Evaluate("customer.id") == customerId)
                {
                    // Close card
                    if (IsCardViewSelected())
                    {
                        customer.FindElement(By.ClassName("cardClose")).Click();
                    }
                    else
                    {
                        customer.FindElement(By.XPath("//button[contains(.,'Delete')]")).Click();
                    }
                    break;
                }
            }
            return this;
        }

        public CustomersPage CancelDelete()
        {
            ngDriver.FindElement(By.XPath("//button[contains(.,'Cancel')]")).Click();
            return this;
        }

        public CustomersPage ConfirmDelete()
        {
            ngDriver.FindElement(By.XPath("//button[contains(.,'Delete Customer')]")).Click();
            return this;
        }

        public CustomersPage Filter(string text)
        {
            var filterElement = ngDriver.FindElement(NgBy.Input("searchText"));
            filterElement.Clear();
            filterElement.SendKeys(text);
            return this;
        }

        public CustomerOrdersPage GoToCustomerOrders(int customerId)
        {
            var viewElement = IsCardViewSelected() ? cardViewElement : listViewElement;
            foreach (var customer in viewElement.FindElements(NgBy.Repeater("customer in filteredCustomers")))
            {
                if ((long)customer.Evaluate("customer.id") == customerId)
                {
                    customer.FindElement(NgBy.Binding("customer.orderCount")).Click();
                    break;
                }
            }
            return new CustomerOrdersPage(ngDriver);
        }

        // Accessors

        public bool IsListViewSelected()
        {
            return listViewButtonElement.GetAttribute("class").Contains("active") && listViewElement.Displayed;
        }

        public bool IsCardViewSelected()
        {
            return cardViewButtonElement.GetAttribute("class").Contains("active") && cardViewElement.Displayed;
        }

        public int GetCustomersCount()
        {
            var viewElement = IsCardViewSelected() ? cardViewElement : listViewElement;
            return viewElement.FindElements(NgBy.Repeater("customer in filteredCustomers")).Count;
        }

        public string GetFooterText()
        {
            var noCustomersFooterElement = ngDriver.FindElement(By.XPath("//div[@data-ng-show='customers.length == 0']"));
            if (noCustomersFooterElement.Displayed)
            {
                return noCustomersFooterElement.Text;
            }
            else
            {
                return ngDriver.FindElement(NgBy.Binding("totalRecords")).Text;
            }
        }

        // etc.
    }
}
