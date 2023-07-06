from django.http import HttpResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from . import models as Model
import pfam.service as PfamService
from .serializers import ProteinSerializer



@api_view(['GET', 'POST', 'PUT'])
def proteinRequestHandler(request, pk):
    try:
        protein = Model.Detail.objects.get(pk=pk)
    except Model.Detail.DoesNotExist:
        return Response("Does not exist", status=404)

        # return HttpResponse(status=404)
    if request.method == 'GET':
        serializer = ProteinSerializer(protein)
        proteinData = serializer.data
        domainAnnotations = PfamService.protein_taxonomy(pk)
        #This picks the first domain annotation and return it as a dictionary even if there are multiple or none there
        domainAnnotation = domainAnnotations[0] if domainAnnotations else {}
        domains = PfamService.PfamSerializer.DomainSerializer(domainAnnotations)
        # This converts the domainAnnotation dictionary to a JSON serializable dictionary
        # domainAnnotation = PfamService.PfamSerializer.DomainAnnotationSerializer(domainAnnotation)
        # This unpack the proteinData dictionary and adds the domainAnnotations using taxonomy as the key
        proteinData = {**proteinData, 'taxonomy': 
            PfamService.PfamSerializer.TaxonomySerializer(domainAnnotation), 
            'length': domainAnnotation['length'], 'domains': domains}
        # This finds the domain annotations for the protein
        return Response(proteinData)

