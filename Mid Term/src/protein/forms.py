from django import forms
from django.forms import ModelForm
from .models import Detail

class ProteinDetailForm(ModelForm):

    def clean(self):
        cleaned_data = super(ProteinDetailForm, self).clean()
        protein_id = cleaned_data.get("protein_id")
        sequence = cleaned_data.get("sequence")

        if not protein_id:
            raise forms.ValidationError("Protein ID is required")
        if not sequence:
            raise forms.ValidationError("Sequence is required")
        
        # This validates based on rectification for passing the test. It'll check
        # to ensure that the sequence is between 10 and 40000 in length
        # if len(sequence) < 10 or len(sequence) > 40000:
        #     raise forms.ValidationError("Sequence must be between 10 and 40000 in length")
        # The code above was moved to the model.py file to ensure that the validation
        # is done at the model level instead of the form level because of edit that can be done
        # at the django admin page.
        
       
        return(cleaned_data)

    class Meta:
        model = Detail
        fields = ['protein_id', 'sequence']
