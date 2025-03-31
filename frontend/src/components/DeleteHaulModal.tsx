import { DeleteHaulModalProps } from "../types/haul";

const DeleteHaulModal: React.FC<DeleteHaulModalProps> = ({ onCancel, onDelete, isModalVisible }) => {
  return (
    <div
      className={`fixed inset-0 flex justify-center items-center ${
        !isModalVisible && 'hidden'
      }`}
    >
      {/* dark overlay */}
      <div className="absolute inset-0 bg-black opacity-30" onClick={onCancel}></div>

      {/* modal content */}
      <div className="z-10 max-w-96 bg-white opacity-100 p-6 rounded-lg flex flex-col">
        <h1 className="text-center font-semibold text-base mb-2">
          Are you sure you want to delete this haul?
        </h1>
        <p className="text-sm">This action cannot be undone.</p>
        <div className="flex justify-end mt-4">
          <button
            type="button"
            onClick={onCancel}
            className="bg-stone-200 hover:bg-stone-300 rounded-lg p-2 mr-2 text-sm font-semibold"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onDelete}
            className="bg-red-600 hover:bg-red-500 rounded-lg p-2 text-white text-sm font-semibold"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteHaulModal;
