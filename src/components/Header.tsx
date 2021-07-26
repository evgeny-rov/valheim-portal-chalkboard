import React, { useState } from 'react';
import { db } from '../services/firebase';

const Header = () => {
  const [commentText, setCommentText] = useState('');
  const [tagText, setTagText] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    db.portals.add({
      tag: tagText,
      comment: commentText,
      updatedAt: Date.now(),
    });

    setCommentText('');
    setTagText('');
  };

  return (
    <header className="p-4 top-0 grid place-items-center">
      <form
        action="#"
        onSubmit={handleSubmit}
        className="grid grid_layout_header gap-6 place-items-center sm:grid-flow-col"
      >
        <p className="text-lg">Новый портал</p>
        <input
          type="text"
          name="tag"
          value={tagText}
          onChange={(e) => setTagText(e.target.value)}
          placeholder="Тэг"
          required
          className="rounded-md p-2 bg-transparent border"
        />
        <input
          type="text"
          name="comment"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Комментарий"
          required
          className="rounded-md p-2 bg-transparent border"
        />
        <button type="submit" className="text-lg hover:text-gray-500">
          Добавить
        </button>
      </form>
    </header>
  );
};

export default Header;
