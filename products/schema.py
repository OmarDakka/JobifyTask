import graphene
from graphene_django import DjangoObjectType, fields
from .models import Product, Category


class CategoryType(DjangoObjectType):
    class Meta:
        model = Category
        fields = ('id', 'title')


class ProductType(DjangoObjectType):
    class Meta:
        model = Product
        fields = (
            'id',
            'title',
            'description',
            'category',
            'price',
            'image',
            'available_quantity'
        )


class Query(graphene.ObjectType):
    categories = graphene.List(CategoryType)
    products = graphene.List(ProductType)

    def resolve_products(root, info, **kwargs):
        return Product.objects.all()

    def resolve_categories(root, info, **kwargs):
        return Category.objects.all()

schema = graphene.Schema(query = Query)