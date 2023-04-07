export default function TextInput({ title, ...attributes }) {
  return (
    <>
      <label className="block text-sm font-medium text-gray-700">{title}</label>
      <input
        type="text"
        className="px-3 py-3 text-input mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        {...attributes}
      />
    </>
  );
}
