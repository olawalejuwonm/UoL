from django.http import HttpResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import *
from .serializers import ProteinSerializer



@api_view(['GET', 'POST', 'PUT'])
def proteinRequestHandler(request, pk):
    try:
        protein = Protein.objects.get(pk=pk)
    except Protein.DoesNotExist:
        return HttpResponse(status=404)
    if request.method == 'GET':
        serializer = ProteinSerializer(protein)
        return Response(serializer.data)

