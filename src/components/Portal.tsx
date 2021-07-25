import { useState } from 'react';
import { PortalEntry } from '../types';
import portal from '../assets/portal.png';
import { db } from '../services/firebase';

type Props = {
  portalData: PortalEntry;
};

const Portal = ({ portalData: { id, updatedAt, comment, tag } }: Props) => {
  const [commentText, setCommentText] = useState(comment);
  const [tagText, setTagText] = useState(tag);

  const handleSave = () => {
    const isTaggedChanged = tag !== tagText;

    db.portals.doc(id).update({
      comment: commentText,
      tag: tagText,
      updatedAt: isTaggedChanged ? Date.now() : updatedAt,
    });
  };

  const handleRemove = () => {
    db.portals.doc(id).delete();
  };

  return (
    <div className="relative grid place-items-center rounded-full p-4 h-60 w-60 shadow-custom-green">
      <div className="absolute w-full h-full z-0 rounded-full overflow-hidden">
        <img
          src={portal}
          alt="portal"
          className="object-cover w-full h-full animate-spin-slow"
        />
      </div>
      <div className="flex flex-col justify-between items-center w-full h-full z-10">
        <button
          type="button"
          className="text-xl p-1 hover:text-gray-500"
          onClick={handleRemove}
        >
          x
        </button>
        <div className="grid gap-4 text-center">
          <div className="grid grid-flow-row gap-1">
            <label>Тэг:</label>
            <input
              type="text"
              name="tag"
              value={tagText}
              onChange={(e) => setTagText(e.target.value)}
              className="subtle_input w-full text-center"
            />
          </div>
          <div className="grid grid-flow-row gap-1">
            <label className="font">Комментарий:</label>
            <input
              type="text"
              name="comment"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className="subtle_input w-full text-center"
            />
          </div>
        </div>
        <button type="button" onClick={handleSave} className="p-1 text-base hover:text-gray-500">
          Сохранить
        </button>
      </div>
    </div>
  );
};

export default Portal;
