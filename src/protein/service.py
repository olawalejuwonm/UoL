from protein.serializers import ProteinSerializer
from protein.models import Detail
import pfam.service as PfamService


def getProteinById(id):
    try:
        protein = Detail.objects.get(pk=id)
        serializer = ProteinSerializer(protein)
        proteinData = serializer.data
        domainAnnotations = PfamService.protein_taxonomy(id)
        #This picks the first domain annotation and return it as a dictionary even if there are multiple or none there
        domainAnnotation = domainAnnotations[0] if domainAnnotations else {}
        domains = PfamService.PfamSerializer.DomainSerializer(domainAnnotations)
        # This converts the domainAnnotation dictionary to a JSON serializable dictionary
        # domainAnnotation = PfamService.PfamSerializer.DomainAnnotationSerializer(domainAnnotation)
        # This unpack the proteinData dictionary and adds the domainAnnotations using taxonomy as the key
        proteinData = {**proteinData, 'taxonomy': 
            PfamService.PfamSerializer.TaxonomySerializer(domainAnnotation), 
            'length': domainAnnotation['length'], 'domains': domains}
        #This will catch all errors and return None
    except Exception as e:
        print(e)
        proteinData = {}
    return proteinData