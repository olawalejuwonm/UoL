from rest_framework import serializers
from . import models as PfamModel

def TaxonomySerializer(instance):
        return {
            'taxa_id': instance['taxa_id'],
            'clade': instance['clade'],
            'genus': instance['genus'],
            'species': instance['species'],
            'description': instance['description']
        }

def DomainSerializer(instances):
    return [{
        'pfam_id': instance['pfam_id'],
        'description': instance['description'],
        'start': instance['start'],
        'stop': instance['stop'],
    } for instance in instances]

class DomainAnnotationSerializer(serializers.ModelSerializer):
    class Meta:
        model = PfamModel.DomainAnnotation
        fields = ['id', 'protein', 'domain', 'start', 'stop', 'length', 'taxonomy']