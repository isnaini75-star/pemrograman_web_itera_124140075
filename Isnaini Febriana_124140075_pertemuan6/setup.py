from setuptools import setup, find_packages

requires = [
    "pyramid>=2.0",
    "pyramid_jinja2",
    "pyramid_tm",
    "pyramid_retry",
    "pyramid_debugtoolbar",
    "pyramid_sqlalchemy",
    "SQLAlchemy>=2.0",
    "alembic>=1.13",
    "psycopg2-binary>=2.9",
    "waitress>=3.0",
]

setup(
    name="pyramid-mahasiswa",
    version="0.1",
    packages=find_packages(),
    install_requires=requires,
    entry_points={
        "paste.app_factory": [
            "main = pyramid_mahasiswa:main",
        ],
        "console_scripts": [
            "initialize_pyramid_db = pyramid_mahasiswa.scripts.initialize_db:main",
        ],
    },
)
