from django.db import models

class User(models.Model):
    username = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=255)

    def __str__(self):
        return self.username

class Admin(models.Model):
    username = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=255)

    def __str__(self):
        return self.username

class CorporateEvent(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    date = models.DateField()
    time = models.TimeField()
    venue = models.CharField(max_length=255)
    image = models.ImageField(upload_to='event_images/')
    gmap = models.URLField()
    location = models.CharField(max_length=255)
    capacity = models.IntegerField()

    def __str__(self):
        return self.name

class EventRegister(models.Model):
    firstName = models.CharField(max_length=255)
    lastName = models.CharField(max_length=255)
    email = models.EmailField()
    age = models.IntegerField()
    businessName = models.CharField(max_length=255)
    organizationName = models.CharField(max_length=255)
    businessAddress = models.TextField()
    city = models.CharField(max_length=255)
    state = models.CharField(max_length=255)
    zipcode = models.CharField(max_length=10)
    userId = models.ForeignKey(User, on_delete=models.CASCADE)
    eventId = models.ForeignKey(CorporateEvent, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.firstName} {self.lastName} - {self.eventId.name}"
 