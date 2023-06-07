"""garden, usergarden, task, plant and harvest models created

Revision ID: 59034b09ed7e
Revises: c4d7f9729c0f
Create Date: 2023-06-07 15:06:41.221865

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '59034b09ed7e'
down_revision = 'c4d7f9729c0f'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('garden',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('owner_id', sa.Integer(), nullable=True),
    sa.Column('name', sa.String(length=255), nullable=False),
    sa.Column('notes', sa.Text(), nullable=True),
    sa.ForeignKeyConstraint(['owner_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('plant',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('type', sa.String(length=255), nullable=False),
    sa.Column('location', sa.String(length=255), nullable=False),
    sa.Column('image_url', sa.String(length=255), nullable=False),
    sa.Column('garden_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['garden_id'], ['garden.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('user_garden',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('garden_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['garden_id'], ['garden.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('task',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('plant_id', sa.Integer(), nullable=True),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('task_type', sa.String(length=255), nullable=False),
    sa.Column('task_scheduled', sa.Date(), nullable=False),
    sa.Column('task_completed', sa.Date(), nullable=True),
    sa.ForeignKeyConstraint(['plant_id'], ['plant.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('harvest',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('task_id', sa.Integer(), nullable=True),
    sa.Column('rating', sa.Integer(), nullable=False),
    sa.Column('image_url', sa.String(length=255), nullable=True),
    sa.Column('notes', sa.Text(), nullable=True),
    sa.ForeignKeyConstraint(['task_id'], ['task.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.create_unique_constraint(None, ['email'])
        batch_op.create_unique_constraint(None, ['username'])

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.drop_constraint(None, type_='unique')
        batch_op.drop_constraint(None, type_='unique')

    op.drop_table('harvest')
    op.drop_table('task')
    op.drop_table('user_garden')
    op.drop_table('plant')
    op.drop_table('garden')
    # ### end Alembic commands ###
