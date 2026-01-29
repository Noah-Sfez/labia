export default function TestValueCard({ name, value, unit, min, max, onChange }) {
  const safeId = name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-")
    .toLowerCase();

  const handleChange = (field, newValue) => {
    onChange({
      value: field === "value" ? newValue : value,
      unit: field === "unit" ? newValue : unit,
      min: field === "min" ? newValue : min,
      max: field === "max" ? newValue : max,
    });
  };

  return (
    <fieldset
      className="
        bg-white
        rounded-xl
        border-2 border-raspberry-200
        p-6
        flex flex-col gap-4
        shadow-sm
      "
      aria-labelledby={`${safeId}-title`}
    >
      <legend id={`${safeId}-title`} className="text-sm font-semibold text-raspberry-900">
        {name}
      </legend>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1">
          <label
            htmlFor={`${safeId}-value`}
            className="text-sm font-medium text-raspberry-900"
          >
            Votre valeur
          </label>

          <input
            id={`${safeId}-value`}
            name={`${safeId}-value`}
            type="number"
            inputMode="decimal"
            step="any"
            value={value || ""}
            onChange={(e) => handleChange("value", e.target.value)}
            placeholder="Exemple : 14,2"
            className="
              border-2 border-raspberry-200
              rounded-lg
              px-3 py-2
              text-sm
              focus:outline-none
              focus:ring-2
              focus:ring-raspberry-500
            "
          />
        </div>

        <div className="flex flex-col gap-1">
          <label
            htmlFor={`${safeId}-unit`}
            className="text-sm font-medium text-raspberry-900"
          >
            Unité
          </label>

          <select
            id={`${safeId}-unit`}
            name={`${safeId}-unit`}
            value={unit || ""}
            onChange={(e) => handleChange("unit", e.target.value)}
            className="
              border-2 border-raspberry-200
              rounded-lg
              px-3 py-2
              text-sm
              bg-white
              focus:outline-none
              focus:ring-2
              focus:ring-raspberry-500
            "
          >
            <option value="" disabled>
              Sélectionnez une unité
            </option>
            <option value="g/dL">g par décilitre</option>
            <option value="mg/dL">milligrammes par décilitre</option>
            <option value="mmol/L">millimoles par litre</option>
            <option value="µmol/L">micromoles par litre</option>
            <option value="10^9/L">10 puissance 9 par litre</option>
            <option value="U/L">unités par litre</option>
            <option value="%">pourcentage</option>
          </select>
        </div>
      </div>

      <fieldset className="flex flex-col gap-1">
        <legend className="text-sm font-medium text-raspberry-900">
          Plage de référence (optionnel)
        </legend>

        <div className="flex items-center gap-2">
          <label htmlFor={`${safeId}-min`} className="sr-only">
            Valeur minimale de référence
          </label>

          <input
            id={`${safeId}-min`}
            name={`${safeId}-min`}
            type="number"
            inputMode="decimal"
            step="any"
            value={min || ""}
            onChange={(e) => handleChange("min", e.target.value)}
            placeholder="Minimum"
            className="
              w-full
              border-2 border-raspberry-200
              rounded-lg
              px-3 py-2
              text-sm
              focus:outline-none
              focus:ring-2
              focus:ring-raspberry-500
            "
          />

          <span className="sr-only">à</span>
          <span aria-hidden="true" className="text-sm text-raspberry-700">
            à
          </span>

          <label htmlFor={`${safeId}-max`} className="sr-only">
            Valeur maximale de référence
          </label>

          <input
            id={`${safeId}-max`}
            name={`${safeId}-max`}
            type="number"
            inputMode="decimal"
            step="any"
            value={max || ""}
            onChange={(e) => handleChange("max", e.target.value)}
            placeholder="Maximum"
            className="
              w-full
              border-2 border-raspberry-200
              rounded-lg
              px-3 py-2
              text-sm
              focus:outline-none
              focus:ring-2
              focus:ring-raspberry-500
            "
          />
        </div>
      </fieldset>
    </fieldset>
  );
}
