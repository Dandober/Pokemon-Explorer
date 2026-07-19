import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCustomPokemon } from '../context/CustomPokemonContext';

const PLACEHOLDER_IMAGE =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="46" fill="#e2e8f0" stroke="#94a3b8" stroke-width="3"/><path d="M4 50h30a16 16 0 0 0 32 0h30" fill="none" stroke="#94a3b8" stroke-width="3"/><circle cx="50" cy="50" r="10" fill="#e2e8f0" stroke="#94a3b8" stroke-width="3"/></svg>',
  );

// Adds a Pokémon to the top of the Explore list, just for this session
export default function CreatePokemon() {
  const { addCustomPokemon } = useCustomPokemon();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [preview, setPreview] = useState<string | null>(null);

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null;
    setPreview(file ? URL.createObjectURL(file) : null);
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;

    addCustomPokemon({
      name: name.trim().toLowerCase(),
      image: preview ?? PLACEHOLDER_IMAGE,
      height: height ? Number(height) : undefined,
      weight: weight ? Number(weight) : undefined,
    });

    navigate('/');
  }

  return (
    <div className="mx-auto max-w-lg px-4 py-8">
      <h1 className="mb-1 text-2xl font-bold text-slate-900 dark:text-white">Create a Pokémon</h1>
      <p className="mb-6 text-sm text-slate-500 dark:text-slate-400">
        Added to the top of the Explore list for this session only.
      </p>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-800"
      >
        {/* Name */}
        <Field label="Name" required>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            required
            placeholder="e.g. Sparkitty"
            className="input"
          />
        </Field>

        {/* Height / weight */}
        <div className="grid grid-cols-2 gap-4">
          <Field label="Height (m)">
            <input
              type="number"
              step="0.1"
              min="0"
              value={height}
              onChange={e => setHeight(e.target.value)}
              placeholder="0.5"
              className="input"
            />
          </Field>
          <Field label="Weight (kg)">
            <input
              type="number"
              step="0.1"
              min="0"
              value={weight}
              onChange={e => setWeight(e.target.value)}
              placeholder="6.0"
              className="input"
            />
          </Field>
        </div>

        {/* Image + preview */}
        <Field label="Image">
          <label className="flex w-fit cursor-pointer items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-600 transition hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600">
            <span aria-hidden="true">📷</span>
            {preview ? 'Change photo' : 'Add a photo'}
            <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
          </label>
        </Field>

        {preview && (
          <img src={preview} alt="Preview" className="mx-auto h-28 w-28 rounded-xl object-contain" />
        )}

        <button
          type="submit"
          className="mt-2 rounded-full bg-red-600 px-4 py-2 font-medium text-white shadow-sm transition hover:bg-red-700"
        >
          Add Pokémon
        </button>
      </form>
    </div>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-1 text-sm font-medium text-slate-700 dark:text-slate-200">
      {label}
      {required && <span className="text-red-500"> *</span>}
      {children}
    </label>
  );
}
