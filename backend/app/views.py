from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from django.contrib.auth.models import User

from .models import Product, Cart, CartItem, Order, OrderItem
from .serializers import ProductSerializer, CartSerializer, OrderSerializer

@api_view(['POST'])
def register(request):
    username=request.data.get('username')
    password=request.data.get('password')
    if User.objects.filter(username=username).exists():
        return Response({"error":"User already exists"},status=400)
    user=User.objects.create_user(username=username,password=password)
    return Response({"message":"User created successfully ..please login"})




@api_view(['GET'])
def get_products(request):
    products = Product.objects.all()
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def get_product(request, id):
    product = get_object_or_404(Product, id=id)
    serializer = ProductSerializer(product)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_cart(request):
    user = request.user
    cart, created = Cart.objects.get_or_create(user=user)
    serializer = CartSerializer(cart)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_to_cart(request):
    user = request.user
    product_id = request.data.get('product_id')
    quantity = int(request.data.get('quantity', 1))

    product = get_object_or_404(Product, id=product_id)
    cart, created = Cart.objects.get_or_create(user=user)

    cart_item, created = CartItem.objects.get_or_create(
        cart=cart,
        product=product
    )

    if not created:
        cart_item.quantity += quantity
    else:
        cart_item.quantity = quantity

    cart_item.save()

    return Response({"message": "Item added to cart"})


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def remove_from_cart(request):
    cart_item_id = request.data.get('cart_item_id')

    cart_item = get_object_or_404(CartItem, id=cart_item_id)

    if cart_item.cart.user != request.user:
        return Response({"error": "Unauthorized"}, status=403)

    cart_item.delete()

    return Response({"message": "Item removed"})


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_order(request):
    user = request.user
    cart = get_object_or_404(Cart, user=user)
    cart_items = CartItem.objects.filter(cart=cart)

    if not cart_items.exists():
        return Response({"error": "Cart is empty"}, status=400)

    total_price = sum(
        item.product.price * item.quantity for item in cart_items
    )

    order = Order.objects.create(
        user=user,
        total_price=total_price
    )

    for item in cart_items:
        OrderItem.objects.create(
            order=order,
            product=item.product,
            quantity=item.quantity,
            price=item.product.price
        )

    cart_items.delete()

    return Response({"message": "Order placed successfully"})

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_orders(request):
    user=request.user
    orders = Order.objects.filter(user=request.user).order_by('-created_at')
    serializer=OrderSerializer(orders,many=True)
    return Response(serializer.data)