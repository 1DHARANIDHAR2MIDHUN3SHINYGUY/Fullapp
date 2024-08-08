from django.contrib import admin
from .models import User, Admin, CorporateEvent, EventRegister

admin.site.register(User)
admin.site.register(Admin)
admin.site.register(CorporateEvent)
admin.site.register(EventRegister)
