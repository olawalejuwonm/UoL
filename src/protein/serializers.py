# I wrote the code in this file
# The serializers.py file is used to serialize the data from the database
# It allow for selecting which fields to return to the client on a GET request for example
# It also restricts which fields can be updated on a PUT request or created on a POST request

from rest_framework import serializers
from . import models as Model


class ProteinSerializer(serializers.ModelSerializer):
    class Meta:
        model = Model.Detail
        fields = '__all__'  # This will serialize all fields in the model

    def create(self, validated_data):
        # This calls the clean method in the model to validate the data
        # This is done because the clean method is not called when using the ModelSerializer
        # This is a workaround to ensure that the data is validated
        try:
            protein = Model.Detail(**validated_data)
            protein.clean()
        except Exception as e:
            raise serializers.ValidationError(e)
        protein.save()
        return protein


# End of code I wrote
