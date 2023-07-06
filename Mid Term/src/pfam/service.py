# This function gets all the domain annotations (taxa_id, clade, genus, species
# , description, length) for a protein using the protein_id

from pfam.models import DomainAnnotation, Domain
import pfam.serializers as PfamSerializer
from django.http import JsonResponse
from django.forms.models import model_to_dict
from django.core import serializers


def protein_taxonomy(protein_id):
    domainAnnotations = DomainAnnotation.objects.filter(protein=protein_id).select_related('pfam')
    print(domainAnnotations[0], "domainAnnotations")
    filteredDomainAnnotations = []
    for domainAnnotation in domainAnnotations:
        domain = {}
        domain['pfam_id'] = model_to_dict(domainAnnotation.pfam)
        # This unpack all the domainAnnotation values into the domain dictionary
        domain.update(model_to_dict(domainAnnotation))
        filteredDomainAnnotations.append(domain) # This add the domain dictionary to the end of the list
    print(filteredDomainAnnotations, "filteredDomainAnnotations")
    return filteredDomainAnnotations



def domain_details(domain_id):
    domain = Domain.objects.get(pk=domain_id)
    domain = model_to_dict(domain)
    return domain