from django.core.exceptions import ValidationError
from django.db import models


class Detail(models.Model): # Instead of naming this as Protein It was called Detail so that it'll form protein_detail table instead of protein_protein table
    protein_id = models.CharField(max_length=256, null=False,
    blank=False, db_index=True, primary_key=True) # db_index=True so that it is indexed in the database and can be searched quickly
    sequence = models.CharField(max_length=40000, null=False, 
         blank=False) # max_length=40000 because amino acid in protein are typically between 10 and 40000

    def __str__(self):
        return self.protein_id
    
    def clean(self):
        print("cleaning")
        if len(self.sequence) < 10 or len(self.sequence) > 40000:
            raise ValidationError("Sequence must be between 10 and 40000 in length")
    def create(self, validated_data):
        raise ValidationError("Sequence must be between 10 and 40000 in length")

        # return Detail.objects.create(**validated_data)
