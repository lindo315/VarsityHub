
import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { categories } from '@/lib/data';
import { CalendarRange } from 'lucide-react';

interface EventFiltersProps {
  onFilterChange: (filters: any) => void;
  filters: {
    category: string;
    date: string;
  };
}

const EventFilters = ({ onFilterChange, filters }: EventFiltersProps) => {
  const handleCategoryChange = (value: string) => {
    onFilterChange({
      ...filters,
      category: value,
    });
  };

  const handleDateChange = (value: string) => {
    onFilterChange({
      ...filters,
      date: value,
    });
  };

  const handleReset = () => {
    onFilterChange({
      category: 'all',
      date: 'all',
    });
  };

  return (
    <Card className="mb-6">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold">Filter Events</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Category</label>
          <Select
            value={filters.category}
            onValueChange={handleCategoryChange}
          >
            <SelectTrigger>
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Date</label>
          <Select
            value={filters.date}
            onValueChange={handleDateChange}
          >
            <SelectTrigger>
              <SelectValue placeholder="Any Date" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Any Date</SelectItem>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="tomorrow">Tomorrow</SelectItem>
              <SelectItem value="this-week">This Week</SelectItem>
              <SelectItem value="this-month">This Month</SelectItem>
              <SelectItem value="custom">
                <div className="flex items-center">
                  <CalendarRange className="mr-2 h-4 w-4" />
                  Custom Range
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-end">
          <Button
            variant="outline"
            onClick={handleReset}
            className="w-full"
          >
            Reset Filters
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default EventFilters;
