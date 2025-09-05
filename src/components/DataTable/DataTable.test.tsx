import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DataTable } from './DataTable';

type Row = { id: number; name: string; age: number };

const rows: Row[] = [
  { id: 1, name: 'C', age: 30 },
  { id: 2, name: 'A', age: 10 },
  { id: 3, name: 'B', age: 20 }
];

describe('DataTable', () => {
  it('sorts by column when header is clicked', async () => {
    const user = userEvent.setup();
    render(
      <DataTable<Row>
        data={rows}
        columns={[
          { key: 'name', title: 'Name', dataIndex: 'name', sortable: true },
          { key: 'age', title: 'Age', dataIndex: 'age', sortable: true }
        ]}
      />
    );
    const nameHeader = screen.getByRole('button', { name: /sort by name/i });
    await user.click(nameHeader);
    const cells = screen.getAllByRole('cell');
    expect(cells[0]).toHaveTextContent('A');
  });

  it('selects rows', async () => {
    const user = userEvent.setup();
    const handle = vi.fn();
    render(
      <DataTable<Row>
        data={rows}
        selectable
        onRowSelect={handle}
        columns={[
          { key: 'name', title: 'Name', dataIndex: 'name' },
          { key: 'age', title: 'Age', dataIndex: 'age' }
        ]}
      />
    );
    const checkbox = screen.getByLabelText('Select row 1');
    await user.click(checkbox);
    expect(handle).toHaveBeenCalled();
  });
});
