# I wrote this code
from django.core.exceptions import ValidationError
from django.db import models


class Detail(models.Model):
    """
    Detail model represents the protein_detail table in the database.
    Instead of naming this as Protein It was called Detail so that it'll form protein_detail table instead of protein_protein table
    """
    protein_id = models.CharField(
        max_length=256,  # Maximum length of the protein_id field
        null=False,  # protein_id cannot be null
        blank=False,  # protein_id cannot be blank
        db_index=True,  # protein_id is indexed in the database for quick searching
        primary_key=True  # protein_id is the primary key of the table
    )
    sequence = models.CharField(
        max_length=40000,  # Maximum length of the sequence field
        null=False,  # sequence cannot be null
        blank=False  # sequence cannot be blank
    )

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
                "Sequence must be between 10 and 40000 in length")  # Raises a validation error if the sequence length is not between 10 and 40000
# end of code I wrote