import React, { useState } from 'react';
import DatePicker from 'react-datepicker';

interface EventFilterProps {
    onFilter: (filters: any) => void;
}

const EventFilter: React.FC<EventFilterProps> = ({ onFilter }) => {
    const [filters, setFilters] = useState({
        startDate: '',
        endDate: '',
        name: '',
    });

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>, type: String, name: String) => {
        switch (type) {
            case "DATE":
                setFilters({ ...filters, [name]: e });
                break;
            default:
                setFilters({ ...filters, [name]: e.target.value });
                break;
        }
    };

    const handleFilterSubmit = () => {
        onFilter(filters);
    };

    return (
        <div className="flex space-x-4 mb-6">
            <input
                type="text"
                name="name"
                value={filters.name}
                onChange={(e) => handleFilterChange(e, "", "name")}
                className="border p-2 rounded w-full"
                placeholder="name"
            />
            <DatePicker
                selected={new Date(filters.startDate)}
                onChange={(e) => handleFilterChange(e, "DATE", "startDate")}
                dateFormat="dd/mm/yyyy"
                placeholderText="Start Date"
                className="border p-2 rounded w-full"
            />
            <input
                type="date"
                name="endDate"
                value={filters.endDate}
                onChange={(e) => handleFilterChange(e, "DATE", "endDate")}
                className="border p-2 rounded w-full"
                placeholder="End Date"
            />
            <button
                onClick={handleFilterSubmit}
                className="bg-blue-500 text-white px-4 py-2 rounded"
            >
                Filter
            </button>
        </div>
    );
};

export default EventFilter;
