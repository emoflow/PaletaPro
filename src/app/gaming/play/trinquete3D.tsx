
"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import * as THREE from "three";

export default function Trinquete3D() {
  const containerRef = useRef<HTMLDivElement>(null);

  const [playerScore, setPlayerScore] = useState(0);
  const [rivalScore, setRivalScore] = useState(0);
  const [pointMessage, setPointMessage] = useState("¡A jugar!");

  const controls = useRef({
    left: false,
    right: false,
    hit: false,
  });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // ESCENA
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#17251e");
    scene.fog = new THREE.Fog("#17251e", 25, 45);

    // CÁMARA
    const camera = new THREE.PerspectiveCamera(
      65,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );

    // RENDERIZADOR
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
    });

    renderer.setPixelRatio(
      Math.min(window.devicePixelRatio, 1.5)
    );

    renderer.setSize(
      container.clientWidth,
      container.clientHeight
    );

    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.appendChild(renderer.domElement);

    // ILUMINACIÓN
    scene.add(
      new THREE.HemisphereLight("#ffffff", "#43513d", 2)
    );

    const light = new THREE.DirectionalLight("#fff0d6", 3);
    light.position.set(-5, 10, 7);
    light.castShadow = true;
    scene.add(light);

    // CANCHA
    const floor = new THREE.Mesh(
      new THREE.BoxGeometry(11, 0.3, 22),
      new THREE.MeshStandardMaterial({
        color: "#98704c",
        roughness: 0.85,
      })
    );

    floor.position.set(0, -0.15, -1);
    floor.receiveShadow = true;
    scene.add(floor);

    // PAREDES
    const wallMaterial = new THREE.MeshStandardMaterial({
      color: "#365c43",
      roughness: 0.8,
    });

    function wall(
      x: number,
      y: number,
      z: number,
      w: number,
      h: number,
      d: number
    ) {
      const mesh = new THREE.Mesh(
        new THREE.BoxGeometry(w, h, d),
        wallMaterial
      );

      mesh.position.set(x, y, z);
      mesh.receiveShadow = true;
      scene.add(mesh);
    }

    wall(-5.5, 2.5, -1, 0.3, 5, 22);
    wall(5.5, 2.5, -1, 0.3, 5, 22);
    wall(0, 2.5, -12, 11, 5, 0.35);

    // LÍNEAS DE CANCHA
    const lineMaterial = new THREE.MeshBasicMaterial({
      color: "#eee6c9",
    });

    function line(
      x: number,
      z: number,
      w: number,
      d: number
    ) {
      const mesh = new THREE.Mesh(
        new THREE.BoxGeometry(w, 0.025, d),
        lineMaterial
      );

      mesh.position.set(x, 0.025, z);
      scene.add(mesh);
    }

    line(0, -7, 10.8, 0.06);
    line(0, -2, 10.8, 0.06);
    line(0, 3, 10.8, 0.06);
    line(-5, -1, 0.06, 20);
    line(5, -1, 0.06, 20);

    // JUGADOR
    const player = new THREE.Group();

    const body = new THREE.Mesh(
      new THREE.CapsuleGeometry(0.42, 0.9, 6, 12),
      new THREE.MeshStandardMaterial({
        color: "#b7e36b",
      })
    );

    body.position.y = 1.25;
    body.castShadow = true;
    player.add(body);

    const head = new THREE.Mesh(
      new THREE.SphereGeometry(0.27, 24, 24),
      new THREE.MeshStandardMaterial({
        color: "#d6a17d",
      })
    );

    head.position.y = 2.05;
    player.add(head);

    const racket = new THREE.Mesh(
      new THREE.BoxGeometry(0.12, 0.65, 0.08),
      new THREE.MeshStandardMaterial({
        color: "#d5b17a",
      })
    );

    racket.position.set(0.55, 1.3, -0.15);
    racket.rotation.z = -0.4;
    player.add(racket);

    player.position.set(0, 0, 5);
    player.userData.speed = 0;

    scene.add(player);

    // RIVAL
    const rival = new THREE.Group();

    const rivalBody = new THREE.Mesh(
      new THREE.CapsuleGeometry(0.38, 0.85, 6, 12),
      new THREE.MeshStandardMaterial({
        color: "#d9e0e5",
      })
    );

    rivalBody.position.y = 1.2;
    rival.add(rivalBody);

    const rivalHead = new THREE.Mesh(
      new THREE.SphereGeometry(0.25, 24, 24),
      new THREE.MeshStandardMaterial({
        color: "#d6a17d",
      })
    );

    rivalHead.position.y = 1.95;
    rival.add(rivalHead);

    rival.position.set(0, 0, -8);
    scene.add(rival);

    // PELOTA
    const ball = new THREE.Mesh(
      new THREE.SphereGeometry(0.16, 24, 24),
      new THREE.MeshStandardMaterial({
        color: "#d8f36d",
        roughness: 0.35,
        emissive: "#526d1b",
        emissiveIntensity: 0.25,
      })
    );

    ball.position.set(0, 2, 1);
    ball.castShadow = true;
    scene.add(ball);

    // FÍSICA
    const velocity = new THREE.Vector3(0.8, 2, -6);

    const gravity = 9.8;

    let hitCooldown = 0;
    let rivalHitCooldown = 0;
    let animationFrameId = 0;
    let floorBounces = 0;

    const clock = new THREE.Clock();

    const playerHitPosition = new THREE.Vector3();
    const rivalHitPosition = new THREE.Vector3();

    // REINICIAR JUGADA
    function resetRally() {
      ball.position.set(0, 2, 1);
      velocity.set(0.8, 2, -6);

      floorBounces = 0;
      hitCooldown = 0;
      rivalHitCooldown = 0;

      player.position.set(0, 0, 5);
      rival.position.set(0, 0, -8);

      player.userData.speed = 0;

      controls.current.hit = false;
    }

    // PUNTO
    function awardPoint(winner: "player" | "rival") {
      if (winner === "player") {
        setPlayerScore((score) => score + 1);
        setPointMessage("¡PUNTO PARA VOS!");
      } else {
        setRivalScore((score) => score + 1);
        setPointMessage("¡PUNTO PARA LA MÁQUINA!");
      }

      resetRally();
    }

    // ANIMACIÓN
    function animate() {
      animationFrameId = requestAnimationFrame(animate);

      const delta = Math.min(clock.getDelta(), 0.033);

      // MOVIMIENTO DEL JUGADOR
      let direction = 0;

      if (controls.current.left) direction -= 1;
      if (controls.current.right) direction += 1;

      const targetSpeed = direction * 5;

      const difference =
        targetSpeed - player.userData.speed;

      player.userData.speed +=
        difference * Math.min(1, delta * 8);

      player.position.x +=
        player.userData.speed * delta;

      player.position.x = THREE.MathUtils.clamp(
        player.position.x,
        -4.5,
        4.5
      );

      player.rotation.y =
        -player.userData.speed * 0.025;

      // MOVIMIENTO DE LA PELOTA
      ball.position.x += velocity.x * delta;
      ball.position.y += velocity.y * delta;
      ball.position.z += velocity.z * delta;

      velocity.y -= gravity * delta;

      // REBOTE EN EL PISO
      if (ball.position.y < 0.16 && velocity.y < 0) {
        ball.position.y = 0.16;

        velocity.y = Math.abs(velocity.y) * 0.72;

        floorBounces += 1;

        // DOS REBOTES: SE TERMINA LA JUGADA
        if (floorBounces >= 2) {
          if (ball.position.z < -1) {
            awardPoint("player");
          } else {
            awardPoint("rival");
          }
        }
      }

      // REBOTES LATERALES
      if (
        ball.position.x < -5 ||
        ball.position.x > 5
      ) {
        ball.position.x = THREE.MathUtils.clamp(
          ball.position.x,
          -5,
          5
        );

        velocity.x *= -0.85;
      }

      // PARED FRONTAL
      if (ball.position.z < -11.5) {
        ball.position.z = -11.5;
        velocity.z = Math.abs(velocity.z) * 0.85;
      }

      // PARED DEL FONDO
      if (ball.position.z > 9.5) {
        ball.position.z = 9.5;
        velocity.z = -Math.abs(velocity.z) * 0.85;
      }

      // GOLPE DEL JUGADOR
      hitCooldown = Math.max(0, hitCooldown - delta);

      playerHitPosition.set(
        player.position.x,
        1.4,
        player.position.z - 0.5
      );

      const playerDistance =
        ball.position.distanceTo(playerHitPosition);

      if (
        controls.current.hit &&
        playerDistance < 2.2 &&
        hitCooldown === 0
      ) {
        velocity.x = THREE.MathUtils.clamp(
          (ball.position.x - player.position.x) * 2,
          -5,
          5
        );

        velocity.y = 5.5;
        velocity.z = -8;

        hitCooldown = 0.6;
        floorBounces = 0;

        racket.rotation.x = -0.9;
      } else {
        racket.rotation.x = THREE.MathUtils.lerp(
          racket.rotation.x,
          0,
          delta * 8
        );
      }

      // IA: BUSCAR LA PELOTA
      const rivalTarget = THREE.MathUtils.clamp(
        ball.position.x,
        -4,
        4
      );

      rival.position.x = THREE.MathUtils.damp(
        rival.position.x,
        rivalTarget,
        3,
        delta
      );

      // IA: DEVOLVER LA PELOTA
      rivalHitCooldown = Math.max(
        0,
        rivalHitCooldown - delta
      );

      rivalHitPosition.set(
        rival.position.x,
        1.3,
        rival.position.z
      );

      const rivalDistance =
        ball.position.distanceTo(rivalHitPosition);

      if (
        rivalDistance < 2.5 &&
        velocity.z < 0 &&
        rivalHitCooldown === 0
      ) {
        velocity.x = THREE.MathUtils.clamp(
          (player.position.x - ball.position.x) * 1.4,
          -4,
          4
        );

        velocity.y = 4.5;
        velocity.z = 7.5;

        rivalHitCooldown = 1.2;
        floorBounces = 0;
      }

      // CÁMARA DETRÁS DEL JUGADOR
      camera.position.x +=
        (
          player.position.x * 0.35 -
          camera.position.x
        ) * delta * 4;

      camera.position.setY(4.2);
      camera.position.z = 9;

      camera.lookAt(
        player.position.x * 0.25,
        1.3,
        -5
      );

      renderer.render(scene, camera);
    }

    // TECLADO
    function keyDown(e: KeyboardEvent) {
      if (
        e.key === "ArrowLeft" ||
        e.key.toLowerCase() === "a"
      ) {
        controls.current.left = true;
        e.preventDefault();
      }

      if (
        e.key === "ArrowRight" ||
        e.key.toLowerCase() === "d"
      ) {
        controls.current.right = true;
        e.preventDefault();
      }

      if (e.code === "Space") {
        controls.current.hit = true;
        e.preventDefault();
      }
    }

    function keyUp(e: KeyboardEvent) {
      if (
        e.key === "ArrowLeft" ||
        e.key.toLowerCase() === "a"
      ) {
        controls.current.left = false;
      }

      if (
        e.key === "ArrowRight" ||
        e.key.toLowerCase() === "d"
      ) {
        controls.current.right = false;
      }

      if (e.code === "Space") {
        controls.current.hit = false;
      }
    }

    window.addEventListener("keydown", keyDown);
    window.addEventListener("keyup", keyUp);

    // RESPONSIVE
    function resize() {
      if (!container.clientHeight) return;

      camera.aspect =
        container.clientWidth / container.clientHeight;

      camera.updateProjectionMatrix();

      renderer.setSize(
        container.clientWidth,
        container.clientHeight
      );
    }

    window.addEventListener("resize", resize);

    // INICIAR
    animate();

    // LIMPIEZA
    return () => {
      cancelAnimationFrame(animationFrameId);

      window.removeEventListener("keydown", keyDown);
      window.removeEventListener("keyup", keyUp);
      window.removeEventListener("resize", resize);

      controls.current.left = false;
      controls.current.right = false;
      controls.current.hit = false;

      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();

          const materials = Array.isArray(object.material)
            ? object.material
            : [object.material];

          materials.forEach((material) => {
            material.dispose();
          });
        }
      });

      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  // CONTROLES TÁCTILES
  function hold(
    control: "left" | "right" | "hit",
    value: boolean
  ) {
    controls.current[control] = value;
  }

  const buttonStyle: CSSProperties = {
    padding: "17px 22px",
    borderRadius: 12,
    border: "1px solid #536b35",
    background: "#202b20",
    color: "white",
    fontSize: 20,
    fontWeight: 800,
    touchAction: "none",
    userSelect: "none",
  };

  return (
    <div>
      {/* MARCADOR */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: "#202b20",
          padding: 14,
          borderRadius: 12,
          marginBottom: 12,
          color: "white",
          gap: 8,
        }}
      >
        <div>
          <div style={{ color: "#b7e36b", fontSize: 12 }}>
            JUGADOR
          </div>

          <strong style={{ fontSize: 30 }}>
            {playerScore}
          </strong>
        </div>

        <div style={{ textAlign: "center" }}>
          <div style={{ fontWeight: 800 }}>
            MARCADOR
          </div>

          <div
            style={{
              color: "#b7e36b",
              fontSize: 12,
              marginTop: 4,
            }}
          >
            {pointMessage}
          </div>
        </div>

        <div style={{ textAlign: "right" }}>
          <div style={{ color: "#d9e0e5", fontSize: 12 }}>
            MÁQUINA
          </div>

          <strong style={{ fontSize: 30 }}>
            {rivalScore}
          </strong>
        </div>
      </div>

      {/* CANCHA 3D */}
      <div
        ref={containerRef}
        style={{
          width: "100%",
          height: "min(65vh, 620px)",
          minHeight: 380,
          overflow: "hidden",
          borderRadius: 14,
          background: "#17251e",
        }}
      />

      {/* BOTONES */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: 12,
          marginTop: 14,
        }}
      >
        <div style={{ display: "flex", gap: 8 }}>
          <button
            style={buttonStyle}
            onPointerDown={() => hold("left", true)}
            onPointerUp={() => hold("left", false)}
            onPointerLeave={() => hold("left", false)}
            onPointerCancel={() => hold("left", false)}
          >
            ◀
          </button>

          <button
            style={buttonStyle}
            onPointerDown={() => hold("right", true)}
            onPointerUp={() => hold("right", false)}
            onPointerLeave={() => hold("right", false)}
            onPointerCancel={() => hold("right", false)}
          >
            ▶
          </button>
        </div>

        <button
          style={{
            ...buttonStyle,
            background: "#b7e36b",
            color: "#152015",
            minWidth: 125,
          }}
          onPointerDown={() => hold("hit", true)}
          onPointerUp={() => hold("hit", false)}
          onPointerLeave={() => hold("hit", false)}
          onPointerCancel={() => hold("hit", false)}
        >
          GOLPEAR
        </button>
      </div>

      <p
        style={{
          color: "#aab5a8",
          fontSize: 13,
          marginTop: 12,
        }}
      >
        Movete con los botones. Golpeá cuando la pelota
        esté cerca. En computadora podés usar A, D y espacio.
      </p>
    </div>
  );
      }
      
