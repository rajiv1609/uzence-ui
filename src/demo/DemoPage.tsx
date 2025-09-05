import React from 'react';
import { InputField } from '../components/InputField/InputField';
import { DataTable } from '../components/DataTable/DataTable';

type User = { id: number; name: string; email: string; age: number };

const data: User[] = [
  { id: 1, name: 'Aarav', email: 'aarav@example.com', age: 24 },
  { id: 2, name: 'Isha', email: 'isha@example.com', age: 27 },
  { id: 3, name: 'Rohit', email: 'rohit@example.com', age: 22 }
];

export default function DemoPage() {
  const [value, setValue] = React.useState('');
  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold">Uzence UI Components</h1>
        <p className="text-gray-600 dark:text-gray-300">InputField & DataTable demo</p>
      </header>

      <section className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <InputField
            label="Email"
            placeholder="name@example.com"
            value={value}
            onChange={(e) => setValue((e.target as HTMLInputElement).value)}
            helperText="We will never share your email."
            variant="outlined"
          />
          <InputField label="Password" type="password" passwordToggle variant="filled" />
          <InputField label="Disabled" placeholder="Can't type" disabled variant="ghost" />
          <InputField label="Loading" loading />
          <InputField label="Invalid" invalid errorMessage="Required field." />
        </div>

        <div>
          <DataTable
            data={data}
            columns={[
              { key: 'name', title: 'Name', dataIndex: 'name', sortable: true },
              { key: 'email', title: 'Email', dataIndex: 'email' },
              { key: 'age', title: 'Age', dataIndex: 'age', sortable: true }
            ]}
            selectable
            onRowSelect={(rows) => console.log('Selected rows', rows)}
          />
        </div>
      </section>
    </div>
  );
}
