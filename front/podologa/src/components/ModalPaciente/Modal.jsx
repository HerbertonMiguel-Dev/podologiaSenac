const Modal = ({ children, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50" onClick={onClose}>
      <div
        className="bg-white p-6 rounded-lg max-w-md w-full relative"
        onClick={(e) => e.stopPropagation()} // Impede o fechamento ao clicar dentro do modal
      >
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 p-2 rounded-full bg-blue-500 transition duration-150 ease-in-out transform hover:scale-105 focus:outline-none"
          onClick={onClose}
          aria-label="Fechar modal"
        >
          Fechar
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
