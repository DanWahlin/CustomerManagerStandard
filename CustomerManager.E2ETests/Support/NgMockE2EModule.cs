using System;
using System.IO;
using System.Reflection;
using Protractor;

// From https://github.com/bbaia/protractor-net/blob/master/examples/Protractor.Samples/Support/NgMockE2EModule.cs
namespace CustomerManager.E2ETests
{
    /// <summary>
    /// Module that depends on the 'ngMockE2E' Angular module to define 
    /// a fake HTTP backend implementation suitable for end-to-end testing.
    /// <para/>
    /// http://docs.angularjs.org/api/ngMockE2E.$httpBackend
    /// </summary>
    public class NgMockE2EModule : NgModule
    {
        private const string NgMockE2EModuleName = "ngMockE2E";
        private static readonly string NgMockE2EModuleScript;

        static NgMockE2EModule()
        {
            // Load angular-mocks.js from embedded resources
            var assembly = Assembly.GetExecutingAssembly();
            var resourceName = "CustomerManager.E2ETests.Support.angular-mocks.js";
            using (Stream stream = assembly.GetManifestResourceStream(resourceName))
            using (StreamReader reader = new StreamReader(stream))
            {
                NgMockE2EModuleScript = reader.ReadToEnd();
            }
        }

        public NgMockE2EModule(string httpBackendDefinitionScript)
            : base(NgMockE2EModuleName, GenerateRunfunction(httpBackendDefinitionScript))
        {
        }

        private static string GenerateRunfunction(string httpBackendDefinitionScript)
        {
            return String.Format(
                "{0} angular.module('{1}').run(function($httpBackend) {{ {2} }});",
                NgMockE2EModuleScript, NgMockE2EModuleName, httpBackendDefinitionScript);
        }
    }
}