# I wrote this code
from django.views.generic.edit import CreateView
from .models import Detail
from .forms import ProteinDetailForm
from django.urls import reverse
# Packages used for exempting csrf protection (not recommended)
# from django.utils.decorators import method_decorator
# from django.views.decorators.csrf import csrf_exempt


# Create your views here.
# @method_decorator(csrf_exempt, name='dispatch') # This is to allow post request from other domains
# not originating from the same domain as the server, i think this is a security risk so
# i decided not to use it because it'll require me to disable csrf protection for the views
# and i'll have to set cors headers to allow cross origin requests
class ProteinCreate(CreateView):
    model = Detail
    template_name = 'create.html'
    form_class = ProteinDetailForm
    # Redirects to the view that displays the newly created object

    def get_success_url(self):
        return reverse('protein_api', kwargs={'pk': self.object.pk})
# end of code I wrote