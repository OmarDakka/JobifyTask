import graphene
from graphql_auth import mutations
from graphql_auth.schema import UserQuery,MeQuery
import graphql_jwt

class AuthMutation(graphene.ObjectType):
    register = mutations.Register.Field()
    token_auth = graphql_jwt.ObtainJSONWebToken.Field()
    verify_token = graphql_jwt.Verify.Field()
    refresh_token = graphql_jwt.Refresh.Field()

class Query(UserQuery,MeQuery,graphene.ObjectType):
    pass

class Mutation(AuthMutation,graphene.ObjectType):
    pass

userSchema = graphene.Schema(query=Query, mutation=Mutation)