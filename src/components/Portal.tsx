import { useState } from 'react';
import { PortalEntry } from '../types';

type Props = {
  portalData: PortalEntry;
};

const Portal = ({ portalData: { id, updatedAt, comment, tag } }: Props) => {
  const [commentText, setCommentText] = useState(comment);
  const [tagText, setTagText] = useState(tag);

  return (
    <li className="relative grid bg-blue-300 rounded-xl p-6 w-full h-full">
      <div className="mb-4 flex justify-between">
        <label>
          Tag:
          <input
            type="text"
            name="tag"
            value={tagText}
            onChange={(e) => setTagText(e.target.value)}
            className="subtle_input"
          />
        </label>
        <button
          type="button"
          className="self-end text-white"
          onClick={console.log}
        >
          X
        </button>
      </div>
      <div className="flex justify-between">
        <input
          type="text"
          name="comment"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          className="subtle_input w-1/2 font-mono"
        />
        <button type="button" className="self-end text-white">
          save
        </button>
      </div>
    </li>
  );
};

export default Portal;
