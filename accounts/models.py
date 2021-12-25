from django.db import models
from django.contrib.auth.models import AbstractBaseUser,PermissionsMixin,BaseUserManager
# Create your models here.
from .manager import *

class UserAccount(AbstractBaseUser,PermissionsMixin):
    username=None
    email=models.EmailField(unique=True)
    first_name=models.CharField(max_length=70,default='')
    last_name=models.CharField(max_length=70,default='')
    mobile_number=models.CharField(max_length=12)
    otp=models.CharField(max_length=7)
    is_verified_mobile=models.BooleanField(default=False)
    is_verified_email=models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    last_login=models.DateField(null=True,blank=True)
    last_logout=models.DateField(null=True,blank=True)

    objects=UserAccountManager()

    USERNAME_FIELD= 'email'
    REQUIRED_FIELDS=['first_name','last_name']



    def get_full_name(self):
        return self.first_name
    
    def get_short_name(self):
        return self.first_name

    def __str__(self):
        return self.email
