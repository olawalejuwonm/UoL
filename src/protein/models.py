# Importing necessary modules
from django.core.exceptions import ValidationError
from django.db import models

# Defining a model called Detail
class Detail(models.Model):
    # Defining a field called protein_id which is a primary key and indexed in the database
    protein_id = models.CharField(max_length=256, null=False,
    blank=False, db_index=True, primary_key=True)
    
    # Defining a field called sequence which has a maximum length of 40000 and cannot be null or blank
    sequence = models.CharField(max_length=40000, null=False, 
         blank=False)
    
    # Defining a string representation of the model
    def __str__(self):
        return self.protein_id
    
    # Defining a clean method to validate the sequence field
    def clean(self):
        print("cleaning")
        if len(self.sequence) < 10 or len(self.sequence) > 40000:
            raise ValidationError("Sequence must be between 10 and 40000 in length")
    
    # Defining a create method to raise a validation error if the sequence field is not valid
    def create(self, validated_data):
        raise ValidationError("Sequence must be between 10 and 40000 in length")
        # return Detail.objects.create(**validated_data)
