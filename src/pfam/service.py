# I wrote the following code
from pfam.models import DomainAnnotation, Domain
from pfam.serializers import *
from django.forms.models import model_to_dict


def protein_taxonomy(protein_id):
    try:
        # end of code I wrote
        # I modified the following code
        domainAnnotations = DomainAnnotation.objects.filter(
            protein=protein_id).select_related('pfam')
        # select_related('pfam') was used according to https://docs.djangoproject.com/en/4.2/ref/models/querysets/#select-related
        # will make a join on the pfam table and return the pfam object instead of the pfam_id
        # It has the same effect as doing this:
        # domainAnnotations = DomainAnnotation.objects.filter(protein=protein_id)
        # for domainAnnotation in domainAnnotations:
        #     domainAnnotation.pfam = Pfam.objects.get(pk=domainAnnotation.pfam_id)
        #
        # It is more efficient to do the join in the database than to do it as above as read from the link above
        # end of code I modified
        # I wrote the following code
        filteredDomainAnnotations = []
        for domainAnnotation in domainAnnotations:
            domain = {}
            domain['pfam_id'] = model_to_dict(domainAnnotation.pfam)
            # This unpack all the domainAnnotation values into the domain dictionary
            domain.update(model_to_dict(domainAnnotation))
            # This add the domain dictionary to the end of the list
            filteredDomainAnnotations.append(domain)
        return filteredDomainAnnotations
    except Exception as e:
        print(e)
        return []


def domain_details(domain_id):
    try:
        domain = Domain.objects.get(pk=domain_id)
        # This converts the domain object to a dictionary
        domain = model_to_dict(domain)
        # so it can be serialized to JSON
        return domain
    except Exception as e:
        print(e)
        return {}


def proteins_by_taxa_id(taxa_id):
    try:
        domainAnnotations = DomainAnnotation.objects.filter(
            taxa_id=taxa_id).values('id', 'protein_id')
        # .values is used to return a list of dictionaries instead of a list of objects in accordance to
        # the specification of the API. I learnt it from https://docs.djangoproject.com/en/4.2/ref/models/querysets/#values
        return domainAnnotations
    except Exception as e:
        print(e)
        return []


def domains_by_taxa_id(taxa_id):
    try:
        domainAnnotations = DomainAnnotation.objects.filter(
            taxa_id=taxa_id).select_related('pfam')
        # select_related was used as documented at https://docs.djangoproject.com/en/4.2/ref/models/querysets/#select-related
        filteredDomainAnnotations = []
        for domainAnnotation in domainAnnotations:
            domain = {}
            domain['id'] = domainAnnotation.id
            domain['pfam_id'] = model_to_dict(domainAnnotation.pfam)
            # This unpack all the domainAnnotation values into the domain dictionary
            # This add the domain dictionary to the end of the list
            filteredDomainAnnotations.append(domain)

        return filteredDomainAnnotations
    except Exception as e:
        print(e)
        return []

# This return the domain coverage for a given protein which is sum of the protein domain lengths (stop-start)/length of protein.
# Stop - start was used so that the length of the domain is not affected by the gaps in the alignment which will result
# in negative value for the coverage


def coverage(protein_id):
    try:
        domainAnnotations = DomainAnnotation.objects.filter(protein=protein_id)
        proteinLength = domainAnnotations[0].length
        coverage = 0
        for domainAnnotation in domainAnnotations:
            coverage += (domainAnnotation.stop -
                         domainAnnotation.start)/proteinLength
        return coverage
    except Exception as e:
        print(e)
        return 0

# end of code I wrote
