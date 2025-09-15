from django.db import models
from django.db import models
from django.contrib.auth.models import User
# Create your models here.


class Customer(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)  # liên kết 1-1 với User
    phone = models.CharField(max_length=15, blank=True, null=True)
    address = models.TextField(blank=True, null=True)
    dob = models.DateField(blank=True, null=True)  # ngày sinh
    # thêm các field khác tùy nhu cầu
    def __str__(self):
        return self.user.username