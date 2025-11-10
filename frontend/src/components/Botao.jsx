export default function Botao({ children, onClick, variant = "primary" }) {
  const estilos = {
    primary: "bg-blue-500 hover:bg-blue-600 text-white",
    danger: "bg-red-500 hover:bg-red-600 text-white",
  };

  return (
    <button
      onClick={onClick}
      className={`${estilos[variant]} px-4 py-2 rounded-md text-sm font-medium`}
    >
      {children}
    </button>
  );
}
