from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient

class TestViews(TestCase):
    def test_getProteinById(self):
        client = APIClient()
        reversed = reverse('protein_api', args=['A0A016S8J7'])
        response = client.get(reversed)
        self.assertEqual(response.status_code, 200)
        # checks .domains list and get first object and then checks if stop
        # is greater than start
        self.assertTrue(response.data['domains'][0]['stop'] > response.data['domains'][0]['start'])
    
    def test_getProteinsByTaxaId(self):
        client = APIClient()
        reversed = reverse('proteins_api', args=['55661'])
        response = client.get(reversed)
        self.assertEqual(response.status_code, 200)
        self.assertTrue('id' in response.data[0])
        self.assertTrue('protein_id' in response.data[0])

    def test_getProteinCoverage(self):
        client = APIClient()
        reversed = reverse('coverage_api', args=['A0A016S8J7'])
        response = client.get(reversed)
        self.assertEqual(response.status_code, 200)
        self.assertTrue('coverage' in response.data)
        # assert the value of coverage is a float
        self.assertTrue(isinstance(response.data['coverage'], float))
      
        


