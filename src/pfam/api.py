# I wrote this code
# Importing necessary modules
from rest_framework.decorators import api_view
from rest_framework.response import Response
import pfam.service as PfamService

# Decorator to specify the allowed HTTP methods for the function
@api_view(['GET'])
# Function to get domain details by primary key
def domainDetails(request, pk):
    # Return the response from the domain_details function in PfamService module
    return Response(PfamService.domain_details(pk))

# Decorator to specify the allowed HTTP methods for the function
@api_view(['GET'])
# Function to get domains by taxa id
def domainByTaxaId(request, pk):
    # Return the response from the domains_by_taxa_id function in PfamService module
    return Response(PfamService.domains_by_taxa_id(pk))

# end of code I wrote