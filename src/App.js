import { useState } from 'react';

export default function App() {
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);

  function handleFileChange(e) {
    const selectedFiles = Array.from(e.target.files);
    setFiles(prev => [...prev, ...selectedFiles]);
    const newPreviews = selectedFiles.map(file => URL.createObjectURL(file));
    setPreviews(prev => [...prev, ...newPreviews]);
  }

  return (
    <div className="min-h-screen bg-white p-4">
      <h1 className="text-2xl font-bold mb-4">Dodaj zdjęcia dysków</h1>
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileChange}
        className="mb-4"
      />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {previews.map((src, idx) => (
          <div key={idx} className="border rounded-xl overflow-hidden shadow">
            <img src={src} alt={`Dysk ${idx + 1}`} className="w-full h-40 object-cover" />
            <div className="p-2 text-sm text-center">Dysk {idx + 1}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
