const FormButton = ({ children, onClick, type = 'button', variant = 'primary', className = '' }) => {
  const baseClass = 'w-full py-3 rounded-xl font-semibold transition flex items-center justify-center';
  const variants = {
    primary: 'bg-orange-500 text-white hover:bg-orange-600 active:scale-95 shadow-lg shadow-orange-500/30',
    success: 'bg-green-600 text-white hover:bg-green-700 active:scale-95 shadow-lg shadow-green-500/30',
    secondary: 'bg-gray-800 text-white hover:bg-gray-900 active:scale-95',
    danger: 'bg-red-600 text-white hover:bg-red-700 active:scale-95 shadow-lg shadow-red-500/30',
  };

  return (
    <button type={type} onClick={onClick} className={`${baseClass} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
};

export default FormButton;
