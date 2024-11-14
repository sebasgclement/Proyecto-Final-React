from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from .models import Usuario, Producto
from .serializers import UsuarioSerializer, UsuarioRegistroSerializer, ProductoSerializer

class UsuarioViewSet(viewsets.ModelViewSet):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer

    # Elige el serializer según la acción
    def get_serializer_class(self):
        if self.action == 'create':
            return UsuarioRegistroSerializer  # Usa UsuarioRegistroSerializer para registrar
        return UsuarioSerializer  # Usa UsuarioSerializer para leer y actualizar

    def perform_create(self, serializer):
        """Sobrescribe el método para manejar la creación de usuarios usando `set_password`"""
        user = serializer.save()
        if 'password' in serializer.validated_data:
            user.set_password(serializer.validated_data['password'])  # Encripta la contraseña
            user.save()

class ProductoViewSet(viewsets.ModelViewSet):
    queryset = Producto.objects.all()
    serializer_class = ProductoSerializer

# Vista dedicada al registro de usuario
class RegistroUsuarioView(APIView):
    permission_classes = [AllowAny]  # Permite acceso sin autenticación

    def post(self, request):
        serializer = UsuarioRegistroSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Usuario registrado con éxito"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
