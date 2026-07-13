export type FieldConfig = {
  name: string;
  label: string;
  type: "text" | "email" | "password" | "select";
  options?: { value: string; label: string }[];
  required?: boolean; // Nueva propiedad
};

interface DynamicFormProps {
  title: string;
  description: string;
  fields: FieldConfig[];
  formData: any;
  setFormData: (data: any) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancel?: () => void;
  submitButtonText: string;
  mensaje?: string;
  error?: string;
}

export const DynamicForm = ({
  title,
  description,
  fields,
  formData,
  setFormData,
  onSubmit,
  onCancel,
  submitButtonText,
  mensaje,
  error,
}: DynamicFormProps) => {
  const handleChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="bg-white border border-gray-200 rounded-3xl shadow-sm p-8 max-w-5xl">
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-black">{title}</h2>
        <p className="text-sm text-gray-500 mt-1">{description}</p>
      </div>

      <form onSubmit={onSubmit} className="grid grid-cols-2 gap-5">
        {fields.map((field) => (
          <div
            key={field.name}
            className={field.type === "email" ? "col-span-2" : ""}
          >
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {field.label}
            </label>
            {field.type === "select" ? (
              <select
                value={formData[field.name] || ""}
                onChange={(e) => handleChange(field.name, e.target.value)}
                required={field.required ?? true} // Por defecto es requerido
                className="w-full border border-gray-200 rounded-xl px-4 py-3 bg-white text-black focus:ring-2 focus:ring-black outline-none transition"
              >
                <option value="">Seleccione...</option>
                {field.options?.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type={field.type}
                value={formData[field.name] || ""}
                onChange={(e) => handleChange(field.name, e.target.value)}
                required={field.required ?? true} // Por defecto es requerido
                className="w-full border border-gray-200 rounded-xl px-4 py-3 bg-white text-black focus:ring-2 focus:ring-black outline-none transition"
              />
            )}
          </div>
        ))}
        {/* Mensaje éxito */}
        {mensaje && (
          <div className="col-span-2 bg-green-50 border border-green-200 rounded-xl p-4">
            <p className="text-sm text-green-700">{mensaje}</p>
          </div>
        )}

        {/* Mensaje error */}
        {error && (
          <div className="col-span-2 bg-red-50 border border-red-200 rounded-xl p-4">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        {/* Botón */}
        <div className="col-span-2 flex gap-4">
          <button
            type="submit"
            className="flex-1 bg-black text-white py-4 rounded-xl font-semibold shadow-sm hover:opacity-90 transition"
          >
            {submitButtonText}
          </button>
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 bg-gray-200 text-gray-800 py-4 rounded-xl font-semibold hover:bg-gray-300 transition"
            >
              Cancelar
            </button>
          )}
        </div>
      </form>
    </div>
  );
};
