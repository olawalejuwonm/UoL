from django.db import models


class Detail(models.Model): # Instead of naming this as Protein It was called Detail so that it'll form protein_detail table instead of protein_protein table
    protein_id = models.CharField(max_length=256, null=False,
    blank=False, db_index=True, primary_key=True) # db_index=True so that it is indexed in the database and can be searched quickly
    sequence = models.CharField(max_length=40000, null=False, 
         blank=False) # max_length=40000 because amino acid in protein are typically between 10 and 40000

    def __str__(self):
        return self.protein_id
    
# class Domain(models.Model):
#     domain_id = models.CharField(max_length=256, null=False,
#     blank=False, db_index=True)
#     domain_description = models.CharField(max_length=256, null=False,
#     blank=False)

#     def __str__(self):
#         return self.domain_id
    
# class DomainAnnotation(models.Model):
#     protein = models.ForeignKey(Protein, on_delete=models.CASCADE)
#     domain = models.ForeignKey(Domain, on_delete=models.CASCADE)
#     start = models.IntegerField(null=False, blank=True)
#     stop = models.IntegerField(null=False, blank=True)
#     taxa_id = models.IntegerField(null=False, blank=True)
#     name= models.CharField(max_length=256, null=False,
#     blank=False)
#     clade= models.CharField(max_length=256, null=False,
#     blank=False, default="E") # default="E" because most domains in the dataset are E (Eukaryotic)
#     description=models.CharField(max_length=256, null=False,
#     blank=False)
#     amino_acid_sequence_length = models.IntegerField(null=False, blank=False)
    
#     def __str__(self):
#         return self.name
    
