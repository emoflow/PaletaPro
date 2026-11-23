
"use client";

import { useEffect, useRef } from "react";

export default function PlayPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const keys = useRef({ left: false, right: false, hit: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const game = {
      playerX: 450,
      rivalX: 450,
      ballX: 450,
      ballY: 230,
      ballVX: 2,
      ballVY: 4,
      scorePlayer: 0,
      scoreRival: 0,
      message: "¡Preparado para jugar!",
      canHit: true,
      lastHit: 0,
    };

    let animation = 0;

    function resetBall() {
      game.ballX = 450;
      game.ballY = 230;
      game.ballVX = Math.random() * 3 - 1.5;
      game.ballVY = 4;
      game.playerX = 450;
      game.rivalX = 450;
      game.canHit = true;
      game.message = "¡Sigue la pelota!";
    }

    function drawCourt() {
      if (!ctx) return;

      ctx.clearRect(0, 0, 900, 600);

      // Fondo y paredes del trinquete
      const wall = ctx.createLinearGradient(0, 0, 0, 400);
      wall.addColorStop(0, "#263b31");
      wall.addColorStop(1, "#42634a");

      ctx.fillStyle = wall;
      ctx.fillRect(0, 0, 900, 600);

      // Piso en perspectiva
      ctx.fillStyle = "#9a7048";
      ctx.beginPath();
      ctx.moveTo(180, 150);
      ctx.lineTo(720, 150);
      ctx.lineTo(880, 600);
      ctx.lineTo(20, 600);
      ctx.closePath();
      ctx.fill();

      // Líneas de cancha
      ctx.strokeStyle = "#f2e6c9";
      ctx.lineWidth = 3;

      ctx.beginPath();
      ctx.moveTo(180, 150);
      ctx.lineTo(20, 600);
      ctx.moveTo(720, 150);
      ctx.lineTo(880, 600);
      ctx.moveTo(180, 150);
      ctx.lineTo(720, 150);
      ctx.moveTo(105, 390);
      ctx.lineTo(795, 390);
      ctx.moveTo(60, 500);
      ctx.lineTo(840, 500);
      ctx.stroke();

      // Línea de pared frontal
      ctx.strokeStyle = "#d8e6c8";
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.moveTo(180, 150);
      ctx.lineTo(720, 150);
      ctx.stroke();

      // Red / referencia visual
      ctx.strokeStyle = "rgba(255,255,255,0.35)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(450, 150);
      ctx.lineTo(450, 600);
      ctx.stroke();
    }

    function drawPlayer(x: number, y: number, color: string, scale: number) {
      if (!ctx) return;

      ctx.save();
      ctx.translate(x, y);
      ctx.scale(scale, scale);

      // Sombra
      ctx.fillStyle = "rgba(0,0,0,0.3)";
      ctx.beginPath();
      ctx.ellipse(0, 4, 34, 10, 0, 0, Math.PI * 2);
      ctx.fill();

      // Piernas
      ctx.strokeStyle = "#202020";
      ctx.lineWidth = 13;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(-10, -25);
      ctx.lineTo(-16, 0);
      ctx.moveTo(10, -25);
      ctx.lineTo(17, 0);
      ctx.stroke();

      // Cuerpo
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.roundRect(-19, -70, 38, 48, 10);
      ctx.fill();

      // Cabeza
      ctx.fillStyle = "#d8a47e";
      ctx.beginPath();
      ctx.arc(0, -82, 13, 0, Math.PI * 2);
      ctx.fill();

      // Brazo
      ctx.strokeStyle = color;
      ctx.lineWidth = 9;
      ctx.beginPath();
      ctx.moveTo(15, -62);
      ctx.lineTo(30, -42);
      ctx.stroke();

      // Paleta
      ctx.strokeStyle = "#e4c18a";
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.moveTo(30, -42);
      ctx.lineTo(39, -57);
      ctx.stroke();

      ctx.restore();
    }

    function drawBall() {
      if (!ctx) return;

      // Sombra de la pelota
      ctx.fillStyle = "rgba(0,0,0,0.25)";
      ctx.beginPath();
      ctx.ellipse(game.ballX, game.ballY + 9, 12, 5, 0, 0, Math.PI * 2);
      ctx.fill();

      // Pelota
      const ball = ctx.createRadialGradient(
        game.ballX - 4,
        game.ballY - 5,
        2,
        game.ballX,
        game.ballY,
        13
      );
      ball.addColorStop(0, "#ffffff");
      ball.addColorStop(1, "#b7e36b");

      ctx.fillStyle = ball;
      ctx.beginPath();
      ctx.arc(game.ballX, game.ballY, 11, 0, Math.PI * 2);
      ctx.fill();
    }

    function drawScore() {
      if (!ctx) return;

      ctx.fillStyle = "rgba(0,0,0,0.75)";
      ctx.fillRect(20, 18, 260, 75);

      ctx.fillStyle = "#b7e36b";
      ctx.font = "bold 17px Arial";
      ctx.fillText("PALETA PRO", 35, 43);

      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 25px Arial";
      ctx.fillText(
        `${game.scorePlayer}  -  ${game.scoreRival}`,
        35,
        76
      );

      ctx.fillStyle = "#ffffff";
      ctx.font = "14px Arial";
      ctx.fillText("VOS", 170, 45);
      ctx.fillText("IA", 235, 45);
    }

    function update() {
      // Movimiento del jugador
      if (keys.current.left) game.playerX -= 5;
      if (keys.current.right) game.playerX += 5;

      game.playerX = Math.max(120, Math.min(780, game.playerX));

      // Inteligencia artificial: sigue la pelota
      const target = game.ballX;
      game.rivalX += (target - game.rivalX) * 0.035;

      // Movimiento de la pelota
      game.ballX += game.ballVX;
      game.ballY += game.ballVY;

      // Rebote lateral
      if (game.ballX < 190 || game.ballX > 710) {
        game.ballVX *= -1;
      }

      // El jugador intenta golpear
      if (
        keys.current.hit &&
        game.canHit &&
        game.ballY > 420 &&
        game.ballY < 555 &&
        Math.abs(game.ballX - game.playerX) < 100
      ) {
        game.ballVY = -7;
        game.ballVX = (game.ballX - game.playerX) * 0.08;
        game.canHit = false;
        game.lastHit = Date.now();
        game.message = "¡Buen golpe!";
      }

      // La IA devuelve la pelota
      if (
        game.ballY < 125 &&
        Math.abs(game.ballX - game.rivalX) < 95
      ) {
        game.ballVY = 5;
        game.ballVX = (game.ballX - game.rivalX) * 0.06;
        game.message = "¡Devuelve la IA!";
      }

      // Punto para el jugador
      if (game.ballY < 35) {
        game.scorePlayer++;
        resetBall();
      }

      // Punto para la IA
      if (game.ballY > 590) {
        game.scoreRival++;
        resetBall();
      }

      // Si la pelota vuelve a estar cerca, se puede golpear
      if (Date.now() - game.lastHit > 500) {
        game.canHit = true;
      }

      if (game.scorePlayer >= 5 || game.scoreRival >= 5) {
        game.message =
          game.scorePlayer > game.scoreRival
            ? "¡GANASTE EL PARTIDO!"
            : "LA IA GANÓ. ¡OTRA VEZ!";
        game.scorePlayer = 0;
        game.scoreRival = 0;
        resetBall();
      }
    }

    function render() {
      drawCourt();

      // Rival al fondo
      drawPlayer(game.rivalX, 165, "#d9e0e5", 0.75);

      // Jugador visto desde atrás
      drawPlayer(game.playerX, 565, "#b7e36b", 1.35);

      drawBall();
      drawScore();

      ctx!.fillStyle = "#ffffff";
      ctx!.font = "bold 17px Arial";
      ctx!.textAlign = "center";
      ctx!.fillText(game.message, 450, 120);
      ctx!.textAlign = "left";
    }

    function loop() {
      update();
      render();
      animation = requestAnimationFrame(loop);
    }

    function keyDown(e: KeyboardEvent) {
      if (e.key === "ArrowLeft" || e.key.toLowerCase() === "a") {
        keys.current.left = true;
      }
      if (e.key === "ArrowRight" || e.key.toLowerCase() === "d") {
        keys.current.right = true;
      }
      if (e.code === "Space") {
        keys.current.hit = true;
        e.preventDefault();
      }
    }

    function keyUp(e: KeyboardEvent) {
      if (e.key === "ArrowLeft" || e.key.toLowerCase() === "a") {
        keys.current.left = false;
      }
      if (e.key === "ArrowRight" || e.key.toLowerCase() === "d") {
        keys.current.right = false;
      }
      if (e.code === "Space") keys.current.hit = false;
    }

    window.addEventListener("keydown", keyDown);
    window.addEventListener("keyup", keyUp);

    loop();

    return () => {
      cancelAnimationFrame(animation);
      window.removeEventListener("keydown", keyDown);
      window.removeEventListener("keyup", keyUp);
    };
  }, []);

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#101510",
        color: "white",
        padding: "24px 15px",
      }}
    >
      <div style={{ maxWidth: "950px", margin: "auto" }}>
        <p
          style={{
            color: "#b7e36b",
            letterSpacing: "3px",
            fontWeight: 700,
          }}
        >
          PALETA PRO GAMING
        </p>

        <h1 style={{ fontSize: "clamp(30px, 6vw, 48px)" }}>
          DESAFÍO TRINQUETE
        </h1>

        <p style={{ color: "#b8c2b8", marginBottom: 20 }}>
          Tu cancha. Tu rival. Tu desafío.
        </p>

        <div
          style={{
            border: "2px solid #526b3c",
            borderRadius: 14,
            overflow: "hidden",
            background: "#263b31",
          }}
        >
          <canvas
            ref={canvasRef}
            width={900}
            height={600}
            style={{
              display: "block",
              width: "100%",
              height: "auto",
              touchAction: "none",
            }}
          />
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: 12,
            marginTop: 18,
          }}
        >
          <div style={{ display: "flex", gap: 10 }}>
            <button
              onPointerDown={() => (keys.current.left = true)}
              onPointerUp={() => (keys.current.left = false)}
              onPointerLeave={() => (keys.current.left = false)}
              onPointerCancel={() => (keys.current.left = false)}
              style={controlStyle}
            >
              ◀
            </button>

            <button
              onPointerDown={() => (keys.current.right = true)}
              onPointerUp={() => (keys.current.right = false)}
              onPointerLeave={() => (keys.current.right = false)}
              onPointerCancel={() => (keys.current.right = false)}
              style={controlStyle}
            >
              ▶
            </button>
          </div>

          <button
            onPointerDown={() => (keys.current.hit = true)}
            onPointerUp={() => (keys.current.hit = false)}
            onPointerLeave={() => (keys.current.hit = false)}
            onPointerCancel={() => (keys.current.hit = false)}
            style={{
              ...controlStyle,
              background: "#b7e36b",
              color: "#152015",
              minWidth: 125,
            }}
          >
            GOLPEAR
          </button>
        </div>

        <p
          style={{
            color: "#aab5a8",
            fontSize: 13,
            lineHeight: 1.7,
            marginTop: 18,
          }}
        >
          Controles: movete con ◀ y ▶ y tocá GOLPEAR
          cuando la pelota esté cerca. En computadora:
          flechas o A/D para moverte y espacio para golpear.
        </p>
      </div>
    </main>
  );
}

const controlStyle: React.CSSProperties = {
  border: "1px solid #536b35",
  borderRadius: 12,
  background: "#202b20",
  color: "white",
  padding: "16px 22px",
  fontSize: 20,
  fontWeight: 800,
  touchAction: "none",
};
        
