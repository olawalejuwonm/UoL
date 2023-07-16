# I modified the code using lecture as reference
from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient


class TestViews(TestCase):
    def test_home(self):
        """
        Test that the home page is rendered correctly
        """
        client = APIClient()
        reversed = reverse('index')  # reverse the url name 'index'
        # make a GET request to the reversed url
        response = client.get(reversed)
        # check that the response status code is 200
        self.assertEqual(response.status_code, 200)
        # check that the home.html template is used for the response
        self.assertTemplateUsed(response, 'home.html')

    def test_getPfamByDomainId(self):
        """
        Test that the api/pfam/PF00360 returns the correct data
        """
        client = APIClient()
        # reverse the url name 'pfam_api' with argument 'PF00360'
        reversed = reverse('pfam_api', args=['PF00360'])
        # make a GET request to the reversed url
        response = client.get(reversed)
        # check that the response status code is 200
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data, {
            "domain_id": "PF00360",
            "domain_description": "Phytochromeregion"
        })  # check that the response data is equal to the expected data
        # checks if domain_id and domain_description are keys in the response.data
        self.assertTrue('domain_id' in response.data)
        self.assertTrue('domain_description' in response.data)

    def test_getPfamsByTaxaId(self):
        """
        Test that the api/pfams/55661 returns the correct data
        """
        client = APIClient()
        # reverse the url name 'pfams_api' with argument '55661'
        reversed = reverse('pfams_api', args=['55661'])
        # make a GET request to the reversed url
        response = client.get(reversed)
        # check that the response status code is 200
        self.assertEqual(response.status_code, 200)
        # check that the response data has the key 'id'
        self.assertTrue('id' in response.data[0])
        # check that the response data has the key 'pfam_id'
        self.assertTrue('pfam_id' in response.data[0])
        # check that the response data has the key 'domain_id' in the 'pfam_id' object
        self.assertTrue('domain_id' in response.data[0]['pfam_id'])
        # check that the response data has the key 'domain_description' in the 'pfam_id' object
        self.assertTrue('domain_description' in response.data[0]['pfam_id'])
# end of code I modified