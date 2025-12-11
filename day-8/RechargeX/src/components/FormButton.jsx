const FormButton = ({ children, onClick, type = 'button', variant = 'primary' }) => {
  const baseClass = 'w-full py-3 rounded-lg font-semibold transition';
  const variants = {
    primary: 'bg-orange-600 text-white hover:bg-orange-700 active:scale-95',
    success: 'bg-green-600 text-white hover:bg-green-700 active:scale-95',
    secondary: 'bg-gray-700 text-white hover:bg-gray-800 active:scale-95',
  };

  return (
    <button type={type} onClick={onClick} className={`${baseClass} ${variants[variant]}`}>
      {children}
    </button>
  );
};

export default FormButton;
