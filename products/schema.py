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

class UpdateCategory(graphene.Mutation):
    class Arguments:
        title = graphene.String(required=True)
        id = graphene.ID()

    category = graphene.Field(CategoryType)

    @classmethod
    def mutate(cls,root,info,title,id):
        category = Category.objects.get(pk=id)
        category.title = title
        category.save()

        return UpdateCategory(category=category)

class CreateCategory(graphene.Mutation):
    class Arguments:
        title = graphene.String(required=True)

    category = graphene.Field(CategoryType)

    @classmethod
    def mutate(cls,root,info,title):
        category = Category()
        category.title = title
        category.save()

        return CreateCategory(category=category)

class ProductInput(graphene.InputObjectType):
    title = graphene.String()
    description = graphene.String()
    category = graphene.Int(name="category")
    price = graphene.Float()
    image = graphene.String()
    available_quantity = graphene.Int()

class CreateProduct(graphene.Mutation):
    class Arguments:
        input = ProductInput(required = True)

    product = graphene.Field(ProductType)

    @classmethod
    def mutate(cls,root,info,input):
        product = Product()
        product.title = input.title
        product.description = input.description
        product.price = input.price
        product.image = input.image
        product.available_quantity = input.available_quantity
        product.save()
        product.category.set(Category.objects.filter(pk=input.category))  
        product.save()
        return CreateProduct(product=product)

class UpdateProduct(graphene.Mutation):
    class Arguments:
        input = ProductInput(required = True)

    product = graphene.Field(ProductType)

    @classmethod
    def mutate(cls,root,info,input,id):
        product = Product.objects.get(pk=id)
        product.title = input.title
        product.description = input.description
        product.price = input.price
        product.image = input.image
        product.available_quantity = input.available_quantity
        product.save()
        product.category.set(Category.objects.filter(pk=input.category))  
        product.save()
        return UpdateProduct(product=product)

class Mutation(graphene.ObjectType):
    update_category = UpdateCategory.Field()
    create_category = CreateCategory.Field()
    create_product = CreateProduct.Field()
    update_product = UpdateProduct.Field()


schema = graphene.Schema(query = Query, mutation=Mutation)