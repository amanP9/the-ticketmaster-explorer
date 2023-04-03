import React from 'react';

const SearchEvents = (props) => {
  const handleChange = (e) => {
    props.searchValue(e.target.value);
  };
  return (
    <form
      method='POST'
      onSubmit={(e) => {
        e.preventDefault();
      }}
      name='formName'
      className='relative w-96 mx-auto my-0'
    >
      <div className="relative rounded-full border-2 border-blue-900 overflow-hidden focus-within:border-purple-600 transition-all duration-500">
        <input
          autoComplete='on'
          type='text'
          name='searchTerm'
          onChange={handleChange}
          className='w-full py-2 px-4 bg-transparent placeholder-blue-800 focus:placeholder-indigo-600'
          placeholder='Search events...'
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600 hover:border-purple-600" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M13.945 12.986a7 7 0 111.415-1.415l3.347 3.347a1 1 0 01-1.414 1.414l-3.348-3.346zM7 12a5 5 0 100-10 5 5 0 000 10z" clipRule="evenodd" />
          </svg>
        </div>
      </div>
    </form>
  );
};

export default SearchEvents;
