import logo from '../assets/logo.png'

export default function Header({ user, onLogout }) {
  return (
    <header className="bg-white p-4 flex justify-center items-center gap-120">
        <div className="flex items-center gap-2" style={{ marginTop: "18px" }}>
            <img
            src={logo}
            alt="Logo"
            className="w-[90px] h-[25px] opacity-100"
            />
        </div>

        <div className="flex items-center gap-4" style={{ marginTop: "24px" }}>
            <span className="text-[#A8A8A8] font-medium text-[13px] w-[85px] h-[13px]">
            {user?.nome}
            </span>
            <button
            onClick={onLogout}
            className="font-medium text-[13px] w-[79px] h-[13px] hover:underline"
            style={{color: "#49B4BB"}}
            >
            Desconectar
            </button>
        </div>
    </header>
  );
}
