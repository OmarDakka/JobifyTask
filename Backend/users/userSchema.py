import graphene

from graphql_auth.schema import UserQuery,MeQuery

class Query(UserQuery,MeQuery,graphene.ObjectType):
    pass

userSchema = graphene.Schema(query=Query)