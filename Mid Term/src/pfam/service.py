# This function gets all the domain annotations (taxa_id, clade, genus, species
# , description, length) for a protein using the protein_id

from pfam.models import DomainAnnotation, Domain
import pfam.serializers as PfamSerializer
from django.http import JsonResponse
from django.forms.models import model_to_dict


def protein_taxonomy(protein_id):
    domainAnnotations = DomainAnnotation.objects.filter(protein=protein_id).values()
    print(domainAnnotations, "domainAnnotations")
    return domainAnnotations



def domain_details(domain_id):
    domain = Domain.objects.get(pk=domain_id)
    domain = model_to_dict(domain)
    return domain