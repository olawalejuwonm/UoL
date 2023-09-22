from django.forms import ValidationError
from rest_framework import viewsets
from social.utils import  populate, response_format, upload_file
from .models import StatusUpdate
from .serializers import StatusUpdateSerializer
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework import viewsets, permissions



class TimelineViewSet(viewsets.ModelViewSet):
    queryset = StatusUpdate.objects.all()
    serializer_class = StatusUpdateSerializer

    def list (self, request):
        queryset = StatusUpdate.objects.all().select_related('user')
        return Response(populate(queryset, 'user', StatusUpdateSerializer))

    def create(self, request):
        try:
            upload_file(request, folder='timeline', resource_type="auto")
            # set medias in request.data if medias is not None
            serializer = StatusUpdateSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save(user=request.user)
                return Response(response_format(
                    "Status update created successfully",
                    serializer.data
                )
                )
            return Response(serializer.errors)
        except Exception as e:
            print(e, "error hereeeeeeee", e.__traceback__)
            message = e.args[0]
            raise ValidationError(message)
    
    @action(detail=False, methods=['get'], permission_classes=[permissions.IsAuthenticated])
    def me(self, request):
        queryset = StatusUpdate.objects.filter(user=request.user)
        # I did not populate here since the user already has it's context
        serializer = StatusUpdateSerializer(queryset, many=True)
        return Response(serializer.data)