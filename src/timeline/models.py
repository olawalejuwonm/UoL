# I wrote this code
from django.db import models  # Importing the models module from the django.db package
from django.db import models  # This line is a duplicate and can be removed
from authn.models import User  # Importing the User model from the authn app

# StatusUpdate model was used as name so that the name on the table
# is timeline_statusupdate
class StatusUpdate(models.Model):  # Defining a new model called StatusUpdate that inherits from the models.Model class

    """
    A model representing a status update made by a user.

    Attributes:
    - user (ForeignKey): the user who made the status update.
    - text (TextField): the text content of the status update.
    - media (URLField): the URL of any media attached to the status update.
    - created_at (DateTimeField): the date and time the status update was created.
    - updated_at (DateTimeField): the date and time the status update was last updated.
    """

    user = models.ForeignKey(User, on_delete=models.CASCADE,  # Defining a 
                             # ForeignKey field called user that references the User model from the authn app
         null=False, blank=False)  # Setting the null and blank options to 
    # False, which means that this field is required
    text = models.TextField(blank=True)  # Defining a TextField field called 
    # text that can be left blank
    media = models.URLField(null=True, blank=True)  # Defining a URLField field
    # called media that can be left blank and can be null
    created_at = models.DateTimeField(auto_now_add=True)  # Defining a 
    # DateTimeField field called created_at that automatically sets the value to the current date and time when a new object is created
    updated_at = models.DateTimeField(auto_now=True)  # Defining a DateTimeField
    # field called updated_at that automatically sets the value to the current date and time whenever an object is saved

    def __str__(self):  # Defining a method that returns a string representation of the object
        return f'{self.user.username}: {self.text}'

    def save(self, *args, **kwargs):  # Overriding the default save method to 
        # call the full_clean method before saving the object
        self.full_clean()
        super(StatusUpdate, self).save(*args, **kwargs)
# End of code I wrote