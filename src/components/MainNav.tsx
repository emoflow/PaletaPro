
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = [
  { label: "Inicio", path: "/" },
  { label: "Panel", path: "/dashboard" },
  { label: "Jugadores", path: "/players" },
  { label: "Clubes", path: "/clubs" },
  { label: "Torneos", path: "/tournaments" },
  { label: "Rankings", path: "/rankings" },
];

export default function MainNav() {
  const pathname = usePathname();

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        background: "#101010",
        borderBottom: "1px solid #303030",
        padding: "14px 5%",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "20px",
          flexWrap: "wrap",
        }}
      >
        <Link
          href="/dashboard"
          style={{
            color: "white",
            textDecoration: "none",
            fontSize: "22px",
            fontWeight: 800,
            letterSpacing: "1px",
          }}
        >
          PALETA<span style={{ color: "#b7e36b" }}>PRO</span>
        </Link>

        <nav
          style={{
            display: "flex",
            gap: "8px",
            overflowX: "auto",
            maxWidth: "100%",
          }}
        >
          {navigation.map((item) => {
            const active = pathname === item.path;

            return (
              <Link
                key={item.path}
                href={item.path}
                style={{
                  color: active ? "#b7e36b" : "#cccccc",
                  background: active ? "#252c1c" : "transparent",
                  border: active
                    ? "1px solid #536b35"
                    : "1px solid transparent",
                  borderRadius: "8px",
                  padding: "9px 12px",
                  textDecoration: "none",
                  fontSize: "13px",
                  fontWeight: active ? 700 : 500,
                  whiteSpace: "nowrap",
                }}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
