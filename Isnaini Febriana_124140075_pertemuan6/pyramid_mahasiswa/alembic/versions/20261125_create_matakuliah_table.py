"""create matakuliah table

Revision ID: 20261125_matakuliah
Revises:
"""
from alembic import op
import sqlalchemy as sa

revision = "20261125_matakuliah"
down_revision = "20261112_mahasiswa"
branch_labels = None
depends_on = None


def upgrade():
    op.create_table(
        "matakuliah",
        sa.Column("id", sa.Integer(), autoincrement=True, nullable=False),
        sa.Column("kode_mk", sa.Text(), nullable=False),
        sa.Column("nama_mk", sa.Text(), nullable=False),
        sa.Column("sks", sa.Integer(), nullable=False),
        sa.Column("semester", sa.Integer(), nullable=False),
        sa.PrimaryKeyConstraint("id"),
        sa.UniqueConstraint("kode_mk"),
    )


def downgrade():
    op.drop_table("matakuliah")
