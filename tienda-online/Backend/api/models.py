from django.db import models
from django.contrib.auth.models import AbstractUser, Group, Permission

# Define tu modelo Usuario heredando de AbstractUser
class Usuario(AbstractUser):
    profile_picture = models.ImageField(upload_to='profile_pics/', blank=True, null=True)

    
    groups = models.ManyToManyField(
        Group,
        related_name='usuario_set',  # Personaliza el nombre de la relación inversa para groups
        blank=True,
        help_text='Grupos a los que pertenece este usuario.',
        verbose_name='grupos'
    )
    
    user_permissions = models.ManyToManyField(
        Permission,
        related_name='usuario_permissions_set',  # Personaliza el nombre de la relación inversa para user_permissions
        blank=True,
        help_text='Permisos específicos para este usuario.',
        verbose_name='permisos de usuario'
    )

    def __str__(self):
        return self.username


class Producto(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    image = models.ImageField(upload_to='product_images/')

    def __str__(self):
        return self.name
