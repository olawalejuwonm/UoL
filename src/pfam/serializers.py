# I wrote this code
# Importing the serializers module from the rest_framework package
from rest_framework import serializers

# Importing the models module from the current package (pfam)
from . import models as PfamModel

# Defining a function that takes an instance of a taxonomy and returns a dictionary of its properties


def TaxonomySerializer(instance):
    return {
        'taxa_id': instance['taxa_id'],
        'clade': instance['clade'],
        'genus': instance['genus'],
        'species': instance['species'],
        'description': instance['description']
    }

# Defining a function that takes a list of instances of domains and returns a list of dictionaries of their properties


def DomainSerializer(instances):
    return [{
        'pfam_id': instance['pfam_id'],
        'description': instance['description'],
        'start': instance['start'],
        'stop': instance['stop'],
    } for instance in instances]

# Defining a serializer class for domain annotations, which inherits from the ModelSerializer class


class DomainAnnotationSerializer(serializers.ModelSerializer):
    # Defining the metadata for the serializer, which specifies the model and fields to serialize
    class Meta:
        model = PfamModel.DomainAnnotation
        fields = ['id', 'protein', 'domain',
                  'start', 'stop', 'length', 'taxonomy']
# end of code I wrote
