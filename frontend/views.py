from django.shortcuts import render, redirect
from django.views.decorators.cache import never_cache

# Create your views here.
def index(request):
    if request.user.is_authenticated:
        return render(request, 'frontend/index.html')
    else:
        return redirect('/')