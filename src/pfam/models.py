# I wrote and modify a part of this code as stated below
from django.db import models
from protein.models import Detail


class Domain(models.Model):
    """
    A model representing a domain in the Pfam database.
    """
    domain_id = models.CharField(max_length=256, null=False,
                                 blank=False, db_index=True, primary_key=True)  # db_index=True so that it is
    # indexed in the database and can be searched quickly
    # It was made primary key because it is unique all through the record
# I modified this code
    # according to query optimization documented at https://docs.djangoproject.com/en/4.2/topics/db/optimization/
    domain_description = models.CharField(max_length=256, null=False,
                                          blank=False)

    def __str__(self):
        """
        Returns a string representation of the domain_id.
        """
        return self.domain_id
# end of code I modified

# I wrote this code


class DomainAnnotation(models.Model):
    """
    A model representing a domain annotation in the Pfam database.
    #protein and pfam are named as such because i noticed that when i named 
    #them protein_id and pfam_id respectively, it was automatically sufficed with _id
    # and this could cause unexpected behaviour and also naming them without the
    # _id suffix makes it intuitive to understand that they could have their 
    # own data too in form of dictionaries
    """
    protein = models.ForeignKey(Detail, on_delete=models.CASCADE,
                                related_name='protein', null=False, blank=False)
    # related_name='protein' so that it can be accessed from the Detail model
    pfam = models.ForeignKey(Domain, on_delete=models.CASCADE,
                             # related_name='domain',
                             null=False, blank=False)
    start = models.IntegerField(null=False, blank=True)
    stop = models.IntegerField(null=False, blank=True)
    taxa_id = models.IntegerField(null=False, blank=True)
    name = models.CharField(max_length=256, null=False,
                            blank=False)
    # The name is split into two using space as the delimiter and the first part is automatically assigned to genus
    # and the second part is assigned to species
    genus = models.CharField(max_length=256, null=False,
                             blank=False)
    species = models.CharField(max_length=256, null=False,
                               blank=False)
    clade = models.CharField(max_length=256, null=False,
                             blank=False, default="E")
    # default="E" because most domains in the dataset are E (Eukaryotic)
    description = models.CharField(max_length=256, null=False,
                                   blank=False)
    length = models.IntegerField(null=False, blank=False)

    def __str__(self):
        """
        Returns a string representation of the name.
        """
        return self.name
# end of code I wrote
# I modified this code

    def save(self, *args, **kwargs):
        """
        This function is used to split the name into genus and species
        and assign them to the respective fields
        Learnt this via https://docs.djangoproject.com/en/4.2/topics/db/models/#overriding-predefined-model-methods
        Overrides the save method to split the name into genus and species
        and assign them to the respective fields.
        """
        name_parts = self.name.split(' ', 1)
        self.genus = name_parts[0]
        self.species = name_parts[1] if len(name_parts) > 1 else ''
        super().save(*args, **kwargs)
# end of code I modified
