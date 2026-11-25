from pyramid.config import Configurator
from pyramid_sqlalchemy import includeme as sqlalchemy_includeme


def main(global_config, **settings):
    with Configurator(settings=settings) as config:
        config.include(sqlalchemy_includeme)
        config.include("pyramid_tm")
        config.include(".routes")
        config.add_route("home", "/")
        config.scan()
        return config.make_wsgi_app()
