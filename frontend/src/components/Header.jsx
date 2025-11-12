import logo from '../assets/logo.png';

export default function Header({ usuario, onLogout }) {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-4xl mx-auto flex items-center justify-between px-4 py-4">
        <div className="flex items-center">
          <img
            src={logo}
            alt="Logo"
            className="w-[90px] h-[25px] opacity-100"
          />
        </div>

        <div className="flex items-center gap-4">
          <span className="text-sm font-medium text-[#A8A8A8]">
            {usuario?.nome}
          </span>
          <button
            onClick={onLogout}
            className="text-sm font-medium text-[#49B4BB] hover:underline"
          >
            Desconectar
          </button>
        </div>
      </div>
    </header>
  );
}
