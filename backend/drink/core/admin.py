from django.contrib import admin
from .models.party_member import PartyMember
from .models.party import Party


@admin.register(Party)
class PartyAdmin(admin.ModelAdmin):
    pass


@admin.register(PartyMember)
class PartyMemberAdmin(admin.ModelAdmin):
    pass
