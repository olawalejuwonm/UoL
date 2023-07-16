import requests
import random

class API:
    def get_random_species(): # This function is used to get a random species from the GBIF API
        try:
            occurrence_url = "https://api.gbif.org/v1/occurrence/search"
            occurrence_response = requests.get(occurrence_url)

            if occurrence_response.status_code == 200:
                occurrence_data = occurrence_response.json()
                random_occurrence = random.choice(occurrence_data["results"])

                species_key = random_occurrence["speciesKey"]
                species_url = f"https://api.gbif.org/v1/species/{species_key}"
                species_response = requests.get(species_url)

                if species_response.status_code == 200:
                    species_data = species_response.json()
                    organism_name = species_data["canonicalName"]
                    print(organism_name, "Retrieved from GBIF API")
                    kingdom = species_data["kingdom"]
                    return organism_name, kingdom
                else:
                    return None, None
            else:
                return None, None
        except Exception as e:
            return None, None


