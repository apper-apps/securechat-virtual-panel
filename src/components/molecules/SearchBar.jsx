import { useState } from 'react';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';

const SearchBar = ({ onSearch, placeholder = "Search chats..." }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  const handleClear = () => {
    setSearchTerm('');
    onSearch('');
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className="relative">
        <ApperIcon 
          name="Search" 
          className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-tertiary" 
        />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-10 pr-10 py-3 bg-surface/50 border border-text-tertiary/30 rounded-2xl text-text-primary placeholder-text-tertiary focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
        />
        {searchTerm && (
          <Button
            type="button"
            onClick={handleClear}
            variant="ghost"
            size="sm"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 w-6 h-6 p-0 hover:bg-surface"
          >
            <ApperIcon name="X" className="w-4 h-4 text-text-tertiary" />
          </Button>
        )}
      </div>
    </form>
  );
};

export default SearchBar;