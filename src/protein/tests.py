# I wrote this code with reference to the pfam tests
# Import necessary modules
from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient

# Define a test class


class TestViews(TestCase):
    # Define a test method to get protein by ID
    def test_getProteinById(self):
        # Create an instance of APIClient
        client = APIClient()
        # Reverse the URL for the protein API with the given ID
        reversed = reverse('protein_api', args=['A0A016S8J7'])
        # Send a GET request to the reversed URL
        response = client.get(reversed)
        # Assert that the response status code is 200
        self.assertEqual(response.status_code, 200)
        # Check if the stop position of the first domain is greater than the start position

        self.assertTrue(
            response.data['domains'][0]['stop'] > response.data['domains'][0]['start'])

    # Define a test method to get proteins by taxa ID
    def test_getProteinsByTaxaId(self):
        # Create an instance of APIClient
        client = APIClient()
        # Reverse the URL for the proteins API with the given taxa ID
        reversed = reverse('proteins_api', args=['55661'])
        # Send a GET request to the reversed URL
        response = client.get(reversed)
        # Assert that the response status code is 200
        self.assertEqual(response.status_code, 200)
        # Check if the response data contains 'id' and 'protein_id' keys
        self.assertTrue('id' in response.data[0])
        self.assertTrue('protein_id' in response.data[0])

    # Define a test method to get protein coverage
    def test_getProteinCoverage(self):
        # Create an instance of APIClient
        client = APIClient()
        # Reverse the URL for the protein coverage API with the given ID
        reversed = reverse('coverage_api', args=['A0A016S8J7'])
        # Send a GET request to the reversed URL
        response = client.get(reversed)
        # Assert that the response status code is 200
        self.assertEqual(response.status_code, 200)
        # Check if the response data contains 'coverage' key and its value is a float
        self.assertTrue('coverage' in response.data)
        self.assertTrue(isinstance(response.data['coverage'], float))

# End of code i wrote
