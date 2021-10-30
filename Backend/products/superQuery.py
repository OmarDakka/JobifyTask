from django.db.models.query_utils import Q
import graphene
from graphene_django import debug
from graphql.type import schema
import products.schema
import users.userSchema
from graphene_django.debug import DjangoDebug

class Query(products.schema.Query,users.userSchema.Query,graphene.ObjectType):

    debug = graphene.Field(DjangoDebug, name="debug")

class Mutation(products.schema.Mutation, users.userSchema.Mutation,graphene.ObjectType):
    debug = graphene.Field(DjangoDebug,name="debug")

schema = graphene.Schema(query=Query,mutation=Mutation)