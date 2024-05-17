import React, { useState } from 'react'
import { IoCloseSharp } from "react-icons/io5";

function TagsField(props) {
  const {id, label} = props;
  const [tags, setTags] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [tagCounter, setTagCounter] = useState(0);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  }

  const addTags = (e) => {
    if(e.key === 'Enter' && inputValue !== '') {
      e.preventDefault();

      let newTag = {
        id: tagCounter,
        value: inputValue.trim()
      }

      setTags(prevTags => [...prevTags, newTag]);
      setInputValue('');
      setTagCounter(prevCount => prevCount+1);
    }
  }

  const removeTags = (tagId) => {
    setTags((prevTags) => (prevTags.filter((tag) => tag.id !== tagId)))
  }

  return (
    <div className="flex flex-col items-start gap-2 basis-96 grow shrink w-full">
      {label}
      <div className="tags-input w-full border rounded-md flex gap-1 items-center">
        <ul className="inline-flex gap-2 ps-2">
          {tags.map((tag) => (
            <li key={tag?.id?.toString()} className="p-0.5 rounded flex gap-0 bg-gray-50">
              <span>{tag.value}</span>
              <button className='px-2 text-gray-light'
                onClick={() => removeTags(tag.id)}
              >
                <IoCloseSharp/>
              </button>
            </li>
          ))}
        </ul>
        <input
          type="text"
          onKeyDown={event => addTags(event)}
          placeholder='add a tag'
          id={id}
          value={inputValue}
          onChange={handleInputChange}
          className="block w-full rounded-md border-0 px-2 py-2 text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6"
        />
      </div>
    </div>
  );
}

export default TagsField


