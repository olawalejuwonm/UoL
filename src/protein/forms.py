# I wrote this code
from django import forms
from django.forms import ModelForm
from .models import Detail

# Define a form for the Detail model
class ProteinDetailForm(ModelForm):

    # Define a clean method to validate the form data
    def clean(self):
        # Call the parent clean method to get the cleaned data
        cleaned_data = super(ProteinDetailForm, self).clean()
        # Get the protein_id and sequence fields from the cleaned data
        protein_id = cleaned_data.get("protein_id")
        sequence = cleaned_data.get("sequence")

        # If protein_id is not provided, raise a validation error
        if not protein_id:
            raise forms.ValidationError("Protein ID is required")
        # If sequence is not provided, raise a validation error
        if not sequence:
            raise forms.ValidationError("Sequence is required")

        # This validates based on rectification for passing the test. It'll check
        # to ensure that the sequence is between 10 and 40000 in length
        # if len(sequence) < 10 or len(sequence) > 40000:
        #     raise forms.ValidationError("Sequence must be between 10 and 40000 in length")
        # The code above was moved to the model.py file to ensure that the validation
        # is done at the model level instead of the form level because of edit that can be done
        # at the django admin page.

        # Return the cleaned data
        return cleaned_data

    # Define the model and fields for the form
    class Meta:
        model = Detail
        fields = ['protein_id', 'sequence']

# end of code I wrote