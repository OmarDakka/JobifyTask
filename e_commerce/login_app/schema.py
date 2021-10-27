import graphene
from graphene_django import DjangoObjectType

from login_app.models import UserModel

class UserType(DjangoObjectType):
    class Meta:
        model = UserModel

class Query(graphene.ObjectType):
    users = graphene.List(UserType)

    def resolve_users(self,info):
        return UserModel.objects.all()

class CreateUser(graphene.Mutation):
    id=graphene.Int()
    first_name = graphene.String()
    last_name = graphene.String()
    email = graphene.String()
    password = graphene.String()
    created_at = graphene.DateTime()
    updated_at = graphene.DateTime()

    class Arguments:
        first_name = graphene.String()
        last_name = graphene.String()
        email = graphene.String()
        password = graphene.String()
        created_at = graphene.DateTime()
        updated_at = graphene.DateTime()
    
    def mutate(self,info,first_name,last_name,email,password):
        user = UserModel(first_name=first_name,last_name=last_name,email=email,password=password)
        user.save()

        return CreateUser(
            id = user.id,
            first_name = user.first_name,
            last_name = user.last_name,
            email = user.email,
            password = user.password,
            created_at = user.created_at,
            updated_at = user.updated_at,
        )
    
class Mutation(graphene.ObjectType):
    create_user = CreateUser.Field()


schema = graphene.Schema(
    query=Query,
    mutation = Mutation
    )