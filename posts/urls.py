from django.urls import path
from .views import PostListCreate, PostDetail, CategoryList, register_user,CommentCreate

urlpatterns = [
    path('posts/', PostListCreate.as_view()),
    path('posts/<int:pk>/', PostDetail.as_view()),
    path('categories/', CategoryList.as_view()),
    path('register/', register_user), # Add this line
    path('comments/', CommentCreate.as_view()),
]