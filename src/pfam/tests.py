from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient



class TestViews(TestCase):
    def test_home(self):
        client = APIClient()
        reversed = reverse('index')
        print(reversed, "reversed")
        response = client.get(reversed)
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'home.html')

    def test_getPfamByDomainId(self):
        """"
        This tests api/pfam/PF00360 to be sure it returns the correct data
        """
        client = APIClient()
        reversed = reverse('pfam_api', args=['PF00360'])
        response = client.get(reversed)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data, {
            "domain_id": "PF00360",
            "domain_description": "Phytochromeregion"
        })
        # checks if domain_id and domain_description are keys in the response.data
        self.assertTrue('domain_id' in response.data)
        self.assertTrue('domain_description' in response.data)

    def test_getPfamsByTaxaId(self):
        """"
        This tests api/pfams/55661 to be sure it returns
        """
        client = APIClient()
        reversed = reverse('pfams_api', args=['55661'])
        response = client.get(reversed)
        self.assertEqual(response.status_code, 200)
        self.assertTrue('id' in response.data[0])
        self.assertTrue('pfam_id' in response.data[0])
        self.assertTrue('domain_id' in response.data[0]['pfam_id'])
        self.assertTrue('domain_description' in response.data[0]['pfam_id'])
