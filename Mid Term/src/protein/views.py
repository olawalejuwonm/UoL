from django.views.generic.edit import CreateView
from .models import Detail
from .forms import ProteinDetailForm
# Create your views here.
class ProteinCreate(CreateView):
    model = Detail
    template_name = 'protein/create_protein.html'
    form_class = ProteinDetailForm
    success_url = "/"