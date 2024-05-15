export default function pageLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <div className="h-screen">
        <div className="h-[10%] text-3xl pb-2 pt-6 mx-3 border-b rounded">
            Pedidos
        </div>
        {children}
      </div>
    );
  }