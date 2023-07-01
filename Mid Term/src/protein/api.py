from django.http import HttpResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from . import models as Model
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
        return Response(serializer.data)

