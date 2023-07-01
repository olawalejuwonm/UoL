# I wrote the code in this file
# The serializers.py file is used to serialize the data from the database
# It allow for selecting which fields to return to the client on a GET request for example
# It also restricts which fields can be updated on a PUT request or created on a POST request

from rest_framework import serializers
from . import models as Model

class ProteinSerializer(serializers.ModelSerializer):
    class Meta:
        model = Model.Detail
        fields = '__all__' # This will serialize all fields in the model


# End of code I wrote