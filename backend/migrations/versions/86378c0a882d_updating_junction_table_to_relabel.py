"""updating junction table to relabel

Revision ID: 86378c0a882d
Revises: be464aa11e85
Create Date: 2023-06-09 12:51:50.781259

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision = '86378c0a882d'
down_revision = 'be464aa11e85'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('UserGardens',
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('garden_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['garden_id'], ['garden.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('user_id', 'garden_id')
    )
    op.drop_table('favorites')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('favorites',
    sa.Column('user_id', mysql.INTEGER(), autoincrement=False, nullable=False),
    sa.Column('garden_id', mysql.INTEGER(), autoincrement=False, nullable=False),
    sa.ForeignKeyConstraint(['garden_id'], ['garden.id'], name='favorites_ibfk_1'),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], name='favorites_ibfk_2'),
    sa.PrimaryKeyConstraint('user_id', 'garden_id'),
    mysql_collate='utf8mb4_0900_ai_ci',
    mysql_default_charset='utf8mb4',
    mysql_engine='InnoDB'
    )
    op.drop_table('UserGardens')
    # ### end Alembic commands ###
