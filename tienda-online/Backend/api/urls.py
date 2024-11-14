# api/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt import views as jwt_views
from . import views

# Crea un router para gestionar los viewsets automáticamente
router = DefaultRouter()

# Registra los viewsets
router.register(r'usuarios', views.UsuarioViewSet)
router.register(r'productos', views.ProductoViewSet)

urlpatterns = [
    # Incluye las rutas generadas automáticamente por el router
    path('v1/', include(router.urls)),  # Endpoints para 'usuarios' y 'productos'

    # Ruta adicional para el registro de usuario
    path('register/', views.RegistroUsuarioView.as_view(), name='registro-usuario'),
    path('token/', jwt_views.TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
]
