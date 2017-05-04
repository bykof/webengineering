from django.contrib import admin
from .models import *


@admin.register(Party)
class PartyAdmin(admin.ModelAdmin):
    pass


@admin.register(PartyMember)
class PartyMemberAdmin(admin.ModelAdmin):
    pass
