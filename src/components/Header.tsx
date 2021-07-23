import React, { useState } from 'react';
import { db } from '../services/firebase';

const Header = () => {
  const [commentText, setCommentText] = useState('');
  const [tagText, setTagText] = useState('');
  const handleSubmit = () => {
    db.portals.add({
      tag: tagText,
      comment: commentText,
      updatedAt: Date.now(),
    });
    setCommentText('');
    setTagText('');
  };

  return (
    <header className="sticky h-20 flex justify-center items-center space-x-6 text-white">
      <input
        type="text"
        name="tag"
        value={tagText}
        onChange={(e) => setTagText(e.target.value)}
        placeholder="Тэг"
        className="rounded-md p-2 bg-transparent border"
      />
      <input
        type="text"
        name="comment"
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        placeholder="Комментарий"
        className="rounded-md p-2 bg-transparent border"
      />
      <button
        className="text-white font-bold font-mono text-lg"
        onClick={handleSubmit}
      >
        Добавить
      </button>
    </header>
  );
};

export default Header;
