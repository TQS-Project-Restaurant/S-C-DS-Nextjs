export default function pageLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <div className="h-full flex flex-col">
        <div className="text-3xl mx-3 border-b rounded text-white pb-2">
            Pedidos
        </div>
        {children}
      </div>
    );
  }