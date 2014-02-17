using CustomerManager.Model;
using CustomerManager.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;

namespace CustomerManager.Controllers
{
    public class DataServiceController : ApiController
    {
        CustomerRepository _Repository;

        public DataServiceController()
        {
            _Repository = new CustomerRepository();
            //System.Threading.Thread.Sleep(5000); 
        }

        [HttpGet]
        [Queryable]
        public IQueryable<Customer> Customers()
        {
            var query = _Repository.GetCustomers();
            var totalRecords = query.Count();
            HttpContext.Current.Response.Headers.Add("X-InlineCount", totalRecords.ToString());
            return query.AsQueryable();
        }

        [HttpGet]
        public List<State> States()
        {
            return _Repository.GetStates();
        }

        [HttpGet]
        [Queryable]
        public IQueryable<CustomerSummary> CustomersSummary()
        {
            int totalRecords;
            var custSummary = _Repository.GetCustomersSummary(out totalRecords);
            HttpContext.Current.Response.Headers.Add("X-InlineCount", totalRecords.ToString());
            return custSummary;
        }

        [HttpGet]
        public OperationStatus CheckUnique(int id, string property, string value)
        {
            return _Repository.CheckUnique(id, property, value);            
        }

        // GET api/<controller>/5
        [HttpGet]
        public Customer CustomerById(int id)
        {
            return _Repository.GetCustomerById(id);
        }

        // POST api/<controller>
        public HttpResponseMessage PostCustomer([FromBody]Customer customer)
        {
            var opStatus = _Repository.InsertCustomer(customer);
            if (opStatus.Status)
            {
                var response = Request.CreateResponse<Customer>(HttpStatusCode.Created, customer);
                string uri = Url.Link("DefaultApi", new { id = customer.Id });
                response.Headers.Location = new Uri(uri);
                return response;
            }
            return Request.CreateErrorResponse(HttpStatusCode.NotFound, opStatus.ExceptionMessage);
        }

        // PUT api/<controller>/5
        public HttpResponseMessage PutCustomer(int id, [FromBody]Customer customer)
        {
            var opStatus = _Repository.UpdateCustomer(customer);
            if (opStatus.Status)
            {
                return Request.CreateResponse<Customer>(HttpStatusCode.Accepted, customer);
            }
            return Request.CreateErrorResponse(HttpStatusCode.NotModified, opStatus.ExceptionMessage);
        }

        // DELETE api/<controller>/5
        public HttpResponseMessage DeleteCustomer(int id)
        {
            var opStatus = _Repository.DeleteCustomer(id);

            if (opStatus.Status)
            {
                return Request.CreateResponse(HttpStatusCode.OK);
            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, opStatus.ExceptionMessage);
            }
        }
    }
}