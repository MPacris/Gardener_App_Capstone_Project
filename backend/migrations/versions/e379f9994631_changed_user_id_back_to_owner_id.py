"""changed user_id back to owner_id

Revision ID: e379f9994631
Revises: f9cbb83cc33b
Create Date: 2023-06-08 08:46:44.784535

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision = 'e379f9994631'
down_revision = 'f9cbb83cc33b'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('garden', schema=None) as batch_op:
        batch_op.add_column(sa.Column('owner_id', sa.Integer(), nullable=True))
        batch_op.drop_constraint('garden_ibfk_1', type_='foreignkey')
        batch_op.create_foreign_key(None, 'user', ['owner_id'], ['id'])
        batch_op.drop_column('user_id')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('garden', schema=None) as batch_op:
        batch_op.add_column(sa.Column('user_id', mysql.INTEGER(), autoincrement=False, nullable=True))
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.create_foreign_key('garden_ibfk_1', 'user', ['user_id'], ['id'])
        batch_op.drop_column('owner_id')

    # ### end Alembic commands ###
