import { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';

export default function CreateCapsule() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deliveryDate, setUnlockDate] = useState('');
  const [isPublic, setIsPublic] = useState(false);
  const [tags, setTags] = useState([]);
  const { data: session, status } = useSession();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('/api/Capsules', {
      method: 'POST',
      body: JSON.stringify({
        title,
        description,
        deliveryDate,
        visibility: isPublic ? 'public' : 'private',
        tags,
        ownerId: session.user.id,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    if (data.message) {
      alert('Capsule created!');
    }
  };


  const handleTagsChange = (e) => {
    setTags(e.target.value.split(',').map(tag => tag.trim()));
  };

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (!session) {
    return <p>You must be signed in to view this page.</p>;
  }

  return (
    <>
      <div>
        <h1>Create Capsule</h1>
        <button onClick={() => signOut({ callbackUrl: '/auth/signin' })}>Sign out</button>
      </div>
      <form onSubmit={handleSubmit} className="mb-6">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="w-full p-2 mb-4 border rounded"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          className="w-full p-2 mb-4 border rounded"
        />
        <input
          type="datetime-local"
          value={deliveryDate}
          onChange={(e) => setUnlockDate(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        />
        <label>
          Public
          <input
            type="checkbox"
            checked={isPublic}
            onChange={(e) => setIsPublic(e.target.checked)}
          />
        </label>

        <input
          type="text"
          value={tags.join(', ')}
          onChange={handleTagsChange}
          placeholder="Tags (comma separated)"
          className="w-full p-2 mb-4 border rounded"
        />
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
          Create Capsule
        </button>
      </form>
    </>
  );
}
