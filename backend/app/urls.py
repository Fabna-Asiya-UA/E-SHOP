from django.urls import path
from .views import *

urlpatterns = [
    path('register/',register),
    path('products/', get_products),
    path('products/<int:id>/', get_product),

    path('cart/', get_cart),
    path('cart/add/', add_to_cart),
    path('cart/remove/', remove_from_cart),

    path('order/create/', create_order),
    path('orders/', get_orders),
]