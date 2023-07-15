from django.views.generic.edit import CreateView
from .models import Detail
from .forms import ProteinDetailForm
from django.urls import reverse

# Create your views here.
class ProteinCreate(CreateView):
    model = Detail
    template_name = 'create.html'
    form_class = ProteinDetailForm
    # Redirects to the view that displays the newly created object
    def get_success_url(self):
        return reverse('protein_api', kwargs={'pk': self.object.pk})

