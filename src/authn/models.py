from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    # avatar = CloudinaryField('avatar', null=True, blank=True, overwrite=True,
    # resource_type="image",
    # transformation={"quality": "auto:eco"},
    #  folder="avatar")
    name= models.CharField(max_length=256, blank=True)
    avatar = models.URLField(blank=True, default="https://icon-library.com/images/default-profile-icon/default-profile-icon-16.jpg")
      

    # after save (post_save) this preceed avatar with https://res.cloudinary.com/dddzjpoew
    # def post_save(self, *args, **kwargs):
    #     print('post_save', self.avatar)
    #     if self.avatar:
    #         self.avatar = 'https://res.cloudinary.com/dddzjpoew/' + self.avatar
    #     super(User, self).update(*args, **kwargs)

    # def save(self, *args, **kwargs):
    #     print("savimng", self.avatar)
    #     if self.avatar:
    #         self.avatar_url = cloudinary.uploader.upload(self.avatar, 
    #             resource_type="image",
    #             transformation={"quality": "auto:eco"},
    #             folder="avatar")['url']
    #     super(User, self).save(*args, **kwargs)

    




# from django.contrib.auth.models import User

# class User(models.Model):

#     user = models.OneToOneField(User, on_delete=models.CASCADE)

#     organisation = models.CharField(max_length=256, null=True, blank=True)

#     def __unicode__(self):
#         return self.user.username


