from django.db import models

# Create your models here.
class Hello(models.Model):
    text = models.CharField(max_length=255)

class Person(models.Model):
    name = models.CharField(max_length=255)
    age = models.IntegerField(null=False, blank=True) 
    def __str__(self):
        return self.name
    
class Address(models.Model):
 number = models.IntegerField(null=False, blank=True)
 street_name = models.CharField(max_length=500, null=False,
 blank=True)
 resident = models.ForeignKey(Person, null=True, 
on_delete=models.SET_NULL) 
    