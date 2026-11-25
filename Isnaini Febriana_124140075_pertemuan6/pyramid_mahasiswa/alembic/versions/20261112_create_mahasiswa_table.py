from alembic import op
import sqlalchemy as sa

revision = "20261112_mahasiswa"
down_revision = None

def upgrade():
    op.create_table(
        "mahasiswa",
        sa.Column("id", sa.Integer(), primary_key=True, autoincrement=True),
        sa.Column("nim", sa.String(20), nullable=False, unique=True),
        sa.Column("nama", sa.String(100), nullable=False),
    )


def downgrade():
    op.drop_table("mahasiswa")