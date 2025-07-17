import React, { useRef, useEffect, useState } from 'react';

const Electricity = ({ 
  width = 300, 
  height = 200, 
  startPoint = { x: 50, y: 100 },
  endPoint = { x: 250, y: 100 },
  intensity = 0.7, 
  color = '#00ffff', 
  strokeWidth = 2,
  animated = true,
  branches = 3,
  maxBranches = 5,
  branchLength = 0.15,
  segments = 12,
  animationSpeed = 100,
  flickerIntensity = 0.5,
  glowEffect = true,
  multipleRays = false,
  rayCount = 1,
  style = {}
}) => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const [isActive, setIsActive] = useState(animated);

  // Ref para las props actuales
  const propsRef = useRef({
    width, height, startPoint, endPoint, intensity, color, strokeWidth,
    animated, branches, maxBranches, branchLength, segments, animationSpeed,
    flickerIntensity, glowEffect, multipleRays, rayCount, style
  });
  propsRef.current = {
    width, height, startPoint, endPoint, intensity, color, strokeWidth,
    animated, branches, maxBranches, branchLength, segments, animationSpeed,
    flickerIntensity, glowEffect, multipleRays, rayCount, style
  };

  // Clase para generar puntos de rayo
  class LightningBolt {
    constructor(startX, startY, endX, endY, segmentCount = segments) {
      this.startX = startX;
      this.startY = startY;
      this.endX = endX;
      this.endY = endY;
      this.segments = segmentCount;
      this.points = [];
      this.branches = [];
      this.generatePoints();
    }

    generatePoints() {
      this.points = [];
      
      for (let i = 0; i <= this.segments; i++) {
        const t = i / this.segments;
        const x = this.startX + (this.endX - this.startX) * t;
        const y = this.startY + (this.endY - this.startY) * t;
        
        // Añadir variación aleatoria (excepto en los puntos extremos)
        if (i > 0 && i < this.segments) {
          const distance = Math.sqrt(Math.pow(this.endX - this.startX, 2) + Math.pow(this.endY - this.startY, 2));
          const maxDeviation = distance * 0.1 * propsRef.current.intensity;
          const deviationX = (Math.random() - 0.5) * maxDeviation;
          const deviationY = (Math.random() - 0.5) * maxDeviation;
          
          this.points.push({
            x: x + deviationX,
            y: y + deviationY
          });
        } else {
          this.points.push({ x, y });
        }
      }

      // Generar ramas
      this.generateBranches();
    }

    generateBranches() {
      this.branches = [];
      const numBranches = Math.floor(Math.random() * propsRef.current.maxBranches) + Math.min(1, propsRef.current.branches);
      
      for (let i = 0; i < numBranches; i++) {
        // Elegir un punto aleatorio en el rayo principal (no los extremos)
        const segmentIndex = Math.floor(Math.random() * (this.segments - 2)) + 1;
        const basePoint = this.points[segmentIndex];
        
        if (basePoint) {
          // Crear una rama corta
          const distance = Math.sqrt(Math.pow(this.endX - this.startX, 2) + Math.pow(this.endY - this.startY, 2));
          const actualBranchLength = distance * propsRef.current.branchLength;
          const angle = (Math.random() - 0.5) * Math.PI; // Ángulo aleatorio
          
          const endX = basePoint.x + Math.cos(angle) * actualBranchLength;
          const endY = basePoint.y + Math.sin(angle) * actualBranchLength;
          
          const branchSegments = Math.floor(this.segments * 0.4);
          const branch = [];
          
          for (let j = 0; j <= branchSegments; j++) {
            const t = j / branchSegments;
            const x = basePoint.x + (endX - basePoint.x) * t;
            const y = basePoint.y + (endY - basePoint.y) * t;
            
            if (j > 0 && j < branchSegments) {
              const maxDeviation = actualBranchLength * 0.2 * propsRef.current.intensity;
              const deviationX = (Math.random() - 0.5) * maxDeviation;
              const deviationY = (Math.random() - 0.5) * maxDeviation;
              
              branch.push({
                x: x + deviationX,
                y: y + deviationY
              });
            } else {
              branch.push({ x, y });
            }
          }
          
          this.branches.push(branch);
        }
      }
    }

    draw(ctx) {
      // Configurar el estilo del rayo
      ctx.strokeStyle = propsRef.current.color;
      ctx.lineWidth = propsRef.current.strokeWidth;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      
      // Añadir efecto de brillo si está habilitado
      if (propsRef.current.glowEffect) {
        ctx.shadowColor = propsRef.current.color;
        ctx.shadowBlur = propsRef.current.strokeWidth * 3;
      }
      
      // Dibujar el rayo principal
      ctx.beginPath();
      if (this.points.length > 0) {
        ctx.moveTo(this.points[0].x, this.points[0].y);
        for (let i = 1; i < this.points.length; i++) {
          ctx.lineTo(this.points[i].x, this.points[i].y);
        }
      }
      ctx.stroke();
      
      // Dibujar las ramas
      this.branches.forEach(branch => {
        if (branch.length > 0) {
          ctx.beginPath();
          ctx.moveTo(branch[0].x, branch[0].y);
          for (let i = 1; i < branch.length; i++) {
            ctx.lineTo(branch[i].x, branch[i].y);
          }
          ctx.stroke();
        }
      });
      
      // Resetear shadow para no afectar otros dibujos
      if (propsRef.current.glowEffect) {
        ctx.shadowBlur = 0;
      }
    }
  }

  const drawElectricity = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    // Actualizar dimensiones del canvas
    canvas.width = propsRef.current.width;
    canvas.height = propsRef.current.height;
    
    // Limpiar canvas
    ctx.clearRect(0, 0, propsRef.current.width, propsRef.current.height);
    
    // Determinar número de rayos
    const numBolts = propsRef.current.multipleRays ? propsRef.current.rayCount : 1;
    
    for (let i = 0; i < numBolts; i++) {
      let startX, startY, endX, endY;
      
      if (propsRef.current.multipleRays && i > 0) {
        // Para rayos múltiples, añadir variación aleatoria a los puntos
        const variance = 20; // Píxeles de variación
        startX = propsRef.current.startPoint.x + (Math.random() - 0.5) * variance;
        startY = propsRef.current.startPoint.y + (Math.random() - 0.5) * variance;
        endX = propsRef.current.endPoint.x + (Math.random() - 0.5) * variance;
        endY = propsRef.current.endPoint.y + (Math.random() - 0.5) * variance;
      } else {
        // Usar los puntos exactos especificados
        startX = propsRef.current.startPoint.x;
        startY = propsRef.current.startPoint.y;
        endX = propsRef.current.endPoint.x;
        endY = propsRef.current.endPoint.y;
      }
      
      const bolt = new LightningBolt(startX, startY, endX, endY, propsRef.current.segments);
      
      // Variar la opacidad para crear profundidad y efecto de parpadeo
      let opacity = 0.7 + Math.random() * 0.3;
      if (propsRef.current.flickerIntensity > 0) {
        opacity *= (1 - propsRef.current.flickerIntensity + Math.random() * propsRef.current.flickerIntensity);
      }
      
      ctx.globalAlpha = opacity;
      bolt.draw(ctx);
    }
    
    // Resetear alpha
    ctx.globalAlpha = 1;
  };

  const animate = () => {
    if (!isActive) return;
    
    drawElectricity();
    
    // Velocidad de actualización basada en animationSpeed
    const baseDelay = 200 - propsRef.current.animationSpeed; // Invertido: mayor speed = menor delay
    const randomVariation = propsRef.current.flickerIntensity * 100; // Más flicker = más variación
    const delay = Math.max(50, baseDelay + (Math.random() - 0.5) * randomVariation);
    
    setTimeout(() => {
      if (isActive) {
        animationRef.current = requestAnimationFrame(animate);
      }
    }, delay);
  };

  useEffect(() => {
    if (propsRef.current.animated) {
      setIsActive(true);
      drawElectricity(); // Dibuja el primer frame inmediatamente
      animationRef.current = requestAnimationFrame(animate);
    } else {
      drawElectricity();
    }
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []); // Solo se ejecuta una vez al montar

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = width;
      canvas.height = height;
    }
  }, [width, height]); // Solo actualiza dimensiones cuando cambian width/height

  useEffect(() => {
    setIsActive(animated);
    if (animated) {
      if (!animationRef.current) {
        animationRef.current = requestAnimationFrame(animate);
      }
    } else if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
  }, [animated]);

  const canvasStyle = {
    display: 'block',
    background: 'transparent',
    ...style
  };

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      style={canvasStyle}
    />
  );
};

export default Electricity;
