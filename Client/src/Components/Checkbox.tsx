export const CustomCheckbox = ({ isChecked }: { isChecked: boolean }) => {
  return (
    <label className="inline-flex items-center">
      <input type="checkbox" readOnly checked={isChecked} className="hidden" />
      <div className="relative w-5 h-5 border-2 border-black bg-transparent">
        {isChecked && (
          <svg
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 6L4.5 9.5L11 3"
              stroke="black"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </div>
    </label>
  );
};
