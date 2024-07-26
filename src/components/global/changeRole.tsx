import React from "react";

interface SelectRoleProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectRole: (role: string) => void;
}

const SelectRole: React.FC<SelectRoleProps> = ({
  isOpen,
  onClose,
  onSelectRole,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 p-4 flex flex-wrap justify-center items-center w-full h-full z-[1000] before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] overflow-auto font-[sans-serif]">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-6 relative">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-3.5 cursor-pointer shrink-0 fill-gray-400 hover:fill-red-500 float-right"
          viewBox="0 0 320.591 320.591"
          onClick={onClose}
        >
          <path d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z" />
          <path d="M287.9 318.583a30.37 30.37 0 0 1-21.56-7.288L10.325 52.965C-1.45 41.121-1.45 22.6 10.325 10.756s30.792-11.774 42.551 0L309.59 269.118c11.774 11.844 11.774 30.973 0 42.817a30.369 30.369 0 0 1-21.69 6.648z" />
        </svg>
        <h2 className="text-xl font-bold mb-4">Select New Role</h2>
        <div className="flex flex-col space-y-2">
          <button
            onClick={() => onSelectRole("admin")}
            className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition duration-200"
          >
            Admin
          </button>
          <button
            onClick={() => onSelectRole("user")}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
          >
            User
          </button>
          <button
            onClick={() => onSelectRole("artist")}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-200"
          >
            Artist
          </button>
        </div>
      </div>
    </div>
  );
};

export default SelectRole;
