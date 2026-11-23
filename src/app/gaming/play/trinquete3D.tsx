
"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function Trinquete3D() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // ESCENA
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#17251e");
    scene.fog = new THREE.Fog("#17251e", 20, 45);

    // CÁMARA DETRÁS DEL JUGADOR
    const camera = new THREE.PerspectiveCamera(
      65,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );

    camera.position.set(0, 4.2, 9);
    camera.lookAt(0, 1.3, -5);

    // MOTOR GRÁFICO
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
    });

    renderer.setPixelRatio(
      Math.min(window.devicePixelRatio, 2)
    );

    renderer.setSize(
      container.clientWidth,
      container.clientHeight
    );

    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.appendChild(renderer.domElement);

    // ILUMINACIÓN
    const ambient = new THREE.HemisphereLight(
      "#ffffff",
      "#43513d",
      2
    );
    scene.add(ambient);

    const sunlight = new THREE.DirectionalLight(
      "#fff0d6",
      3
    );
    sunlight.position.set(-5, 10, 7);
    sunlight.castShadow = true;
    scene.add(sunlight);

    // PISO
    const floorGeometry = new THREE.BoxGeometry(
      11,
      0.3,
      22
    );

    const floorMaterial = new THREE.MeshStandardMaterial({
      color: "#98704c",
      roughness: 0.85,
    });

    const floor = new THREE.Mesh(
      floorGeometry,
      floorMaterial
    );

    floor.position.set(0, -0.15, -1);
    floor.receiveShadow = true;
    scene.add(floor);

    // PAREDES LATERALES
    const wallMaterial = new THREE.MeshStandardMaterial({
      color: "#365c43",
      roughness: 0.8,
    });

    function createWall(
      x: number,
      y: number,
      z: number,
      width: number,
      height: number,
      depth: number
    ) {
      const wall = new THREE.Mesh(
        new THREE.BoxGeometry(width, height, depth),
        wallMaterial
      );

      wall.position.set(x, y, z);
      wall.receiveShadow = true;
      scene.add(wall);
    }

    createWall(-5.5, 2.5, -1, 0.3, 5, 22);
    createWall(5.5, 2.5, -1, 0.3, 5, 22);

    // PARED FRONTAL
    const frontWall = new THREE.Mesh(
      new THREE.BoxGeometry(11, 5, 0.35),
      new THREE.MeshStandardMaterial({
        color: "#41694b",
        roughness: 0.75,
      })
    );

    frontWall.position.set(0, 2.5, -12);
    scene.add(frontWall);

    // LÍNEAS DE LA CANCHA
    const lineMaterial = new THREE.MeshBasicMaterial({
      color: "#eee6c9",
    });

    function createLine(
      x: number,
      z: number,
      width: number,
      depth: number
    ) {
      const line = new THREE.Mesh(
        new THREE.BoxGeometry(width, 0.025, depth),
        lineMaterial
      );

      line.position.set(x, 0.025, z);
      scene.add(line);
    }

    createLine(0, -7, 10.8, 0.06);
    createLine(0, -2, 10.8, 0.06);
    createLine(0, 3, 10.8, 0.06);
    createLine(-5, -1, 0.06, 20);
    createLine(5, -1, 0.06, 20);

    // PELOTARI
    const player = new THREE.Group();

    const body = new THREE.Mesh(
      new THREE.CapsuleGeometry(0.42, 0.9, 6, 12),
      new THREE.MeshStandardMaterial({
        color: "#b7e36b",
        roughness: 0.65,
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

    ball.position.set(0, 1.2, 1);
    ball.castShadow = true;
    scene.add(ball);

    // ANIMACIÓN DE PRUEBA
    const clock = new THREE.Clock();
    let animationId = 0;

    function animate() {
      animationId = requestAnimationFrame(animate);

      const time = clock.getElapsedTime();

      // Movimiento suave de la pelota
      ball.position.x = Math.sin(time * 1.2) * 1.8;
      ball.position.y = 1.2 + Math.abs(Math.sin(time * 2)) * 1.2;
      ball.position.z = 1 - (time % 5) * 1.5;

      // Movimiento de espera de los jugadores
      player.rotation.y = Math.sin(time * 1.5) * 0.05;
      rival.position.x = Math.sin(time * 0.8) * 1.2;

      renderer.render(scene, camera);
    }

    animate();

    // ADAPTACIÓN A PANTALLAS
    function handleResize() {
      if (!container) return;

      camera.aspect =
        container.clientWidth / container.clientHeight;

      camera.updateProjectionMatrix();

      renderer.setSize(
        container.clientWidth,
        container.clientHeight
      );
    }

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);

      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();

          const materials = Array.isArray(object.material)
            ? object.material
            : [object.material];

          materials.forEach((material) => material.dispose());
        }
      });

      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        height: "min(70vh, 620px)",
        minHeight: "380px",
        overflow: "hidden",
        borderRadius: "14px",
        background: "#17251e",
      }}
    />
  );
        }
    
