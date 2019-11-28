"""
Django settings for tradersplatform project.

Generated by 'django-admin startproject' using Django 2.0.7.

For more information on this file, see
https://docs.djangoproject.com/en/2.0/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/2.0/ref/settings/
"""
import datetime
import os

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/2.0/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'q^4h&mi0ldly58-!5_ttj(&^o008ux6z%o9f69e1w3^6n@q$1f'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = [
    "*",
    "127.0.0.1",
    "localhost",
    "35.163.120.227",
    "khajiittraders.tk",
    "khajiit.tk",
]

CORS_ORIGIN_WHITELIST = [
    "http://127.0.0.1:3000",
    "http://localhost:3000",
    "http://35.163.120.227:3000",
    "http://35.163.120.227",
    "http://khajiittraders.tk",
    "http://khajiit.tk",
    "http://www.khajiit.tk",
]



# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django_celery_results',
    'django_crontab',
    'django_cron',
    'corsheaders',
    'rest_framework',
    'myuser',
    'event',
    'follow',
    'equipment',
    'wallet',
    'article',
    'article_comment',
]

CRON_CLASSES = [
    "equipment.views.MyCronJob",
    # ...
]

#    ('*/1 * * * *', 'equipment.calculate.calculate_metal_currency'),
CRONJOBS = [
    ('0 */2 * * *', 'equipment.calculate.calculate_metal_currency'),
    ('*/1 * * * *', 'equipment.views.my_scheduled_job'),
    ('0 */2 * * *', 'equipment.calculate.calculate_etf'),
    ('0 */2 * * *', 'equipment.calculate.calculate_trace_indices'),
    ('0 */2 * * *', 'equipment.calculate.calculate_stock_currency'),
    ('0 */2 * * *', 'equipment.calculate.calculate_cryptocurrency'),
    ('0 */2 * * *', 'equipment.calculate.calculate_currency')
]

CELERY_RESULT_BACKEND = 'traderdb'

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'tradersplatform.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'tradersplatform.wsgi.application'


# Database
# https://docs.djangoproject.com/en/2.0/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'traderdb',
        'USER': 'trader',
        'PASSWORD': 'traders.com',
        'HOST': 'db',
        'PORT': '5432',
    }
}


# Password validation
# https://docs.djangoproject.com/en/2.0/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/2.0/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/2.0/howto/static-files/

STATIC_URL = '/static/'

MEDIA_URL =  '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, "media")


AWS_KEY="AKIAVMGTHO3HDO7K5G5L"
AWS_SECRET_KEY="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"
'''#AWS_KEY="AKIAIJIGRM5MDSAKEZAA"
#AWS_SECRET_KEY="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"
AWS_KEY="AKIA2F5UPF3FJR2J5RNE"
AWS_SECRET_KEY="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"
'''

REST_FRAMEWORK = {

    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_jwt.authentication.JSONWebTokenAuthentication',
        'rest_framework.authentication.SessionAuthentication',
        'rest_framework.authentication.BasicAuthentication',
    ),
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.LimitOffsetPagination',
    'PAGE_SIZE': 1000
}
JWT_AUTH = {
    'JWT_EXPIRATION_DELTA': datetime.timedelta(seconds=259200),
    'JWT_ALLOW_REFRESH': True,
    'JWT_REFRESH_EXPIRATION_DELTA': datetime.timedelta(seconds=259200),  # 3 days
    'JWT_AUTH_COOKIE': 'JWT',
}
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'filters': {
        'require_debug_false': {
            '()': 'django.utils.log.RequireDebugFalse'
        }
    },
    'handlers': {
        'applogfile': {
            'level': 'DEBUG',
            'class': 'logging.handlers.RotatingFileHandler',
            'filename': os.path.join(BASE_DIR, 'APPNAME.log'),
            'maxBytes': 1024 * 1024 * 15,  # 15MB
            'backupCount': 10,
        },
        'mail_admins': {
            'level': 'ERROR',
            'filters': ['require_debug_false'],
            'class': 'django.utils.log.AdminEmailHandler'
        }
    },
    'loggers': {
        'django.request': {
            'handlers': ['mail_admins'],
            'level': 'ERROR',
            'propagate': True,
        },
        'APPNAME': {
            'handlers': ['applogfile', ],
            'level': 'DEBUG',
        },
    }
}
