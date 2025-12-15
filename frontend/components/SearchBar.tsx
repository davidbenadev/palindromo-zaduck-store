import { useState, FormEvent } from 'react';

interface Props {
  onSearch: (term: string) => void;
  isLoading: boolean;
}

export const SearchBar = ({ onSearch, isLoading }: Props) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSearch(input);
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-lg gap-2">
      <input
        type="text"
        className="flex-1 rounded-lg border border-gray-300 p-3 text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
        placeholder="Busca marcas, ej: 'nike' o 'abba'..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button
        type="submit"
        disabled={isLoading || !input.trim()}
        className="rounded-lg bg-indigo-600 px-6 py-3 font-semibold text-white transition hover:bg-indigo-700 disabled:bg-indigo-300"
      >
        {isLoading ? '...' : 'Buscar'}
      </button>
    </form>
  );
};