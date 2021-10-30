import graphene
from graphene_django import DjangoObjectType
from .models import Product, Category
from django.db.models import Q

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
            'available_quantity',
            'created_at'
        )
        image = graphene.String()


class Query(graphene.ObjectType):
    categories = graphene.List(
        CategoryType, id=graphene.Int(), title=graphene.String())
    products = graphene.List(ProductType, id=graphene.Int(), search=graphene.String(
    ),  min=graphene.Float(),  max=graphene.Float(), orderBy=graphene.String(), category=graphene.Int(),first = graphene.Int(), skip = graphene.Int())



    def resolve_products(root, info, first = None, skip = None ,**kwargs ):
        id = kwargs.get('id')

        if id is not None:
            return Product.objects.filter(pk=id)

        query = Product.objects.all()

        search = kwargs.get('search')

        if search is not None:
            query = query.filter(Q(title__icontains=search)
                                 | Q(description__icontains=search))

        min = kwargs.get('min')

        if min is not None:
            query = query.filter(price__gte=min)

        max = kwargs.get('max')

        if max is not None:
            query = query.filter(price__lte=max)

        orderBy = kwargs.get('orderBy')

        if orderBy is not None:
            if orderBy == "asc":
                query = query.order_by('-created_at')
            else:
                query = query.order_by('created_at')

        category = kwargs.get('category')

        if category is not None:
            if category == 0:
                pass
            else :
                query = query.filter(category = category)
        
        if skip:
            query = query[skip:]
        
        if first:
            query = query[:first]
            
        return query

    def resolve_categories(root, info, **kwargs):
        id = kwargs.get('id')

        if id is not None:
            return Category.objects.filter(pk=id)

        title = kwargs.get('title')

        if title is not None:
            return Category.objects.filter(title__icontains=title)

        return Category.objects.all()


class UpdateCategory(graphene.Mutation):
    class Arguments:
        title = graphene.String(required=True)
        id = graphene.ID()

    category = graphene.Field(CategoryType)

    @classmethod
    def mutate(cls, root, info, title, id):
        category = Category.objects.get(pk=id)
        category.title = title
        category.save()

        return UpdateCategory(category=category)


class CreateCategory(graphene.Mutation):
    class Arguments:
        title = graphene.String(required=True)

    category = graphene.Field(CategoryType)

    @classmethod
    def mutate(cls, root, info, title):
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
        input = ProductInput(required=True)

    product = graphene.Field(ProductType)

    @classmethod
    def mutate(cls, root, info, input):
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
        input = ProductInput(required=True)

    product = graphene.Field(ProductType)

    @classmethod
    def mutate(cls, root, info, input, id):
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


schema = graphene.Schema(query=Query, mutation=Mutation)
