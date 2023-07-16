from protein.service import getProteinById
from django.http import HttpResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from . import models as Model
import pfam.service as PfamService
from .serializers import ProteinSerializer
from rest_framework import generics
from rest_framework import mixins


@api_view(['GET'])
def organismProteins(request, pk):
    return Response(PfamService.proteins_by_taxa_id(pk))


@api_view(['GET'])
def coverage(request, pk):
    return Response({"coverage": PfamService.coverage(pk)})



class ProteinDetail(mixins.CreateModelMixin,
                    mixins.RetrieveModelMixin,
                    mixins.UpdateModelMixin,
                    mixins.DestroyModelMixin,
                    generics.GenericAPIView):
    serializer_class = ProteinSerializer

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)

    def get(self, request, *args, **kwargs):
        # This get the primary key from the url
        pk = self.kwargs.get('pk')
        print(pk, "pk")
        return Response(getProteinById(pk))

    # def put(self, request, *args, **kwargs):
    #     return self.update(request, *args, **kwargs)

    def get_queryset(self):
        return Model.Detail.objects.get(pk=self.kwargs.get('pk'))
