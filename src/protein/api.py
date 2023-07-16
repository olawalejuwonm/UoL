# I wrote this code
# Importing necessary modules
from protein.service import getProteinById
from rest_framework.decorators import api_view
from rest_framework.response import Response
from . import models as Model
import pfam.service as PfamService
from .serializers import ProteinSerializer
from rest_framework import generics
from rest_framework import mixins

# This function is a view that returns all proteins for a given organism
@api_view(['GET'])
def organismProteins(request, pk):
    return Response(PfamService.proteins_by_taxa_id(pk))

# This function is a view that returns the coverage of a given protein
@api_view(['GET'])
def coverage(request, pk):
    return Response({"coverage": PfamService.coverage(pk)})

# This class is a view that handles CRUD operations for a Protein model
# but only for the GET and POST methods
class ProteinDetail(mixins.CreateModelMixin,
                    mixins.RetrieveModelMixin,
                    mixins.UpdateModelMixin,
                    mixins.DestroyModelMixin,
                    generics.GenericAPIView):
    serializer_class = ProteinSerializer

    # This function handles the POST request for creating a new protein
    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)

    # This function handles the GET request for retrieving a protein by its primary key
    def get(self, request, *args, **kwargs):
        # This get the primary key from the url
        pk = self.kwargs.get('pk')
        return Response(getProteinById(pk))

    # This function returns the queryset for the Protein model
    def get_queryset(self):
        return Model.Detail.objects.get(pk=self.kwargs.get('pk'))
# end of code I wrote