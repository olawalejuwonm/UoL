from django.db import models

class Sequencing(models.Model):
    sequencing_factory = models.CharField(max_length=256, null=False, 
    blank=False)
    factory_location = models.CharField(max_length=256, null=False, blank=False)
    def __str__(self):
        return self.factory_location

class EC(models.Model):
    ec_name = models.CharField(max_length=256, null=False, blank=False)
    def __str__(self):
        return self.ec_name


# Create your models here.
class Gene(models.Model):
    gene_id = models.CharField(max_length=256, null=False,
    blank=False, db_index=True)
    entity = models.CharField(max_length=256, null=False,
    blank=False)
    start = models.IntegerField(null=False, blank=True)
    stop = models.IntegerField(null=False, blank=True)
    sense = models.CharField(max_length=1)
    start_codon = models.CharField(max_length=1, default="M")
    sequencing = models.ForeignKey(Sequencing, on_delete=models.DO_NOTHING)
    ec = models.ForeignKey(EC, on_delete=models.DO_NOTHING)
    def __str__(self):
        return self.gene_id
    

# The above as sql code
# CREATE TABLE gene (
#     gene_id VARCHAR(256) NOT NULL,
#     entity VARCHAR(256) NOT NULL,
#     start INT NOT NULL,
#     stop INT NOT NULL,
#     sense CHAR(1) NOT NULL,
#     start_codon CHAR(1) NOT NULL,
#     sequencing_id INT NOT NULL,
#     ec_id INT NOT NULL,
#     PRIMARY KEY (gene_id),
#     FOREIGN KEY (sequencing_id) REFERENCES sequencing (sequencing_id),
#     FOREIGN KEY (ec_id) REFERENCES ec (ec_id)
# );



class Product(models.Model):
    type = models.CharField(max_length=256, null=False,
    blank=False)
    product = models.CharField(max_length=256, null=False, blank=False)
    gene = models.ForeignKey(Gene, on_delete=models.CASCADE)

class Attribute(models.Model):
    key = models.CharField(max_length=256, null=False, blank=False)
    value = models.CharField(max_length=256, null=False, blank=False)
    gene = models.ManyToManyField(Gene, through='GeneAttributeLink')
    def __str__(self):
        return self.key+":"+self.value
    
class GeneAttributeLink(models.Model):
    gene = models.ForeignKey(Gene, on_delete=models.DO_NOTHING)
    attribute = models.ForeignKey(Attribute, on_delete=models.DO_NOTHING)
