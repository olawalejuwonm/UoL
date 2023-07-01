from rest_framework.decorators import api_view
from rest_framework.response import Response


@api_view(['GET', 'POST', 'PUT'])
def proteinRequestHandler(request, pk):
    return Response("Here's the detail")


