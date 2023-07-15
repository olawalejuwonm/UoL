from django.core.exceptions import ValidationError
from django.db import models


class Detail(models.Model):
    """
    Detail model represents the protein_detail table in the database.
    Instead of naming this as Protein It was called Detail so that it'll form protein_detail table instead of protein_protein table
    """
    protein_id = models.CharField(
        max_length=256,
        null=False,
        blank=False,
        db_index=True,
        primary_key=True
    )  # db_index=True so that it is indexed in the database and can be searched quickly
    sequence = models.CharField(
        max_length=40000,
        null=False,
        blank=False
    )  # max_length=40000 because amino acid in protein are typically between 10 and 40000

    def __str__(self):
        """
        Returns the protein_id of the Detail instance.
        """
        return self.protein_id

    def clean(self):
        """
        Validates the length of the sequence field.
        """
        if len(self.sequence) < 10 or len(self.sequence) > 40000:
            raise ValidationError(
                "Sequence must be between 10 and 40000 in length")
