from django.db import models

# Create your models here.
class Semester(models.Model):
    name = models.CharField(max_length=100)
    
    def __str__(self):
        return self.name

class Documents(models.Model):
    sem = models.ForeignKey(Semester,related_name="documents", on_delete=models.CASCADE)
    title = models.CharField(max_length=100)
    pdf_file = models.URLField(max_length=500)
    uploaded_at = models.DateField(auto_now_add=True)
    
    def __str__(self):
        return self.title
