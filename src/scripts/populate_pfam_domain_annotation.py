# I wrote this code using lecture as reference
# Import the csv, os, sys, and django modules
import csv
import os
import sys
import django

# This uses a relative path, so it will work on all machines
# Get the directory name of the current file
dirname = os.path.dirname(__file__)

# Resolve to the real path by adding '../src/'
# Get the directory of the Django project by joining the current directory with '../'
django_project_dir = os.path.normpath(os.path.join(dirname, '../'))

# ../datas/assignment_data_sequences.csv
# Get the path of the CSV file by joining the current directory with '../../datas/assignment_data_sequences.csv'
csv_file = os.path.normpath(os.path.join(dirname, '../../datas/assignment_data_set.csv'))

# Print the directory of the Django project and the path of the CSV file
print("django_project_dir: ", django_project_dir)
print("csv_file: ", csv_file)

# The path on my environment is "C:/Users/USER/Documents/Advance Web Dev/Mid Term/src"
# Add the directory of the Django project to the system path
sys.path.append(django_project_dir)

# Set the DJANGO_SETTINGS_MODULE environment variable to 'cell.settings'
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'cell.settings')

# Call the setup() function of the django module to initialize the Django settings
django.setup()

from pfam.models import DomainAnnotation as PfamDomainAnnotation
from pfam.models import Domain as PfamDomain
from protein.models import Detail as ProteinDetail


# Delete all records from the DomainAnnotation table
PfamDomainAnnotation.objects.all().delete()

# Open the CSV file in read mode
with open(csv_file, 'r') as f:
    reader = csv.reader(f)
    # Print the csv reader object
    print("reader: ", reader)
    exception_rows = []
    # Iterate over each row in the csv reader object
    for row in reader:
        # Print the current row
        print("row: ", row)
        # if first item in row is empty, skip the row
        if row[0] == '':
            continue
        # Create a new PfamDomainAnnotation object with the protein_id and sequence fields set to the values in the current row
        try:
            pfam_domain_annotation = PfamDomainAnnotation.objects.create(
                protein=ProteinDetail.objects.get(protein_id=row[0]),
                pfam= PfamDomain.objects.get(domain_id=row[5]),
                start=row[6],
                stop=row[7],
                taxa_id=row[1],
                name=row[3],
                clade=row[2],
                description=row[4],
                length=row[8],
            )
        # catches all exceptions
        except Exception as e:
            print("Error: ", e)
            print("row: ", row)
            exception_rows.append(row)
            continue
        
        # Print the new PfamDomainAnnotation object
        print("pfam_domain_annotation: ", pfam_domain_annotation)
    # Print a success message after all rows have been processed
    print("Successfully populated PfamDomainAnnotation table")
    print("Exception rows: ", exception_rows)
# end of code I wrote