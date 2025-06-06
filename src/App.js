import { useState } from 'react';

export default function App() {
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [disks, setDisks] = useState([]);

  function handleFileChange(e) {
    const selectedFiles = Array.from(e.target.files);
    setFiles(prev => [...prev, ...selectedFiles]);
    const newPreviews = selectedFiles.map(file => URL.createObjectURL(file));
    setPreviews(prev => [...prev, ...newPreviews]);

    const newDisks = selectedFiles.map((file, idx) => ({
      name: file.name,
      model: '-',
      manufacturer: '-',
      type: '-',
      format: '-',
      productionYear: '-',
      serial: '-',
    }));
    setDisks(prev => [...prev, ...newDisks]);
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

      {files.length > 0 && (
        <div className="mb-4 text-green-700 font-medium">
          Załadowano {files.length} zdjęć dysków
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Zdjęcie</th>
              <th className="p-2 border">Nazwa pliku</th>
              <th className="p-2 border">Producent</th>
              <th className="p-2 border">Model</th>
              <th className="p-2 border">Typ</th>
              <th className="p-2 border">Format</th>
              <th className="p-2 border">Rok produkcji</th>
              <th className="p-2 border">Nr seryjny</th>
            </tr>
          </thead>
          <tbody>
            {previews.map((src, idx) => (
              <tr key={idx} className="text-center">
                <td className="p-2 border">
                  <img src={src} alt={`Dysk ${idx + 1}`} className="h-20 mx-auto object-contain" />
                </td>
                <td className="p-2 border">{disks[idx]?.name}</td>
                <td className="p-2 border">{disks[idx]?.manufacturer}</td>
                <td className="p-2 border">{disks[idx]?.model}</td>
                <td className="p-2 border">{disks[idx]?.type}</td>
                <td className="p-2 border">{disks[idx]?.format}</td>
                <td className="p-2 border">{disks[idx]?.productionYear}</td>
                <td className="p-2 border">{disks[idx]?.serial}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
