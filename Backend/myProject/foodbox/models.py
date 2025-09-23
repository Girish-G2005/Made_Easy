from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Hotels(models.Model):
    name = models.CharField(max_length=100)
    image = models.URLField(max_length=500)
    
    def __str__(self):
        return self.name

class Items(models.Model):
    hotel = models.ForeignKey(Hotels, related_name= "items", on_delete=models.CASCADE)
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class Reaction(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    item = models.ForeignKey(Items, on_delete=models.CASCADE)
    is_like = models.BooleanField()

    class Meta:
        unique_together = ('user', 'item')
