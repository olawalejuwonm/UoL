from django.http import HttpResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from . import models as Model
import pfam.service as PfamService

@api_view(['GET'])
def domainDetails(request, pk):
    return Response(PfamService.domain_details(pk))

@api_view(['GET'])
def domainByTaxaId(request, pk):
    return Response(PfamService.domains_by_taxa_id(pk))