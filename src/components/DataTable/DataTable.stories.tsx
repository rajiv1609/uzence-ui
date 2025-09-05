import type { Meta, StoryObj } from '@storybook/react';
import { DataTable } from './DataTable';

type User = { id: number; name: string; email: string; age: number };

const data: User[] = [
  { id: 1, name: 'Aarav', email: 'aarav@example.com', age: 24 },
  { id: 2, name: 'Isha', email: 'isha@example.com', age: 27 },
  { id: 3, name: 'Rohit', email: 'rohit@example.com', age: 22 }
];

const meta: Meta<typeof DataTable<User>> = {
  title: 'Data/DataTable',
  component: DataTable<User>,
  args: {
    data,
    columns: [
      { key: 'name', title: 'Name', dataIndex: 'name', sortable: true },
      { key: 'email', title: 'Email', dataIndex: 'email' },
      { key: 'age', title: 'Age', dataIndex: 'age', sortable: true }
    ],
    selectable: true
  },
  parameters: { layout: 'padded' }
};
export default meta;

export const Basic: StoryObj<typeof DataTable<User>> = {};
export const Loading: StoryObj<typeof DataTable<User>> = { args: { loading: true } };
export const Empty: StoryObj<typeof DataTable<User>> = { args: { data: [] } };
