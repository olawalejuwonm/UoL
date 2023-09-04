from django.db import models

# Create your models here.
# friend/models.py
from django.db import models
from django.conf import settings

from authn.models import User
class Friend(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='friends')
    friend = models.ForeignKey(User, on_delete=models.CASCADE, related_name='friend_of')
    created_at = models.DateTimeField(auto_now_add=True)
    confirmed = models.BooleanField(default=False)


    class Meta:
        unique_together = ('user', 'friend')

    def __str__(self):
        return f'{self.user.username} - {self.friend.username}'