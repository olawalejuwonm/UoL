# I modified this code using requests library https://requests.readthedocs.io/en/master/
import requests
import random

class API:
    def get_random_species(): # This function is used to get a random species from the GBIF API
        try:
            occurrence_url = "https://api.gbif.org/v1/occurrence/search" # URL for GBIF API occurrence search
            occurrence_response = requests.get(occurrence_url) # Send GET request to GBIF API occurrence search

            if occurrence_response.status_code == 200: # Check if the response status code is 200 (OK)
                occurrence_data = occurrence_response.json() # Convert response to JSON format
                random_occurrence = random.choice(occurrence_data["results"]) # Choose a random occurrence from the results

                species_key = random_occurrence["speciesKey"] # Get the species key from the random occurrence
                species_url = f"https://api.gbif.org/v1/species/{species_key}" # URL for GBIF API species search
                species_response = requests.get(species_url) # Send GET request to GBIF API species search

                if species_response.status_code == 200: # Check if the response status code is 200 (OK)
                    species_data = species_response.json() # Convert response to JSON format
                    organism_name = species_data["canonicalName"] # Get the organism name from the species data
                    print(organism_name, "Retrieved from GBIF API") # Print the organism name and a message
                    kingdom = species_data["kingdom"] # Get the kingdom from the species data
                    return organism_name, kingdom # Return the organism name and kingdom
                else:
                    return None, None # Return None if the species search response status code is not 200
            else:
                return None, None # Return None if the occurrence search response status code is not 200
        except Exception as e:
            return None, None # Return None if an exception occurs during the API requests
# End of code I modified