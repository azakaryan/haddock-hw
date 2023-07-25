interface HeaderProps {
    title: string
}

function Header({ title }: HeaderProps) {
  return (
    <h1 className="mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-600">
      {title}
    </h1>
  );
}

export default Header;