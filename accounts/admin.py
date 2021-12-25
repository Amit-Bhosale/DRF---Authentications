from django.contrib import admin
from .models import *
# Register your models here.
class UserAdmin(admin.ModelAdmin):
    fields=['first_name','last_name','is_superuser','mobile_number','is_verified_mobile','email','is_verified_email','password','is_staff','is_active','last_login','last_logout','user_permissions']
    list_display=['email','is_superuser']


admin.site.register(UserAccount,UserAdmin)
